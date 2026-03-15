import React, { useCallback, useState } from 'react'
import ReactSlider from 'react-slider'
import { saveCvMapping, saveCvMappings, setCvParams, VOICE_ALL } from '../../midi/rpc/api'
import CvResponseCurve from './CvResponseCurve'
import { CV_CHANNELS, CVs } from './CvDefinitions'
import { curveNames } from '../../components/curves/shortCurveNames'
import { curveValuesUsed } from './generatedTypes'
import { sharedConfig } from "../../sharedConfig";
import './CvRange.scss'
import '../components/StageBlock.scss'
import '../_shared.scss'

import { Curve } from '../../synthcore/generatedTypes'

type RangeProps = {
    setRange: (value: number) => void,
    value: number
}

const VerticalRangeSelector = ({ setRange, value }: RangeProps) => {

    return <ReactSlider
        className="horizontal-slider cv-range__graph-controls__range"
        thumbClassName="cv-range__thumb"
        trackClassName="example-track"
        orientation="vertical"
        max={65535}
        min={0}
        invert
        value={value}
        onChange={setRange}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />

}

type CvSelectorProps = {
    cv: number
    onSelect: (cv: number) => void
}
type CvCurveSelectorProps = {
    curve: number
    onSelect: (curve: number) => void
}

type CvReverseCheckboxProps = {
    reverse: boolean
    onChange: (reverse: boolean) => void
}

const CvSelector = ({ onSelect, cv }: CvSelectorProps) => {

    const onOptionChangeHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value
        console.log(value)
        if (value) {
            onSelect(Number.parseInt(value));
        }
    }, [onSelect])

    return <select onChange={onOptionChangeHandler} value={cv} className={"cv-range__cv-selector"}>
        {CVs.map((cv, index) => {
            return (
                <option key={index} value={cv.channel}>
                    {cv.description} ({cv.channel})
                </option>
            );
        })}
    </select>
}

const CvCurveSelector = ({ onSelect, curve }: CvCurveSelectorProps) => {

    const onOptionChangeHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value
        console.log(value)
        if (value) {
            onSelect(Number.parseInt(value));
        }
    }, [onSelect])

    return <select onChange={onOptionChangeHandler} value={curve}>
        {curveValuesUsed.map((curve: Curve) => {
            return (
                <option key={curve} value={curve}>
                    {curveNames[curve]}
                </option>
            );
        })}
    </select>
}

const CvReverseCheckbox = ({ onChange, reverse }: CvReverseCheckboxProps) => {
    const onOptionChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(!reverse);
    }, [onChange, reverse])

    return <label className="cv-range__nowrap">
        <input type="checkbox" onChange={onOptionChangeHandler} checked={reverse || false}/>
        Reverse
    </label>
}


function getAsVolts(index: number) {
    return (Math.round(500 * (index / 65535)) / 100).toFixed(2)
}

type CvRange = {
    cv: number,
    start: number,
    end: number,
    reverse: boolean,
    curve: Curve // PS: This is the actual curve value, not index. In controllers, we use the index as value instead.
}

function getInitialSaved() {
    const saved: boolean[] = []
    for (let i = 0; i < CV_CHANNELS; i++) {
        saved.push(true)
    }
    return saved
}

function getInitialCvRanges() {
    const cvRanges: CvRange[] = []
    for (let i = 0; i < CV_CHANNELS; i++) {
        cvRanges.push({
            cv: i,
            start: 0,
            end: 65535,
            curve: Curve.LIN,
            reverse: false,
        })
    }
    return cvRanges
}

function getInitialAllCvRanges() {
    return Array.from({ length: sharedConfig.VOICE_COUNT.value }, getInitialCvRanges)
}

const CV_RANGES_KEY = 'cv_ranges'
const save = (allCvs: CvRange[][]) => localStorage.setItem(CV_RANGES_KEY, JSON.stringify(allCvs))
const load = () => {
    const persisted = localStorage.getItem(CV_RANGES_KEY)
    if (!persisted) {
        return getInitialAllCvRanges()
    }
    try {
        return JSON.parse(persisted) as CvRange[][]
    } catch {
        return getInitialAllCvRanges()
    }
}

function mutate(cvRanges: CvRange[], cv: number, changes: Partial<CvRange>) {
    const cvRange = cvRanges[cv]
    const updatedCvRange = {
        ...cvRange,
        ...changes
    }
    const updatedCvRanges = [
        ...cvRanges
    ]
    updatedCvRanges[cv] = updatedCvRange
    return updatedCvRanges
}

function sendAll(voice: number, cvRanges: CvRange[], i: number) {
    const { cv, start, end, curve, reverse } = cvRanges[i]
    setCvParams(cv, start, end, curve, reverse)

    if(i < CV_CHANNELS){
        if(i === CV_CHANNELS - 1) {
            saveCvMappings(voice)
        } else {
            setTimeout(() => {
                sendAll(voice, cvRanges, i + 1)
            }, 50)
        }
    }
}

export const CvRange = ({voice}: Props) => {
    const [allCvs, setAllCvs] = useState<CvRange[][]>(load())
    const [cv, setCv] = useState<number>(0)
    const [saved, setSaved] = useState<boolean[][]>(
        Array.from({ length: sharedConfig.VOICE_COUNT.value }, getInitialSaved)
    )

    const updateSaved = useCallback((isSaved: boolean) => {
        setSaved(prev => {
            const updated = prev.map(arr => [...arr])
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v][cv] = isSaved
                }
            } else {
                updated[voice][cv] = isSaved
            }
            return updated
        })
    }, [cv, voice])

    const sendCv = (cvRange: CvRange, v: number) => {
        setCvParams(cvRange.cv, cvRange.start, cvRange.end, cvRange.curve, cvRange.reverse, voice)
    }

    const onSave = useCallback(() => {
        setAllCvs(prev => {
            const updated = prev.map(arr => arr.map(obj => ({ ...obj })))
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v][cv] = { ...updated[v][cv] }
                }
            } else {
                updated[voice][cv] = { ...updated[voice][cv] }
            }
            save(updated)
            updateSaved(true)
            saveCvMapping(cv, voice)
            return updated
        })
    }, [cv, voice, updateSaved])

    const onReset = useCallback(() => {
        setAllCvs(prev => {
            const persisted = load()
            const updated = prev.map(arr => arr.map(obj => ({ ...obj })))
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v][cv] = persisted[v][cv]
                }
                sendCv(updated[0][cv], voice)
            } else {
                updated[voice][cv] = persisted[voice][cv]
                sendCv(updated[voice][cv], voice)
            }
            updateSaved(true)
            return updated
        })
    }, [cv, voice, updateSaved])

    const onLoadAll = useCallback(() => {
        const persisted = load()
        sendAll(voice, persisted[voice], 0)
    }, [])

    const updateStart = useCallback((start: number) => {
        setAllCvs(prev => {
            const updated = prev.map(arr => arr.map(obj => ({ ...obj })))
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v] = mutate(updated[v], cv, { start })
                }
                sendCv(updated[0][cv], voice)
            } else {
                updated[voice] = mutate(updated[voice], cv, { start })
                sendCv(updated[voice][cv], voice)
            }
            updateSaved(false)
            return updated
        })
    }, [cv, voice, updateSaved])

    const updateEnd = useCallback((end: number) => {
        setAllCvs(prev => {
            const updated = prev.map(arr => arr.map(obj => ({ ...obj })))
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v] = mutate(updated[v], cv, { end })
                }
                sendCv(updated[0][cv], voice)
            } else {
                updated[voice] = mutate(updated[voice], cv, { end })
                sendCv(updated[voice][cv], voice)
            }
            updateSaved(false)
            return updated
        })
    }, [cv, voice, updateSaved])

    const updateCurve = useCallback((curve: number) => {
        setAllCvs(prev => {
            const updated = prev.map(arr => arr.map(obj => ({ ...obj })))
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v] = mutate(updated[v], cv, { curve })
                }
                sendCv(updated[0][cv], voice)
            } else {
                updated[voice] = mutate(updated[voice], cv, { curve })
                sendCv(updated[voice][cv], voice)
            }
            updateSaved(false)
            return updated
        })
    }, [cv, voice, updateSaved])

    const updateReverse = useCallback((reverse: boolean) => {
        setAllCvs(prev => {
            const updated = prev.map(arr => arr.map(obj => ({ ...obj })))
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v] = mutate(updated[v], cv, { reverse })
                }
                sendCv(updated[0][cv], voice)
            } else {
                updated[voice] = mutate(updated[voice], cv, { reverse })
                sendCv(updated[voice][cv], voice)
            }
            updateSaved(false)
            return updated
        })
    }, [cv, voice, updateSaved])

    // For display, use the first voice if "All" is selected
    const currentCvs = voice === -1 ? allCvs[0] : allCvs[voice]
    const currentSaved = voice === -1 ? saved[0] : saved[voice]

    return <div className="cv-range">
        <div className="cv-range__graph-controls">
            <VerticalRangeSelector setRange={updateStart} value={currentCvs[cv].start}/>
            <CvResponseCurve start={currentCvs[cv].start} end={currentCvs[cv].end} curve={currentCvs[cv].curve} reverse={currentCvs[cv].reverse}/>
            <VerticalRangeSelector setRange={updateEnd} value={currentCvs[cv].end}/>
        </div>
        <div className="cv-range__params">
            <CvCurveSelector onSelect={updateCurve} curve={currentCvs[cv].curve}/>
            <CvSelector onSelect={setCv} cv={cv}/>
            <CvReverseCheckbox onChange={updateReverse} reverse={currentCvs[cv].reverse}/>
            <button disabled={currentSaved[cv]} onClick={onSave}>Save</button>
            <button disabled={currentSaved[cv]} onClick={onReset}>Reset</button>
            <button onClick={onLoadAll}>Ld all</button>
            <div className="cv-range__nowrap">V: {getAsVolts(currentCvs[cv].start)} - {getAsVolts(currentCvs[cv].end)}</div>
        </div>
    </div>
}

type Props = { voice: number };

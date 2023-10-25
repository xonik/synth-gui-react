import React, { useCallback, useState } from 'react'
import ReactSlider from 'react-slider'
import { setCvParams } from '../../midi/rpc/api'
import CvResponseCurve from './CvResponseCurve'
import './CvRange.scss'
import '../lfos/StagesCurve.scss'
import '../lfos/Stages.scss'
import { CV_CHANNELS, CVs } from './CvDefinitions'

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

const CvSelector = ({ onSelect, cv }: CvSelectorProps) => {

    const onOptionChangeHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value
        console.log(value)
        if (value) {
            onSelect(Number.parseInt(value));
        }
    }, [onSelect])

    return <select onChange={onOptionChangeHandler} value={cv}>
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

    // TODO: get from c++
    const options = [
        'COSINE',
        'EXP1',
        'EXP2',
        'EXP3',
        'LIN',
        'LOG1',
        'LOG2',
        'LOG3',
        'SQUARE',
        'RANDOM'
    ]

    const onOptionChangeHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value
        console.log(value)
        if (value) {
            onSelect(Number.parseInt(value));
        }
    }, [onSelect])

    return <select onChange={onOptionChangeHandler} value={curve}>
        <option value=''>Curve</option>
        {options.map((option, index) => {
            return (
                <option key={index} value={index}>
                    {option}
                </option>
            );
        })}
    </select>
}


function getAsVolts(index: number) {
    return (Math.round(500 * (index / 65535)) / 100).toFixed(2)
}

type CvRange = {
    cv: number,
    start: number,
    end: number,
    curve: number
}

function getInitialSaved() {
    const saved: boolean[] = []
    for (let i = 0; i < CV_CHANNELS; i++) {
        saved.push(true)
    }
    return saved
}

const initialSaved = getInitialSaved()

function getInitialCvRanges() {
    const cvRanges: CvRange[] = []
    for (let i = 0; i < CV_CHANNELS; i++) {
        cvRanges.push({
            cv: i,
            start: 0,
            end: 65535,
            curve: 4,
        })
    }
    return cvRanges
}

const initialCvRanges = getInitialCvRanges()

const CV_RANGES_KEY = 'cv_ranges'
const save = (cvRanges: CvRange[]) => localStorage.setItem('cv_ranges', JSON.stringify(cvRanges))
const load = () => {
    const persisted = localStorage.getItem('cv_ranges')
    if (!persisted) {
        return initialCvRanges
    }
    try {
        return JSON.parse(persisted) as CvRange[]
    } catch {
        return initialCvRanges
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

function sendAll(cvRanges: CvRange[], i: number) {
    const { cv, start, end, curve } = cvRanges[i]
    setCvParams(cv, start, end, curve)

    if(i <CV_CHANNELS-1){
        setTimeout(() => {
            sendAll(cvRanges, i + 1)
        }, 50)
    }
}

const CvRange = () => {

    console.log('render')
    const [allCvs, setAllCvs] = useState<CvRange[]>(load())
    const [cv, setCv] = useState<number>(0)
    const [saved, setSaved] = useState<boolean[]>(initialSaved)

    const updateSaved = useCallback((isSaved: boolean) => {
        const updatedSaved = [...saved]
        updatedSaved[cv] = isSaved
        setSaved(updatedSaved)
    }, [cv, saved])

    const sendCv = (cvRange: CvRange) => {
        console.log(cvRange)
        setCvParams(cvRange.cv, cvRange.start, cvRange.end, cvRange.curve)
    }

    const onSave = useCallback(() => {
        const cvRange = allCvs[cv]
        const persistedCvs = load()
        const updatedCvs = [...persistedCvs]
        updatedCvs[cv] = cvRange
        save(updatedCvs)

        updateSaved(true)
    }, [cv, allCvs, updateSaved])

    const onReset = useCallback(() => {
        const persistedCvs = load()
        const updatedAllCvs = [...allCvs]
        updatedAllCvs[cv] = persistedCvs[cv]
        setAllCvs(updatedAllCvs)
        sendCv(updatedAllCvs[cv])
        updateSaved(true)
    }, [cv, allCvs])

    const onLoadAll = useCallback(() => {
        const persistedCvs = load()
        sendAll(persistedCvs, 0)
    }, [cv, allCvs])

    const updateStart = useCallback((start: number) => {
        const updatedAllCvs = mutate(allCvs, cv, { start })
        setAllCvs(updatedAllCvs)
        updateSaved(false)
        sendCv(updatedAllCvs[cv])
    }, [cv, allCvs])
    const updateEnd = useCallback((end: number) => {
        const updatedAllCvs = mutate(allCvs, cv, { end })
        setAllCvs(updatedAllCvs)
        updateSaved(false)
        sendCv(updatedAllCvs[cv])
    }, [cv, allCvs])
    const updateCurve = useCallback((curve: number) => {
        const updatedAllCvs = mutate(allCvs, cv, { curve })
        setAllCvs(updatedAllCvs)
        updateSaved(false)
        sendCv(updatedAllCvs[cv])
    }, [cv, allCvs])

    return <div className="cv-range">
        <div className="cv-range__graph-controls">
            <VerticalRangeSelector setRange={updateStart} value={allCvs[cv].start}/>
            <CvResponseCurve start={allCvs[cv].start} end={allCvs[cv].end} curve={allCvs[cv].curve}/>
            <VerticalRangeSelector setRange={updateEnd} value={allCvs[cv].end}/>
        </div>
        <div className="cv-range__params">
            <CvCurveSelector onSelect={updateCurve} curve={allCvs[cv].curve}/>
            <CvSelector onSelect={setCv} cv={cv}/>
            <button disabled={saved[cv]} onClick={onSave}>Save</button>
            <button disabled={saved[cv]} onClick={onReset}>Reset</button>
            <button onClick={onLoadAll}>Load all</button>
            <div>Voltages: {getAsVolts(allCvs[cv].start)} - {getAsVolts(allCvs[cv].end)}</div>
        </div>
    </div>
}

export default CvRange
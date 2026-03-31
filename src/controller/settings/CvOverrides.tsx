import type React from 'react'
import { useCallback, useState } from 'react'
import ReactSlider from 'react-slider'
import { releaseCVOverride, releaseCVOverrides, setCVOverride, VOICE_ALL } from '../../midi/rpc/api'
import { sharedConfig } from '../../sharedConfig'
import { CV_CHANNELS, CVs } from './CvDefinitions'
import './CvRange.scss'

type RangeProps = {
    setRange: (value: number) => void
    value: number
}

const VerticalSelector = ({ setRange, value }: RangeProps) => (
    <ReactSlider
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
)

type CvSelectorProps = {
    cv: number
    onSelect: (cv: number) => void
}
const CvSelector = ({ onSelect, cv }: CvSelectorProps) => {
    const onOptionChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            event.preventDefault()
            const value = event.target.value
            if (value) {
                onSelect(Number.parseInt(value, 10))
            }
        },
        [onSelect]
    )

    return (
        <select onChange={onOptionChangeHandler} value={cv}>
            {CVs.map((cv, index) => (
                <option key={index} value={cv.channel}>
                    {cv.description} ({cv.channel})
                </option>
            ))}
        </select>
    )
}

function getAsVolts(index: number) {
    return (Math.round(500 * (index / 65535)) / 100).toFixed(2)
}

type CvRange = {
    cv: number
    value: number
}

function getInitialCVs() {
    const CVsArr: CvRange[] = []
    for (let i = 0; i < CV_CHANNELS; i++) {
        CVsArr.push({ cv: i, value: 0 })
    }
    return CVsArr
}

function getInitialAllCVs() {
    return Array.from({ length: sharedConfig.VOICE_COUNT.value }, getInitialCVs)
}

type Props = { voice: number }

export const CvOverrides = ({ voice }: Props) => {
    const [allCvs, setAllCvs] = useState<CvRange[][]>(getInitialAllCVs())
    const [cv, setCv] = useState<number>(0)

    const onRelease = useCallback(() => {
        releaseCVOverride(cv, voice)
    }, [cv, voice])

    const onReleaseAll = useCallback(() => {
        releaseCVOverrides()
    }, [])

    const updateCV = useCallback(
        (start: number) => {
            setAllCvs((prev) => {
                const updated = prev.map((arr) => arr.map((obj) => ({ ...obj })))
                if (voice === VOICE_ALL) {
                    for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                        updated[v][cv].value = start
                    }
                } else {
                    updated[voice][cv].value = start
                }
                setCVOverride(cv, start, voice)
                return updated
            })
        },
        [cv, voice]
    )

    // For display, show the first voice if "All" is selected
    const currentCVs = voice === VOICE_ALL ? allCvs[0] : allCvs[voice]

    return (
        <div className="cv-range">
            <div className="cv-range__graph-controls">
                <VerticalSelector setRange={updateCV} value={currentCVs[cv].value} />
            </div>
            <div className="cv-range__params">
                <CvSelector onSelect={setCv} cv={cv} />
                <button onClick={onRelease}>Release</button>
                <button onClick={onReleaseAll}>Release all</button>
                <div>Voltage: {getAsVolts(currentCVs[cv].value)}</div>
            </div>
        </div>
    )
}

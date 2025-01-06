import React, { useCallback, useState } from 'react'
import ReactSlider from 'react-slider'
import {
    releaseCVOverride,
    releaseCVOverrides,
    saveCvMapping,
    saveCvMappings,
    setCVOverride,
    setCvParams
} from '../../midi/rpc/api'
import CvResponseCurve from './CvResponseCurve'
import { CV_CHANNELS, CVs } from './CvDefinitions'
import { curveNames } from '../../components/curves/shortCurveNames'
import { curveValuesUsed } from './generatedTypes'
import './CvRange.scss'
import '../lfos/StagesCurve.scss'
import '../lfos/Stages.scss'

import { Curve } from '../../synthcore/generatedTypes'

type RangeProps = {
    setRange: (value: number) => void,
    value: number
}

const VerticalSelector = ({ setRange, value }: RangeProps) => {

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

function getAsVolts(index: number) {
    return (Math.round(500 * (index / 65535)) / 100).toFixed(2)
}

type CvRange = {
    cv: number,
    value: number,
}

function getInitialCVs() {
    const CVs: CvRange[] = []
    for (let i = 0; i < CV_CHANNELS; i++) {
        CVs.push({cv: i, value: 0})
    }
    return CVs
}

const initialCVS = getInitialCVs()


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

const CvRange = () => {

    console.log('render')
    const [allCvs, setAllCvs] = useState<CvRange[]>(initialCVS)
    const [cv, setCv] = useState<number>(0)

    const onRelease = useCallback(() => {
        releaseCVOverride(cv)
    }, [cv])

    const onReleaseAll = useCallback(() => {
        releaseCVOverrides();
    }, [])

    const updateCV = useCallback((start: number) => {
        const updatedAllCvs = mutate(allCvs, cv, { value: start })
        setAllCvs(updatedAllCvs)
        setCVOverride(cv, updatedAllCvs[cv].value)
    }, [cv, allCvs])

    return <div className="cv-range">
        <div className="cv-range__graph-controls">
            <VerticalSelector setRange={updateCV} value={allCvs[cv].value}/>
        </div>
        <div className="cv-range__params">
            <CvSelector onSelect={setCv} cv={cv}/>
            <button onClick={onRelease}>Release</button>
            <button onClick={onReleaseAll}>Release all</button>
            <div>Voltages: {getAsVolts(allCvs[cv].value)}</div>
        </div>
    </div>
}

export default CvRange
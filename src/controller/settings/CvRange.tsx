import React, { useCallback, useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import { setCvParams } from '../../midi/rpc/api'
import CvResponseCurve from './CvResponseCurve'
import './CvRange.scss'
import '../lfos/StagesCurve.scss'
import '../lfos/Stages.scss'
import { Curve } from '../../synthcore/modules/lfo/types'

type RangeProps = {
    setRange: (value: number) => void,
    defaultValue: number
}

const VerticalRangeSelector = ({ setRange, defaultValue }: RangeProps) => {

    return <ReactSlider
        className="horizontal-slider cv-range__graph-controls__range"
        thumbClassName="cv-range__thumb"
        trackClassName="example-track"
        orientation="vertical"
        max={65535}
        min={0}
        invert
        defaultValue={defaultValue}
        onChange={setRange}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />

}

type CvSelectorProps = {
    onSelect: (cv: number) => void
}
type CvCurveSelectorProps = {
    onSelect: (curve: number) => void
}
const CV_CHANNELS = 64 // get from c++
const CvSelector = ({onSelect}: CvSelectorProps) => {

    const options: number[] = []
    for(let i=0; i<CV_CHANNELS; i++) {
        options.push(i)
    }

    const onOptionChangeHandler = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const value = event.target.value
        console.log(value)
        if(value) {
            onSelect(Number.parseInt(value));
        }
    }, [onSelect])

    return <select onChange={onOptionChangeHandler}>
        <option value=''>CV channel</option>
        {options.map((option, index) => {
            return (
                <option key={index} value={index}>
                    {option}
                </option>
            );
        })}
    </select>
}

const CvCurveSelector = ({onSelect}: CvCurveSelectorProps) => {

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
        if(value) {
            onSelect(Number.parseInt(value));
        }
    }, [onSelect])

    return <select onChange={onOptionChangeHandler}>
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


type CvResponseProps = {
    start: number
    end: number
    curve: number
}

function getAsVolts(index: number){
 return (Math.round(500 * (index / 65535)) / 100).toFixed(2)
}

// TODO: save to local storage
const CvRange = () => {
    const [start, setStart] = useState<number>(0)
    const [end, setEnd] = useState<number>(65535)
    const [curve, setCurve] = useState<number>(4)
    const [cv, setCv] = useState<number>(0)
    const [autoUpdate, setAutoUpdate] = useState<boolean>(true)

    const updateCv = useCallback(() => {
        setCvParams(cv, start, end, curve)
    }, [start, end, curve, cv])

    useEffect(() => {
        if (autoUpdate) updateCv()
    }, [autoUpdate, start, end, curve])

    return <div className="cv-range">
        <div className="cv-range__graph-controls">
            <VerticalRangeSelector setRange={setStart} defaultValue={0}/>
            <CvResponseCurve start={start} end={end} curve={curve}/>
            <VerticalRangeSelector setRange={setEnd} defaultValue={65535}/>
        </div>
        <div className="cv-range__params">
            <CvCurveSelector onSelect={setCurve}/>
            <CvSelector onSelect={setCv}/>
            <div>Voltages: {getAsVolts(start)} - {getAsVolts(end)}</div>
        </div>
    </div>
}

export default CvRange
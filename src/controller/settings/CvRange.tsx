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
        thumbClassName="example-thumb"
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
const CvSelector = ({onSelect}: CvSelectorProps) => {

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
        <option value=''>Please choose one option</option>
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

const CvRange = () => {
    const [start, setStart] = useState<number>(0)
    const [end, setEnd] = useState<number>(65535)
    const [curve, setCurve] = useState<number>(4)
    const [cv, setCv] = useState<number>(0)
    const [autoUpdate, setAutoUpdate] = useState<boolean>(false)

    const updateCv = useCallback(() => {
        setCvParams(cv, start, end, curve)
    }, [start, end, curve, cv])

    useEffect(() => {
        if (autoUpdate) updateCv()
    }, [autoUpdate, start, end, curve])

    return <>
        <div className="cv-range__graph-controls">
            <VerticalRangeSelector setRange={setStart} defaultValue={0}/>
            <CvResponseCurve start={start} end={end} curve={curve}/>
            <VerticalRangeSelector setRange={setEnd} defaultValue={65535}/>
        </div>
        <div>
            <CvSelector onSelect={setCv}/>
            <div>Curve:</div>
            <div>Auto update:</div>
        </div>
    </>
}

export default CvRange
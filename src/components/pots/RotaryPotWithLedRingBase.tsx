import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import arc from '../../utils/svg/arc'
import RotaryPotBase from './RotaryPotBase'
import { MidiConfig } from '../../midi/types'
import { sendCC, subscribe, unsubscribe } from '../../midi/midibus'
import { useAppDispatch } from '../../synthcore/hooks'
import { increment } from '../../synthcore/modules/controller/controllerReducer'
import { ControllerGroupIds } from '../../synthcore/types'
import './RotaryPot.scss'

export type LedMode = 'single' | 'multi';
export type PotMode = 'normal' | 'pan' | 'spread';

export interface Props {
    x: number;
    y: number;
    ledCount?: number;
    ledMode?: LedMode
    potMode?: PotMode
    label: string
    position?: number;
    midiConfig?: MidiConfig;
    defaultValue?: number;
    storePosition?: number;
    ctrlGroup?: ControllerGroupIds;
    ctrlId?: number;
    ctrlIndex?: number;
    disabled?: boolean;
}

interface Config {
    knobRadius: number;
    ledArc?: number;
    windowToKnobMargin?: number;
    windowWidth?: number;
}

const getRenderProps = (props: Props & Config) => {
    const knobRadius = props.knobRadius
    const ledCount = props.ledCount || 31
    const ledArc = props.ledArc || 270
    const windowToKnobMargin = props.windowToKnobMargin || 2
    const windowWidth = props.windowWidth || 4

    const ledRadius = 0.4
    const centerLed = (ledCount - 1) / 2
    const ledRingRadius = knobRadius + windowToKnobMargin + windowWidth / 2

    // TODO: Dynamically calculate this based on window
    // TODO: Set font size in relative units...
    const labelY = ledRingRadius + 5

    const degreesBetweenLeds = ledArc / (ledCount - 1)
    const ledAngles = []
    for (let i = 0; i < ledCount; i++) {
        ledAngles.push(-(ledArc / 2) + degreesBetweenLeds * i)
    }

    // Ideally the window should be a shape, not a path with a stroke, to be able to convert the
    // SVG into paths for cutting.

    // Distance from last led to the end should really be equal to the distance between two leds,
    // but for now it's just 2/3 the distance from the center of one led to the next.
    const windowStartAngle = -ledArc / 2 - 2 * (degreesBetweenLeds / 3)
    const windowEndAngle = windowStartAngle * -1
    const windowArc = arc(0, 0, ledRingRadius, windowStartAngle, windowEndAngle)

    return {
        ledRadius,
        knobRadius,
        ledCount,
        centerLed,
        windowWidth,
        ledRingRadius,
        labelY,
        ledAngles,
        windowArc,
        ledArc,
    }
}

const getLedPos = (centerLed: number, ledCount: number, mode: PotMode, position: number): number => {
    switch (mode) {
        case 'normal':
            return Math.abs(Math.ceil(position * (ledCount - 1) - 0.5))
        case 'pan': {
            // Done this way so that edge case for rounding is the same on both sides of center
            // Pan is sentered when position is 0.5.
            const panAmount = Math.round(Math.abs(2 * (position - 0.5) * centerLed))
            const sign = position >= 0.5 ? 1 : -1
            return centerLed + (panAmount * sign)
        }
        case 'spread': {
            // Done this way so that edge case for rounding is the same on both sides of center
            // Spread goes from 0 to 1 where 0 is senter and 1 is max spread.
            const panAmount = Math.round(Math.abs((position) * centerLed))
            return centerLed + panAmount
        }
    }
    return 0
}

export default (props: Props & Config) => {

    // Position should be in the range 0-1 in all modes but pan. In pan the range is -0.5 - 0.5
    const { x, y, ledMode = 'single', potMode = 'normal', label, midiConfig, position: defaultValue,
        storePosition, ctrlGroup, ctrlId, ctrlIndex, disabled
    } = props

    const localControl = ctrlGroup === undefined && ctrlId === undefined && ctrlIndex === undefined

    const dispatch = useAppDispatch()

    const {
        ledRadius,
        knobRadius,
        ledCount,
        centerLed,
        windowWidth,
        ledRingRadius,
        labelY,
        ledAngles,
        windowArc,
        ledArc,
    } = getRenderProps(props);
    // For objects centered around 0, use overflow: visible
    // For scaling, use viewBox on the outer svg and unitless the rest of the way

    const [statePosition, setStatePosition] = useState(defaultValue || 0);

    // positive pointer
    const currentPosition = storePosition !== undefined ? storePosition : statePosition
    const ledPosition = getLedPos(centerLed, ledCount, potMode, currentPosition)

    // negative pointer used for spread
    const negLedPosition = centerLed - (ledPosition - centerLed)

    // TODO: Remove once all functions go through redux store. Until then, pots without connection will send and receive midi
    // themselves.
    const sendMidi = useCallback((position: number) => {
        if(midiConfig){
            sendCC(midiConfig.cc, Math.round(127 * position));
        }
    }, [midiConfig]);

    const localIncrement = useCallback((steps: number, stepSize: number) => {
        if(disabled) return;

        const newPosition = statePosition + steps * stepSize;
        if(newPosition < 0){
            if(statePosition > 0){
                sendMidi(0);
            }
        } else if(newPosition > 1){
            if(statePosition < 1) {
                sendMidi(1);
            }
        } else if(newPosition !== statePosition){
            sendMidi(newPosition);
        }
    }, [disabled, sendMidi, statePosition])

    const onIncrement = useCallback((steps: number, stepSize: number) => {
        if(disabled) return;

        if(ctrlId !== undefined && ctrlGroup !== undefined) {
            dispatch(increment({ ctrlGroup, ctrlId, value: steps * stepSize, ctrlIndex }))
        }
    }, [disabled, ctrlGroup, ctrlId, ctrlIndex, dispatch])

    useEffect(() => {
        if(midiConfig) {
            const updateValueFromMidi = (midiValue: number) => {
                setStatePosition(midiValue / 127);
            }

            const subscriberId = subscribe(updateValueFromMidi, midiConfig)
            return function cleanup() {
                unsubscribe(midiConfig.cc, subscriberId);
            };
        }
    });

    return (
        <svg x={x} y={y} className="pot">
            <RotaryPotBase
                knobRadius={knobRadius}
                onIncrement={localControl ? localIncrement : onIncrement}
                arc={ledArc}
                defaultValue={defaultValue }
            />
            <path d={windowArc} className="pot-ring-window" strokeWidth={windowWidth}/>
            {ledAngles.map((angle, led) => {
                const ledOn =
                    !disabled && (
                    // pointer should always be on
                    (ledMode === 'single' && led === ledPosition) ||

                    // 'negative' pointer should be on for spread
                    (ledMode === 'single' && potMode === 'spread' && led === negLedPosition) ||

                    // highlight all from start to position
                    (ledMode === 'multi' && potMode === 'normal' && led <= ledPosition) ||

                    // highlight all from center to position when panning
                    (ledMode === 'multi' && potMode === 'pan' && (
                        (ledPosition >= centerLed && led >= centerLed && led <= ledPosition) ||
                        (ledPosition <= centerLed && led <= centerLed && led >= ledPosition)
                    )) ||

                    // highlight all from center to pointer on both sides when spreading
                    (ledMode === 'multi' && potMode === 'spread' && (
                        (led >= negLedPosition) && (led <= ledPosition)
                    ))
                    )

                return <circle
                    key={led}
                    cx={0} cy={-ledRingRadius} r={ledRadius} stroke="black" fill="red"
                    transform={`rotate(${angle})`}
                    className={classNames('pot-ring-led', { 'pot-ring-led__on': ledOn })}/>
            })}
            <text x={0} y={labelY} className="pot-label" textAnchor="middle">{label}</text>
        </svg>
    )
}

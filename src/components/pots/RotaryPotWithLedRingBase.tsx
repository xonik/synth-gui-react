import React, { useCallback } from 'react'
import classNames from 'classnames'
import arc from '../../utils/svg/arc'
import RotaryPotBase from './RotaryPotBase'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import { increment } from '../../synthcore/modules/ui/uiReducer'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { ControllerConfig } from '../../midi/types'
import './RotaryPot.scss'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'
import { getControllerSelector } from '../../synthcore/modules/common/controllerSelectors'

export type LedMode = 'single' | 'multi';
export type PotMode = 'normal' | 'pan' | 'spread';

export interface Props {
    x: number;
    y: number;
    ledCount?: number;
    ledMode?: LedMode
    potMode?: PotMode
    label: string
    value?: number;
    ctrlGroup: ControllerGroupIds;
    ctrl: ControllerConfig;
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

const RotaryPotWithLedRingBase = (props: Props & Config) => {

    // Position should be in the range 0-1 in all modes but pan. In pan the range is -0.5 - 0.5
    const { x, y, ledMode = 'single', potMode = 'normal', label,
        value, ctrlGroup, ctrl, ctrlIndex, disabled
    } = props

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

    // positive pointer
    const storeValue = useAppSelector(getControllerSelector(ctrlGroup)(ctrl.id, ctrlIndex || 0))
    const currentValue = value || storeValue

    const ledPosition = getLedPos(centerLed, ledCount, potMode, currentValue)

    // negative pointer used for spread
    const negLedPosition = centerLed - (ledPosition - centerLed)

    const onIncrement = useCallback((steps: number, stepSize: number) => {
        if(disabled) return;

        // When panning, we cover a -1 to 1 range instead of 0 to 1.
        // To keep the line in sync with how much the pot has been
        // turned we have to make increments twice as big.
        const value = potMode === 'pan' ? steps * (stepSize * 2) : steps * stepSize
        dispatch(increment({ ctrlGroup, ctrl, value, ctrlIndex, source: ApiSource.UI }))
    }, [disabled, ctrl, ctrlGroup, potMode, dispatch, ctrlIndex])

    return (
        <svg x={x} y={y} className="pot">
            <RotaryPotBase
                knobRadius={knobRadius}
                onIncrement={onIncrement}
                arc={ledArc}
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

export default RotaryPotWithLedRingBase

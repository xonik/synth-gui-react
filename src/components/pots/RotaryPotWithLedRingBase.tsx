import classNames from 'classnames'
import { useCallback, useRef } from 'react'
import { SHOW_CUT } from '@/config'
import { getCanDeselect, trySelectDst, trySelectSource, useModRoutingFlash } from '@/synthcore/modules/mods/modRoutingInterceptor'
import arc from '../../utils/svg/arc'
import RotaryPotBase from './RotaryPotBase'
import './RotaryPot.scss'

export type LedMode = 'single' | 'multi'
export type PotMode = 'normal' | 'pan' | 'spread'

export interface Props {
    x: number
    y: number
    ledCount?: number
    ledMode?: LedMode
    potMode?: PotMode
    label: string
    value?: number
    disabled?: boolean
    silver?: boolean
    // Routing: if hwSourceId is set, touching this pot selects the module as mod source.
    // If ctrlId/ctrlIndex are set and the ctrl is in dstLookup, touching it selects it as mod destination.
    hwSourceId?: number
    ctrlId?: number
    ctrlIndex?: number
    onValueIncrement?: (delta: number) => void
}

interface Config {
    knobRadius: number
    ledArc?: number
    windowToKnobMargin?: number
    windowWidth?: number
}

const getRenderProps = (props: Props & Config) => {
    const knobRadius = props.knobRadius
    const ledCount = props.ledCount || 31
    const ledArc = props.ledArc || 270
    const windowToKnobMargin = props.windowToKnobMargin || 2
    const windowWidth = props.windowWidth || 3

    const ledRadius = 0.4
    const centerLed = (ledCount - 1) / 2
    const ledRingRadius = knobRadius + windowToKnobMargin + windowWidth / 2

    // TODO: Dynamically calculate this based on window
    // TODO: Set font size in relative units...
    const labelY = ledRingRadius + 4

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
            return centerLed + Math.round(centerLed * position)
        }
        case 'spread': {
            // Done this way so that edge case for rounding is the same on both sides of center
            // Spread goes from 0 to 1 where 0 is senter and 1 is max spread.
            const panAmount = Math.round(Math.abs(position * centerLed))
            return centerLed + panAmount
        }
    }
    return 0
}

const RotaryPotWithLedRingBase = (props: Props & Config) => {
    // Position should be in the range 0-1 in all modes but pan. In pan the range is -0.5 - 0.5
    const { x, y, ledMode = 'single', potMode = 'normal', label, value, disabled, silver, hwSourceId, ctrlId, ctrlIndex = 0, onValueIncrement } = props

    const gestureCanDeselect = useRef(false)
    const gestureHasInteracted = useRef(false)

    const { getSourceFlash, getDstFlash } = useModRoutingFlash()
    const flashMode = hwSourceId !== undefined
        ? (getSourceFlash(hwSourceId) ?? (ctrlId !== undefined ? getDstFlash(ctrlId, ctrlIndex) : undefined))
        : (ctrlId !== undefined ? getDstFlash(ctrlId, ctrlIndex) : undefined)

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
    } = getRenderProps(props)

    const currentValue = value ?? 0

    const ledPosition = getLedPos(centerLed, ledCount, potMode, currentValue)

    const negLedPosition = centerLed - (ledPosition - centerLed)

    const onDragStart = useCallback(() => {
        gestureCanDeselect.current = getCanDeselect()
        gestureHasInteracted.current = false
    }, [])

    const onIncrement = useCallback(
        (steps: number, stepSize: number) => {
            if (disabled) return
            if (hwSourceId !== undefined && trySelectSource(hwSourceId)) return
            if (ctrlId !== undefined) {
                if (gestureHasInteracted.current) return
                const consumed = trySelectDst(ctrlId, ctrlIndex, false, gestureCanDeselect.current)
                if (consumed) {
                    gestureHasInteracted.current = true
                    return
                }
            }
            const delta = potMode === 'pan' ? steps * (stepSize * 2) : steps * stepSize
            if (onValueIncrement) {
                onValueIncrement(delta)
            }
        },
        [disabled, potMode, onValueIncrement, hwSourceId, ctrlId, ctrlIndex]
    )

    const onPotClick = useCallback(() => {
        if (disabled) return
        if (hwSourceId !== undefined && trySelectSource(hwSourceId)) return
        if (ctrlId !== undefined && trySelectDst(ctrlId, ctrlIndex, true)) return
    }, [disabled, hwSourceId, ctrlId, ctrlIndex])

    const potClass = flashMode ? `pot pot--routing-${flashMode}` : 'pot'

    return (
        <svg x={x} y={y} className={potClass}>
            <RotaryPotBase knobRadius={knobRadius} onClick={onPotClick} onDragStart={onDragStart} onIncrement={onIncrement} arc={ledArc} silver={silver} />
            <path d={windowArc} className="pot-ring-window" strokeWidth={windowWidth} />
            {!SHOW_CUT &&
                ledAngles.map((angle, led) => {
                    const ledOn =
                        !disabled &&
                        // pointer should always be on
                        ((ledMode === 'single' && led === ledPosition) ||
                            // 'negative' pointer should be on for spread
                            (ledMode === 'single' && potMode === 'spread' && led === negLedPosition) ||
                            // highlight all from start to position
                            (ledMode === 'multi' && potMode === 'normal' && led <= ledPosition) ||
                            // highlight all from center to position when panning
                            (ledMode === 'multi' &&
                                potMode === 'pan' &&
                                ((ledPosition >= centerLed && led >= centerLed && led <= ledPosition) ||
                                    (ledPosition <= centerLed && led <= centerLed && led >= ledPosition))) ||
                            // highlight all from center to pointer on both sides when spreading
                            (ledMode === 'multi' &&
                                potMode === 'spread' &&
                                led >= negLedPosition &&
                                led <= ledPosition))

                    return (
                        <circle
                            key={angle}
                            cx={0}
                            cy={-ledRingRadius}
                            r={SHOW_CUT ? ledRadius * 2 : ledRadius}
                            transform={`rotate(${angle})`}
                            className={classNames('pot-ring-led', { 'pot-ring-led__on': ledOn })}
                        />
                    )
                })}
            <text x={0} y={labelY} className="pot-label" textAnchor="middle">
                {label}
            </text>
        </svg>
    )
}

export default RotaryPotWithLedRingBase

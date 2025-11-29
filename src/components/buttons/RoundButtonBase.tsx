import React, { useCallback } from 'react'
import classNames from 'classnames'
import RoundPushButtonBase from './RoundPushButtonBase'
import RotaryPotBase from '../pots/RotaryPotBase'
import { ControllerConfig } from '../../midi/types'
import { ApiSource, ControllerGroupIds } from '../../synthcore/types'
import { click, release } from '../../synthcore/modules/ui/uiReducer'
import { dispatch } from '../../synthcore/utils'
import { useAppSelector } from '../../synthcore/hooks'
import { selectUiController } from '../../synthcore/modules/controllers/controllersReducer'
import './RoundButton.scss'
import { SHOW_CUT } from "../../config";
import { WaveformIconType } from "../images/types";

type LedPosition =
    'left'
    | 'right'
    | 'right2'
    | 'right-two-cols'
    | 'sides'
    | 'top'
    | 'top-horizontal'
    | 'top-horizontal-no-label'
    | 'bottom'
    | undefined;
type LabelPosition = 'left' | 'right' | 'top' | 'bottom' | 'bottom-pot' | undefined;
type ButtonMode = 'push' | 'rotate';

// Stuff that is special for a particular kind of button, used in wrapper functions.
type Config = {
    buttonRadius: number;
    buttonMode: ButtonMode;
    ledMargin?: number; // margin button-led
    ledToLedMargin?: number; // vertical spacing
    labelMargin?: number; // margin button-label
    ledTolabelMargin?: number; // margin button-label
    ledButton?: boolean;
}

// Per instance properties.
export interface Props {
    x: number;
    y: number;
    label?: string;
    labelPosition?: LabelPosition;
    ledLabels?: Array<string | JSX.Element>;
    ledPosition?: LedPosition;
    ledRingColors?: string [];

    // Number of leds AROUND the button. If this is undefined but ledButton is true, the button itself is a led.
    ledCount?: number;

    // When selecting what leds to light up, use a binary counting: 0ff, 1, 2, 1 and 2, 3. etc. Makes it possible
    // to show a combination of mode 1 and 2 for arpeggiator.
    ledCycleBinary?: boolean;

    // True if the first midi value is an off state, lets us switch off all diodes
    hasOff?: boolean;

    // Normally, clicking a button adds one modulo the length of the value array to the value. If this is true it subtracts instead
    reverse?: boolean;

    // Loop - normally true, means that if we're clicking through a group and have reached the end, we will wrap around and start at the beginning
    loop?: boolean;

    // Used if button is part of a group - "radio button"
    radioButtonIndex?: number;

    // If momentary is true it may have two values - one that is sent on key pressed and one on release.
    momentary?: boolean;

    ctrlGroup: ControllerGroupIds;
    ctrl: ControllerConfig;
    ctrlIndex?: number;
    value?: number;
    valueIndex?: number;

    // Only used if rotary button
    resolution?: number;
}

type LabelPos = {
    x: number;
    y: number;
    textAnchor: string;
}

type LedPos = {
    x: number;
    y: number;
    labelX: number;
    labelY?: number;
    textAnchor: string;
}

type RenderProps = {
    buttonRadius: number;
    cutRadius: number,
    buttonMode: ButtonMode;
    ledRadius: number;
    labelPos: LabelPos;
    ledPos: LedPos[];
    ledLabels: Array<string | JSX.Element>;
}

const positionLabel = (buttonRadius: number, labelPosition: LabelPosition, labelMargin: number): LabelPos => {
    switch (labelPosition) {
        case 'left':
            return {
                x: -(buttonRadius + labelMargin + 2),
                y: 0.9,
                textAnchor: 'end'
            }
        case 'right':
            return {
                x: buttonRadius + labelMargin + 2,
                y: 0.9,
                textAnchor: 'start'
            }
        case 'top':
            return {
                x: 0,
                y: -(buttonRadius + labelMargin + 3),
                textAnchor: 'middle'
            }
        case 'bottom':
            return {
                x: 0,
                y: buttonRadius + labelMargin + 3,
                textAnchor: 'middle'
            }
        case 'bottom-pot':
            return {
                x: 0,
                y: buttonRadius + labelMargin + 7,
                textAnchor: 'middle'
            }
        default:
            return { x: 0, y: 0, textAnchor: 'right' }
    }
}

const positionLeds = (
    buttonRadius: number,
    ledRadius: number,
    ledCount: number,
    ledPosition: LedPosition,
    ledMargin: number,
    ledToLedMargin: number,
    ledTolabelMargin: number,
    buttonMode: ButtonMode,
): LedPos[] => {
    if (ledCount === 0) {
        return []
    }

    const yDist = 2 * ledRadius + ledToLedMargin
    const ledPositions = []

    for (let i = 0; i < ledCount; i++) {
        const leftLeds = Math.ceil(ledCount / 2)
        let adjustedPosition = ledPosition
        let adjustedLedCount = ledCount
        let adjustedI = i
        if (ledPosition === 'sides') {
            if (i < leftLeds) {
                adjustedPosition = 'left'
                adjustedLedCount = leftLeds
            } else {
                adjustedPosition = 'right'
                adjustedLedCount = ledCount - leftLeds
                adjustedI = i - leftLeds
            }
        }

        if (ledPosition === 'right-two-cols') {
            if (i < leftLeds) {
                adjustedPosition = 'right'
                adjustedLedCount = leftLeds
            } else {
                adjustedPosition = 'right2'
                adjustedLedCount = ledCount - leftLeds
                adjustedI = i - leftLeds
            }
        }

        // left column should start at the bottom if we have a rotational button.
        const directionMultiplier = buttonMode === 'push' ? 1 : -1

        switch (adjustedPosition) {
            case 'left':
                ledPositions.push({
                    x: -(buttonRadius + ledMargin + 2 + ledRadius),
                    y: directionMultiplier * (adjustedI - (adjustedLedCount - 1) / 2) * yDist,
                    labelX: -(buttonRadius + ledMargin + 2 + ledTolabelMargin + 2 * ledRadius),
                    textAnchor: 'end'
                })
                break
            case 'right':
                ledPositions.push({
                    x: buttonRadius + ledMargin + 2 + ledRadius,
                    y: (adjustedI - (adjustedLedCount - 1) / 2) * yDist,
                    labelX: buttonRadius + ledMargin + 2 + ledTolabelMargin + 2 * ledRadius,
                    textAnchor: 'start'
                })
                break
            case 'right2':
                ledPositions.push({
                    x: buttonRadius + 5 * ledMargin + 2 + ledRadius,
                    y: (adjustedI - (adjustedLedCount - 1) / 2) * yDist,
                    labelX: buttonRadius + 5 * ledMargin + 2 + ledTolabelMargin + 2 * ledRadius,
                    textAnchor: 'start'
                })
                break
            case 'top':
                ledPositions.push({
                    x: 0,
                    y: -((ledCount - 1 - i) * yDist + buttonRadius + ledMargin + ledRadius),
                    labelX: ledRadius + ledTolabelMargin,
                    textAnchor: 'start'
                })
                break
            case 'top-horizontal':
                let startX = -((ledCount - 1) * 1.25 * yDist) / 2
                ledPositions.push({
                    x: startX + 1.25 * i * yDist,
                    y: -yDist / 2 - buttonRadius - ledMargin - ledRadius,
                    labelX: startX + i * 1.25 * yDist,
                    labelY: -buttonRadius - 2.3,
                    textAnchor: 'middle'
                })
                break
            case 'top-horizontal-no-label':
                let startX2 = -((ledCount - 1) * 1.25 * yDist) / 2
                ledPositions.push({
                    x: startX2 + 1.25 * i * yDist,
                    y: -buttonRadius - ledMargin - ledRadius,
                    labelX: startX2 + i * 1.25 * yDist,
                    labelY: -buttonRadius - 2,
                    textAnchor: 'middle'
                })
                break
            case 'bottom':
                ledPositions.push({
                    x: 0,
                    y: i * yDist + buttonRadius + ledMargin + ledRadius,
                    labelX: ledRadius + ledTolabelMargin,
                    textAnchor: 'start'
                })
                break
            default:
                ledPositions.push({ x: 0, y: 0, labelX: 0, textAnchor: 'right' })
        }
    }
    return ledPositions
}

const getRenderProps = (props: Props & Config): RenderProps => {
    const buttonRadius = props.buttonRadius
    const cutRadius = 6.9 / 2

    const labelMargin = props.labelMargin || 2
    const labelPosition = props.labelPosition || 'left'

    const ledRadius = SHOW_CUT ? 2.9 / 2 : 1.5
    const ledCount = props.ledCount || 0
    const ledToLedMargin = props.ledToLedMargin || 3
    const ledMargin = props.ledMargin || 4
    const ledTolabelMargin = props.ledTolabelMargin || 3
    const ledPosition = props.ledPosition || 'left'

    return {
        ledRadius,
        buttonRadius,
        cutRadius,
        labelPos: positionLabel(buttonRadius, labelPosition, labelMargin),
        ledPos: positionLeds(buttonRadius, ledRadius, ledCount, ledPosition, ledMargin, ledToLedMargin, ledTolabelMargin, props.buttonMode),
        ledLabels: props.ledLabels || [],
        buttonMode: props.buttonMode,
    }
}

export const RoundButtonBase = (props: Props & Config) => {

    const {
        x, y,
        label,
        radioButtonIndex,
        hasOff,
        ledCount,
        ledButton,
        reverse,
        loop = true,
        momentary,
        ctrlGroup,
        ctrl,
        ctrlIndex,
        value,
        valueIndex,
        resolution,
        ledRingColors,
        ledCycleBinary,
    } = props

    const storeValue = useAppSelector(selectUiController(ctrl, ctrlIndex || 0))
    const currentValue = value !== undefined ? value : storeValue

    // off is always the first element in the midi config values list, so when a radio
    // button has an off state we need to offset our index by one.
    const radioButtonValueIndex = hasOff ? (radioButtonIndex || 0) + 1 : radioButtonIndex || 0
    const hasOffValue = hasOff || (ledButton && ledCount === undefined)
    const ledOnIndex = hasOffValue ? currentValue - 1 : currentValue

    const onIncrement = useCallback((steps: number) => {
        for (let i = 0; i < Math.abs(steps); i++) {
            if (steps > 0) {
                dispatch(click({ ctrlGroup, ctrl, loop, valueIndex, source: ApiSource.UI }))
            } else {
                dispatch(click({ ctrlGroup, ctrl, loop, valueIndex, reverse: true, source: ApiSource.UI }))
            }
        }
    }, [ctrlGroup, ctrl, loop, valueIndex])

    const handleOnClick = useCallback(() => {
        dispatch(click({
            ctrlGroup,
            ctrl,
            ctrlIndex,
            radioButtonIndex,
            reverse,
            loop,
            momentary,
            source: ApiSource.UI
        }))
    }, [ctrlGroup, ctrl, ctrlIndex, radioButtonIndex, reverse, loop, momentary])

    const handleOnRelease = useCallback(() => {
        dispatch(release({ ctrlGroup, ctrl, ctrlIndex, momentary, source: ApiSource.UI }))
    }, [ctrl, ctrlGroup, ctrlIndex, momentary])

    const ledOn: boolean[] = []
    for (let i = 0; i < (ledCount || (ctrl.values?.length || 2) - 1); i++) {
        ledOn[i] = false
    }

    if (radioButtonIndex !== undefined) {
        if (currentValue === radioButtonValueIndex) {
            ledOn[0] = true
        }
    } else {
        if(ledCycleBinary) {
            for(let i = 0; i < ledOn.length; i++) {
                // ledOnIndex -1 means all leds are off
                if (ledOnIndex > -1) {
                    const mask = 1 << i
                    if (((ledOnIndex + (hasOff ? 0 : 1)) & mask) === mask) {
                        ledOn[i] = true
                    }
                }
            }
        } else {
            if (ledOnIndex < ledOn.length) {
                // ledOnIndex -1 means all leds are off
                if (ledOnIndex > -1) {
                    ledOn[ledOnIndex] = true
                }
            } else {
                // light up all leds if there are more options than leds (minus off)
                for (let i = 0; i < (ledCount || 1); i++) {
                    ledOn[i] = true
                }
            }
        }
    }

    const {
        buttonRadius,
        buttonMode,
        cutRadius,
        ledRadius,
        labelPos,
        ledPos,
        ledLabels,
    } = getRenderProps(props)

    // multiple leds for multi-state led buttons are simulated by blinking the led on the button
    const modes = ctrl.values?.length || 2
    let ledButtonStyle = undefined
    if(ledButton){
        if(ledOnIndex === -1){
            ledButtonStyle = 'button-cap-led'
        } else if(ledOnIndex === modes - 2){
            ledButtonStyle = 'button-cap-led__on'
        } else {
            ledButtonStyle = `button-cap-led__on-blink-${ledOnIndex}`
        }
    }

    console.log({
        label,
        ledButtonStyle,
    })

    return (
        <svg x={x} y={y} className="button">
            {buttonMode === 'push'
                ? <RoundPushButtonBase buttonRadius={buttonRadius}
                                       cutRadius={cutRadius}
                                       onClick={handleOnClick}
                                       onRelease={handleOnRelease}
                                       className={classNames(['button-cap', ledButtonStyle])}/>
                : <RotaryPotBase
                    onIncrement={onIncrement}
                    knobRadius={buttonRadius}
                    resolution={resolution}
                />
            }
            {label && <text
                x={labelPos.x}
                y={labelPos.y}
                className="button-label"
                textAnchor={labelPos.textAnchor}
                alignmentBaseline="middle"
            >{label}</text>}
            {ledPos.map((position, index) => <React.Fragment key={index}>
                {ledRingColors && ledRingColors.length > index && <circle
                    cx={position.x} cy={position.y} r={ledRadius + 1}
                    fill={ledRingColors[index]}
                />}

                <circle
                    cx={position.x} cy={position.y} r={ledRadius}
                    className={
                        classNames(
                            'button-led',
                            {
                                'button-led__on': ledOn.length > index && ledOn[index]
                            })
                    }
                />


                {typeof ledLabels[index] === 'string' && <text
                    x={position.labelX}
                    y={position.labelY ?? position.y + 1.07}
                    className="button-led-label"
                    textAnchor={position.textAnchor}
                    alignmentBaseline="middle"
                >{ledLabels[index]}</text>}
                {typeof ledLabels[index] !== 'string' &&
                    <svg
                        x={position.textAnchor === 'middle' ? position.labelX - 1.5 : position.labelX}
                        y={position.labelY ?? position.y + 1.07}
                    >
                        {ledLabels[index]}
                    </svg>}
            </React.Fragment>)}
        </svg>
    )
}

function isString(value: any): value is string {
    return typeof value === "string";
}

export default RoundButtonBase
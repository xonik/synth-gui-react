import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import RoundPushButtonBase from './RoundPushButtonBase'
import RotaryPotBase from '../pots/RotaryPotBase'
import { subscribe, unsubscribe, sendCC } from '../../midibus'
import './RoundButton.scss'
import { MidiConfig } from '../../midiConstants'

type LedPosition = 'left' | 'right' | 'sides' | 'top' | 'bottom' | undefined;
type LabelPosition = 'left' | 'right' | 'top' | 'bottom' | undefined;
type ButtonMode = 'push' | 'rotate';

type Config = {
    buttonRadius: number;
    buttonMode: ButtonMode;
    ledMargin?: number; // margin button-led
    ledToLedMargin?: number; // vertical spacing
    labelMargin?: number; // margin button-label
    ledTolabelMargin?: number; // margin button-label
    ledButton?: boolean;
}

export interface Props {
    x: number;
    y: number;
    label?: string;
    labelPosition?: LabelPosition;
    ledCount?: number;
    ledLabels?: string[];
    ledPosition?: LedPosition;
    midiConfig?: MidiConfig;
    hasOff?: boolean;
    radioButtonIndex?: number; // Used if button is part of a group - "radio button"
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
    textAnchor: string;
}

type RenderProps = {
    buttonRadius: number;
    buttonMode: ButtonMode;
    ledRadius: number;
    labelPos: LabelPos;
    ledPos: LedPos[];
    ledLabels: string[];
}

const positionLabel = (buttonRadius: number, labelPosition: LabelPosition, labelMargin: number): LabelPos => {
    switch (labelPosition) {
        case 'left':
            return {
                x: -(buttonRadius + labelMargin + 2),
                y: 0,
                textAnchor: 'end'
            }
        case 'right':
            return {
                x: buttonRadius + labelMargin + 2,
                y: 0,
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
    ledTolabelMargin: number
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

        switch (adjustedPosition) {
            case 'left':
                ledPositions.push({
                    x: -(buttonRadius + ledMargin + 2 + ledRadius),
                    y: (adjustedI - (adjustedLedCount - 1) / 2) * yDist,
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
            case 'top':
                ledPositions.push({
                    x: 0,
                    y: -((ledCount - 1 - i) * yDist + buttonRadius + ledMargin + ledRadius),
                    labelX: ledRadius + ledTolabelMargin,
                    textAnchor: 'start'
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

    const labelMargin = props.labelMargin || 2
    const labelPosition = props.labelPosition || 'left'

    const ledRadius = 1.5
    const ledCount = props.ledCount || 0
    const ledToLedMargin = props.ledToLedMargin || 3
    const ledMargin = props.ledMargin || 4
    const ledTolabelMargin = props.ledTolabelMargin || 3
    const ledPosition = props.ledPosition || 'left'

    return {
        ledRadius,
        buttonRadius,
        labelPos: positionLabel(buttonRadius, labelPosition, labelMargin),
        ledPos: positionLeds(buttonRadius, ledRadius, ledCount, ledPosition, ledMargin, ledToLedMargin, ledTolabelMargin),
        ledLabels: props.ledLabels || [],
        buttonMode: props.buttonMode,
    }
}

export const RoundButtonBase = (props: Props & Config) => {

    const { x, y, label, midiConfig, radioButtonIndex, hasOff, ledCount, ledButton } = props

    const [currentValue, setCurrentValue] = useState(0);

    // off is always the first element in the midi config values list, so when a radio
    // button has an off state we need to offset our index by one.
    const radioButtonValueIndex = hasOff ? (radioButtonIndex || 0) + 1 : radioButtonIndex || 0;
    const ledOnIndex = hasOff ? currentValue - 1 : currentValue;

    const onClick = useCallback(() => {
        if(midiConfig && midiConfig.values) {
            if(radioButtonIndex !== undefined){
                if(midiConfig.values.length >= radioButtonValueIndex ){
                    if(hasOff && currentValue === radioButtonValueIndex){
                        sendCC(midiConfig.cc, midiConfig.values[0]);
                    } else {
                        sendCC(midiConfig.cc, midiConfig.values[radioButtonValueIndex]);
                    }
                }
            } else {
                const newValue = (currentValue + 1) % midiConfig.values.length;

                sendCC(midiConfig.cc, midiConfig.values[newValue]);
            }
        }
    }, [radioButtonValueIndex, hasOff, midiConfig, currentValue, radioButtonIndex])

    useEffect(() => {
        if(midiConfig && midiConfig.values) {
            const updateValueFromMidi = (midiValue: number) => {
                const newValue = midiConfig.values?.indexOf(midiValue) || 0;
                setCurrentValue(newValue);
            }

            const subscriberId = subscribe(updateValueFromMidi, midiConfig)
            return function cleanup() {
                unsubscribe(midiConfig.cc, subscriberId);
            };
        }
    });

    const ledOn: boolean[] = [];
    for(let i = 0; i< (ledCount || 1); i++){
        ledOn[i] = false;
    }

    // TODO: Fix transpose
    if(radioButtonIndex !== undefined){
        if(currentValue === radioButtonValueIndex) {
          ledOn[0] = true;
        }
    } else {
        if(ledOnIndex < ledOn.length ) {
            // ledOnIndex -1 means all leds are off
            if(ledOnIndex > -1){
                ledOn[ledOnIndex] = true;
            }
        } else {
            // light up all leds if there are more options than leds (minus off)
            for(let i = 0; i< (ledCount || 1); i++){
                ledOn[i] = true;
            }
        }
    }


    const {
        buttonRadius,
        buttonMode,
        ledRadius,
        labelPos,
        ledPos,
        ledLabels,
    } = getRenderProps(props);

    return (
        <svg x={x} y={y} className="button">
            {buttonMode === 'push'
                ? <RoundPushButtonBase buttonRadius={buttonRadius}
                                       onClick={onClick}
                                       className={classNames('button-cap', { 'button-cap-led': ledButton, 'button-cap-led__on': ledButton && ledOn.length > 0 && ledOn[0] })}/>
                : <RotaryPotBase onClick={onClick} knobRadius={buttonRadius}/>
            }
            {label && <text
              x={labelPos.x}
              y={labelPos.y}
              className="button-label"
              textAnchor={labelPos.textAnchor}
              alignmentBaseline="middle"
            >{label}</text>}
            {ledPos.map((position, index) => <React.Fragment key={index}>
                <circle
                    cx={position.x} cy={position.y} r={ledRadius} stroke="black" fill="red"
                    className={classNames('button-led', { 'button-led__on': ledOn.length > index && ledOn[index] })}/>
                {ledLabels[index] && <text
                  x={position.labelX}
                  y={position.y}
                  className="button-led-label"
                  textAnchor={position.textAnchor}
                  alignmentBaseline="middle"
                >{ledLabels[index]}</text>}
            </React.Fragment>)}
        </svg>
    )
}

export default RoundButtonBase
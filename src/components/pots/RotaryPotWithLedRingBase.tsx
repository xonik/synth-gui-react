import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import arc from '../../utils/svg/arc'
import RotaryPotBase, { Point } from './RotaryPotBase'
import { MidiConfig } from '../../midi/midiControllers'
import { sendCC, subscribe, unsubscribe } from '../../midi/midibus'
import './RotaryPot.scss'
import { RootState } from '../../forces/store'
import { useAppDispatch, useAppSelector } from '../../forces/hooks'
import { ControllerId } from '../../forces/synthcore/controllers'
import { increment } from '../../forces/controller/controllerReducer'

export type LedMode = 'single' | 'multi';
export type PotMode = 'normal' | 'pan' | 'spread';

export interface Props {
    x: number;
    y: number;
    ledCount?: number;
    ledMode?: LedMode
    potMode?: PotMode
    label: string
    position: number;
    midiConfig?: MidiConfig;
    defaultValue?: number;
    selectPosition?: (state: RootState) => number;
    updateStorePosition?: (position: number) => any;
    ctrlId?: ControllerId;
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

// 0 degrees is deltaX > 1, deltaY = +0
const getAngle = (pointer: Point, center: Point) => {
    const deltaX = pointer.x - center.x;
    const deltaY = pointer.y - center.y;
    return (2 * Math.PI + Math.atan(deltaY / deltaX) + (deltaX < 0 ? Math.PI : 0)) % (2 * Math.PI);
}

const getValueChangeFromDiff = (angleDiff: number, ledArc:number) => {
    const changeInDegrees = (360 * angleDiff) / (2 * Math.PI);
    //console.log({angleDiff, changeInDegrees});
    return changeInDegrees / ledArc;
}
export default (props: Props & Config) => {

    // Position should be in the range 0-1 in all modes but pan. In pan the range is -0.5 - 0.5
    const { x, y, ledMode = 'single', potMode = 'normal', label, midiConfig, defaultValue,
        selectPosition, ctrlId, updateStorePosition
    } = props

    const dispatch = useAppDispatch()
    const potRef = useRef<SVGCircleElement>(null);
    const [center, setCenter] = useState<Point|null>(null);

    const [previousAngle, setPreviousAngle] = useState(0);
    const [previousY, setPreviousY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(defaultValue || 0);
    const [isShiftDown, setShiftDown] = useState(false);

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
    const storePosition = selectPosition ? useAppSelector(selectPosition) : position
    const ledPosition = getLedPos(centerLed, ledCount, potMode, storePosition)

    // negative pointer used for spread
    const negLedPosition = centerLed - (ledPosition - centerLed)

    const getCenter = useCallback(() => {
        if (center === null) {
            const PotElement = potRef.current;
            const bb = PotElement?.getBoundingClientRect();
            let updatedCenter: {x: number, y: number};
            if (bb) {
                updatedCenter = {
                    x: Math.round(bb.x + bb.width / 2),
                    y: Math.round(bb.y + bb.height / 2)
                }
            } else {
                updatedCenter = { x: 0, y: 0 }
            }
            setCenter(updatedCenter);
            return updatedCenter;
        } else {
            return center;
        }
    }, [center]);

    const onMouseDown = useCallback((event: React.MouseEvent) => {
        setShiftDown(event.shiftKey);
        setPreviousAngle(getAngle({x: event.clientX, y: event.clientY}, getCenter()))
        setPreviousY(event.clientY);
        setIsDragging(true);
        if(event.preventDefault) event.preventDefault();
    }, [getCenter]);

    const onMouseUp = useCallback((event: MouseEvent) => {
        if(isDragging) setIsDragging(false);
    }, [isDragging]);

    const updatePosition = useCallback((newPosition) => {
        setPosition(newPosition);
        if(midiConfig){
            sendCC(midiConfig.cc, Math.round(127 * newPosition));
        }
        if(updateStorePosition) {
            dispatch(updateStorePosition(newPosition))
        }
        if(ctrlId) {
            dispatch(increment({ctrlId, value: newPosition}))
        }
    }, [midiConfig, setPosition, ctrlId, dispatch, updateStorePosition])

    const updatePositionFromValue = useCallback((newPosition) => {
        if(newPosition < 0){
            if(position > 0){
                updatePosition(0);
            }
        } else if(newPosition > 1){
            if(position < 1) {
                updatePosition(1);
            }
        } else if(newPosition !== position){
            updatePosition(newPosition);
        }
    },[position, updatePosition])

    const onMouseMove = useCallback((event: MouseEvent) => {
        if(isDragging) {
            if(isShiftDown){
                const yDiff = -(event.clientY - previousY);
                setPreviousY(event.clientY);
                const newValue = position + yDiff / 100;
                updatePositionFromValue(newValue);
            } else {
                const newAngle = getAngle({x: event.clientX, y: event.clientY}, getCenter());
                let angleDiff = newAngle - previousAngle;
                if(angleDiff > Math.PI){
                    angleDiff = angleDiff - 2 * Math.PI;
                } else if(angleDiff < -Math.PI) {
                    angleDiff = angleDiff + 2 * Math.PI;

                }

                if(angleDiff !== 0) {
                    setPreviousAngle(newAngle);
                    const valueChange = getValueChangeFromDiff(angleDiff, ledArc);
                    const newValue = position + valueChange;
                    updatePositionFromValue(newValue);
                }
            }
        }
    }, [ledArc, previousAngle, isDragging, position, isShiftDown, previousY, updatePositionFromValue, getCenter]);

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("mouseup", onMouseUp)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("mouseup", onMouseUp)
        };
    },[onMouseMove, onMouseUp])

    useEffect(() => {
        if(midiConfig) {
            const updateValueFromMidi = (midiValue: number) => {
                setPosition(midiValue / 127);
            }

            const subscriberId = subscribe(updateValueFromMidi, midiConfig)
            return function cleanup() {
                unsubscribe(midiConfig.cc, subscriberId);
            };
        }
    });

    return (
        <svg x={x} y={y} className="pot">
            <RotaryPotBase ref={potRef} knobRadius={knobRadius} onMouseDown={onMouseDown}/>
            <path d={windowArc} className="pot-ring-window" strokeWidth={windowWidth}/>
            {ledAngles.map((angle, led) => {
                const ledOn =
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

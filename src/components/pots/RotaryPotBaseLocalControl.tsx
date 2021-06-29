import React, { useCallback, useEffect, useState } from 'react'

export type Point = {x: number, y: number}

interface Props {
  onClick?: () => void;
  knobRadius: number;
  onPositionChange?: (position: number) => void;
  onIncrement?: (steps: number, stepSize: number) => void;
  defaultValue?: number;
  arc?: number;
  resolution?: number
}

// 0 degrees is deltaX > 1, deltaY = +0
const getAngle = (pointer: Point, center: Point) => {
  const deltaX = pointer.x - center.x;
  const deltaY = pointer.y - center.y;
  return (2 * Math.PI + Math.atan(deltaY / deltaX) + (deltaX < 0 ? Math.PI : 0)) % (2 * Math.PI);
}

const getValueChangeFromDiff = (angleDiff: number, ledArc:number) => {
  const changeInDegrees = (360 * angleDiff) / (2 * Math.PI);
  return changeInDegrees / ledArc;
}

const distToCenter = (center: Point, pointer: Point) => {
  const xDiff = (center.x - pointer.x);
  const yDiff = (center.y - pointer.y);
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

const RotaryPot = ({knobRadius, onClick, defaultValue, onPositionChange, onIncrement, arc = 360, resolution = 1000}: Props) => {

  const stepSize = 1 / resolution;

  const [center, setCenter] = useState<Point|null>(null);
  const [previousAngle, setPreviousAngle] = useState<number | undefined>(undefined);
  const [previousY, setPreviousY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isShiftDown, setShiftDown] = useState(false);

  // TODO: This can probably be done better using refs or someting
  const findCenter = useCallback((potElement?: SVGCircleElement) => {
    if (center === null) {
      const bb = potElement?.getBoundingClientRect();
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
    }
  }, [center]);

  const [position, setPosition] = useState(defaultValue || 0);
  const [accumulator, setAccumulator] = useState(0);

  const updatePosition = useCallback((newPosition) => {
    setPosition(newPosition);
    if(onPositionChange) onPositionChange(newPosition)
  }, [onPositionChange])

  const updatePositionFromValue = useCallback((steps: number) => {
    const newPosition = position + steps * stepSize;
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
  },[stepSize, position, updatePosition])

  const onMouseMove = useCallback((event: MouseEvent) => {
    if(isDragging) {
      if(!center) return

      if(isShiftDown){
        const yDiff = -(event.clientY - previousY);
        setPreviousY(event.clientY);
        const newValue = position + yDiff / 100;
        updatePositionFromValue(newValue);
      } else if(distToCenter(center, {x: event.clientX, y: event.clientY}) > 20) {
        // We won't start turning until we are a bit away from the center, that way we prevent the pot
        // from jumping randomly if you click too close to the center and move the other way
        const newAngle = getAngle({x: event.clientX, y: event.clientY}, center );
        if(previousAngle === undefined) {
            setPreviousAngle(newAngle);
            return
        }

        let angleDiff = newAngle - previousAngle
        if (angleDiff > Math.PI) {
            angleDiff = angleDiff - 2 * Math.PI
        } else if (angleDiff < -Math.PI) {
            angleDiff = angleDiff + 2 * Math.PI
        }

        if (angleDiff !== 0) {
          setPreviousAngle(newAngle)
          const valueChange = getValueChangeFromDiff(angleDiff, arc)

          // TODO: Reset accumulator on external value change.
          let nextAccumulator = accumulator + valueChange;
          if(Math.abs(nextAccumulator) > stepSize) {
            const absSteps = Math.floor(Math.abs(nextAccumulator) / stepSize);
            const steps = valueChange > 0 ? absSteps : -absSteps;
            setAccumulator(nextAccumulator % stepSize);
            updatePositionFromValue(steps)
          } else {
            setAccumulator(nextAccumulator)
          }
        }
      }
    }
  }, [stepSize, position, accumulator, setAccumulator, center, arc, previousAngle, isDragging, isShiftDown, previousY, updatePositionFromValue]);

  const onMouseDown = useCallback((event: React.MouseEvent<SVGCircleElement>) => {
    findCenter(event.currentTarget)
    setShiftDown(event.shiftKey);
    setPreviousAngle(undefined)
    setPreviousY(event.clientY);
    setIsDragging(true);
    if(event.preventDefault) event.preventDefault();
  }, [findCenter]);

  const onMouseUp = useCallback((event: MouseEvent) => {
    if(isDragging) setIsDragging(false);
  }, [isDragging]);

  // TODO: add and remove these on demand?
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    };
  },[onMouseMove, onMouseUp])

  return <circle cx={0} cy={0} onClick={onClick} onMouseDown={onMouseDown} r={knobRadius} className="pot-knob"/>
};

export default RotaryPot;
import React, { useCallback, useEffect, useState } from 'react'

export type Point = {x: number, y: number}

interface Props {
  onClick?: () => void;
  knobRadius: number;
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

const RotaryPot = ({knobRadius, onClick, defaultValue, onIncrement, arc = 360, resolution = 1000}: Props) => {

  const stepSize = 1 / resolution;

  const [center, setCenter] = useState<Point|null>(null);
  const [previousAngle, setPreviousAngle] = useState<number | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);

  // TODO: This can probably be done better using refs or someting
  const findCenter = useCallback((potElement?: SVGCircleElement) => {
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
  }, []);

  const [accumulator, setAccumulator] = useState(0);

  const onMouseMove = useCallback((event: MouseEvent) => {
    if(isDragging) {
      if(!center) return

      if(distToCenter(center, {x: event.clientX, y: event.clientY}) > 20) {
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

          //  for later: event.shiftKey indicates if shift is down;
          const valueChange = getValueChangeFromDiff(angleDiff, arc)

          // TODO: Reset accumulator on external value change.
          let nextAccumulator = accumulator + valueChange;
          if(Math.abs(nextAccumulator) > stepSize) {
            const absSteps = Math.floor(Math.abs(nextAccumulator) / stepSize);
            const steps = valueChange > 0 ? absSteps : -absSteps;
            setAccumulator(nextAccumulator % stepSize);
            onIncrement && onIncrement(steps, stepSize);
          } else {
            setAccumulator(nextAccumulator)
          }
        }
      }
    }
  }, [onIncrement, stepSize, accumulator, setAccumulator, center, arc, previousAngle, isDragging]);

  const onMouseDown = useCallback((event: React.MouseEvent<SVGCircleElement>) => {
    findCenter(event.currentTarget)
    setPreviousAngle(undefined)
    setIsDragging(true);
    if(event.preventDefault) event.preventDefault();
  }, [findCenter]);

  const onMouseUp = useCallback(() => {
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
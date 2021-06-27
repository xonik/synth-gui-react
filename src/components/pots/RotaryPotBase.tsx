import React, { useCallback, useEffect, useRef, useState } from 'react'

export type Point = {x: number, y: number}

interface Props {
  onClick?: () => void;
  knobRadius: number;
  onPositionChange?: (position: number) => void;
  defaultValue?: number;
  arc?: number;
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

const RotaryPot = ({knobRadius, onClick, defaultValue, onPositionChange, arc = 360}: Props) => {
  const [center, setCenter] = useState<Point|null>(null);

  const [previousAngle, setPreviousAngle] = useState(0);
  const [previousY, setPreviousY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isShiftDown, setShiftDown] = useState(false);

  const getCenter = useCallback((potElement?: SVGCircleElement) => {
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
      return updatedCenter;
    } else {
      return center;
    }
  }, [center]);

  const [position, setPosition] = useState(defaultValue || 0);

  const updatePosition = useCallback((newPosition) => {
    setPosition(newPosition);
    if(onPositionChange) onPositionChange(newPosition)
  }, [onPositionChange])

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
        const newAngle = getAngle({x: event.clientX, y: event.clientY}, center || {x: 0, y: 0});
        let angleDiff = newAngle - previousAngle;
        if(angleDiff > Math.PI){
          angleDiff = angleDiff - 2 * Math.PI;
        } else if(angleDiff < -Math.PI) {
          angleDiff = angleDiff + 2 * Math.PI;

        }

        if(angleDiff !== 0) {
          setPreviousAngle(newAngle);
          const valueChange = getValueChangeFromDiff(angleDiff, arc);
          const newValue = position + valueChange;
          updatePositionFromValue(newValue);
        }
      }
    }
  }, [arc, previousAngle, isDragging, position, isShiftDown, previousY, updatePositionFromValue, getCenter]);

  const onMouseDown = useCallback((event: React.MouseEvent<SVGCircleElement>) => {
    setShiftDown(event.shiftKey);
    setPreviousAngle(getAngle({x: event.clientX, y: event.clientY}, getCenter(event.currentTarget)))
    setPreviousY(event.clientY);
    setIsDragging(true);
    if(event.preventDefault) event.preventDefault();
  }, [getCenter]);

  const onMouseUp = useCallback((event: MouseEvent) => {
    if(isDragging) setIsDragging(false);
  }, [isDragging]);

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
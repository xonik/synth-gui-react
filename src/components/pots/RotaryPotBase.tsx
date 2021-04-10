import React, { useCallback, useRef } from 'react'
import throttle from 'lodash.throttle';

export type Point = {x: number, y: number}

interface Props {
  onClick: () => void;
  onMouseDown?: (event: React.MouseEvent, center: Point) => void;
  knobRadius: number;
}

const RotaryPot = ({knobRadius, onClick, onMouseDown}: Props) => {
  const circleRef = useRef<SVGCircleElement>(null);

  const onMouseDownCallback = useCallback((event) => {
    const bb = circleRef.current?.getBoundingClientRect();
    if(bb){
      const circlePos = {
        x: Math.round(bb.x + bb.width  / 2),
        y: Math.round(bb.y + bb.height  / 2)
      }
      if(onMouseDown) onMouseDown(event, circlePos);
    }
  }, [])

  return <circle ref={circleRef} cx={0} cy={0} onClick={onClick} onMouseDown={onMouseDownCallback} r={knobRadius} className="pot-knob"/>
}

export default RotaryPot;
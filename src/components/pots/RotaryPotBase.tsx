import React, { forwardRef, useCallback } from 'react'

export type Point = {x: number, y: number}

interface Props {
  onClick?: () => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  knobRadius: number;
}

const RotaryPot = forwardRef<SVGCircleElement, Props>(({knobRadius, onClick, onMouseDown}: Props, ref) => {
  const onMouseDownCallback = useCallback((event) => {
    if(onMouseDown) onMouseDown(event);
  }, [onMouseDown])

  return <circle ref={ref} cx={0} cy={0} onClick={onClick} onMouseDown={onMouseDownCallback} r={knobRadius} className="pot-knob"/>
});

export default RotaryPot;
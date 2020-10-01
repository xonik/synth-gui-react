import React from 'react';
import './BasicKnob.scss';

interface Props {
  x: number;
  y: number;
}

export default (props: Props) => {
  const {x, y} = props;
  // For objects centered around 0, use overflow: visible
  // For scaling, use viewBox on the outer svg and unitless the rest of the way

  const knobRadius = 10;
  const ledCount = 31;


  return (
      <svg x={x} y={y} className="knob">
        <circle cx="0" cy="0" r={knobRadius} stroke="black" fill="red"/>
      </svg>
  );
}
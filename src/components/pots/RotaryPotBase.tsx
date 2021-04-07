import React from 'react';

interface Props {
  onClick: () => void;
  knobRadius: number;
}

const rotaryPot = ({knobRadius, onClick}: Props) => <circle cx={0} cy={0} onClick={onClick} r={knobRadius} className="pot-knob"/>

export default rotaryPot;
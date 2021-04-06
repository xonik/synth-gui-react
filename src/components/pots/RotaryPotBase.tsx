import React from 'react';

interface Props {
  knobRadius: number;
}

const rotaryPot = ({knobRadius}: Props) => <circle cx={0} cy={0} r={knobRadius} className="pot-knob"/>

export default rotaryPot;
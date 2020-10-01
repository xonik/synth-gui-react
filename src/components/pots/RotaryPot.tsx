import React from 'react';
import classNames from 'classnames';
import './RotaryPot.scss';

type LedRingMode = 'upTo' | 'downTo' | 'single' | 'pan';

interface Props {
  x: number;
  y: number;
  ledRingMode?: LedRingMode
}

export default ({ x, y, ledRingMode = 'single' }: Props) => {
  // For objects centered around 0, use overflow: visible
  // For scaling, use viewBox on the outer svg and unitless the rest of the way

  const knobRadius = 10;
  const ledRadius = 0.4;
  const ledCount = 31; // must be odd number
  const ledArc = 270; // degrees from first to last led
  const centerLed = (ledCount-1) / 2;
  const degreesBetweenLeds = ledArc / (ledCount - 1);
  const ledToKnobMargin = 4;
  const ledToKnobDist = knobRadius + ledToKnobMargin;

  const position = 18;

  let ledAngles = [];
  for (let i = 0; i < ledCount; i++) {
    ledAngles.push(-(ledArc / 2) + Math.round(degreesBetweenLeds * i));
  }

  return (
    <svg x={x} y={y} className="pot">
      <circle cx="0" cy="0" r={knobRadius} className="pot-knob"/>
      {ledAngles.map((angle, led) => {
        const ledOn =
          (ledRingMode === 'single' && led === position) ||
          (ledRingMode === 'upTo' && led <= position) ||
          (ledRingMode === 'downTo' && led >= position) ||
          (ledRingMode === 'pan' && (
            (position >= centerLed && led >= centerLed && led <= position) ||
            (position <= centerLed && led <= centerLed && led >= position)
          ));

        return <circle
          cx="0" cy={-ledToKnobDist} r={ledRadius} stroke="black" fill="red"
          transform={`rotate(${angle})`}
          className={classNames('pot-ring-led', { 'pot-ring-led__on': ledOn })}/>;
      })}
    </svg>
  );
}
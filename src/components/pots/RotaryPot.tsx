import React from 'react';
import classNames from 'classnames';
import './RotaryPot.scss';
import arc from '../../utils/svg/arc';

type LedRingMode = 'upTo' | 'downTo' | 'single' | 'pan';

interface Props {
  x: number;
  y: number;
  ledRingMode?: LedRingMode
  label: string
  position: number;
}

// TODO: Split ledRingMode into two: 'single' | 'multiple' and potMode 'normal' | 'centered'.
// when centered, position should be in +/- 0.5 (or +/-1)

export default ({ x, y, ledRingMode = 'single', label, position }: Props) => {


  // For objects centered around 0, use overflow: visible
  // For scaling, use viewBox on the outer svg and unitless the rest of the way
  const knobRadius = 10;
  const ledRadius = 0.4;
  const ledCount = 31; // must be odd number
  const ledArc = 270; // degrees from first to last led
  const centerLed = (ledCount-1) / 2;
  const degreesBetweenLeds = ledArc / (ledCount - 1);
  const windowToKnobMargin = 2;
  const windowWidth = 4;
  const ledRingRadius = knobRadius + windowToKnobMargin + windowWidth / 2;

  // pointer position (led index)
  // TODO: Correct rounding here!
  const ledPosition = Math.round(position * ledCount);

  let ledAngles = [];
  for (let i = 0; i < ledCount; i++) {
    ledAngles.push(-(ledArc / 2) + Math.round(degreesBetweenLeds * i));
  }

  // Ideally the window should be a shape, not a path with a stroke, to be able to convert the
  // SVG into paths for cutting.

  // Distance from last led to the end should really be equal to the distance between two leds,
  // but for now it's just 2/3 the distance from the center of one led to the next.
  const windowStartAngle = -ledArc/2 - 2*(degreesBetweenLeds/3);
  const windowEndAngle = windowStartAngle * -1;
  const windowArc = arc(0, 0, ledRingRadius, windowStartAngle, windowEndAngle );

  // TODO: Dynamically calculate this based on window
  // TODO: Set font size in relative units...
  const labelY = ledRingRadius + 5;

  return (
    <svg x={x} y={y} className="pot">
      <circle cx="0" cy="0" r={knobRadius} className="pot-knob"/>
      <path d={windowArc} className="pot-ring-window" strokeWidth={windowWidth}/>
      {ledAngles.map((angle, led) => {
        const ledOn =
          (ledRingMode === 'single' && led === ledPosition) ||
          (ledRingMode === 'upTo' && led <= ledPosition) ||
          (ledRingMode === 'downTo' && led >= ledPosition) ||
          (ledRingMode === 'pan' && (
            (ledPosition >= centerLed && led >= centerLed && led <= ledPosition) ||
            (ledPosition <= centerLed && led <= centerLed && led >= ledPosition)
          ));

        return <circle
          cx="0" cy={-ledRingRadius} r={ledRadius} stroke="black" fill="red"
          transform={`rotate(${angle})`}
          className={classNames('pot-ring-led', { 'pot-ring-led__on': ledOn })}/>;
      })}
      <text x="0" y={labelY} className="pot-label" textAnchor="middle">{label}</text>
    </svg>
  );
}
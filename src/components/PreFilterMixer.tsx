import React from 'react';
import RotaryPot17 from './pots/RotaryPot17';
import RoundLedPushButton8 from './buttons/RoundLedPushButton8';

interface Props {
  x: number,
  y: number
}

interface ChannelProps {
  label: string,
  x: number,
  y: number
}

const rowDistance = 40;

const PreFilterMixerChannel = ({ x, y, label }: ChannelProps) => {
  return <>
    <RotaryPot17 ledMode="multi" label={label} x={x} y={y}/>
    <RoundLedPushButton8 x={x+30} y={y} ledOn={[true]}/>
    <RoundLedPushButton8 x={x+50} y={y}/>
  </>;
};

const PreFilterMixer = ({ x, y }: Props) => {
  return <>
    <PreFilterMixerChannel x={x} y={y} label="Osc 1"/>
    <PreFilterMixerChannel x={x} y={y + rowDistance * 1} label="Osc 2"/>
    <PreFilterMixerChannel x={x} y={y + rowDistance * 2} label="Osc 3"/>
    <PreFilterMixerChannel x={x} y={y + rowDistance * 3} label="Noise"/>
    <PreFilterMixerChannel x={x} y={y + rowDistance * 4} label="Ring mod"/>
    <PreFilterMixerChannel x={x} y={y + rowDistance * 5} label="Ext aud"/>
  </>;
};



export default PreFilterMixer;
import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';

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
    <RotaryPot17 ledMode="multi" label={label} x={x} y={y} position={0.4}/>
    <RoundLedPushButton8 x={x+30} y={y} ledOn={[true]}/>
    <RoundLedPushButton8 x={x+50} y={y}/>
  </>;
};

const PreFilterMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetY = 27;
  return <>
    <Header label="Voice mix" x={x} y={y} width={80}/>
    <PreFilterMixerChannel x={x+offsetX} y={y + offsetY} label="Osc 1"/>
    <PreFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 1} label="Osc 2"/>
    <PreFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 2} label="Osc 3"/>
    <PreFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 3} label="Noise"/>
    <PreFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 4} label="Ring mod"/>
    <PreFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 5} label="Ext aud"/>
  </>;
};



export default PreFilterMixer;
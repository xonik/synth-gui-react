import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import { PotMode } from '../pots/RotaryPotWithLedRingBase';

interface Props {
  x: number,
  y: number
}

interface ChannelProps {
  label: string,
  potMode?: PotMode,
  x: number,
  y: number
}

const rowDistance = 40;

const OutputMixerChannel = ({ x, y, label, potMode="normal" }: ChannelProps) => {
  return <>
    <RotaryPot17 ledMode="multi" label={label} x={x} y={y} position={0.4} potMode={potMode}/>
  </>;
};

const OutputMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetY = 27;
  return <svg x={x} y={y}>
    <Header label="Output" x={0} y={0} width={40}/>
    <OutputMixerChannel x={offsetX} y={offsetY} label="Volume"/>
    <OutputMixerChannel x={offsetX} y={offsetY + rowDistance} potMode="spread" label="Spread"/>
    <OutputMixerChannel x={offsetX} y={offsetY + rowDistance * 2} label="Headphones"/>

    <Header label="FX mix" x={0} y={ + offsetY + rowDistance * 4 - 27} width={40}/>
    <OutputMixerChannel x={offsetX} y={offsetY + rowDistance * 4} label="DSP 1"/>
    <OutputMixerChannel x={offsetX} y={offsetY + rowDistance * 5} label="DSP 2"/>
    <OutputMixerChannel x={offsetX} y={offsetY + rowDistance * 6} label="Chorus"/>
    <OutputMixerChannel x={offsetX} y={offsetY + rowDistance * 7} label="Bit crusher"/>
  </svg>;
};



export default OutputMixer;
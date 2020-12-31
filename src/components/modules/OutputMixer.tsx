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
const colDistance = 40;

const OutputMixerChannel = ({ x, y, label, potMode="normal" }: ChannelProps) => {
  return <>
    <RotaryPot17 ledMode="multi" label={label} x={x} y={y} position={0.4} potMode={potMode}/>
  </>;
};

const OutputMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetX2 = 195;
  const offsetY = 25;
  return <svg x={x} y={y}>
    <Header label="FX mix" x={0} y={ + offsetY + rowDistance * 4 - 27} width={40}/>
    <OutputMixerChannel x={offsetX} y={offsetY} label="DSP 1"/>
    <OutputMixerChannel x={offsetX + colDistance} y={offsetY} label="DSP 2"/>
    <OutputMixerChannel x={offsetX + colDistance * 2} y={offsetY} label="Chorus"/>
    <OutputMixerChannel x={offsetX + colDistance * 3} y={offsetY} label="Bit crusher"/>


    <OutputMixerChannel x={offsetX2} y={offsetY} potMode="spread" label="Spread"/>
    <OutputMixerChannel x={offsetX2 + colDistance} y={offsetY} label="Volume"/>
    <OutputMixerChannel x={offsetX2 + colDistance} y={offsetY - 40} label="Headphones"/>

  </svg>;
};



export default OutputMixer;
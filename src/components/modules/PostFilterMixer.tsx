import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import { LedMode, PotMode } from '../pots/RotaryPotWithLedRingBase';

interface Props {
  x: number,
  y: number
}

interface ChannelProps {
  label: string,
  potMode?: PotMode,
  ledMode?: LedMode,
  x: number,
  y: number
}

const rowDistance = 40;

const PostFilterMixerChannel = ({ x, y, label, potMode="normal", ledMode="multi"}: ChannelProps) => {
  return <>
    <RotaryPot17 label={label} x={x} y={y} position={0.4} potMode={potMode} ledMode={ledMode}/>
  </>;
};

const PostFilterMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetY = 27;
  const offsetY2 = 195;
  return <svg x={x} y={y}>
    <Header label="Mix" x={0} y={0} width={40}/>
    <PostFilterMixerChannel x={offsetX} y={offsetY} label="LPF"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance} label="SVF"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 2} label="Sine 1"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 3} label="Sine 2"/>

    <Header label="Voice out" x={0} y={offsetY2-27} width={40}/>
    <PostFilterMixerChannel x={offsetX} y={offsetY2} label="Pan" potMode="pan" ledMode="single"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY2 + rowDistance} label="Amt"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY2 + rowDistance * 2} label="FX1 send"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY2 + rowDistance * 3} label="FX2 send"/>
  </svg>;
};



export default PostFilterMixer;
import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
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

const PostFilterMixerChannel = ({ x, y, label }: ChannelProps) => {
  return <>
    <RotaryPot17 ledMode="multi" label={label} x={x} y={y} position={0.4}/>
  </>;
};

const PostFilterMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetY = 27;
  return <svg x={x} y={y}>
    <Header label="Mix" x={0} y={0} width={40}/>
    <PostFilterMixerChannel x={offsetX} y={offsetY} label="LPF"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 1} label="SVF"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 2} label="Sine 1"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 3} label="Sine 2"/>

    <Header label="Voice out" x={0} y={offsetY + rowDistance * 5 - 27} width={40}/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 5} label="Pan"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 6} label="FX1 send"/>
    <PostFilterMixerChannel x={offsetX} y={offsetY + rowDistance * 7} label="FX2 send"/>
  </svg>;
};



export default PostFilterMixer;
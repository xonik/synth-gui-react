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
  return <>
    <Header label="Mix" x={x} y={y} width={40}/>
    <PostFilterMixerChannel x={x+offsetX} y={y + offsetY} label="LPF"/>
    <PostFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 1} label="SVF"/>
    <PostFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 2} label="Sine 1"/>
    <PostFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 3} label="Sine 2"/>

    <Header label="Voice out" x={x} y={ + offsetY + rowDistance * 5 - 22} width={40}/>
    <PostFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 5} label="Pan"/>
    <PostFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 6} label="FX1 send"/>
    <PostFilterMixerChannel x={x+offsetX} y={y + offsetY + rowDistance * 7} label="FX2 send"/>
  </>;
};



export default PostFilterMixer;
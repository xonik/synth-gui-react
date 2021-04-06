import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';

interface Props {
  x: number,
  y: number
}

interface ChannelProps {
  label: string,
  x: number,
  y: number
}


const PreFilterMixerChannel = ({ x, y, label }: ChannelProps) => {
  return <>
    <RotaryPot17 ledMode="multi" label={label} x={x} y={y} position={0.4}/>
    <RoundPushButton8 x={x+25} y={y+3}
                      ledPosition="top" ledCount={2} ledOn={[true, false]}
    />
  </>;
};

const PreFilterMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetY = 25;
  const rowDistance = 40;
  const colDistance = 60;

  const col1 = x - 2 + offsetX;
  const col2 = col1 + colDistance;
  const col3 = col1 + colDistance * 2;

  const row1 = y + 2 + offsetY;
  const row2 = row1 + rowDistance;

  return <>
    <Header label="Source mix" x={x} y={y} width={170}/>
    <PreFilterMixerChannel x={col1} y={row1} label="Osc 1"/>
    <PreFilterMixerChannel x={col2} y={row1} label="Osc 2"/>
    <PreFilterMixerChannel x={col3} y={row1} label="Osc 3"/>
    <PreFilterMixerChannel x={col1} y={row2} label="Noise"/>
    <PreFilterMixerChannel x={col2} y={row2} label="Ring mod"/>
    <PreFilterMixerChannel x={col3} y={row2} label="Ext audio"/>
  </>;
};



export default PreFilterMixer;
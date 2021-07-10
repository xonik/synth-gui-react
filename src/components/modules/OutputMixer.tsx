import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import { PotMode } from '../pots/RotaryPotWithLedRingBase';
import midiConstants from '../../midi/midiControllers'
import { MidiConfig } from '../../midi/types'

interface Props {
  x: number,
  y: number
}

interface ChannelProps {
  label: string,
  potMode?: PotMode,
  x: number,
  y: number,
  midiConfig: MidiConfig,
}

const rowDistance = 40;
const colDistance = 40;

const OutputMixerChannel = ({ x, y, label, potMode="normal", midiConfig }: ChannelProps) => {
  return <>
    <RotaryPot17 ledMode="multi" label={label} x={x} y={y} position={0.4} potMode={potMode} midiConfig={midiConfig}/>
  </>;
};

const OutputMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetX2 = 195;
  const offsetY = 25;
  return <svg x={x} y={y}>
    <Header label="FX mix" x={0} y={ + offsetY + rowDistance * 4 - 27} width={40}/>
    <OutputMixerChannel x={offsetX} y={offsetY} label="DSP 1" midiConfig={midiConstants.FX_MIX.LEVEL_DSP1}/>
    <OutputMixerChannel x={offsetX + colDistance} y={offsetY} label="DSP 2" midiConfig={midiConstants.FX_MIX.LEVEL_DSP2}/>
    <OutputMixerChannel x={offsetX + colDistance * 2} y={offsetY} label="Chorus" midiConfig={midiConstants.FX_MIX.LEVEL_CHORUS}/>
    <OutputMixerChannel x={offsetX + colDistance * 3} y={offsetY} label="Bit crusher" midiConfig={midiConstants.FX_MIX.LEVEL_BIT_CRUSHER}/>

    <OutputMixerChannel x={offsetX2} y={offsetY} potMode="spread" label="Spread" midiConfig={midiConstants.OUTPUT.SPREAD}/>
    <OutputMixerChannel x={offsetX2 + colDistance} y={offsetY} label="Volume" midiConfig={midiConstants.OUTPUT.VOLUME}/>
    <OutputMixerChannel x={offsetX2 + colDistance} y={offsetY - 40} label="Headphones" midiConfig={midiConstants.OUTPUT.HEADPHONES}/>

  </svg>;
};



export default OutputMixer;
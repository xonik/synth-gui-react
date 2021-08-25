import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import { LedMode, PotMode } from '../pots/RotaryPotWithLedRingBase';
import midiConstants from '../../midi/controllers'
import { ControllerConfigCC } from '../../midi/types'


interface Props {
  x: number,
  y: number
}

interface ChannelProps {
  label: string,
  potMode?: PotMode,
  ledMode?: LedMode,
  midiConfig: ControllerConfigCC,
  x: number,
  y: number
}

const rowDistance = 40;

const VoiceMixerChannel = ({ x, y, label, potMode="normal", ledMode="multi", midiConfig}: ChannelProps) => {
  return <>
    <RotaryPot17 label={label} x={x} y={y} position={0.4} potMode={potMode} ledMode={ledMode} midiConfig={midiConfig}/>
  </>;
};

const VoiceMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetY = 27;
  const offsetY2 = 195;
  return <svg x={x} y={y}>
    <Header label="Mix" x={0} y={0} width={40}/>
    <VoiceMixerChannel x={offsetX} y={offsetY} label="LPF" midiConfig={midiConstants.VOICE_MIX.LPF}/>
    <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance} label="SVF" midiConfig={midiConstants.VOICE_MIX.SVF}/>
    <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance * 2} label="Sine 1" midiConfig={midiConstants.VOICE_MIX.SINE1}/>
    <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance * 3} label="Sine 2" midiConfig={midiConstants.VOICE_MIX.SINE2}/>

    <Header label="Voice out" x={0} y={offsetY2-27} width={40}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2} label="Pan" potMode="pan" ledMode="single" midiConfig={midiConstants.VOICE_OUT.PAN}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance} label="Amt" midiConfig={midiConstants.VOICE_OUT.AMOUNT}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance * 2} label="FX1 send" midiConfig={midiConstants.VOICE_OUT.FX1_SEND}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance * 3} label="FX2 send" midiConfig={midiConstants.VOICE_OUT.FX2_SEND}/>
  </svg>;
};



export default VoiceMixer;
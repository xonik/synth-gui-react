import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import { MidiConfig } from '../../midi/midiControllers'

type MidiConfigs = {
  a: MidiConfig;
  d1: MidiConfig;
  d2: MidiConfig;
  s: MidiConfig;
  r1: MidiConfig;
  r2: MidiConfig;
  envSel?: MidiConfig;
  delay: MidiConfig;
  d1_lev: MidiConfig;
  trigger: MidiConfig;
  loop: MidiConfig;
  r1_lev: MidiConfig;
  invert: MidiConfig;
}

interface Props {
  x: number,
  y: number
  label: string,
  showSelect?: boolean,
  midiConfigs: MidiConfigs,
}

const Envelope = ({ x, y, label, showSelect = false, midiConfigs }: Props) => {
  const firstPotX =  x + 25;
  const topRowY = y + 20;
  const potY = y + 45;
  const potDistance = 40;
  return <>
    <Header align="left" label={label} x={x} y={y} width={255}/>
    <RotaryPot17 ledMode="single" label="Attack" x={firstPotX} y={potY} position={0.4} midiConfig={midiConfigs.a}/>
    <RotaryPot17 ledMode="single" label="Decay 1" x={firstPotX + potDistance} y={potY} position={0.1} midiConfig={midiConfigs.d1}/>
    <RotaryPot17 ledMode="single" label="Decay 2" x={firstPotX + potDistance * 2} y={potY} position={0.4} midiConfig={midiConfigs.d2}/>
    <RotaryPot17 ledMode="multi" label="Sustain" x={firstPotX + potDistance * 3} y={potY} position={0.8} midiConfig={midiConfigs.s}/>
    <RotaryPot17 ledMode="single" label="Release 1" x={firstPotX + potDistance * 4} y={potY} position={0.7} midiConfig={midiConfigs.r1}/>
    <RotaryPot17 ledMode="single" label="Release 2" x={firstPotX + potDistance * 5} y={potY} position={1} midiConfig={midiConfigs.r2}/>

    {showSelect && <RoundPushButton8 label="Env sel" x={firstPotX - potDistance * 0.5} y={topRowY} labelPosition="bottom" midiConfig={midiConfigs.envSel}/>}
    <RotaryPot10 ledMode="single" label="Delay" x={firstPotX + potDistance * 0.5} y={topRowY} position={0.4} midiConfig={midiConfigs.delay}/>
    <RotaryPot10 ledMode="multi" label="D2 Level" x={firstPotX + potDistance * 1.5} y={topRowY} position={0.4} midiConfig={midiConfigs.d1_lev}/>
    <RoundLedPushButton8 label="Invert" x={firstPotX + potDistance * 2.5} y={topRowY} labelPosition="bottom" midiConfig={midiConfigs.invert}/>
    <RoundLedPushButton8 label="Loop" x={firstPotX + potDistance * 3.5} y={topRowY} labelPosition="bottom" midiConfig={midiConfigs.loop}/>
    <RotaryPot10 ledMode="multi" label="R2 Level" x={firstPotX + potDistance * 4.5} y={topRowY} position={0.4} midiConfig={midiConfigs.r1_lev}/>
    <RoundPushButton8 label="Trigger" x={firstPotX + potDistance * 5.5} y={topRowY} labelPosition="bottom" midiConfig={midiConfigs.trigger}/>
  </>;
};



export default Envelope;
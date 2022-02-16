import React from 'react';
import RotaryPot32 from '../pots/RotaryPot32';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import midiConstants from '../../midi/controllers'
import { OscControllerIds } from '../../synthcore/modules/osc/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectDco2 } from '../../synthcore/modules/osc/oscReducer'
import { ControllerGroupIds } from '../../synthcore/types'

interface Props {
  x: number,
  y: number
}

const ctrlGroup = ControllerGroupIds.OSC

const DCO2 = ({ x, y }: Props) => {
  const topRow = y - 35;
  const bottomRow1 = y + 40;
  const bottomRow2 = bottomRow1 + 25;

  const col1 = x - 39;
  const col2 = x - 13;
  const col3 = x + 13;
  const col4 = x + 39;

  const dco2 = useAppSelector(selectDco2)

  return <>
    <Header label="Oscillator 2" x={x} y={topRow - 20} width={100} align="center"/>
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform" position={0.8}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_WAVEFORM}
                 storePosition={dco2.waveform}
    />

    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note" position={0.5} midiConfig={midiConstants.DCO2.NOTE}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_NOTE}
                 storePosition={dco2.note}
    />

    <RotaryPot10 x={col1} y={y} ledMode="single" label="Detune" position={0.5} midiConfig={midiConstants.DCO2.DETUNE}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_DETUNE}
                 storePosition={dco2.detune}
    />

    {/*<RotaryPot10 x={col4} y={topRow} ledMode="multi" label="Super saw" position={0.3} midiConfig={midiConstants.DCO2.SUPER_SAW}/>*/}

    <RoundPushButton8 x={col4} y={y+11}
                      ledPosition="top" ledCount={3} ledLabels={['DCO', 'WT', 'PCM']}
                      label="Mode" labelPosition="bottom"
                      midiConfig={midiConstants.DCO2.MODE}
    />


    <RoundPushButton8 x={col1} y={bottomRow1}
                      ledPosition="top" ledCount={2} ledLabels={['Sqr', 'Saw']}
                      label="Sub wave" labelPosition="bottom"
                      midiConfig={midiConstants.DCO2.SUB_WAVE}
    />

    <RotaryPot10 x={col2} y={bottomRow1} ledMode="multi" label="Sub -1" position={0.1}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_SUB1}
                 storePosition={dco2.sub1Level}
    />

    <RotaryPot10 x={col3} y={bottomRow1} ledMode="multi" label="Sub -2" position={0.6}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_SUB2}
                 storePosition={dco2.sub2Level}
    />

    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW" position={0.3}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_PW}
                 storePosition={dco2.pw}
    />

    <RoundLedPushButton8 x={col2} y={bottomRow2} label="Wheel" labelPosition="bottom" midiConfig={midiConstants.DCO2.WHEEL}/>
    <RoundLedPushButton8 x={col3} y={bottomRow2} label="LFO" labelPosition="bottom" midiConfig={midiConstants.DCO2.LFO}/>
    <RoundLedPushButton8 x={col4} y={bottomRow2} label="Kbd" labelPosition="bottom" midiConfig={midiConstants.DCO2.KBD}/>
  </>;
};

export default DCO2;
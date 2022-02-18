import React from 'react';
import RotaryPot32 from '../pots/RotaryPot32';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import Header from '../misc/Header';
import { ControllerGroupIds } from '../../synthcore/types'
import { OscControllerIds } from '../../synthcore/modules/osc/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectDco1 } from '../../synthcore/modules/osc/oscReducer'

interface Props {
  x: number,
  y: number
}

const ctrlGroup = ControllerGroupIds.OSC

const DCO1 = ({ x, y }: Props) => {

  const topRow = y - 35;
  const bottomRow1 = y + 40;
  const bottomRow2 = bottomRow1 + 25;

  const col1 = x - 39;
  const col2 = x - 13;
  const col3 = x + 13;
  const col4 = x + 39;

  const dco1 = useAppSelector(selectDco1)

  return <>
    <Header label="Oscillator 1" x={x} y={topRow - 20} width={100} align="center"/>
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform"
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO1_WAVEFORM}
                 storePosition={dco1.waveform}
    />

    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note" position={0.5}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO1_NOTE}
                 storePosition={dco1.note}
    />

    <RoundPushButton8 x={col2} y={topRow}
                      ledPosition="right" ledCount={2} ledLabels={['1 -> 2', '2 -> 1']}
                      label="Sync" labelPosition="bottom"
                      hasOff
                      ctrlGroup={ctrlGroup}
                      ctrlId={OscControllerIds.DCO1_SYNC}
                      storeValue={dco1.sync}
    />

    {/*<RotaryPot10 x={col4} y={topRow} ledMode="multi" label="Super saw" position={0.3}/>*/}

    <RoundPushButton8 x={col4} y={y+11}
                      ledPosition="top" ledCount={3} ledLabels={['DCO', 'WT', 'PCM']}
                      label="Mode" labelPosition="bottom"
                      ctrlGroup={ctrlGroup}
                      ctrlId={OscControllerIds.DCO1_MODE}
                      storeValue={dco1.mode}
    />

    <RoundPushButton8 x={col1} y={bottomRow1}
                      ledPosition="top" ledCount={2} ledLabels={['Sqr', 'Saw']}
                      label="Sub wave" labelPosition="bottom"
                      ctrlGroup={ctrlGroup}
                      ctrlId={OscControllerIds.DCO1_SUB_WAVE}
                      storeValue={dco1.subWave}
    />

    <RotaryPot10 x={col2} y={bottomRow1} ledMode="multi" label="Sub -1" position={0.1}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO1_SUB1}
                 storePosition={dco1.sub1Level}
    />

    <RotaryPot10 x={col3} y={bottomRow1} ledMode="multi" label="Sub -2" position={0.6}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO1_SUB2}
                 storePosition={dco1.sub2Level}
    />

    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW" position={0.3}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO1_PW}
                 storePosition={dco1.note}
    />

    <RoundLedPushButton8 x={col2} y={bottomRow2} label="Wheel" labelPosition="bottom"
                         ctrlGroup={ctrlGroup}
                         ctrlId={OscControllerIds.DCO1_WHEEL}
                         storeValue={dco1.wheel}
    />
    <RoundLedPushButton8 x={col3} y={bottomRow2} label="LFO" labelPosition="bottom"
                         ctrlGroup={ctrlGroup}
                         ctrlId={OscControllerIds.DCO1_LFO}
                         storeValue={dco1.lfo}
    />
    <RoundLedPushButton8 x={col4} y={bottomRow2} label="Kbd" labelPosition="bottom"
                         ctrlGroup={ctrlGroup}
                         ctrlId={OscControllerIds.DCO1_KBD}
                         storeValue={dco1.kbd}
    />
  </>;
};

export default DCO1;
import React from 'react';
import RotaryPot32 from '../pots/RotaryPot32';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
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
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform"
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_WAVEFORM}
                 value={dco2.waveform}
    />

    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note"
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_NOTE}
                 value={dco2.note}
    />

    <RotaryPot10 x={col1} y={y} ledMode="single" label="Detune"
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_DETUNE}
                 value={dco2.detune}
    />

    {/*<RotaryPot10 x={col4} y={topRow} ledMode="multi" label="Super saw"/>*/}

    <RoundPushButton8 x={col4} y={y+11}
                      ledPosition="top" ledCount={3} ledLabels={['DCO', 'WT', 'PCM']}
                      label="Mode" labelPosition="bottom"
                      ctrlGroup={ctrlGroup}
                      ctrlId={OscControllerIds.DCO2_MODE}
                      value={dco2.mode}
    />


    <RoundPushButton8 x={col1} y={bottomRow1}
                      ledPosition="top" ledCount={2} ledLabels={['Sqr', 'Saw']}
                      label="Sub wave" labelPosition="bottom"
                      ctrlGroup={ctrlGroup}
                      ctrlId={OscControllerIds.DCO2_SUB_WAVE}
                      value={dco2.subWave}
    />

    <RotaryPot10 x={col2} y={bottomRow1} ledMode="multi" label="Sub -1"
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_SUB1}
                 value={dco2.sub1Level}
    />

    <RotaryPot10 x={col3} y={bottomRow1} ledMode="multi" label="Sub -2"
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_SUB2}
                 value={dco2.sub2Level}
    />

    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW"
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.DCO2_PW}
                 value={dco2.pw}
    />

    <RoundLedPushButton8 x={col2} y={bottomRow2} label="Wheel" labelPosition="bottom"
                         ctrlGroup={ctrlGroup}
                         ctrlId={OscControllerIds.DCO2_WHEEL}
                         value={dco2.wheel}
    />

    <RoundLedPushButton8 x={col3} y={bottomRow2} label="LFO" labelPosition="bottom"
                         ctrlGroup={ctrlGroup}
                         ctrlId={OscControllerIds.DCO2_LFO}
                         value={dco2.lfo}
    />

    <RoundLedPushButton8 x={col4} y={bottomRow2} label="Kbd" labelPosition="bottom"
                         ctrlGroup={ctrlGroup}
                         ctrlId={OscControllerIds.DCO2_KBD}
                         value={dco2.kbd}
    />

  </>;
};

export default DCO2;
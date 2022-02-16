import React from 'react';
import RotaryPot32 from '../pots/RotaryPot32';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import midiConstants from '../../midi/controllers'
import { OscControllerIds } from '../../synthcore/modules/osc/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectVco } from '../../synthcore/modules/osc/oscReducer'
import { ControllerGroupIds } from '../../synthcore/types'

interface Props {
  x: number,
  y: number
}

const ctrlGroup = ControllerGroupIds.OSC

const VCO = ({ x, y }: Props) => {
  const topRow = y - 35;
  const bottomRow1 = y + 40;
  const bottomRow2 = bottomRow1 + 25;

  const col1 = x - 39;
  const col2 = x - 13;
  const col3 = x + 13;
  const col4 = x + 39;

  const vco = useAppSelector(selectVco)

  return <>
    <Header label="Oscillator 3" x={x} y={topRow - 20} width={100} align="center"/>
    <RotaryPot32 x={x} y={y} ledMode="single" label="Waveform" position={0.8}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.VCO_WAVEFORM}
                 storePosition={vco.waveform}
    />


    <RotaryPot10 x={col1} y={topRow} ledMode="single" label="Note" position={0.5}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.VCO_NOTE}
                 storePosition={vco.note}
    />

    <RotaryPot10 x={col1} y={y} ledMode="single" label="Detune" position={0.5}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.VCO_DETUNE}
                 storePosition={vco.detune}
    />

    <RoundPushButton8 x={col2} y={topRow}
                      ledPosition="right" ledCount={3} ledLabels={['Hard', 'CEM Hard', 'CEM Soft']}
                      label="Sync" labelPosition="bottom"
                      hasOff
                      midiConfig={midiConstants.VCO.SYNC}
    />

    <RotaryPot10 x={col1} y={bottomRow1} ledMode="multi" label="Cross mod" position={0.1}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.VCO_CROSSMOD}
                 storePosition={vco.crossMod}
    />

    <RoundPushButton8 x={col2} y={bottomRow1}
                      ledPosition="right" ledCount={2} ledLabels={['Osc 1', 'Ext']}
                      label="Source" labelPosition="bottom"
                      midiConfig={midiConstants.VCO.CROSS_MOD_SRC}
    />
    <RotaryPot10 x={col4} y={bottomRow1} ledMode="single" label="PW" position={0.3}
                 ctrlGroup={ctrlGroup}
                 ctrlId={OscControllerIds.VCO_PW}
                 storePosition={vco.pw}
    />

    <RoundLedPushButton8 x={col1} y={bottomRow2} label="Ext CV" labelPosition="bottom" midiConfig={midiConstants.VCO.EXT_CV}/>
    <RoundLedPushButton8 x={col2} y={bottomRow2} label="Wheel" labelPosition="bottom" midiConfig={midiConstants.VCO.WHEEL}/>
    <RoundLedPushButton8 x={col3} y={bottomRow2} label="LFO" labelPosition="bottom" midiConfig={midiConstants.VCO.LFO}/>
    <RoundLedPushButton8 x={col4} y={bottomRow2} label="Kbd" labelPosition="bottom" midiConfig={midiConstants.VCO.KBD}/>
  </>;
};

export default VCO;
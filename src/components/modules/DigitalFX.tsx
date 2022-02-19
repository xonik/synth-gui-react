import React from 'react';
import RotaryPotWOLeds10 from '../pots/RotaryPotWOLeds10';
import Display from '../misc/Display';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { useAppSelector } from '../../synthcore/hooks'
import { selectDsp1, selectDsp2 } from '../../synthcore/modules/commonFx/commonFxReducer'
import { ControllerGroupIds } from '../../synthcore/types'
import commonFxControllers from '../../synthcore/modules/commonFx/commonFxControllers'

interface Props {
  x: number,
  y: number
}

const ctrlGroup = ControllerGroupIds.COMMON_FX

const DigitalFX = ({ x, y }: Props) => {

  const displayHeight = 40;
  const displayWidth = 80;

  const row1 = y + 20;

  const displayX = x + 20;
  const displayY = row1 + 10;


  const row4 = row1 + displayHeight + 20;

  const displayCenterY = displayY + displayHeight / 2;
  const row2left = displayCenterY - 15;
  const row3left = displayCenterY + 15;
  const row1right = displayCenterY - 20;
  const row4right = displayCenterY + 20;

  const knobSpacing = 25;
  const col1 = x+5;
  const col2 = displayX + displayWidth / 2 - knobSpacing;
  const col3 = displayX + displayWidth / 2;
  const col4 = displayX + displayWidth / 2 + knobSpacing;
  const col5 = displayX + displayWidth + 15

  const dsp1 = useAppSelector(selectDsp1)
  const dsp2 = useAppSelector(selectDsp2)

  return <>
    <RoundPushButton8 x={col1} y={row2left} label="Source" ledCount={2} ledLabels={['FX1', 'FX2']} labelPosition="bottom" ledPosition="top"
                      ctrlGroup={ctrlGroup}
                      ctrlId={commonFxControllers.DSP1.SOURCE.id}
                      value={dsp1.source}
    />

    <RoundPushButton8 x={col1} y={row3left} label="Source" ledCount={2} ledLabels={['FX1', 'FX2']} labelPosition="top" ledPosition="bottom"
                      ctrlGroup={ctrlGroup}
                      ctrlId={commonFxControllers.DSP2.SOURCE.id}
                      value={dsp2.source}
    />

    <RotaryPotWOLeds10 x={col2} y={row1}
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP1.PARAM1.id}
    />

    <RotaryPotWOLeds10 x={col3} y={row1}
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP1.PARAM2.id}
    />

    <RotaryPotWOLeds10 x={col4} y={row1}
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP1.PARAM3.id}
    />

    <Display x={displayX} y={displayY} width={displayWidth} height={displayHeight}/>

    <RotaryPotWOLeds10 x={col2} y={row4}
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP2.PARAM1.id}
    />

    <RotaryPotWOLeds10 x={col3} y={row4}
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP2.PARAM2.id}
    />

    <RotaryPotWOLeds10 x={col4} y={row4}
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP2.PARAM3.id}
    />

    <RotaryPotWOLeds10 x={col5} y={row1right} label="Effect"
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP1.EFFECT.id}
    />

    <RoundLedPushButton8 x={col5} y={displayCenterY} label="Chain" labelPosition="bottom"
                         ctrlGroup={ctrlGroup}
                         ctrlId={commonFxControllers.DSP2.CHAIN.id}
                         value={dsp2.chain}
    />

    <RotaryPotWOLeds10 x={col5} y={row4right} label="Effect"
                       ctrlGroup={ctrlGroup}
                       ctrlId={commonFxControllers.DSP2.EFFECT.id}
    />

  </>;
};

export default DigitalFX;
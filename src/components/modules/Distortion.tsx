import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectDistortion } from '../../synthcore/modules/fx/fxReducer'
import fxControllers from '../../synthcore/modules/fx/fxControllers'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.FX

const Distortion = ({ x, y }: Props) => {

    const row1 = y;
    const row2 = row1+30;

    const col1 = x + 7;
    const col2 = col1 + 25;
    const col3 = col2 + 25;
    const col4 = col3 + 10;
    const col5 = col4 + 25;
    const col6 = col5 + 25;

    const distortion = useAppSelector(selectDistortion)

    return <>
        <Header label="Distortion" x={x} y={row1} width={125}/>
        <RoundPushButton8 x={col1} y={row2+8} ledPosition="top" ledCount={2}  label="In" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={fxControllers.DISTORTION.IN.id}
                          value={distortion.in}
        />

        <RotaryPot17 ledMode="multi" label="Drive" x={col2} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrlId={fxControllers.DISTORTION.DRIVE.id}
                     value={distortion.drive}
        />

        <RoundPushButton8 x={col3} y={row2+8} ledCount={2} ledPosition="top" ledLabels={['Soft', 'Hard']} label="Clip" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={fxControllers.DISTORTION.CLIP.id}
                          value={distortion.clip}
        />

        <RotaryPot17 ledMode="multi" label="Level" x={col5} y={row2}
                     ctrlGroup={ctrlGroup}
                     ctrlId={fxControllers.DISTORTION.LEVEL.id}
                     value={distortion.level}
        />

        <RoundPushButton8 x={col6} y={row2+8} ledPosition="top" ledCount={2} label="Out" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrlId={fxControllers.DISTORTION.OUT.id}
                          value={distortion.out}
        />

    </>;
};

export default Distortion;
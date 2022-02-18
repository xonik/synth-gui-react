import React from 'react';
import RotaryPot10 from '../pots/RotaryPot10';
import Header from '../misc/Header';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import { useAppSelector } from '../../synthcore/hooks'
import { selectChorus } from '../../synthcore/modules/commonFx/commonFxReducer'
import { ControllerGroupIds } from '../../synthcore/types'
import { CommonFxControllerIds } from '../../synthcore/modules/commonFx/types'

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.COMMON_FX

const Chorus = ({ x, y }: Props) => {

    const row1 = 0;
    const row2 = 20;
    const row3 = 30;
    const col1 = 10;
    const col2 = col1 + 25;
    const col3 = col2 + 30;
    const col4 = col3 + 20;

    const chorus = useAppSelector(selectChorus)

    return <svg x={x} y={y}>
        <Header label="Chorus" x={25} y={row1} width={50}/>
        <RoundPushButton8 x={col1} y={row3} ledCount={2} ledPosition="top" ledLabels={['FX1', 'FX2']}
                          ctrlGroup={ctrlGroup}
                          ctrlId={CommonFxControllerIds.CHORUS_SOURCE}
                          storeValue={chorus.source}
        />

        <RotaryPot10 ledMode="single" label="Rate" x={col2} y={row2} position={0.4}
                     ctrlGroup={ctrlGroup}
                     ctrlId={CommonFxControllerIds.CHORUS_RATE}
                     storePosition={chorus.rate}
        />

        <RotaryPot10 ledMode="single" label="Depth" x={col3} y={row2} position={0.4}
                     ctrlGroup={ctrlGroup}
                     ctrlId={CommonFxControllerIds.CHORUS_DEPTH}
                     storePosition={chorus.depth}
        />

        <RoundPushButton8 x={col4} y={row3} ledCount={2} ledPosition="top" ledLabels={['Chorus', 'Vibrato']}
                          ctrlGroup={ctrlGroup}
                          ctrlId={CommonFxControllerIds.CHORUS_MODE}
                          storeValue={chorus.mode}
        />

    </svg>;
};

export default Chorus;
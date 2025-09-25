import React from 'react'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import ringModControllers from '../../synthcore/modules/ringMod/ringModControllers'
import SubHeader from "../misc/SubHeader";
import { PADDING_LEFT, POT_OFFSET_Y, ROW_HEIGHT, ROW_SPACING } from "../../constants";
import { SHOW_CUT } from "../../config";

interface Props {
    x: number,
    y: number
}

const ctrlGroup = ControllerGroupIds.RING_MOD

const Ringmod = ({ x, y }: Props) => {
    return <>
        {!SHOW_CUT && <rect x={x} y={y} width={45} height={ROW_HEIGHT - ROW_SPACING} className="module-background"/> }
        <SubHeader label="Ring" labelPosition="left" x={x} y={y} width={45}/>
        <RoundPushButton8 x={x + PADDING_LEFT} y={y + POT_OFFSET_Y}
                          ledPosition="right" ledCount={3} ledLabels={['1 -> 2', 'E -> 2', '3 -> 2']}
                          label="" labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={ringModControllers.SOURCE}
        />
    </>
}


export default Ringmod
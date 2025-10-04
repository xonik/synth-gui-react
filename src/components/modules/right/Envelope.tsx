import React from 'react'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import Header from '../../misc/Header'
import { StageId } from '../../../synthcore/modules/env/types'
import { useAppSelector } from '../../../synthcore/hooks'
import { ControllerGroupIds } from '../../../synthcore/types'
import { envCtrls } from '../../../synthcore/modules/env/envControllers'
import { selectController } from '../../../synthcore/modules/controllers/controllersReducer'
import SubHeader from "../../misc/SubHeader";
import {
    BUTTON_DISTANCE_S, PADDING_LEFT,
    POT_DISTANCE_L,
    POT_DISTANCE_M,
    POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT
} from "../../../constants";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";

type Props = ModuleProps & {
    x: number,
    y: number
    label: string,
    header?: string,
    envId: number,
    showSelect?: boolean,
}

const ctrlGroup = ControllerGroupIds.ENV

const Envelope = ({ x, y, height, width, label, header, showSelect = false, envId }: Props) => {
    const firstPotX = x + POT_DISTANCE_L / 2
    const topRowY = y + POT_OFFSET_Y
    const bottomRowY = topRowY + ROW_HEIGHT
    const potDistance = POT_DISTANCE_M

    const bipolar = useAppSelector(selectController(envCtrls.BIPOLAR, envId))
    const env3Id = useAppSelector(selectController(envCtrls.SELECT_ENV3_ID, 0))

    const delayDisabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.DELAY))  === 0
    const decay1Disabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.DECAY1))  === 0
    const decay2Disabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.DECAY2))  === 0
    const sustainDisabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.SUSTAIN))  === 0
    const release1Disabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.RELEASE1))  === 0


    return <>
        <ModuleBorder x={x} y={y} height={height} width={width}/>
        <SubHeader label={header} x={x} y={y} width={width} labelPosition="center" labelWidth={25}/>
        <text
            x={firstPotX - potDistance * 0.5}
            y={topRowY-2.5}
            className="header-label"
            textAnchor="middle"
            alignmentBaseline="baseline"
        >{label}</text>
        <RotaryPot12 ledMode="single" label="Attack" x={firstPotX + potDistance * 1} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.ATTACK}
        />
        <RotaryPot12 ledMode="single" label="Decay" x={firstPotX + potDistance * 2} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.DECAY1}
                     disabled={decay1Disabled}
        />
        <RotaryPot12 ledMode="multi" label="Sustain" x={firstPotX + potDistance * 3} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.LEVEL}
                     ctrlIndex={envId}
                     potMode={bipolar ? 'pan' : 'normal'}
                     valueIndex={StageId.SUSTAIN}
                     disabled={sustainDisabled}
        />
        <RotaryPot12 ledMode="single" label="Release" x={firstPotX + potDistance * 4} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.RELEASE1}
                     disabled={release1Disabled}

        />

        {showSelect && <RoundPushButton8
          ledPosition="top-horizontal"
          ledCount={3}
          ledLabels={['3', '4', '5']}
          label="Env sel" x={firstPotX} y={topRowY+4} labelPosition="bottom"
          ctrlGroup={ctrlGroup}
          ctrl={envCtrls.SELECT_ENV3_ID}
          ctrlIndex={0}
          value={env3Id -2}
        />}
        <RotaryPot12 ledMode="single" label="Delay" x={firstPotX} y={bottomRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.DELAY}
                     disabled={delayDisabled}
        />
        <RotaryPot12 ledMode="multi" label="D2 Level" x={firstPotX + potDistance * 1} y={bottomRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.LEVEL}
                     ctrlIndex={envId}
                     potMode={bipolar ? 'pan' : 'normal'}
                     valueIndex={StageId.DECAY2}
                     disabled={decay2Disabled}
        />
        <RotaryPot12 ledMode="single" label="Decay 2" x={firstPotX + potDistance * 2} y={bottomRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.DECAY2}
                     disabled={decay2Disabled}
        />

        <RotaryPot12 ledMode="multi" label="R2 Level" x={firstPotX + potDistance * 3} y={bottomRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.LEVEL}
                     ctrlIndex={envId}
                     potMode={bipolar ? 'pan' : 'normal'}
                     valueIndex={StageId.RELEASE2}
                     disabled={release1Disabled}
        />
        <RotaryPot12 ledMode="single" label="Release 2" x={firstPotX + potDistance * 4} y={bottomRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.RELEASE2}
        />

        <RoundLedPushButton8 label="Loop" x={firstPotX + potDistance * 5} y={topRowY} labelPosition="bottom-pot"
                             ctrlGroup={ctrlGroup}
                             ctrl={envCtrls.LOOP}
                             ctrlIndex={envId}
        />
        <RoundLedPushButton8
            label="Invert" x={firstPotX + potDistance * 5 + BUTTON_DISTANCE_S} y={topRowY}
            labelPosition="bottom-pot"
            ctrlGroup={ctrlGroup}
            ctrl={envCtrls.INVERT}
            ctrlIndex={envId}
        />
        <RoundPushButton8 label="Trigger" x={firstPotX + potDistance * 5 + BUTTON_DISTANCE_S} y={bottomRowY} labelPosition="bottom-pot"
                          ctrlGroup={ctrlGroup}
                          ctrl={envCtrls.ENV_GATE}
                          ctrlIndex={envId}
                          momentary
        />



    </>
}


export default Envelope
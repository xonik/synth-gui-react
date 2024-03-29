import React from 'react'
import RotaryPot15 from '../pots/RotaryPot15'
import RotaryPot10 from '../pots/RotaryPot10'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import { StageId } from '../../synthcore/modules/env/types'
import { useAppSelector } from '../../synthcore/hooks'
import { ControllerGroupIds } from '../../synthcore/types'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'

interface Props {
    x: number,
    y: number
    label: string,
    envId: number,
    showSelect?: boolean,
}

const ctrlGroup = ControllerGroupIds.ENV

const Envelope = ({ x, y, label, showSelect = false, envId }: Props) => {
    const firstPotX = x + 25
    const topRowY = y + 20
    const potY = y + 45
    const potDistance = 40

    const bipolar = useAppSelector(selectController(envCtrls.BIPOLAR, envId))
    const env3Id = useAppSelector(selectController(envCtrls.SELECT_ENV3_ID, 0))

    const delayDisabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.DELAY))  === 0
    const decay1Disabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.DECAY1))  === 0
    const decay2Disabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.DECAY2))  === 0
    const sustainDisabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.SUSTAIN))  === 0
    const release1Disabled = useAppSelector(selectController(envCtrls.TOGGLE_STAGE, envId, StageId.RELEASE1))  === 0

    return <>
        <Header align="left" label={label} x={x} y={y} width={255}/>
        <RotaryPot15 ledMode="single" label="Attack" x={firstPotX} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.ATTACK}
        />
        <RotaryPot15 ledMode="single" label="Decay 1" x={firstPotX + potDistance} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.DECAY1}
                     disabled={decay1Disabled}
        />
        <RotaryPot15 ledMode="single" label="Decay 2" x={firstPotX + potDistance * 2} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.DECAY2}
                     disabled={decay2Disabled}
        />
        <RotaryPot15 ledMode="multi" label="Sustain" x={firstPotX + potDistance * 3} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.LEVEL}
                     ctrlIndex={envId}
                     potMode={bipolar ? 'pan' : 'normal'}
                     valueIndex={StageId.SUSTAIN}
                     disabled={sustainDisabled}
        />
        <RotaryPot15 ledMode="single" label="Release 1" x={firstPotX + potDistance * 4} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.RELEASE1}
                     disabled={release1Disabled}

        />
        <RotaryPot15 ledMode="single" label="Release 2" x={firstPotX + potDistance * 5} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.RELEASE2}
        />

        {showSelect && <RoundPushButton8
          ledPosition="right"
          ledCount={3}
          ledLabels={['3', '4', '5']}
          label="Env sel" x={firstPotX - potDistance * 0.5} y={topRowY} labelPosition="bottom"
          ctrlGroup={ctrlGroup}
          ctrl={envCtrls.SELECT_ENV3_ID}
          ctrlIndex={0}
          value={env3Id -2}
        />}
        <RotaryPot10 ledMode="single" label="Delay" x={firstPotX + potDistance * 0.5} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.TIME}
                     ctrlIndex={envId}
                     valueIndex={StageId.DELAY}
                     disabled={delayDisabled}
        />
        <RotaryPot10 ledMode="multi" label="D2 Level" x={firstPotX + potDistance * 1.5} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.LEVEL}
                     ctrlIndex={envId}
                     potMode={bipolar ? 'pan' : 'normal'}
                     valueIndex={StageId.DECAY2}
                     disabled={decay2Disabled}
        />
        <RoundLedPushButton8
            label="Invert" x={firstPotX + potDistance * 2.5} y={topRowY}
            labelPosition="bottom"
            ctrlGroup={ctrlGroup}
            ctrl={envCtrls.INVERT}
            ctrlIndex={envId}
        />
        <RoundLedPushButton8 label="Loop" x={firstPotX + potDistance * 3.5} y={topRowY} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={envCtrls.LOOP}
                             ctrlIndex={envId}
        />
        <RotaryPot10 ledMode="multi" label="R2 Level" x={firstPotX + potDistance * 4.5} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envCtrls.LEVEL}
                     ctrlIndex={envId}
                     potMode={bipolar ? 'pan' : 'normal'}
                     valueIndex={StageId.RELEASE2}
                     disabled={release1Disabled}
        />
        <RoundPushButton8 label="Trigger" x={firstPotX + potDistance * 5.5} y={topRowY} labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={envCtrls.ENV_GATE}
                          ctrlIndex={envId}
                          momentary
        />
    </>
}


export default Envelope
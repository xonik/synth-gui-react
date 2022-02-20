import React from 'react'
import RotaryPot17 from '../pots/RotaryPot17'
import RotaryPot10 from '../pots/RotaryPot10'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import { selectEnv3Id, selectEnvController, selectEnvelope } from '../../synthcore/modules/env/envReducer'
import { StageId } from '../../synthcore/modules/env/types'
import { useAppSelector } from '../../synthcore/hooks'
import { ControllerGroupIds } from '../../synthcore/types'
import envControllers from '../../synthcore/modules/env/envControllers'

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

    const env = useAppSelector(selectEnvelope(envId))
    const env3Id = useAppSelector(selectEnv3Id)

    const levelS = env.stages[StageId.SUSTAIN].level
    const levelD2 = env.stages[StageId.DECAY2].level
    const levelR2 = env.stages[StageId.RELEASE2].level
    const timeDly = env.stages[StageId.DELAY].time
    const timeA = env.stages[StageId.ATTACK].time
    const timeD1 = env.stages[StageId.DECAY1].time
    const timeD2 = env.stages[StageId.DECAY2].time
    const timeR1 = env.stages[StageId.RELEASE1].time
    const timeR2 = env.stages[StageId.RELEASE2].time

    return <>
        <Header align="left" label={label} x={x} y={y} width={255}/>
        <RotaryPot17 ledMode="single" label="Attack" x={firstPotX} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).ATTACK_TIME}
                     ctrlIndex={envId}
                     value={timeA}
        />
        <RotaryPot17 ledMode="single" label="Decay 1" x={firstPotX + potDistance} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).DECAY1_TIME}
                     ctrlIndex={envId}
                     value={timeD1}
                     disabled={!env.stages[StageId.DECAY1].enabled}
        />
        <RotaryPot17 ledMode="single" label="Decay 2" x={firstPotX + potDistance * 2} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).DECAY2_TIME}
                     ctrlIndex={envId}
                     value={timeD2}
                     disabled={!env.stages[StageId.DECAY2].enabled}
        />
        <RotaryPot17 ledMode="multi" label="Sustain" x={firstPotX + potDistance * 3} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).SUSTAIN_LEVEL}
                     ctrlIndex={envId}
                     potMode={env.bipolar ? 'pan' : 'normal'}
                     value={env.bipolar ? (levelS + 1) / 2 : levelS}
                     disabled={!env.stages[StageId.SUSTAIN].enabled}
        />
        <RotaryPot17 ledMode="single" label="Release 1" x={firstPotX + potDistance * 4} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).RELEASE1_TIME}
                     ctrlIndex={envId}
                     value={timeR1}
                     disabled={!env.stages[StageId.RELEASE1].enabled}

        />
        <RotaryPot17 ledMode="single" label="Release 2" x={firstPotX + potDistance * 5} y={potY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).RELEASE2_TIME}
                     ctrlIndex={envId}
                     value={timeR2}
        />

        {showSelect && <RoundPushButton8
          ledPosition="right"
          ledCount={3}
          ledLabels={['3', '4', '5']}
          label="Env sel" x={firstPotX - potDistance * 0.5} y={topRowY} labelPosition="bottom"
          ctrlGroup={ctrlGroup}
          ctrl={envControllers(0).SELECT_ENV3_ID}
          ctrlIndex={envId}
          value={env3Id -2}
        />}
        <RotaryPot10 ledMode="single" label="Delay" x={firstPotX + potDistance * 0.5} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).DELAY_TIME}
                     ctrlIndex={envId}
                     value={timeDly}
                     disabled={!env.stages[StageId.DELAY].enabled}
        />
        <RotaryPot10 ledMode="multi" label="D2 Level" x={firstPotX + potDistance * 1.5} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).DECAY2_LEVEL}
                     ctrlIndex={envId}
                     potMode={env.bipolar ? 'pan' : 'normal'}
                     value={env.bipolar ? (levelD2 + 1) / 2 : levelD2}
                     disabled={!env.stages[StageId.DECAY2].enabled}
        />
        <RoundLedPushButton8
            label="Invert" x={firstPotX + potDistance * 2.5} y={topRowY}
            labelPosition="bottom"
            ctrlGroup={ctrlGroup}
            ctrl={envControllers(0).INVERT}
            ctrlIndex={envId}
        />
        <RoundLedPushButton8 label="Loop" x={firstPotX + potDistance * 3.5} y={topRowY} labelPosition="bottom"
                             ctrlGroup={ctrlGroup}
                             ctrl={envControllers(0).LOOP}
                             ctrlIndex={envId}
        />
        <RotaryPot10 ledMode="multi" label="R2 Level" x={firstPotX + potDistance * 4.5} y={topRowY}
                     ctrlGroup={ctrlGroup}
                     ctrl={envControllers(0).RELEASE2_LEVEL}
                     ctrlIndex={envId}
                     potMode={env.bipolar ? 'pan' : 'normal'}
                     value={env.bipolar ? (levelR2 + 1) / 2 : levelR2}
        />
        <RoundPushButton8 label="Trigger" x={firstPotX + potDistance * 5.5} y={topRowY} labelPosition="bottom"
                          ctrlGroup={ctrlGroup}
                          ctrl={envControllers(0).TRIGGER}
                          ctrlIndex={envId}
        />
    </>
}


export default Envelope
import React from 'react'
import RotaryPot17 from '../pots/RotaryPot17'
import RotaryPot10 from '../pots/RotaryPot10'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Header from '../misc/Header'
import { MidiConfig } from '../../midi/midiControllers'
import { selectEnvelope } from '../../forces/envelope/envelopesReducer'
import { StageId } from '../../forces/envelope/types'
import { ControllerGroupIds, EnvControllerId } from '../../forces/synthcore/controllers'
import { useAppSelector } from '../../forces/hooks'

type MidiConfigs = {
    a: MidiConfig;
    d1: MidiConfig;
    d2: MidiConfig;
    s: MidiConfig;
    r1: MidiConfig;
    r2: MidiConfig;
    envSel?: MidiConfig;
    delay: MidiConfig;
    d1_lev: MidiConfig;
    trigger: MidiConfig;
    loop: MidiConfig;
    r1_lev: MidiConfig;
    invert: MidiConfig;
}

interface Props {
    x: number,
    y: number
    label: string,
    envId: number,
    showSelect?: boolean,
    midiConfigs: MidiConfigs,
}

const ctrlGroup = ControllerGroupIds.ENV

const Envelope = ({ x, y, label, showSelect = false, midiConfigs, envId }: Props) => {
    const firstPotX = x + 25
    const topRowY = y + 20
    const potY = y + 45
    const potDistance = 40

    const env = useAppSelector(selectEnvelope(envId));

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
                     midiConfig={midiConfigs.a}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_ATTACK}
                     ctrlIndex={envId}
                     storePosition={timeA}
        />
        <RotaryPot17 ledMode="single" label="Decay 1" x={firstPotX + potDistance} y={potY}
                     midiConfig={midiConfigs.d1}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_DECAY1}
                     ctrlIndex={envId}
                     storePosition={timeD1}
        />
        <RotaryPot17 ledMode="single" label="Decay 2" x={firstPotX + potDistance * 2} y={potY}
                     midiConfig={midiConfigs.d2}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_DECAY2}
                     ctrlIndex={envId}
                     storePosition={timeD2}
        />
        <RotaryPot17 ledMode="multi" label="Sustain" x={firstPotX + potDistance * 3} y={potY}
                     midiConfig={midiConfigs.s}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_SUSTAIN}
                     ctrlIndex={envId}
                     potMode={env.bipolar ? 'pan' : 'normal'}
                     storePosition={env.bipolar ? (levelS + 1) / 2 : levelS }
        />
        <RotaryPot17 ledMode="single" label="Release 1" x={firstPotX + potDistance * 4} y={potY}
                     midiConfig={midiConfigs.r1}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_RELEASE1}
                     ctrlIndex={envId}
                     storePosition={timeR1}
        />
        <RotaryPot17 ledMode="single" label="Release 2" x={firstPotX + potDistance * 5} y={potY}
                     midiConfig={midiConfigs.r2}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_RELEASE2}
                     ctrlIndex={envId}
                     storePosition={timeR2}
        />

        {showSelect && <RoundPushButton8 label="Env sel" x={firstPotX - potDistance * 0.5} y={topRowY} labelPosition="bottom"
                                         midiConfig={midiConfigs.envSel}/>}
        <RotaryPot10 ledMode="single" label="Delay" x={firstPotX + potDistance * 0.5} y={topRowY}
                     midiConfig={midiConfigs.delay}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_DELAY}
                     ctrlIndex={envId}
                     storePosition={timeDly}
        />
        <RotaryPot10 ledMode="multi" label="D2 Level" x={firstPotX + potDistance * 1.5} y={topRowY}
                     midiConfig={midiConfigs.d1_lev}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_D2_LEVEL}
                     ctrlIndex={envId}
                     potMode={env.bipolar ? 'pan' : 'normal'}
                     storePosition={env.bipolar ? (levelD2 + 1) / 2 : levelD2}
        />
        <RoundLedPushButton8
            label="Invert" x={firstPotX + potDistance * 2.5} y={topRowY}
            labelPosition="bottom"
            midiConfig={midiConfigs.invert}
        />
        <RoundLedPushButton8 label="Loop" x={firstPotX + potDistance * 3.5} y={topRowY} labelPosition="bottom" midiConfig={midiConfigs.loop}/>
        <RotaryPot10 ledMode="multi" label="R2 Level" x={firstPotX + potDistance * 4.5} y={topRowY}
                     midiConfig={midiConfigs.r1_lev}
                     ctrlGroup={ctrlGroup}
                     ctrlId={EnvControllerId.ENV_R2_LEVEL}
                     ctrlIndex={envId}
                     potMode={env.bipolar ? 'pan' : 'normal'}
                     storePosition={env.bipolar ? (levelR2 + 1) / 2 : levelR2}
        />
        <RoundPushButton8 label="Trigger" x={firstPotX + potDistance * 5.5} y={topRowY} labelPosition="bottom" midiConfig={midiConfigs.trigger}/>
    </>
}


export default Envelope
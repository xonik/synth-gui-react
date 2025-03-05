import React from 'react'
import RotaryPot12 from '../pots/RotaryPot12'
import Header from '../misc/Header'
import { LedMode, PotMode } from '../pots/RotaryPotWithLedRingBase'
import { ControllerGroupIds } from '../../synthcore/types'
import postMixControllers from '../../synthcore/modules/postMix/postMixControllers'
import { ControllerConfig } from '../../midi/types'


interface Props {
    x: number,
    y: number
}

interface ChannelProps {
    label: string,
    potMode?: PotMode,
    ledMode?: LedMode,
    ctrl: ControllerConfig,
    x: number,
    y: number
}

const rowDistance = 40

const ctrlGroup = ControllerGroupIds.POST_MIX

const VoiceMixerChannel = ({ x, y, label, potMode = 'normal', ledMode = 'multi', ctrl }: ChannelProps) => {

    return <>
        <RotaryPot12 label={label} x={x} y={y} potMode={potMode} ledMode={ledMode}
                     ctrlGroup={ctrlGroup}
                     ctrl={ctrl}
        />

    </>
}

const PostMix = ({ x, y }: Props) => {
    const offsetX = 20
    const offsetY = 27
    const offsetY2 = 195

    return <svg x={x} y={y}>
        <Header label="Mix" x={0} y={0} width={40}/>
        <VoiceMixerChannel x={offsetX} y={offsetY} label="SVF" ctrl={postMixControllers.SVF}/>
        <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance} label="LPF" ctrl={postMixControllers.LPF}/>
        <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance * 2} label="Sine 1" ctrl={postMixControllers.SINE1}/>
        <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance * 3} label="Sine 2" ctrl={postMixControllers.SINE2}/>

        <Header label="Voice out" x={0} y={offsetY2 - 27} width={40}/>
        <VoiceMixerChannel x={offsetX} y={offsetY2} label="Pan" potMode="pan" ledMode="single"
                           ctrl={postMixControllers.PAN}/>
        <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance} label="Amt" ctrl={postMixControllers.AMOUNT}/>
        <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance * 2} label="FX1 send"
                           ctrl={postMixControllers.FX1_SEND}/>
        <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance * 3} label="FX2 send"
                           ctrl={postMixControllers.FX2_SEND}/>
    </svg>
}


export default PostMix
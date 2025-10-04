import React from 'react'
import RotaryPot12 from '../../pots/RotaryPot12'
import Header from '../../misc/Header'
import { LedMode, PotMode } from '../../pots/RotaryPotWithLedRingBase'
import { ControllerGroupIds } from '../../../synthcore/types'
import postMixControllers from '../../../synthcore/modules/postMix/postMixControllers'
import { ControllerConfig } from '../../../midi/types'
import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT, ROW_SPACING } from "../../../constants";
import SubHeader from "../../misc/SubHeader";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";


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

const ctrlGroup = ControllerGroupIds.POST_MIX

const VoiceMixerChannel = ({ x, y, label, potMode = 'normal', ledMode = 'multi', ctrl }: ChannelProps) => {

    return <>
        <RotaryPot12 label={label} x={x} y={y} potMode={potMode} ledMode={ledMode}
                     ctrlGroup={ctrlGroup}
                     ctrl={ctrl}
        />

    </>
}

const PostMix = ({ x, y, height, width }: ModuleProps) => {
    const center = x + POT_DISTANCE_L / 2
    const offsetY = y + POT_OFFSET_Y
    const offsetY2 = offsetY + 4 * ROW_HEIGHT

    return <>
        <ModuleBorder x={x} y={y} height={height / 2} width={width}/>
        <SubHeader label="Mix" x={x} y={y} width={width} labelPosition="center" labelWidth={15}/>
        <VoiceMixerChannel x={center} y={offsetY} label="SVF" ctrl={postMixControllers.SVF}/>
        <VoiceMixerChannel x={center} y={offsetY + ROW_HEIGHT} label="LPF" ctrl={postMixControllers.LPF}/>
        <VoiceMixerChannel x={center} y={offsetY + ROW_HEIGHT * 2} label="Sine 1" ctrl={postMixControllers.SINE1}/>
        <VoiceMixerChannel x={center} y={offsetY + ROW_HEIGHT * 3} label="Sine 2" ctrl={postMixControllers.SINE2}/>


        <ModuleBorder x={x} y={offsetY2 - POT_OFFSET_Y} height={height / 2} width={width}/>
        <SubHeader label="Voice" x={x} y={offsetY2 - POT_OFFSET_Y} width={width} labelPosition="center" labelWidth={15}/>
        <VoiceMixerChannel x={center} y={offsetY2} label="Pan" potMode="pan" ledMode="single"
                           ctrl={postMixControllers.PAN}/>
        <VoiceMixerChannel x={center} y={offsetY2 + ROW_HEIGHT} label="Amt"
                           ctrl={postMixControllers.AMOUNT}/>
        <VoiceMixerChannel x={center} y={offsetY2 + ROW_HEIGHT * 2} label="FX1 send"
                           ctrl={postMixControllers.FX1_SEND}/>
        <VoiceMixerChannel x={center} y={offsetY2 + ROW_HEIGHT * 3} label="FX2 send"
                           ctrl={postMixControllers.FX2_SEND}/>
    </>
}


export default PostMix
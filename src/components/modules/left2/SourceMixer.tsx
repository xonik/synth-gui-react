import React from 'react'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../../synthcore/types'
import srcMixControllers from '../../../synthcore/modules/srcMix/srcMixControllers'
import { ControllerConfig } from '../../../midi/types'
import RotaryPot12 from "../../pots/RotaryPot12";
import SubHeader from "../../misc/SubHeader";
import {
    BUTTON_DISTANCE_S,
    DUAL_LED_BUTTON_NO_LABEL_OFFSET_Y, DUAL_LED_BUTTON_W_LABEL_OFFSET_Y, POT_DISTANCE_L, POT_DISTANCE_M, POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT, ROW_SPACING
} from "../../../constants";
import { SHOW_CUT } from "../../../config";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";

interface ChannelProps {
    label: string,
    x: number,
    y: number,
    levelCtrl: ControllerConfig,
    outCtrl: ControllerConfig,
}

const ctrlGroup = ControllerGroupIds.SRC_MIX

const MixerChannel = ({ x, y, label, levelCtrl, outCtrl }: ChannelProps) => {
    return <>
        <RotaryPot12 ledMode="multi" label={label} x={x} y={y}
                     ctrlGroup={ctrlGroup}
                     ctrl={levelCtrl}
        />

        <RoundPushButton8 x={x + POT_DISTANCE_S} y={y + (DUAL_LED_BUTTON_W_LABEL_OFFSET_Y)}
                          ledPosition="top-horizontal" ledCount={2}
                          ledLabels={['S', 'L']}
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={outCtrl}
        />
    </>
}

const SourceMixer = ({ x, y, height, width }: ModuleProps) => {
    const colDistance = POT_DISTANCE_L


    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + colDistance

    const row1 = y + POT_OFFSET_Y
    const row2 = row1 + ROW_HEIGHT
    const row3 = row2 + ROW_HEIGHT


    return <>
        {/*!SHOW_CUT && <rect x={x} y={y} width="135" height={2 * ROW_HEIGHT - ROW_SPACING} className="module-background"/> */ }
        <ModuleBorder x={x} y={y} height={height} width={width} />
        <SubHeader label="Mix" x={x} y={y} width={width} labelWidth={15} labelPosition="center"/>

        <MixerChannel x={col1} y={row1} label="Osc 1"
                      levelCtrl={srcMixControllers.LEVEL_OSC1}
                      outCtrl={srcMixControllers.OUT_OSC1}
        />
        <MixerChannel x={col1} y={row2} label="Osc 2"
                      levelCtrl={srcMixControllers.LEVEL_OSC2}
                      outCtrl={srcMixControllers.OUT_OSC2}
        />
        <MixerChannel x={col1} y={row3} label="Osc 3"
                      levelCtrl={srcMixControllers.LEVEL_OSC3}
                      outCtrl={srcMixControllers.OUT_OSC3}
        />

        <MixerChannel x={col2} y={row1} label="Noise"
                      levelCtrl={srcMixControllers.LEVEL_NOISE}
                      outCtrl={srcMixControllers.OUT_NOISE}
        />
        <MixerChannel x={col2} y={row2} label="Ring mod"
                      levelCtrl={srcMixControllers.LEVEL_RING_MOD}
                      outCtrl={srcMixControllers.OUT_RING_MOD}
        />
        <MixerChannel x={col2} y={row3} label="Ext audio"
                      levelCtrl={srcMixControllers.LEVEL_EXT_AUDIO}
                      outCtrl={srcMixControllers.OUT_EXT_AUDIO}
        />
    </>
}


export default SourceMixer
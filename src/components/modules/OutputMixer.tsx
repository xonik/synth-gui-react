import React from 'react'
import RotaryPot12 from '../pots/RotaryPot12'
import Header from '../misc/Header'
import { PotMode } from '../pots/RotaryPotWithLedRingBase'
import { ControllerGroupIds } from '../../synthcore/types'
import commonFxControllers from '../../synthcore/modules/commonFx/commonFxControllers'
import outControllers from '../../synthcore/modules/out/outControllers'
import { ControllerConfig } from '../../midi/types'
import { PADDING_LEFT, POT_OFFSET_Y, ROW_HEIGHT } from "../../constants";
import SubHeader from "../misc/SubHeader";

interface Props {
    x: number,
    y: number
}

interface ChannelProps {
    label: string,
    potMode?: PotMode,
    x: number,
    y: number,
    ctrlGroup: number,
    ctrl: ControllerConfig,
}

const OutputMixerChannel = ({ x, y, label, potMode = 'normal', ctrlGroup, ctrl }: ChannelProps) => {
    return <>
        <RotaryPot12 ledMode="multi" label={label} x={x} y={y} potMode={potMode}
                     ctrlGroup={ctrlGroup}
                     ctrl={ctrl}
        />
    </>
}

const ctrlGroupFx = ControllerGroupIds.COMMON_FX
const ctrlGroupOut = ControllerGroupIds.OUT

const OutputMixer = ({ x, y }: Props) => {
    const offsetX = x + 20
    const topPotY = y + POT_OFFSET_Y

    return <>
        <SubHeader labelPosition="left" label="Out" x={x} y={y} width={40}/>

        <OutputMixerChannel x={offsetX} y={topPotY} label="Volume"
                            ctrlGroup={ctrlGroupOut}
                            ctrl={outControllers.VOLUME}
        />

        <OutputMixerChannel x={offsetX} y={topPotY + ROW_HEIGHT} label="Headphones"
                            ctrlGroup={ctrlGroupOut}
                            ctrl={outControllers.HEADPHONES}
        />

        <OutputMixerChannel x={offsetX} y={topPotY + ROW_HEIGHT * 2} potMode="spread" label="Spread"
                            ctrlGroup={ctrlGroupOut}
                            ctrl={outControllers.SPREAD}
        />

        <SubHeader labelPosition="left" label="FX" x={x} y={topPotY + ROW_HEIGHT * 4 - POT_OFFSET_Y} width={40}/>
        <OutputMixerChannel x={offsetX} y={topPotY + ROW_HEIGHT * 4} label="DSP 1"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_DSP1}
        />

        <OutputMixerChannel x={offsetX} y={topPotY + ROW_HEIGHT * 5} label="DSP 2"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_DSP2}
        />

        <OutputMixerChannel x={offsetX} y={topPotY + ROW_HEIGHT * 6} label="Chorus"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_CHORUS}
        />

        <OutputMixerChannel x={offsetX} y={topPotY + ROW_HEIGHT * 7} label="Bit crusher"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_BIT_CRUSHER}
        />
    </>
}


export default OutputMixer
import React from 'react'
import RotaryPot12 from '../pots/RotaryPot12'
import Header from '../misc/Header'
import { PotMode } from '../pots/RotaryPotWithLedRingBase'
import { ControllerGroupIds } from '../../synthcore/types'
import commonFxControllers from '../../synthcore/modules/commonFx/commonFxControllers'
import outControllers from '../../synthcore/modules/out/outControllers'
import { ControllerConfig } from '../../midi/types'

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

const rowDistance = 40
const colDistance = 30

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
    const offsetX = 20
    const offsetX2 = 195
    const offsetY = 15

    return <svg x={x} y={y}>
        <Header label="FX mix" x={0} y={+offsetY + rowDistance * 4 - 27} width={40}/>
        <OutputMixerChannel x={offsetX} y={offsetY} label="DSP 1"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_DSP1}
        />

        <OutputMixerChannel x={offsetX + colDistance} y={offsetY} label="DSP 2"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_DSP2}
        />

        <OutputMixerChannel x={offsetX + colDistance * 2} y={offsetY} label="Chorus"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_CHORUS}
        />

        <OutputMixerChannel x={offsetX + colDistance * 3} y={offsetY} label="Bit crusher"
                            ctrlGroup={ctrlGroupFx}
                            ctrl={commonFxControllers.FX_MIX.LEVEL_BIT_CRUSHER}
        />

        <OutputMixerChannel x={offsetX2} y={offsetY} potMode="spread" label="Spread"
                            ctrlGroup={ctrlGroupOut}
                            ctrl={outControllers.SPREAD}
        />

        <OutputMixerChannel x={offsetX2 + colDistance} y={offsetY} label="Volume"
                            ctrlGroup={ctrlGroupOut}
                            ctrl={outControllers.VOLUME}
        />

        <OutputMixerChannel x={offsetX2 + colDistance} y={offsetY - 30} label="Headphones"
                            ctrlGroup={ctrlGroupOut}
                            ctrl={outControllers.HEADPHONES}
        />


    </svg>
}


export default OutputMixer
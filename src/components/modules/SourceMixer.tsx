import React from 'react'
import Header from '../misc/Header'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import srcMixControllers from '../../synthcore/modules/srcMix/srcMixControllers'
import { ControllerConfig } from '../../midi/types'
import RotaryPot12 from "../pots/RotaryPot12";

interface Props {
    x: number,
    y: number
}

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
        <RotaryPot12 ledMode="multi" label={label} x={x} y={y-5}
                     ctrlGroup={ctrlGroup}
                     ctrl={levelCtrl}
        />

        <RoundPushButton8 x={x + 20} y={y + 3}
                          ledPosition="top" ledCount={2}
                          ledLabels={['S','L']}
                          hasOff
                          ctrlGroup={ctrlGroup}
                          ctrl={outCtrl}
        />
    </>
}

const SourceMixer = ({ x, y }: Props) => {
    const offsetX = 15
    const offsetY = 25
    const rowDistance = 35
    const colDistance = 47.5

    const col1 = x + offsetX
    const col2 = col1 + colDistance
    const col3 = col1 + colDistance * 2

    const row1 = y + 2 + offsetY
    const row2 = row1 + rowDistance

    return <>
        <Header label="Source mix" x={x} y={y} width={150}/>
        <MixerChannel x={col1} y={row1} label="Osc 1"
                      levelCtrl={srcMixControllers.LEVEL_OSC1}
                      outCtrl={srcMixControllers.OUT_OSC1}
        />
        <MixerChannel x={col2} y={row1} label="Osc 2"
                      levelCtrl={srcMixControllers.LEVEL_OSC2}
                      outCtrl={srcMixControllers.OUT_OSC2}
        />
        <MixerChannel x={col3} y={row1} label="Osc 3"
                      levelCtrl={srcMixControllers.LEVEL_OSC3}
                      outCtrl={srcMixControllers.OUT_OSC3}
        />
        <MixerChannel x={col1} y={row2} label="Noise"
                      levelCtrl={srcMixControllers.LEVEL_NOISE}
                      outCtrl={srcMixControllers.OUT_NOISE}
        />
        <MixerChannel x={col2} y={row2} label="Ring mod"
                      levelCtrl={srcMixControllers.LEVEL_RING_MOD}
                      outCtrl={srcMixControllers.OUT_RING_MOD}
        />
        <MixerChannel x={col3} y={row2} label="Ext audio"
                      levelCtrl={srcMixControllers.LEVEL_EXT_AUDIO}
                      outCtrl={srcMixControllers.OUT_EXT_AUDIO}
        />
    </>
}


export default SourceMixer
import React from 'react'
import RotaryPot17 from '../pots/RotaryPot17'
import Header from '../misc/Header'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectSrcMix } from '../../synthcore/modules/srcMix/srcMixReducer'
import srcMixControllers from '../../synthcore/modules/srcMix/srcMixControllers'
import { ControllerConfig } from '../../midi/types'

interface Props {
    x: number,
    y: number
}

interface ChannelProps {
    label: string,
    x: number,
    y: number,
    levelCtrl: ControllerConfig,
    levelPos: number, 
    outCtrl: ControllerConfig,
    outVal: number,
}

const ctrlGroup = ControllerGroupIds.SRC_MIX

const MixerChannel = ({ x, y, label, levelCtrl, levelPos, outCtrl, outVal }: ChannelProps) => {
    return <>
        <RotaryPot17 ledMode="multi" label={label} x={x} y={y}
                     ctrlGroup={ctrlGroup}
                     ctrl={levelCtrl}
                     value={levelPos}
        />

        <RoundPushButton8 x={x + 25} y={y + 3}
                          ledPosition="top" ledCount={2}
                          ctrlGroup={ctrlGroup}
                          ctrl={outCtrl}
                          value={outVal}
        />    
    </>
}

const SourceMixer = ({ x, y }: Props) => {
    const offsetX = 20
    const offsetY = 25
    const rowDistance = 40
    const colDistance = 60

    const col1 = x - 2 + offsetX
    const col2 = col1 + colDistance
    const col3 = col1 + colDistance * 2

    const row1 = y + 2 + offsetY
    const row2 = row1 + rowDistance

    const srcMix = useAppSelector(selectSrcMix)
    
    return <>
        <Header label="Source mix" x={x} y={y} width={170}/>
        <MixerChannel x={col1} y={row1} label="Osc 1"
                      levelCtrl={srcMixControllers.LEVEL_OSC1} levelPos={srcMix.levelOsc1}
                      outCtrl={srcMixControllers.OUT_OSC1} outVal={srcMix.outOsc1}
        />
        <MixerChannel x={col2} y={row1} label="Osc 2"
                      levelCtrl={srcMixControllers.LEVEL_OSC2} levelPos={srcMix.levelOsc2}
                      outCtrl={srcMixControllers.OUT_OSC2} outVal={srcMix.outOsc2}
        />
        <MixerChannel x={col3} y={row1} label="Osc 3"
                      levelCtrl={srcMixControllers.LEVEL_OSC3} levelPos={srcMix.levelOsc3}
                      outCtrl={srcMixControllers.OUT_OSC3} outVal={srcMix.outOsc3}
        />
        <MixerChannel x={col1} y={row2} label="Noise"
                      levelCtrl={srcMixControllers.LEVEL_NOISE} levelPos={srcMix.levelNoise}
                      outCtrl={srcMixControllers.OUT_NOISE} outVal={srcMix.outNoise}
        />
        <MixerChannel x={col2} y={row2} label="Ring mod"
                      levelCtrl={srcMixControllers.LEVEL_RING_MOD} levelPos={srcMix.levelRingMod}
                      outCtrl={srcMixControllers.OUT_RING_MOD} outVal={srcMix.outRingMod}
        />
        <MixerChannel x={col3} y={row2} label="Ext audio"
                      levelCtrl={srcMixControllers.LEVEL_EXT_AUDIO} levelPos={srcMix.levelExtAudio}
                      outCtrl={srcMixControllers.OUT_EXT_AUDIO} outVal={srcMix.outExtAudio}
        />
    </>
}


export default SourceMixer
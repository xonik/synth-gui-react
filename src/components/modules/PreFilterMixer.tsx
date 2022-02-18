import React from 'react'
import RotaryPot17 from '../pots/RotaryPot17'
import Header from '../misc/Header'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectSrcMix } from '../../synthcore/modules/srcMix/srcMixReducer'
import { SrcMixControllerIds } from '../../synthcore/modules/srcMix/types'

interface Props {
    x: number,
    y: number
}

interface ChannelProps {
    label: string,
    x: number,
    y: number,
    levelId: number, 
    levelPos: number, 
    outId: number, 
    outVal: number,
}

const ctrlGroup = ControllerGroupIds.SRC_MIX

const PreFilterMixerChannel = ({ x, y, label, levelId, levelPos, outId, outVal }: ChannelProps) => {
    return <>
        <RotaryPot17 ledMode="multi" label={label} x={x} y={y}
                     ctrlGroup={ctrlGroup}
                     ctrlId={levelId}
                     value={levelPos}
        />

        <RoundPushButton8 x={x + 25} y={y + 3}
                          ledPosition="top" ledCount={2}
                          ctrlGroup={ctrlGroup}
                          ctrlId={outId}
                          value={outVal}
        />    
    </>
}

const PreFilterMixer = ({ x, y }: Props) => {
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
        <PreFilterMixerChannel x={col1} y={row1} label="Osc 1"
                               levelId={SrcMixControllerIds.LEVEL_OSC1} levelPos={srcMix.levelOsc1}
                               outId={SrcMixControllerIds.OUT_OSC1} outVal={srcMix.outOsc1}
        />
        <PreFilterMixerChannel x={col2} y={row1} label="Osc 2"
                               levelId={SrcMixControllerIds.LEVEL_OSC2} levelPos={srcMix.levelOsc2}
                               outId={SrcMixControllerIds.OUT_OSC2} outVal={srcMix.outOsc2}
        />
        <PreFilterMixerChannel x={col3} y={row1} label="Osc 3"
                               levelId={SrcMixControllerIds.LEVEL_OSC3} levelPos={srcMix.levelOsc3}
                               outId={SrcMixControllerIds.OUT_OSC3} outVal={srcMix.outOsc3}
        />
        <PreFilterMixerChannel x={col1} y={row2} label="Noise"
                               levelId={SrcMixControllerIds.LEVEL_NOISE} levelPos={srcMix.levelNoise}
                               outId={SrcMixControllerIds.OUT_NOISE} outVal={srcMix.outNoise}
        />
        <PreFilterMixerChannel x={col2} y={row2} label="Ring mod"
                               levelId={SrcMixControllerIds.LEVEL_RING_MOD} levelPos={srcMix.levelRingMod}
                               outId={SrcMixControllerIds.OUT_RING_MOD} outVal={srcMix.outRingMod}
        />
        <PreFilterMixerChannel x={col3} y={row2} label="Ext audio"
                               levelId={SrcMixControllerIds.LEVEL_EXT_AUDIO} levelPos={srcMix.levelExtAudio}
                               outId={SrcMixControllerIds.OUT_EXT_AUDIO} outVal={srcMix.outExtAudio}
        />
    </>
}


export default PreFilterMixer
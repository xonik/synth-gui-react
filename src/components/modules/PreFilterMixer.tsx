import React from 'react'
import RotaryPot17 from '../pots/RotaryPot17'
import Header from '../misc/Header'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import midiConstants from '../../midi/controllers'
import { ControllerConfigCC } from '../../midi/types'


interface Props {
    x: number,
    y: number
}

interface ChannelProps {
    label: string,
    x: number,
    y: number
    potControllerConfig: ControllerConfigCC,
    buttonControllerConfig: ControllerConfigCC,
}


const PreFilterMixerChannel = ({ x, y, label, buttonControllerConfig, potControllerConfig }: ChannelProps) => {
    return <>
        <RotaryPot17 ledMode="multi" label={label} x={x} y={y} position={0.4} midiConfig={potControllerConfig}/>
        <RoundPushButton8 x={x + 25} y={y + 3}
                          ledPosition="top" ledCount={2} midiConfig={buttonControllerConfig}
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

    return <>
        <Header label="Source mix" x={x} y={y} width={170}/>
        <PreFilterMixerChannel x={col1} y={row1} label="Osc 1" buttonControllerConfig={midiConstants.SOURCE_MIX.OUT_OSC1} potControllerConfig={midiConstants.SOURCE_MIX.LEVEL_OSC1}/>
        <PreFilterMixerChannel x={col2} y={row1} label="Osc 2" buttonControllerConfig={midiConstants.SOURCE_MIX.OUT_OSC2} potControllerConfig={midiConstants.SOURCE_MIX.LEVEL_OSC2}/>
        <PreFilterMixerChannel x={col3} y={row1} label="Osc 3" buttonControllerConfig={midiConstants.SOURCE_MIX.OUT_OSC3} potControllerConfig={midiConstants.SOURCE_MIX.LEVEL_OSC3}/>
        <PreFilterMixerChannel x={col1} y={row2} label="Noise" buttonControllerConfig={midiConstants.SOURCE_MIX.OUT_NOISE} potControllerConfig={midiConstants.SOURCE_MIX.LEVEL_NOISE}/>
        <PreFilterMixerChannel x={col2} y={row2} label="Ring mod" buttonControllerConfig={midiConstants.SOURCE_MIX.OUT_RING_MOD} potControllerConfig={midiConstants.SOURCE_MIX.LEVEL_RING_MOD}/>
        <PreFilterMixerChannel x={col3} y={row2} label="Ext audio" buttonControllerConfig={midiConstants.SOURCE_MIX.OUT_EXT_AUDIO} potControllerConfig={midiConstants.SOURCE_MIX.LEVEL_EXT_AUDIO}/>
    </>
}


export default PreFilterMixer
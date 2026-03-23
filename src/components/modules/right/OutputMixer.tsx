import React from 'react'
import RotaryPot12 from '../../pots/RotaryPot12'
import { PotMode } from '../../pots/RotaryPotWithLedRingBase'
import { ControllerGroupIds } from '../../../synthcore/types'
import commonFxControllers from '../../../synthcore/modules/commonFx/commonFxControllers'
import { ControllerConfig } from '../../../midi/types'
import { POT_DISTANCE_L, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import SubHeader from "../../misc/SubHeader";
import { ModuleProps } from "../types";
import { ModuleBorder } from "../../misc/ModuleBorder";
import "../Modules.scss"
import { usePot } from '../../../store/hooks'
import { VoiceGroupPatch } from '../../../store/patchStore'

interface FxChannelProps {
    label: string,
    x: number,
    y: number,
    ctrlGroup: number,
    ctrl: ControllerConfig,
}

const FxMixChannel = ({ x, y, label, ctrlGroup, ctrl }: FxChannelProps) => {
    return <RotaryPot12 ledMode="multi" label={label} x={x} y={y}
                 ctrlGroup={ctrlGroup}
                 ctrl={ctrl}
    />
}

const OutPot = ({ x, y, label, potMode = 'normal', selector, mutator }: {
    x: number, y: number, label: string, potMode?: PotMode,
    selector: (s: VoiceGroupPatch) => number,
    mutator: (s: VoiceGroupPatch, v: number) => void,
}) => {
    const { displayValue, increment } = usePot(selector, mutator)
    return <RotaryPot12
        ledMode="multi"
        label={label}
        x={x}
        y={y}
        potMode={potMode}
        value={displayValue}
        onValueIncrement={increment}
    />
}

const ctrlGroupFx = ControllerGroupIds.COMMON_FX

const OutputMixer = ({ x, y, height, width }: ModuleProps) => {
    const center = x + POT_DISTANCE_L / 2
    const topPotY = y + POT_OFFSET_Y

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} className="shared-elements-border"/>
        <SubHeader label="Out" x={x} y={y} width={width} labelPosition="center" labelWidth={15}/>

        <OutPot x={center} y={topPotY} label="Volume"
                selector={s => s.output.volume}
                mutator={(s, v) => { s.output.volume = v }}
        />

        <OutPot x={center} y={topPotY + ROW_HEIGHT} label="Headphones"
                selector={s => s.output.headphones}
                mutator={(s, v) => { s.output.headphones = v }}
        />

        <OutPot x={center} y={topPotY + ROW_HEIGHT * 2} label="Spread" potMode="spread"
                selector={s => s.output.spread}
                mutator={(s, v) => { s.output.spread = v }}
        />

        <ModuleBorder x={x} y={y + ROW_HEIGHT * 4} height={height} width={width} className="shared-elements-border"/>
        <SubHeader label="FX" x={x} y={topPotY + ROW_HEIGHT * 4 - POT_OFFSET_Y} width={width} labelPosition="center" labelWidth={15}/>
        <FxMixChannel x={center} y={topPotY + ROW_HEIGHT * 4} label="DSP 1"
                        ctrlGroup={ctrlGroupFx}
                        ctrl={commonFxControllers.FX_MIX.LEVEL_DSP1}
        />

        <FxMixChannel x={center} y={topPotY + ROW_HEIGHT * 5} label="DSP 2"
                        ctrlGroup={ctrlGroupFx}
                        ctrl={commonFxControllers.FX_MIX.LEVEL_DSP2}
        />

        <FxMixChannel x={center} y={topPotY + ROW_HEIGHT * 6} label="Chorus"
                        ctrlGroup={ctrlGroupFx}
                        ctrl={commonFxControllers.FX_MIX.LEVEL_CHORUS}
        />

        <FxMixChannel x={center} y={topPotY + ROW_HEIGHT * 7} label="Bit crusher"
                        ctrlGroup={ctrlGroupFx}
                        ctrl={commonFxControllers.FX_MIX.LEVEL_BIT_CRUSHER}
        />
    </>
}


export default OutputMixer

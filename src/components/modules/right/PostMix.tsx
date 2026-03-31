import React from 'react'
import RotaryPot12 from '../../pots/RotaryPot12'
import { LedMode, PotMode } from '../../pots/RotaryPotWithLedRingBase'
import { POT_DISTANCE_L, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import SubHeader from "../../misc/SubHeader";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";
import "../Modules.scss"
import { usePot } from '../../../store/hooks'
import { VoiceGroupPatch } from '../../../store/patchStore'

const PostMixPot = ({ x, y, label, potMode = 'normal', ledMode = 'multi', selector, mutator, bipolar }: {
    x: number, y: number, label: string, potMode?: PotMode, ledMode?: LedMode,
    selector: (s: VoiceGroupPatch) => number,
    mutator: (s: VoiceGroupPatch, v: number) => void,
    bipolar?: boolean,
}) => {
    const { displayValue, increment } = usePot(selector, mutator, bipolar ? { bipolar: true } : undefined)
    return <RotaryPot12
        label={label}
        x={x}
        y={y}
        potMode={potMode}
        ledMode={ledMode}
        value={displayValue}
        onValueIncrement={increment}
    />
}

const PostMix = ({ x, y, height, width }: ModuleProps) => {
    const center = x + POT_DISTANCE_L / 2
    const offsetY = y + POT_OFFSET_Y
    const offsetY2 = offsetY + 4 * ROW_HEIGHT

    return <>
        <ModuleBorder x={x} y={y} height={height / 2} width={width} className="audio-elements-border"/>
        <SubHeader label="Voice mix" x={x} y={y} width={width} labelPosition="center" labelWidth={22}/>
        <PostMixPot x={center} y={offsetY} label="SVF"
                    selector={s => s.postMix.svf}
                    mutator={(s, v) => { s.postMix.svf = v }}
        />
        <PostMixPot x={center} y={offsetY + ROW_HEIGHT} label="LPF"
                    selector={s => s.postMix.lpf}
                    mutator={(s, v) => { s.postMix.lpf = v }}
        />
        <PostMixPot x={center} y={offsetY + ROW_HEIGHT * 2} label="Sine 1"
                    selector={s => s.postMix.sine1}
                    mutator={(s, v) => { s.postMix.sine1 = v }}
        />
        <PostMixPot x={center} y={offsetY + ROW_HEIGHT * 3} label="Sine 2"
                    selector={s => s.postMix.sine2}
                    mutator={(s, v) => { s.postMix.sine2 = v }}
        />

        <ModuleBorder x={x} y={offsetY2 - POT_OFFSET_Y} height={height / 2} width={width} className="audio-elements-border"/>
        <SubHeader label="Voice out" x={x} y={offsetY2 - POT_OFFSET_Y} width={width} labelPosition="center" labelWidth={22}/>
        <PostMixPot x={center} y={offsetY2} label="Pan" potMode="pan" ledMode="single" bipolar
                    selector={s => s.postMix.pan}
                    mutator={(s, v) => { s.postMix.pan = v }}
        />
        <PostMixPot x={center} y={offsetY2 + ROW_HEIGHT} label="Amt"
                    selector={s => s.postMix.amount}
                    mutator={(s, v) => { s.postMix.amount = v }}
        />
        <PostMixPot x={center} y={offsetY2 + ROW_HEIGHT * 2} label="FX1 send"
                    selector={s => s.postMix.fx1Send}
                    mutator={(s, v) => { s.postMix.fx1Send = v }}
        />
        <PostMixPot x={center} y={offsetY2 + ROW_HEIGHT * 3} label="FX2 send"
                    selector={s => s.postMix.fx2Send}
                    mutator={(s, v) => { s.postMix.fx2Send = v }}
        />
    </>
}


export default PostMix

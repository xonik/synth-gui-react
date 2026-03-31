import RoundPushButton8 from '../../buttons/RoundPushButton8'
import RotaryPot12 from "../../pots/RotaryPot12";
import SubHeader from "../../misc/SubHeader";
import {
    DUAL_LED_BUTTON_W_LABEL_OFFSET_Y, POT_DISTANCE_L, POT_DISTANCE_M, POT_DISTANCE_S,
    POT_OFFSET_Y,
    ROW_HEIGHT,
} from "../../../constants";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";
import { usePot, useButton } from '../../../store/hooks'
import { VoiceGroupPatch } from '../../../store/patchStore'
import { dbLevelResponseMapper } from '../../../synthcore/modules/common/responseMappers'
import "../Modules.scss"

const SrcMixLevelPot = ({ x, y, label, selector, mutator }: {
    x: number, y: number, label: string,
    selector: (s: VoiceGroupPatch) => number,
    mutator: (s: VoiceGroupPatch, v: number) => void,
}) => {
    const { displayValue, increment } = usePot(selector, mutator, { responseMapper: dbLevelResponseMapper })
    return <RotaryPot12
        ledMode="multi"
        label={label}
        x={x}
        y={y}
        value={displayValue}
        onValueIncrement={increment}
    />
}

const SrcMixOutButton = ({ x, y, selector, mutator }: {
    x: number, y: number,
    selector: (s: VoiceGroupPatch) => number,
    mutator: (s: VoiceGroupPatch, v: number) => void,
}) => {
    const { value, toggle } = useButton(selector, mutator, 4)
    return <RoundPushButton8
        x={x}
        y={y + DUAL_LED_BUTTON_W_LABEL_OFFSET_Y}
        ledPosition="top-horizontal-no-label"
        ledCount={2}
        ledRingColors={['#00bfa6', '#ff8700']}
        label="To"
        labelPosition="bottom"
        hasOff
        value={value}
        onButtonClick={toggle}
    />
}

const MixerChannel = ({ x, y, label, levelSelector, levelMutator, outSelector, outMutator }: {
    x: number, y: number, label: string,
    levelSelector: (s: VoiceGroupPatch) => number,
    levelMutator: (s: VoiceGroupPatch, v: number) => void,
    outSelector: (s: VoiceGroupPatch) => number,
    outMutator: (s: VoiceGroupPatch, v: number) => void,
}) => {
    return <>
        <SrcMixLevelPot x={x} y={y} label={label}
                        selector={levelSelector}
                        mutator={levelMutator}
        />
        <SrcMixOutButton x={x + POT_DISTANCE_S} y={y}
                         selector={outSelector}
                         mutator={outMutator}
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
        <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border"/>
        <SubHeader label="Mix" x={x} y={y} width={width} labelWidth={15} labelPosition="center"/>

        <MixerChannel x={col1} y={row1} label="Osc 1"
                      levelSelector={s => s.srcMix.levelOsc1}
                      levelMutator={(s, v) => { s.srcMix.levelOsc1 = v }}
                      outSelector={s => s.srcMix.outOsc1}
                      outMutator={(s, v) => { s.srcMix.outOsc1 = v }}
        />
        <MixerChannel x={col1} y={row2} label="Osc 2"
                      levelSelector={s => s.srcMix.levelOsc2}
                      levelMutator={(s, v) => { s.srcMix.levelOsc2 = v }}
                      outSelector={s => s.srcMix.outOsc2}
                      outMutator={(s, v) => { s.srcMix.outOsc2 = v }}
        />
        <MixerChannel x={col1} y={row3} label="Osc 3"
                      levelSelector={s => s.srcMix.levelOsc3}
                      levelMutator={(s, v) => { s.srcMix.levelOsc3 = v }}
                      outSelector={s => s.srcMix.outOsc3}
                      outMutator={(s, v) => { s.srcMix.outOsc3 = v }}
        />

        <MixerChannel x={col2} y={row1} label="Noise"
                      levelSelector={s => s.srcMix.levelNoise}
                      levelMutator={(s, v) => { s.srcMix.levelNoise = v }}
                      outSelector={s => s.srcMix.outNoise}
                      outMutator={(s, v) => { s.srcMix.outNoise = v }}
        />
        <MixerChannel x={col2} y={row2} label="Ring mod"
                      levelSelector={s => s.srcMix.levelRingMod}
                      levelMutator={(s, v) => { s.srcMix.levelRingMod = v }}
                      outSelector={s => s.srcMix.outRingMod}
                      outMutator={(s, v) => { s.srcMix.outRingMod = v }}
        />
        <MixerChannel x={col2} y={row3} label="Ext audio"
                      levelSelector={s => s.srcMix.levelExtAudio}
                      levelMutator={(s, v) => { s.srcMix.levelExtAudio = v }}
                      outSelector={s => s.srcMix.outExtAudio}
                      outMutator={(s, v) => { s.srcMix.outExtAudio = v }}
        />
    </>
}


export default SourceMixer

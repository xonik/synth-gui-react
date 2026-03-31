import { POT_DISTANCE_L, POT_OFFSET_Y, ROW_HEIGHT } from '../../../constants'
import { usePot } from '../../../store/hooks'
import type { VoiceGroupPatch } from '../../../store/patchStore'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { PotMode } from '../../pots/RotaryPotWithLedRingBase'
import type { ModuleProps } from '../types'
import '../Modules.scss'

const MixPot = ({
    x,
    y,
    label,
    potMode = 'normal',
    selector,
    mutator,
}: {
    x: number
    y: number
    label: string
    potMode?: PotMode
    selector: (s: VoiceGroupPatch) => number
    mutator: (s: VoiceGroupPatch, v: number) => void
}) => {
    const { displayValue, increment } = usePot(selector, mutator)
    return (
        <RotaryPot12
            ledMode="multi"
            label={label}
            x={x}
            y={y}
            potMode={potMode}
            value={displayValue}
            onValueIncrement={increment}
        />
    )
}

const OutputMixer = ({ x, y, height, width }: ModuleProps) => {
    const center = x + POT_DISTANCE_L / 2
    const topPotY = y + POT_OFFSET_Y

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} className="shared-elements-border" />
            <SubHeader label="Out" x={x} y={y} width={width} labelPosition="center" labelWidth={15} />

            <MixPot
                x={center}
                y={topPotY}
                label="Volume"
                selector={(s) => s.output.volume}
                mutator={(s, v) => {
                    s.output.volume = v
                }}
            />

            <MixPot
                x={center}
                y={topPotY + ROW_HEIGHT}
                label="Headphones"
                selector={(s) => s.output.headphones}
                mutator={(s, v) => {
                    s.output.headphones = v
                }}
            />

            <MixPot
                x={center}
                y={topPotY + ROW_HEIGHT * 2}
                label="Spread"
                potMode="spread"
                selector={(s) => s.output.spread}
                mutator={(s, v) => {
                    s.output.spread = v
                }}
            />

            <ModuleBorder
                x={x}
                y={y + ROW_HEIGHT * 4}
                height={height}
                width={width}
                className="shared-elements-border"
            />
            <SubHeader
                label="FX"
                x={x}
                y={topPotY + ROW_HEIGHT * 4 - POT_OFFSET_Y}
                width={width}
                labelPosition="center"
                labelWidth={15}
            />
            <MixPot
                x={center}
                y={topPotY + ROW_HEIGHT * 4}
                label="DSP 1"
                selector={(s) => s.commonFx.fxMix.levelDsp1}
                mutator={(s, v) => {
                    s.commonFx.fxMix.levelDsp1 = v
                }}
            />

            <MixPot
                x={center}
                y={topPotY + ROW_HEIGHT * 5}
                label="DSP 2"
                selector={(s) => s.commonFx.fxMix.levelDsp2}
                mutator={(s, v) => {
                    s.commonFx.fxMix.levelDsp2 = v
                }}
            />

            <MixPot
                x={center}
                y={topPotY + ROW_HEIGHT * 6}
                label="Chorus"
                selector={(s) => s.commonFx.fxMix.levelChorus}
                mutator={(s, v) => {
                    s.commonFx.fxMix.levelChorus = v
                }}
            />

            <MixPot
                x={center}
                y={topPotY + ROW_HEIGHT * 7}
                label="Bit crusher"
                selector={(s) => s.commonFx.fxMix.levelBitCrusher}
                mutator={(s, v) => {
                    s.commonFx.fxMix.levelBitCrusher = v
                }}
            />
        </>
    )
}

export default OutputMixer

import { POT_DISTANCE_L, POT_OFFSET_Y, ROW_HEIGHT } from '@/constants'
import type { VoiceGroupPatch } from '@/store'
import { usePot } from '@/store'
import postMixControllers from '@/synthcore/modules/postMix/postMixControllers'
import type { PopupConfig } from '@/store/hooks'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { LedMode, PotMode } from '../../pots/RotaryPotWithLedRingBase'
import type { ModuleProps } from '../types'
import '../Modules.scss'

const popup = (paramLabel: string): PopupConfig => ({
    moduleName: 'Post Mix',
    paramLabel,
})

const PostMixPot = ({
    x,
    y,
    label,
    potMode = 'normal',
    ledMode = 'multi',
    ctrlId,
    selector,
    mutator,
    bipolar,
}: {
    x: number
    y: number
    label: string
    potMode?: PotMode
    ledMode?: LedMode
    ctrlId?: number
    selector: (s: VoiceGroupPatch) => number
    mutator: (s: VoiceGroupPatch, v: number) => void
    bipolar?: boolean
}) => {
    const { displayValue, increment } = usePot(selector, mutator, bipolar ? { bipolar: true, popup: popup(label) } : { popup: popup(label) })
    return (
        <RotaryPot12
            label={label}
            x={x}
            y={y}
            potMode={potMode}
            ledMode={ledMode}
            ctrlId={ctrlId}
            value={displayValue}
            onValueIncrement={increment}
        />
    )
}

const PostMix = ({ x, y, height, width }: ModuleProps) => {
    const center = x + POT_DISTANCE_L / 2
    const offsetY = y + POT_OFFSET_Y
    const offsetY2 = offsetY + 4 * ROW_HEIGHT

    return (
        <>
            <ModuleBorder x={x} y={y} height={height / 2} width={width} className="audio-elements-border" />
            <SubHeader label="Voice mix" x={x} y={y} width={width} labelPosition="center" labelWidth={22} />
            <PostMixPot
                x={center}
                y={offsetY}
                label="SVF"
                ctrlId={postMixControllers.SVF.id}
                selector={(s) => s.postMix.svf}
                mutator={(s, v) => {
                    s.postMix.svf = v
                }}
            />
            <PostMixPot
                x={center}
                y={offsetY + ROW_HEIGHT}
                label="LPF"
                ctrlId={postMixControllers.LPF.id}
                selector={(s) => s.postMix.lpf}
                mutator={(s, v) => {
                    s.postMix.lpf = v
                }}
            />
            <PostMixPot
                x={center}
                y={offsetY + ROW_HEIGHT * 2}
                label="Sine 1"
                ctrlId={postMixControllers.SINE1.id}
                selector={(s) => s.postMix.sine1}
                mutator={(s, v) => {
                    s.postMix.sine1 = v
                }}
            />
            <PostMixPot
                x={center}
                y={offsetY + ROW_HEIGHT * 3}
                label="Sine 2"
                ctrlId={postMixControllers.SINE2.id}
                selector={(s) => s.postMix.sine2}
                mutator={(s, v) => {
                    s.postMix.sine2 = v
                }}
            />

            <ModuleBorder
                x={x}
                y={offsetY2 - POT_OFFSET_Y}
                height={height / 2}
                width={width}
                className="audio-elements-border"
            />
            <SubHeader
                label="Voice out"
                x={x}
                y={offsetY2 - POT_OFFSET_Y}
                width={width}
                labelPosition="center"
                labelWidth={22}
            />
            <PostMixPot
                x={center}
                y={offsetY2}
                label="Pan"
                potMode="pan"
                ledMode="single"
                bipolar
                ctrlId={postMixControllers.PAN.id}
                selector={(s) => s.postMix.pan}
                mutator={(s, v) => {
                    s.postMix.pan = v
                }}
            />
            <PostMixPot
                x={center}
                y={offsetY2 + ROW_HEIGHT}
                label="Amt"
                ctrlId={postMixControllers.AMOUNT.id}
                selector={(s) => s.postMix.amount}
                mutator={(s, v) => {
                    s.postMix.amount = v
                }}
            />
            <PostMixPot
                x={center}
                y={offsetY2 + ROW_HEIGHT * 2}
                label="FX1 send"
                ctrlId={postMixControllers.FX1_SEND.id}
                selector={(s) => s.postMix.fx1Send}
                mutator={(s, v) => {
                    s.postMix.fx1Send = v
                }}
            />
            <PostMixPot
                x={center}
                y={offsetY2 + ROW_HEIGHT * 3}
                label="FX2 send"
                ctrlId={postMixControllers.FX2_SEND.id}
                selector={(s) => s.postMix.fx2Send}
                mutator={(s, v) => {
                    s.postMix.fx2Send = v
                }}
            />
        </>
    )
}

export default PostMix

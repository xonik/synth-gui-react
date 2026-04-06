import { useCallback } from 'react'
import { BUTTON_DISTANCE_S, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from '@/constants'
import { buttonMidiValues } from '@/midi/buttonMidiValues'
import { button } from '@/midi/midibus'
import { useButton, usePot, useUiStore } from '@/store'
import { ControllerIdSrc } from '@/synthcore/modules/controllers/controllerIds'
import { timeResponseMapper } from '@/synthcore/modules/common/responseMappers'
import { lfoCtrls } from '@/synthcore/modules/lfo/lfoControllers'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { Random } from '../../images/Random'
import { SawRight } from '../../images/SawRight'
import { Sine } from '../../images/Sine'
import { Square } from '../../images/Square'
import { Triangle } from '../../images/Triangle'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { ModuleProps } from '../types'

const LFO = ({ x, y, height, width }: ModuleProps) => {
    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M
    const col4 = col3 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_M

    const row1 = y + POT_OFFSET_Y
    const row2 = row1 + ROW_HEIGHT

    const lfoId = useUiStore((s) => s.selectedLfoId)
    const selectLfo = useUiStore((s) => s.selectLfo)
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)

    const lfoHwSourceId = ControllerIdSrc.LFO1 + lfoId

    // The LFO selector button is intentionally NOT given hwSourceId — it must never trigger routing.
    const onSelectLfo = useCallback(() => {
        selectLfo((lfoId + 1) % 3)
    }, [lfoId, selectLfo])

    const onTrigger = useCallback(() => {
        button.send(voiceGroupIndex, lfoCtrls.GATE, buttonMidiValues.LFO_TRIGGER)
    }, [voiceGroupIndex])

    const { displayValue: rateValue, increment: rateIncrement } = usePot(
        (s) => s.lfos[lfoId].rate,
        (s, v) => {
            s.lfos[lfoId].rate = v
        },
        { responseMapper: timeResponseMapper }
    )
    const { displayValue: depthValue, increment: depthIncrement } = usePot(
        (s) => s.lfos[lfoId].depth,
        (s, v) => {
            s.lfos[lfoId].depth = v
        }
    )
    const { displayValue: balanceValue, increment: balanceIncrement } = usePot(
        (s) => s.lfos[lfoId].balance,
        (s, v) => {
            s.lfos[lfoId].balance = v
        }
    )
    const { displayValue: delayValue, increment: delayIncrement } = usePot(
        (s) => s.lfos[lfoId].delay,
        (s, v) => {
            s.lfos[lfoId].delay = v
        },
        { responseMapper: timeResponseMapper }
    )
    const { value: shapeValue, toggle: shapeToggle } = useButton(
        (s) => s.lfos[lfoId].shape,
        (s, v) => {
            s.lfos[lfoId].shape = v
        },
        6
    )
    const { value: syncValue, toggle: syncToggle } = useButton(
        (s) => s.lfos[lfoId].sync,
        (s, v) => {
            s.lfos[lfoId].sync = v
        },
        2
    )
    const { value: resetValue, toggle: resetToggle } = useButton(
        (s) => s.lfos[lfoId].reset,
        (s, v) => {
            s.lfos[lfoId].reset = v
        },
        2
    )
    const { value: loopValue, toggle: loopToggle } = useButton(
        (s) => s.lfos[lfoId].loop,
        (s, v) => {
            s.lfos[lfoId].loop = v
        },
        2
    )
    const { value: invertValue, toggle: invertToggle } = useButton(
        (s) => s.lfos[lfoId].invert,
        (s, v) => {
            s.lfos[lfoId].invert = v
        },
        2
    )
    const { value: bipolarValue, toggle: bipolarToggle } = useButton(
        (s) => s.lfos[lfoId].bipolar,
        (s, v) => {
            s.lfos[lfoId].bipolar = v
        },
        2
    )

    return (
        <>
            {/*!SHOW_CUT && <rect x={x} y={y} width={323} height={ROW_HEIGHT * 2- ROW_SPACING} className="module-background"/>*/}
            <ModuleBorder x={x} y={y} height={height} width={width} />
            <SubHeader align="left" label="LFO" labelPosition="center" x={x} y={y} width={width} labelWidth={15} />

            <RoundLedPushButton8
                label="Sync"
                x={col1}
                y={row1}
                labelPosition="bottom-pot"
                value={syncValue}
                hwSourceId={lfoHwSourceId}
                onButtonClick={syncToggle}
            />

            <RoundPushButton8
                x={col1}
                y={row2}
                label="LFO"
                labelPosition="bottom-pot"
                ledPosition="right"
                ledCount={3}
                ledLabels={['1', '2', '3']}
                value={lfoId}
                onButtonClick={onSelectLfo}
            />

            <RotaryPot12
                ledMode="single"
                label="Rate"
                x={col2}
                y={row1}
                value={rateValue}
                hwSourceId={lfoHwSourceId}
                ctrlId={lfoCtrls.RATE.id}
                ctrlIndex={lfoId}
                onValueIncrement={rateIncrement}
            />

            <RotaryPot12
                ledMode="single"
                label="Depth"
                x={col3}
                y={row1}
                value={depthValue}
                hwSourceId={lfoHwSourceId}
                ctrlId={lfoCtrls.DEPTH.id}
                ctrlIndex={lfoId}
                onValueIncrement={depthIncrement}
            />

            <RotaryPot12
                ledMode="single"
                label="Balance"
                x={col4}
                y={row1}
                value={balanceValue}
                hwSourceId={lfoHwSourceId}
                ctrlId={lfoCtrls.BALANCE.id}
                ctrlIndex={lfoId}
                onValueIncrement={balanceIncrement}
            />

            <RotaryPot12
                ledMode="single"
                label="Delay"
                x={col5}
                y={row1}
                value={delayValue}
                hwSourceId={lfoHwSourceId}
                ctrlId={lfoCtrls.DELAY.id}
                ctrlIndex={lfoId}
                onValueIncrement={delayIncrement}
            />

            <RoundLedPushButton8
                label="Bipolar"
                x={col2}
                y={row2}
                labelPosition="bottom-pot"
                value={bipolarValue}
                hwSourceId={lfoHwSourceId}
                onButtonClick={bipolarToggle}
            />

            <RoundLedPushButton8
                label="Invert"
                x={col2 + BUTTON_DISTANCE_S}
                y={row2}
                labelPosition="bottom-pot"
                value={invertValue}
                hwSourceId={lfoHwSourceId}
                onButtonClick={invertToggle}
            />

            <RoundLedPushButton8
                label="Loop"
                x={col2 + BUTTON_DISTANCE_S * 2}
                y={row2}
                labelPosition="bottom-pot"
                value={loopValue}
                hwSourceId={lfoHwSourceId}
                onButtonClick={loopToggle}
            />

            <RoundLedPushButton8
                label="Reset"
                x={col2 + BUTTON_DISTANCE_S * 3}
                y={row2}
                labelPosition="bottom-pot"
                value={resetValue}
                hwSourceId={lfoHwSourceId}
                onButtonClick={resetToggle}
            />

            <RoundPushButton8
                x={col2 + BUTTON_DISTANCE_S * 4}
                y={row2}
                label="Shape"
                labelPosition="bottom-pot"
                ledPosition="right-two-cols"
                ledCount={6}
                ledLabels={[
                    <SawRight key="sr" x={0} y={0} width={3} height={2} />,
                    <Triangle key="tri" x={0} y={0} width={3} height={2} />,
                    <Square key="sq" x={0} y={0} width={3} height={2} />,
                    <Sine key="sin" x={0} y={0} width={3} height={2} />,
                    <Random key="rnd" x={0} y={0} width={3} height={2} />,
                    'Other',
                ]}
                value={shapeValue}
                hwSourceId={lfoHwSourceId}
                onButtonClick={shapeToggle}
            />

            <RoundPushButton8
                label="Trigger"
                x={col2 + BUTTON_DISTANCE_S * 6}
                y={row1}
                labelPosition="bottom-pot"
                hwSourceId={lfoHwSourceId}
                onButtonClick={onTrigger}
            />
        </>
    )
}

export default LFO

import { POT_DISTANCE_L, POT_DISTANCE_M, POT_DISTANCE_S, POT_OFFSET_Y, ROW_HEIGHT } from '@/constants'
import { useGlobalButton, useGlobalPot } from '@/store/hooks'
import arpControllers from '@/synthcore/modules/arp/arpControllers'
import { ControllerIdSrc } from '@/synthcore/modules/controllers/controllerIds'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import { ModuleBorder } from '../../misc/ModuleBorder'
import SubHeader from '../../misc/SubHeader'
import RotaryPot12 from '../../pots/RotaryPot12'
import type { ModuleProps } from '../types'

const Arpeggiator = ({ x, y, height, width }: ModuleProps) => {
    const row1 = y
    const row2 = y + POT_OFFSET_Y
    const row3 = row2 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_M / 2
    const col2 = col1 + POT_DISTANCE_S
    const col3 = col1 + POT_DISTANCE_L

    const arpHwSourceId = ControllerIdSrc.ARP

    const { displayValue: rateValue, increment: rateIncrement } = useGlobalPot(
        (s) => s.arp.bpm,
        (s, v) => {
            s.arp.bpm = v
        }
    )
    const { value: syncValue, toggle: syncToggle } = useGlobalButton(
        (s) => s.arp.sync,
        (s, v) => {
            s.arp.sync = v
        },
        3
    )
    const { value: modeValue, toggle: modeToggle } = useGlobalButton(
        (s) => s.arp.mode,
        (s, v) => {
            s.arp.mode = v
        },
        4
    )
    const { value: rangeValue, toggle: rangeToggle } = useGlobalButton(
        (s) => s.arp.range,
        (s, v) => {
            s.arp.range = v
        },
        3
    )
    const { value: onOffValue, toggle: onOffToggle } = useGlobalButton(
        (s) => s.arp.onOff,
        (s, v) => {
            s.arp.onOff = v
        },
        2
    )
    const { value: sequenceValue, toggle: sequenceToggle } = useGlobalButton(
        (s) => s.arp.sequence,
        (s, v) => {
            s.arp.sequence = v
        },
        2
    )

    return (
        <>
            <ModuleBorder x={x} y={y} height={height} width={width} />
            <SubHeader label="Arp" x={x} y={row1} width={width} labelPosition="center" labelWidth={15} />

            <RotaryPot12
                ledMode="single"
                label="Rate"
                x={col2}
                y={row2}
                value={rateValue}
                hwSourceId={arpHwSourceId}
                ctrlId={arpControllers.BPM.id}
                ctrlIndex={0}
                onValueIncrement={rateIncrement}
            />

            {/* Let sync source be settable from main panel */}
            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col1}
                y={row2}
                label="Sync"
                ledModes={3}
                ctrlId={arpControllers.SYNC.id}
                value={syncValue}
                hwSourceId={arpHwSourceId}
                onButtonClick={syncToggle}
            />

            <RoundPushButton8
                x={col3}
                y={row2}
                label="Mode"
                labelPosition="bottom-pot"
                ledCount={3}
                ledPosition="right"
                ledLabels={['Up', 'Down', 'Random']}
                ledCycleBinary
                ctrlId={arpControllers.MODE.id}
                value={modeValue}
                hwSourceId={arpHwSourceId}
                onButtonClick={modeToggle}
            />

            <RoundPushButton8
                x={col3}
                y={row3}
                label="Range"
                labelPosition="bottom-pot"
                ledCount={3}
                ledPosition="right"
                ledLabels={['1 oct', '2 oct', '3 oct']}
                ctrlId={arpControllers.RANGE.id}
                value={rangeValue}
                hwSourceId={arpHwSourceId}
                onButtonClick={rangeToggle}
            />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col1}
                y={row3}
                label="On"
                ctrlId={arpControllers.ON_OFF.id}
                value={onOffValue}
                hwSourceId={arpHwSourceId}
                onButtonClick={onOffToggle}
            />

            <RoundLedPushButton8
                labelPosition="bottom-pot"
                x={col2}
                y={row3}
                label="Sequence"
                ctrlId={arpControllers.SEQUENCE.id}
                value={sequenceValue}
                hwSourceId={arpHwSourceId}
                onButtonClick={sequenceToggle}
            />
        </>
    )
}

export default Arpeggiator

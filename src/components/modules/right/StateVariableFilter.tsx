import React, { useCallback } from 'react'
import RotaryPot21 from '../../pots/RotaryPot21'
import RotaryPot12 from '../../pots/RotaryPot12'
import RoundPushButton8 from '../../buttons/RoundPushButton8'
import RoundLedPushButton8 from '../../buttons/RoundLedPushButton8'
import RoundRotaryButton17 from '../../buttons/RoundRotaryButton17'
import SubHeader from "../../misc/SubHeader";
import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";
import { HorizontalDividerLine } from "../../misc/HorizontalDividerLine";
import { usePot, useButton } from '../../../store/hooks'
import { VoiceGroupPatch, voiceGroupStores } from '../../../store/patchStore'
import { useUiStore } from '../../../store/uiStore'
import "./StateVariableFilter.scss"
import "../Modules.scss"

const FILTER = 1

const FilterPot = ({ x, y, label, ledMode = 'multi' as const, selector, mutator, Large }: {
    x: number, y: number, label: string, ledMode?: 'single' | 'multi',
    selector: (s: VoiceGroupPatch) => number,
    mutator: (s: VoiceGroupPatch, v: number) => void,
    Large?: boolean,
}) => {
    const { displayValue, increment } = usePot(selector, mutator)
    if (Large) {
        return <RotaryPot21 x={x} y={y} ledMode={ledMode} label={label}
                            value={displayValue} onValueIncrement={increment} />
    }
    return <RotaryPot12 x={x} y={y} ledMode={ledMode} label={label}
                        value={displayValue} onValueIncrement={increment} />
}

const StateVariableFilter = ({ x, y, height, width }: ModuleProps) => {
    const topRow = y + POT_OFFSET_Y
    const fmRow = topRow + 40
    const centerRow = topRow + ROW_HEIGHT
    const bottomRow1 = centerRow + ROW_HEIGHT
    const bottomRow2 = bottomRow1 + ROW_HEIGHT

    const col1 = x + POT_DISTANCE_L / 2;
    const col2 = col1 + POT_DISTANCE_M
    const col3 = col2 + POT_DISTANCE_M / 2
    const col4 = col2 + POT_DISTANCE_M
    const col5 = col4 + POT_DISTANCE_M

    const { value: fmModeValue, toggle: fmModeToggle } = useButton(
        s => s.filters[FILTER].fmMode,
        (s, v) => { s.filters[FILTER].fmMode = v },
        3
    )
    const { value: fmSrcValue, toggle: fmSrcToggle } = useButton(
        s => s.filters[FILTER].fmSrc,
        (s, v) => { s.filters[FILTER].fmSrc = v },
        2
    )
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const slopeValue = useButton(
        s => s.filters[FILTER].slope,
        (s, v) => { s.filters[FILTER].slope = v },
        10
    ).value
    const slopeIncrement = useCallback((delta: number) => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.filters[FILTER].slope
        const next = current + (delta > 0 ? 1 : -1)
        if (next >= 0 && next < 10) {
            store.set(state => { state.filters[FILTER].slope = next })
        }
    }, [voiceGroupIndex])
    const { value: invertValue, toggle: invertToggle } = useButton(
        s => s.filters[FILTER].invert,
        (s, v) => { s.filters[FILTER].invert = v },
        2
    )

    // modes:
    /*
    2p LP
    2p HP
    4P LP
    4p HP
    2p BP
    4p BP
    2p LP + 2p BP
    2p HP + 2p BP
    Notch
    Notch + LP
     */

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} className="audio-elements-border"/>
        <SubHeader label="SVF" x={x} y={y}
                   width={width}
                   labelPosition="center" labelWidth={15}
                   className="svf-header-border"
        />

        <FilterPot x={col3} y={centerRow} ledMode="single" label="Cutoff" Large
                   selector={s => s.filters[FILTER].cutoff}
                   mutator={(s, v) => { s.filters[FILTER].cutoff = v }}
        />

        <FilterPot x={col1} y={topRow} label="In dry/wet"
                   selector={s => s.filters[FILTER].input}
                   mutator={(s, v) => { s.filters[FILTER].input = v }}
        />

        <FilterPot x={col3} y={topRow} label="Resonance"
                   selector={s => s.filters[FILTER].resonance}
                   mutator={(s, v) => { s.filters[FILTER].resonance = v }}
        />

        <FilterPot x={col5} y={topRow} label="FM"
                   selector={s => s.filters[FILTER].fmAmt}
                   mutator={(s, v) => { s.filters[FILTER].fmAmt = v }}
        />


        <RoundPushButton8 x={col1} y={fmRow} ledPosition="top" ledCount={2} ledLabels={['Lin', 'Log']}
                          label="FM mode" labelPosition="bottom"
                          hasOff
                          value={fmModeValue}
                          onButtonClick={fmModeToggle}
        />

        <RoundPushButton8 x={col5} y={fmRow} ledPosition="top" ledCount={2} ledLabels={['2', 'Ext']}
                          label="FM src" labelPosition="bottom"
                          value={fmSrcValue}
                          onButtonClick={fmSrcToggle}
        />

        <RoundRotaryButton17 x={col3} y={bottomRow1}
                             label="Slope" labelPosition="bottom"
                             ledPosition="sides" ledCount={10}
                             ledLabels={[
                                 '12dB LP', '24dB LP', '12dB BP', '24dB BP', 'LP + BP',
                                 '12dB HP', '24dB HP', 'HP + BP', 'Notch', 'AP'
                             ]}
                             resolution={10}
                             value={slopeValue}
                             onIncrement={slopeIncrement}
        />

        <HorizontalDividerLine x={x} y={bottomRow2 - 12.5} width={width}/>

        <FilterPot x={col1} y={bottomRow2} label="Keyboard"
                   selector={s => s.filters[FILTER].kbdAmt}
                   mutator={(s, v) => { s.filters[FILTER].kbdAmt = v }}
        />

        <FilterPot x={col2} y={bottomRow2} label="LFO"
                   selector={s => s.filters[FILTER].lfoAmt}
                   mutator={(s, v) => { s.filters[FILTER].lfoAmt = v }}
        />

        <FilterPot x={col4} y={bottomRow2} label="Wheel"
                   selector={s => s.filters[FILTER].wheelAmt}
                   mutator={(s, v) => { s.filters[FILTER].wheelAmt = v }}
        />

        <FilterPot x={col5} y={bottomRow2} label="Envelope"
                   selector={s => s.filters[FILTER].envAmt}
                   mutator={(s, v) => { s.filters[FILTER].envAmt = v }}
        />

        <RoundLedPushButton8 x={col5} y={bottomRow1 + 5} label="Invert" labelPosition="bottom"
                             value={invertValue}
                             onButtonClick={invertToggle}
        />

    </>
}

export default StateVariableFilter

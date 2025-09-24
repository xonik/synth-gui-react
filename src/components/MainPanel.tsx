import React, { useEffect, useRef, useState } from 'react'
import DCO1 from './modules/DCO1'
import DCO2 from './modules/DCO2'
import VCO from './modules/VCO'
import SourceMixer from './modules/SourceMixer'
import PostMix from './modules/PostMix'
import Noise from './modules/Noise'
import Ringmod from './modules/Ringmod'
import Distortion from './modules/Distortion'
import LowPassFilter from './modules/LowPassFilter'
import StateVariableFilter from './modules/StateVariableFilter'
import Envelope from './modules/Envelope'
import LFO from './modules/LFO'
import DigitalFX from './modules/DigitalFX'
import OutputMixer from './modules/OutputMixer'
import Chorus from './modules/Chorus'
import BitCrusher from './modules/BitCrusher'
import Arpeggiator from './modules/Arpeggiator'
import MainDisplay from './modules/MainDisplay'
import Clock from './modules/Clock'
import BitCrusherPre from './modules/BitCrusherPre'
import Route from './modules/Route'
import KeyboardControls from './modules/KeyboardControls'
import VoiceSelector from './modules/VoiceSelector'
import Controller from '../controller/Controller'
import { useAppSelector } from '../synthcore/hooks'
import { envCtrls } from '../synthcore/modules/env/envControllers'
import { selectController } from '../synthcore/modules/controllers/controllersReducer'
import './MainPanel.scss'
import Grid from "./Grid";
import { PADDING_LEFT, POT_DISTANCE_M, ROW_HEIGHT } from "../constants";
import { PanelScrew } from "./misc/PanelScrew";
import RoundPushButton8 from "./buttons/RoundPushButton8";
import { lfoCtrls } from "../synthcore/modules/lfo/lfoControllers";
import { ControllerGroupIds } from "../synthcore/types";
import { SHOW_CENTER, SHOW_CUT, SHOW_GRID, SHOW_LEFT, SHOW_RIGHT } from "../config";
import classNames from "classnames";

/**
 * TODO:
 * VCO sync sources
 * Cross mod source, hvilke
 * Saw polarity button
 * Env amount for D/VCOs - dette er en felles pot med knapp på A6
 * Lin/log FM? necessary?
 * SEE RESEARCH.md for more
 */
const MainPanel = () => {

    const env3Id = useAppSelector(selectController(envCtrls.SELECT_ENV3_ID))
    const panelHeight = 290;
    const panelWidth = 1000;

    const osc1Col = 71.125
    const osc2Col = osc1Col + 110
    const osc3Col = osc2Col + 110

    const lfoCol = 20
    const noiseCol = 20
    const ringModCol = noiseCol
    const sourceMixCol = noiseCol + 50
    const bcCol = sourceMixCol + 142.5
    const distCol = bcCol

    const routeCol = 20
    const clockCol = routeCol + 55
    const arpCol = routeCol + PADDING_LEFT + 4.25 * POT_DISTANCE_M

    const displayCol = osc3Col + 87.5
    const keyCtrlCol = displayCol - 22
    const voiceSelCol = displayCol

    const filterCol = displayCol + 265
    const voiceMixCol = filterCol + 65

    const envCol = voiceMixCol + 40
    const outFx1Col = envCol
    const outFx2Col = outFx1Col + 130
    const outputMixerCol = envCol + 5

    const oscRow = 15

    const fxRow1 = oscRow + 130
    const fxRow2 = fxRow1 + ROW_HEIGHT
    const sourceMixRow = fxRow1

    const lfo1Row = fxRow2 + ROW_HEIGHT
    const clockRow = lfo1Row + ROW_HEIGHT

    const voiceSelRow = 25
    const displayRow = voiceSelRow + 55
    const keyCtrlRow = displayRow + 220

    const outputFxRow = 175
    const arpRow = clockRow

    const outputMixerRow = outputFxRow + 85

    // Gets the svg placeholder for the display and extracts size and position,
    // this is used to create an overlay div in the same position further down
    // that will act as the real display.
    const [dispRect, setDispRect] = useState<{
        x: number, y: number, width: number, height: number
    }>()
    const displayRef = useRef<SVGRectElement>(null)
    useEffect(() => {
        if (displayRef.current) {
            const bound = displayRef.current.getBoundingClientRect()
            setDispRect({
                x: window.scrollX + bound.left,
                y: window.scrollY + bound.top,
                width: bound.width,
                height: bound.height,
            })
        }
    }, [])


    // PS: 1 inch in svg is 96pixels, so 1cm = 96 / 2.54 = 37.795276px
    // In Illustrator, one inch is 72 pt. 1pt is 0,0352778, so one inch is
    // 72 * 0,0352778
    return (
        <>
            <svg width={`${panelWidth / 10}cm`} height={`${panelHeight / 10}cm`}
                 viewBox={`0 0 ${panelWidth} ${panelHeight}`}
                 className={
                     classNames("panel", {
                         'cut': SHOW_CUT
                     })}>
                {SHOW_GRID && <Grid panelWidth={panelWidth} panelHeight={panelHeight}/>}
                {SHOW_LEFT && <>
                    {SHOW_CUT && <rect x={0} y={0} width="365" height={panelHeight} className="panel-outline"/>}
                    <DCO1 x={osc1Col} y={oscRow}/>
                    <DCO2 x={osc2Col} y={oscRow}/>
                    <VCO x={osc3Col} y={oscRow}/>

                    <Noise x={noiseCol} y={fxRow1}/>
                    <Ringmod x={ringModCol} y={fxRow2}/>
                    <Distortion x={distCol} y={fxRow1}/>
                    <BitCrusherPre x={bcCol} y={fxRow2}/>


                    <SourceMixer x={sourceMixCol} y={sourceMixRow}/>

                    <LFO x={lfoCol} y={lfo1Row}/>

                    <Route x={routeCol} y={clockRow}/>
                    <Clock x={clockCol} y={clockRow}/>
                    <Arpeggiator x={arpCol} y={arpRow}/>

                    <PanelScrew x={10} y={10}/>
                    <PanelScrew x={10} y={145}/>
                    <PanelScrew x={20 + PADDING_LEFT + 5.5 * POT_DISTANCE_M} y={10}/>
                    <PanelScrew x={355} y={10}/>
                    <PanelScrew x={10} y={280}/>
                    <PanelScrew x={20 + PADDING_LEFT + 5.5 * POT_DISTANCE_M} y={280}/>
                    <PanelScrew x={355} y={145}/>
                    <PanelScrew x={355} y={280}/>
                </>}
                {SHOW_CENTER && <>
                    <MainDisplay x={displayCol} y={displayRow} ref={displayRef}/>
                    <VoiceSelector x={voiceSelCol} y={voiceSelRow}/>
                    <KeyboardControls x={keyCtrlCol} y={keyCtrlRow}/>
                </>}
                {SHOW_RIGHT && <>
                    <StateVariableFilter x={filterCol} y={80}/>
                    <LowPassFilter x={filterCol} y={235}/>
                    <PostMix x={voiceMixCol} y={7.5}/>


                    <Envelope header="Envelopes" x={envCol} y={10} label="VCA" envId={0}/>
                    <Envelope x={envCol} y={65} label="VCF" envId={1}/>
                    <Envelope x={envCol} y={120} label="" showSelect={true} envId={env3Id}/>

                    <DigitalFX x={outFx1Col} y={outputFxRow}/>
                    <Chorus x={outFx2Col} y={outputFxRow + 10}/>
                    <BitCrusher x={outFx2Col} y={outputFxRow + 40}/>

                    <OutputMixer x={outputMixerCol} y={outputMixerRow}/>
                </>}
            </svg>
            {!SHOW_CENTER && <>
                {dispRect && <div className="panel-main-display" style={{
                    top: dispRect.y,
                    left: dispRect.x,
                    width: dispRect.width,
                    height: dispRect.height,
                }}>
                    <Controller/>
                </div>}
            </>}
        </>
    )
}

export default MainPanel
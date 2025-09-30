import React, { useEffect, useRef, useState } from 'react'
import DCO1 from './modules/left/DCO1'
import DCO2 from './modules/left/DCO2'
import VCO from './modules/left/VCO'
import SourceMixer from './modules/left/SourceMixer'
import PostMix from './modules/PostMix'
import Noise from './modules/left/Noise'
import Ringmod from './modules/left/Ringmod'
import Distortion from './modules/left/Distortion'
import LowPassFilter from './modules/LowPassFilter'
import StateVariableFilter from './modules/StateVariableFilter'
import Envelope from './modules/Envelope'
import LFO from './modules/left/LFO'
import DigitalFX from './modules/DigitalFX'
import OutputMixer from './modules/OutputMixer'
import Chorus from './modules/Chorus'
import BitCrusher from './modules/BitCrusher'
import Arpeggiator from './modules/left/Arpeggiator'
import MainDisplay from './modules/MainDisplay'
import Clock from './modules/left/Clock'
import BitCrusherPre from './modules/left/BitCrusherPre'
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
import { SHOW_CENTER, SHOW_CUT, SHOW_GRID, SHOW_LEFT, SHOW_LEFT_2, SHOW_RIGHT } from "../config";
import classNames from "classnames";
import { LeftPanel } from "./modules/left/LeftPanel";
import { LeftPanel2 } from "./modules/left2/LeftPanel2";

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

    const displayCol = osc3Col + 87.5
    const keyCtrlCol = displayCol - 22
    const voiceSelCol = displayCol

    const filterCol = displayCol + 265
    const voiceMixCol = filterCol + 65

    const envCol = voiceMixCol + 40
    const outFx1Col = envCol
    const outFx2Col = outFx1Col + 130
    const outputMixerCol = envCol + 190

    const oscRow = 15

    const row5 = oscRow + 130
    const row6 = row5 + ROW_HEIGHT
    const row7 = row6 + ROW_HEIGHT
    const row8 = row7 + ROW_HEIGHT

    const voiceSelRow = 25
    const displayRow = voiceSelRow + 55
    const keyCtrlRow = displayRow + 220

    const outputFxRow = 200
    const chorusRow = row7

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
                {SHOW_LEFT && <LeftPanel panelHeight={panelHeight} oscRow={oscRow}/>}
                {SHOW_LEFT_2 && <LeftPanel2 panelHeight={panelHeight} oscRow={oscRow}/>}
                {SHOW_CENTER && <>
                    <MainDisplay x={displayCol} y={displayRow} ref={displayRef}/>
                    <VoiceSelector x={voiceSelCol} y={voiceSelRow}/>
                    <KeyboardControls x={keyCtrlCol} y={keyCtrlRow}/>
                </>}
                {SHOW_RIGHT && <>
                    <StateVariableFilter x={filterCol} y={oscRow}/>
                    <LowPassFilter x={filterCol} y={oscRow + 130}/>
                    <PostMix x={voiceMixCol} y={oscRow}/>


                    <Envelope header="VCA Env" x={envCol} y={oscRow} label="" envId={0}/>
                    <Envelope header="VCF Env" x={envCol} y={oscRow + ROW_HEIGHT * 2} label="" envId={1}/>
                    <Envelope x={envCol} y={oscRow + ROW_HEIGHT * 4} label="" showSelect={true} envId={env3Id}/>

                    <DigitalFX x={outFx1Col} y={outputFxRow}/>
                    <Chorus x={outFx2Col} y={chorusRow}/>
                    {/*<BitCrusher x={outFx2Col} y={outputFxRow + 40}/>*/}

                    <OutputMixer x={outputMixerCol} y={oscRow}/>
                </>}
            </svg>
            {SHOW_CENTER && <>
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
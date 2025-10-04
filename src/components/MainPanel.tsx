import React, { useEffect, useRef, useState } from 'react'
import DCO1 from './modules/left/DCO1'
import DCO2 from './modules/left/DCO2'
import VCO from './modules/left/VCO'
import SourceMixer from './modules/left/SourceMixer'
import PostMix from './modules/right/PostMix'
import Noise from './modules/left/Noise'
import Ringmod from './modules/left/Ringmod'
import Distortion from './modules/left/Distortion'
import LowPassFilter from './modules/right/LowPassFilter'
import StateVariableFilter from './modules/right/StateVariableFilter'
import Envelope from './modules/right/Envelope'
import LFO from './modules/left/LFO'
import DigitalFX from './modules/right/DigitalFX'
import OutputMixer from './modules/right/OutputMixer'
import Chorus from './modules/right/Chorus'
import BitCrusher from './modules/BitCrusher'
import Arpeggiator from './modules/left/Arpeggiator'
import MainDisplay from './modules/MainDisplay'
import Clock from './modules/left/Clock'
import BitCrusherPre from './modules/left/BitCrusherPre'
import Route from './modules/left/Route'
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
import { RightPanel } from "./modules/right/RightPanel";

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


    const panelHeight = 290;
    const panelWidth = 1000;

    const osc1Col = 71.125
    const osc2Col = osc1Col + 110
    const osc3Col = osc2Col + 110

    const displayCol = osc3Col + 87.5
    const keyCtrlCol = displayCol - 22
    const voiceSelCol = displayCol


    const rows = []
    for (let i = 0; i < 8; i++) {
        rows.push(15 + i * ROW_HEIGHT)
    }

    const voiceSelRow = 25
    const displayRow = voiceSelRow + 55
    const keyCtrlRow = displayRow + 220

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
                {SHOW_LEFT && <LeftPanel panelHeight={panelHeight} topRow={rows[0]}/>}
                {SHOW_LEFT_2 && <LeftPanel2 panelHeight={panelHeight} rows={rows}/>}
                {SHOW_CENTER && <>
                    <MainDisplay x={displayCol} y={displayRow} ref={displayRef}/>
                    <VoiceSelector x={voiceSelCol} y={voiceSelRow}/>
                    <KeyboardControls x={keyCtrlCol} y={keyCtrlRow}/>
                </>}
                {SHOW_RIGHT && <RightPanel displayCol={displayCol} panelHeight={panelHeight} rows={rows}/>}
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
import React, { useEffect, useRef, useState } from 'react'
import MainDisplay from './modules/MainDisplay'
import { Transpose, Keyboard } from './modules/KeyboardControls'
import VoiceSelector from './modules/VoiceSelector'
import Controller from '../controller/Controller'
import './MainPanel.scss'
import Grid from "./Grid";
import { POT_DISTANCE_L, POT_DISTANCE_M, ROW_HEIGHT } from "../constants";
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

    const leftWidth = 3 * POT_DISTANCE_L + POT_DISTANCE_M * 7 + 5
    const leftStart = 20

    const rightWidth = 10 * POT_DISTANCE_M + 3 * POT_DISTANCE_L
    const rightStart = panelWidth - rightWidth - 20

    const transposeWidth = POT_DISTANCE_M * 3
    const keyboardWidth = POT_DISTANCE_M * 5
    const centerWidth = transposeWidth + keyboardWidth

    const displayCol = osc3Col + 87.5
    const keyCtrlCol = displayCol - 22
    const voiceSelCol = displayCol

    const spacing = (rightStart - (leftStart + leftWidth) - centerWidth) / 2
    const centerCol = leftStart + leftWidth + spacing

    const rows = []
    for (let i = 0; i < 8; i++) {
        rows.push(15 + i * ROW_HEIGHT)
    }

    const voiceSelRow = 25
    const displayRow = voiceSelRow + 55
    const keyCtrlRow = displayRow + 180

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
                {SHOW_LEFT_2 && <LeftPanel2 x={leftStart} panelHeight={panelHeight} rows={rows}/>}
                {SHOW_CENTER && <>
                    <MainDisplay x={centerCol} y={rows[0]} height={7 * ROW_HEIGHT} width={8 * POT_DISTANCE_M} ref={displayRef}/>
                    <VoiceSelector x={centerCol} y={voiceSelRow} height={20} width={8 * POT_DISTANCE_M}/>
                    <Transpose x={centerCol} y={rows[7]} height={ROW_HEIGHT} width={transposeWidth}/>
                    <Keyboard x={centerCol + transposeWidth} y={rows[7]} height={ROW_HEIGHT} width={keyboardWidth}/>
                </>}
                {SHOW_RIGHT && <RightPanel x={rightStart} rows={rows}/>}
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
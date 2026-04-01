import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { SHOW_CENTER, SHOW_CUT, SHOW_GRID, SHOW_LEFT_2, SHOW_RIGHT } from '@/config'
import { POT_DISTANCE_L, POT_DISTANCE_M, ROW_HEIGHT } from '@/constants'
import Controller from '../controller/Controller'
import Grid from './Grid'
import { PanelScrew } from './misc/PanelScrew'
import { Keyboard, Transpose } from './modules/KeyboardControls'
import { LeftPanel } from './modules/left/LeftPanel'
import MainDisplay from './modules/MainDisplay'
import { RightPanel } from './modules/right/RightPanel'
import VoiceSelector from './modules/VoiceSelector'
import './MainPanel.scss'

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
    const panelHeight = 290
    const panelWidth = 1000

    const leftWidth = 3 * POT_DISTANCE_L + POT_DISTANCE_M * 7 + 5
    const leftStart = 20

    const rightWidth = 10 * POT_DISTANCE_M + 3 * POT_DISTANCE_L
    const rightStart = panelWidth - rightWidth - 20

    const transposeWidth = POT_DISTANCE_M * 3
    const keyboardWidth = POT_DISTANCE_M * 5
    const centerWidth = transposeWidth + keyboardWidth

    const spacing = (rightStart - (leftStart + leftWidth) - centerWidth) / 2
    const centerCol = leftStart + leftWidth + spacing

    const rows = []
    for (let i = 0; i < 8; i++) {
        rows.push(15 + i * ROW_HEIGHT)
    }

    const voiceSelRow = 25

    // Gets the svg placeholder for the display and extracts size and position,
    // this is used to create an overlay div in the same position further down
    // that will act as the real display.
    const [dispRect, setDispRect] = useState<{
        x: number
        y: number
        width: number
        height: number
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

    const screwCol1 = 10
    const screwCol3 = leftStart + leftWidth + spacing / 2
    const screwCol2 = screwCol1 + (screwCol3 - screwCol1) / 2

    const screwCol4 = rightStart - spacing / 2
    const screwCol6 = panelWidth - 10
    const screwCol5 = screwCol4 + (screwCol6 - screwCol4) / 2

    const extraScrewCol1 = screwCol3 + 15
    const extraScrewCol2 = screwCol4 - 15
    const extraScrewCol3 = screwCol4 + 149

    const screwRow1 = 10
    const screwRow2 = 145
    const screwRow3 = 280

    // PS: 1 inch in svg is 96pixels, so 1cm = 96 / 2.54 = 37.795276px
    // In Illustrator, one inch is 72 pt. 1pt is 0,0352778, so one inch is
    // 72 * 0,0352778
    return (
        <>
            <svg
                width={`${panelWidth / 10}cm`}
                height={`${panelHeight / 10}cm`}
                viewBox={`0 0 ${panelWidth} ${panelHeight}`}
                className={classNames('panel', {
                    cut: SHOW_CUT,
                })}
            >
                {SHOW_GRID && <Grid panelWidth={panelWidth} panelHeight={panelHeight} />}
                {SHOW_LEFT_2 && <LeftPanel x={leftStart} panelHeight={panelHeight} rows={rows} />}
                {SHOW_CENTER && (
                    <>
                        {SHOW_CUT && (
                            <rect
                                x={centerCol}
                                y={0}
                                width={8 * POT_DISTANCE_M}
                                height={panelHeight}
                                className="panel-outline"
                            />
                        )}
                        <MainDisplay
                            x={centerCol}
                            y={rows[0]}
                            height={7 * ROW_HEIGHT}
                            width={8 * POT_DISTANCE_M}
                            panelHeight={panelHeight}
                            ref={displayRef}
                        />
                        <VoiceSelector x={centerCol} y={voiceSelRow} height={20} width={8 * POT_DISTANCE_M} />
                        <Transpose x={centerCol} y={rows[7]} height={ROW_HEIGHT} width={transposeWidth} />
                        <Keyboard
                            x={centerCol + transposeWidth}
                            y={rows[7]}
                            height={ROW_HEIGHT}
                            width={keyboardWidth}
                        />
                    </>
                )}
                {SHOW_RIGHT && <RightPanel x={rightStart} panelHeight={panelHeight} rows={rows} />}

                {/* Left screws */}
                <PanelScrew x={screwCol1} y={screwRow1} />
                <PanelScrew x={screwCol1} y={screwRow2} />
                <PanelScrew x={screwCol1} y={screwRow3} />
                <PanelScrew x={screwCol2} y={screwRow1} />
                <PanelScrew x={screwCol2} y={screwRow3} />
                <PanelScrew x={screwCol3} y={screwRow1} />
                <PanelScrew x={screwCol3} y={screwRow2} />
                <PanelScrew x={screwCol3} y={screwRow3} />

                {/* Right screws */}
                <PanelScrew x={screwCol4} y={screwRow1} />
                <PanelScrew x={screwCol4} y={screwRow2} />
                <PanelScrew x={screwCol4} y={screwRow3} />
                <PanelScrew x={screwCol5} y={screwRow1} />
                <PanelScrew x={screwCol5} y={screwRow3} />
                <PanelScrew x={screwCol6} y={screwRow1} />
                <PanelScrew x={screwCol6} y={screwRow2} />
                <PanelScrew x={screwCol6} y={screwRow3} />

                {/* Extra screws for mockup */}
                <PanelScrew x={extraScrewCol1} y={screwRow1} />
                <PanelScrew x={extraScrewCol1} y={screwRow3} />
                <PanelScrew x={extraScrewCol2} y={screwRow1} />
                <PanelScrew x={extraScrewCol2} y={screwRow3} />
                <PanelScrew x={extraScrewCol3} y={screwRow1} />
                <PanelScrew x={extraScrewCol3} y={screwRow3} />
            </svg>
            {SHOW_CENTER && !SHOW_CUT && dispRect && (
                <div
                    className="panel-main-display"
                    style={{
                        top: dispRect.y,
                        left: dispRect.x,
                        width: dispRect.width,
                        height: dispRect.height,
                    }}
                >
                    <Controller />
                </div>
            )}
        </>
    )
}

export default MainPanel

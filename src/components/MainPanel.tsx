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
    const panelHeight = 300;
    const panelWidth = 1000;

    const osc1Col = 70
    const osc2Col = osc1Col + 115
    const osc3Col = osc2Col + 115

    const lfoCol = 20
    const noiseCol = 20
    const ringModCol = noiseCol
    const sourceMixCol = noiseCol + 45
    const bcCol = sourceMixCol + 155
    const distCol = bcCol

    const routeCol = 20
    const clockCol = routeCol + 56
    const arpCol = clockCol + 84

    const displayCol = osc3Col + 80
    const keyCtrlCol = displayCol - 22
    const voiceSelCol = displayCol

    const filterCol = displayCol + 265
    const voiceMixCol = filterCol + 65

    const envCol = voiceMixCol + 40
    const outFx1Col = envCol
    const outFx2Col = outFx1Col + 130
    const outputMixerCol = envCol + 5

    const oscRow = 65

    const fxRow1 = oscRow + 82
    const fxRow2 = fxRow1 + 35
    const sourceMixRow = fxRow1

    const lfo1Row = fxRow2 + 40
    const clockRow = lfo1Row + 42

    const voiceSelRow = 12
    const displayRow = voiceSelRow + 58
    const keyCtrlRow = displayRow + 233

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


    // PS: 1 inch in svg is 96pixels, so 1cm = 96 / 2.54
    return (
        <>
            <svg width={`${panelWidth/10}cm`} height={`${panelHeight/10}cm`} viewBox={`0 0 ${panelWidth} ${panelHeight}`} className="panel">

                <Grid panelWidth={panelWidth} panelHeight={panelHeight}/>

                <DCO1 x={osc1Col} y={oscRow}/>
                <DCO2 x={osc2Col} y={oscRow}/>
                <VCO x={osc3Col} y={oscRow}/>

                <Noise x={noiseCol} y={fxRow1}/>
                <Ringmod x={ringModCol} y={fxRow2}/>
                <BitCrusherPre x={bcCol} y={fxRow2}/>
                <Distortion x={distCol} y={fxRow1}/>


                <SourceMixer x={sourceMixCol} y={sourceMixRow}/>

                <LFO x={lfoCol} y={lfo1Row}/>

                <Route x={routeCol} y={clockRow}/>
                <Clock x={clockCol} y={clockRow}/>
                <Arpeggiator x={arpCol} y={arpRow}/>

                <VoiceSelector x={voiceSelCol} y={voiceSelRow}/>
                <MainDisplay x={displayCol} y={displayRow} ref={displayRef}/>
                <KeyboardControls x={keyCtrlCol} y={keyCtrlRow}/>

                <StateVariableFilter x={filterCol} y={80}/>
                <LowPassFilter x={filterCol} y={235}/>
                <PostMix x={voiceMixCol} y={8}/>


                <Envelope header="Envelopes" x={envCol} y={10} label="VCA" envId={0}/>
                <Envelope x={envCol} y={65} label="VCF" envId={1}/>
                <Envelope x={envCol} y={120} label="" showSelect={true} envId={env3Id}/>

                <DigitalFX x={outFx1Col} y={outputFxRow}/>
                <Chorus x={outFx2Col} y={outputFxRow + 10}/>
                <BitCrusher x={outFx2Col} y={outputFxRow + 40}/>

                <OutputMixer x={outputMixerCol} y={outputMixerRow}/>
            </svg>
            {dispRect && <div className="panel-main-display" style={{
                top: dispRect.y,
                left: dispRect.x,
                width: dispRect.width,
                height: dispRect.height,
            }}>
                <Controller/>
            </div>}
        </>
    )
}

export default MainPanel
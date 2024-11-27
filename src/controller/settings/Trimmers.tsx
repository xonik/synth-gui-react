import React, { useCallback, useState } from 'react'
import ReactSlider from 'react-slider'
import {saveCvMapping, saveCvMappings, saveTrimmerSettings, setCvParams, setTrimmerSetting} from '../../midi/rpc/api'
import CvResponseCurve from './CvResponseCurve'
import { CV_CHANNELS, CVs } from './CvDefinitions'
import { curveNames } from '../../components/curves/shortCurveNames'
import { curveValuesUsed } from './generatedTypes'
import './CvRange.scss'
import '../lfos/StagesCurve.scss'
import '../lfos/Stages.scss'

import { Curve } from '../../synthcore/generatedTypes'

type SelectorProps = {
    setValue: (trimmer: number, value: number) => void,
    trimmer: number,
    allSettings: TrimmerSetting[],
}

const TRIMMER_COUNT = 7

const VerticalSelector = ({ setValue, allSettings, trimmer }: SelectorProps) => {

    return <ReactSlider
        className="horizontal-slider cv-range__graph-controls__range"
        thumbClassName="cv-range__thumb"
        trackClassName="example-track"
        orientation="vertical"
        max={65535}
        min={0}
        invert
        value={allSettings[trimmer].value}
        onChange={(value) => setValue(trimmer, value)}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
}


type TrimmerSetting = {
    trimmer: number,
    value: number,
}

function getInitialTrimmerSettings() {
    const trimmerSettings: TrimmerSetting[] = []
    for (let i = 0; i < CV_CHANNELS; i++) {
        trimmerSettings.push({
            trimmer: i,
            value: 0,
        })
    }
    return trimmerSettings
}

const initialTrimmerSettings = getInitialTrimmerSettings()

const TRIMMER_SETTINGS_KEY = 'trimmer_settings'
const saveToLocalStorage = (trimmerSettings: TrimmerSetting[]) => localStorage.setItem(TRIMMER_SETTINGS_KEY, JSON.stringify(trimmerSettings))
const loadFromLocalStorage = () => {
    const persisted = localStorage.getItem(TRIMMER_SETTINGS_KEY)
    if (!persisted) {
        return initialTrimmerSettings
    }
    try {
        return JSON.parse(persisted) as TrimmerSetting[]
    } catch {
        return initialTrimmerSettings
    }
}

function mutate(trimmerSettings: TrimmerSetting[], trimmer: number, changes: Partial<TrimmerSetting>) {
    const trimmerSetting = trimmerSettings[trimmer]
    const updatedTrimmerSetting = {
        ...trimmerSetting,
        ...changes
    }
    const updatedTrimmerSettings = [
        ...trimmerSettings
    ]
    updatedTrimmerSettings[trimmer] = updatedTrimmerSetting
    return updatedTrimmerSettings
}

function send(trimmerSetting: TrimmerSetting) {
    const { trimmer, value } = trimmerSetting
    setTrimmerSetting(trimmer, value)
}

const Trimmers = () => {

    console.log('render')
    const [allTrimmerSettings, setAllTrimmerSettings] = useState<TrimmerSetting[]>(loadFromLocalStorage())
    const [isSaved, setIsSaved] = useState<boolean>(true)

    const sendTrimmerSetting = (trimmerSetting: TrimmerSetting) => {
        console.log(trimmerSetting)
        setTrimmerSetting(trimmerSetting.trimmer, trimmerSetting.value)
    }

    const onSave = useCallback(() => {
        saveToLocalStorage(allTrimmerSettings)
        setIsSaved(true)
        saveTrimmerSettings()
    }, [allTrimmerSettings, setIsSaved])

    const onLoadAll = useCallback(() => {
        const persistedTrimmers = loadFromLocalStorage()
        for(let i=0; i<TRIMMER_COUNT; i++){
            send(persistedTrimmers[i])
        }
        setAllTrimmerSettings(persistedTrimmers)
    }, [])

    const updateValue = useCallback((trimmer: number, value: number) => {
        const updatedAllCvs = mutate(allTrimmerSettings, trimmer, { value })
        setAllTrimmerSettings(updatedAllCvs)
        setIsSaved(false)
        sendTrimmerSetting(updatedAllCvs[trimmer])
    }, [allTrimmerSettings, setIsSaved])


    return <div className="cv-range">
        <div className="cv-range__graph-controls">
            <VerticalSelector setValue={updateValue} allSettings={allTrimmerSettings} trimmer={0}/>
            <VerticalSelector setValue={updateValue} allSettings={allTrimmerSettings} trimmer={1}/>
            <VerticalSelector setValue={updateValue} allSettings={allTrimmerSettings} trimmer={2}/>
            <VerticalSelector setValue={updateValue} allSettings={allTrimmerSettings} trimmer={3}/>
            <VerticalSelector setValue={updateValue} allSettings={allTrimmerSettings} trimmer={4}/>
            <VerticalSelector setValue={updateValue} allSettings={allTrimmerSettings} trimmer={5}/>
            <VerticalSelector setValue={updateValue} allSettings={allTrimmerSettings} trimmer={6}/>
        </div>
        <div className="cv-range__params">
            <button disabled={isSaved} onClick={onSave}>Save</button>
            <button onClick={onLoadAll}>Load/reset all</button>
        </div>
    </div>
}

export default Trimmers
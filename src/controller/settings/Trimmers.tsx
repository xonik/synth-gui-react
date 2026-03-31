import { useCallback, useState } from 'react'
import ReactSlider from 'react-slider'
import { saveTrimmerSettings, setTrimmerSetting, VOICE_ALL } from '../../midi/rpc/api'
import { CV_CHANNELS } from './CvDefinitions'
import { sharedConfig } from "../../sharedConfig";

type SelectorProps = {
    setValue: (trimmer: number, value: number) => void,
    trimmer: number,
    allSettings: TrimmerSetting[],
    label: string,
}

const TRIMMER_COUNT = 8

const VerticalSelector = ({ setValue, allSettings, trimmer, label }: SelectorProps) => {

    return <div className="cv-range__slider-with-label"><ReactSlider
        className="horizontal-slider cv-range__graph-controls__range"
        thumbClassName="cv-range__thumb"
        trackClassName="example-track"
        orientation="vertical"
        max={65535}
        min={0}
        invert
        value={allSettings[trimmer].value}
        onChange={(value) => setValue(trimmer, value)}
        renderThumb={(props, state) => <div {...props}>{(5 * state.valueNow / 65535).toFixed(2)} V</div>}
    />
        <div className="cv-range__slider-label">{label}</div>
    </div>
}


type TrimmerSetting = {
    trimmer: number,
    value: number,
}

function getInitialTrimmerSettings() {
    const trimmerSettings: TrimmerSetting[] = [];
    for (let i = 0; i < CV_CHANNELS; i++) {
        trimmerSettings.push({ trimmer: i, value: 0 });
    }
    return trimmerSettings;
}

function getInitialAllTrimmerSettings() {
    return Array.from({ length: sharedConfig.VOICE_COUNT.value }, getInitialTrimmerSettings);
}

const TRIMMER_SETTINGS_KEY = 'all_trimmer_settings';
const saveToLocalStorage = (allTrimmerSettings: TrimmerSetting[][]) =>
    localStorage.setItem(TRIMMER_SETTINGS_KEY, JSON.stringify(allTrimmerSettings));
const loadFromLocalStorage = () => {
    const persisted = localStorage.getItem(TRIMMER_SETTINGS_KEY);
    if (!persisted) return getInitialAllTrimmerSettings();
    try {
        return JSON.parse(persisted) as TrimmerSetting[][];
    } catch {
        return getInitialAllTrimmerSettings();
    }
};

function send(voice: number, trimmerSetting: TrimmerSetting) {
    const { trimmer, value } = trimmerSetting
    console.log(voice, trimmer, value)
    setTrimmerSetting(trimmer, value, voice)
}

export const Trimmers = ({ voice }: Props) => {

    console.log('render')
    const [allTrimmerSettings, setAllTrimmerSettings] = useState<TrimmerSetting[][]>(loadFromLocalStorage());

    const [isSaved, setIsSaved] = useState<boolean>(true)

    const onSave = useCallback(() => {
        saveToLocalStorage(allTrimmerSettings)
        setIsSaved(true)
        saveTrimmerSettings()
    }, [allTrimmerSettings, setIsSaved])

    const onLoadAll = useCallback(() => {
        const persisted = loadFromLocalStorage();
        setAllTrimmerSettings(persisted);
        for(let i=0; i<TRIMMER_COUNT; i++){
            if(voice === VOICE_ALL){
                send(voice, persisted[0][i])
            } else {
                send(voice, persisted[voice][i])
            }
        }
    }, []);

    const updateValue = useCallback((trimmer: number, value: number) => {
        setAllTrimmerSettings(prev => {
            let updated = prev.map(arr => arr.map(obj => ({ ...obj }))); // deep copy
            if (voice === VOICE_ALL) {
                for (let v = 0; v < sharedConfig.VOICE_COUNT.value; v++) {
                    updated[v][trimmer].value = value;
                }
                send(voice, updated[0][trimmer])
            } else {
                updated[voice][trimmer].value = value;
                send(voice, updated[voice][trimmer])
            }
            setIsSaved(false);
            // Optionally send to hardware for each voice
            return updated;
        });
    }, [voice]);

    // Use current voice's settings for rendering
    const currentSettings = voice === VOICE_ALL ? allTrimmerSettings[0] : allTrimmerSettings[voice];

    return <div className="cv-range">
        <div className="cv-range__graph-controls">
            <VerticalSelector label="A Sym" setValue={updateValue} allSettings={currentSettings} trimmer={0}/>
            <VerticalSelector label="A Cent" setValue={updateValue} allSettings={currentSettings} trimmer={1}/>
            <VerticalSelector label="B Sym" setValue={updateValue} allSettings={currentSettings} trimmer={2}/>
            <VerticalSelector label="B Cent" setValue={updateValue} allSettings={currentSettings} trimmer={3}/>
            <VerticalSelector label="4P" setValue={updateValue} allSettings={currentSettings} trimmer={4}/>
            <VerticalSelector label="Reso" setValue={updateValue} allSettings={currentSettings} trimmer={5}/>
            <VerticalSelector label="2P" setValue={updateValue} allSettings={currentSettings} trimmer={6}/>
            <VerticalSelector label="Calibrate" setValue={updateValue} allSettings={currentSettings} trimmer={7}/>
        </div>
        <div className="cv-range__params">
            <button disabled={isSaved} onClick={onSave}>Save</button>
            <button onClick={onLoadAll}>Load/reset all</button>
        </div>
    </div>
}

type Props = { voice: number };

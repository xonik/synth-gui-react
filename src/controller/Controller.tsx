import { ScreenId, useUiStore } from '@/store'
import { DisplayButtons } from './components/DisplayButtons'
import Env from './envelopes/Env'
import LFO from './lfos/LFO'
import Mod from './mods/Mod'
import PatchBrowser from './patches/PatchBrowser'
import Settings from './settings/Settings'
import './Controller.scss'

const Controller = () => {
    const currScreen = useUiStore((s) => s.currentScreen)
    return (
        <>
            <div className="controller-buttons">
                <DisplayButtons />
            </div>
            <div className="controller-grid">
                {currScreen === ScreenId.LFO && <LFO />}
                {currScreen === ScreenId.ENV && <Env />}
                {currScreen === ScreenId.MOD && <Mod />}
                {currScreen === ScreenId.SETTINGS && <Settings />}
                {currScreen === ScreenId.LOAD && <PatchBrowser mode="load" />}
                {currScreen === ScreenId.SAVE && <PatchBrowser mode="save" />}
            </div>
        </>
    )
}

export default Controller

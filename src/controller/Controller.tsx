import React from 'react'
import { useAppSelector } from '../synthcore/hooks'
import { selectCurrScreen } from '../synthcore/modules/mainDisplay/mainDisplayReducer'
import { MainDisplayScreenId } from '../synthcore/modules/mainDisplay/types'
import Mod from './mods/Mod'
import Env from './envelopes/Env'
import LFO from './lfos/LFO'
import Settings from './settings/Settings'
import PatchBrowser from './patches/PatchBrowser'
import './Controller.scss'

const Controller = () => {

    const currScreen = useAppSelector(selectCurrScreen)
    return <div className="controller-grid">
        {
            currScreen === MainDisplayScreenId.LFO && <LFO/>
        }
        {
            currScreen === MainDisplayScreenId.ENV && <Env/>
        }
        {
            currScreen === MainDisplayScreenId.MOD && <Mod/>
        }
        {
            currScreen === MainDisplayScreenId.SETTINGS && <Settings/>
        }
        {
            currScreen === MainDisplayScreenId.LOAD && <PatchBrowser mode="load"/>
        }
        {
            currScreen === MainDisplayScreenId.SAVE && <PatchBrowser mode="save"/>
        }
    </div>
}

export default Controller
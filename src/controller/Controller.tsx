import React from 'react'
import { useAppSelector } from '../synthcore/hooks'
import { selectCurrScreen } from '../synthcore/modules/mainDisplay/mainDisplayReducer'
import { MainDisplayScreenId } from '../synthcore/modules/mainDisplay/types'
import Mod from './mods/Mod'
import Env from './envelopes/Env'
import './Controller.scss'

const Controller = () => {

    const currScreen = useAppSelector(selectCurrScreen)
    return <div className="controller-grid">
        {
            currScreen === MainDisplayScreenId.ENV && <Env/>
        }
        {
            currScreen === MainDisplayScreenId.MOD && <Mod/>
        }
    </div>
}

export default Controller
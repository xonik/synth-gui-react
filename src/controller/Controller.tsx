import React from 'react'
import EnvelopeControl from './envelopes/EnvelopeControl'
import EnvPotLabels from './envelopes/EnvPotLabels'
import ModControl from './mods/ModControl'
import ModPotLabels from './mods/ModPotLabels'
import ModHeader from './mods/ModHeader'
import { useAppSelector } from '../synthcore/hooks'
import { selectCurrScreen } from '../synthcore/modules/mainDisplay/mainDisplayReducer'
import { MainDisplayScreenId } from '../synthcore/modules/mainDisplay/types'
import './Controller.scss'

const Controller = () => {

    const currScreen = useAppSelector(selectCurrScreen)
    return <div className="controller-grid">
        {
            currScreen === MainDisplayScreenId.ENV && <>
              <EnvelopeControl/>
              <EnvPotLabels/>
            </>
        }
        {
            currScreen === MainDisplayScreenId.MOD && <>
              <ModHeader/>
              <ModControl/>
              <ModPotLabels/>
            </>
        }
    </div>
}

export default Controller
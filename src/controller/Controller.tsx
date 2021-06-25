import React from 'react'
import EnvelopeControl from './envelopes/EnvelopeControl'
import EnvPotLabels from './envelopes/EnvPotLabels'
import './Controller.scss'

const Controller = () => {
    return <div className="controller-grid">
        <EnvelopeControl/>
        <EnvPotLabels/>
    </div>
}

export default Controller
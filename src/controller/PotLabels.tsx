import React from 'react'
import './PotLabels.scss'

type Props = {
    labels: string[]
}

const PotLabels = ({ labels }: Props) => {

    return <div className="pot-labels">
        {labels.map((label, index) => <div key={index} className="pot-labels__label">{label}</div>)}
    </div>
}

export default PotLabels
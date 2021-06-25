import React from 'react'
import './PotLabels.scss'

type Props = {
    labels: string[]
}

export default ({ labels }: Props) => {

    return <div className="pot-labels">
        {labels.map((label) => <div className="pot-labels__label">{label}</div>)}
    </div>
}
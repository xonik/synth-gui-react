import React from 'react'
import './AmountBar.scss'

interface Props {
    amtPercentage: number
}

const AmountBar = ({amtPercentage}: Props) => {

    const negAmtWidth = amtPercentage < 0 ? `${-amtPercentage}%` : '0'
    const posAmtWidth = amtPercentage > 0 ? `${amtPercentage}%` : '0'

    return <div className="amount-bar">
        <div className="amount-bar__left">
            <div className="amount-bar__neg" style={{width: negAmtWidth}}/>
        </div>
        <div className="amount-bar__right">
            <div className="amount-bar__pos" style={{width: posAmtWidth}}/>
        </div>
    </div>
}

export default AmountBar
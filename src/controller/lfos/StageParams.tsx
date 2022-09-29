import React from 'react'
import { Stage, StageId } from '../../synthcore/modules/lfo/types'
import classNames from 'classnames'
import { useAppSelector } from '../../synthcore/hooks'
import { selectController, selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import './StageParams.scss'

interface Props {
    className?: string
    lfoId: number
}

// TODO: FIX
const formatTime = (time: number) => {
    const timeMillis = Math.floor(65534 * time) + 1
    if (timeMillis < 500) {
        return `${timeMillis}ms`
    } else if (timeMillis < 20000) {
        return `${Math.floor(timeMillis / 10) / 100}s`
    } else {
        const seconds = Math.floor(timeMillis / 1000)
        return `${seconds}s`
    }
}

// TODO: make time calculator elsewhere
const getTime = (stage: Stage, time: number, balance: number, decayEnabled: boolean) => {
    if (stage.id === StageId.DELAY) {
        return stage.time || 0
    } else if (stage.id === StageId.ATTACK) {
        return decayEnabled ? time * balance : time * 2
    } else if (stage.id === StageId.DECAY) {
        return decayEnabled ? time * (1 - balance) : 0
    }
    return 0
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageParams = ({ lfoId, className }: Props) => {

    const stages = useAppSelector(selectLfoStages(lfoId))
    const time = useAppSelector(selectController(lfoCtrls.RATE, lfoId))
    const balance = useAppSelector(selectController(lfoCtrls.BALANCE, lfoId))

    const decay = stages.find((stage) => stage.id === StageId.ATTACK);

    return <div className={classNames('stage-params', className)}>
        {stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
            return <div className="lfo-ctrl__footer" key={stage.id}>
                <div
                    className={classNames('lfo-ctrl__footer__item')}>{formatTime(getTime(stage, time, balance, !!decay?.enabled))}</div>
            </div>
        })}
    </div>
}

export default StageParams
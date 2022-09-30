import React from 'react'
import { LoopMode, Stage, StageId } from '../../synthcore/modules/lfo/types'
import classNames from 'classnames'
import { useAppSelector } from '../../synthcore/hooks'
import { selectController, selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import './LfoParams.scss'

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

const formatRate = (time: number) => {
    return `${1 / time}Hz`;
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
const LfoParams = ({ lfoId, className }: Props) => {

    const stages = useAppSelector(selectLfoStages(lfoId))
    const loopOn = useAppSelector(selectController(lfoCtrls.LOOP, lfoId)) === 1

    const time = useAppSelector(selectController(lfoCtrls.RATE, lfoId))
    let timeFormatted = loopOn ? `Time: ${formatTime(time)}` : `Rate: ${formatRate(time)}`

    const balance = useAppSelector(selectController(lfoCtrls.BALANCE, lfoId))
    const levelOffset = useAppSelector(selectController(lfoCtrls.LEVEL_OFFSET, lfoId))
    const phaseOffset = useAppSelector(selectController(lfoCtrls.PHASE_OFFSET, lfoId))
    const depth = useAppSelector(selectController(lfoCtrls.DEPTH, lfoId))

    const decay = stages[StageId.DECAY];
    const delayTime = stages[StageId.DELAY].time
    const attackTime = getTime(stages[StageId.ATTACK], time, balance, !!decay.enabled)
    const decayTime = getTime(stages[StageId.DECAY], time, balance, !!decay.enabled)

    const attackBalance = Math.round(balance * 100)
    const decayBalance = Math.round((1 - balance) * 100)

    return <div className={classNames('lfo-params', className)}>
        <div className="lfo-ctrl__footer">
            <div className="lfo-ctrl__footer__item">
                Level: {Math.floor(depth*1000 / 10)}<br/>
                {timeFormatted}
            </div>
            <div className="lfo-ctrl__footer__item">
                Delay time: {formatTime(delayTime || 0)}<br/>
                Delay level:
            </div>
            <div className="lfo-ctrl__footer__item">
                Balance: A: {attackBalance}, D: {decayBalance}<br/>
                Time: A: {formatTime(attackTime)}, D: {formatTime(decayTime)}
            </div>
            <div className="lfo-ctrl__footer__item">
                Offset: {levelOffset}<br/>
                Phase: {phaseOffset}
            </div>
        </div>
    </div>
}

export default LfoParams
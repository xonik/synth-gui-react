import React from 'react'
import { LoopMode, Stage, StageId } from '../../synthcore/modules/lfo/types'
import classNames from 'classnames'
import { useAppSelector } from '../../synthcore/hooks'
import { selectController, selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import './LfoParams.scss'
import { curveNames } from './utils'

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
        return `${Math.floor(timeMillis / 100) / 10}s`
    } else {
        const seconds = Math.floor(timeMillis / 1000)
        return `${seconds}s`
    }
}

const formatRate = (time: number) => {
    return `${Math.floor(100 / time) / 100}Hz`;
}

// TODO: make time calculator elsewhere
const getTime = (stage: Stage, time: number, balance: number, decayEnabled: boolean) => {
    if (stage.id === StageId.DELAY) {
        return stage.time || 0
    } else if (stage.id === StageId.ATTACK) {
        return decayEnabled ? 2 * time * balance : time * 2
    } else if (stage.id === StageId.DECAY) {
        return decayEnabled ? 2 * time * (1 - balance) : 0
    }
    return 0
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const LfoParams = ({ lfoId, className }: Props) => {

    const stages = useAppSelector(selectLfoStages(lfoId))
    const loopOn = useAppSelector(selectController(lfoCtrls.LOOP, lfoId)) === 1

    const time = useAppSelector(selectController(lfoCtrls.RATE, lfoId))
    let timeFormatted = loopOn ? formatRate(time) : formatTime(time)
    let timeLabelFormatted = loopOn ? 'Rate:' : 'Time:'

    const balance = useAppSelector(selectController(lfoCtrls.BALANCE, lfoId))
    const levelOffset = useAppSelector(selectController(lfoCtrls.LEVEL_OFFSET, lfoId))
    const phaseOffset = useAppSelector(selectController(lfoCtrls.PHASE_OFFSET, lfoId))
    const depth = useAppSelector(selectController(lfoCtrls.DEPTH, lfoId))

    const delay = stages[StageId.DELAY];
    const attack = stages[StageId.ATTACK];
    const decay = stages[StageId.DECAY];

    const delayLevel = 0; // TODO
    const attackTime = getTime(attack, time, balance, !!decay.enabled)
    const decayTime = getTime(decay, time, balance, !!decay.enabled)

    const attackCurve = curveNames[attack.curve]
    const decayCurve = decay.enabled ? curveNames[decay.curve] : '-'

    const attackBalance = Math.round(balance * 100)
    const decayBalance = Math.round((1 - balance) * 100)

    return <div className={classNames('lfo-params', className)}>
        <div className="lfo-params__footer__item">
            <div className="lfo-params__footer__item--labels">
                <div>Level:</div>
                <div>{timeLabelFormatted}</div>
            </div>
            <div className="lfo-params__footer__item--values">
                <div>{Math.floor(depth * 1000 / 10)}</div>
                <div>{timeFormatted}</div>
            </div>
        </div>

        <div className="lfo-params__footer__item">
            <div className="lfo-params__footer__item--labels">
                <div>Offset:</div>
                <div>Phase:</div>
            </div>
            <div className="lfo-params__footer__item--values">
                <div>{Math.round(100 * levelOffset)}</div>
                <div>{Math.round(100 * phaseOffset)}</div>
            </div>
        </div>

        <div className="lfo-params__footer__item">
            <div className="lfo-params__footer__item--labels">
                <div>D time:</div>
                <div>D level:</div>
            </div>
            <div className="lfo-params__footer__item--values">
                <div>{delay.enabled ? formatTime(delay.time || 0) : '-'}</div>
                <div>{delay.enabled ? delayLevel : '-'}</div>
            </div>
        </div>

        <div className="lfo-params__footer__item">
            <div className="lfo-params__footer__item--labels">
                <div>A:</div>
                <div>D:</div>
            </div>
            <div className="lfo-params__footer__item--values">
                <div>{attackCurve}</div>
                <div>{decay.enabled ? decayCurve : ''}</div>
            </div>
            <div className="lfo-params__footer__item--values">
                <div>{decay.enabled ? attackBalance : '100'}%</div>
                <div>{decay.enabled ? `${decayBalance}%` : ''}</div>
            </div>
            <div className="lfo-params__footer__item--values">
                <div>({formatTime(attackTime)})</div>
                <div>{decay.enabled ? `(${formatTime(decayTime)})` : ''}</div>
            </div>
        </div>
    </div>
}

export default LfoParams
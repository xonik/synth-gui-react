import React from 'react'
import { Stage, StageId } from '../../synthcore/modules/lfo/types'
import classNames from 'classnames'
import { useAppSelector } from '../../synthcore/hooks'
import { selectLfoStages } from '../../synthcore/modules/controllers/controllersReducer'
import './StageParams.scss'

interface Props {
    className?: string
    lfoId: number
}

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

const formatLevel = (stage: Stage) => Math.round(stage.level * 1000) / 10

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const StageParams = ({ lfoId, className }: Props) => {

    const stages = useAppSelector(selectLfoStages(lfoId))

    return <div className={classNames('stage-params', className)}>
        {stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
            return <div className="lfo-ctrl__footer" key={stage.id}>
                <div className={classNames('lfo-ctrl__footer__item')}>{formatTime(stage.time)}</div>
                <div className={classNames('lfo-ctrl__footer__item')}>{formatLevel(stage)}</div>
            </div>
        })}
    </div>
}

export default StageParams
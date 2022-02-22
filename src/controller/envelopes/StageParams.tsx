import React from 'react'
import { Stage, StageId } from '../../synthcore/modules/env/types'
import './StageParams.scss'
import classNames from 'classnames'
import { useAppSelector } from '../../synthcore/hooks'
import { selectStages } from '../../synthcore/modules/env/envReducer'

interface Props {
    className?: string
    envId: number
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
const StageParams = ({ envId, className }: Props) => {

    const stages = useAppSelector(selectStages(envId))

    return <div className={classNames('stage-params', className)}>
        {stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
            const {id} = stage
            const levelHidden = id !== StageId.DECAY2 && id !== StageId.SUSTAIN && id !== StageId.RELEASE2;
            const timeHidden = id === StageId.SUSTAIN;
            return <div className="env-ctrl__footer" key={stage.id}>
                <div className={classNames('env-ctrl__footer__item', {'env-ctrl__footer__item--hidden': timeHidden})}>{formatTime(stage.time)}</div>
                <div className={classNames('env-ctrl__footer__item', {'env-ctrl__footer__item--hidden': levelHidden})}>{formatLevel(stage)}</div>
            </div>
        })}
    </div>
}

export default StageParams
import React from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import classNames from 'classnames'
import { useEnvStages, DisplayStage } from '../../store/modules/useEnvelope'
import { Params } from '../components/Params'
import './StageParams.scss'

interface Props {
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

const formatLevel = (stage: DisplayStage) => Math.round(stage.level * 1000) / 10

const StageParams = ({ envId }: Props) => {

    const stages = useEnvStages(envId)

    return <Params>
        {stages.filter((stage) => stage.enabled && stage.id !== StageId.STOPPED).map((stage) => {
            const {id} = stage
            const levelHidden = id !== StageId.DECAY2 && id !== StageId.SUSTAIN && id !== StageId.RELEASE2;
            const timeHidden = id === StageId.SUSTAIN;
            return <div className="stage-params__item" key={stage.id}>
                <div className={classNames('stage-params__item__value', {'stage-params__item__value--hidden': timeHidden})}>{formatTime(stage.time)}</div>
                <div className={classNames('stage-params__item__value', {'stage-params__item__value--hidden': levelHidden})}>{formatLevel(stage)}</div>
            </div>
        })}
    </Params>
}

export default StageParams

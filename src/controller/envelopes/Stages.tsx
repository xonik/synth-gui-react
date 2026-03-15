import React, { useCallback } from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import EnvCurve from './EnvCurve'
import {
    selectCurrStageId,
    toggleStageSelected,
} from '../../synthcore/modules/env/envReducer'
import { useAppDispatch, useAppSelector } from '../../synthcore/hooks'
import classNames from 'classnames'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'
import { StageBackground } from './curveCalculator'
import { Point } from '../../utils/types'
import '../components/Stages.scss'

interface Props {
    envId: number
    points: Point[]
    stageBackgrounds: StageBackground[]
}

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Stages = ({ envId, points, stageBackgrounds }: Props) => {

    const bipolar = useAppSelector(selectController(envCtrls.BIPOLAR, envId))
    const dispatch = useAppDispatch()
    const currStageId = useAppSelector(selectCurrStageId)
    const graphCenter = bipolar ? 1 / 2 : 1

    const onSvgClicked = useCallback((stageId: number) => {
        dispatch(toggleStageSelected({ voiceGroupIndex: -1, env: envId, stage: stageId }))
    }, [envId, dispatch])

    return <svg x={0} y={0}>
        {
            bipolar && <line
                x1={0} y1={graphCenter}
                x2={1} y2={graphCenter}
                className={'stages-center-line'}
            />
        }
        {
            stageBackgrounds.map(({ from, to, id }, index) => {
                const isLast = index === stageBackgrounds.length - 1
                return <React.Fragment key={`stage${index}`}>
                    <rect x={from} y={0} width={to - from} height={1} onClick={() => onSvgClicked(id)}
                          className={classNames('stages-background', { 'stages-background--selected': currStageId === id })}
                    />
                    <line
                        x1={from} y1={0}
                        x2={from} y2={1}
                        className={'stages-divider'}
                    />
                    {isLast && <line
                        x1={to} y1={0}
                        x2={to} y2={1}
                        className={'stages-divider'}
                    />}
                </React.Fragment>
            })
        }
        <EnvCurve points={points}/>
    </svg>
}

export default Stages
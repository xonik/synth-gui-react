import classNames from 'classnames'
import { Fragment, useCallback } from 'react'
import { useUiStore } from '../../store'
import { useEnvParam } from '../../store/modules/useEnvelope'
import { StageId } from '@/synthcore/modules/env/types'
import type { Point } from '../../utils/types'
import type { StageBackground } from './curveCalculator'
import EnvCurve from './EnvCurve'
import '../components/Stages.scss'

interface Props {
    envId: number
    points: Point[]
    stageBackgrounds: StageBackground[]
}

const Stages = ({ envId, points, stageBackgrounds }: Props) => {
    const bipolar = useEnvParam(envId, 'bipolar') === 1
    const currStageId = useUiStore((s) => s.selectedEnvStageId)
    const selectEnvStage = useUiStore((s) => s.selectEnvStage)
    const graphCenter = bipolar ? 1 / 2 : 1

    const onSvgClicked = useCallback(
        (stageId: StageId) => {
            if (currStageId === stageId) {
                selectEnvStage(StageId.STOPPED)
            } else {
                selectEnvStage(stageId)
            }
        },
        [currStageId, selectEnvStage]
    )

    return (
        <svg x={0} y={0}>
            {bipolar && <line x1={0} y1={graphCenter} x2={1} y2={graphCenter} className={'stages-center-line'} />}
            {stageBackgrounds.map(({ from, to, id }, index) => {
                const isLast = index === stageBackgrounds.length - 1
                return (
                    <Fragment key={`stage${id}`}>
                        <rect
                            x={from}
                            y={0}
                            width={to - from}
                            height={1}
                            onClick={() => onSvgClicked(id)}
                            className={classNames('stages-background', {
                                'stages-background--selected': currStageId === id,
                            })}
                        />
                        <line x1={from} y1={0} x2={from} y2={1} className={'stages-divider'} />
                        {isLast && <line x1={to} y1={0} x2={to} y2={1} className={'stages-divider'} />}
                    </Fragment>
                )
            })}
            <EnvCurve points={points} />
        </svg>
    )
}

export default Stages

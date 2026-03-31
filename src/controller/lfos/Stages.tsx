import { useCallback, Fragment } from 'react'
import StagesCurve from './StagesCurve'
import { useUiStore } from '../../store/uiStore'
import classNames from 'classnames'
import { StageBackground } from './curveCalculator'
import { Point } from '../../utils/types'
import '../components/Stages.scss'

interface Props {
    points: Point[]
    stageBackgrounds: StageBackground[]
}

const Stages = ({ stageBackgrounds, points }: Props) => {

    const currStageId = useUiStore(s => s.selectedLfoStageId)
    const selectLfoStage = useUiStore(s => s.selectLfoStage)

    const onSvgClicked = useCallback((stageId: number) => {
        selectLfoStage(stageId)
    }, [selectLfoStage])

    return <svg x={0} y={0}>
        {
            <line
                x1={0} y1={0.5}
                x2={1} y2={0.5}
                className={'stages-center-line'}
            />
        }
        {
            stageBackgrounds.map(({ from, to, id }, index) => {
                const isLast = index === stageBackgrounds.length - 1
                return <Fragment key={`stage${index}`}>
                    <>
                        <rect x={from} y={0} width={to - from} height={1} onClick={() => onSvgClicked(id)}
                              className={classNames('stages-background', { 'stages-background--selected': currStageId === id })}

                        />
                        <line
                            x1={from} y1={0}
                            x2={from} y2={1}
                            className={'stages-divider'}
                        />
                    </>
                    {isLast && <line
                        x1={to} y1={0}
                        x2={to} y2={1}
                        className={'stages-divider'}
                    />}
                </Fragment>
            })
        }

        <StagesCurve points={points}/>
    </svg>
}

export default Stages

import React, { useCallback } from 'react'
import StagesCurve from './StagesCurve'
import { selectCurrGuiStageId, toggleStageSelected } from '../../synthcore/modules/lfo/lfoReducer'
import classNames from 'classnames'
import { dispatch } from '../../synthcore/utils'
import { StageBackground } from './curveCalculator'
import { Point } from '../../utils/types'
import { useAppSelector } from '../../synthcore/hooks'
import './Stages.scss'

interface Props {
    lfoId: number
    points: Point[]
    stageBackgrounds: StageBackground[]
}

/*

Info:
-----
Level:  50%   Delay: 0    Bal:  A: 20 D: 80   Offset: -20%
Freq: 500Hz   D lev: 23   Tim   A: 3s D: 7s   Phase:   100


Pots:
-----
1) LFO
2) Freq / delay time
3) Level / Offset,
4) Balance / Phase
5) Curve / Loops

Eller ha seks params og ha separat curve/loops

For ENV: ekstra pot for offset etter
 */


const Stages = ({ lfoId, stageBackgrounds, points }: Props) => {

    const currStageId = useAppSelector(selectCurrGuiStageId);

    const onSvgClicked = useCallback((stageId: number) => {
        dispatch(toggleStageSelected({ voiceGroupIndex: -1, lfo: lfoId, stage: stageId }))
    }, [lfoId])


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
                return <React.Fragment key={`stage${index}`}>
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
                </React.Fragment>
            })
        }

        <StagesCurve points={points}/>
    </svg>
}

export default Stages
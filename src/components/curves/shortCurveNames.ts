import { Curve } from '../../synthcore/generatedTypes'
import { ControllerConfig } from '../../midi/types'

export const getCurveName = (ctrl: ControllerConfig, curveIndex: number) => {
    const curve: Curve = ctrl.values?.[curveIndex] || 0
    return curveNames[curve]
}

export const curveNames = {
    [Curve.COSINE]: 'Cosine',
    [Curve.EXP_3]: 'Exp 3',
    [Curve.EXP_2]: 'Exp 2',
    [Curve.EXP_1]: 'Exp 1',
    [Curve.LIN]: 'Linear',
    [Curve.LOG_1]: 'Log 1',
    [Curve.LOG_2]: 'Log 2',
    [Curve.LOG_3]: 'Log 3',
    [Curve.LFO_SQUARE]: 'Square',
    [Curve.LFO_RANDOM]: 'Random',
}

export const getShortName = (ctrl: ControllerConfig, curveIndex: number) => {
    const curve: Curve = ctrl.values?.[curveIndex] || 0
    return shortCurveNames[curve]
}

export const shortCurveNames = {
    [Curve.COSINE]: 'Cos',
    [Curve.EXP_3]: 'Exp 3',
    [Curve.EXP_2]: 'Exp 2',
    [Curve.EXP_1]: 'Exp 1',
    [Curve.LIN]: 'Lin',
    [Curve.LOG_1]: 'Log 1',
    [Curve.LOG_2]: 'Log 2',
    [Curve.LOG_3]: 'Log 3',
    [Curve.LFO_SQUARE]: 'Sqr',
    [Curve.LFO_RANDOM]: 'Rnd',
}
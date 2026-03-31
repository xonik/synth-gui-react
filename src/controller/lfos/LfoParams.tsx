import { StageId } from '../../synthcore/modules/lfo/types'
import { useUiStore } from '../../store/uiStore'
import { useVoiceGroupStore } from '../../store/patchStore'
import { lfoCtrls } from '../../synthcore/modules/lfo/lfoControllers'
import { LFO_SEC_PER_UNIT } from '../../utils/constants'
import { getShortName } from '../../components/curves/shortCurveNames'
import { Params } from '../components/Params'
import './LfoParams.scss'

interface Props {
    lfoId: number
    delayLevel: number
}

const formatTime = (time: number) => {
    const unitsPerPeriod = time * 65535 + 1
    const secondsPerPeriod = unitsPerPeriod * LFO_SEC_PER_UNIT

    if (secondsPerPeriod < 0.50) {
        return `${Math.round(secondsPerPeriod * 1000)}ms`
    } else if (secondsPerPeriod < 20) {
        return `${Math.round(10 * secondsPerPeriod) / 10}s`
    } else {
        const seconds = Math.round(secondsPerPeriod)
        return `${seconds}s`
    }
}

const formatRate = (time: number) => {
    const unitsPerPeriod = time * 65535 + 1
    const secondsPerPeriod = unitsPerPeriod * LFO_SEC_PER_UNIT
    const frequency = 1 / secondsPerPeriod
    if(frequency < 0.05) {
        return `${Math.floor(1000 / secondsPerPeriod) / 1000}Hz`;
    } else if(frequency < 0.5){
        return `${Math.floor(100 / secondsPerPeriod) / 100}Hz`;
    } else {
        return `${Math.floor(10 / secondsPerPeriod) / 10}Hz`;
    }
}

const getTime = (stageId: StageId, _enabled: boolean, time: number, balance: number, releaseEnabled: boolean) => {
    if (stageId === StageId.DELAY) {
        return 0
    } else if (stageId === StageId.ATTACK) {
        return releaseEnabled ? time * balance : time
    } else if (stageId === StageId.RELEASE) {
        return releaseEnabled ? time * (1 - balance) : 0
    }
    return 0
}

const LfoParams = ({ lfoId, delayLevel }: Props) => {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const lfo = useVoiceGroupStore(voiceGroupIndex, s => s.lfos[lfoId])

    const loopOn = lfo.loop === 1
    const time = lfo.rate
    let timeFormatted = loopOn ? formatRate(time) : formatTime(time)
    let timeLabelFormatted = loopOn ? 'Freq:' : 'Time:'

    const balance = lfo.balance
    const levelOffset = lfo.levelOffset
    const phaseOffset = lfo.phaseOffset
    const depth = lfo.depth

    const delayStage = lfo.stages.delay
    const attackStage = lfo.stages.attack
    const releaseStage = lfo.stages.release

    const delayEnabled = delayStage.enabled === 1
    const releaseEnabled = releaseStage.enabled === 1

    const boundedDelayLevel = Math.round((delayLevel < -1 ? -1 : delayLevel > 1 ? 1 : delayLevel) * 100)

    const delayTime = lfo.delay
    const attackTime = getTime(StageId.ATTACK, true, time, balance, releaseEnabled)
    const releaseTime = getTime(StageId.RELEASE, releaseEnabled, time, balance, releaseEnabled)

    const attackCurveName = getShortName(lfoCtrls.CURVE, attackStage.curve)
    const releaseCurveName = releaseEnabled ? getShortName(lfoCtrls.CURVE, releaseStage.curve) : '-'

    const attackBalance = Math.round(balance * 100)
    const releaseBalance = Math.round((1 - balance) * 100)

    return <Params>
        <div className="lfo-params__item">
            <div className="lfo-params__item--labels">
                <div>{timeLabelFormatted}</div>
                <div>Level:</div>
            </div>
            <div className="lfo-params__item--values--time">
                <div>{timeFormatted}</div>
                <div>{Math.floor(depth * 1000 / 10)}</div>
            </div>
        </div>

        <div className="lfo-params__item">
            <div className="lfo-params__item--labels">
                <div>Offset:</div>
                <div>Phase:</div>
            </div>
            <div className="lfo-params__item--values--offset">
                <div>{Math.round(100 * levelOffset)}</div>
                <div>{Math.round(100 * phaseOffset)}</div>
            </div>
        </div>

        <div className="lfo-params__item">
            <div className="lfo-params__item--labels">
                <div>Delay time:</div>
                <div>Delay level:</div>
            </div>
            <div className="lfo-params__item--values--time">
                <div>{delayEnabled ? formatTime(delayTime || 0) : '-'}</div>
                <div>{delayEnabled ? boundedDelayLevel : '-'}</div>
            </div>
        </div>

        <div className="lfo-params__item">
            <div className="lfo-params__item--labels">
                <div>A:</div>
                <div>R:</div>
            </div>
            <div className="lfo-params__item--values--curve">
                <div>{attackCurveName}</div>
                <div>{releaseEnabled ? releaseCurveName : ''}</div>
            </div>
            <div className="lfo-params__item--values--stage-percentage">
                <div>{releaseEnabled ? attackBalance : '100'}%</div>
                <div>{releaseEnabled ? `${releaseBalance}%` : ''}</div>
            </div>
            <div className="lfo-params__item--values--stage-time">
                <div>({formatTime(attackTime)})</div>
                <div>{releaseEnabled ? `(${formatTime(releaseTime)})` : ''}</div>
            </div>
        </div>
    </Params>
}

export default LfoParams

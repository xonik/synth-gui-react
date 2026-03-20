import { useUiStore } from '../../../store/uiStore'
import { voiceGroupStores } from '../../../store/patchStore'
import { setStageTime, setStageLevel, setStageCurve, setMaxLoops, StageName, STAGE_NAMES } from '../../../store/modules/envActions'
import { LoopMode, StageId } from './types'
import { step } from '../../utils'
import mainDisplayControllers from '../mainDisplay/mainDisplayControllers'
import { timeResponseMapper, dbLevelResponseMapper } from '../common/responseMappers'
import { envCtrls } from './envControllers'

export const mainDisplayEnvPotResolutions = {
    [mainDisplayControllers.POT1.id]: 8,
    [mainDisplayControllers.POT2.id]: 1000,
    [mainDisplayControllers.POT3.id]: 1000,
    [mainDisplayControllers.POT4.id]: 8,
    [mainDisplayControllers.POT5.id]: 100,
    [mainDisplayControllers.POT6.id]: 32,
    [mainDisplayControllers.POT7.id]: 1000,
}

const STAGE_ID_TO_NAME: Record<number, StageName> = {
    [StageId.DELAY]: 'delay',
    [StageId.ATTACK]: 'attack',
    [StageId.DECAY1]: 'decay1',
    [StageId.DECAY2]: 'decay2',
    [StageId.SUSTAIN]: 'sustain',
    [StageId.RELEASE1]: 'release1',
    [StageId.RELEASE2]: 'release2',
    [StageId.STOPPED]: 'stopped',
}

function getBounded(value: number, min: number, max: number): number {
    if (value > max) return max
    if (value < min) return min
    return value
}

export const mainDisplayEnvApi = {
    handleMainDisplayController: (voiceGroupIndex: number, ctrlId: number, increment: number) => {
        const uiState = useUiStore.getState()
        const envId = uiState.selectedEnvId
        const stageId = uiState.selectedEnvStageId
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const stageName = STAGE_ID_TO_NAME[stageId]

        if (ctrlId === mainDisplayControllers.POT1.id) {
            const numEnvelopes = store.envelopes.length
            const newEnvId = getBounded(envId + step(increment), 0, numEnvelopes - 1)
            useUiStore.getState().selectEnv(newEnvId)

        } else if (ctrlId === mainDisplayControllers.POT2.id) {
            if (stageId !== StageId.STOPPED && stageName) {
                const currentTime = store.envelopes[envId].stages[stageName].time
                const currentDisplay = timeResponseMapper.input(currentTime)
                const newDisplay = getBounded(currentDisplay + increment, 0, 1)
                const newRaw = timeResponseMapper.output(newDisplay)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    setStageTime(state, envId, stageName, newRaw)
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT3.id) {
            if (stageId !== StageId.STOPPED && stageName) {
                const env = store.envelopes[envId]
                const bipolar = env.bipolar === 1
                const currentLevel = env.stages[stageName].level
                const currentDisplay = dbLevelResponseMapper.input(currentLevel, bipolar)
                const newDisplay = getBounded(currentDisplay + increment, bipolar ? -1 : 0, 1)
                const newRaw = dbLevelResponseMapper.output(newDisplay, bipolar)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    setStageLevel(state, envId, stageName, newRaw)
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT4.id) {
            if (stageId !== StageId.STOPPED && stageName) {
                const currentCurve = store.envelopes[envId].stages[stageName].curve
                const numCurves = envCtrls.CURVE.values?.length || 8
                const newCurve = getBounded(currentCurve + step(increment), 0, numCurves - 1)
                voiceGroupStores[voiceGroupIndex].getState().set(state => {
                    setStageCurve(state, envId, stageName, newCurve, numCurves)
                })
            }

        } else if (ctrlId === mainDisplayControllers.POT5.id) {
            const currentOffset = store.envelopes[envId].offset
            const newOffset = getBounded(currentOffset + increment, -1, 1)
            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                state.envelopes[envId].offset = newOffset
            })

        } else if (ctrlId === mainDisplayControllers.POT6.id) {
            const loopMode = store.envelopes[envId].loopMode
            if (loopMode !== LoopMode.COUNTED) {
                return
            }
            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                setMaxLoops(state, envId, store.envelopes[envId].maxLoops + step(increment))
            })
        }
    }
}

/**
 * Temporary sync layer: Zustand → Redux
 *
 * Subscribes to Zustand voice group stores and writes envelope changes
 * back into the Redux controllers state, so that the display/touch UI
 * (which still reads from Redux) stays in sync.
 *
 * This is a migration bridge — remove it once the display components
 * are migrated to Zustand.
 */

import { voiceGroupStores, EnvelopeState } from '../patchStore'
import { store as reduxStore } from '../../synthcore/store'
import { setController } from '../../synthcore/modules/controllers/controllersReducer'
import { envCtrls } from '../../synthcore/modules/env/envControllers'
import { StageId, NUMBER_OF_ENVELOPES } from '../../synthcore/modules/env/types'
import { StageName, STAGE_NAMES } from '../modules/envActions'
import { dbLevelResponseMapper, timeResponseMapper } from '../../synthcore/modules/common/responseMappers'

const STAGE_NAME_TO_ID: Record<StageName, StageId> = {
    delay: StageId.DELAY,
    attack: StageId.ATTACK,
    decay1: StageId.DECAY1,
    decay2: StageId.DECAY2,
    sustain: StageId.SUSTAIN,
    release1: StageId.RELEASE1,
    release2: StageId.RELEASE2,
}


function syncSingleEnvelopeToRedux(voiceGroupIndex: number, envId: number, env: EnvelopeState) {
    for (const stageName of STAGE_NAMES) {
        const stageId = STAGE_NAME_TO_ID[stageName]
        const stage = env.stages[stageName]

        reduxStore.dispatch(setController({
            ctrl: envCtrls.TIME,
            ctrlIndex: envId,
            valueIndex: stageId,
            value: stage.time,
            uiValue: timeResponseMapper.input(stage.time),
            voiceGroupIndex,
        }))

        reduxStore.dispatch(setController({
            ctrl: envCtrls.LEVEL,
            ctrlIndex: envId,
            valueIndex: stageId,
            value: stage.level,
            uiValue: dbLevelResponseMapper.input(stage.level, env.bipolar === 1),
            voiceGroupIndex,
        }))

        reduxStore.dispatch(setController({
            ctrl: envCtrls.CURVE,
            ctrlIndex: envId,
            valueIndex: stageId,
            value: stage.curve,
            voiceGroupIndex,
        }))

        reduxStore.dispatch(setController({
            ctrl: envCtrls.TOGGLE_STAGE,
            ctrlIndex: envId,
            valueIndex: stageId,
            value: stage.enabled,
            voiceGroupIndex,
        }))
    }

    reduxStore.dispatch(setController({ ctrl: envCtrls.INVERT, ctrlIndex: envId, value: env.invert, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.BIPOLAR, ctrlIndex: envId, value: env.bipolar, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.LOOP, ctrlIndex: envId, value: env.loop, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.LOOP_MODE, ctrlIndex: envId, value: env.loopMode, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.MAX_LOOPS, ctrlIndex: envId, value: env.maxLoops, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.VELOCITY, ctrlIndex: envId, value: env.velocity, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.RESET_ON_TRIGGER, ctrlIndex: envId, value: env.resetOnTrigger, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.RELEASE_MODE, ctrlIndex: envId, value: env.releaseMode, voiceGroupIndex }))
    reduxStore.dispatch(setController({ ctrl: envCtrls.OFFSET, ctrlIndex: envId, value: env.offset, voiceGroupIndex }))
}

let unsubscribers: (() => void)[] = []

/**
 * Start syncing Zustand envelope state to Redux.
 * Only syncs envelopes that actually changed (immer reference equality).
 * Call once at app startup.
 */
export function startEnvelopeSync() {
    stopEnvelopeSync()

    voiceGroupStores.forEach((store, voiceGroupIndex) => {
        let previousEnvelopes = store.getState().envelopes

        const unsub = store.subscribe((state) => {
            if (state.envelopes !== previousEnvelopes) {
                const prev = previousEnvelopes
                previousEnvelopes = state.envelopes

                for (let envId = 0; envId < Math.min(state.envelopes.length, NUMBER_OF_ENVELOPES); envId++) {
                    if (state.envelopes[envId] !== prev[envId]) {
                        syncSingleEnvelopeToRedux(voiceGroupIndex, envId, state.envelopes[envId])
                    }
                }
            }
        })

        unsubscribers.push(unsub)
    })
}

/**
 * Stop syncing. Call on cleanup.
 */
export function stopEnvelopeSync() {
    unsubscribers.forEach(unsub => unsub())
    unsubscribers = []
}

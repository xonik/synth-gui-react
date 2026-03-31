import { useCallback } from 'react'
import { LoopMode } from '../../synthcore/modules/lfo/types'
import Button from '../components/Button'
import { useUiStore } from '../../store/uiStore'
import { voiceGroupStores, useVoiceGroupStore } from '../../store/patchStore'
import { loopModeNames } from './utils'
import { CtrlOptions } from '../components/CtrlOptions'

interface Props {
    lfoId: number
}

const NUM_LOOP_MODES = Object.keys(LoopMode).length / 2

const getLoopLabel = (loopMode: LoopMode, loops: number) => `Loop ${loopMode === LoopMode.COUNTED ? loops + ' ' : ''} ${loopModeNames[loopMode]}`

const LfoOptionsRight = ({ lfoId }: Props) => {
    const voiceGroupIndex = useUiStore(s => s.currentVoiceGroupIndex)
    const lfo = useVoiceGroupStore(voiceGroupIndex, s => s.lfos[lfoId])

    const toggleLoop = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.lfos[lfoId].loop
        store.set(state => { state.lfos[lfoId].loop = current ? 0 : 1 })
    }, [voiceGroupIndex, lfoId])

    const cycleLoopMode = useCallback(() => {
        const store = voiceGroupStores[voiceGroupIndex].getState()
        const current = store.lfos[lfoId].loopMode
        store.set(state => { state.lfos[lfoId].loopMode = (current + 1) % NUM_LOOP_MODES })
    }, [voiceGroupIndex, lfoId])

    return <CtrlOptions heading={"Looping"} separator>
        <Button active={!!lfo.loop} onClick={toggleLoop}>
            Loop
        </Button>
        <Button active={!!lfo.loop} onClick={cycleLoopMode}>
            {getLoopLabel(lfo.loopMode, lfo.maxLoops)}
        </Button>
    </CtrlOptions>
}

export default LfoOptionsRight

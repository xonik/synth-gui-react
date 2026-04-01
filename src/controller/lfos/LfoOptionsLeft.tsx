import { useCallback } from 'react'
import { useUiStore, useVoiceGroupStore, voiceGroupStores } from '@/store'
import Button from '../components/Button'
import { CtrlOptions } from '../components/CtrlOptions'

interface Props {
    lfoId: number
}

const LfoOptionsLeft = ({ lfoId }: Props) => {
    const voiceGroupIndex = useUiStore((s) => s.currentVoiceGroupIndex)
    const lfo = useVoiceGroupStore(voiceGroupIndex, (s) => s.lfos[lfoId])

    const toggle = useCallback(
        (field: string) => {
            const store = voiceGroupStores[voiceGroupIndex].getState()
            const current = (store.lfos[lfoId] as any)[field]
            store.set((state) => {
                ;(state.lfos[lfoId] as any)[field] = current ? 0 : 1
            })
        },
        [voiceGroupIndex, lfoId]
    )

    return (
        <CtrlOptions>
            <Button active={!!lfo.invert} onClick={() => toggle('invert')}>
                Invert
            </Button>
            <Button active={!!lfo.bipolar} onClick={() => toggle('bipolar')}>
                Bipolar
            </Button>
            <Button active={!!lfo.randomPhase} onClick={() => toggle('randomPhase')}>
                Random phase
            </Button>
            <Button active={!!lfo.resetOnTrigger} onClick={() => toggle('resetOnTrigger')}>
                Retrigger
            </Button>
            <Button active={!!lfo.syncToClock} onClick={() => toggle('syncToClock')}>
                Sync to clock
            </Button>
            <Button active={!!lfo.resetLevelOnClock} onClick={() => toggle('resetLevelOnClock')}>
                Reset on clock
            </Button>
            <Button active={!!lfo.resetOnStop} onClick={() => toggle('resetOnStop')}>
                Reset on stop
            </Button>
        </CtrlOptions>
    )
}

export default LfoOptionsLeft

import { voiceGroupStores } from '../patchStore'
import { button } from '../../midi/midibus'
import noiseControllers from '../../synthcore/modules/noise/noiseControllers'
import ringModControllers from '../../synthcore/modules/ringMod/ringModControllers'
import { withMidiReceive } from './midiGuard'
import { ControllerConfigButton } from '../../midi/types'

function subscribeButton(
    ctrl: ControllerConfigButton,
    mutator: (state: any, value: number) => void,
) {
    const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
        const value = ctrl.values.indexOf(midiValue)
        if (value < 0) return

        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set(state => {
                mutator(state, value)
            })
        })
    }, ctrl)
    return () => button.unsubscribe(ctrl, id)
}

let unsubscribers: (() => void)[] = []

export function startSimpleButtonMidiReceive() {
    stopSimpleButtonMidiReceive()

    unsubscribers.push(
        subscribeButton(
            noiseControllers.COLOUR,
            (state, value) => { state.noise.colour = value }
        ),
        subscribeButton(
            ringModControllers.SOURCE,
            (state, value) => { state.ringMod.source = value }
        ),
    )
}

export function stopSimpleButtonMidiReceive() {
    unsubscribers.forEach(unsub => unsub())
    unsubscribers = []
}

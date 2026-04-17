import { button, cc, nrpn } from '@/midi/midibus'
import type { ControllerConfigCC } from '@/midi/types'
import { voiceGroupStores } from '@/store'
import { lfoCtrls } from '@/synthcore/modules/lfo/lfoControllers'
import { STAGE_ID_TO_NAME } from '../modules/lfoActions'
import { withMidiReceive } from './midiGuard'
import { buttonMappings, nrpnMappings } from './lfoMidiSend'

let currentReceivedLfoId = -1
let receiveUnsubscribers: (() => void)[] = []

function subscribeLfoSelect() {
    const cfg = lfoCtrls.SELECT as ControllerConfigCC
    const id = cc.subscribe((_voiceGroupIndex: number, value: number) => {
        currentReceivedLfoId = value
    }, cfg)
    return () => cc.unsubscribe(cfg, id)
}

export function startLfoMidiReceive() {
    stopLfoMidiReceive()

    receiveUnsubscribers.push(subscribeLfoSelect())

    for (const m of nrpnMappings) {
        const id = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
            if (currentReceivedLfoId < 0) return
            const value = m.ctrl.bipolar ? (midiValue - 32767) / 32767 : midiValue / 65535
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[currentReceivedLfoId][m.field] = value
                })
            })
        }, m.ctrl)
        receiveUnsubscribers.push(() => nrpn.unsubscribe(m.ctrl, id))
    }

    const maxLoopsCtrl = lfoCtrls.MAX_LOOPS as ControllerConfigCC
    const mlId = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedLfoId < 0) return
        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                state.lfos[currentReceivedLfoId].maxLoops = midiValue
            })
        })
    }, maxLoopsCtrl)
    receiveUnsubscribers.push(() => cc.unsubscribe(maxLoopsCtrl, mlId))

    for (const m of buttonMappings) {
        const id = button.subscribe((voiceGroupIndex: number, midiValue: number) => {
            if (currentReceivedLfoId < 0) return
            const value = m.ctrl.values.indexOf(midiValue)
            if (value < 0) return
            withMidiReceive(() => {
                voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                    state.lfos[currentReceivedLfoId][m.field] = value
                })
            })
        }, m.ctrl)
        receiveUnsubscribers.push(() => button.unsubscribe(m.ctrl, id))
    }

    const curveId = nrpn.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedLfoId < 0) return
        const stageId = midiValue >> 7
        const stageName = STAGE_ID_TO_NAME[stageId as keyof typeof STAGE_ID_TO_NAME]
        if (!stageName) return
        const curve = midiValue & 0b01111111
        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                state.lfos[currentReceivedLfoId].stages[stageName].curve = curve
            })
        })
    }, lfoCtrls.CURVE)
    receiveUnsubscribers.push(() => nrpn.unsubscribe(lfoCtrls.CURVE, curveId))

    const toggleStageCtrl = lfoCtrls.TOGGLE_STAGE as ControllerConfigCC
    const tsId = cc.subscribe((voiceGroupIndex: number, midiValue: number) => {
        if (currentReceivedLfoId < 0) return
        const stageId = midiValue & 0b111
        const stageName = STAGE_ID_TO_NAME[stageId as keyof typeof STAGE_ID_TO_NAME]
        if (!stageName) return
        const enabled = (midiValue & 0b1000) > 0 ? 1 : 0
        withMidiReceive(() => {
            voiceGroupStores[voiceGroupIndex].getState().set((state) => {
                state.lfos[currentReceivedLfoId].stages[stageName].enabled = enabled
            })
        })
    }, toggleStageCtrl)
    receiveUnsubscribers.push(() => cc.unsubscribe(toggleStageCtrl, tsId))
}

export function stopLfoMidiReceive() {
    receiveUnsubscribers.forEach((unsub) => {
        unsub()
    })
    receiveUnsubscribers = []
    currentReceivedLfoId = -1
}

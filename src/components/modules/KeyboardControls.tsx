import Header from '../misc/Header'
import RotaryPot10 from '../pots/RotaryPot10'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Led from '../leds/Led'
import React from 'react'
import { ControllerGroupIds } from '../../synthcore/types'
import kbdControllers from '../../synthcore/modules/kbd/kbdControllers'
import { useAppSelector } from '../../synthcore/hooks'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'

interface Props {
    x: number,
    y: number
}

type TransposeProps = {
    row2: number;
}

const ctrlGroup = ControllerGroupIds.KBD

const Transpose = ({ row2 }: TransposeProps) => {
    const ledDistance = 10
    const col1 = 10
    const col2 = col1 + ledDistance
    const col3 = col2 + ledDistance
    const col4 = col3 + ledDistance
    const col5 = col4 + ledDistance
    const col6 = col5 + ledDistance
    const col7 = col6 + ledDistance

    const transpose = useAppSelector(selectController(kbdControllers.TRANSPOSE))

    return <>
        <RoundPushButton8 labelPosition="bottom" x={col1} y={row2}
                          label="Down" reverse
                          loop={false}
                          ctrlGroup={ctrlGroup}
                          ctrl={kbdControllers.TRANSPOSE}
        />

        <Led x={col2} y={row2} label="-2" on={transpose === 0}/>
        <Led x={col3} y={row2} label="-1" on={transpose === 1}/>
        <Led x={col4} y={row2} label="0" on={transpose === 2}/>
        <Led x={col5} y={row2} label="1" on={transpose === 3}/>
        <Led x={col6} y={row2} label="2" on={transpose === 4}/>
        <RoundPushButton8 labelPosition="bottom" x={col7} y={row2}
                          label="Up"
                          loop={false}
                          ctrlGroup={ctrlGroup}
                          ctrl={kbdControllers.TRANSPOSE}
        />
    </>
}

const KeyboardControls = ({ x, y }: Props) => {
    /*
    - Two Buttons, 5 leds - Transpose - up/down
    - 17mm pot - Portamento (amount/speed?) or glide
      - Button, two leds - Direction - up/down/both ?
      (- Modulate)
    - Button - Unison
    - 17mm pot - Unison detune pot
    - Button - Split
    - Button - Hold (whhat does it do?)
    - Button - Chord
     */

    const row1 = 0
    const row2 = 22

    const col8 = 100
    const col9 = col8 + 25
    const col10 = col9 + 20
    const col11 = col10 + 20
    const col12 = col11 + 45

    return <svg x={x} y={y}>
        <Header label="Transpose" x={0} y={row1} width={80}/>
        <Header label="Keyboard" x={85} y={row1} width={140}/>
        <Transpose row2={row2}/>
        <RotaryPot10 x={col8} y={row2} ledMode="single" label="Portamento"
                     ctrlGroup={ctrlGroup}
                     ctrl={kbdControllers.PORTAMENTO}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={col9} y={row2} label="Hold"
                             ctrlGroup={ctrlGroup}
                             ctrl={kbdControllers.HOLD}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={col10} y={row2} label="Chord"
                             ctrlGroup={ctrlGroup}
                             ctrl={kbdControllers.CHORD}
        />

        <RoundPushButton8 labelPosition="bottom" x={col11} y={row2} label="Mode" ledCount={3} ledPosition="right"
                          ledLabels={['Solo', 'Unison', 'Poly']}
                          ctrlGroup={ctrlGroup}
                          ctrl={kbdControllers.MODE}
        />

        <RotaryPot10 x={col12} y={row2} ledMode="single" label="Unison detune"
                     ctrlGroup={ctrlGroup}
                     ctrl={kbdControllers.UNISON_DETUNE}
        />

    </svg>
}

export default KeyboardControls
import Header from '../misc/Header';
import RotaryPot10 from '../pots/RotaryPot10';
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Led from '../leds/Led';
import React from 'react'
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { selectKbd } from '../../synthcore/modules/kbd/kbdReducer'
import { KbdControllerIds } from '../../synthcore/modules/kbd/types'

interface Props {
    x: number,
    y: number
}

type TransposeProps = {
    row2: number;
}

const ctrlGroup = ControllerGroupIds.KBD

const Transpose = ({row2}: TransposeProps) => {
    const ledDistance = 10;
    const col1 = 10;
    const col2 = col1 + ledDistance;
    const col3 = col2 + ledDistance;
    const col4 = col3 + ledDistance;
    const col5 = col4 + ledDistance;
    const col6 = col5 + ledDistance;
    const col7 = col6 + ledDistance;

    const kbd = useAppSelector(selectKbd)

    return <>
        <RoundPushButton8 labelPosition="bottom" x={col1} y={row2}
                          label="Down" reverse
                          ctrlGroup={ctrlGroup}
                          ctrlId={KbdControllerIds.TRANSPOSE}
                          value={kbd.transpose}
        />

        <Led x={col2} y={row2} label="-2" on={kbd.transpose === 0}/>
        <Led x={col3} y={row2} label="-1" on={kbd.transpose === 1}/>
        <Led x={col4} y={row2} label="0" on={kbd.transpose === 2}/>
        <Led x={col5} y={row2} label="1" on={kbd.transpose === 3}/>
        <Led x={col6} y={row2} label="2" on={kbd.transpose === 4}/>
        <RoundPushButton8 labelPosition="bottom" x={col7} y={row2}
                          label="Up"
                          ctrlGroup={ctrlGroup}
                          ctrlId={KbdControllerIds.TRANSPOSE}
                          value={kbd.transpose}
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

    const row1 = 0;
    const row2 = 22;

    const col8 = 100;
    const col9 = col8 + 25;
    const col10 = col9 + 20;
    const col11 = col10 + 20;
    const col12 = col11 + 45;

    const kbd = useAppSelector(selectKbd)

    return <svg x={x} y={y}>
        <Header label="Transpose" x={0} y={row1} width={80}/>
        <Header label="Keyboard" x={85} y={row1} width={140}/>
        <Transpose row2={row2} />
        <RotaryPot10 x={col8} y={row2} ledMode="single" label="Portamento"
                     ctrlGroup={ctrlGroup}
                     ctrlId={KbdControllerIds.PORTAMENTO}
                     value={kbd.portamento}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={col9} y={row2} label="Hold"
                             ctrlGroup={ctrlGroup}
                             ctrlId={KbdControllerIds.HOLD}
                             value={kbd.hold}
        />

        <RoundLedPushButton8 labelPosition="bottom" x={col10} y={row2} label="Chord"
                             ctrlGroup={ctrlGroup}
                             ctrlId={KbdControllerIds.CHORD}
                             value={kbd.chord}
        />

        <RoundPushButton8 labelPosition="bottom" x={col11} y={row2} label="Mode" ledCount={3} ledPosition="right" ledLabels={['Solo', 'Unison', 'Poly']}
                          ctrlGroup={ctrlGroup}
                          ctrlId={KbdControllerIds.MODE}
                          value={kbd.mode}
        />

        <RotaryPot10 x={col12} y={row2} ledMode="single" label="Unison detune"
                     ctrlGroup={ctrlGroup}
                     ctrlId={KbdControllerIds.UNISON_DETUNE}
                     value={kbd.unisonDetune}
        />

    </svg>;
};

export default KeyboardControls;
import RotaryPot12 from '../pots/RotaryPot12'
import RoundLedPushButton8 from '../buttons/RoundLedPushButton8'
import RoundPushButton8 from '../buttons/RoundPushButton8'
import Led from '../leds/Led'
import React from 'react'
import { ControllerGroupIds } from '../../synthcore/types'
import kbdControllers from '../../synthcore/modules/kbd/kbdControllers'
import { useAppSelector } from '../../synthcore/hooks'
import { selectController } from '../../synthcore/modules/controllers/controllersReducer'
import { ModuleBorder } from "../misc/ModuleBorder";
import SubHeader from "../misc/SubHeader";
import { ModuleProps } from "./types";
import { POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../constants";
import "./KeyboardControls.scss"

const ctrlGroup = ControllerGroupIds.KBD

export const Transpose = ({ x, y, height, width }: ModuleProps) => {
    const ledDistance = 8
    const col1 = x + POT_DISTANCE_M / 2
    const col7 = col1 + POT_DISTANCE_M * 2

    const ledStart = col1 + (col7 - col1 - 4 * ledDistance) / 2
    const col2 = ledStart
    const col3 = col2 + ledDistance
    const col4 = col3 + ledDistance
    const col5 = col4 + ledDistance
    const col6 = col5 + ledDistance

    const row1 = y + POT_OFFSET_Y

    const transpose = useAppSelector(selectController(kbdControllers.TRANSPOSE))

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} className="keyboard-controls-background"/>
        <SubHeader label="Transpose" labelPosition="center" labelWidth={22} labelBackgroundOn={false}
                   x={x} y={y} width={width}
                   className="keyboard-controls-header"/>

        <RoundPushButton8 labelPosition="bottom-pot" x={col1} y={row1}
                          label="Down" reverse
                          loop={false}
                          ctrlGroup={ctrlGroup}
                          ctrl={kbdControllers.TRANSPOSE}
        />

        <Led x={col2} y={row1} label="-2" on={transpose === 0}/>
        <Led x={col3} y={row1} label="-1" on={transpose === 1}/>
        <Led x={col4} y={row1} label="0" on={transpose === 2}/>
        <Led x={col5} y={row1} label="1" on={transpose === 3}/>
        <Led x={col6} y={row1} label="2" on={transpose === 4}/>
        <RoundPushButton8 labelPosition="bottom-pot" x={col7} y={row1}
                          label="Up"
                          loop={false}
                          ctrlGroup={ctrlGroup}
                          ctrl={kbdControllers.TRANSPOSE}
        />
    </>
}

export const Keyboard = ({ x, y, height, width }: ModuleProps) => {
    const row1 = y + POT_OFFSET_Y

    const col8 = x + POT_DISTANCE_M / 2
    const col9 = col8 + 25
    const col10 = col9 + 20
    const col11 = col10 + 20
    const col12 = col11 + 45

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} className="keyboard-controls-background"/>
        <SubHeader label="Keyboard" labelPosition="center" labelWidth={22} labelBackgroundOn={false}
                   x={x} y={y} width={width}
                   className="keyboard-controls-header"/>

        <RotaryPot12 x={col8} y={row1} ledMode="single" label="Portamento"
                     ctrlGroup={ctrlGroup}
                     ctrl={kbdControllers.PORTAMENTO}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col9} y={row1} label="Hold"
                             ctrlGroup={ctrlGroup}
                             ctrl={kbdControllers.HOLD}
        />

        <RoundLedPushButton8 labelPosition="bottom-pot" x={col10} y={row1} label="Chord"
                             ctrlGroup={ctrlGroup}
                             ctrl={kbdControllers.CHORD}
        />

        <RoundPushButton8 labelPosition="bottom-pot" x={col11} y={row1} label="Mode" ledCount={3} ledPosition="right"
                          ledLabels={['Solo', 'Unison', 'Poly']}
                          ctrlGroup={ctrlGroup}
                          ctrl={kbdControllers.MODE}
        />

        <RotaryPot12 x={col12} y={row1} ledMode="single" label="Unison detune"
                     ctrlGroup={ctrlGroup}
                     ctrl={kbdControllers.UNISON_DETUNE}
        />
    </>
}

const KeyboardControls = ({ x, y, height, width }: ModuleProps) => {

    return <>
    </>
}

export default KeyboardControls
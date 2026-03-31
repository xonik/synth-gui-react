import RotaryPot12 from '../../pots/RotaryPot12';
import RoundPushButton8 from '../../buttons/RoundPushButton8';
import { POT_DISTANCE_L, POT_DISTANCE_M, POT_OFFSET_Y, ROW_HEIGHT } from "../../../constants";
import SubHeader from "../../misc/SubHeader";
import { ModuleBorder } from "../../misc/ModuleBorder";
import { ModuleProps } from "../types";
import { usePot, useButton } from '../../../store/hooks'
import "../Modules.scss"

const Chorus = ({ x, y, height, width }: ModuleProps) => {

    const row1 = y + POT_OFFSET_Y;
    const row2 = row1 + ROW_HEIGHT;
    const col1 = x + POT_DISTANCE_L / 2;
    const col2 = col1 + POT_DISTANCE_M;

    const { displayValue: rateValue, increment: rateIncrement } = usePot(
        s => s.commonFx.chorus.rate,
        (s, v) => { s.commonFx.chorus.rate = v },
    )
    const { displayValue: depthValue, increment: depthIncrement } = usePot(
        s => s.commonFx.chorus.depth,
        (s, v) => { s.commonFx.chorus.depth = v },
    )
    const { value: sourceValue, toggle: sourceToggle } = useButton(
        s => s.commonFx.chorus.source,
        (s, v) => { s.commonFx.chorus.source = v },
        2
    )
    const { value: modeValue, toggle: modeToggle } = useButton(
        s => s.commonFx.chorus.mode,
        (s, v) => { s.commonFx.chorus.mode = v },
        2
    )

    return <>
        <ModuleBorder x={x} y={y} height={height} width={width} className="shared-elements-border"/>
        <SubHeader label="Chorus" x={x} y={y} width={width}/>
        <RoundPushButton8 label="Source" labelPosition="bottom-pot"
                          x={col1} y={row2} ledCount={2}
                          ledPosition="top-horizontal" ledLabels={['FX1', 'FX2']}
                          value={sourceValue}
                          onButtonClick={sourceToggle}
        />

        <RoundPushButton8 label="Mode" labelPosition="bottom-pot"
                          x={col2} y={row2}
                          ledCount={2} ledPosition="top-horizontal" ledLabels={['Chor', 'Vibr']}
                          value={modeValue}
                          onButtonClick={modeToggle}
        />

        <RotaryPot12 ledMode="single" label="Rate" x={col1} y={row1}
                     value={rateValue}
                     onValueIncrement={rateIncrement}
        />

        <RotaryPot12 ledMode="single" label="Depth" x={col2} y={row1}
                     value={depthValue}
                     onValueIncrement={depthIncrement}
        />
    </>;
};

export default Chorus;

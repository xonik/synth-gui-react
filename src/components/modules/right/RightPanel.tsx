import LowPassFilter from "./LowPassFilter";
import PostMix from "./PostMix";
import Envelope from "./Envelope";
import { BUTTON_DISTANCE_S, POT_DISTANCE_L, POT_DISTANCE_M, ROW_HEIGHT } from "../../../constants";
import DigitalFX from "./DigitalFX";
import Chorus from "./Chorus";
import OutputMixer from "./OutputMixer";
import React from "react";
import StateVariableFilter from "./StateVariableFilter";
import { useAppSelector } from "../../../synthcore/hooks";
import { selectController } from "../../../synthcore/modules/controllers/controllersReducer";
import { envCtrls } from "../../../synthcore/modules/env/envControllers";

type Props = {
    x: number,
    rows: number[],
}

export const RightPanel = ({ x, rows }: Props) => {

    const env3Id = useAppSelector(selectController(envCtrls.SELECT_ENV3_ID))

    const filterCol = x
    const postMixCol = filterCol + 3 * POT_DISTANCE_M + POT_DISTANCE_L

    const envCol = postMixCol + POT_DISTANCE_L
    const outFx1Col = envCol
    const outFx2Col = outFx1Col + POT_DISTANCE_M + POT_DISTANCE_L
    const outputMixerCol = envCol + 7 * POT_DISTANCE_M

    const filterWidth = 3 * POT_DISTANCE_M + POT_DISTANCE_L
    const postMixWidth = POT_DISTANCE_L
    const envWidth = 7 * POT_DISTANCE_M
    const outputMixWidth = POT_DISTANCE_L

    return <>
        <StateVariableFilter x={filterCol} y={rows[0]} height={4 * ROW_HEIGHT} width={filterWidth}/>
        <LowPassFilter x={filterCol} y={rows[4]} height={4 * ROW_HEIGHT} width={filterWidth}/>

        <PostMix x={postMixCol} y={rows[0]} height={8 * ROW_HEIGHT} width={postMixWidth}/>

        <Envelope header="VCA Env" x={envCol} y={rows[0]} label="" envId={0} height={2 * ROW_HEIGHT}
                  width={envWidth}/>
        <Envelope header="VCF Env" x={envCol} y={rows[2]} label="" envId={1} height={2 * ROW_HEIGHT}
                  width={envWidth}/>
        <Envelope header="Aux Envs" x={envCol} y={rows[4]} label="" showSelect={true} envId={env3Id}
                  height={2 * ROW_HEIGHT} width={envWidth}/>

        <DigitalFX x={outFx2Col} y={rows[6]} height={2 * ROW_HEIGHT} width={3 * POT_DISTANCE_M + POT_DISTANCE_L}/>
        <Chorus x={outFx1Col} y={rows[6]} height={2 * ROW_HEIGHT} width={POT_DISTANCE_M + POT_DISTANCE_L}/>
        {/*<BitCrusher x={outFx2Col} y={outputFxRow + 40}/>*/}

        <OutputMixer x={outputMixerCol} y={rows[0]} height={4 * ROW_HEIGHT} width={outputMixWidth}/>
    </>
}
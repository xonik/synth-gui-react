import { Triangle } from "../../images/Triangle";
import { SawRight } from "../../images/SawRight";
import { Square } from "../../images/Square";
import React from "react";
import { rotateAround } from "../../../utils/svg/rotateAround";

type Props = {
    x: number;
    y: number;
}

export const WaveformIconsRing = ({x, y}: Props) => {

    const iconDistance = 18
    const sawPos: [number, number] = [x, y - iconDistance]
    const triPos = rotateAround(sawPos, [x, y], -125)
    const squarePos = rotateAround(sawPos, [x, y], 125)

    return <>
        <Triangle x={triPos[0]} y={triPos[1]} width={3} height={2} centered/>
        <SawRight x={sawPos[0]} y={sawPos[1]} width={3} height={2} centered />
        <Square x={squarePos[0]} y={squarePos[1]} width={3} height={2} centered/>
    </>
}


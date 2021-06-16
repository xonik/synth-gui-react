import React from 'react'
import AnimatedSlopes from '../../components/slopes/AnimatedSlopes'

interface Props {
    x: number
    y: number
    width: number
    height: number
}

enum StageId {
    DELAY,
    ATTACK,
    DECAY1,
    DECAY2,
    SUSTAIN,
    RELEASE1,
    RELEASE2,
    STOPPED,
}

enum ReleaseMode {
    NORMAL,
    SKIP_R1,
    FREE_RUN,
}

enum LoopMode {
    OFF,
    GATED,
    COUNTED,
    INFINITE,
}

enum Curve {
    EXP1,
    EXP2,
    EXP3,
    LIN,
    LOG1,
    LOG2,
    LOG3,
}

type Stage = {
    id: StageId;
    enabled: boolean;
    curve: Curve;
    level: number; //-1 to 1
    time: number; // 0 to 1
};

type Envelope = {
    resetOnTrigger: boolean;
    resetLevel: number;
    releaseMode: ReleaseMode;
    stages: Stage[];
    loopMode: LoopMode;
    maxLoops: number;
    invert: boolean;
    bipolar: boolean;
}

const MIN_LEVEL = 100;
const MAX_LEVEL = 100;
const MIN_TIME = 1; //ms
const MAX_TIME = 65536; // approx 1 minute.

const getDefaultEnvelope = (): Envelope => {

    const stages: Stage[] = [];
    stages.push({
        id: StageId.DELAY,
        enabled: false,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })
    stages.push({
        id: StageId.ATTACK,
        enabled: true,
        curve: Curve.LOG1,
        level: 0,
        time: 0.001,
    })
    stages.push({
        id: StageId.DECAY1,
        enabled: true,
        curve: Curve.LOG1,
        level: 1,
        time: 0.002,
    })
    stages.push({
        id: StageId.DECAY2,
        enabled: false,
        curve: Curve.LIN,
        level: 0.5,
        time: 0.001,
    })
    stages.push({
        id: StageId.SUSTAIN,
        enabled: true,
        curve: Curve.LIN,
        level: 0.5,
        time: 0,
    })
    stages.push({
        id: StageId.RELEASE1,
        enabled: false,
        curve: Curve.LOG1,
        level: 0.5,
        time: 0.001,
    })
    stages.push({
        id: StageId.RELEASE2,
        enabled: true,
        curve: Curve.LOG1,
        level: 0.5,
        time: 0.003,
    })
    stages.push({
        id: StageId.STOPPED,
        enabled: true,
        curve: Curve.LIN,
        level: 0,
        time: 0,
    })

    return {
        resetOnTrigger: false,
        resetLevel: 0,
        releaseMode: ReleaseMode.NORMAL,
        loopMode: LoopMode.OFF,
        maxLoops: 0,
        invert:false,
        stages,
        bipolar: false
    }
}

//TODO: Move padding out of code
const hPadding = 10;
const vPadding = 10;

// Draw the desired slope between from and to. NB: SVG has 0,0 in upper left corner.
const Envelope = ({ x, y, width, height}: Props) => {

    const env = getDefaultEnvelope();

    const enabledStages = env.stages.filter((stage) => stage.enabled);
    const stageCount = enabledStages.length - 1; // -1 because stopped is hidden.
    const stageWidth = (width - 2 * hPadding) / stageCount;
    const vCenter = env.bipolar ? height / 2 : height - vPadding;
    const vHeight = env.bipolar ? (height - 2 * vPadding) / 2 : height - 2 * vPadding;

    return <svg x={x} y={y}>
        {
            enabledStages.map((stage, index) => {
               if(stage.id === StageId.STOPPED) return;
               const startLev = stage.level;
               const endLev = enabledStages[index + 1].level;
               const startX = vPadding + index * stageWidth;
               const endX = startX + stageWidth;

               const startY = vCenter - vHeight * startLev;
               const endY = vCenter - vHeight * endLev;

               console.log({startX, startY, endX, endY, curve: stage.curve })
               return <AnimatedSlopes
                   from={[startX, startY]}
                   to={[endX, endY]}
                   selectedSlope={stage.curve}
               />
           })
        }
    </svg>;
}

export default Envelope;
import React from 'react';
import RotaryPot17 from '../pots/RotaryPot17';
import Header from '../misc/Header';
import { LedMode, PotMode } from '../pots/RotaryPotWithLedRingBase';
import { ControllerGroupIds } from '../../synthcore/types'
import { useAppSelector } from '../../synthcore/hooks'
import { PostMixControllerIds } from '../../synthcore/modules/postMix/types'
import { selectPostMixMix, selectPostMixOut } from '../../synthcore/modules/postMix/postMixReducer'


interface Props {
  x: number,
  y: number
}

interface ChannelProps {
  label: string,
  potMode?: PotMode,
  ledMode?: LedMode,
  ctrlId: number,
  storePos: number,
  x: number,
  y: number
}

const rowDistance = 40;

const ctrlGroup = ControllerGroupIds.POST_MIX

const VoiceMixerChannel = ({ x, y, label, potMode="normal", ledMode="multi", ctrlId, storePos}: ChannelProps) => {

  return <>
    <RotaryPot17 label={label} x={x} y={y} potMode={potMode} ledMode={ledMode}
                 ctrlGroup={ctrlGroup}
                 ctrlId={ctrlId}
                 value={storePos}
    />

  </>;
};

const VoiceMixer = ({ x, y }: Props) => {
  const offsetX = 20;
  const offsetY = 27;
  const offsetY2 = 195;

  const postMixMix= useAppSelector(selectPostMixMix)
  const postMixOut = useAppSelector(selectPostMixOut)

  return <svg x={x} y={y}>
    <Header label="Mix" x={0} y={0} width={40}/>
    <VoiceMixerChannel x={offsetX} y={offsetY} label="LPF" ctrlId={PostMixControllerIds.LPF} storePos={postMixMix.lpfLevel}/>
    <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance} label="SVF" ctrlId={PostMixControllerIds.SVF} storePos={postMixMix.svfLevel}/>
    <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance * 2} label="Sine 1" ctrlId={PostMixControllerIds.SINE1} storePos={postMixMix.sine1Level}/>
    <VoiceMixerChannel x={offsetX} y={offsetY + rowDistance * 3} label="Sine 2"  ctrlId={PostMixControllerIds.SINE2} storePos={postMixMix.sine2Level}/>

    <Header label="Voice out" x={0} y={offsetY2-27} width={40}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2} label="Pan" potMode="pan" ledMode="single" ctrlId={PostMixControllerIds.PAN} storePos={postMixOut.pan}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance} label="Amt" ctrlId={PostMixControllerIds.AMT} storePos={postMixOut.amt}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance * 2} label="FX1 send" ctrlId={PostMixControllerIds.FX1} storePos={postMixOut.fx1}/>
    <VoiceMixerChannel x={offsetX} y={offsetY2 + rowDistance * 3} label="FX2 send"  ctrlId={PostMixControllerIds.FX2} storePos={postMixOut.fx2}/>
  </svg>;
};



export default VoiceMixer;
import React from 'react';
import RoundPushButton8 from '../buttons/RoundPushButton8';
import Header from '../misc/Header';
import { useAppSelector } from '../../synthcore/hooks'
import { selectRingMod } from '../../synthcore/modules/ringMod/ringModReducer'
import { ControllerGroupIds } from '../../synthcore/types'
import { RingModControllerIds } from '../../synthcore/modules/ringMod/types'

interface Props {
  x: number,
  y: number
}

const ctrlGroup = ControllerGroupIds.RING_MOD

const Ringmod = ({ x, y }: Props) => {
  const ringMod = useAppSelector(selectRingMod)

  return <>
    <Header label="Ring mod" x={x} y={y} width={30}/>
    <RoundPushButton8 x={x+13} y={y+38}
                      ledPosition="top"  ledCount={2} ledLabels={['1->2', 'Ext->2']}
                      label="Sources" labelPosition="bottom"
                      ctrlGroup={ctrlGroup}
                      ctrlId={RingModControllerIds.SOURCE}
                      value={ringMod.source}
    />
  </>;
};



export default Ringmod;
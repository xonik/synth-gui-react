import React from 'react'
import CtrlHeader from "@/controller/components/CtrlHeader";
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrGuiLfoId } from '../../synthcore/modules/lfo/lfoReducer'

import '../components/CtrlHeader.scss'

const LfoHeader = () => {
    const lfoId = useAppSelector(selectCurrGuiLfoId)
    return <CtrlHeader
        leftOptionsLabel={`LFO ${lfoId + 1}`}
        centerLabels={[]}
        rightOptionsLabel="Stages"
    />
}

export default LfoHeader


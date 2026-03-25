import React from 'react'
import CtrlHeader from "@/controller/components/CtrlHeader";
import { useUiStore } from '../../store/uiStore'
import '../components/CtrlHeader.scss'

const LfoHeader = () => {
    const lfoId = useUiStore(s => s.selectedLfoId)
    return <CtrlHeader
        leftOptionsLabel={`LFO ${lfoId + 1}`}
        centerLabels={[]}
        rightOptionsLabel="Stages"
    />
}

export default LfoHeader

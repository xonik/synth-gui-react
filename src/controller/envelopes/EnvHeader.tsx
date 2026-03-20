import React from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import { stageNames } from './utils'
import { useEnvStages } from '../../store/modules/useEnvelope'
import { useUiStore } from '../../store'
import CtrlHeader from "@/controller/components/CtrlHeader";
import '../components/CtrlHeader.scss'

const EnvHeader = () => {
    const envId = useUiStore(s => s.selectedEnvId)
    const stages = useEnvStages(envId)
    const centerLabels = stages
        .filter((stage) => stage.enabled && stage.id !== StageId.STOPPED)
        .map((stage) => stageNames[stage.id])

    return <CtrlHeader
        leftOptionsLabel={`Envelope ${envId + 1}`}
        centerLabels={centerLabels}
        rightOptionsLabel="Stages"/>
}

export default EnvHeader

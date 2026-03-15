import React from 'react'
import { StageId } from '../../synthcore/modules/env/types'
import { stageNames } from './utils'
import { selectEnvStages } from '../../synthcore/modules/controllers/controllersReducer'
import CtrlHeader from "@/controller/components/CtrlHeader";
import { useAppSelector } from '../../synthcore/hooks'
import { selectCurrEnvId } from '../../synthcore/modules/env/envReducer'
import '../components/CtrlHeader.scss'

const EnvHeader = () => {
    const envId = useAppSelector(selectCurrEnvId)
    const stages = useAppSelector(selectEnvStages(envId))
    const centerLabels = stages
        .filter((stage) => stage.enabled && stage.id !== StageId.STOPPED)
        .map((stage) => stageNames[stage.id])

    return <CtrlHeader
        leftOptionsLabel={`Envelope ${envId + 1}`}
        centerLabels={centerLabels}
        rightOptionsLabel="Stages"/>
}

export default EnvHeader


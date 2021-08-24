import React from 'react'
import SourceLabels from './SourceLabels'
import DstLabels from './DstLabels'
import AmountsTable from './AmountsTable'
import ScrollSync from '../utils/scrollsync/ScrollSync'
import ScrollSyncNode from '../utils/scrollsync/ScrollSyncNode'
import { modDst } from '../../synthcore/modules/mods/utils'
import { useAppSelector } from '../../synthcore/hooks'
import { selectGuiDstGroup } from '../../synthcore/modules/mods/modsReducer'
import './ModControl.scss'

const ModControl = () => {
    const dstGroupId = useAppSelector(selectGuiDstGroup)
    return (
        <div className="mod-ctrl">
            <ScrollSync>
                <>
                    <div className="mod-ctrl__header">
                        <div className="mod-ctrl__header__corner">
                            {modDst.groupLabels[dstGroupId]}
                        </div>
                        <ScrollSyncNode lockAxis="Y">
                            <div className="mod-ctrl__header__dsts-container" id="dsts">
                                <DstLabels/>
                            </div>
                        </ScrollSyncNode>
                    </div>
                    <div className="mod-ctrl__content">
                        <ScrollSyncNode lockAxis="X">
                            <div className="mod-ctrl__content__sources-container" id="sources">
                                <SourceLabels/>
                            </div>
                        </ScrollSyncNode>
                        <ScrollSyncNode>
                            <div className="mod-ctrl__content__amounts-container" id="amounts">
                                <AmountsTable/>
                            </div>
                        </ScrollSyncNode>
                    </div>
                </>
            </ScrollSync>
        </div>
    )
}

export default ModControl
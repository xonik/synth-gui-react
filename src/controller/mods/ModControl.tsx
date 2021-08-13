import React from 'react'
import SourceLabels from './SourceLabels'
import TargetLabels from './TargetLabels'
import AmountsTable from './AmountsTable'
import ScrollSync from '../utils/ScrollSync'
import ScrollSyncNode from '../utils/ScrollSyncNode'
import './ModControl.scss'

const ModControl = () => {
    return (
        <div className="mod-ctrl">
            <ScrollSync>
                <>
                    <div className="mod-ctrl__header">
                        <div className="mod-ctrl__header__corner"/>
                        <ScrollSyncNode>
                            <div className="mod-ctrl__header__sources-container" id="mod-src">
                                <SourceLabels/>
                            </div>
                        </ScrollSyncNode>
                    </div>
                    <div className="mod-ctrl__content">
                        <ScrollSyncNode>
                            <div className="mod-ctrl__content__targets-container" id="mod-trg">
                                <TargetLabels/>
                            </div>
                        </ScrollSyncNode>
                        <ScrollSyncNode>
                            <div className="mod-ctrl__content__amounts-container" id="mod-amt">
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
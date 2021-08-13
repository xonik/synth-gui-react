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
                        <ScrollSyncNode lockAxis="Y">
                            <div className="mod-ctrl__header__sources-container">
                                <SourceLabels/>
                            </div>
                        </ScrollSyncNode>
                    </div>
                    <div className="mod-ctrl__content">
                        <ScrollSyncNode lockAxis="X">
                            <div className="mod-ctrl__content__targets-container">
                                <TargetLabels/>
                            </div>
                        </ScrollSyncNode>
                        <ScrollSyncNode>
                            <div className="mod-ctrl__content__amounts-container">
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
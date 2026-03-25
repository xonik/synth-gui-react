import React from 'react'
import SourceLabels from './SourceLabels'
import DstLabels from './DstLabels'
import AmountsTable from './AmountsTable'
import ScrollSync from '../utils/scrollsync/ScrollSync'
import ScrollSyncNode from '../utils/scrollsync/ScrollSyncNode'
import './ModControl.scss'

const ModControl = () => {
    return (
        <div className="mod-ctrl">
            <ScrollSync>
                <>
                    <div className="mod-ctrl__header">
                        <div className="mod-ctrl__header__corner">
                            <div className="mod-ctrl__header__corner__top"></div>
                            <div className="mod-ctrl__header__corner__bottom">Mod source</div>
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

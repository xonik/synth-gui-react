import ScrollSync from '../utils/scrollsync/ScrollSync'
import ScrollSyncNode from '../utils/scrollsync/ScrollSyncNode'
import AmountsTable from './AmountsTable'
import DstLabels from './DstLabels'
import SourceLabels from './SourceLabels'
import './ModControl.scss'

const ModControl = () => {
    return (
        <div className="mod-ctrl">
            <ScrollSync>
                <div className="mod-ctrl__inner">
                    <div className="mod-ctrl__header">
                        <div className="mod-ctrl__header__corner">
                            <div className="mod-ctrl__header__corner__top"></div>
                            <div className="mod-ctrl__header__corner__bottom">Mod source</div>
                        </div>
                        <ScrollSyncNode lockAxis="Y">
                            <div className="mod-ctrl__header__dsts-container" id="dsts">
                                <DstLabels />
                            </div>
                        </ScrollSyncNode>
                    </div>
                    <div className="mod-ctrl__content">
                        <ScrollSyncNode lockAxis="X">
                            <div className="mod-ctrl__content__sources-container" id="sources">
                                <SourceLabels />
                            </div>
                        </ScrollSyncNode>
                        <ScrollSyncNode>
                            <div className="mod-ctrl__content__amounts-container" id="amounts">
                                <AmountsTable />
                            </div>
                        </ScrollSyncNode>
                    </div>
                </div>
            </ScrollSync>
        </div>
    )
}

export default ModControl

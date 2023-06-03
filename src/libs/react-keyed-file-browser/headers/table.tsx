import React from 'react'
import ClassNames from 'classnames'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { BaseFileConnectors } from '../base-file'
import { HeaderRendererProps } from '../types'

class RawTableHeader extends React.Component<HeaderRendererProps> {

    handleHeaderClick() {
        this.props.select(this.props.fileKey)
    }

    render() {
        const header = (
            <tr
                className={ClassNames('folder', {
                    dragover: this.props.isOver,
                    selected: this.props.isSelected,
                })}
            >
                <th>File</th>
            </tr>
        )

        if ((this.props.browserProps.createFiles ||
            this.props.browserProps.moveFile ||
            this.props.browserProps.moveFolder) &&
            this.props.connectDropTarget
        ) {
            return this.props.connectDropTarget(header)
        } else {
            return header
        }
    }
}

const TableHeader = DropTarget(
    ['file', 'folder', NativeTypes.FILE],
    BaseFileConnectors.targetSource,
    BaseFileConnectors.targetCollect
    // Not sure why exactly this one does not work
    // @ts-ignore
)(RawTableHeader)

export default TableHeader
export { RawTableHeader }

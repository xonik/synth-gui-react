import React from 'react'
import ClassNames from 'classnames'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { BaseFileConnectors } from '../base-file'
import { HeaderRendererProps } from '../types'

class PathTableHeader extends React.Component<HeaderRendererProps> {

    render() {
        const pathWithEmptyLast = this.props.fileKey.split('/')
        const pathSplitted = pathWithEmptyLast.slice(0, pathWithEmptyLast.length-1)
        let currentPath = ''
        const pathElements = pathSplitted.map((folder) => {
            currentPath = `${currentPath}${folder}/`
            return {
                name: folder,
                fullPath: currentPath,
            }
        })
        const header = (
            <tr
                className={ClassNames('folder', {
                    dragover: this.props.isOver,
                    selected: this.props.isSelected,
                })}
            >
                <th>
                    <span onClick={() => this.props.select('')}>{this.props.fileTypeHeading} / </span>
                    {pathElements.map((element) => <span
                        onClick={() => this.props.select(element.fullPath)}>{element.name} / </span>)}
                </th>
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
)(PathTableHeader)

export default TableHeader
export { PathTableHeader }

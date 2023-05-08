import React from 'react'
import { move } from './utils'
import { FolderRendererProps } from './types'
import { DragSourceConnector, DragSourceMonitor } from 'react-dnd'

class BaseFolder extends React.Component<FolderRendererProps> {
    state: { newName: string } = {
        newName: this.props.isDraft ? 'New folder' : this.getName(),
    }

    selectFolderNameFromRef(element: HTMLInputElement) {
        if (element) {
            const currentName = element.value
            element.setSelectionRange(0, currentName.length)
            element.focus()
        }
    }

    getName() {
        if (this.props.name) {
            return this.props.name
        }
        const folders = this.props.fileKey.split('/')
        return this.props.newName || folders[folders.length - 2]
    }

    handleFolderClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        this.props.browserProps.select(this.props.fileKey, 'folder', event.ctrlKey || event.metaKey, event.shiftKey)
    }
    handleFolderDoubleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        this.toggleFolder()
    }

    handleRenameClick = () => {
        if (!this.props.browserProps.renameFolder) {
            return
        }
        this.props.browserProps.beginAction('rename', [this.props.fileKey])
    }
    handleNewNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        const newName = event.currentTarget.value
        this.setState({ newName })
    }
    handleRenameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!this.props.browserProps.renameFolder && !this.props.isDraft) {
            return
        }
        const newName = this.state.newName.trim()
        if (newName.length === 0) {
            // todo: move to props handler
            // window.notify({
            //   style: 'error',
            //   title: 'Invalid new folder name',
            //   body: 'Folder name cannot be blank',
            // })
            return
        }
        const invalidChar = ['/', '\\']
        if (invalidChar.some(char => newName.indexOf(char) !== -1)) return
        // todo: move to props handler
        // window.notify({
        //   style: 'error',
        //   title: 'Invalid new folder name',
        //   body: 'Folder names cannot contain forward slashes.',
        // })

        let newKey = this.props.fileKey.substr(0, this.props.fileKey.substr(0, this.props.fileKey.length - 1).lastIndexOf('/'))
        if (newKey.length) {
            newKey += '/'
        }
        newKey += newName
        newKey += '/'
        if (this.props.isDraft) {
            this.props.browserProps.createFolder?.(newKey)
        } else {
            this.props.browserProps.renameFolder?.(this.props.fileKey, newKey)
        }
    }

    handleDeleteClick = (event: React.MouseEvent) => {
        if (!this.props.browserProps.deleteFolder) {
            return
        }
        this.props.browserProps.beginAction('delete', [this.props.fileKey])
    }
    handleDeleteSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (!this.props.browserProps.deleteFolder) {
            return
        }
        // TODO: Something fishy here!
        this.props.browserProps.deleteFolder(this.props.browserProps.actionTargets[0])
    }

    handleCancelEdit = () => {
        this.props.browserProps.endAction()
    }

    toggleFolder = () => {
        this.props.browserProps.toggleFolder(this.props.fileKey)
    }

    connectDND(render: JSX.Element) {
        const inAction = (this.props.isDragging || this.props.action)
        if (this.props.keyDerived) {
            if (
                typeof this.props.browserProps.moveFolder === 'function' &&
                !inAction &&
                !this.props.isRenaming &&
                !this.props.isDeleting &&
                this.props.connectDragSource
            ) {
                render = this.props.connectDragSource(render)
            }
            if (
                (typeof this.props.browserProps.createFiles === 'function' ||
                    typeof this.props.browserProps.moveFolder === 'function' ||
                    typeof this.props.browserProps.moveFile === 'function') &&
                this.props.connectDropTarget
            ) {
                render = this.props.connectDropTarget(render)
            }
        }
        return render
    }
}

const dragSource = {
    beginDrag(props: FolderRendererProps) {
        if (!props.browserProps.selection.length) {
            props.browserProps.select(props.fileKey, 'folder')
        }
        return {
            key: props.fileKey,
        }
    },

    endDrag(props: FolderRendererProps, monitor: DragSourceMonitor, component: any) {
        move(props, monitor, component)
    },
}

function dragCollect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragPreview: connect.dragPreview(),
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

const BaseFolderConnectors = {
    dragSource,
    dragCollect,
}

export default BaseFolder
export {
    BaseFolderConnectors,
}

import React from 'react'
import { move } from './utils'
import { EXTENSION } from './constants'
import { FileRendererProps, ItemProps } from './types'

class BaseFile<T> extends React.Component<FileRendererProps<T>> {

  state = {
    newName: this.getName(),
  }

  selectFileNameFromRef(element: HTMLInputElement) {
    if (element) {
      const currentName = element.value
      const pointIndex = currentName.lastIndexOf('.')
      element.setSelectionRange(0, pointIndex || currentName.length)
      element.focus()
    }
  }

  getName() {
    let name = this.props.newKey || this.props.fileKey
    const slashIndex = name.lastIndexOf('/')
    if (slashIndex !== -1) {
      name = name.substr(slashIndex + 1)
    }
    return name
  }
  getExtension() {
    const blobs = this.props.fileKey.split('.')
    return blobs[blobs.length - 1].toLowerCase().trim()
  }

  getFileType() {
    return EXTENSION.TYPES[this.getExtension()] || 'File'
  }

  handleFileClick = (event: React.MouseEvent) => {
    event && event.preventDefault()
    this.props.browserProps.preview({
      url: this.props.url,
      name: this.getName(),
      key: this.props.fileKey,
      extension: this.getExtension(),
    })
  }
  handleItemClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    this.props.browserProps.select(this.props.fileKey, 'file', event.ctrlKey || event.metaKey, event.shiftKey)
  }
  handleItemDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    this.handleFileClick(event)
  }

  handleRenameClick = () => {
    if (!this.props.browserProps.renameFile) {
      return
    }
    this.props.browserProps.beginAction('rename', [this.props.fileKey])
  }
  handleNewNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newName = event.currentTarget.value
    this.setState({ newName: newName })
  }
  handleRenameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }
    if (!this.props.browserProps.renameFile) {
      return
    }
    const newName = this.state.newName.trim()
    if (newName.length === 0) {
      // todo: move to props handler
      // window.notify({
      //   style: 'error',
      //   title: 'Invalid new file name',
      //   body: 'File name cannot be blank',
      // })
      return
    }
    const invalidChar = ['/', '\\']
    if (invalidChar.some(char => newName.indexOf(char) !== -1)) return
    // todo: move to props handler
    // window.notify({
    //   style: 'error',
    //   title: 'Invalid new file name',
    //   body: 'File names cannot contain forward slashes.',
    // })
    let newKey = newName
    const slashIndex = this.props.fileKey.lastIndexOf('/')
    if (slashIndex !== -1) {
      newKey = `${this.props.fileKey.substr(0, slashIndex)}/${newName}`
    }
    this.props.browserProps.renameFile(this.props.fileKey, newKey)
  }

  handleDeleteClick = (event: React.MouseEvent) => {
    if (!this.props.browserProps.deleteFile) {
      return
    }
    this.props.browserProps.beginAction('delete', [this.props.fileKey])
  }
  handleDeleteSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!this.props.browserProps.deleteFile) {
      return
    }

    this.props.browserProps.deleteFile(this.props.browserProps.actionTargets[0]) //TODO: Fishy
  }

  handleCancelEdit = () => {
    this.props.browserProps.endAction()
  }

  connectDND(render: JSX.Element) {
    const inAction = (this.props.isDragging || this.props.action)
    if (
        typeof this.props.browserProps.moveFile === 'function' &&
        !inAction &&
        !this.props.isRenaming &&
        this.props.connectDragSource
    ) {
      return this.props.connectDragSource(render)
    }
    if (
        (typeof this.props.browserProps.createFiles === 'function' ||
        typeof this.props.browserProps.moveFile === 'function' ||
        typeof this.props.browserProps.moveFolder === 'function') &&
        this.props.connectDropTarget
    ) {
      return this.props.connectDropTarget(render)
    }
    return render
  }
}

const dragSource = {
  beginDrag(props: FileRendererProps<ItemProps>) {
    if (
        !props.browserProps.selection.length ||
        !props.browserProps.selection.includes(props.fileKey)
    ) {
      props.browserProps.select(props.fileKey, 'file')
    }
    return {
      key: props.fileKey,
    }
  },

  endDrag(props: FileRendererProps<ItemProps>, monitor, component) {
    move(props, monitor, component)
  },
}

function dragCollect(connect, monitor) {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const targetSource = {
  drop(props: FileRendererProps<ItemProps>, monitor) {
    if (monitor.didDrop()) {
      return
    }
    const key = props.newKey || props.fileKey
    const slashIndex = key.lastIndexOf('/')
    const path = (slashIndex !== -1) ? key.substr(0, slashIndex + 1) : ''
    const item = monitor.getItem()
    if (item.files && props.browserProps.createFiles) {
      props.browserProps.createFiles(item.files, path)
    }
    return {
      path: path,
    }
  },
}

function targetCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
  }
}

const BaseFileConnectors = {
  dragSource,
  dragCollect,
  targetSource,
  targetCollect,
}

export default BaseFile
export {
  BaseFileConnectors,
}

import PropTypes from 'prop-types'
import React, { Component, ReactNode } from 'react'
// drag and drop
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// default components (most overridable)
import { DefaultDetails } from './details'
import { DefaultFilter } from './filters'

// default renderers
import { TableHeader } from './headers'
import { TableFile } from './files'
import { TableFolder } from './folders'
import { SingleConfirmation, MultipleConfirmation } from './confirmations'

// default processors
import { groupByFolder } from './groupers'
import { sortByName } from './sorters'

import { isFolder } from './utils'
import { DefaultAction } from './actions'
import {
  ActionRendererProps,
  DetailRendererProps,
  FileBrowserTree,
  FileRendererProps,
  FilterRendererProps,
  FolderRendererProps,
  FileBrowserFile,
  FileBrowserTreeNode,
  isFolderType,
  HeaderRendererProps,
  ConfirmMultipleDeletionRendererProps,
  RendererBrowserProps,
  FileBrowserFolder,
  FileBrowserTreeFileNode,
  IconsProp,
  ConfirmDeletionRenderer
} from './types'

const SEARCH_RESULTS_PER_PAGE = 20
const regexForNewFolderOrFileSelection = /.*\/__new__[/]?$/gm

function getItemProps(file: FileBrowserTreeNode, browserProps: RendererBrowserProps) {
  return {
    key: `file-${file.key}`,
    fileKey: file.key,
    isSelected: (browserProps.selection.includes(file.key)),
    isOpen: file.key in browserProps.openFolders || browserProps.nameFilter,
    isRenaming: browserProps.activeAction === 'rename' && browserProps.actionTargets.includes(file.key),
    isDeleting: browserProps.activeAction === 'delete' && browserProps.actionTargets.includes(file.key),
    isDraft: !!file.draft,
  }
}

type RawFileBrowserProps = {
  files: FileBrowserFile[],
  actions?: JSX.Element
  showActionBar: boolean,
  canFilter: boolean,
  showFoldersOnFilter?: boolean,
  noFilesMessage?: string,

  group: (files: FileBrowserTree, root: string) => FileBrowserTree,
  sort: (allFiles: FileBrowserTree) => FileBrowserTree,

  icons: IconsProp,

  nestChildren: boolean,
  renderStyle: 'list' | 'table',

  startOpen: boolean,

  headerRenderer: React.FC<HeaderRendererProps>,
  headerRendererProps?: HeaderRendererProps,
  filterRenderer: React.FC<FilterRendererProps>,
  filterRendererProps?: FilterRendererProps,
  fileRenderer: React.FC<FileRendererProps>,
  fileRendererProps?: FileRendererProps,
  folderRenderer: React.FC<FolderRendererProps>,
  folderRendererProps?: FolderRendererProps,
  detailRenderer: React.FC<DetailRendererProps>,
  detailRendererProps?: DetailRendererProps,
  actionRenderer: React.FC<ActionRendererProps>,
  confirmDeletionRenderer?: React.FC<ConfirmDeletionRenderer>,
  confirmMultipleDeletionRenderer: React.FC<ConfirmMultipleDeletionRendererProps>,

  onCreateFiles?: (files: FileBrowserTreeFileNode[], prefix: string) => void | boolean,
  onCreateFolder?: (key: string) => void | boolean,
  onMoveFile?: (oldKey: string, newKey: string) => void | boolean,
  onMoveFolder?: (oldKey: string, newKey: string) => void | boolean,
  onRenameFile?: (oldKey: string, newKey: string) => void | boolean,
  onRenameFolder?: (oldKey: string, newKey: string) => void | boolean,
  onDeleteFile?: (fileKey: string) => void,
  onDeleteFolder?: (key: string) => void,
  onDownloadFile?: (folderKey: string) => void,
  onDownloadFolder?: (keys: string[]) => void,

  onSelect: (fileOrFolder: FileBrowserFile | FileBrowserFolder) => void
  onSelectFile: (file: FileBrowserFile) => void
  onSelectFolder: (folder: FileBrowserFolder) => void

  onPreviewOpen?: (file: FileBrowserFile) => void
  onPreviewClose?: (file: FileBrowserFile) => void

  onFolderOpen?: (folder: FileBrowserFolder) => void
  onFolderClose?: (folder: FileBrowserFolder) => void
}

type Action = 'rename' | 'delete' | 'createFolder'

type RawFileBrowserState = {
  openFolders: {[key: string]: boolean},
  selection: string[],
  activeAction: Action | null,
  actionTargets: string[],
  nameFilter: string,
  searchResultsShown: number,
  previewFile: FileBrowserFile | null,
  addFolder: null,
}

class RawFileBrowser extends Component<RawFileBrowserProps, RawFileBrowserState> {

  public static defaultProps = {
    showActionBar: true,
    canFilter: true,
    showFoldersOnFilter: false,
    noFilesMessage: 'No files.',

    group: groupByFolder,
    sort: sortByName,

    nestChildren: false,
    renderStyle: 'table',

    startOpen: false,

    headerRenderer: TableHeader,
    headerRendererProps: {},
    filterRenderer: DefaultFilter,
    filterRendererProps: {},
    fileRenderer: TableFile,
    fileRendererProps: {},
    folderRenderer: TableFolder,
    folderRendererProps: {},
    detailRenderer: DefaultDetails,
    detailRendererProps: {},
    actionRenderer: DefaultAction,
    confirmDeletionRenderer: SingleConfirmation,
    confirmMultipleDeletionRenderer: MultipleConfirmation,

    icons: {},


    // Always called when a file or folder is selected
    onSelect: (fileOrFolder: FileBrowserFile | FileBrowserFolder) => {},
    // Called after onSelect, only on file selection
    onSelectFile: (file: FileBrowserFile) => {},
    // Called after onSelect, only on folder selection
    onSelectFolder: (folder: FileBrowserFolder) => {},

    // File opened
    onPreviewOpen: (file: FileBrowserFile) => {},
    // File closed
    onPreviewClose: (file: FileBrowserFile) => {},

    // Folder opened
    onFolderOpen: (folder: FileBrowserFolder) => {},
    // Folder closed
    onFolderClose: (folder: FileBrowserFolder) => {},
  }

  state = {
    openFolders: {},
    selection: [],
    activeAction: null,
    actionTargets: [],

    nameFilter: '',
    searchResultsShown: SEARCH_RESULTS_PER_PAGE,

    previewFile: null,

    addFolder: null,
  }

  componentDidMount() {
    if (this.props.renderStyle === 'table' && this.props.nestChildren) {
      console.warn('Invalid settings: Cannot nest table children in file browser')
    }

    window.addEventListener('click', this.handleGlobalClick)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleGlobalClick)
  }

  // TODO: Hvordan funker denne, veldig sentral
  getFile = (key: string): FileBrowserTreeNode | undefined => {
    let hasPrefix = false
    const exactFolder = this.props.files.find((f) => {
      if (f.key.startsWith(key)) {
        hasPrefix = true
      }
      return f.key === key
    })
    if (exactFolder) {
      return exactFolder
    }
    if (hasPrefix) {
      return { key, modified: 0, size: 0, relativeKey: key }
    }
  }

  // item manipulation
  createFiles = (files, prefix: string) => {
    this.setState(prevState => {
      const stateChanges = {
        ...prevState,
        selection: []
      }
      if (prefix) {
        stateChanges.openFolders = {
          ...prevState.openFolders,
          [prefix]: true,
        }
      }
      return stateChanges
    }, () => {
      this.props.onCreateFiles(files, prefix)
    })
  }

  createFolder = (key: string) => {
    this.setState({
      activeAction: null,
      actionTargets: [],
      selection: [key],
    }, () => {
      this.props.onCreateFolder?.(key)
    })
  }

  moveFile = (oldKey: string, newKey: string) => {
    this.setState({
      activeAction: null,
      actionTargets: [],
      selection: [newKey],
    }, () => {
      this.props.onMoveFile?.(oldKey, newKey)
    })
  }

  moveFolder = (oldKey: string, newKey: string) => {
    this.setState((prevState) => {
      const stateChanges: RawFileBrowserState = {
        ...prevState,
        activeAction: null,
        actionTargets: [],
        selection: [newKey],
      }

      if (oldKey in prevState.openFolders) {
        stateChanges.openFolders = {
          ...prevState.openFolders,
          [newKey]: true,
        }
      }
      return stateChanges
    }, () => {
      this.props.onMoveFolder?.(oldKey, newKey)
    })
  }

  renameFile = (oldKey: string, newKey: string) => {
    this.setState({
      activeAction: null,
      actionTargets: [],
      selection: [newKey],
    }, () => {
      this.props.onRenameFile?.(oldKey, newKey)
    })
  }

  renameFolder = (oldKey: string, newKey: string) => {
    this.setState((prevState) => {
      const stateChanges = {
        ...prevState,
        activeAction: null,
        actionTargets: [],
      }
      if (prevState.selection[0].substr(0, oldKey.length) === oldKey) {
        stateChanges.selection = [prevState.selection[0].replace(oldKey, newKey)]
      }
      if (oldKey in prevState.openFolders) {
        stateChanges.openFolders = {
          ...prevState.openFolders,
          [newKey]: true,
        }
      }
      return stateChanges
    }, () => {
      this.props.onRenameFolder?.(oldKey, newKey)
    })
  }

  // TODO: Jeg skjønner ikke hva denne gjør.
  deleteFile = (key: string) => {
    this.setState({
      activeAction: null,
      actionTargets: [],
      selection: [],
    }, () => {
      this.props.onDeleteFile?.(key)
    })
  }

  deleteFolder = (key: string) => {
    this.setState((prevState) => {
      const stateChanges = {
        ...prevState,
        activeAction: null,
        actionTargets: [],
        selection: [],
      }
      if (key in prevState.openFolders) {
        stateChanges.openFolders = { ...prevState.openFolders }
        delete stateChanges.openFolders[key]
      }
      return stateChanges
    }, () => {
      this.props.onDeleteFolder?.(key)
    })
  }

  downloadFile = (key: string) => {
    this.setState({
      activeAction: null,
      actionTargets: [],
    }, () => {
      this.props.onDownloadFile?.(key)
    })
  }

  downloadFolder = (keys: string[]) => {
    this.setState({
      activeAction: null,
      actionTargets: [],
    }, () => {
      this.props.onDownloadFolder?.(keys)
    })
  }

  // browser manipulation
  beginAction = (action: Action | null, keys: string[] | null) => {
    this.setState({
      activeAction: action,
      actionTargets: keys || [],
    })
  }

  endAction = () => {
    if (this.state.selection && this.state.selection.length > 0) {
      if(this.state.selection.filter((selection) => selection.match(regexForNewFolderOrFileSelection)).length > 0) {
        this.setState({ selection: [] })
      }
    }
    this.beginAction(null, null)
  }

  // Looks like this allows selection of multiple elements?
  select = (key: string, selectedType: 'file' | 'folder', ctrlKey, shiftKey) => {
    const { actionTargets } = this.state
    const shouldClearState = actionTargets.length && !actionTargets.includes(key)
    const selected = this.getFile(key)

    // TODO: This shouldn't happen I think, but we do it since getFile can return undefined
    if(!selected) return

    let newSelection = [key]
    if (ctrlKey || shiftKey) {
      const indexOfKey = this.state.selection.indexOf(key)
      if (indexOfKey !== -1) {
        newSelection = [...this.state.selection.slice(0, indexOfKey), ...this.state.selection.slice(indexOfKey + 1)]
      } else {
        newSelection = [...this.state.selection, key]
      }
    }

    this.setState(prevState => ({
      selection: newSelection,
      actionTargets: shouldClearState ? [] : actionTargets,
      activeAction: shouldClearState ? null : prevState.activeAction,
    }), () => {
      this.props.onSelect?.(selected)

      if (selectedType === 'file') this.props.onSelectFile?.(selected)
      if (selectedType === 'folder') this.props.onSelectFolder?.(selected)
    })
  }

  preview = (file: FileBrowserFile) => {
    if (this.state.previewFile && this.state.previewFile.key !== file.key) this.closeDetail()

    this.setState({
      previewFile: file,
    }, () => {
      this.props.onPreviewOpen?.(file)
    })
  }

  closeDetail = () => {
    this.setState({
      previewFile: null,
    }, () => {
      this.props.onPreviewClose?.(this.state.previewFile)
    })
  }

  handleShowMoreClick = (event: React.FormEvent) => {
    event.preventDefault()
    this.setState(prevState => ({
      searchResultsShown: prevState.searchResultsShown + SEARCH_RESULTS_PER_PAGE,
    }))
  }

  toggleFolder = (folderKey: string) => {
    const folder = this.getFile(folderKey)
    if(!folder) return // TODO: Shouldn't fail silently?

    const isOpen = folderKey in this.state.openFolders
    this.setState(prevState => {
      const stateChanges = {
        openFolders: { ...prevState.openFolders },
      }
      if (isOpen) {
        delete stateChanges.openFolders[folderKey]
      } else {
        stateChanges.openFolders[folderKey] = true
      }
      return stateChanges
    }, () => {
      const callback = isOpen ? this.props.onFolderClose : this.props.onFolderOpen
      callback?.(folder)
    })
  }

  openFolder = (folderKey: string) => {
    const folder = this.getFile(folderKey)
    if(!folder) return // TODO: Shouldn't fail silently?

    this.setState(prevState => ({
      openFolders: {
        ...prevState.openFolders,
        [folderKey]: true,
      },
    }), () => {
      this.props.onFolderOpen?.(folder)
    })
  }

  // event handlers
  handleGlobalClick = (event: React.FormEvent) => {
    const inBrowser = !!(this.browserRef && this.browserRef.contains(event.target))

    if (!inBrowser) {
      this.setState({
        selection: [],
        actionTargets: [],
        activeAction: null,
      })
    }
  }
  handleActionBarRenameClick = (event: React.FormEvent) => {
    event.preventDefault()
    this.beginAction('rename', this.state.selection)
  }
  handleActionBarDeleteClick = (event: React.FormEvent) => {
    event.preventDefault()
    this.beginAction('delete', this.state.selection)
  }
  handleActionBarAddFolderClick = (event: React.FormEvent) => {
    event.preventDefault()
    if (this.state.activeAction === 'createFolder') {
      return
    }
    this.setState((prevState) => {
      let addKey = ''
      if (prevState.selection && prevState.selection.length > 0) {
        addKey += prevState.selection
        if (addKey.substr(addKey.length - 1, addKey.length) !== '/') {
          addKey += '/'
        }
      }

      if (addKey !== '__new__/' && !addKey.endsWith('/__new__/')) addKey += '__new__/'
      const stateChanges = {
        ...prevState,
        actionTargets: [addKey],
        activeAction: 'createFolder',
        selection: [addKey],
      }
      if (prevState.selection && prevState.selection.length > 0) {
        stateChanges.openFolders = {
          ...prevState.openFolders,
          [this.state.selection[0]]: true, // TODO: added [0], not sure if correct
        }
      }
      return stateChanges
    })
  }
  handleActionBarDownloadClick = (event: React.FormEvent) => {
    event.preventDefault()

    const files = this.getFiles()
    const selectedItems = this.getSelectedItems(files)

    const selectionIsFolder = (selectedItems.length === 1 && isFolder(selectedItems[0]))
    if (selectionIsFolder) {
      this.downloadFolder(this.state.selection)
      return
    }

    this.downloadFile(this.state.selection)
  }

  updateFilter = (newValue: string) => {
    this.setState({
      nameFilter: newValue,
      searchResultsShown: SEARCH_RESULTS_PER_PAGE,
    })
  }

  getBrowserProps(): RawFileBrowserProps {
    return {
      // browser config
      nestChildren: this.props.nestChildren,
      fileRenderer: this.props.fileRenderer,
      fileRendererProps: this.props.fileRendererProps,
      folderRenderer: this.props.folderRenderer,
      folderRendererProps: this.props.folderRendererProps,
      confirmDeletionRenderer: this.props.confirmDeletionRenderer,
      confirmMultipleDeletionRenderer: this.props.confirmMultipleDeletionRenderer,
      icons: this.props.icons,

      // browser state
      openFolders: this.state.openFolders,
      nameFilter: this.state.nameFilter,
      selection: this.state.selection,
      activeAction: this.state.activeAction,
      actionTargets: this.state.actionTargets,

      // browser manipulation
      select: this.select,
      openFolder: this.openFolder,
      toggleFolder: this.toggleFolder,
      beginAction: this.beginAction,
      endAction: this.endAction,
      preview: this.preview,

      // item manipulation
      createFiles: this.props.onCreateFiles ? this.createFiles : undefined,
      createFolder: this.props.onCreateFolder ? this.createFolder : undefined,
      renameFile: this.props.onRenameFile ? this.renameFile : undefined,
      renameFolder: this.props.onRenameFolder ? this.renameFolder : undefined,
      moveFile: this.props.onMoveFile ? this.moveFile : undefined,
      moveFolder: this.props.onMoveFolder ? this.moveFolder : undefined,
      deleteFile: this.props.onDeleteFile ? this.deleteFile : undefined,
      deleteFolder: this.props.onDeleteFolder ? this.deleteFolder : undefined,

      getItemProps: getItemProps,
    }
  }

  renderActionBar(selectedItems) {
    const {
      icons,
      canFilter,
      filterRendererProps,
      filterRenderer: FilterRenderer,
      actionRenderer: ActionRenderer,
      onCreateFolder,
      onRenameFile,
      onRenameFolder,
      onDeleteFile,
      onDeleteFolder,
      onDownloadFile,
      onDownloadFolder,
    } = this.props
    const browserProps = this.getBrowserProps()
    const selectionIsFolder = (selectedItems.length === 1 && isFolder(selectedItems[0]))
    let filter
    if (canFilter && FilterRenderer) {
      filter = (
        <FilterRenderer
          value={this.state.nameFilter}
          updateFilter={this.updateFilter}
          {...filterRendererProps}
        />
      )
    }

    const actions = (
      <ActionRenderer
        browserProps={browserProps}

        selectedItems={selectedItems}
        isFolder={selectionIsFolder}

        icons={icons}
        nameFilter={this.state.nameFilter}

        canCreateFolder={typeof onCreateFolder === 'function'}
        onCreateFolder={this.handleActionBarAddFolderClick}

        canRenameFile={typeof onRenameFile === 'function'}
        onRenameFile={this.handleActionBarRenameClick}

        canRenameFolder={typeof onRenameFolder === 'function'}
        onRenameFolder={this.handleActionBarRenameClick}

        canDeleteFile={typeof onDeleteFile === 'function'}
        onDeleteFile={this.handleActionBarDeleteClick}

        canDeleteFolder={typeof onDeleteFolder === 'function'}
        onDeleteFolder={this.handleActionBarDeleteClick}

        canDownloadFile={typeof onDownloadFile === 'function'}
        onDownloadFile={this.handleActionBarDownloadClick}

        canDownloadFolder={typeof onDownloadFolder === 'function'}
        onDownloadFolder={this.handleActionBarDownloadClick}
      />
    )

    return (
      <div className="action-bar">
        {filter}
        {actions}
      </div>
    )
  }

  renderFiles(files: FileBrowserTree, depth: number): React.ReactNode[] {
    const {
      fileRenderer: FileRenderer,
      fileRendererProps,
      folderRenderer: FolderRenderer,
      folderRendererProps,
    } = this.props
    const browserProps = this.getBrowserProps()
    let renderedFiles: ReactNode[] = []

    files.map((file) => {
      const thisItemProps = {
        ...browserProps.getItemProps(file, browserProps),
        depth: this.state.nameFilter ? 0 : depth,
      }

      if (!isFolder(file)) {
        renderedFiles.push(
          <FileRenderer
            {...file}
            {...thisItemProps}
            browserProps={browserProps}
            {...fileRendererProps}
          />
        )
      } else {
        if (this.props.showFoldersOnFilter || !this.state.nameFilter) {
          renderedFiles.push(
            <FolderRenderer
              {...file}
              {...thisItemProps}
              browserProps={browserProps}
              {...folderRendererProps}
            />
          )
        }
        if (this.state.nameFilter || (thisItemProps.isOpen && !browserProps.nestChildren)) {
          renderedFiles = renderedFiles.concat(this.renderFiles(file.children, depth + 1))
        }
      }
    })
    return renderedFiles
  }

  handleMultipleDeleteSubmit = () => {
    console.log(this)
    this.deleteFolder(this.state.selection.filter(selection => selection[selection.length - 1] === '/'))
    this.deleteFile(this.state.selection.filter(selection => selection[selection.length - 1] !== '/'))
  }

  getFiles() {
    let files = this.props.files.concat([])
    if (this.state.activeAction === 'createFolder') {
      files.push({
        key: this.state.actionTargets[0],
        size: 0,
        draft: true,
      })
    }
    if (this.state.nameFilter) {
      const filteredFiles: FileBrowserTree = []
      const terms = this.state.nameFilter.toLowerCase().split(' ')
      files.map((file) => {
        let skip = false
        terms.map((term) => {
          if (file.key.toLowerCase().trim().indexOf(term) === -1) {
            skip = true
          }
        })
        if (skip) {
          return
        }
        filteredFiles.push(file)
      })
      files = filteredFiles
    }
    if (typeof this.props.group === 'function') {
      files = this.props.group(files, '')
    } else {
      const newFiles: FileBrowserTree = []
      files.map((file) => {
        if (!isFolder(file)) {
          newFiles.push(file)
        }
      })
      files = newFiles
    }
    if (typeof this.props.sort === 'function') {
      files = this.props.sort(files)
    }
    return files
  }

  getSelectedItems(files: FileBrowserTree) {
    const { selection } = this.state // TODO: That's a bit odd...
    const selectedItems: FileBrowserTree = []
    const findSelected = (item: FileBrowserTreeNode) => {
      if (isFolderType(item)) {
        item.children.map(findSelected)
      } else {
        selectedItems.push(item)
      }
    }
    files.map(findSelected)
    return selectedItems
  }

  render() {
    const browserProps = this.getBrowserProps()
    const headerProps: HeaderRendererProps = {
      browserProps,
      fileKey: '',
      fileCount: this.props.files.length,
    }
    let renderedFiles

    const files = this.getFiles()
    const selectedItems = this.getSelectedItems(files)

    let header
    /** @type any */
    let contents: React.ReactNode[] = this.renderFiles(files, 0)
    switch (this.props.renderStyle) {
      case 'table':
        if (!Array.isArray(contents)) {
          if (this.state.nameFilter) {
            contents = [
              <tr>
                <td colSpan={100}>
                  No files matching "{this.state.nameFilter}".
                </td>
              </tr>
            ]
          } else {
            contents = [
              <tr>
                <td colSpan={100}>
                  {this.props.noFilesMessage}
                </td>
              </tr>
            ]
          }
        } else {
          if (this.state.nameFilter) {
            const numFiles = contents.length
            contents = contents.slice(0, this.state.searchResultsShown)
            if (numFiles > contents.length) {
              contents.push(
                <tr key="show-more">
                  <td colSpan={100}>
                    <a
                      onClick={this.handleShowMoreClick}
                      href="#"
                    >
                      Show more results
                    </a>
                  </td>
                </tr>
              )
            }
          }
        }

        if (this.props.headerRenderer) {
          header = (
            <thead>
              <this.props.headerRenderer
                {...headerProps}
                {...this.props.headerRendererProps}
              />
            </thead>
          )
        }

        renderedFiles = (
          <table cellSpacing="0" cellPadding="0">
            {header}
            <tbody>
              {contents}
            </tbody>
          </table>
        )
        break

      case 'list':
        if (!Array.isArray(contents)) {
          if (this.state.nameFilter) {
            contents = [<p className="empty">No files matching "{this.state.nameFilter}"</p>]
          } else {
            contents = [<p className="empty">No files.</p>]
          }
        } else {
          let more
          if (this.state.nameFilter) {
            const numFiles = contents.length
            contents = contents.slice(0, this.state.searchResultsShown)
            if (numFiles > contents.length) {
              more = (
                <a
                  onClick={this.handleShowMoreClick}
                  href="#"
                >
                  Show more results
                </a>
              )
            }
          }
          contents = [
            <div>
              <ul>{contents}</ul>
              {more}
            </div>
          ]
        }

        if (this.props.headerRenderer) {
          header = (
            <this.props.headerRenderer
              {...headerProps}
              {...this.props.headerRendererProps}
            />
          )
        }

        renderedFiles = (
          <div>
            {header}
            {contents}
          </div>
        )
        break
    }

    const ConfirmMultipleDeletionRenderer = this.props.confirmMultipleDeletionRenderer

    return (
      <div className="rendered-react-keyed-file-browser">
        {this.props.actions}
        <div className="rendered-file-browser" ref={el => { this.browserRef = el }}>
          {this.props.showActionBar && this.renderActionBar(selectedItems)}
          {this.state.activeAction === 'delete' && this.state.selection.length > 1 &&
            <ConfirmMultipleDeletionRenderer
              handleDeleteSubmit={this.handleMultipleDeleteSubmit}
            />}
          <div className="files">
            {renderedFiles}
          </div>
        </div>
        {this.state.previewFile && (
          <this.props.detailRenderer
            file={this.state.previewFile}
            close={this.closeDetail}
            {...this.props.detailRendererProps}
          />
        )}
      </div>
    )
  }
}

class FileBrowser extends Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <RawFileBrowser {...this.props} />
      </DndProvider>
    )
  }
}

export default FileBrowser

export { RawFileBrowser }

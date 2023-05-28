import React from 'react'
import { RawFileBrowser } from './browser'

export interface FileBrowserFile {
    key: string
    keyOnDisk?: string // Key on physical storage (directory with all versions)
    modified?: number
    size?: number
    url?: string

    // added runtime (in 'preview' at least)
    name?: string
    extension?: string
}

export interface FileBrowserWindow {
    name: string
    begins: Date
    ends: Date
    //items: string[]
    items: FileBrowserTreeFileNode[]
}

export type FileBrowserFolder = FileBrowserFile

// #region filters
declare class DefaultFilter extends React.Component<FilterRendererProps> {
}

export declare const Filters: {
    DefaultFilter: DefaultFilter
}
// #endregion filters

export type Draft = {
    key: string;
    size: 0;
    draft: true
    name?: string // added runtime
}
export const isDraftType = (file: FileBrowserTreeNode): file is FileBrowserTreeGroupNode => {
    return 'draft' in file
}


export type FileBrowserFileOrDraft =
    | FileBrowserFile
    | Draft

export type FileBrowserTreeFileNode = FileBrowserFile & { keyDerived?: boolean, action?: ActionType }
export type FileBrowserTreeGroupNode = FileBrowserFileOrDraft & {
    keyDerived?: boolean
    relativeKey: string
    children: FileBrowserTree
    action?: ActionType
}

export type FileBrowserTreeNode =
    | FileBrowserTreeFileNode
    | FileBrowserTreeGroupNode

export const isFolderType = (file: FileBrowserTreeNode): file is FileBrowserTreeGroupNode => {
    return file.key.endsWith('/')
}

export const isDraft = (file: FileBrowserTreeNode): file is Draft => {
    return 'draft' in file
}

export type FileBrowserTree = FileBrowserTreeNode[]

// #region groupers
export type Grouper = (
    files: FileBrowserFileOrDraft[],
    root: string
) => FileBrowserTree

export declare const Groupers: {
    GroupByFolder: Grouper
    GroupByModifiedRelative: Grouper
}
// #endregion groupers

// #region sorters
export type Sorter = (
    files: FileBrowserTree,
    root: string
) => FileBrowserTree

export declare const Sorters: {
    SortByName: Sorter
    SortByModified: Sorter
}
// #endregion sorters

// #region icons
export type FontAwesomeVersion = 4 | 5

export type IconsProp = {
    [key: string]: JSX.Element
    /*File: JSX.Element
    Image: JSX.Element
    Video: JSX.Element
    Audio: JSX.Element
    Archive: JSX.Element
    Word: JSX.Element
    Excel: JSX.Element
    PowerPoint: JSX.Element
    Text: JSX.Element
    PDF: JSX.Element
    Rename: JSX.Element
    Folder: JSX.Element
    FolderOpen: JSX.Element
    Delete: JSX.Element
    Loading: JSX.Element
    Download: JSX.Element*/
}

// #endregion icons

// #region handlers
type CreateFilesHandler = (files: File[], prefix: string) => void
type CreateFolderHandler = (key: string) => void
type MoveFileHandler = (oldFileKey: string, newFileKey: string) => void
type MoveFolderHandler = (oldFolderKey: string, newFolderKey: string) => void
type RenameFileHandler = (oldFileKey: string, newFileKey: string) => void
type RenameFolderHandler = (oldFolderKey: string, newFolderKey: string) => void
type DeleteFileHandler = (fileKey: string) => void
type DeleteFolderHandler = (folderKey: string) => void
type DownloadFileHandler = (keys: string[]) => void
type DownloadFolderHandler = (keys: string[]) => void
// #endregion handlers

// #region renderers

// Header
export type HeaderRendererProps = ItemProps & {
    select: (value: string) => void
    fileKey: string
    fileCount: number
    browserProps: RendererBrowserProps
    connectDropTarget?: (element: JSX.Element) => JSX.Element
}

export type HeaderRenderer = (
    props: HeaderRendererProps
) => JSX.Element

// Filter
export type FilterRendererProps<P = {}> = {
    value: string
    updateFilter: (newValue: string) => void
} & P

export type FilterRenderer<P = {}> = (
    props: FilterRendererProps<P>
) => JSX.Element

// File and Folder
export type FolderAndFileRendererProps<P = {}> = ItemProps &
    P & {
    browserProps: RendererBrowserProps
    depth: number
    newName?: string
    newKey?: string // TODO: Very weird that this is here. it is internal to base-file
    connectDragSource?: (element: JSX.Element) => JSX.Element
    connectDropTarget?: (element: JSX.Element) => JSX.Element
    connectDragPreview?: (element: JSX.Element) => JSX.Element
    url?: string
    thumbnail_url?: string
}

export type FileRendererProps<P = {}> = FileBrowserTreeFileNode &
    FolderAndFileRendererProps<P>

export type FileRenderer<P = {}> = (props: FileRendererProps<P>) => JSX.Element

export type FileProps = {
    showName: boolean,
    showSize: boolean,
    showModified: boolean,
    isSelectable: boolean,
}

export type FolderRendererProps<P = {}> = FileBrowserTreeGroupNode &
    FolderAndFileRendererProps<P>

export type FolderRenderer<P = {}> = (
    props: FolderRendererProps<P>
) => JSX.Element

// Detail

export type DetailRendererProps<P = {}> = {
    file: FileBrowserTreeFileNode
    close: () => void
} & P

// TODO: These are probably not correct
export type DraggedFile = {
    key: string
    files?: File[]
}

export type DropResult = {
    path: string
}

export type DetailRenderer<P = {}> = (
    props: DetailRendererProps<P>
) => JSX.Element

// Action

export interface ActionRendererProps {
    browserProps: RendererBrowserProps

    selectedItems: FileBrowserTree
    isFolder: boolean

    icons: IconsProp
    nameFilter: string

    canCreateFolder: boolean
    onCreateFolder: (event: React.FormEvent) => void

    canRenameFile: boolean
    onRenameFile: (event: React.FormEvent) => void

    canRenameFolder: boolean
    onRenameFolder: (event: React.FormEvent) => void

    canDeleteFile: boolean
    onDeleteFile: (event: React.FormEvent) => void

    canDeleteFolder: boolean
    onDeleteFolder: (event: React.FormEvent) => void

    canDownloadFile: boolean
    onDownloadFile: (event: React.FormEvent) => void

    canDownloadFolder: boolean
    onDownloadFolder: (event: React.FormEvent) => void
}

export type ActionRenderer = (
    props: ActionRendererProps
) => JSX.Element


// Confirm Deletion

export interface ConfirmDeletionRendererProps {
    children: string | JSX.Element | (string | JSX.Element)[]
    handleDeleteSubmit: (event: React.FormEvent) => void
    handleFileClick: (event: React.MouseEvent) => void
    url?: string
}

export type ConfirmDeletionRenderer = (
    props: ConfirmDeletionRendererProps
) => JSX.Element

// ConfirmMultipleDeletionRenderer

export interface ConfirmMultipleDeletionRendererProps {
    handleDeleteSubmit: (event: React.FormEvent) => void
}

export type ConfirmMultipleDeletionRenderer = (
    props: ConfirmMultipleDeletionRendererProps
) => JSX.Element

// #endregion renderers

// #region renderer-browser-props
export type ActionType = 'rename' | 'delete' | 'createFolder'

export interface ItemProps {
    key: string
    fileKey: string
    isSelected: boolean
    isOver: boolean
    isOpen: boolean
    isRenaming: boolean
    isDeleting: boolean
    isDraft: boolean
    isDragging: boolean // TODO: Probably doesn't belong here?
}

export interface RendererBrowserProps {
    // browser config
    nestChildren: boolean
    fileRenderer: FileRenderer
    fileRendererProps?: FileRendererProps
    folderRenderer: FolderRenderer
    folderRendererProps?: FolderRendererProps
    confirmDeletionRenderer: ConfirmDeletionRenderer
    confirmMultipleDeletionRenderer: ConfirmMultipleDeletionRenderer
    icons: IconsProp

    // browser state
    openFolders: { [prefix: string]: boolean }
    nameFilter: string
    selection: string[]
    activeAction: ActionType | null
    actionTargets: string[]

    // browser manipulation
    select: (
        key: string,
        selectedType?: 'file' | 'folder',
        ctrlKey?: boolean,
        shiftKey?: boolean
    ) => void
    openFolder: (folderKey: string) => void
    toggleFolder: (folderKey: string) => void
    beginAction: (action: ActionType | null, keys: string[] | null) => void
    endAction: () => void
    preview: (file: FileBrowserFile & { name: string, extension: string }) => void

    // item manipulation
    createFiles?: CreateFilesHandler
    createFolder?: CreateFolderHandler
    renameFile?: RenameFileHandler
    renameFolder?: RenameFolderHandler
    moveFile?: MoveFileHandler
    moveFolder?: MoveFolderHandler
    deleteFile?: DeleteFileHandler
    deleteFolder?: DeleteFolderHandler

    getItemProps: (
        file: FileBrowserTreeNode,
        browserProps: RendererBrowserProps
    ) => ItemProps
}

// #endregion renderer-browser-props

// #region file-browser-props

// This way of declaring props is really confusing, but it makes it possible to
// have non-optional props here that are not required on the react tag when
// calling the RawFileBrowser component.
export type FileBrowserProps = typeof RawFileBrowser.defaultProps & {
    files: (FileBrowserFile | Draft)[]
    actions?: JSX.Element
    showActionBar: boolean
    canFilter: boolean
    showFoldersOnFilter?: boolean,
    noFilesMessage: string | JSX.Element

    group?: Grouper
    sort?: Sorter

    icons: IconsProp

    nestChildren: boolean
    renderStyle: 'list' | 'table'

    startOpen: boolean

    headerRenderer: HeaderRenderer
    headerRendererProps: HeaderRendererProps
    filterRenderer: FilterRenderer
    filterRendererProps?: FilterRendererProps
    fileRenderer: FileRenderer
    fileRendererProps?: FileRendererProps
    folderRenderer: FolderRenderer
    folderRendererProps?: FolderRendererProps
    detailRenderer: DetailRenderer
    detailRendererProps?: DetailRendererProps
    actionRenderer: ActionRenderer
    confirmDeletionRenderer: ConfirmDeletionRenderer
    confirmMultipleDeletionRenderer: ConfirmMultipleDeletionRenderer

    onCreateFiles?: CreateFilesHandler
    onCreateFolder?: CreateFolderHandler
    onMoveFile?: MoveFileHandler
    onMoveFolder?: MoveFolderHandler
    onRenameFile?: RenameFileHandler
    onRenameFolder?: RenameFolderHandler
    onDeleteFile?: DeleteFileHandler
    onDeleteFolder?: DeleteFolderHandler
    onDownloadFile?: DownloadFileHandler
    onDownloadFolder?: DownloadFolderHandler,

    onSelect: (fileOrFolder: FileBrowserFile | FileBrowserFolder) => void
    onSelectFile: (file: FileBrowserFile) => void
    onSelectFolder: (folder: FileBrowserFolder) => void

    onPreviewOpen: (file: FileBrowserFile) => void
    onPreviewClose: (file: FileBrowserFile) => void

    onFolderOpen: (folder: FileBrowserFolder) => void
    onFolderClose: (folder: FileBrowserFolder) => void

    onSave?: (key: string) => void
    onLoad?: (key: string) => void

    mode?: 'save' | 'load'
}

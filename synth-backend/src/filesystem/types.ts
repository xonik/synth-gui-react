export class FileNotFoundException extends Error {
}

export type FileTreeEntry = {
    key: string
    size: number
}

export type FileEntry = {
    name: string,
    keyOnDisk: string,
    type: 'file'
    parent?: FolderEntry
}

export type FolderEntry = {
    name: string,
    type: 'folder'
    contents: (FileEntry | FolderEntry)[]
    parent?: FolderEntry
}
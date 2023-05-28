import { FileEntry, FolderEntry } from './types'

export const splitKey = (key: string) => {
    // root folder
    if(key === ''){
        return ['', '']
    }

    // A directory
    if(key.endsWith('/')){
        return [key, '']
    }
    const lastSlash = key.lastIndexOf('/')

    // A file on root
    if(key.lastIndexOf('/') === -1){
        return ['', key]
    }

    // any other file
    return [
        key.slice(0, lastSlash + 1),
        key.slice(lastSlash + 1)
    ]
}

export const isFile = (file: FileEntry | FolderEntry): file is FileEntry => {
    return 'keyOnDisk' in file
}

export const getPathParts = (path: string) => {
    if(path.endsWith('/')){
        return path.slice(0, path.length - 1).split('/')
    }
    return path.split('/')
}

export const getFilesRecursively = (folder: FolderEntry): FileEntry[] => {
    // @ts-ignore
    const files: FileEntry[] = (folder.contents.filter((child) => isFile(child)))

    // @ts-ignore
    const folders: FolderEntry[] = folder.contents.filter((child) => !isFile(child))

    const childFiles = folders.flatMap((childFolder) => getFilesRecursively(childFolder))

    return [
        ...files,
        ...childFiles,
    ]
}

export const getAsJSONString = (entry: FolderEntry) => {
    // Ignore parent on write as it is a cyclic reference
    const replacer = (key: string, value: string) => (key === "parent") ? undefined : value
    return JSON.stringify(entry, replacer, 2)
}
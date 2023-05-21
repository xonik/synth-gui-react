import { FileEntry, FolderEntry } from './types'

export const splitKey = (key: string) => {
    const lastSlash = key.slice(1).lastIndexOf('/')
    if(lastSlash){
        return [
            key.slice(0, lastSlash + 2),
            key.slice(lastSlash + 2)
        ]
    } else {
        return [
            key,
            ''
        ]
    }
}

export const isFile = (file: FileEntry | FolderEntry): file is FileEntry => {
    return 'keyOnDisk' in file
}

export const getPathParts = (path: string) => {
    if(!path.startsWith('/')){
        throw Error(`Only absolute paths are supported, ${path} does not start with /`)
    }

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
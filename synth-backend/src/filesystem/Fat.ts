import { readFileSync } from 'fs'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import { getAsJSONString, getFilesRecursively, getPathParts } from './fileUtils.js'
import { FileEntry, FileNotFoundException, FileTreeEntry, FolderEntry } from './types.js'

/**
 * A virtual file system (File Allocation Table) that maps between a path
 * and a file on disk. Files on disk are stored in a single directory with
 * a subdirectory pr file. Each file is mapped to a directory using a unique ID.
 * This allows us to keep the same file id when moving and renaming files,
 * and we can link directly to a file in for example a performance/multi patch setup
 * without thinking about updating it if the patch file is moved.
 */
export class Fat {
    root: FolderEntry

    constructor(private rootOnDisk: string) {
        this.root = this.readFromDisk()
    }

    readFromDisk() {
        // Recreate parent on read
        try {
            console.log('Reading fat from disk')
            const fat = JSON.parse(readFileSync(`${this.rootOnDisk}${FAT_FILE_NAME}`, 'utf8'))
            this.setParentOnContents(fat)
            return fat
        } catch (err) {
            console.log('Fat not found, creating blank')
            return {
                name: '',
                type: 'folder',
                contents: []
            }
        }
    }

    private async writeToDisk() {
        console.log('Writing fat to disk')

        await fs.writeFile(
            `${this.rootOnDisk}${FAT_FILE_NAME}`,
            getAsJSONString(this.root),
            'utf8'
        );
    }

    private setParentOnContents(parent: FolderEntry) {
        parent.contents.forEach((child) => {
            child.parent = parent
            if (child.type === 'folder') {
                this.setParentOnContents(child)
            }
        })
    }

    private getFolderWithCreate(path: string): FolderEntry {
        const pathParts = getPathParts(path)
        console.log(`Getting folder ${path}`, { pathParts })

        // split will always give one element which is root.
        let folder: FolderEntry = this.root
        for (let i = 0; i < pathParts.length; i++) {
            const childPath = pathParts[i]
            const childFolder = folder.contents.find((node) => node.name === childPath)
            if (childFolder) {
                if (childFolder.type === 'folder') {
                    folder = childFolder
                } else {
                    throw new Error(`Found file ${childPath} when expecting a folder`)
                }
            } else {
                console.log(`Creating folder ${childPath}`)
                const newChildFolder: FolderEntry = {
                    name: childPath,
                    type: 'folder',
                    contents: []
                }
                folder.contents.push(newChildFolder)
                newChildFolder.parent = folder
                folder = newChildFolder
            }
        }

        return folder
    }

    private getFolder(path: string): FolderEntry | undefined {
        const pathParts = getPathParts(path)
        console.log(`Getting folder ${path}`, { pathParts })

        let folder: FolderEntry = this.root
        for (let i = 0; i < pathParts.length; i++) {
            const childPath = pathParts[i]
            const childFolder = folder.contents.find((node) => node.name === childPath)
            if (!childFolder) {
                return undefined
            }
            if (childFolder.type === 'file') {
                throw Error(`Found a file when expecting a folder at path ${path}`)
            }
            folder = childFolder
        }
        return folder
    }

    getPath(keyOnDisk: string) {
        // A bit inefficient as it serialises the whole fat, on average we could get
        // the result 50% faster by searching but probably not a necessary optimization
        const entries = this.flatten()
        const entry = entries.find((entry) => entry.keyOnDisk === keyOnDisk)
        if (!entry) {
            throw new FileNotFoundException(`No entry for ${keyOnDisk} found`)
        }
        return entry.key
    }

    async createFile(path: string, filename: string) {
        const keyOnDisk = uuidv4()

        console.log(`Creating file ${path} ${filename}, keyOnDisk is ${keyOnDisk}`)
        const newFile: FileEntry = {
            name: filename,
            type: 'file',
            keyOnDisk
        }
        const folder = this.getFolderWithCreate(path)
        folder.contents.push(newFile)
        newFile.parent = folder
        await this.writeToDisk()
        return keyOnDisk
    }

    async createFolder(path: string) {
        this.getFolderWithCreate(path)
        await this.writeToDisk()
    }

    getFileFromFolder(folder: FolderEntry, key: string): FileEntry | undefined {
        const entry = folder.contents.find((entry) => entry.name === key && entry.type === 'file')
        if (entry && entry.type === 'file') {
            return entry
        }
        return undefined
    }

    getFileKeyOnDisk(path: string, filename: string) {
        const folder = this.getFolder(path)
        if (!folder) return undefined

        const entry = folder.contents.find((entry) => entry.name === filename && entry.type === 'file')
        if (entry && entry.type === 'file') {
            return entry.keyOnDisk
        }
        return undefined
    }

    // Delete returns id of deleted file
    async deleteFile(path: string, filename: string) {
        const folder = this.getFolder(path)
        if (!folder) return ''

        const file = this.getFileFromFolder(folder, filename)
        if (file) {
            const index = folder.contents.indexOf(file);
            folder.contents.splice(index, 1);
            await this.writeToDisk()
            return file.keyOnDisk
        }
    }

    // Delete returns the id of all deleted files
    async deleteFolder(path: string) {
        const folder = this.getFolder(path)
        if (!folder) return []

        const parent = folder.parent
        if (parent) {
            const index = parent.contents.indexOf(parent);
            console.log('Parent', parent)
            parent.contents.splice(index - 1, 1);
            console.log('Parent after', parent)

        }
        await this.writeToDisk()

        return getFilesRecursively(folder).map((file) => file.keyOnDisk)
    }

    async renameFile(path: string, oldName: string, newName: string) {
        if (newName === '') {
            throw Error(`Cannot rename file, new file name cannot be blank`)
        }

        if (oldName === '') {
            throw Error(`Cannot rename file, old file name cannot be blank`)
        }

        const folder = this.getFolder(path)
        if (folder) {
            if (folder.contents.find((child) => child.name === newName)) {
                throw Error(`Cannot rename file as ${path}${newName} already exists`)
            }
            const file = this.getFileFromFolder(folder, oldName)
            if (file) file.name = newName
        }
        await this.writeToDisk()
    }

    async renameFolder(path: string, newName: string) {
        if (newName === '') {
            throw Error(`Cannot rename folder, new folder name cannot be blank`)
        }
        const folder = this.getFolder(path)
        if (folder) {
            if (folder.parent?.contents.find((child) => child.name === newName)) {
                throw Error(`Cannot rename folder as ${path}${newName} already exists`)
            }

            folder.name = newName
        }
        await this.writeToDisk()
    }

    async moveFile(filename: string, fromPath: string, toPath: string) {
        const oldFolder = this.getFolder(fromPath)
        if (!oldFolder) throw new FileNotFoundException(`Path ${fromPath} does not exist`)

        const file = this.getFileFromFolder(oldFolder, filename)
        if (!file) throw new FileNotFoundException(`File ${filename} does not exist`)

        const newFolder = this.getFolderWithCreate(toPath)

        const index = oldFolder.contents.indexOf(file);
        oldFolder.contents = oldFolder.contents.splice(index, 1);

        newFolder.contents.push(file)
        file.parent = newFolder
        await this.writeToDisk()
    }

    async moveFolder(folderPath: string, toPath: string) {
        const folderToMove = this.getFolder(folderPath)
        if (!folderToMove) throw new FileNotFoundException(`Path ${folderPath} does not exist`)

        const targetFolder = this.getFolderWithCreate(toPath)

        targetFolder.contents.push(folderToMove)

        const parent = folderToMove.parent
        if (parent) {
            const index = parent.contents.indexOf(folderToMove);
            parent.contents = parent.contents.splice(index, 1);
            console.log(`Removed ${folderPath} from ${parent.name}`)
        }

        folderToMove.parent = targetFolder
        await this.writeToDisk()
    }

    flatten(parentPath: string = '', entry?: FolderEntry | FileEntry): FileTreeEntry[] {
        if (entry) {
            const path = `${parentPath}${entry.name}${entry.type === 'folder' ? '/' : ''}`
            const fileTreeEntry = {
                key: path,
                size: 0,
                keyOnDisk: entry?.type === 'file' ? entry.keyOnDisk : ''
            }
            const children = entry.type === 'file'
                ? []
                : entry.contents.flatMap(child =>
                    this.flatten(path, child)
                )
            return [
                fileTreeEntry,
                ...children
            ]
        } else {
            return [
                ...this.root.contents.flatMap(child =>
                    this.flatten('', child)
                )
            ]
        }
    }
}

const FAT_FILE_NAME = 'fat.json'





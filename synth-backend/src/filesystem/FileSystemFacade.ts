import * as fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid';
import { existsSync, readFileSync } from 'fs'
import { getPathParts } from './fileUtils.js'

export type FileTreeEntry = {
    key: string
    size: number
}

export type FileMetadata = {
    currentVersion: string,
}

const METADATA_FILE_NAME = 'metadata'
const FAT_FILE_NAME = 'fat.json'

export class FileNotFoundException extends Error {
}

type FileEntry = {
    name: string,
    keyOnDisk: string,
    type: 'file'
    parent?: FolderEntry
}

type FolderEntry = {
    name: string,
    type: 'folder'
    contents: (FileEntry | FolderEntry)[]
    parent?: FolderEntry
}



/**
 * A virtual file system (File Allocation Table) that maps between a path
 * and a file on disk. Files on disk are stored in a single directory with
 * a subdirectory pr file. Each file is mapped to a directory using an unique ID.
 * This allows us to keep the same file id when moving and renaming files,
 * and we can link directly to a file in for example a performance/multi patch setup
 * without thinking about updating it if the patch file is moved.
 */
class Fat {
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

    async writeToDisk() {
        console.log('Writing fat to disk')
        // Ignore parent on write as it is a cyclic reference
        const replacer = (key: string, value: string) => (key === "parent") ? undefined : value

        await fs.writeFile(
            `${this.rootOnDisk}${FAT_FILE_NAME}`,
            JSON.stringify(this.root, replacer, 2),
            'utf8'
        );
    }

    setParentOnContents(parent: FolderEntry) {
        parent.contents.forEach((child) => {
            child.parent = parent
            if (child.type === 'folder') {
                this.setParentOnContents(child)
            }
        })
    }

    getFolderWithCreate(path: string): FolderEntry {
        const pathParts = getPathParts(path)
        console.log(`Getting folder ${path}`, {pathParts})

        // split will always give one element which is root.
        let folder: FolderEntry = this.root
        for(let i=1; i<pathParts.length; i++){
            const childPath = pathParts[i]
            const childFolder = folder.contents.find((node) => node.name === childPath)
            if(childFolder){
                if(childFolder.type === 'folder') {
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

    getFolder(path: string): FolderEntry | undefined {
        const pathParts = getPathParts(path)
        console.log(`Getting folder ${path}`, {pathParts})

        let folder: FolderEntry = this.root
        for(let i=1; i<pathParts.length; i++){
            const childPath = pathParts[i]
            const childFolder = folder.contents.find((node) => node.name === childPath)
            if(!childFolder){
                return undefined
            }
            if(childFolder.type === 'file'){
                throw Error(`Found a file when expecting a folder at path ${path}`)
            }
            folder = childFolder
        }
        return folder
    }

    getEntry(path: string): FolderEntry | FileEntry | undefined {
        const levels = path.split('/')
        let folder = this.root;
        levels.forEach((level) => {
            const nextFolder = folder.contents.find((node) => node.name === level)
            if (!nextFolder) {
                return undefined
            }
        })
        return folder
    }

    getPath(keyOnDisk: string) {
        // TODO search for key in all folders.
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

    getFolderFromFolder(folder: FolderEntry, key: string): FolderEntry | undefined {
        const entry = folder.contents.find((entry) => entry.name === key && entry.type === 'folder')
        if (entry && entry.type === 'folder') {
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

    async deleteFile(path: string, filename: string) {
        const folder = this.getFolder(path)
        if (folder) {
            const file = this.getFileFromFolder(folder, filename)
            if (file) {
                const index = folder.contents.indexOf(file);
                folder.contents = folder.contents.splice(index, 1);
            }
        }
        await this.writeToDisk()
    }

    async deleteFolder(path: string) {
        const folder = this.getFolder(path)
        if (folder) {
            const parent = folder.parent
            if (parent) {
                const index = parent.contents.indexOf(parent);
                parent.contents = parent.contents.splice(index, 1);
            }
        }
        await this.writeToDisk()
    }

    async renameFile(path: string, oldName: string, newName: string) {
        const folder = this.getFolder(path)
        if (folder) {
            const file = this.getFileFromFolder(folder, oldName)
            if (file) file.name = newName
        }
        await this.writeToDisk()
    }

    async renameFolder(path: string, newName: string) {
        const folder = this.getFolder(path)
        if (folder) {
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
        const element: FolderEntry | FileEntry = entry || this.root
        console.log('flatten', {
            parentPath,
            name: element.name
        })
        const path = `${parentPath}${element.name}${element.type === 'folder' ? '/' : ''}`

        const fileTreeEntry = {
            key: path,
            size: 0,
        }

        const children = element.type === 'file'
            ? []
            : element.contents.flatMap(child =>
                this.flatten(path, child)
            )

        return [
            fileTreeEntry,
            ...children
        ]
    }
}

class FileSystemFacade {

    fat: Fat

    constructor(private root: string) {
        this.fat = new Fat(root)
    }

    private getFileSystemFolder(path: string) {
        return `${this.root}${path}`
    }

    private getFileSystemPath(keyOnDisk: string) {
        return `${this.root}${keyOnDisk}`
    }

    getFileTree(): FileTreeEntry[] {
        return this.fat.flatten()
    }

    async createFolder(path: string) {
        await this.fat.createFolder(path)
        await fs.mkdir(`${this.getFileSystemFolder(path)}`, { recursive: true })
    }

    async deleteFolder(path: string) {
        await this.fat.deleteFolder(path)
        console.log(`Deleting folder ${path}`)
        // TODO: Move contents to deleted-folder.
    }

    async readFile(path: string, filename: string, version?: string) {
        const keyOnDisk = this.fat.getFileKeyOnDisk(path, filename)
        if (!keyOnDisk) {
            throw new FileNotFoundException(`File ${path}/${filename} does not exist in FAT`)
        }
        if (version) {
            return this.readFileInstance(keyOnDisk, version)
        } else {
            const fileMetadata: FileMetadata = await this.readFileInstance(keyOnDisk, METADATA_FILE_NAME)
            return this.readFileInstance(keyOnDisk, fileMetadata.currentVersion)
        }
    }

    async writeFile(content: any, path: string, filename: string) {
        console.log(`Writing file p: ${path} f: ${filename}`)
        let keyOnDisk = this.fat.getFileKeyOnDisk(path, filename)
        if (!keyOnDisk) {
            console.log(`Existing file not found`)
            keyOnDisk = await this.fat.createFile(path, filename)
            console.log(`Added new file ${keyOnDisk} to fat`)
        }
        const newVersion = `${Date.now()}`

        // Files are stored in a folder named the same as the filename.
        // Within it are the instances of the file, named with the timestamp of the
        // creation, and a versions file that tells us what is the current version
        // and a list of all versions.
        await this.writeFileInstance(content, keyOnDisk, newVersion)
        const fileMetadata: FileMetadata = {
            currentVersion: newVersion
        }
        await this.writeFileInstance(fileMetadata, keyOnDisk, METADATA_FILE_NAME)
    }

    async deleteFile(path: string, filename: string) {
        await this.fat.deleteFile(path, filename)
        console.log(`Deleting file ${path} ${filename}`)
        // TODO: Move to deleted-folder.
    }

    async rename(oldFolder: string, oldKey: string | undefined, newFolder: string, newKey: string | undefined) {
        console.log(`Renaming ${oldKey} to ${newKey}`)
        if (oldKey && newKey) {
            await this.fat.renameFile(oldFolder, oldKey, newKey)
        } else if (!oldFolder.endsWith('/') && !oldFolder.endsWith('/')) {
            throw new Error('Cannot rename a file to a directory and vice versa')
        } else {
            const pathParts = newFolder.split('/')
            const newName = pathParts[pathParts.length - 1]
            await this.fat.renameFolder(oldFolder, newName)
        }
    }

    async getVersionsFromFileSystem(path: string, filename: string): Promise<string[]> {
        const keyOnDisk = this.fat.getFileKeyOnDisk(path, filename)
        if (!keyOnDisk) {
            throw new FileNotFoundException(`File ${filename} does not exist in FAT`)
        }

        const folderOnDisk = this.getFileSystemPath(keyOnDisk)
        if (!existsSync(folderOnDisk)) {
            throw new FileNotFoundException(`File ${filename} with key ${keyOnDisk} does not exist on disk`)
        }
        return (await fs.readdir(folderOnDisk)).filter(file => file !== METADATA_FILE_NAME)
    }

    async writeFileInstance(content: any, keyOnDisk: string, instanceName: string) {
        // TODO: Errors aren't caught by try/catch.
        const folder = `${this.getFileSystemPath(keyOnDisk)}/`
        if (!existsSync(folder)) {
            console.log(`Creating folder ${folder}`)
            await fs.mkdir(`${folder}`, { recursive: true })
        }
        const filepath = `${folder}${instanceName}`
        try {
            await fs.writeFile(filepath, JSON.stringify(content, null, 2), 'utf8');
        } catch (err) {
            console.log('ERROR', err)
        }
    }

    async readFileInstance(keyOnDisk: string, instanceName: string): Promise<any> {
        //TODO: Check existance and throw FileNotFoundException
        const filepath = `${this.getFileSystemPath(keyOnDisk)}/${instanceName}`
        if (!existsSync(filepath)) {
            throw new FileNotFoundException(`File ${keyOnDisk} not found (version ${instanceName})`)
        }
        return JSON.parse(await fs.readFile(filepath, 'utf8'))
    }

}

export default FileSystemFacade
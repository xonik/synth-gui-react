import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid';

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


class Fat {
    root: FolderEntry

    constructor(private rootOnDisk: string) {
        this.root = {
            name: '/',
            type: 'folder',
            contents: []
        }
    }

    writeToDisk() {
        // Ignore parent on write as it is a cyclic reference
        const replacer = (key: string, value: string) => (key === "parent") ? undefined : value

        fs.writeFileSync(
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

    readFromDisk() {
        // Recreate parent on read
        const fat = JSON.parse(fs.readFileSync(`${this.rootOnDisk}${FAT_FILE_NAME}`, 'utf8'))
        if (fat) {
            this.root = fat
            this.setParentOnContents(this.root)
        }

    }

    getFolderWithCreate(path: string): FolderEntry {
        const levels = path.split('/')
        let folder = this.root;
        levels.forEach((level) => {
            const nextFolder = folder.contents.find((node) => node.name === level)
            if (!nextFolder) {
                const newFolder: FolderEntry = {
                    name: level,
                    type: 'folder',
                    contents: []
                }
                folder.contents.push(newFolder)
                newFolder.parent = folder
                folder = newFolder
            }
        })
        return folder
    }

    getFolder(path: string): FolderEntry | undefined {
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

    createFile(path: string, filename: string, keyOnDisk: string) {
        const newFile: FileEntry = {
            name: filename,
            type: 'file',
            keyOnDisk
        }
        const folder = this.getFolderWithCreate(path)
        folder.contents.push(newFile)
        newFile.parent = folder
        this.writeToDisk()
    }

    createFolder(path: string) {
        this.getFolderWithCreate(path)
        this.writeToDisk()
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

    deleteFile(path: string, filename: string) {
        const folder = this.getFolder(path)
        if (folder) {
            const file = this.getFileFromFolder(folder, filename)
            if (file) {
                const index = folder.contents.indexOf(file);
                folder.contents = folder.contents.splice(index, 1);
            }
        }
        this.writeToDisk()
    }

    deleteFolder(path: string) {
        const folder = this.getFolder(path)
        if (folder) {
            const parent = folder.parent
            if (parent) {
                const index = parent.contents.indexOf(parent);
                parent.contents = parent.contents.splice(index, 1);
            }
        }
        this.writeToDisk()
    }

    renameFile(path: string, oldName: string, newName: string) {
        const folder = this.getFolder(path)
        if (folder) {
            const file = this.getFileFromFolder(folder, oldName)
            if (file) file.name = newName
        }
        this.writeToDisk()
    }

    renameFolder(path: string, newName: string) {
        const folder = this.getFolder(path)
        if (folder) {
            folder.name = newName
        }
        this.writeToDisk()
    }

    moveFile(filename: string, fromPath: string, toPath: string) {
        const oldFolder = this.getFolder(fromPath)
        if (!oldFolder) throw new FileNotFoundException(`Path ${fromPath} does not exist`)

        const file = this.getFileFromFolder(oldFolder, filename)
        if (!file) throw new FileNotFoundException(`File ${filename} does not exist`)

        const newFolder = this.getFolderWithCreate(toPath)

        const index = oldFolder.contents.indexOf(file);
        oldFolder.contents = oldFolder.contents.splice(index, 1);

        newFolder.contents.push(file)
        file.parent = newFolder
        this.writeToDisk()
    }

    moveFolder(folderPath: string, toPath: string) {
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
        this.writeToDisk()
    }

    flatten(parentPath: string = '', entry?: FolderEntry | FileEntry): FileTreeEntry[] {
        const element: FolderEntry | FileEntry  = entry || this.root
        const path = `${parentPath}${element.name}${element.type === 'folder' ? '/' : ''}}`

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

    createFolder(path: string) {
        this.fat.createFolder(path)
        fs.mkdirSync(`${this.getFileSystemFolder(path)}`, { recursive: true })
    }

    deleteFolder(path: string) {
        this.fat.deleteFolder(path)
        console.log(`Deleting folder ${path}`)
        // TODO: Move contents to deleted-folder.
    }

    readFile(path: string, filename: string) {
        const keyOnDisk = this.fat.getFileKeyOnDisk(path, filename)
        if(!keyOnDisk) {
            throw new FileNotFoundException(`File ${path}/${filename} does not exist in FAT`)
        }
        // TODO: Write to that file instead
        const fileMetadata: FileMetadata = this.readFileInstance(keyOnDisk, METADATA_FILE_NAME)
        return this.readFileInstance(keyOnDisk, fileMetadata.currentVersion)
    }

    writeFile(content: any, path: string, filename: string) {
        let keyOnDisk = this.fat.getFileKeyOnDisk(path, filename)
        if(!keyOnDisk){
            keyOnDisk = uuidv4()
            this.fat.createFile(path, filename, keyOnDisk)
        }
        const newVersion = `${Date.now()}`

        // Files are stored in a folder named the same as the filename.
        // Within it are the instances of the file, named with the timestamp of the
        // creation, and a versions file that tells us what is the current version
        // and a list of all versions.
        this.writeFileInstance(content, keyOnDisk, newVersion)
        const fileMetadata: FileMetadata = {
            currentVersion: newVersion
        }
        this.writeFileInstance(fileMetadata, keyOnDisk, METADATA_FILE_NAME)


    }

    deleteFile(path: string, filename: string) {
        this.fat.deleteFile(path, filename)
        console.log(`Deleting file ${path} ${filename}`)
        // TODO: Move to deleted-folder.
    }

    rename(oldFolder: string, oldKey: string | undefined, newFolder: string, newKey: string | undefined) {
        console.log(`Renaming ${oldKey} to ${newKey}`)
        if (oldKey && newKey) {
            this.fat.renameFile(oldFolder, oldKey, newKey)
        } else if (!oldFolder.endsWith('/') && !oldFolder.endsWith('/')) {
            throw new Error('Cannot rename a file to a directory and vice versa')
        } else {
            const pathParts = newFolder.split('/')
            const newName = pathParts[pathParts.length -1]
            this.fat.renameFolder(oldFolder, newName)
        }
    }

    getVersionsFromFileSystem(path: string, filename: string): string[] {
        const keyOnDisk = this.fat.getFileKeyOnDisk(path, filename)
        if(!keyOnDisk){
            throw new FileNotFoundException(`File ${filename} does not exist in FAT`)
        }

        const folderOnDisk = this.getFileSystemPath(keyOnDisk)
        if (!fs.existsSync(folderOnDisk)) {
            throw new FileNotFoundException(`File ${filename} with key ${keyOnDisk} does not exist on disk`)
        }
        return fs.readdirSync(folderOnDisk).filter(file => file !== METADATA_FILE_NAME)
    }

    writeFileInstance(content: any, keyOnDisk: string, instanceName: string) {
        // TODO: Errors aren't caught by try/catch.
        const folder = `${this.getFileSystemPath(keyOnDisk)}/`
        if (!fs.existsSync(folder)) {
            console.log(`Creating folder ${folder}`)
            fs.mkdirSync(`${folder}`, { recursive: true })
        }
        const filepath = `${folder}${instanceName}`
        try {
            fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf8');
        } catch (err) {
            console.log('ERROR', err)
        }
    }

    readFileInstance(keyOnDisk: string, instanceName: string): any {
        //TODO: Check existance and throw FileNotFoundException
        const filepath = `${this.getFileSystemPath(keyOnDisk)}/${instanceName}`
        if (!fs.existsSync(filepath)) {
            throw new FileNotFoundException(`File ${keyOnDisk} not found (version ${instanceName})`)
        }
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))
    }

}

export default FileSystemFacade
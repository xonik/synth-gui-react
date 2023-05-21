import * as fs from 'fs/promises'
import { existsSync } from 'fs'
import { Fat } from './Fat.js'
import { FileNotFoundException, FileTreeEntry } from './types.js'

export type FileMetadata = {
    currentVersion: string,
}

const METADATA_FILE_NAME = 'metadata'

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
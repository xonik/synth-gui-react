import * as fs from 'fs'

export type FileTreeEntry = {
    key: string
}

export type FileMetadata = {
    currentVersion: string,
}

const METADATA_FILE_NAME = 'metadata'

export class FileNotFoundException extends Error {}

class FileSystemFacade {
    constructor(private root: string) {}

    private getFileSystemFileFolder(path: string, filename: string, version?: string){
        return `${this.root}${path}${filename}--file${version ? '/' + version : ''}`
    }

    getFileTree(): FileTreeEntry[]{
        return []
    }

    createFolder(path: string){

    }
    deleteFolder(path: string){
        // TODO: Move to deleted-folder.
    }

    readFile(path: string, filename: string){
        const fileMetadata: FileMetadata = this.readFileInstance(path, filename, METADATA_FILE_NAME)
        return this.readFileInstance(path, filename, fileMetadata.currentVersion)
    }
    writeFile(content: any, path: string, filename: string){
        const newVersion = `${Date.now()}`

        // Files are stored in a folder named the same as the filename.
        // Within it are the instances of the file, named with the timestamp of the
        // creation, and a versions file that tells us what is the current version
        // and a list of all versions.
        this.writeFileInstance(content, path, filename, newVersion)
        const fileMetadata: FileMetadata = {
            currentVersion: newVersion
        }
        this.writeFileInstance(fileMetadata, path, filename, METADATA_FILE_NAME)
    }

    getVersionsFromFileSystem(path: string, filename: string): string[] {
        const filepath = this.getFileSystemFileFolder(path, filename)
        return fs.readdirSync(filepath).filter(file => file !== METADATA_FILE_NAME)
    }

    deleteFile(path: string, filename: string){
        // TODO: Move to deleted-folder.
    }

    async writeFileInstance(content: any, path: string, filename: string, instanceName: string){
        //TODO create folder
        const filepath = this.getFileSystemFileFolder(path, filename, instanceName)
        fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf8');
    }

    readFileInstance(path: string, filename: string, instanceName: string): any {
        //TODO: Check existance and throw FileNotFoundException
        const filepath = this.getFileSystemFileFolder(path, filename, instanceName)
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))
    }

}

export default FileSystemFacade
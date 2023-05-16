import * as fs from 'fs'

export type FileTreeEntry = {
    key: string
    size: number
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
        let fileTreeEntries: Array<FileTreeEntry> = []
        const getFilesInDir = (path: string) => {
            console.log('looking in folder', path)
            const contents = fs.readdirSync(this.root + path)
            console.log(contents)
            contents
                .filter(content => content.endsWith('--file'))
                .map(content => content.slice(0, content.length - 6))
                .forEach((filename) => {
                    console.log('Pushing file', filename)
                    fileTreeEntries.push({
                        key: path + filename,
                        size: 0,
                    })
                })

            const folders = contents
                .filter(content => !content.endsWith('--file'))
                .map(folder => folder + '/')

            folders.forEach((folderName) => {
                console.log('Pushing folder', folderName)
                fileTreeEntries.push({
                     key: folderName,
                    size: 0,
                })
                getFilesInDir(path + folderName)
            })
        }
        getFilesInDir('')
        return fileTreeEntries
    }

    createFolder(path: string){
        fs.mkdirSync(`${this.root}${path}`, { recursive: true })
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

    writeFileInstance(content: any, path: string, filename: string, instanceName: string){
        // TODO: Errors aren't caught by try/catch.
        const folder = this.getFileSystemFileFolder(path, filename) + '/'
        if (!fs.existsSync(folder)) {
            console.log(`Creating folder ${folder}`)
            fs.mkdirSync(`${folder}`, { recursive: true })
        }
        const filepath = `${folder}${instanceName}`
        try {
            fs.writeFileSync(filepath, JSON.stringify(content, null, 2), 'utf8');
        } catch (err){
            console.log('ERROR', err)
        }
    }

    readFileInstance(path: string, filename: string, instanceName: string): any {
        //TODO: Check existance and throw FileNotFoundException
        const filepath = this.getFileSystemFileFolder(path, filename, instanceName)
        if(!fs.existsSync(filepath)){
            throw new FileNotFoundException(`File ${filename} not found (version ${instanceName})`)
        }
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))
    }

}

export default FileSystemFacade
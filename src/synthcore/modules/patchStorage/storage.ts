type Filetype = 'patch' | 'performance'

type Dir = {
    isDir: true
    name: string
    children: {
        [name: string]: Dir | FileInDir
    }
}
type FileInDir = {
    isDir: false
    name: string
    type: Filetype
}

type FileVersions = {
    [timestamp: number]: Object
}

type Path = Dir[]

class PathElement {
    public children: PathElement[] = []

    constructor(public name: string) {

    }

    getChild(name: string) {
        return this.children.find((element) => element.name === name)
    }

    getChildren() {
        return this.children
    }

    addChild(child: PathElement){
        child.setParent(this)
        this.children.push(child)
    }

    removeChild(name: string) {
        const child = this.getChild(name)
        child.setParent(undefined)
        if(child){
            this.children = this.children.(name)
        }
        return child
    }
}

class Dir

const tree: Dir = {
    isDir: true,
    name: 'root',
    children: {
        patch: {
            isDir: true,
            name: 'patch',
            children: {
                pads: {
                    isDir: true,
                    name: 'brass',
                    children: {}
                },
                brass: {
                    isDir: true,
                    name: 'brass',
                    children: {}
                }
            }
        },
        performance: {
            isDir: true,
            name: 'performance',
            children: {}
        },
    }
}

const getTree = (filetype?: Filetype): Dir => {
    if(filetype && tree.children[filetype] && tree.children[filetype].isDir) {
        return tree.children[filetype] as Dir
    } else {
        return tree
    }
}

class DirNotFoundException extends Error {}
const getDirFromPath = (path: Path) => {
    let dir = tree;
    path.forEach((dir) => {
        if(dir.children[dir.name] && DirNotFoundException){
            dir = dir.children[dir.name]
        } else {
            throw new DirNotFoundException()
        }
    })
    return dir
}

const mkDir = (root: Path): Path => {

}

const rmDir = (root: string) => {

}

const save = (path: Dir, name: string, contents: object) => {

}

const rm = (path: Dir, name: string) => {
    // Does not delete file, just labels it as deleted, lets us find the file later.
}

const setAsCurrentVersion = (name: string, version: string) => {

}

const getFileVersions = (path: string) => {

}

const getFileContents = (path: string) => {

}
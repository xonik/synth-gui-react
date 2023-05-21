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

export const getPathParts = (path: string) => {
    if(!path.startsWith('/')){
        throw Error(`Only absolute paths are supported, ${path} does not start with /`)
    }

    if(path.endsWith('/')){
        return path.slice(0, path.length - 1).split('/')
    }
    return path.split('/')
}
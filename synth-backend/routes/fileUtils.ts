export const splitKey = (key: string) => {
    const lastSlash = key.lastIndexOf('/')
    if(lastSlash){
        return [
            key.slice(0, lastSlash + 1),
            key.slice(lastSlash + 1)
        ]
    } else {
        return [
            key,
            ''
        ]
    }
}

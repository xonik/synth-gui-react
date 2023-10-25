
export const parseCvConfigFile = (file: string): number => {
    const lines = file.split('\n')

    for(let i=0; i<lines.length; i++){
        const found = parseLine(lines[i])
        if(found) return found
    }
    throw Error("Could not find number of CVs")
}

const cvRegex = new RegExp(`^.*CV_CHANNELS=\([0-9]+\).*`)

const parseLine = (line: string): number | undefined => {
    if (line.length > 0) {
        const trimmed = line.trim()
        const match = trimmed.match(cvRegex)
        if (!match) return
        const [, channelCount] = match

        return Number.parseInt(channelCount)
    }
}
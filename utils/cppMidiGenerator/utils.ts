import fs from "fs";

export const writeToFile = (path: string, inputcontents: string) => {
    const contents = `// GENERATED FILE - DO NOT EDIT\n${inputcontents}`
    console.log(`writing ${contents.length} bytes to ${path}`)
    fs.writeFileSync(path, contents)
}
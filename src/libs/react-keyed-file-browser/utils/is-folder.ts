import { FileBrowserFile } from '../types'

function isFolder(file: FileBrowserFile): boolean {
  return file.key.endsWith('/')
}

export { isFolder }

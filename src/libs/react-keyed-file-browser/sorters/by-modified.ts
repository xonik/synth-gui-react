import { compareAsc } from 'date-fns'
import { FileBrowserFile, FileBrowserTree, FileBrowserTreeGroupNode, isFolderType } from '../types'

function sortByLastModified(payload: FileBrowserTree): FileBrowserTree {
  const folders: FileBrowserTreeGroupNode[] = [] as any
  let files: FileBrowserFile[] = []
  for (let fileIndex = 0; fileIndex < payload.length; fileIndex++) {
    const file = payload[fileIndex]
    const keyFolders = file.key.split('/')
    if (isFolderType(file)) {
      // file.name = keyFolders[keyFolders.length - 2]
      folders.push(file)
    } else {
      file.name = keyFolders[keyFolders.length - 1]
      files.push(file)
    }
  }

  files = files.sort((a, b) => compareAsc(a.modified, b.modified))

  for (let folderIndex = 0; folderIndex < folders.length; folderIndex++) {
    const folder = folders[folderIndex]
    folder.children = sortByLastModified(folder.children)
  }

  return [
      ...folders,
      ...files,
  ]
}

export { sortByLastModified }

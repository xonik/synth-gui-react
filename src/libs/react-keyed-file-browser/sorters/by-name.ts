import { sortByDefault } from './by-default'
import { FileBrowserFile, FileBrowserTree, FileBrowserTreeGroupNode, isDraftType, isFolderType } from '../types'

function naturalDraftComparer(a: FileBrowserTreeGroupNode, b: FileBrowserTreeGroupNode) {
  if (isDraftType(a) && !isDraftType(b)) {
    return 1
  } else if (isDraftType(b) && !isDraftType(a)) {
    return -1
  }
  return sortByDefault(a, b)
}

function sortByName(allFiles: FileBrowserTree): FileBrowserTree {
  let folders: FileBrowserTreeGroupNode[] = []
  let files: FileBrowserFile[] = []

  for (let fileIndex = 0; fileIndex < allFiles.length; fileIndex++) {
    const file = allFiles[fileIndex]
    // const keyFolders = (file.newKey || file.key).split('/') // Cannot see that file is set anywhere
    const keyFolders = file.key.split('/')
    if (isFolderType(file)) {
      if (!file.name) {
        file.name = keyFolders[keyFolders.length - 2]
      }
      folders.push(file)
    } else { // is file
      if (!file.name) {
        file.name = keyFolders[keyFolders.length - 1]
      }
      files.push(file)
    }
  }

  files = files.sort(sortByDefault)
  folders = folders.sort(naturalDraftComparer)

  for (let folderIndex = 0; folderIndex < folders.length; folderIndex++) {
    const folder = folders[folderIndex]
    folder.children = sortByName(folder.children)
  }

  return [
      ...folders,
      ...files,
  ]
}

export { sortByName }

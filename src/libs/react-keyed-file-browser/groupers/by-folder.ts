import { FileBrowserTree, isFolderType } from '../types'

function groupByFolder(files: FileBrowserTree, root: string): FileBrowserTree {
  const fileTree = {
    contents: [],
    children: {},
  }

  files.map((file) => {
    //const relativeKey = (file.newKey || file.key).substr(root.length) // Cannot see that newKey is set anywhere
    const relativeKey = file.key.substr(root.length)
    let currentFolder = fileTree
    const folders = relativeKey.split('/')
    folders.map((folder, folderIndex) => {
      if (folderIndex === folders.length - 1 && isFolderType(file)) {
        // TODO: What is going on here
        for (const key in file) {
          currentFolder[key] = file[key]
        }
      }
      if (folder === '') {
        return
      }

      const isAFile = (!isFolderType(file) && (folderIndex === folders.length - 1))
      if (isAFile) {
        currentFolder.contents.push({
          ...file,
          keyDerived: true,
        })
      } else {
        if (folder in currentFolder.children === false) {
          currentFolder.children[folder] = {
            contents: [],
            children: {},
          }
        }
        currentFolder = currentFolder.children[folder]
      }
    })
  })

  function addAllChildren(level, prefix: string) {
    if (prefix !== '') {
      prefix += '/'
    }

    let files = []

    for (const folder in level.children) {
      files.push({
        ...level.children[folder],
        contents: undefined,
        keyDerived: true,
        key: root + prefix + folder + '/',
        relativeKey: prefix + folder + '/',
        children: addAllChildren(level.children[folder], prefix + folder),
        size: 0,
      })
    }

    files = files.concat(level.contents)
    return files
  }

  files = addAllChildren(fileTree, '')
  return files
}

export { groupByFolder }

import { FileBrowserTree, FileBrowserTreeNode, isFolderType } from '../types'

type InternalFileTree = {
  contents: FileBrowserTreeNode[]
  children: {
    [key: string]: InternalFileTree
  }
}

function groupByFolder(files: FileBrowserTree, root: string): FileBrowserTree {
  const fileTree: InternalFileTree = {
    contents: [], // Files in folder
    children: {},
  }

  // Rekursivt lager et tre av entries. Kopierer over props hvis siste element i key er en fil.
  files.forEach((file) => {
    //const relativeKey = (file.newKey || file.key).substr(root.length) // Cannot see that newKey is set anywhere
    const relativeKey = file.key.substr(root.length)
    let currentFolder = fileTree
    const folders = relativeKey.split('/') // gir alle foldere og filer.

    // alle foldere i path, ink.
    folders.forEach((folderKey, folderIndex) => {

      // Har vi kommet til slutten og dette er en folder
      if (folderIndex === folders.length - 1 && isFolderType(file)) {
        // Kopierer over isDraft
        for (const key in file) {
          // @ts-ignore
          currentFolder[key] = file[key]
        }
      }

      // Denne skjer på siste steg fordi split tar med et tomt entry
      // hvis strengen slutter på "/"
      if (folderKey === '') {
        return
      }

      // Har vi kommet til slutten og dette er en fil
      const isAFile = (!isFolderType(file) && (folderIndex === folders.length - 1))
      if (isAFile) {
        currentFolder.contents.push({
          ...file,
          keyDerived: true,
        })
      } else {
        // vi har ikke kommet til slutten, gå videre inn
        // Hvis folder key ikke allerede finnes, opprett ny node.
        if (!currentFolder.children[folderKey]) {
          currentFolder.children[folderKey] = {
            contents: [],
            children: {},
          }
        }
        currentFolder = currentFolder.children[folderKey]
      }
    })
  })

  function addAllChildren(level: InternalFileTree, prefix: string): FileBrowserTree {
    if (prefix !== '') {
      prefix += '/'
    }

    let files: FileBrowserTreeNode[] = []

    // Legger til ekstra props på alle noder og overskriver key med
    // key for path frem til dette nivået.
    for (const folderKey in level.children) {
      const node = {
        ...level.children[folderKey],
        keyDerived: true,
        key: root + prefix + folderKey + '/',
        relativeKey: prefix + folderKey + '/',
        children: addAllChildren(level.children[folderKey], prefix + folderKey),
        size: 0,
      }
      files.push(node)
    }

    files = files.concat(level.contents)
    return files
  }

  files = addAllChildren(fileTree, '')
  return files
}

export { groupByFolder }

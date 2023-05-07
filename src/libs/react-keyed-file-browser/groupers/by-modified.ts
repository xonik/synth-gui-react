import { format, startOfMonth, endOfMonth } from 'date-fns'
import { relativeTimeWindows } from '../utils'
import { FileBrowserTree, FileBrowserWindow, isFolderType } from '../types'

function groupByModified(files: FileBrowserTree, root: string) {
  const timeWindows = relativeTimeWindows()

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    const file = files[fileIndex]
    if (isFolderType(file)) { continue }
    const newFile = {
      ...file,
      keyDerived: true,
    }

    let allocated = false
    const fileModified = +(newFile.modified ||0)
    for (let windex = 0; windex < timeWindows.length; windex++) {
      const timeWindow = timeWindows[windex]
      if (fileModified > +timeWindow.begins && fileModified <= +timeWindow.ends) {
        timeWindow.items.push(newFile)
        allocated = true
        break
      }
    }
    if (!allocated) {
      const newWindow: FileBrowserWindow = {
        name: format(fileModified, 'MMMM yyyy'),
        begins: startOfMonth(fileModified),
        ends: endOfMonth(fileModified),
        items: [],
      }
      newWindow.items.push(newFile)
      timeWindows.push(newWindow)
    }
  }

  const grouped = []
  for (let windex = 0; windex < timeWindows.length; windex++) {
    const timeWindow = timeWindows[windex]
    if (!timeWindow.items.length) { continue }
    grouped.push({
      key: `${timeWindow.name.toLowerCase().replace(' ', '_')}/`,
      name: timeWindow.name,
      children: timeWindow.items,
      size: 0,
    })
  }

  return grouped
}

export { groupByModified }

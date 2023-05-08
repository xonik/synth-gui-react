import { DraggedFile, DropResult, FileRendererProps, FolderRendererProps } from '../types'
import { DragSourceMonitor } from 'react-dnd'

function move(props: FolderRendererProps | FileRendererProps, monitor: DragSourceMonitor<DraggedFile, DropResult>, component: DraggedFile): void {
    const folders: string[] = []
    const files: string[] = [] as any

    if (!monitor.didDrop()) {
        return
    }

    const dropResult = monitor.getDropResult()

    props.browserProps.selection.forEach((selection: any) => {
        selection[selection.length - 1] === '/' ? folders.push(selection) : files.push(selection)
    })

    if(dropResult) {
        props.browserProps.openFolder(dropResult.path)

        folders
            .forEach((selection) => {
                const fileKey = selection
                const fileNameParts = fileKey.split('/')
                const folderName = fileNameParts[fileNameParts.length - 2]

                const newKey = `${dropResult.path}${folderName}/`
                // abort if the new folder name contains itself
                if (newKey.substr(0, fileKey.length) === fileKey) return

                if (newKey !== fileKey && props.browserProps.moveFolder) {
                    props.browserProps.moveFolder(fileKey, newKey)
                }
            })

        files
            .forEach(selection => {
                const fileKey = selection
                const fileNameParts = fileKey.split('/')
                const fileName = fileNameParts[fileNameParts.length - 1]
                const newKey = `${dropResult.path}${fileName}`
                if (newKey !== fileKey && props.browserProps.moveFile) {
                    props.browserProps.moveFile(fileKey, newKey)
                }
            })
    }
}

export { move }

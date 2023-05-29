import React from 'react'
import { FontAwesomeVersion, IconsProp } from '../types'
import FolderOpen from './open-folder'
import Folder from './folder'
import Document from './document'
import Rename from './rename'
import Trash from './trash'

const FontAwesome = (majorVersion: FontAwesomeVersion = 4): IconsProp | undefined => {
    return {
        File: <Document/>,
        Image: <Document/>,
        Video: <Document/>,
        Audio: <Document/>,
        Archive: <Document/>,
        Word: <Document/>,
        Excel: <Document/>,
        PowerPoint: <Document/>,
        Text: <Document/>,
        PDF: <Document/>,
        Rename: <Rename/>,
        Folder: <Folder/>,
        FolderOpen: <FolderOpen/>,
        Delete: <Trash/>,
        Loading: <Document/>,
        Download: <Document/>,
    }
}

export { FontAwesome }

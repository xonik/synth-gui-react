import React from 'react'
import { Icons, RawFileBrowser } from '../../libs/react-keyed-file-browser'
import { FileBrowserTree, FileBrowserTreeNode } from '../../libs/react-keyed-file-browser/types'
import { RawTableFile } from '../../libs/react-keyed-file-browser/files'
import { RawTableFolder } from '../../libs/react-keyed-file-browser/folders'
import patchStorageApi from '../../synthcore/modules/patchStorage/patchStorageApi'
import { dispatch } from '../../synthcore/utils'
import { revertToPreviousScreen } from '../../synthcore/modules/mainDisplay/mainDisplayReducer'
import { PathTableHeader } from '../../libs/react-keyed-file-browser/headers/PathTableHeader'
import { KeyboardProvider } from '../../libs/react-keyed-file-browser/input/KeyboardProvider'
import './PatchBrowser.scss'

type State = {
    files: FileBrowserTree
    selectedFileName: string | undefined
}

type PatchBrowserProps = {
    mode: 'save' | 'load'
}

class PatchBrowser extends React.Component<PatchBrowserProps> {

    state: State = {
        files: [],
        selectedFileName: undefined
    }

    async componentDidMount() {
        this.setState({files: await patchStorageApi.getFileTree()}, () => console.log(this.state))
    }

    handleCreateFolder = (key: string) => {
       this.setState((state: State) => {
            return {files: [
                ...state.files,
                { key, size: 0 }
            ]}
        })
        patchStorageApi.createFolder(key)
    }
    handleCreateFiles = (files: File[], path: string) => {
        this.setState((state: State) => {
            const newFiles: FileBrowserTreeNode[] = files.map((file) => {
                let newKey = path
                if (path !== '' && path.substring(path.length - 1, path.length) !== '/') {
                    newKey += '/'
                }
                newKey += file.name
                return {
                    key: newKey,
                    size: file.size,
                }
            })

            const uniqueNewFiles: FileBrowserTreeNode[] = []
            newFiles.forEach((newFile) => {
                let exists = false
                state.files.forEach((existingFile) => {
                    if (existingFile.key === newFile.key) {
                        exists = true
                    }
                })
                if (!exists) {
                    uniqueNewFiles.push(newFile)
                }
            })
            state.files = state.files.concat(uniqueNewFiles)
            return state
        })
    }
    handleRenameFolder = (oldKey: string, newKey: string) => {
        this.setState((state: State) => {
            const newFiles: FileBrowserTreeNode[] = []
            state.files.forEach((file) => {
                if (file.key.substr(0, oldKey.length) === oldKey) {
                    newFiles.push({
                        ...file,
                        key: file.key.replace(oldKey, newKey),
                    })
                } else {
                    newFiles.push(file)
                }
            })
            state.files = newFiles
            return state
        })
        patchStorageApi.renameFolder(oldKey, newKey)
    }
    handleRenameFile = (oldKey: string, newKey: string) => {
        this.setState((state: State) => {
            const newFiles: FileBrowserTreeNode[] = []
            state.files.forEach((file) => {
                if (file.key === oldKey) {
                    newFiles.push({
                        ...file,
                        key: newKey,
                    })
                } else {
                    newFiles.push(file)
                }
            })
            state.files = newFiles
            return state
        })
        patchStorageApi.renamePatch(oldKey, newKey)
    }
    handleDeleteFolder = (folderKey: string) => {
        this.setState((state: State) => {
            const newFiles: FileBrowserTreeNode[] = []
            state.files.forEach((file) => {
                if (file.key.substr(0, folderKey.length) !== folderKey) {
                    newFiles.push(file)
                }
            })
            state.files = newFiles
            return state
        })
        patchStorageApi.deleteFolder(folderKey)
    }
    handleDeleteFile = (fileKey: string) => {
        this.setState((state: State) => {
            const newFiles: FileBrowserTreeNode[] = []
            state.files.forEach((file) => {
                if (file.key !== fileKey) {
                    newFiles.push(file)
                }
            })
            state.files = newFiles
            return state
        })
        patchStorageApi.deletePatch(fileKey)
    }

    handleSave = async (key: string) => {
        console.log(`Saving ${key}`)
        await patchStorageApi.savePatch(key)
        // This may be a bit inefficient when we get a lot of files later...
        this.setState({files: await patchStorageApi.getFileTree()}, () => console.log(this.state))
        dispatch(revertToPreviousScreen({reason: 'Save patch'}))
    }

    handleLoad = async (key: string) => {
        console.log(`Loading ${key}`)
        await patchStorageApi.loadPatch(key)
        dispatch(revertToPreviousScreen({reason: 'Load patch'}))
    }

    handleAudit = async (key: string) => {
        if(key === '') {
            console.log('Resetting audit')
            patchStorageApi.revertToCurrentPatch()
        } else {
            console.log(`Auditing ${key}`)
            await patchStorageApi.auditPatch(key)
        }
    }

    handleCancel = () => {
        console.log('Cancelling')
        patchStorageApi.revertToCurrentPatch()
        dispatch(revertToPreviousScreen({reason: 'Cancel patch modal'}))
    }


    onKeyboardOk = (value: string) => {
        this.setState({showKeyboardInput: false})
    }

    onKeyboardCancel = () => {
        this.setState({showKeyboardInput: false})
    }

    render() {
        return (
            <KeyboardProvider>
                <div className="patch-browser">

                    <RawFileBrowser
                        fileTypeHeading="Patch"
                        mode={this.props.mode}
                        files={this.state.files}
                        // @ts-ignore
                        icons={Icons.FontAwesome(4)}
                        onSave={this.handleSave}
                        onLoad={this.handleLoad}
                        onAudit={this.handleAudit}
                        onCancel={this.handleCancel}
                        onCreateFolder={this.handleCreateFolder}
                        onCreateFiles={this.handleCreateFiles}
                        onMoveFolder={this.handleRenameFolder}
                        onMoveFile={this.handleRenameFile}
                        onRenameFolder={this.handleRenameFolder}
                        onRenameFile={this.handleRenameFile}
                        onDeleteFolder={this.handleDeleteFolder}
                        onDeleteFile={this.handleDeleteFile}

                        // @ts-ignore
                        headerRenderer={PathTableHeader}
                        fileRenderer={RawTableFile}
                        folderRenderer={RawTableFolder}
                    />

                </div>
            </KeyboardProvider>
        )
    }
}

export default PatchBrowser
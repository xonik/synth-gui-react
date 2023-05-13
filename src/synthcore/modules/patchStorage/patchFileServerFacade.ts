import { FileBrowserTree } from '../../../libs/react-keyed-file-browser/types'
import { Patch } from './patchStorageApi'

const patchRoot = '/patch'

async function savePatch(key: string, patch: Patch) {
    try {
        console.log(`Saving patch ${key}`, patch)
        await fetch(patchRoot, {
                method: 'PUT',
                body: JSON.stringify({
                    key,
                    content: patch
                }),
            }
        )
    } catch (err) {
        console.log(`Failed to save patch ${key}`)
    }
}

async function loadPatch(key: string, version?: string) {
    try {
        let params: { [key: string]: string } = { key }
        if (version) {
            params = {
                ...params,
                version
            }
        }

        console.log(`Loading patch ${key} ${version}`)
        const res = await fetch(patchRoot + '?' + new URLSearchParams(params), {
                method: 'GET',
            }
        )

        const patch: Patch = await res.json();
        console.log("Loaded patch", patch)

        return patch
    } catch (err) {
        console.log(`Error while fetching patch ${key} ${version}`, err)
    }
}

async function createFolder(key: string) {
    try {
        console.log(`Creating folder ${key}`)
        await fetch(patchRoot + '/folder', {
                method: 'PUT',
                body: JSON.stringify({
                    key,
                })
            }
        )
    } catch (err) {
        console.log(`Error while creating folder ${key}`, err)
    }
}

async function renameFolder(oldKey: string, newKey: string) {
    try {
        console.log(`Renaming folder ${oldKey} to ${newKey}`)
        const res = await fetch(patchRoot + '/folder/rename', {
                method: 'POST',
                body: JSON.stringify({
                    oldKey,
                    newKey
                })
            }
        )

        await res.json();
    } catch (err) {
        console.log(`Error while renaming folder ${oldKey} to ${newKey}`, err)
    }
}

async function deleteFolder(key: string) {
    try {
        console.log(`Deleting folder ${key}`)
        const res = await fetch(patchRoot + '/folder?' + new URLSearchParams({ key }), {
                method: 'DELETE',
            }
        )

        await res.json();
    } catch (err) {
        console.log(`Error while deleting patch ${key}`, err)
    }
}

async function renamePatch(oldKey: string, newKey: string) {
    try {
        console.log(`Renaming patch ${oldKey} to ${newKey}`)
        const res = await fetch(patchRoot + '/rename', {
                method: 'POST',
                body: JSON.stringify({
                    oldKey,
                    newKey
                })
            }
        )

        await res.json();
    } catch (err) {
        console.log(`Error while renaming patch ${oldKey} to ${newKey}`, err)
    }
}

async function deletePatch(key: string) {
    try {
        await fetch(patchRoot + '?' + new URLSearchParams({ key }), {
                method: 'DELETE',
            }
        )
    } catch (err) {
        console.log(`Error while deleting patch ${key}`, err)
    }
}

async function getFileTree(): Promise<FileBrowserTree> {
    try {
        const res = await fetch(patchRoot + '/filetree', {
                method: 'GET',
            }
        )
        return await res.json();
    } catch (err) {
        console.log(`Error while fetching file tree`, err)
        return []
    }
}

async function getPatchVersions(key: string) {
    try {
        const res = await fetch(patchRoot + '/versions?' + new URLSearchParams({ key }), {
                method: 'GET',
            }
        )
        const versions: string[] = await res.json();
        console.log(`Versions for ${key}`, versions)
        return versions
    } catch (err) {
        console.log(`Error while fetching versions for patch ${key}`, err)
    }
}

const patchFileServerFacade = {
    savePatch,
    renamePatch,
    loadPatch,
    deletePatch,
    createFolder,
    renameFolder,
    deleteFolder,
    getFileTree,
    getPatchVersions,
}

export default patchFileServerFacade
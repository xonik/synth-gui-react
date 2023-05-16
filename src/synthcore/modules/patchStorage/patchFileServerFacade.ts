import { FileBrowserTree } from '../../../libs/react-keyed-file-browser/types'
import { Patch } from './patchStorageApi'

const patchRoot = '/patch'

class PatchNotFoundException extends Error {
}

//OK
async function savePatch(key: string, patch: Patch) {
    try {
        console.log(`Saving patch ${key}`, patch)
        const res = await fetch(patchRoot, {
                method: 'PUT',
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key,
                    content: patch
                }),
            }
        )
        // TODO: Error handler reading res status
    } catch (err) {
        console.log(`Failed to save patch ${key}`)
    }
}

// OK M og U version og med feil version
async function loadPatch(key: string, version?: string) {
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
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    if (res.status !== 200) {
        throw new PatchNotFoundException()
    }

    const patch: Patch = await res.json();
    console.log("Loaded patch", patch)

    return patch
}

async function createFolder(key: string) {
    try {
        console.log(`Creating folder ${key}`)
        await fetch(patchRoot + '/folder', {
                method: 'PUT',
                body: JSON.stringify({
                    key,
                }),
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
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
                }),
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
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
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
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
                }),
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
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
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    } catch (err) {
        console.log(`Error while deleting patch ${key}`, err)
    }
}

async function getFileTree(): Promise<FileBrowserTree> {
    const res = await fetch(patchRoot + '/filetree', {
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    if (res.status !== 200) {
        console.log(`Error while fetching file tree, received status ${res.status}`)
        return []
    }
    const filetree = await res.json();
    console.log('Got filetree', filetree)
    return filetree
}

async function getPatchVersions(key: string) {
    try {
        const res = await fetch(patchRoot + '/versions?' + new URLSearchParams({ key }), {
                method: 'GET',
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
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
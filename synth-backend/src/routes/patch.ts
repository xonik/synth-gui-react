import FileSystemFacade from '../filesystem/FileSystemFacade.js';
import { FileNotFoundException } from '../filesystem/types.js';

import express from 'express'

var router = express.Router();

const filesystem = new FileSystemFacade('../storage/patches/', '../storage/patchesDeleted/')

// TODO: Prevent caching
router.get('/filetree', function (req, res, next) {
    console.log("Got a file tree request")
    try {
        const content = filesystem.getFileTree()
        console.log(content)
        return res.json(content)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Could not read patch list' })
    }
});

// TODO: Prevent caching
router.get('/', async function (req, res, next) {
    const { key, version }: {key?: string, version?: string} = req.query
    if(!key) return res.status(400).json({ error: 'Key not included' })
    if (key.endsWith('/')) {
        res.json({})
    } else {
        try {
            return res.json(await filesystem.readFile(key, version))
        } catch (error) {
            console.log(error)
            if (error instanceof FileNotFoundException) {
                return res.status(404).json({ error: error.message })
            }
            return res.status(500).json({ error: `Could not read file (version ${version})` })
        }
    }
});

router.get('/path', async function (req, res, next) {
    const { keyOnDisk }: {keyOnDisk?: string} = req.query
    if(!keyOnDisk) return res.status(400).json({ error: 'Key not included' })
    try {
        return res.json(await filesystem.getPath(keyOnDisk))
    } catch (error) {
        console.log(error)
        if (error instanceof FileNotFoundException) {
            return res.status(404).json({ error: error.message })
        }
        return res.status(500).json({ error: `Error while searching for path of ${keyOnDisk}` })
    }
});

// TODO: Prevent caching
router.get('/versions', async function (req, res, next) {
    const { key }: {key?: string } = req.query
    if(!key) return res.status(400).json({ error: 'Key not included' })
    if (key.endsWith('/')) {
        res.json({})
    } else {
        try {
            const versions = await filesystem.getVersionsFromFileSystem(key)
            return res.json(versions)
        } catch (error) {
            console.log(error)
            if (error instanceof FileNotFoundException) {
                return res.status(404).json({ error: 'Patch not found' })
            }
            return res.status(500).json({ error: 'Could not read patch versions' })
        }
    }
});

router.put('/', async function (req, res, next) {
    const { key, content } = req.body
    if (key.endsWith('/')) {
        res.json({})
    } else {
        try {
            console.log(`Writing patch ${key}`)
            await filesystem.writeFile(content, key)
            return res.json({ result: 'ok' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not write patch' })
        }
    }
});

router.delete('/', async function (req, res, next) {
    const { key }: {key?: string} = req.query
    if(!key) return res.status(400).json({ error: 'Key not included' })
    if (key.endsWith('/')) {
        res.status(500).json({ error: `key ${key} is not a file` })
    } else {
        try {
            await filesystem.deleteFile(key)
            return res.json({ result: 'ok' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not delete patch' })
        }
    }
});

router.post('/rename', async function (req, res, next) {
    const { oldKey, newKey } = req.body
    if (!oldKey.endsWith('/') && !newKey.endsWith('/')) {
        try {
            await filesystem.rename(oldKey, newKey)
            return res.json({ result: 'ok' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not rename file' })
        }
    } else {
        res.status(500).json({ error: `keys ${oldKey} or ${newKey} are not files` })
    }
});

router.put('/folder', async function (req, res, next) {
    const { key } = req.body
    if (key.endsWith('/')) {
        try {
            console.log(`Creating folder ${key}`)
            await filesystem.createFolder(key)
            return res.json({ result: 'ok' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not create folder' })
        }
    } else {
        res.status(500).json({ error: `key ${key} is not a folder` })
    }
});

router.post('/folder/rename', async function (req, res, next) {
    const { oldKey, newKey } = req.body
    if (oldKey.endsWith('/') && newKey.endsWith('/')) {
        try {
            await filesystem.rename(oldKey, newKey)
            return res.json({ result: 'ok' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not rename folder' })
        }
    } else {
        res.status(500).json({ error: `keys ${oldKey} or ${newKey} are not folders` })
    }
});

router.delete('/folder', async function (req, res, next) {
    const { key }: {key?: string} = req.query
    if(!key) return res.status(400).json({ error: 'Key not included' })
    if (key.endsWith('/')) {
        try {
            await filesystem.deleteFolder(key)
            return res.json({ result: 'ok' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not delete folder' })
        }
    } else {
        res.status(500).json({ error: `key ${key} is not a folder` })
    }
});

export default router

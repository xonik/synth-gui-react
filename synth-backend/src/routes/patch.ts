import FileSystemFacade from '../filesystem/FileSystemFacade.js';
import { FileNotFoundException } from '../filesystem/FileSystemFacade.js';
import { splitKey } from './fileUtils.js'

import express from 'express'

var router = express.Router();

const filesystem = new FileSystemFacade('./storage/patches/')

// TODO: Prevent caching
router.get('/filetree', function (req, res, next) {
    console.log("Got a file tree request")
    try {
        const content = filesystem.getFileTree()
        return res.json(content)
    } catch (error) {
        return res.status(500).json({ error: 'Could not read patch list' })
    }
});

// TODO: Prevent caching
router.get('/', function (req, res, next) {
    const { key, version }: {key?: string, version?: string} = req.query
    if(!key) return res.status(400).json({ error: 'Key not included' })
    if (key.endsWith('/')) {
        res.json({})
    } else {
        const [folder, filename] = splitKey(key)

        try {
            if (version) {
                return res.json(filesystem.readFileInstance(folder, filename, version))
            } else {
                return res.json(filesystem.readFile(folder, filename))
            }
        } catch (error) {
            if (error instanceof FileNotFoundException) {
                return res.status(404).json({ error: error.message })
            }
            return res.status(500).json({ error: `Could not read file (version ${version})` })
        }
    }
});

// TODO: Prevent caching
router.get('/versions', function (req, res, next) {
    const { key } = req.body
    if (key.endsWith('/')) {
        res.json({})
    } else {
        const [folder, filename] = splitKey(key)

        try {
            const versions = filesystem.getVersionsFromFileSystem(folder, filename)
            return res.json(versions)
        } catch (error) {
            if (error instanceof FileNotFoundException) {
                return res.status(404).json({ error: 'Patch not found' })
            }
            return res.status(500).json({ error: 'Could not read patch versions' })
        }
    }
});

router.put('/', function (req, res, next) {
    const { key, content } = req.body
    if (key.endsWith('/')) {
        res.json({})
    } else {
        const [folder, filename] = splitKey(key)

        try {
            filesystem.writeFile(content, folder, filename)
            return res.json({ result: 'ok' })
        } catch (error) {
            return res.status(500).json({ error: 'Could not write patch' })
        }
    }
});

router.delete('/', function (req, res, next) {
    const { key }: {key?: string} = req.query
    if(!key) return res.status(400).json({ error: 'Key not included' })
    if (key.endsWith('/')) {
        res.status(500).json({ error: `key ${key} is not a file` })
    } else {
        try {
            const [folder, filename] = splitKey(key)
            filesystem.deleteFile(folder, filename)
            return res.json({ result: 'ok' })
        } catch (error) {
            return res.status(500).json({ error: 'Could not delete patch' })
        }
    }
});

router.post('/rename', function (req, res, next) {
    const { oldKey, newKey } = req.body
    if (!oldKey.endsWith('/') && !newKey.endsWith('/')) {
        try {
            filesystem.rename(oldKey, newKey)
            return res.json({ result: 'ok' })
        } catch (error) {
            return res.status(500).json({ error: 'Could not rename file' })
        }
    } else {
        res.status(500).json({ error: `keys ${oldKey} or ${newKey} are not files` })
    }
});

router.put('/folder', function (req, res, next) {
    const { key } = req.body
    if (key.endsWith('/')) {
        try {
            filesystem.createFolder(key)
            return res.json({ result: 'ok' })
        } catch (error) {
            return res.status(500).json({ error: 'Could not create folder' })
        }
    } else {
        res.status(500).json({ error: `key ${key} is not a folder` })
    }
});

router.post('/folder/rename', function (req, res, next) {
    const { oldKey, newKey } = req.body
    if (oldKey.endsWith('/') && newKey.endsWith('/')) {
        try {
            filesystem.rename(oldKey, newKey)
            return res.json({ result: 'ok' })
        } catch (error) {
            return res.status(500).json({ error: 'Could not rename folder' })
        }
    } else {
        res.status(500).json({ error: `keys ${oldKey} or ${newKey} are not folders` })
    }
});

router.delete('/folder', function (req, res, next) {
    const { key }: {key?: string} = req.query
    if(!key) return res.status(400).json({ error: 'Key not included' })
    if (key.endsWith('/')) {
        try {
            filesystem.deleteFolder(key)
            return res.json({ result: 'ok' })
        } catch (error) {
            return res.status(500).json({ error: 'Could not delete folder' })
        }
    } else {
        res.status(500).json({ error: `key ${key} is not a folder` })
    }
});

export default router

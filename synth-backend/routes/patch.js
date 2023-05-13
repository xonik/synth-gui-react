var express = require('express');
const FileSystemFacade = require("../filesystem/FileSystemFacade");
const {FileNotFoundException} = require("../filesystem/FileSystemFacade");
const {splitKey} = require("./fileUtils");
var router = express.Router();

const filesystem = new FileSystemFacade('patches')

// TODO: Prevent caching
router.get('/filetree', function (req, res, next) {
    console.log("Got a file tree request")
    try {
        const content = filesystem.getFileTree()
        return res.json(content)
    } catch (error) {
        return res.status(500).json({error: 'Could not read patch list'})
    }
});

// TODO: Prevent caching
router.get('/', function (req, res, next) {
    const {key, version} = req.body
    if (key.endsWith('/')) {
        res.json({})
    } else {
        const [folder, filename] = splitKey(key)

        try {
            if(version) {
                return res.json(filesystem.readFileInstance(folder, filename, version))
            } else {
                return res.json(filesystem.readFile(folder, filename))
            }
        } catch (error) {
            if (typeof error === FileNotFoundException) {
                return res.status(404).json({error: 'File not found'})
            }
            return res.status(500).json({error: `Could not read file (version ${version})`})
        }
    }
});

// TODO: Prevent caching
router.get('/versions', function (req, res, next) {
    const {key} = req.body
    if (key.endsWith('/')) {
        res.json({})
    } else {
        const [folder, filename] = splitKey(key)

        try {
            const versions = filesystem.getVersionsFromFileSystem(folder, filename)
            return res.json(versions)
        } catch (error) {
            if (typeof error === FileNotFoundException) {
                return res.status(404).json({error: 'Patch not found'})
            }
            return res.status(500).json({error: 'Could not read patch versions'})
        }
    }
});

router.put('/', function (req, res, next) {
    const {key, content} = req.body
    if (key.endsWith('/')) {
        res.json({})
    } else {
        const [folder, filename] = splitKey(key)

        try {
            filesystem.writeFile(content, folder, filename)
            return res.json({result: 'ok'})
        } catch (error) {
            return res.status(500).json({error: 'Could not write patch'})
        }
    }
});

router.delete('/', function (req, res, next) {
    const {key} = req.body
    if (key.endsWith('/')) {
        try {
            filesystem.deleteFolder(key)
            return res.json({result: 'ok'})
        } catch (error) {
            return res.status(500).json({error: 'Could not delete folder'})
        }
    } else {
        try {
            const [folder, filename] = splitKey(key)
            filesystem.deleteFile(folder, filename)
            return res.json({result: 'ok'})
        } catch (error) {
            return res.status(500).json({error: 'Could not delete patch'})
        }
    }
});

router.put('/folder', function (req, res, next) {
    const {key} = req.body
    if (!key.endsWith('/')) {
        try {
            filesystem.createFolder(key)
            return res.json({result: 'ok'})
        } catch (error) {
            return res.status(500).json({error: 'Could not create folder'})
        }
    } else {
        res.status(500).json({error: `key ${key} is not a folder`})
    }
});

module.exports = router;

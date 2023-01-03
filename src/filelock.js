/**
 * 
 * Package: filelock.json
 * Author: Ganesh B
 * Description: 
 * Install: npm i filelock.json --save
 * Github: https://github.com/ganeshkbhat/filelock.json
 * npmjs Link: https://www.npmjs.com/package/filelock.json
 * File: src/filelock.js
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const { _getGitCommitNumber, _getGitSHAHash, _getGitTagName, _getGitBranchName } = require("git-apis");
const { _createFolders, _writeFile } = require("fssys").fsutils;
const { _createSHAHash, _fileContentHash, _fileContentDeHash, _verifySHAHash, _verifyFileContentHash } = require("hasher-apis");
const { _getRequirePaths } = require("root-dirs");
const path = require("path");


/**
 *
 *
 * @param {*} filelockOptions
 * @param {*} fileoptions
 * @return {*} 
 */
async function _createFileLock(filelockOptions, fileoptions, options) {
    if (!filelockOptions.name && !filelockOptions.localPath && (!filelockOptions.commit || !filelockOptions.sha || !filelockOptions.tag)) {
        throw new Error("[require-urls]: filelock.js._createFileLockJson: ");
    }
    var readFilelock = {};
    try {
        readFilelock = _readFileLock(filelockOptions.localPath, options);
    } catch (e) {
        (!!options && !!options.logger) ? options.logger("[require-urls]: filelock.js._createFileLockJson: readFilelock assignation - filelockOptions: ") : null;
    }

    if (Object.keys(readFilelock).length === 0) {
        if ((!(filelockOptions.username && filelockOptions.repository) && !filelockOptions.name) && filelockOptions.localPath && (!filelockOptions.commit && !filelockOptions.sha && !filelockOptions.tag)) {
            throw new Error("[require-urls]: filelock.js._createFileLockJson: filelockOptions options check : ", filelockOptions);
        }
    }

    /** 
     * 
     * metadata:
     * 
     * readFilelock
     * { name, local, repository, sha, commit, tag, dependencies, files }
     * 
     */
    if (Object.keys(readFilelock).length === 0) {
        readFilelock = {
            name: filelockOptions.username + "@" + filelockOptions.repository,
            localPath: filelockOptions.localPath,
            repositoryPath: filelockOptions.repositoryPath,
            sha: filelockOptions.sha,
            commit: filelockOptions.commit,
            tag: filelockOptions.tag || "",
            dependencies: filelockOptions.dependencies || {},
            files: {}
        }
    }

    (!!options && !!options.logger) ? options.logger("[require-urls]: filelock.js._createFileLockJson: readFilelock ", readFilelock) : null;
    let files = (!!readFilelock.files) ? { ...readFilelock.files } : {};

    /**
     * 
     * metadata:
     * 
     * fileoptions
     * { name, local, remote, sha, digest, dependencies }
     */
    readFilelock["files"] = { ...files };
    let filename = (!!fileoptions.name) ? fileoptions.name : undefined;

    if (!!filename) {
        readFilelock["files"] = { ...readFilelock.files, [filename]: { ...fileoptions } };
    }

    (!!options && !!options.logger) ? options.logger("[require-urls]: filelock.js: filelock data to be written - ", readFilelock) : null;

    try {
        await _createFolders(filelockOptions.localPath, options);
    } catch (e) {
        (!!options && !!options.logger) ? options.logger("[require-urls]: filelocks.js: _writeFileLock: Folder present") : null;
    }

    return await _writeFileLock(filelockOptions.localPath, readFilelock, options);
}

/**
 *
 *
 * @param {*} filelockPath
 * @return {*} 
 */
function _readFileLock(filelockPath, options) {
    (!!options && !!options.logger) ? options.logger("[require-urls]: filelock.js._readFileLockJson: filelockPath: ", filelockPath) : null;
    return require(path.join(filelockPath, "filelock.json"));
}


/**
 *
 *
 * @param {*} localPath
 * @param {*} data
 * @return {*} 
 */
 async function _writeFileLockEntry(filelockOptions, fileoptions, options) {
    
}

/**
 *
 *
 * @param {*} localPath
 * @param {*} data
 * @return {*} 
 */
 async function _readFileLockEntry(filelockOptions, fileoptions, options) {
    
}

/**
 *
 *
 * @param {*} filelockOptions
 * @param {*} fileoptions
 * @return {*} 
 */
async function _updateFileLockEntry(filelockOptions, fileoptions, options) {
    var readFilelock;
    try {
        readFilelock = _readFileLock(filelockOptions.localPath, options);
    } catch (e) {
        (!!options && !!options.logger) ? options.logger("[require-urls]: filelock.js: : filelock.json not created: ", e.message.toString()) : null;
        return await _createFileLock(filelockOptions, fileoptions, options);
    }

    fileoptions.sha = (!!fileoptions.sha) ? fileoptions.sha : (!!fileoptions.data) ? _fileContentSHAHash(fileoptions.data, fileoptions.digest) : "";

    /**
     * 
     * metadata:
     * 
     * fileoptions
     * { name, local, remote, sha, digest, dependencies }
     */
    readFilelock.files[fileoptions.name] = {
        name: fileoptions.name,
        localPath: fileoptions.localPath,
        remote: fileoptions.remote,
        sha: fileoptions.sha,
        digest: fileoptions.digest,
        dependencies: { ...fileoptions.dependencies }
    }

    return await _writeFileLock(filelockOptions.localPath, readFilelock, options);
}

/**
 *
 *
 * @param {*} filelockOptions
 * @param {*} fileoptions
 * @return {*} 
 */
async function _deleteFileLockEntry(filelockOptions, fileoptions, options) {
    var readFilelock = _readFileLock(filelockOptions.localPath, options);
    (!!options && !!options.logger) ? options.logger("[require-urls]: filelock.js._readFileLockJson: deleting fileoptions.name: ", fileoptions.name) : null;
    delete readFilelock.files[fileoptions.name];
    return await _writeFileLock(filelockOptions.localPath, readFilelock, options);
}

/**
 *
 *
 * @param {*} localPath
 * @param {*} data
 * @return {*} 
 */
async function _writeFileLock(localPath, data, options) {
    return await _writeFile(path.join(localPath, "filelock.json"), JSON.stringify(data), options);
}

/**
 *
 *
 * @param {*} remotePath
 * @param {*} options
 */
function _verifyFilelockFileEntry(remotePath, options) { }

/**
 *
 *
 * @param {*} remotePath
 * @param {*} options
 */
function _verifyFilelock(remotePath, options) { }


// filelock.json
module.exports._writeFileLock = _writeFileLock;
module.exports._createSHAHash = _createSHAHash;
module.exports._readFileLock = _readFileLock;
module.exports._createFileLock = _createFileLock;
module.exports._writeFileLockEntry = _writeFileLockEntry;
module.exports._readFileLockEntry = _readFileLockEntry;
module.exports._updateFileLockEntry = _updateFileLockEntry;
module.exports._deleteFileLockEntry = _deleteFileLockEntry;
module.exports._verifyFilelockFileEntry = _verifyFilelockFileEntry;
module.exports._verifyFilelock = _verifyFilelock;

// hasher-apis
module.exports._fileContentHash = _fileContentHash;
module.exports._fileContentDeHash = _fileContentDeHash;
module.exports._verifySHAHash = _verifySHAHash;
module.exports._verifyFileContentHash = _verifyFileContentHash;
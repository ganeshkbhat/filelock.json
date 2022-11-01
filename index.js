/**
 * 
 * Package: require-urls
 * Author: Ganesh B
 * Description: Nodejs npm module to traverse folder using code or cli or use glob patterns
 * Install: npm i require-urls --save
 * Github: https://github.com/ganeshkbhat/requireurl
 * npmjs Link: https://www.npmjs.com/package/require-urls
 * File: src/filelock.js
 * File Description: Using require-urls instead of require to fetch files from git repositories like Github or Bitbucket like repository directly
 * 
 * git-rest: https://www.softwaretestinghelp.com/github-rest-api-tutorial/#:~:text=Log%20in%20to%20your%20GitHub,and%20click%20on%20Create%20Token.
 * https://webhookrelay.com/v1/functions/function-crypto-package.html
 * 
 * TODO:
 * Consider checks and function additions for "low-level comparators between versions" and "working with ranges" and a few "functions for working with versions"
 * https://github.com/npm/node-semver
 * 
*/

/* eslint no-console: 0 */

'use strict';


const { _getGitCommitNumber, _getGitSHAHash, _getGitTagName, _getGitBranchName } = require("./git.js");
const { _createFolders, _writeFile } = require("./filesystem.js");
const { _createSHAHash, _fileContentHash, _fileContentDeHash, _verifySHAHash, _verifyFileContentHash } = require("hasher-apis");
const { _getRequirePaths } = require("./root.dirs.js");
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
        options.logger("[require-urls]: filelock.js._createFileLockJson: readFilelock assignation - filelockOptions: ");
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

    options.logger("[require-urls]: filelock.js._createFileLockJson: readFilelock ", readFilelock);
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

    options.logger("[require-urls]: filelock.js: filelock data to be written - ", readFilelock);

    try {
        await _createFolders(filelockOptions.localPath, options);
    } catch (e) {
        options.logger("[require-urls]: filelocks.js: _writeFileLock: Folder present");
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
    options.logger("[require-urls]: filelock.js._readFileLockJson: filelockPath: ", filelockPath);
    return require(path.join(filelockPath, "filelock.json"));
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
        options.logger("[require-urls]: filelock.js: : filelock.json not created: ", e.message.toString());
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
    options.logger("[require-urls]: filelock.js._readFileLockJson: deleting fileoptions.name: ", fileoptions.name);
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
function _verifyFilelockFile(remotePath, options) { }

/**
 *
 *
 * @param {*} remotePath
 * @param {*} options
 */
function _verifyFilelock(remotePath, options) { }


module.exports._writeFileLock = _writeFileLock;
module.exports._createSHAHash = _createSHAHash;
module.exports._readFileLock = _readFileLock;
module.exports._createFileLock = _createFileLock;
module.exports._updateFileLockEntry = _updateFileLockEntry;
module.exports._deleteFileLockEntry = _deleteFileLockEntry;
module.exports._fileContentHash = _fileContentHash;
module.exports._fileContentDeHash = _fileContentDeHash;
module.exports._verifyFilelockFile = _verifyFilelockFile;
module.exports._verifyFilelock = _verifyFilelock;
module.exports._verifySHAHash = _verifySHAHash;
module.exports._verifyFileContentHash = _verifyFileContentHash;

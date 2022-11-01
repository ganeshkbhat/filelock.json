/**
 * 
 * Package: filelock.json
 * Author: Ganesh B
 * Description: 
 * Install: npm i filelock.json --save
 * Github: https://github.com/ganeshkbhat/filelock.json
 * npmjs Link: https://www.npmjs.com/package/filelock.json
 * File: index.js
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';


const {
    _writeFileLock, _createSHAHash, _readFileLock,
    _createFileLock, _updateFileLockEntry, _deleteFileLockEntry,
    _fileContentHash, _fileContentDeHash,
    _verifyFilelockFile, _verifyFilelock,
    _verifySHAHash, _verifyFileContentHash
} = require("./src/filelock.js");


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
module.exports.default = _createSHAHash;


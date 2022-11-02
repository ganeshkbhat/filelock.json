/**
 * 
 * Package: filelock.json
 * Author: Ganesh B
 * Description: 
 * Install: npm i filelock.json --save
 * Github: https://github.com/ganeshkbhat/filelock.json
 * npmjs Link: https://www.npmjs.com/package/filelock.json
 * File: demos/filelock.json
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
} = require("../index.js");

console.log(_writeFileLock, _createSHAHash, _readFileLock,
    _createFileLock, _updateFileLockEntry, _deleteFileLockEntry,
    _fileContentHash, _fileContentDeHash,
    _verifyFilelockFile, _verifyFilelock,
    _verifySHAHash, _verifyFileContentHash);

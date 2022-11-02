/**
 * 
 * Package: filelock.json
 * Author: Ganesh B
 * Description: 
 * Install: npm i filelock.json --save
 * Github: https://github.com/ganeshkbhat/filelock.json
 * npmjs Link: https://www.npmjs.com/package/filelock.json
 * File: index.mjs
 * 
 * 
*/

/* eslint no-console: 0 */

'use strict';

import {
    _writeFileLock, _createSHAHash, _readFileLock,
    _createFileLock, _fileContentHash, _fileContentDeHash,
    _writeFileLockEntry, _readFileLockEntry,
    _updateFileLockEntry, _deleteFileLockEntry,
    _verifyFilelockFileEntry, _verifyFilelock,
    _verifySHAHash, _verifyFileContentHash
} from "./src/filelock.js";

export default _writeFileLock;

export {
    _writeFileLock, _createSHAHash, _readFileLock,
    _createFileLock, _fileContentHash, _fileContentDeHash,
    _writeFileLockEntry, _readFileLockEntry,
    _updateFileLockEntry, _deleteFileLockEntry,
    _verifyFilelockFileEntry, _verifyFilelock,
    _verifySHAHash, _verifyFileContentHash
}

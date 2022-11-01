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

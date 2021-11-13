const uuidv4 = require('uuid').v4;
const fs = require('fs');

/**
 * 
 * @param {Any} data 
 * @returns DATATYPE
 * @private
 */
function findType(data) {
    return typeof data;
}

/**
 * 
 * @param {Any} data 
 * @returns Stringified data
 * @private
 */
function resolveToString(data) {
    const type = findType(data);
    let resolvedData = data;
    if (type === 'object') {
        resolvedData = JSON.stringify(data);
    } else {
        resolvedData = String(data);
    }
    return resolvedData;
};

/**
 * 
 * @param {Any} data 
 * @param {Datatype} type 
 * @returns Typecasted data
 * @private
 */
function resolveToType(data, type) {
    let resolvedData = data;
    if (type === 'object') {
        resolvedData = JSON.parse(data);
    } else if (type === 'number'){
        resolvedData = Number(data);
    } else if (type === 'boolean') {
        resolvedData = data.toLowerCase() === 'true';
    } else if (type === 'undefined') {
        resolvedData = undefined;
    } else if (type === 'null') {
        resolvedData = null;
    }
    return resolvedData;
}

/**
 * 
 * @param {String} path 
 * @returns Extracted file content type
 * @private
 */
function extractTypeFromFile(path) {
    return path.split('@')[1].split('.')[0];
}

/**
 * 
 * @param {Any} inputData 
 * @returns Promise
 * Create file at /tmp dir and return file path
 */
const store = (inputData) => {
    const fileId = uuidv4();
    const path = `/tmp/${fileId}@${findType(inputData)}.txt`;
    return new Promise((resolve, reject) => {
        fs.writeFile(path, resolveToString(inputData), (err) => {
            if (err)    
                reject(err);
            resolve(path);
        });
    })
}

/**
 * 
 * @param {String} path 
 * @returns Promsie 
 * Get the file content resolved in original type
 */
const get =  (path) => {
    return new Promise((resolve, reject) => {
        if (!path)
            reject(new Error('File path is required'))
        fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
            if (err) 
                reject(new Error('File is not available, please check file path'));
            resolve(resolveToType(data, extractTypeFromFile(path)))
        });
    });
    
}

/**
 * 
 * @param {String} path 
 * @returns Promise
 * Remove file
 */
const remove = (path) => {
    return new Promise((resolve, reject) => {
        if (!path)
            reject(new Error('File path is required'))
        fs.rm(path, (err) =>{
            if (err)
                reject(new Error('File path is invalid'))
            resolve("File removed!");
        })
    })
}

module.exports = {store, get, remove}

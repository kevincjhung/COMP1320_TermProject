/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: November 4th, 2021
 * Author: Kevin 
 * 
 */

const { pipeline } = require('stream');
const { createReadStream, createWriteStream } = require('fs');
const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => { // tested, works
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
    .pipe(unzipper.Extract( { path: pathOut } ))
    .on('entry', entry => entry.autodrain())
    .promise()
    .then( () => console.log('Extraction operation complete'), e => console.log('error',e));
  })
};


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = (dir) => {
    return new Promise((resolve, reject) => {
      fs.readdir(dir, 'utf8', (err, files) => {
        if (err) { 
          reject(err); 
        }
        // remove non png files
        for(let i= 0; i < files.length; i++){
          files.splice(i,i);
        }
        console.log(files);
        resolve(files);
      })
    })
};

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {

  })
};


unzip("./myfile.zip", "./unzipped")
  .then(readDir('./unzipped'))
  .then()
  .catch((err) => { console.log(err) })


module.exports = {
  unzip,
  readDir,
  grayScale
};
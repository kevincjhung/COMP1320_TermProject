/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: November 4th, 2021
 * Author: Kevin 
 * error check
 *  if zip file has other file types (pass)
 *  empty (pass)
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
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      .on('entry', entry => entry.autodrain())
      .promise()
      .then(() => {
        console.log('Extraction operation complete');
        resolve();
      })
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
      
      let filesPNG = []; // array with only the .png file names
    
      for(let i= 0; i < files.length; i++){
        if(path.extname(files[i]) === '.png'){
          filesPNG.push(files[i]);
        }
      } 
      resolve(filesPNG);
    })
  })
};

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath // array of strings
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
      fs.createReadStream(pathIn)
        .pipe(
          new PNG({})
        )
        .on("parsed", function () {
          for (var y = 0; y < this.height; y++) { // iterate through all of the pixels
            for (var x = 0; x < this.width; x++) {
              var idx = (this.width * y + x) << 2;

              // average the RGB of the pixels
              //var gsPixel = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3; 
              let red = this.data[idx];           // Red
              let green = this.data[idx + 1];     // Green
              let blue = this.data[idx + 2];      // Blue
              
              this.data[idx] = (0.3 * red) + (0.59 * green) + (0.11 * blue);
              this.data[idx + 1] = (0.3 * red) + (0.59 * green) + (0.11 * blue);
              this.data[idx + 2] = (0.3 * red) + (0.59 * green) + (0.11 * blue);
              //New grayscale image = ( (0.3 * R) + (0.59 * G) + (0.11 * B) ).

            }
          }
          var current = new Date();
          
          let now = current.getTime(); //milliseconds since jan 1st, 1970
          // look into UUID
          this.pack().pipe(fs.createWriteStream(`${pathOut}/out${now}.png`));
        });
    });
};


module.exports = {
  unzip,
  readDir,
  grayScale
};
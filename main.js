/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: 
 * 
 * Created Date: 
 * Author:
 * 
 */



const { unzip, readDir, grayScale } = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;
 
unzip(zipFilePath, pathUnzipped)
  .then(() => readDir(pathUnzipped))
  .then((files) => {
    for(let i = 0; i < files.length; i++){
      grayScale(`${pathUnzipped}/${files[i]}`, "grayscaled")
    }
  })
  .catch((err) => { console.log(err) })

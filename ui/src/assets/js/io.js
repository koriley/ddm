'use strict';

function readAFile(filepath){
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', function(err, data) {
            if (err) {
                reject("An error ocurred reading the file :" + err.message);
                return;
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(filepath, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, data, (err) => {
          if (err) {
              reject(err);
          }
      });
    })
}

function getDirContents(dir){
    return new Promise((resolve, reject)=>{
        var files = {};
        var fileNames = [];
        try{
            fs.readdirSync(dir).forEach((fileName)=>{
                fileNames.push({
                    "name":fileName
                })
                files = {"files":fileNames}

            });
            resolve(files);
        }catch(error){
            reject(error);
        }
        
    })
}

function checkFileExist(path){
    return new Promise((resolve, reject)=>{
       if(!path){
             reject("Path is invalid "+path)
        }
        try{
            fs.access(path, fs.F_OK, (err)=>{
                if(err){
                    resolve("false");
                }
                resolve("true");
            });
        }catch (error){
            reject("error");
        }
    });
}
//write test
// var testObj  = "This is a write test";
// writeFile("../test.txt", testObj);

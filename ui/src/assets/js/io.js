// var fs = require('fs');
//
// var readAFile = (filepath) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filepath, 'utf-8', function(err, data) {
//             if (err) {
//                 reject("An error ocurred reading the file :" + err.message);
//                 return;
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }
//
// var writeFile = (filepath, data) => {
//     return new Promise((resolve, reject) => {
//       fs.writeFile(filepath, data, (err) => {
//           if (err) {
//               reject(err);
//           }
//       });
//     })
// }
//
// //write test
// var testObj  = "This is a write test";
// writeFile("../test.txt", testObj);

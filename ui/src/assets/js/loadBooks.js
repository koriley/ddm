// getDirContents("./books").then(function (files) {
//   // console.log();
//   // console.log(JSON.parse(JSON.stringify(files.files[0].name)));
//   for(var i = 0; i <= files.files.length - 1; i++) {
//     readAFile("./books/" + JSON.parse(JSON.stringify(files.files[i].name))).then(function (book) {
//       var bookTitle = JSON.parse(book);
//       console.log(bookTitle.details.name);
//       jQuery(".bookList").append(`<div class="book">${bookTitle.details.name}<div>`);

//        //look for npc, this will eventually be its own function
//       if(bookTitle.hasOwnProperty("NPC")){
//         console.log(bookTitle.details.name+" true")
//       }else{
//         console.log("none found")
//       }

//     });



//   }
// });
let bookFileArray = [];
let bookTitleArray = [];
getBookFiles().then(async function (data) {
    for (var i = 0; i <= data.files.length - 1; i++) {
        var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name));
        bookFileArray.push(path);
    }
    await getBookTitles(bookFileArray).then((data) => {
        //console.log(data[0])
        for (var i = 0; i <= data.length - 1; i++) {
            bookTitleArray.push(data[i]);
        }
    });
    console.log(bookFileArray);
    console.log(bookTitleArray);
    let bookObjArray = [];
    let bookTPObj = {};
    for (var i = 0; i <= bookTitleArray.length - 1; i++) {
        bookTPObj = {
            "name": bookTitleArray[i],
            "path": bookFileArray[i]
        }
        bookObjArray.push(bookTPObj);
    }
    books = {
        "books": [bookObjArray]
    };
    console.log(JSON.stringify(books.books))
});



async function getBookTitles(bookArray) {
    // console.log(bookArray)
    return new Promise(async function (resolve, reject) {
        var titleArray = [];
        var count = 0;

        try {
            for (var i = 0; i <= bookArray.length - 1; i++) {
                count++; //console.log(bookArray[i])

                await readAFile(bookArray[i]).then(function (book) {
                    var bookTitle = JSON.parse(book);
                    // console.log(bookTitle.details.name);
                    // console.log(bookTitle.details.name)
                    titleArray.push(bookTitle.details.name)
                }); // console.log(file)
                if (i == bookArray.length - 1) {
                    // console.log("here")
                    resolve(titleArray);
                }
            }

            ;
        } catch (error) {
            reject(error);
        }
    });

}

function getBookFiles() {
    return new Promise(function (resolve, reject) {
        try {
            getDirContents(bookPath).then(function (data) {
                resolve(data);
            });
        } catch (error) {
            reject(error);
        }
    });
}
    function listBooks() {
        return new Promise((resolve, reject) => {
            try{
                resolve();
            }catch(error){
                reject(error);
            }
        });
     }
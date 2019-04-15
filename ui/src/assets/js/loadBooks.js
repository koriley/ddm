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
listBooks().then((data) => {
    console.log(data)
});
function listBooks() {
    return new Promise((resolve, reject) => {
        let titleArray =[]
        try {
            getDirContents(bookPath).then((data) => {
                // console.log(JSON.stringify(data))

                for (var i = 0; i <= data.files.length - 1; i++) {
                    var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name))
                    readAFile(path).then(function (book) {
                        var bookTitle = JSON.parse(book);
                        var bookObj = {"name":bookTitle.details.name, "path":path}
                        titleArray.push(JSON.stringify(bookObj));


                        // console.log(JSON.stringify(bookTitle.details.name))

                        
                    });
                }
                // console.log(titleArray)
                books = {"books":titleArray};
                resolve(books);
            });

        } catch (error) {
            reject(error)
        }
    });
}
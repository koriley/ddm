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
getBookFiles().then((data)=>{
   
    for (var i = 0; i <= data.files.length - 1; i++) {
        var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name))
        bookFileArray.push(path)
    }
    
       getBookTitles(bookFileArray).then((data)=>{
             console.log(data)
            // bookTitleArray.push(data);
       });
    
    //  console.log(bookFileArray);
    //  console.log(bookTitleArray);
});

function getBookTitles(bookArray){
    return new Promise((resolve, reject)=>{
        let titleArray = [];
        let count = 0;
        try{
            bookArray.forEach(function(key,i){
                count ++;
                readAFile(key).then(function (book) {
                    var bookTitle = JSON.parse(book);
                    titleArray.push(bookTitle.details.name)
                    if(count == bookArray.length -1){
                        console.log("here")
                        resolve(titleArray);
                    } 
                });
                    // console.log(file)
               
            });
           
        }catch(error){
            reject(error);
        }
    });
}

function getBookFiles(){
    return new Promise((resolve, reject)=>{
        try{
            getDirContents(bookPath).then((data)=>{
                resolve(data);
            })
        }catch (error){
            reject(error)
        }
    })
}
function listBooks() {
    return new Promise((resolve, reject) => {
        let titleArray =[];
        let pathArray = [];
        try {
            getDirContents(bookPath).then((data) => {
                // console.log(JSON.stringify(data))

                for (var i = 0; i <= data.files.length - 1; i++) {
                    var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name))
                    pathArray.push(path)
                    readAFile(path).then(function (book) {
                        var bookTitle = JSON.parse(book);
                        // var bookObj = {"name":bookTitle.details.name, "path":path}
                        titleArray.push(bookTitle.details.name);
                        // console.log(JSON.stringify(bookTitle.details.name))
                    })
                    // .then((data)=>{
                    //     // console.log(titleArray)
                    //     // console.log(titleArray.length)
                    //     // for(var i=0;i<=titleArray.length -1; i++){
                    //     //     console.log("stuff");
                    //     // }
                    //     titleArray.forEach(function(i,key){
                    //         console.log("This is i "+i+", this is key?"+key)
                    //     })
                    // });
                }
                // console.log(titleArray)
                // books = {"books":titleArray};
                // resolve(books);
                
            })
                     
        } catch (error) {
            reject(error)
        }
    });
}
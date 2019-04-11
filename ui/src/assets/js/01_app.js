'use strict';
  // remove line below when testing frontend
  var fs = require('fs');
  
// Paths
let campaignListPath = "./campaign.json";
let bookPath = "./book/";
let campaignDirPath = "/campaigns/";

///

//glodal objects
var books = {};
var npc = {};
var campaignObj = {};
var thisCampaign = {};
///

//global vars

///

//temp to cose the campaign picker.
jQuery(".closeCampWindow").on("click", function(){
  jQuery(".campaigns").remove();
});

jQuery("document").ready(function () {
  jQuery(".drag").draggable({
      containment: ".mainView",
      scroll: false
  });


});

Object.prototype.hasOwnProperty = function(property) {
return this[property] !== undefined;
};

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


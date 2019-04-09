'use strict';
//remove line below when testing frontend
// var fs = require('fs');
//////////////////

jQuery("document").ready(function () {
    jQuery(".drag").draggable({
        containment: ".mainView",
        scroll: false
    });

var books = {};
getDirContents("./books").then(function (files) {
  // console.log();
  // console.log(JSON.parse(JSON.stringify(files.files[0].name)));
  for(var i = 0; i <= files.files.length - 1; i++) {
    readAFile("./books/" + JSON.parse(JSON.stringify(files.files[i].name))).then(function (book) {
      var bookTitle = JSON.parse(book);
      console.log(bookTitle.details.name);
      jQuery(".bookList").append(`<div class="book">${bookTitle.details.name}<div>`);
    });
  }
});

passivePerception();

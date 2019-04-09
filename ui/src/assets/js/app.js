'use strict';
//remove line below when testing frontend
var fs = require('fs');
//////////////////

jQuery("document").ready(function () {
    jQuery(".drag").draggable({
        containment: ".mainView",
        scroll: false
    });
});

var books = {};
readAFile("./books/dmg.json").then((book) => {
    var bookTitle = JSON.parse(book);

    console.log(bookTitle.details.name);
});
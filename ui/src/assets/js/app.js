'use strict';
//remove line below when testing frontend
var fs = require('fs');
//////////////////

jQuery("document").ready(function () {
    jQuery(".drag").draggable({
        containment: ".mainView",
        scroll: false
    });

    jQuery( ".resize" ).resizable({
        containment: ".mainView",
        autoHide: true,
        distance: 1,
        handles: 'se'
    });

    passivePerception();
});

var books = {};
readAFile("./books/dmg.json").then((book) => {
    var bookTitle = JSON.parse(book);

    console.log(bookTitle.details.name);
});
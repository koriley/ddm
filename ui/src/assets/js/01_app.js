'use strict';
  // remove line below when testing frontend
  var fs = require('fs');
  var rimraf = require("rimraf");

// Paths
let campaignListPath = "./campaign.json";
let bookPath = "./books/";
let campaignDirPath = "./campaigns/";
let thisCampaignPath;
///

//glodal objects
var books = {};
var npc = {};
var campaignObj = {};
var thisCampaign = {};
///

//global vars
let spaceChar = "__";
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


//        //look for npc, this will eventually be its own function
//       if(bookTitle.hasOwnProperty("NPC")){
//         console.log(bookTitle.details.name+" true")
//       }else{
//         console.log("none found")
//       }

//     });



//   }
// });

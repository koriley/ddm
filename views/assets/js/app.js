'use strict'; // remove line below when testing frontend

var fs = require('fs');

var rimraf = require("rimraf"); // Paths


var campaignListPath = "./campaign.json";
var bookPath = "./books/";
var campaignDirPath = "./campaigns/";
var thisCampaignPath; ///
//glodal objects

var books = {};
var npc = {};
var campaignObj = {};
var thisCampaign = {}; ///
//global vars

var spaceChar = "__"; ///
//temp to cose the campaign picker.

jQuery(".closeCampWindow").on("click", function () {
  jQuery(".campaigns").remove();
});
jQuery("document").ready(function () {
  jQuery(".drag").draggable({
    containment: ".mainView",
    scroll: false
  });
});

Object.prototype.hasOwnProperty = function (property) {
  return this[property] !== undefined;
}; //        //look for npc, this will eventually be its own function
//       if(bookTitle.hasOwnProperty("NPC")){
//         console.log(bookTitle.details.name+" true")
//       }else{
//         console.log("none found")
//       }
//     });
//   }
// });
"use strict";

jQuery(document).ready(function () {
  startApp().then(function (data) {
    setCampaigns(data).then(function (campList) {
      jQuery(".campaignList").prepend(campList);
    }); // console.log(JSON.stringify(data));
    // console.log(campaignObj)
  });
});

function startApp() {
  return new Promise(function (resolve, reject) {
    try {
      getCampaigns(campaignListPath).then(function (data) {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
}
'use strict';

function readAFile(filepath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
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
  return new Promise(function (resolve, reject) {
    fs.writeFile(filepath, data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("File Written");
      }
    });
  });
}

function getDirContents(dir) {
  return new Promise(function (resolve, reject) {
    var files = {};
    var fileNames = [];

    try {
      fs.readdirSync(dir).forEach(function (fileName) {
        fileNames.push({
          "name": fileName
        });
        files = {
          "files": fileNames
        };
      });
      resolve(files);
    } catch (error) {
      reject(error);
    }
  });
}

function checkFileExist(path) {
  return new Promise(function (resolve, reject) {
    if (!path) {
      reject("Path is invalid " + path);
    }

    try {
      fs.access(path, fs.F_OK, function (err) {
        if (err) {
          resolve("false");
        }

        resolve("true");
      });
    } catch (error) {
      reject("error");
    }
  });
}

function checkDirExist(dir) {
  return new Promise(function (resolve, reject) {
    try {
      if (fs.existsSync(dir)) {
        resolve("true");
      } else {
        resolve("false");
      }
    } catch (error) {
      reject(error);
    }
  });
}

function createDir(dir) {
  return new Promise(function (resolve, reject) {
    try {
      fs.mkdirSync(dir);
      resolve("done");
    } catch (error) {
      reject(error);
    }
  });
}

function removeSpace(string) {
  return new Promise(function (resolve, reject) {
    try {
      var cleanString = string.replace(/\s/g, spaceChar);
      resolve(cleanString);
    } catch (error) {
      reject(error);
    }
  });
}

function addSpace(string) {
  return new Promise(function (resolve, reject) {
    try {
      var addSpace = new RegExp(spaceChar, "g");
      var cleanString = string.replace(addSpace, /\s/);
      resolve(cleanString);
    } catch (error) {
      reject(error);
    }
  });
} //write test
// var testObj  = "This is a write test";
// writeFile("../test.txt", testObj);
"use strict";

function updateAbilityBonus(myAbility) {
  var ability = jQuery(myAbility).val();
  var modifier = jQuery(myAbility).parent().children('.modifier-bubble').text();

  if (!jQuery.isNumeric(ability)) {
    ability = 1;
    jQuery(myAbility).val(ability);
  }

  modifier = Math.floor((ability - 10) / 2);
  jQuery(myAbility).parent().children('.modifier-bubble').text(modifier);

  if (myAbility.attr('id') == 'wis') {
    passivePerception();
  }
}

;
jQuery(".ability").each(function () {
  updateAbilityBonus(jQuery(this));
  jQuery(this).on("focus", function () {
    jQuery(this).select();
  });
  jQuery(this).on("keyup", function () {
    updateAbilityBonus(jQuery(this));
    updateProf(jQuery('.savingThrows #' + jQuery(this).attr('id')));
  });
});
"use strict";

var thisAbility = "";
var thisAbilityBonus = "";

function callAbility(ability) {
  thisAbility = jQuery('.ability-box #' + ability).val();
  thisAbilityBonus = parseInt(jQuery('.ability-box #' + ability + '-Bonus').text());
}
"use strict";

function abrreviateLabels() {
  var abbrWords = ['Speed|SPD', 'Initiative|INIT', 'Temporary|TEMP', 'Hit Points|HP', 'Armor Class|AC', 'Maximum|MAX', 'Current|CRNT', 'Experience Points|XP'];
  var mySize = jQuery('.charSheet').css('font-size');
  mySize = parseInt(mySize.split('px')[0]); // console.log(mySize);

  if (mySize < 16) {
    jQuery('label').each(function (index, label) {
      jQuery(abbrWords).each(function (index, word) {
        var long = word.split('|')[0];
        var short = word.split('|')[1];
        jQuery(label).text(function (index, text) {
          return text.replace(long, short);
        });
      });
    });
  } else {
    jQuery('label').each(function (index, label) {
      jQuery(abbrWords).each(function (index, word) {
        var long = word.split('|')[0];
        var short = word.split('|')[1];
        jQuery(label).text(function (index, text) {
          return text.replace(short, long);
        });
      });
    });
  }
}
// jQuery('#classManager').hide();
//
// var getLabel = jQuery('.charSheet #classMore').html();
// console.log(getLabel);
// getLabel = getLabel+'<div style="text-align:right; display:inline-block; width:10em;">hello!</div>';
// console.log(getLabel);
// jQuery('.charSheet #classMore').html(getLabel);
// <svg><use xlink:href="#downAngle"></use></svg>
"use strict";
"use strict";

function clearTop() {
  jQuery(".drag").each(function () {
    jQuery(this).removeClass("onTop");
  });
}

;
jQuery(".drag").on("mousedown", function () {
  clearTop();
  jQuery(this).addClass("onTop");
});
"use strict";

jQuery(".deathSaves").on("click", ".icon", function () {
  jQuery(this).toggleClass('active');
});
jQuery(".deathSaves").on("click", ".reaper", function () {
  jQuery(".icon").removeClass('active');
});
"use strict";

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
var bookFileArray = [];
var bookTitleArray = [];
getBookFiles().then(function (data) {
  for (var i = 0; i <= data.files.length - 1; i++) {
    var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name));
    bookFileArray.push(path);

    if (i == data.files.length - 1) {
      getBookTitles(bookFileArray).then(function (data) {
        // console.log(data)
        bookTitleArray.push(data);
      });
    }
  }

  console.log(bookFileArray);
  console.log(bookTitleArray);
});

function getBookTitles(bookArray) {
  console.log(bookArray);
  return new Promise(function (resolve, reject) {
    var titleArray = [];
    var count = 0;

    try {
      for (var i = 0; i <= bookArray.length - 1; i++) {
        count++;
        readAFile(bookArray[i]).then(function (book) {
          var bookTitle = JSON.parse(JSON.stringify(book));
          titleArray.push(bookTitle.details.name);
        }); // console.log(file)

        if (i == bookArray.length - 1) {
          console.log("here");
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
  return new Promise(function (resolve, reject) {
    var titleArray = [];
    var pathArray = [];

    try {
      getDirContents(bookPath).then(function (data) {
        // console.log(JSON.stringify(data))
        for (var i = 0; i <= data.files.length - 1; i++) {
          var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name));
          pathArray.push(path);
          readAFile(path).then(function (book) {
            var bookTitle = JSON.parse(book); // var bookObj = {"name":bookTitle.details.name, "path":path}

            titleArray.push(bookTitle.details.name); // console.log(JSON.stringify(bookTitle.details.name))
          }); // .then((data)=>{
          //     // console.log(titleArray)
          //     // console.log(titleArray.length)
          //     // for(var i=0;i<=titleArray.length -1; i++){
          //     //     console.log("stuff");
          //     // }
          //     titleArray.forEach(function(i,key){
          //         console.log("This is i "+i+", this is key?"+key)
          //     })
          // });
        } // console.log(titleArray)
        // books = {"books":titleArray};
        // resolve(books);

      });
    } catch (error) {
      reject(error);
    }
  });
}
"use strict";

/**
 * Need to build loading a campaign
 * need new campaign to make sure its name is unique.
 */
jQuery(".campAdd").on("click", function () {
  newCampaign();
});
jQuery(".campaignList").on("click", ".campLoad", function () {
  var toLoad = jQuery(this).attr("data-load");
  var thisName = jQuery(this).attr("data-name");
  var thisDir; //   console.log(toLoadName)

  removeSpace(thisName).then(function (name) {
    thisDir = campaignDirPath + name + "/camp.json";
    checkFileExist(thisDir).then(function (data) {
      if (data == "false") {
        alert("This campaign doesn't exist... Now deleting");
        deleteCampaign(thisName, toLoad);
      } else {
        readAFile(thisDir).then(function (data) {
          thisCampaign == JSON.parse(JSON.stringify(data)); //Will need to load up all the books and stuff, 
          //but we need to figure out the obj
          // so for now we will just go to the ui

          jQuery(".campaigns").remove();
        });
      }
    });
  });
}); //the delete button

jQuery(".campaignList").on("click", ".campDelete", function () {
  var toDelete = jQuery(this).attr("data-delete");
  var toDeleteName = jQuery(this).attr("data-name"); // console.log("clicked");
  //should add a are you sure popup

  deleteCampaign(toDeleteName, toDelete);
});
jQuery(".campaignList").on("click", ".saveNewCamp", function () {
  var newCampName = jQuery("input[name='newCamp']").val();
  var campObj = {
    "name": newCampName
  };
  thisCampaign = {
    "campaign": {
      "name": newCampName
    }
  };
  campaignObj.campaigns.push(campObj); // console.log(JSON.stringify(campaignObj))

  writeFile(campaignListPath, JSON.stringify(campaignObj)).then(function (data) {
    if (data == "File Written") {
      createCampaign(newCampName).then(function (data) {
        if (data == "done") {
          removeSpace(newCampName).then(function (data) {
            thisCampaignPath = campaignDirPath + data;
            writeFile(thisCampaignPath + "/camp.json", JSON.stringify(thisCampaign)).then(function () {
              jQuery(".campaigns").remove();
            });
          });
        } else {
          throw new Error(data);
        }
      });
    } else {
      throw new Error(data);
    }
  });
});

function deleteCampaign(toDeleteName, toDelete) {
  return new Promise(function (resolve, reject) {
    var newArray = campaignObj.campaigns; // console.log(newArray)
    // console.log("delet this number " + toDelete + " and this is the object" + JSON.stringify(campaignObj.campaigns));

    newArray.splice(toDelete, 1); // console.log(JSON.stringify(campaignObj));

    writeFile(campaignListPath, JSON.stringify(campaignObj)).then(function (data) {
      if (data == "File Written") {
        removeSpace(toDeleteName).then(function (data) {
          rimraf(campaignDirPath + data, function (stuff) {
            // console.log(stuff)
            getCampaigns(campaignListPath).then(function (data) {
              setCampaigns(data).then(function (campList) {
                jQuery(".campaignList").html(campList);
              });
            });
          });
        });
      }
    });
  });
}

function createCampaign(campName) {
  return new Promise(function (resolve, reject) {
    var dir;
    removeSpace(campName).then(function (data) {
      dir = campaignDirPath + data;
    });

    try {
      checkDirExist(dir).then(function (data) {
        if (data == "false") {
          createDir(dir).then(function (data) {
            resolve(data);
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function newCampaign() {
  getCampaigns(campaignListPath).then(function (data) {
    setCampaigns(data).then(function (html) {
      var addOnHtml = "<tr><td><input type='text' name='newCamp' /></td><td><button type='button' class='btn btn-primary saveNewCamp'>Save</button></td></tr></table>";
      var newHtml = html.replace("</table>", addOnHtml);
      jQuery(".campaignList").html(newHtml);
    });
  });
} //Gets the list of campaigns


function getCampaigns(path) {
  return new Promise(function (resolve, reject) {
    try {
      // console.log("getCampaigns " + path);
      checkFileExist(path).then(function (data) {
        // console.log(data);
        if (data == "true") {
          readAFile(path).then(function (campaigns) {
            campaigns = JSON.parse(campaigns);
            campaignObj = campaigns;
            resolve(campaignObj);
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
} //Puts the list of campaigns on the campaign selector.


function setCampaigns(campaigns) {
  return new Promise(function (resolve, reject) {
    try {
      var campArray = campaigns.campaigns;
      var html = "<table>";
      campArray.forEach(function (node, i) {
        // console.log(JSON.stringify(node))
        // console.log(campaigns.campaigns[i].name)
        html += "<tr><td>" + campaigns.campaigns[i].name + "</td><td><button type='button' data-name='" + campaigns.campaigns[i].name + "' data-load='" + i + "' class='btn btn-primary campLoad'>Load</button><button type='button' data-name='" + campaigns.campaigns[i].name + "' data-delete='" + i + "' class='btn btn-primary campDelete'>Delete</button></td></tr>";
      });
      html += "</table>";
      resolve(html);
    } catch (error) {
      reject(error);
    }
  });
}
"use strict";

jQuery(".close").click(function () {
  jQuery(this).parent().toggle();
});
jQuery(".menu button").click(function () {
  var openMe = jQuery(this).attr("data-open");
  jQuery("." + openMe).toggle();
  clearTop();
  jQuery("." + openMe).addClass("onTop");
});
"use strict";
"use strict";

function passivePerception() {
  callAbility('wis');
  jQuery('#passPerc').val(thisAbilityBonus + 10);
}
"use strict";

var profB = jQuery('#profBonus').val();
somethingClever();
jQuery('#profBonus').on("keyup", function () {
  profB = jQuery('#profBonus').val();
  somethingClever();
});

function somethingClever() {
  jQuery('.icon-prof').each(function () {
    var classes = ['icon-prof', 'icon-prof proficient', 'icon-prof expertise'];
    var currentClass = jQuery(this).attr('class');
    var currentPos = jQuery.inArray(currentClass, classes);
    var myProf = jQuery(this).parent().children('.profVal');
    updateProf(jQuery(myProf), currentPos);
  });
}

function updateProf(myProf, myProfSkillFlag) {
  var thisAbility = jQuery(myProf).attr('id');
  var thisAbilityBonusID = '#' + thisAbility + '-Bonus';
  var thisAbilityBonus = jQuery('.abilities ' + thisAbilityBonusID).text();
  var newVal = parseInt(thisAbilityBonus);

  if (myProfSkillFlag == 0) {
    var newVal = parseInt(thisAbilityBonus);
  }

  if (myProfSkillFlag == 1) {
    var newVal = parseInt(profB) + parseInt(thisAbilityBonus);
  }

  if (myProfSkillFlag == 2) {
    var newVal = parseInt(profB) * 2 + parseInt(thisAbilityBonus);
  }

  jQuery(myProf).text(newVal);
}

;
jQuery('.icon-prof').click(function () {
  var classes = ['icon-prof', 'icon-prof proficient', 'icon-prof expertise'];
  var currentClass = jQuery(this).attr('class');
  var currentPos = jQuery.inArray(currentClass, classes);
  var newPos = (currentPos + 1) % classes.length;
  var newClass = classes[newPos];
  jQuery(this).attr('class', newClass);
  var myProf = jQuery(this).parent().children('.profVal');
  updateProf(jQuery(myProf), newPos);
});
"use strict";

abrreviateLabels();
jQuery('.textSize #font-size-up').click(function () {
  var target = jQuery(this).parent().parent();
  var currSize = parseInt(jQuery(target).css('fontSize').split("px")[0]); // currSize = Math.round(currSize);

  var newSize = currSize + 3;

  if (newSize > 16) {
    newSize = 16;
  }

  var newEms = newSize / 16;
  jQuery(target).css('fontSize', newEms + 'em');
  abrreviateLabels();
});
jQuery('.textSize #font-size-down').click(function () {
  var target = jQuery(this).parent().parent();
  var currSize = parseInt(jQuery(target).css('fontSize').split("px")[0]);
  var newSize = currSize - 3;

  if (newSize < 9) {
    newSize = 9;
  }

  var newEms = newSize / 16;
  jQuery(target).css('fontSize', newEms + 'em');
  abrreviateLabels();
});
"use strict";

//themes
var buttonOptions = ['default', 'worn', 'light', 'black', 'gray', 'red'];
jQuery(buttonOptions).each(function () {
  var myStyle = this;
  var myId = '#' + myStyle;
  jQuery(myId).on("click", function () {
    $("body").removeAttr('class');
    jQuery('body').addClass('theme-' + myStyle);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImRlYXRoU2F2ZXMuanMiLCJsb2FkQm9va3MuanMiLCJsb2FkQ2FtcGFpZ24uanMiLCJtZW51QnV0dG9ucy5qcyIsIm5wYy5qcyIsInBhc3NpdmVQZXJjZXB0aW9uLmpzIiwicHJvZmljaWVuY2llcy5qcyIsInRleHRTaXplLmpzIiwidGhlbWVzLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsInJpbXJhZiIsImNhbXBhaWduTGlzdFBhdGgiLCJib29rUGF0aCIsImNhbXBhaWduRGlyUGF0aCIsInRoaXNDYW1wYWlnblBhdGgiLCJib29rcyIsIm5wYyIsImNhbXBhaWduT2JqIiwidGhpc0NhbXBhaWduIiwic3BhY2VDaGFyIiwialF1ZXJ5Iiwib24iLCJyZW1vdmUiLCJyZWFkeSIsImRyYWdnYWJsZSIsImNvbnRhaW5tZW50Iiwic2Nyb2xsIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0eSIsInVuZGVmaW5lZCIsImRvY3VtZW50Iiwic3RhcnRBcHAiLCJ0aGVuIiwiZGF0YSIsInNldENhbXBhaWducyIsImNhbXBMaXN0IiwicHJlcGVuZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0Q2FtcGFpZ25zIiwiZXJyb3IiLCJyZWFkQUZpbGUiLCJmaWxlcGF0aCIsInJlYWRGaWxlIiwiZXJyIiwibWVzc2FnZSIsIndyaXRlRmlsZSIsImdldERpckNvbnRlbnRzIiwiZGlyIiwiZmlsZXMiLCJmaWxlTmFtZXMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlTmFtZSIsInB1c2giLCJjaGVja0ZpbGVFeGlzdCIsInBhdGgiLCJhY2Nlc3MiLCJGX09LIiwiY2hlY2tEaXJFeGlzdCIsImV4aXN0c1N5bmMiLCJjcmVhdGVEaXIiLCJta2RpclN5bmMiLCJyZW1vdmVTcGFjZSIsInN0cmluZyIsImNsZWFuU3RyaW5nIiwicmVwbGFjZSIsImFkZFNwYWNlIiwiUmVnRXhwIiwidXBkYXRlQWJpbGl0eUJvbnVzIiwibXlBYmlsaXR5IiwiYWJpbGl0eSIsInZhbCIsIm1vZGlmaWVyIiwicGFyZW50IiwiY2hpbGRyZW4iLCJ0ZXh0IiwiaXNOdW1lcmljIiwiTWF0aCIsImZsb29yIiwiYXR0ciIsInBhc3NpdmVQZXJjZXB0aW9uIiwiZWFjaCIsInNlbGVjdCIsInVwZGF0ZVByb2YiLCJ0aGlzQWJpbGl0eSIsInRoaXNBYmlsaXR5Qm9udXMiLCJjYWxsQWJpbGl0eSIsInBhcnNlSW50IiwiYWJycmV2aWF0ZUxhYmVscyIsImFiYnJXb3JkcyIsIm15U2l6ZSIsImNzcyIsInNwbGl0IiwiaW5kZXgiLCJsYWJlbCIsIndvcmQiLCJsb25nIiwic2hvcnQiLCJjbGVhclRvcCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsImJvb2tGaWxlQXJyYXkiLCJib29rVGl0bGVBcnJheSIsImdldEJvb2tGaWxlcyIsImkiLCJsZW5ndGgiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJuYW1lIiwiZ2V0Qm9va1RpdGxlcyIsImNvbnNvbGUiLCJsb2ciLCJib29rQXJyYXkiLCJ0aXRsZUFycmF5IiwiY291bnQiLCJib29rIiwiYm9va1RpdGxlIiwiZGV0YWlscyIsImxpc3RCb29rcyIsInBhdGhBcnJheSIsIm5ld0NhbXBhaWduIiwidG9Mb2FkIiwidGhpc05hbWUiLCJ0aGlzRGlyIiwiYWxlcnQiLCJkZWxldGVDYW1wYWlnbiIsInRvRGVsZXRlIiwidG9EZWxldGVOYW1lIiwibmV3Q2FtcE5hbWUiLCJjYW1wT2JqIiwiY2FtcGFpZ25zIiwiY3JlYXRlQ2FtcGFpZ24iLCJFcnJvciIsIm5ld0FycmF5Iiwic3BsaWNlIiwic3R1ZmYiLCJodG1sIiwiY2FtcE5hbWUiLCJhZGRPbkh0bWwiLCJuZXdIdG1sIiwiY2FtcEFycmF5Iiwibm9kZSIsImNsaWNrIiwidG9nZ2xlIiwib3Blbk1lIiwicHJvZkIiLCJzb21ldGhpbmdDbGV2ZXIiLCJjbGFzc2VzIiwiY3VycmVudENsYXNzIiwiY3VycmVudFBvcyIsImluQXJyYXkiLCJteVByb2YiLCJteVByb2ZTa2lsbEZsYWciLCJ0aGlzQWJpbGl0eUJvbnVzSUQiLCJuZXdWYWwiLCJuZXdQb3MiLCJuZXdDbGFzcyIsInRhcmdldCIsImN1cnJTaXplIiwibmV3U2l6ZSIsIm5ld0VtcyIsImJ1dHRvbk9wdGlvbnMiLCJteVN0eWxlIiwibXlJZCIsIiQiLCJyZW1vdmVBdHRyIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0U7O0FBQ0EsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFoQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCLEMsQ0FFRjs7O0FBQ0EsSUFBSUUsZ0JBQWdCLEdBQUcsaUJBQXZCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLFVBQWY7QUFDQSxJQUFJQyxlQUFlLEdBQUcsY0FBdEI7QUFDQSxJQUFJQyxnQkFBSixDLENBQ0E7QUFFQTs7QUFDQSxJQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLElBQUlDLEdBQUcsR0FBRyxFQUFWO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEVBQW5CLEMsQ0FDQTtBQUVBOztBQUNBLElBQUlDLFNBQVMsR0FBRyxJQUFoQixDLENBQ0E7QUFFQTs7QUFDQUMsTUFBTSxDQUFDLGtCQUFELENBQU4sQ0FBMkJDLEVBQTNCLENBQThCLE9BQTlCLEVBQXVDLFlBQVU7QUFDL0NELEVBQUFBLE1BQU0sQ0FBQyxZQUFELENBQU4sQ0FBcUJFLE1BQXJCO0FBQ0QsQ0FGRDtBQUlBRixNQUFNLENBQUMsVUFBRCxDQUFOLENBQW1CRyxLQUFuQixDQUF5QixZQUFZO0FBQ25DSCxFQUFBQSxNQUFNLENB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TUFBTSxDQUFDcUosSUFBRCxDQUFOLENBQWFwSixFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFlBQVc7QUFDaENxSixJQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVDLFVBQVYsQ0FBcUIsT0FBckI7QUFDQXZKLElBQUFBLE1BQU0sQ0FBQyxNQUFELENBQU4sQ0FBZW9GLFFBQWYsQ0FBd0IsV0FBV2dFLE9BQW5DO0FBQ0gsR0FIRDtBQUlILENBUEQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG4gIC8vIHJlbW92ZSBsaW5lIGJlbG93IHdoZW4gdGVzdGluZyBmcm9udGVuZFxyXG4gIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcbiAgdmFyIHJpbXJhZiA9IHJlcXVpcmUoXCJyaW1yYWZcIik7XHJcblxyXG4vLyBQYXRoc1xyXG5sZXQgY2FtcGFpZ25MaXN0UGF0aCA9IFwiLi9jYW1wYWlnbi5qc29uXCI7XHJcbmxldCBib29rUGF0aCA9IFwiLi9ib29rcy9cIjtcclxubGV0IGNhbXBhaWduRGlyUGF0aCA9IFwiLi9jYW1wYWlnbnMvXCI7XHJcbmxldCB0aGlzQ2FtcGFpZ25QYXRoO1xyXG4vLy9cclxuXHJcbi8vZ2xvZGFsIG9iamVjdHNcclxudmFyIGJvb2tzID0ge307XHJcbnZhciBucGMgPSB7fTtcclxudmFyIGNhbXBhaWduT2JqID0ge307XHJcbnZhciB0aGlzQ2FtcGFpZ24gPSB7fTtcclxuLy8vXHJcblxyXG4vL2dsb2JhbCB2YXJzXHJcbmxldCBzcGFjZUNoYXIgPSBcIl9fXCI7XHJcbi8vL1xyXG5cclxuLy90ZW1wIHRvIGNvc2UgdGhlIGNhbXBhaWduIHBpY2tlci5cclxualF1ZXJ5KFwiLmNsb3NlQ2FtcFdpbmRvd1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgalF1ZXJ5KFwiLmNhbXBhaWduc1wiKS5yZW1vdmUoKTtcclxufSk7XHJcblxyXG5qUXVlcnkoXCJkb2N1bWVudFwiKS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgalF1ZXJ5KFwiLmRyYWdcIikuZHJhZ2dhYmxlKHtcclxuICAgICAgY29udGFpbm1lbnQ6IFwiLm1haW5WaWV3XCIsXHJcbiAgICAgIHNjcm9sbDogZmFsc2VcclxuICB9KTtcclxuXHJcblxyXG59KTtcclxuXHJcbk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgPSBmdW5jdGlvbihwcm9wZXJ0eSkge1xyXG5yZXR1cm4gdGhpc1twcm9wZXJ0eV0gIT09IHVuZGVmaW5lZDtcclxufTtcclxuXHJcblxyXG4vLyAgICAgICAgLy9sb29rIGZvciBucGMsIHRoaXMgd2lsbCBldmVudHVhbGx5IGJlIGl0cyBvd24gZnVuY3Rpb25cclxuLy8gICAgICAgaWYoYm9va1RpdGxlLmhhc093blByb3BlcnR5KFwiTlBDXCIpKXtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lK1wiIHRydWVcIilcclxuLy8gICAgICAgfWVsc2V7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJub25lIGZvdW5kXCIpXHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICB9XHJcbi8vIH0pO1xyXG4iLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgXHJcbiAgc3RhcnRBcHAoKS50aGVuKChkYXRhKT0+e1xyXG4gICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGNhbXBMaXN0KT0+e1xyXG4gICAgICBqUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLnByZXBlbmQoY2FtcExpc3QpO1xyXG4gICAgfSlcclxuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGNhbXBhaWduT2JqKVxyXG4gIH0pO1xyXG4gXHJcbiAgfSlcclxuICBcclxuXHJcbiAgZnVuY3Rpb24gc3RhcnRBcHAoKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICB0cnl7XHJcbiAgICAgICAgZ2V0Q2FtcGFpZ25zKGNhbXBhaWduTGlzdFBhdGgpLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICB9IGNhdGNoIChlcnJvcil7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIFxyXG4gIH0iLCIndXNlIHN0cmljdCc7XHJcblxyXG5mdW5jdGlvbiByZWFkQUZpbGUoZmlsZXBhdGgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZnMucmVhZEZpbGUoZmlsZXBhdGgsICd1dGYtOCcsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiQW4gZXJyb3Igb2N1cnJlZCByZWFkaW5nIHRoZSBmaWxlIDpcIiArIGVyci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcIkZpbGUgV3JpdHRlblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGlyQ29udGVudHMoZGlyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHZhciBmaWxlcyA9IHt9O1xyXG4gICAgICAgIHZhciBmaWxlTmFtZXMgPSBbXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmcy5yZWFkZGlyU3luYyhkaXIpLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IGZpbGVOYW1lXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgZmlsZXMgPSB7IFwiZmlsZXNcIjogZmlsZU5hbWVzIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXNvbHZlKGZpbGVzKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0ZpbGVFeGlzdChwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGlmICghcGF0aCkge1xyXG4gICAgICAgICAgICByZWplY3QoXCJQYXRoIGlzIGludmFsaWQgXCIgKyBwYXRoKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmcy5hY2Nlc3MocGF0aCwgZnMuRl9PSywgKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoXCJlcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tEaXJFeGlzdChkaXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlyKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcInRydWVcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiZmFsc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGlyKGRpcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlyKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShcImRvbmVcIik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3BhY2Uoc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBjbGVhblN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHMvZywgc3BhY2VDaGFyKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShjbGVhblN0cmluZyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFNwYWNlKHN0cmluZykge1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGFkZFNwYWNlID0gbmV3IFJlZ0V4cChzcGFjZUNoYXIsIFwiZ1wiKVxyXG4gICAgICAgICAgICB2YXIgY2xlYW5TdHJpbmcgPSBzdHJpbmcucmVwbGFjZShhZGRTcGFjZSwgL1xccy8pO1xyXG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuLy93cml0ZSB0ZXN0XHJcbi8vIHZhciB0ZXN0T2JqICA9IFwiVGhpcyBpcyBhIHdyaXRlIHRlc3RcIjtcclxuLy8gd3JpdGVGaWxlKFwiLi4vdGVzdC50eHRcIiwgdGVzdE9iaik7XHJcbiIsIlxyXG5mdW5jdGlvbiB1cGRhdGVBYmlsaXR5Qm9udXMobXlBYmlsaXR5KSB7XHJcbiAgICB2YXIgYWJpbGl0eSA9IGpRdWVyeShteUFiaWxpdHkpLnZhbCgpO1xyXG5cclxuICAgIHZhciBtb2RpZmllciA9IGpRdWVyeShteUFiaWxpdHkpLnBhcmVudCgpLmNoaWxkcmVuKCcubW9kaWZpZXItYnViYmxlJykudGV4dCgpO1xyXG4gICAgaWYgKCFqUXVlcnkuaXNOdW1lcmljKGFiaWxpdHkpKSB7XHJcbiAgICAgICAgYWJpbGl0eSA9IDE7XHJcbiAgICAgICAgalF1ZXJ5KG15QWJpbGl0eSkudmFsKGFiaWxpdHkpO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kaWZpZXIgPSBNYXRoLmZsb29yKChhYmlsaXR5IC0gMTApIC8gMik7XHJcbiAgICBqUXVlcnkobXlBYmlsaXR5KS5wYXJlbnQoKS5jaGlsZHJlbignLm1vZGlmaWVyLWJ1YmJsZScpLnRleHQobW9kaWZpZXIpO1xyXG4gICAgXHJcbiAgICBpZiAobXlBYmlsaXR5LmF0dHIoJ2lkJykgPT0gJ3dpcycpIHtcclxuICAgICAgICBwYXNzaXZlUGVyY2VwdGlvbigpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmpRdWVyeShcIi5hYmlsaXR5XCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB1cGRhdGVBYmlsaXR5Qm9udXMoalF1ZXJ5KHRoaXMpKTtcclxuXHJcbiAgICBqUXVlcnkodGhpcykub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBqUXVlcnkodGhpcykuc2VsZWN0KCk7XHJcbiAgICB9KVxyXG4gICAgalF1ZXJ5KHRoaXMpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdXBkYXRlQWJpbGl0eUJvbnVzKGpRdWVyeSh0aGlzKSk7XHJcbiAgICAgICAgdXBkYXRlUHJvZihqUXVlcnkoJy5zYXZpbmdUaHJvd3MgIycralF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJykpKTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwidmFyIHRoaXNBYmlsaXR5ID0gXCJcIjtcclxudmFyIHRoaXNBYmlsaXR5Qm9udXMgPSBcIlwiO1xyXG5cclxuZnVuY3Rpb24gY2FsbEFiaWxpdHkoYWJpbGl0eSkge1xyXG4gICAgdGhpc0FiaWxpdHkgPSBqUXVlcnkoJy5hYmlsaXR5LWJveCAjJythYmlsaXR5KS52YWwoKTtcclxuICAgIHRoaXNBYmlsaXR5Qm9udXMgPSBwYXJzZUludChqUXVlcnkoJy5hYmlsaXR5LWJveCAjJythYmlsaXR5KyctQm9udXMnKS50ZXh0KCkpO1xyXG59XHJcbiIsImZ1bmN0aW9uIGFicnJldmlhdGVMYWJlbHMoKSB7XHJcbiAgICB2YXIgYWJicldvcmRzID0gWydTcGVlZHxTUEQnLCdJbml0aWF0aXZlfElOSVQnLCdUZW1wb3Jhcnl8VEVNUCcsJ0hpdCBQb2ludHN8SFAnLCdBcm1vciBDbGFzc3xBQycsJ01heGltdW18TUFYJywnQ3VycmVudHxDUk5UJywnRXhwZXJpZW5jZSBQb2ludHN8WFAnXTtcclxuICAgIHZhciBteVNpemUgPSBqUXVlcnkoJy5jaGFyU2hlZXQnKS5jc3MoJ2ZvbnQtc2l6ZScpO1xyXG4gICAgbXlTaXplID0gcGFyc2VJbnQobXlTaXplLnNwbGl0KCdweCcpWzBdKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKG15U2l6ZSk7XHJcbiAgICBpZiAobXlTaXplPDE2KSB7XHJcbiAgICAgICAgalF1ZXJ5KCdsYWJlbCcpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCBsYWJlbCkge1xyXG4gICAgICAgICAgICBqUXVlcnkoYWJicldvcmRzKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgd29yZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxvbmcgPSB3b3JkLnNwbGl0KCd8JylbMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvcnQgPSB3b3JkLnNwbGl0KCd8JylbMV07XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkobGFiZWwpLnRleHQoZnVuY3Rpb24oaW5kZXgsIHRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKGxvbmcsIHNob3J0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeShhYmJyV29yZHMpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCB3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IHdvcmQuc3BsaXQoJ3wnKVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShsYWJlbCkudGV4dChmdW5jdGlvbihpbmRleCwgdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2Uoc2hvcnQsIGxvbmcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIiwiLy8galF1ZXJ5KCcjY2xhc3NNYW5hZ2VyJykuaGlkZSgpO1xyXG4vL1xyXG4vLyB2YXIgZ2V0TGFiZWwgPSBqUXVlcnkoJy5jaGFyU2hlZXQgI2NsYXNzTW9yZScpLmh0bWwoKTtcclxuLy8gY29uc29sZS5sb2coZ2V0TGFiZWwpO1xyXG4vLyBnZXRMYWJlbCA9IGdldExhYmVsKyc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpyaWdodDsgZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOjEwZW07XCI+aGVsbG8hPC9kaXY+JztcclxuLy8gY29uc29sZS5sb2coZ2V0TGFiZWwpO1xyXG4vLyBqUXVlcnkoJy5jaGFyU2hlZXQgI2NsYXNzTW9yZScpLmh0bWwoZ2V0TGFiZWwpO1xyXG5cclxuLy8gPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjZG93bkFuZ2xlXCI+PC91c2U+PC9zdmc+XHJcbiIsImZ1bmN0aW9uIGNsZWFyVG9wKCkge1xyXG4gICAgalF1ZXJ5KFwiLmRyYWdcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICBqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoXCJvblRvcFwiKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxualF1ZXJ5KFwiLmRyYWdcIikub24oXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBjbGVhclRvcCgpO1xyXG4gICAgalF1ZXJ5KHRoaXMpLmFkZENsYXNzKFwib25Ub3BcIik7XHJcbn0pO1xyXG4iLCJqUXVlcnkoXCIuZGVhdGhTYXZlc1wiKS5vbihcImNsaWNrXCIsIFwiLmljb25cIiwgZnVuY3Rpb24oKSB7XHJcbiAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxufSk7XHJcbmpRdWVyeShcIi5kZWF0aFNhdmVzXCIpLm9uKFwiY2xpY2tcIiwgXCIucmVhcGVyXCIsIGZ1bmN0aW9uKCkge1xyXG4gIGpRdWVyeShcIi5pY29uXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxufSk7XHJcbiIsIi8vIGdldERpckNvbnRlbnRzKFwiLi9ib29rc1wiKS50aGVuKGZ1bmN0aW9uIChmaWxlcykge1xyXG4vLyAgIC8vIGNvbnNvbGUubG9nKCk7XHJcbi8vICAgLy8gY29uc29sZS5sb2coSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWxlcy5maWxlc1swXS5uYW1lKSkpO1xyXG4vLyAgIGZvcih2YXIgaSA9IDA7IGkgPD0gZmlsZXMuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbi8vICAgICByZWFkQUZpbGUoXCIuL2Jvb2tzL1wiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWxlcy5maWxlc1tpXS5uYW1lKSkpLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcclxuLy8gICAgICAgdmFyIGJvb2tUaXRsZSA9IEpTT04ucGFyc2UoYm9vayk7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpO1xyXG4vLyAgICAgICBqUXVlcnkoXCIuYm9va0xpc3RcIikuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiYm9va1wiPiR7Ym9va1RpdGxlLmRldGFpbHMubmFtZX08ZGl2PmApO1xyXG5cclxuLy8gICAgICAgIC8vbG9vayBmb3IgbnBjLCB0aGlzIHdpbGwgZXZlbnR1YWxseSBiZSBpdHMgb3duIGZ1bmN0aW9uXHJcbi8vICAgICAgIGlmKGJvb2tUaXRsZS5oYXNPd25Qcm9wZXJ0eShcIk5QQ1wiKSl7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coYm9va1RpdGxlLmRldGFpbHMubmFtZStcIiB0cnVlXCIpXHJcbi8vICAgICAgIH1lbHNle1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwibm9uZSBmb3VuZFwiKVxyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgfSk7XHJcblxyXG5cclxuXHJcbi8vICAgfVxyXG4vLyB9KTtcclxubGV0IGJvb2tGaWxlQXJyYXkgPSBbXTtcclxubGV0IGJvb2tUaXRsZUFycmF5ID0gW107XHJcbmdldEJvb2tGaWxlcygpLnRoZW4oKGRhdGEpID0+IHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBkYXRhLmZpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIHZhciBwYXRoID0gYm9va1BhdGggKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuZmlsZXNbaV0ubmFtZSkpXHJcbiAgICAgICAgYm9va0ZpbGVBcnJheS5wdXNoKHBhdGgpO1xyXG4gICAgICAgIGlmIChpID09IGRhdGEuZmlsZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBnZXRCb29rVGl0bGVzKGJvb2tGaWxlQXJyYXkpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgICBib29rVGl0bGVBcnJheS5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGJvb2tGaWxlQXJyYXkpO1xyXG4gICAgICBjb25zb2xlLmxvZyhib29rVGl0bGVBcnJheSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZ2V0Qm9va1RpdGxlcyhib29rQXJyYXkpIHtcclxuICAgIGNvbnNvbGUubG9nKGJvb2tBcnJheSlcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHRpdGxlQXJyYXkgPSBbXTtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGk8PWJvb2tBcnJheS5sZW5ndGgtMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgcmVhZEFGaWxlKGJvb2tBcnJheVtpXSkudGhlbihmdW5jdGlvbiAoYm9vaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBib29rVGl0bGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGJvb2spKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZUFycmF5LnB1c2goYm9va1RpdGxlLmRldGFpbHMubmFtZSlcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGZpbGUpXHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBib29rQXJyYXkubGVuZ3RoLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlcmVcIilcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRpdGxlQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRCb29rRmlsZXMoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGdldERpckNvbnRlbnRzKGJvb2tQYXRoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGxpc3RCb29rcygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHRpdGxlQXJyYXkgPSBbXTtcclxuICAgICAgICBsZXQgcGF0aEFycmF5ID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZ2V0RGlyQ29udGVudHMoYm9va1BhdGgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBib29rUGF0aCArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5maWxlc1tpXS5uYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICBwYXRoQXJyYXkucHVzaChwYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRBRmlsZShwYXRoKS50aGVuKGZ1bmN0aW9uIChib29rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBib29rVGl0bGUgPSBKU09OLnBhcnNlKGJvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgYm9va09iaiA9IHtcIm5hbWVcIjpib29rVGl0bGUuZGV0YWlscy5uYW1lLCBcInBhdGhcIjpwYXRofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUFycmF5LnB1c2goYm9va1RpdGxlLmRldGFpbHMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlQXJyYXkubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBmb3IodmFyIGk9MDtpPD10aXRsZUFycmF5Lmxlbmd0aCAtMTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwic3R1ZmZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGl0bGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGksa2V5KXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpcyBpIFwiK2krXCIsIHRoaXMgaXMga2V5P1wiK2tleSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAvLyBib29rcyA9IHtcImJvb2tzXCI6dGl0bGVBcnJheX07XHJcbiAgICAgICAgICAgICAgICAvLyByZXNvbHZlKGJvb2tzKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcilcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSIsIi8qKlxyXG4gKiBOZWVkIHRvIGJ1aWxkIGxvYWRpbmcgYSBjYW1wYWlnblxyXG4gKiBuZWVkIG5ldyBjYW1wYWlnbiB0byBtYWtlIHN1cmUgaXRzIG5hbWUgaXMgdW5pcXVlLlxyXG4gKi9cclxuXHJcblxyXG5qUXVlcnkoXCIuY2FtcEFkZFwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIG5ld0NhbXBhaWduKCk7XHJcbn0pO1xyXG5cclxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLmNhbXBMb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0b0xvYWQgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbG9hZFwiKTtcclxuICAgIHZhciB0aGlzTmFtZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1uYW1lXCIpO1xyXG4gICAgdmFyIHRoaXNEaXI7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRvTG9hZE5hbWUpXHJcbiAgICByZW1vdmVTcGFjZSh0aGlzTmFtZSkudGhlbigobmFtZSkgPT4ge1xyXG4gICAgICAgIHRoaXNEaXIgPSBjYW1wYWlnbkRpclBhdGggKyBuYW1lICsgXCIvY2FtcC5qc29uXCI7XHJcbiAgICAgICAgY2hlY2tGaWxlRXhpc3QodGhpc0RpcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhpcyBjYW1wYWlnbiBkb2Vzbid0IGV4aXN0Li4uIE5vdyBkZWxldGluZ1wiKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZUNhbXBhaWduKHRoaXNOYW1lLCB0b0xvYWQpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWFkQUZpbGUodGhpc0RpcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNDYW1wYWlnbiA9PSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL1dpbGwgbmVlZCB0byBsb2FkIHVwIGFsbCB0aGUgYm9va3MgYW5kIHN0dWZmLCBcclxuICAgICAgICAgICAgICAgICAgICAvL2J1dCB3ZSBuZWVkIHRvIGZpZ3VyZSBvdXQgdGhlIG9ialxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIGZvciBub3cgd2Ugd2lsbCBqdXN0IGdvIHRvIHRoZSB1aVxyXG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbnNcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KVxyXG5cclxuLy90aGUgZGVsZXRlIGJ1dHRvblxyXG5qUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2FtcERlbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdG9EZWxldGUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtZGVsZXRlXCIpO1xyXG4gICAgdmFyIHRvRGVsZXRlTmFtZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1uYW1lXCIpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJjbGlja2VkXCIpO1xyXG4gICAgLy9zaG91bGQgYWRkIGEgYXJlIHlvdSBzdXJlIHBvcHVwXHJcbiAgICBkZWxldGVDYW1wYWlnbih0b0RlbGV0ZU5hbWUsIHRvRGVsZXRlKVxyXG59KTtcclxuXHJcbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5zYXZlTmV3Q2FtcFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbmV3Q2FtcE5hbWUgPSBqUXVlcnkoXCJpbnB1dFtuYW1lPSduZXdDYW1wJ11cIikudmFsKCk7XHJcbiAgICB2YXIgY2FtcE9iaiA9IHtcclxuICAgICAgICBcIm5hbWVcIjogbmV3Q2FtcE5hbWVcclxuICAgIH07XHJcbiAgICB0aGlzQ2FtcGFpZ24gPSB7XHJcbiAgICAgICAgXCJjYW1wYWlnblwiOiB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBuZXdDYW1wTmFtZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhbXBhaWduT2JqLmNhbXBhaWducy5wdXNoKGNhbXBPYmopOyAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpXHJcblxyXG4gICAgd3JpdGVGaWxlKGNhbXBhaWduTGlzdFBhdGgsIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhID09IFwiRmlsZSBXcml0dGVuXCIpIHtcclxuICAgICAgICAgICAgY3JlYXRlQ2FtcGFpZ24obmV3Q2FtcE5hbWUpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhID09IFwiZG9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU3BhY2UobmV3Q2FtcE5hbWUpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0NhbXBhaWduUGF0aCA9IGNhbXBhaWduRGlyUGF0aCArIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlRmlsZSh0aGlzQ2FtcGFpZ25QYXRoICsgXCIvY2FtcC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KHRoaXNDYW1wYWlnbikpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZUNhbXBhaWduKHRvRGVsZXRlTmFtZSwgdG9EZWxldGUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdmFyIG5ld0FycmF5ID0gY2FtcGFpZ25PYmouY2FtcGFpZ25zO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0FycmF5KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGVsZXQgdGhpcyBudW1iZXIgXCIgKyB0b0RlbGV0ZSArIFwiIGFuZCB0aGlzIGlzIHRoZSBvYmplY3RcIiArIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqLmNhbXBhaWducykpO1xyXG4gICAgICAgIG5ld0FycmF5LnNwbGljZSh0b0RlbGV0ZSwgMSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKTtcclxuICAgICAgICB3cml0ZUZpbGUoY2FtcGFpZ25MaXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhID09IFwiRmlsZSBXcml0dGVuXCIpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVNwYWNlKHRvRGVsZXRlTmFtZSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJpbXJhZihjYW1wYWlnbkRpclBhdGggKyBkYXRhLCAoc3R1ZmYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3R1ZmYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENhbXBhaWducyhjYW1wYWlnbkxpc3RQYXRoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoY2FtcExpc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLmh0bWwoY2FtcExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDYW1wYWlnbihjYW1wTmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB2YXIgZGlyO1xyXG4gICAgICAgIHJlbW92ZVNwYWNlKGNhbXBOYW1lKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGRpciA9IGNhbXBhaWduRGlyUGF0aCArIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY2hlY2tEaXJFeGlzdChkaXIpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURpcihkaXIpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbmV3Q2FtcGFpZ24oKSB7XHJcbiAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIHNldENhbXBhaWducyhkYXRhKS50aGVuKChodG1sKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBhZGRPbkh0bWwgPSBcIjx0cj48dGQ+PGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J25ld0NhbXAnIC8+PC90ZD48dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgc2F2ZU5ld0NhbXAnPlNhdmU8L2J1dHRvbj48L3RkPjwvdHI+PC90YWJsZT5cIjtcclxuICAgICAgICAgICAgdmFyIG5ld0h0bWwgPSBodG1sLnJlcGxhY2UoXCI8L3RhYmxlPlwiLCBhZGRPbkh0bWwpO1xyXG4gICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLmh0bWwobmV3SHRtbCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG59XHJcblxyXG4vL0dldHMgdGhlIGxpc3Qgb2YgY2FtcGFpZ25zXHJcbmZ1bmN0aW9uIGdldENhbXBhaWducyhwYXRoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0Q2FtcGFpZ25zIFwiICsgcGF0aCk7XHJcbiAgICAgICAgICAgIGNoZWNrRmlsZUV4aXN0KHBhdGgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFkQUZpbGUocGF0aCkudGhlbigoY2FtcGFpZ25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbXBhaWducyA9IEpTT04ucGFyc2UoY2FtcGFpZ25zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FtcGFpZ25PYmogPSBjYW1wYWlnbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FtcGFpZ25PYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8vUHV0cyB0aGUgbGlzdCBvZiBjYW1wYWlnbnMgb24gdGhlIGNhbXBhaWduIHNlbGVjdG9yLlxyXG5mdW5jdGlvbiBzZXRDYW1wYWlnbnMoY2FtcGFpZ25zKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBjYW1wQXJyYXkgPSBjYW1wYWlnbnMuY2FtcGFpZ25zO1xyXG4gICAgICAgICAgICB2YXIgaHRtbCA9IFwiPHRhYmxlPlwiO1xyXG4gICAgICAgICAgICBjYW1wQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAobm9kZSwgaSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobm9kZSkpXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUpXHJcbiAgICAgICAgICAgICAgICBodG1sICs9IFwiPHRyPjx0ZD5cIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiPC90ZD48dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtbmFtZT0nXCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIicgZGF0YS1sb2FkPSdcIiArIGkgKyBcIicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBjYW1wTG9hZCc+TG9hZDwvYnV0dG9uPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLW5hbWU9J1wiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCInIGRhdGEtZGVsZXRlPSdcIiArIGkgKyBcIicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBjYW1wRGVsZXRlJz5EZWxldGU8L2J1dHRvbj48L3RkPjwvdHI+XCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L3RhYmxlPlwiO1xyXG5cclxuICAgICAgICAgICAgcmVzb2x2ZShodG1sKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImpRdWVyeShcIi5jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBqUXVlcnkodGhpcykucGFyZW50KCkudG9nZ2xlKCk7XHJcbn0pXHJcbmpRdWVyeShcIi5tZW51IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgb3Blbk1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW9wZW5cIik7XHJcbiAgICBqUXVlcnkoXCIuXCIgKyBvcGVuTWUpLnRvZ2dsZSgpO1xyXG4gICAgY2xlYXJUb3AoKTtcclxuICAgIGpRdWVyeShcIi5cIiArIG9wZW5NZSkuYWRkQ2xhc3MoXCJvblRvcFwiKTtcclxufSk7XHJcbiIsIiIsImZ1bmN0aW9uIHBhc3NpdmVQZXJjZXB0aW9uKCkge1xyXG4gICAgY2FsbEFiaWxpdHkoJ3dpcycpO1xyXG4gICAgalF1ZXJ5KCcjcGFzc1BlcmMnKS52YWwodGhpc0FiaWxpdHlCb251cysxMCk7XHJcbn1cclxuIiwidmFyIHByb2ZCID0galF1ZXJ5KCcjcHJvZkJvbnVzJykudmFsKCk7XHJcbnNvbWV0aGluZ0NsZXZlcigpO1xyXG5cclxualF1ZXJ5KCcjcHJvZkJvbnVzJykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcclxuICAgIHByb2ZCID0galF1ZXJ5KCcjcHJvZkJvbnVzJykudmFsKCk7XHJcbiAgICBzb21ldGhpbmdDbGV2ZXIoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBzb21ldGhpbmdDbGV2ZXIoKSB7XHJcbiAgICBqUXVlcnkoJy5pY29uLXByb2YnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbGFzc2VzID0gWydpY29uLXByb2YnLCAnaWNvbi1wcm9mIHByb2ZpY2llbnQnLCAnaWNvbi1wcm9mIGV4cGVydGlzZSddO1xyXG4gICAgICAgIHZhciBjdXJyZW50Q2xhc3MgPSBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnKTtcclxuICAgICAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XHJcbiAgICAgICAgdmFyIG15UHJvZiA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignLnByb2ZWYWwnKTtcclxuICAgICAgICB1cGRhdGVQcm9mKGpRdWVyeShteVByb2YpLCBjdXJyZW50UG9zKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9mKG15UHJvZiwgbXlQcm9mU2tpbGxGbGFnKSB7XHJcbiAgICB2YXIgdGhpc0FiaWxpdHkgPSBqUXVlcnkobXlQcm9mKS5hdHRyKCdpZCcpO1xyXG4gICAgdmFyIHRoaXNBYmlsaXR5Qm9udXNJRCA9ICcjJyArIHRoaXNBYmlsaXR5ICsgJy1Cb251cyc7XHJcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251cyA9IGpRdWVyeSgnLmFiaWxpdGllcyAnICsgdGhpc0FiaWxpdHlCb251c0lEKS50ZXh0KCk7XHJcbiAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XHJcbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDApIHtcclxuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XHJcbiAgICB9XHJcbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDEpIHtcclxuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICsgcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XHJcbiAgICB9XHJcbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDIpIHtcclxuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICogMiArIChwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKSk7XHJcbiAgICB9XHJcbiAgICBqUXVlcnkobXlQcm9mKS50ZXh0KG5ld1ZhbCk7XHJcbn07XHJcblxyXG5cclxualF1ZXJ5KCcuaWNvbi1wcm9mJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgY2xhc3NlcyA9IFsnaWNvbi1wcm9mJywgJ2ljb24tcHJvZiBwcm9maWNpZW50JywgJ2ljb24tcHJvZiBleHBlcnRpc2UnXTtcclxuICAgIHZhciBjdXJyZW50Q2xhc3MgPSBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnKTtcclxuICAgIHZhciBjdXJyZW50UG9zID0galF1ZXJ5LmluQXJyYXkoY3VycmVudENsYXNzLCBjbGFzc2VzKTtcclxuICAgIHZhciBuZXdQb3MgPSAoKGN1cnJlbnRQb3MgKyAxKSAlIGNsYXNzZXMubGVuZ3RoKTtcclxuICAgIHZhciBuZXdDbGFzcyA9IGNsYXNzZXNbbmV3UG9zXTtcclxuICAgIGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycsIG5ld0NsYXNzKTtcclxuICAgIHZhciBteVByb2YgPSBqUXVlcnkodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJy5wcm9mVmFsJyk7XHJcbiAgICB1cGRhdGVQcm9mKGpRdWVyeShteVByb2YpLCBuZXdQb3MpO1xyXG59KTtcclxuIiwiYWJycmV2aWF0ZUxhYmVscygpO1xyXG5qUXVlcnkoJy50ZXh0U2l6ZSAjZm9udC1zaXplLXVwJykuY2xpY2soIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhcmdldCA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgIHZhciBjdXJyU2l6ZSA9IHBhcnNlSW50KGpRdWVyeSh0YXJnZXQpLmNzcygnZm9udFNpemUnKS5zcGxpdChcInB4XCIpWzBdKTtcclxuICAgIC8vIGN1cnJTaXplID0gTWF0aC5yb3VuZChjdXJyU2l6ZSk7XHJcbiAgICB2YXIgbmV3U2l6ZSA9IGN1cnJTaXplKzM7XHJcbiAgICBpZiAobmV3U2l6ZSA+IDE2KXtcclxuICAgICAgICBuZXdTaXplID0gMTY7XHJcbiAgICB9XHJcbiAgICB2YXIgbmV3RW1zID0gKG5ld1NpemUvMTYpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScsbmV3RW1zKydlbScpO1xyXG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xyXG59KVxyXG5cclxualF1ZXJ5KCcudGV4dFNpemUgI2ZvbnQtc2l6ZS1kb3duJykuY2xpY2soIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRhcmdldCA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuICAgIHZhciBjdXJyU2l6ZSA9IHBhcnNlSW50KGpRdWVyeSh0YXJnZXQpLmNzcygnZm9udFNpemUnKS5zcGxpdChcInB4XCIpWzBdKTtcclxuICAgIHZhciBuZXdTaXplID0gY3VyclNpemUtMztcclxuICAgIGlmIChuZXdTaXplIDwgOSl7XHJcbiAgICAgICAgbmV3U2l6ZSA9IDk7XHJcbiAgICB9XHJcbiAgICB2YXIgbmV3RW1zID0gKG5ld1NpemUvMTYpO1xyXG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScsbmV3RW1zKydlbScpO1xyXG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xyXG59KVxyXG4iLCIvL3RoZW1lc1xyXG52YXIgYnV0dG9uT3B0aW9ucyA9IFsnZGVmYXVsdCcsICd3b3JuJywgJ2xpZ2h0JywgJ2JsYWNrJywgJ2dyYXknLCAncmVkJ107XHJcbmpRdWVyeShidXR0b25PcHRpb25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG15U3R5bGUgPSB0aGlzO1xyXG4gICAgdmFyIG15SWQgPSAnIycgKyBteVN0eWxlO1xyXG4gICAgalF1ZXJ5KG15SWQpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQXR0cignY2xhc3MnKTtcclxuICAgICAgICBqUXVlcnkoJ2JvZHknKS5hZGRDbGFzcygndGhlbWUtJyArIG15U3R5bGUpO1xyXG4gICAgfSlcclxufSlcclxuIl19

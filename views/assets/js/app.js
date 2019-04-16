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
  }

  getBookTitles(bookFileArray).then(function (data) {
    console.log(data); // bookTitleArray.push(data);
  }); //  console.log(bookFileArray);
  //  console.log(bookTitleArray);
});

function getBookTitles(bookArray) {
  return new Promise(function (resolve, reject) {
    var titleArray = [];
    var count = 0;

    try {
      bookArray.forEach(function (key, i) {
        count++;
        readAFile(key).then(function (book) {
          var bookTitle = JSON.parse(book);
          titleArray.push(bookTitle.details.name);

          if (count == bookArray.length - 1) {
            console.log("here");
            resolve(titleArray);
          }
        }); // console.log(file)
      });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImRlYXRoU2F2ZXMuanMiLCJsb2FkQm9va3MuanMiLCJsb2FkQ2FtcGFpZ24uanMiLCJtZW51QnV0dG9ucy5qcyIsIm5wYy5qcyIsInBhc3NpdmVQZXJjZXB0aW9uLmpzIiwicHJvZmljaWVuY2llcy5qcyIsInRleHRTaXplLmpzIiwidGhlbWVzLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsInJpbXJhZiIsImNhbXBhaWduTGlzdFBhdGgiLCJib29rUGF0aCIsImNhbXBhaWduRGlyUGF0aCIsInRoaXNDYW1wYWlnblBhdGgiLCJib29rcyIsIm5wYyIsImNhbXBhaWduT2JqIiwidGhpc0NhbXBhaWduIiwic3BhY2VDaGFyIiwialF1ZXJ5Iiwib24iLCJyZW1vdmUiLCJyZWFkeSIsImRyYWdnYWJsZSIsImNvbnRhaW5tZW50Iiwic2Nyb2xsIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0eSIsInVuZGVmaW5lZCIsImRvY3VtZW50Iiwic3RhcnRBcHAiLCJ0aGVuIiwiZGF0YSIsInNldENhbXBhaWducyIsImNhbXBMaXN0IiwicHJlcGVuZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0Q2FtcGFpZ25zIiwiZXJyb3IiLCJyZWFkQUZpbGUiLCJmaWxlcGF0aCIsInJlYWRGaWxlIiwiZXJyIiwibWVzc2FnZSIsIndyaXRlRmlsZSIsImdldERpckNvbnRlbnRzIiwiZGlyIiwiZmlsZXMiLCJmaWxlTmFtZXMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlTmFtZSIsInB1c2giLCJjaGVja0ZpbGVFeGlzdCIsInBhdGgiLCJhY2Nlc3MiLCJGX09LIiwiY2hlY2tEaXJFeGlzdCIsImV4aXN0c1N5bmMiLCJjcmVhdGVEaXIiLCJta2RpclN5bmMiLCJyZW1vdmVTcGFjZSIsInN0cmluZyIsImNsZWFuU3RyaW5nIiwicmVwbGFjZSIsImFkZFNwYWNlIiwiUmVnRXhwIiwidXBkYXRlQWJpbGl0eUJvbnVzIiwibXlBYmlsaXR5IiwiYWJpbGl0eSIsInZhbCIsIm1vZGlmaWVyIiwicGFyZW50IiwiY2hpbGRyZW4iLCJ0ZXh0IiwiaXNOdW1lcmljIiwiTWF0aCIsImZsb29yIiwiYXR0ciIsInBhc3NpdmVQZXJjZXB0aW9uIiwiZWFjaCIsInNlbGVjdCIsInVwZGF0ZVByb2YiLCJ0aGlzQWJpbGl0eSIsInRoaXNBYmlsaXR5Qm9udXMiLCJjYWxsQWJpbGl0eSIsInBhcnNlSW50IiwiYWJycmV2aWF0ZUxhYmVscyIsImFiYnJXb3JkcyIsIm15U2l6ZSIsImNzcyIsInNwbGl0IiwiaW5kZXgiLCJsYWJlbCIsIndvcmQiLCJsb25nIiwic2hvcnQiLCJjbGVhclRvcCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsImJvb2tGaWxlQXJyYXkiLCJib29rVGl0bGVBcnJheSIsImdldEJvb2tGaWxlcyIsImkiLCJsZW5ndGgiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJuYW1lIiwiZ2V0Qm9va1RpdGxlcyIsImNvbnNvbGUiLCJsb2ciLCJib29rQXJyYXkiLCJ0aXRsZUFycmF5IiwiY291bnQiLCJrZXkiLCJib29rIiwiYm9va1RpdGxlIiwiZGV0YWlscyIsImxpc3RCb29rcyIsInBhdGhBcnJheSIsIm5ld0NhbXBhaWduIiwidG9Mb2FkIiwidGhpc05hbWUiLCJ0aGlzRGlyIiwiYWxlcnQiLCJkZWxldGVDYW1wYWlnbiIsInRvRGVsZXRlIiwidG9EZWxldGVOYW1lIiwibmV3Q2FtcE5hbWUiLCJjYW1wT2JqIiwiY2FtcGFpZ25zIiwiY3JlYXRlQ2FtcGFpZ24iLCJFcnJvciIsIm5ld0FycmF5Iiwic3BsaWNlIiwic3R1ZmYiLCJodG1sIiwiY2FtcE5hbWUiLCJhZGRPbkh0bWwiLCJuZXdIdG1sIiwiY2FtcEFycmF5Iiwibm9kZSIsImNsaWNrIiwidG9nZ2xlIiwib3Blbk1lIiwicHJvZkIiLCJzb21ldGhpbmdDbGV2ZXIiLCJjbGFzc2VzIiwiY3VycmVudENsYXNzIiwiY3VycmVudFBvcyIsImluQXJyYXkiLCJteVByb2YiLCJteVByb2ZTa2lsbEZsYWciLCJ0aGlzQWJpbGl0eUJvbnVzSUQiLCJuZXdWYWwiLCJuZXdQb3MiLCJuZXdDbGFzcyIsInRhcmdldCIsImN1cnJTaXplIiwibmV3U2l6ZSIsIm5ld0VtcyIsImJ1dHRvbk9wdGlvbnMiLCJteVN0eWxlIiwibXlJZCIsIiQiLCJyZW1vdmVBdHRyIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0U7O0FBQ0EsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFoQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCLEMsQ0FFRjs7O0FBQ0EsSUFBSUUsZ0JBQWdCLEdBQUcsaUJBQXZCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLFVBQWY7QUFDQSxJQUFJQyxlQUFlLEdBQUcsY0FBdEI7QUFDQSxJQUFJQyxnQkFBSixDLENBQ0E7QUFFQTs7QUFDQSxJQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLElBQUlDLEdBQUcsR0FBRyxFQUFWO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEVBQW5CLEMsQ0FDQTtBQUVBOztBQUNBLElBQUlDLFNBQVMsR0FBRyxJQUFoQixDLENBQ0E7QUFFQTs7QUFDQUMsTUFBTSxDQUFDLGtCQUFELENBQU4sQ0FBMkJDLEVBQTNCLENBQThCLE9BQTlCLEVBQXVDLFlBQVU7QUFDL0NELEVBQUFBLE1BQU0sQ0FBQyxZQUFELENBQU4sQ0FBcUJFLE1BQXJCO0FBQ0QsQ0FGRDtBQUlBRixNQUFNLENBQUMsVUFBRCxDQUFOLENBQW1CRyxLQUFuQixDQUF5QixZQUFZO0FBQ25DSCxFQUFBQSxN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biAgLy8gcmVtb3ZlIGxpbmUgYmVsb3cgd2hlbiB0ZXN0aW5nIGZyb250ZW5kXHJcbiAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuICB2YXIgcmltcmFmID0gcmVxdWlyZShcInJpbXJhZlwiKTtcclxuXHJcbi8vIFBhdGhzXHJcbmxldCBjYW1wYWlnbkxpc3RQYXRoID0gXCIuL2NhbXBhaWduLmpzb25cIjtcclxubGV0IGJvb2tQYXRoID0gXCIuL2Jvb2tzL1wiO1xyXG5sZXQgY2FtcGFpZ25EaXJQYXRoID0gXCIuL2NhbXBhaWducy9cIjtcclxubGV0IHRoaXNDYW1wYWlnblBhdGg7XHJcbi8vL1xyXG5cclxuLy9nbG9kYWwgb2JqZWN0c1xyXG52YXIgYm9va3MgPSB7fTtcclxudmFyIG5wYyA9IHt9O1xyXG52YXIgY2FtcGFpZ25PYmogPSB7fTtcclxudmFyIHRoaXNDYW1wYWlnbiA9IHt9O1xyXG4vLy9cclxuXHJcbi8vZ2xvYmFsIHZhcnNcclxubGV0IHNwYWNlQ2hhciA9IFwiX19cIjtcclxuLy8vXHJcblxyXG4vL3RlbXAgdG8gY29zZSB0aGUgY2FtcGFpZ24gcGlja2VyLlxyXG5qUXVlcnkoXCIuY2xvc2VDYW1wV2luZG93XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xyXG59KTtcclxuXHJcbmpRdWVyeShcImRvY3VtZW50XCIpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICBqUXVlcnkoXCIuZHJhZ1wiKS5kcmFnZ2FibGUoe1xyXG4gICAgICBjb250YWlubWVudDogXCIubWFpblZpZXdcIixcclxuICAgICAgc2Nyb2xsOiBmYWxzZVxyXG4gIH0pO1xyXG5cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KSB7XHJcbnJldHVybiB0aGlzW3Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuXHJcbi8vICAgICAgICAvL2xvb2sgZm9yIG5wYywgdGhpcyB3aWxsIGV2ZW50dWFsbHkgYmUgaXRzIG93biBmdW5jdGlvblxyXG4vLyAgICAgICBpZihib29rVGl0bGUuaGFzT3duUHJvcGVydHkoXCJOUENcIikpe1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUrXCIgdHJ1ZVwiKVxyXG4vLyAgICAgICB9ZWxzZXtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm5vbmUgZm91bmRcIilcclxuLy8gICAgICAgfVxyXG5cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgIH1cclxuLy8gfSk7XHJcbiIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBzdGFydEFwcCgpLnRoZW4oKGRhdGEpPT57XHJcbiAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoY2FtcExpc3QpPT57XHJcbiAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikucHJlcGVuZChjYW1wTGlzdCk7XHJcbiAgICB9KVxyXG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY2FtcGFpZ25PYmopXHJcbiAgfSk7XHJcbiBcclxuICB9KVxyXG4gIFxyXG5cclxuICBmdW5jdGlvbiBzdGFydEFwcCgpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgIHRyeXtcclxuICAgICAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSk9PntcclxuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgfSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIHJlYWRBRmlsZShmaWxlcGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgJ3V0Zi04JywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoXCJBbiBlcnJvciBvY3VycmVkIHJlYWRpbmcgdGhlIGZpbGUgOlwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlRmlsZShmaWxlcGF0aCwgZGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiRmlsZSBXcml0dGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREaXJDb250ZW50cyhkaXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdmFyIGZpbGVzID0ge307XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lcyA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogZmlsZU5hbWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBmaWxlcyA9IHsgXCJmaWxlc1wiOiBmaWxlTmFtZXMgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZmlsZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0KHBhdGgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKCFwYXRoKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChcIlBhdGggaXMgaW52YWxpZCBcIiArIHBhdGgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLmFjY2VzcyhwYXRoLCBmcy5GX09LLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcInRydWVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0RpckV4aXN0KGRpcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEaXIoZGlyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKFwiZG9uZVwiKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTcGFjZShzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNsZWFuU3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccy9nLCBzcGFjZUNoYXIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3BhY2Uoc3RyaW5nKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgYWRkU3BhY2UgPSBuZXcgUmVnRXhwKHNwYWNlQ2hhciwgXCJnXCIpXHJcbiAgICAgICAgICAgIHZhciBjbGVhblN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGFkZFNwYWNlLCAvXFxzLyk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2xlYW5TdHJpbmcpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vL3dyaXRlIHRlc3RcclxuLy8gdmFyIHRlc3RPYmogID0gXCJUaGlzIGlzIGEgd3JpdGUgdGVzdFwiO1xyXG4vLyB3cml0ZUZpbGUoXCIuLi90ZXN0LnR4dFwiLCB0ZXN0T2JqKTtcclxuIiwiXHJcbmZ1bmN0aW9uIHVwZGF0ZUFiaWxpdHlCb251cyhteUFiaWxpdHkpIHtcclxuICAgIHZhciBhYmlsaXR5ID0galF1ZXJ5KG15QWJpbGl0eSkudmFsKCk7XHJcblxyXG4gICAgdmFyIG1vZGlmaWVyID0galF1ZXJ5KG15QWJpbGl0eSkucGFyZW50KCkuY2hpbGRyZW4oJy5tb2RpZmllci1idWJibGUnKS50ZXh0KCk7XHJcbiAgICBpZiAoIWpRdWVyeS5pc051bWVyaWMoYWJpbGl0eSkpIHtcclxuICAgICAgICBhYmlsaXR5ID0gMTtcclxuICAgICAgICBqUXVlcnkobXlBYmlsaXR5KS52YWwoYWJpbGl0eSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2RpZmllciA9IE1hdGguZmxvb3IoKGFiaWxpdHkgLSAxMCkgLyAyKTtcclxuICAgIGpRdWVyeShteUFiaWxpdHkpLnBhcmVudCgpLmNoaWxkcmVuKCcubW9kaWZpZXItYnViYmxlJykudGV4dChtb2RpZmllcik7XHJcbiAgICBcclxuICAgIGlmIChteUFiaWxpdHkuYXR0cignaWQnKSA9PSAnd2lzJykge1xyXG4gICAgICAgIHBhc3NpdmVQZXJjZXB0aW9uKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxualF1ZXJ5KFwiLmFiaWxpdHlcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHVwZGF0ZUFiaWxpdHlCb251cyhqUXVlcnkodGhpcykpO1xyXG5cclxuICAgIGpRdWVyeSh0aGlzKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5zZWxlY3QoKTtcclxuICAgIH0pXHJcbiAgICBqUXVlcnkodGhpcykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB1cGRhdGVBYmlsaXR5Qm9udXMoalF1ZXJ5KHRoaXMpKTtcclxuICAgICAgICB1cGRhdGVQcm9mKGpRdWVyeSgnLnNhdmluZ1Rocm93cyAjJytqUXVlcnkodGhpcykuYXR0cignaWQnKSkpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJ2YXIgdGhpc0FiaWxpdHkgPSBcIlwiO1xyXG52YXIgdGhpc0FiaWxpdHlCb251cyA9IFwiXCI7XHJcblxyXG5mdW5jdGlvbiBjYWxsQWJpbGl0eShhYmlsaXR5KSB7XHJcbiAgICB0aGlzQWJpbGl0eSA9IGpRdWVyeSgnLmFiaWxpdHktYm94ICMnK2FiaWxpdHkpLnZhbCgpO1xyXG4gICAgdGhpc0FiaWxpdHlCb251cyA9IHBhcnNlSW50KGpRdWVyeSgnLmFiaWxpdHktYm94ICMnK2FiaWxpdHkrJy1Cb251cycpLnRleHQoKSk7XHJcbn1cclxuIiwiZnVuY3Rpb24gYWJycmV2aWF0ZUxhYmVscygpIHtcclxuICAgIHZhciBhYmJyV29yZHMgPSBbJ1NwZWVkfFNQRCcsJ0luaXRpYXRpdmV8SU5JVCcsJ1RlbXBvcmFyeXxURU1QJywnSGl0IFBvaW50c3xIUCcsJ0FybW9yIENsYXNzfEFDJywnTWF4aW11bXxNQVgnLCdDdXJyZW50fENSTlQnLCdFeHBlcmllbmNlIFBvaW50c3xYUCddO1xyXG4gICAgdmFyIG15U2l6ZSA9IGpRdWVyeSgnLmNoYXJTaGVldCcpLmNzcygnZm9udC1zaXplJyk7XHJcbiAgICBteVNpemUgPSBwYXJzZUludChteVNpemUuc3BsaXQoJ3B4JylbMF0pO1xyXG4gICAgLy8gY29uc29sZS5sb2cobXlTaXplKTtcclxuICAgIGlmIChteVNpemU8MTYpIHtcclxuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeShhYmJyV29yZHMpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCB3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IHdvcmQuc3BsaXQoJ3wnKVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShsYWJlbCkudGV4dChmdW5jdGlvbihpbmRleCwgdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UobG9uZywgc2hvcnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGpRdWVyeSgnbGFiZWwnKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgbGFiZWwpIHtcclxuICAgICAgICAgICAgalF1ZXJ5KGFiYnJXb3JkcykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHdvcmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3J0ID0gd29yZC5zcGxpdCgnfCcpWzFdO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KGxhYmVsKS50ZXh0KGZ1bmN0aW9uKGluZGV4LCB0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShzaG9ydCwgbG9uZyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCIvLyBqUXVlcnkoJyNjbGFzc01hbmFnZXInKS5oaWRlKCk7XHJcbi8vXHJcbi8vIHZhciBnZXRMYWJlbCA9IGpRdWVyeSgnLmNoYXJTaGVldCAjY2xhc3NNb3JlJykuaHRtbCgpO1xyXG4vLyBjb25zb2xlLmxvZyhnZXRMYWJlbCk7XHJcbi8vIGdldExhYmVsID0gZ2V0TGFiZWwrJzxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOnJpZ2h0OyBkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6MTBlbTtcIj5oZWxsbyE8L2Rpdj4nO1xyXG4vLyBjb25zb2xlLmxvZyhnZXRMYWJlbCk7XHJcbi8vIGpRdWVyeSgnLmNoYXJTaGVldCAjY2xhc3NNb3JlJykuaHRtbChnZXRMYWJlbCk7XHJcblxyXG4vLyA8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNkb3duQW5nbGVcIj48L3VzZT48L3N2Zz5cclxuIiwiZnVuY3Rpb24gY2xlYXJUb3AoKSB7XHJcbiAgICBqUXVlcnkoXCIuZHJhZ1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5yZW1vdmVDbGFzcyhcIm9uVG9wXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5qUXVlcnkoXCIuZHJhZ1wiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpIHtcclxuICAgIGNsZWFyVG9wKCk7XHJcbiAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoXCJvblRvcFwiKTtcclxufSk7XHJcbiIsImpRdWVyeShcIi5kZWF0aFNhdmVzXCIpLm9uKFwiY2xpY2tcIiwgXCIuaWNvblwiLCBmdW5jdGlvbigpIHtcclxuICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxualF1ZXJ5KFwiLmRlYXRoU2F2ZXNcIikub24oXCJjbGlja1wiLCBcIi5yZWFwZXJcIiwgZnVuY3Rpb24oKSB7XHJcbiAgalF1ZXJ5KFwiLmljb25cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxuIiwiLy8gZ2V0RGlyQ29udGVudHMoXCIuL2Jvb2tzXCIpLnRoZW4oZnVuY3Rpb24gKGZpbGVzKSB7XHJcbi8vICAgLy8gY29uc29sZS5sb2coKTtcclxuLy8gICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbGVzLmZpbGVzWzBdLm5hbWUpKSk7XHJcbi8vICAgZm9yKHZhciBpID0gMDsgaSA8PSBmaWxlcy5maWxlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuLy8gICAgIHJlYWRBRmlsZShcIi4vYm9va3MvXCIgKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbGVzLmZpbGVzW2ldLm5hbWUpKSkudGhlbihmdW5jdGlvbiAoYm9vaykge1xyXG4vLyAgICAgICB2YXIgYm9va1RpdGxlID0gSlNPTi5wYXJzZShib29rKTtcclxuLy8gICAgICAgY29uc29sZS5sb2coYm9va1RpdGxlLmRldGFpbHMubmFtZSk7XHJcbi8vICAgICAgIGpRdWVyeShcIi5ib29rTGlzdFwiKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJib29rXCI+JHtib29rVGl0bGUuZGV0YWlscy5uYW1lfTxkaXY+YCk7XHJcblxyXG4vLyAgICAgICAgLy9sb29rIGZvciBucGMsIHRoaXMgd2lsbCBldmVudHVhbGx5IGJlIGl0cyBvd24gZnVuY3Rpb25cclxuLy8gICAgICAgaWYoYm9va1RpdGxlLmhhc093blByb3BlcnR5KFwiTlBDXCIpKXtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lK1wiIHRydWVcIilcclxuLy8gICAgICAgfWVsc2V7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJub25lIGZvdW5kXCIpXHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICB9XHJcbi8vIH0pO1xyXG5sZXQgYm9va0ZpbGVBcnJheSA9IFtdO1xyXG5sZXQgYm9va1RpdGxlQXJyYXkgPSBbXTtcclxuZ2V0Qm9va0ZpbGVzKCkudGhlbigoZGF0YSk9PntcclxuICAgXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBkYXRhLmZpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIHZhciBwYXRoID0gYm9va1BhdGggKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEuZmlsZXNbaV0ubmFtZSkpXHJcbiAgICAgICAgYm9va0ZpbGVBcnJheS5wdXNoKHBhdGgpXHJcbiAgICB9XHJcbiAgICBcclxuICAgICAgIGdldEJvb2tUaXRsZXMoYm9va0ZpbGVBcnJheSkudGhlbigoZGF0YSk9PntcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgIC8vIGJvb2tUaXRsZUFycmF5LnB1c2goZGF0YSk7XHJcbiAgICAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gIGNvbnNvbGUubG9nKGJvb2tGaWxlQXJyYXkpO1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKGJvb2tUaXRsZUFycmF5KTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBnZXRCb29rVGl0bGVzKGJvb2tBcnJheSl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICBsZXQgdGl0bGVBcnJheSA9IFtdO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBib29rQXJyYXkuZm9yRWFjaChmdW5jdGlvbihrZXksaSl7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgICAgIHJlYWRBRmlsZShrZXkpLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm9va1RpdGxlID0gSlNPTi5wYXJzZShib29rKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZUFycmF5LnB1c2goYm9va1RpdGxlLmRldGFpbHMubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBpZihjb3VudCA9PSBib29rQXJyYXkubGVuZ3RoIC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZXJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGl0bGVBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGZpbGUpXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRCb29rRmlsZXMoKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgZ2V0RGlyQ29udGVudHMoYm9va1BhdGgpLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1jYXRjaCAoZXJyb3Ipe1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBsaXN0Qm9va3MoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGxldCB0aXRsZUFycmF5ID1bXTtcclxuICAgICAgICBsZXQgcGF0aEFycmF5ID0gW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZ2V0RGlyQ29udGVudHMoYm9va1BhdGgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBib29rUGF0aCArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5maWxlc1tpXS5uYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICBwYXRoQXJyYXkucHVzaChwYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRBRmlsZShwYXRoKS50aGVuKGZ1bmN0aW9uIChib29rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBib29rVGl0bGUgPSBKU09OLnBhcnNlKGJvb2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2YXIgYm9va09iaiA9IHtcIm5hbWVcIjpib29rVGl0bGUuZGV0YWlscy5uYW1lLCBcInBhdGhcIjpwYXRofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUFycmF5LnB1c2goYm9va1RpdGxlLmRldGFpbHMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlQXJyYXkubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBmb3IodmFyIGk9MDtpPD10aXRsZUFycmF5Lmxlbmd0aCAtMTsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwic3R1ZmZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGl0bGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGksa2V5KXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyBpcyBpIFwiK2krXCIsIHRoaXMgaXMga2V5P1wiK2tleSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRpdGxlQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAvLyBib29rcyA9IHtcImJvb2tzXCI6dGl0bGVBcnJheX07XHJcbiAgICAgICAgICAgICAgICAvLyByZXNvbHZlKGJvb2tzKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCIvKipcclxuICogTmVlZCB0byBidWlsZCBsb2FkaW5nIGEgY2FtcGFpZ25cclxuICogbmVlZCBuZXcgY2FtcGFpZ24gdG8gbWFrZSBzdXJlIGl0cyBuYW1lIGlzIHVuaXF1ZS5cclxuICovXHJcblxyXG5cclxualF1ZXJ5KFwiLmNhbXBBZGRcIikub24oXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBuZXdDYW1wYWlnbigpO1xyXG59KTtcclxuXHJcbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5jYW1wTG9hZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdG9Mb2FkID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLWxvYWRcIik7XHJcbiAgICB2YXIgdGhpc05hbWUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgIHZhciB0aGlzRGlyO1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyh0b0xvYWROYW1lKVxyXG4gICAgcmVtb3ZlU3BhY2UodGhpc05hbWUpLnRoZW4oKG5hbWUpID0+IHtcclxuICAgICAgICB0aGlzRGlyID0gY2FtcGFpZ25EaXJQYXRoICsgbmFtZSArIFwiL2NhbXAuanNvblwiO1xyXG4gICAgICAgIGNoZWNrRmlsZUV4aXN0KHRoaXNEaXIpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoaXMgY2FtcGFpZ24gZG9lc24ndCBleGlzdC4uLiBOb3cgZGVsZXRpbmdcIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVDYW1wYWlnbih0aGlzTmFtZSwgdG9Mb2FkKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVhZEFGaWxlKHRoaXNEaXIpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzQ2FtcGFpZ24gPT0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9XaWxsIG5lZWQgdG8gbG9hZCB1cCBhbGwgdGhlIGJvb2tzIGFuZCBzdHVmZiwgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9idXQgd2UgbmVlZCB0byBmaWd1cmUgb3V0IHRoZSBvYmpcclxuICAgICAgICAgICAgICAgICAgICAvLyBzbyBmb3Igbm93IHdlIHdpbGwganVzdCBnbyB0byB0aGUgdWlcclxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufSlcclxuXHJcbi8vdGhlIGRlbGV0ZSBidXR0b25cclxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLmNhbXBEZWxldGVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRvRGVsZXRlID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLWRlbGV0ZVwiKTtcclxuICAgIHZhciB0b0RlbGV0ZU5hbWUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcclxuICAgIC8vc2hvdWxkIGFkZCBhIGFyZSB5b3Ugc3VyZSBwb3B1cFxyXG4gICAgZGVsZXRlQ2FtcGFpZ24odG9EZWxldGVOYW1lLCB0b0RlbGV0ZSlcclxufSk7XHJcblxyXG5qUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuc2F2ZU5ld0NhbXBcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG5ld0NhbXBOYW1lID0galF1ZXJ5KFwiaW5wdXRbbmFtZT0nbmV3Q2FtcCddXCIpLnZhbCgpO1xyXG4gICAgdmFyIGNhbXBPYmogPSB7XHJcbiAgICAgICAgXCJuYW1lXCI6IG5ld0NhbXBOYW1lXHJcbiAgICB9O1xyXG4gICAgdGhpc0NhbXBhaWduID0ge1xyXG4gICAgICAgIFwiY2FtcGFpZ25cIjoge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogbmV3Q2FtcE5hbWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYW1wYWlnbk9iai5jYW1wYWlnbnMucHVzaChjYW1wT2JqKTsgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKVxyXG5cclxuICAgIHdyaXRlRmlsZShjYW1wYWlnbkxpc3RQYXRoLCBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSBcIkZpbGUgV3JpdHRlblwiKSB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUNhbXBhaWduKG5ld0NhbXBOYW1lKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcImRvbmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVNwYWNlKG5ld0NhbXBOYW1lKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNDYW1wYWlnblBhdGggPSBjYW1wYWlnbkRpclBhdGggKyBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUZpbGUodGhpc0NhbXBhaWduUGF0aCArIFwiL2NhbXAuanNvblwiLCBKU09OLnN0cmluZ2lmeSh0aGlzQ2FtcGFpZ24pKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbnNcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBkZWxldGVDYW1wYWlnbih0b0RlbGV0ZU5hbWUsIHRvRGVsZXRlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHZhciBuZXdBcnJheSA9IGNhbXBhaWduT2JqLmNhbXBhaWducztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdBcnJheSlcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlbGV0IHRoaXMgbnVtYmVyIFwiICsgdG9EZWxldGUgKyBcIiBhbmQgdGhpcyBpcyB0aGUgb2JqZWN0XCIgKyBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iai5jYW1wYWlnbnMpKTtcclxuICAgICAgICBuZXdBcnJheS5zcGxpY2UodG9EZWxldGUsIDEpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSk7XHJcbiAgICAgICAgd3JpdGVGaWxlKGNhbXBhaWduTGlzdFBhdGgsIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSA9PSBcIkZpbGUgV3JpdHRlblwiKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVTcGFjZSh0b0RlbGV0ZU5hbWUpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByaW1yYWYoY2FtcGFpZ25EaXJQYXRoICsgZGF0YSwgKHN0dWZmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0dWZmKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGNhbXBMaXN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5odG1sKGNhbXBMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2FtcGFpZ24oY2FtcE5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdmFyIGRpcjtcclxuICAgICAgICByZW1vdmVTcGFjZShjYW1wTmFtZSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBkaXIgPSBjYW1wYWlnbkRpclBhdGggKyBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNoZWNrRGlyRXhpc3QoZGlyKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVEaXIoZGlyKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5ld0NhbXBhaWduKCkge1xyXG4gICAgZ2V0Q2FtcGFpZ25zKGNhbXBhaWduTGlzdFBhdGgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoaHRtbCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYWRkT25IdG1sID0gXCI8dHI+PHRkPjxpbnB1dCB0eXBlPSd0ZXh0JyBuYW1lPSduZXdDYW1wJyAvPjwvdGQ+PHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IHNhdmVOZXdDYW1wJz5TYXZlPC9idXR0b24+PC90ZD48L3RyPjwvdGFibGU+XCI7XHJcbiAgICAgICAgICAgIHZhciBuZXdIdG1sID0gaHRtbC5yZXBsYWNlKFwiPC90YWJsZT5cIiwgYWRkT25IdG1sKTtcclxuICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5odG1sKG5ld0h0bWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxufVxyXG5cclxuLy9HZXRzIHRoZSBsaXN0IG9mIGNhbXBhaWduc1xyXG5mdW5jdGlvbiBnZXRDYW1wYWlnbnMocGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdldENhbXBhaWducyBcIiArIHBhdGgpO1xyXG4gICAgICAgICAgICBjaGVja0ZpbGVFeGlzdChwYXRoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhID09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFGaWxlKHBhdGgpLnRoZW4oKGNhbXBhaWducykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbnMgPSBKU09OLnBhcnNlKGNhbXBhaWducyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbXBhaWduT2JqID0gY2FtcGFpZ25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNhbXBhaWduT2JqKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vL1B1dHMgdGhlIGxpc3Qgb2YgY2FtcGFpZ25zIG9uIHRoZSBjYW1wYWlnbiBzZWxlY3Rvci5cclxuZnVuY3Rpb24gc2V0Q2FtcGFpZ25zKGNhbXBhaWducykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgY2FtcEFycmF5ID0gY2FtcGFpZ25zLmNhbXBhaWducztcclxuICAgICAgICAgICAgdmFyIGh0bWwgPSBcIjx0YWJsZT5cIjtcclxuICAgICAgICAgICAgY2FtcEFycmF5LmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG5vZGUpKVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgaHRtbCArPSBcIjx0cj48dGQ+XCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIjwvdGQ+PHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLW5hbWU9J1wiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCInIGRhdGEtbG9hZD0nXCIgKyBpICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcExvYWQnPkxvYWQ8L2J1dHRvbj48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS1uYW1lPSdcIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiJyBkYXRhLWRlbGV0ZT0nXCIgKyBpICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcERlbGV0ZSc+RGVsZXRlPC9idXR0b24+PC90ZD48L3RyPlwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBodG1sICs9IFwiPC90YWJsZT5cIjtcclxuXHJcbiAgICAgICAgICAgIHJlc29sdmUoaHRtbCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iLCJqUXVlcnkoXCIuY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgalF1ZXJ5KHRoaXMpLnBhcmVudCgpLnRvZ2dsZSgpO1xyXG59KVxyXG5qUXVlcnkoXCIubWVudSBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG9wZW5NZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1vcGVuXCIpO1xyXG4gICAgalF1ZXJ5KFwiLlwiICsgb3Blbk1lKS50b2dnbGUoKTtcclxuICAgIGNsZWFyVG9wKCk7XHJcbiAgICBqUXVlcnkoXCIuXCIgKyBvcGVuTWUpLmFkZENsYXNzKFwib25Ub3BcIik7XHJcbn0pO1xyXG4iLCIiLCJmdW5jdGlvbiBwYXNzaXZlUGVyY2VwdGlvbigpIHtcclxuICAgIGNhbGxBYmlsaXR5KCd3aXMnKTtcclxuICAgIGpRdWVyeSgnI3Bhc3NQZXJjJykudmFsKHRoaXNBYmlsaXR5Qm9udXMrMTApO1xyXG59XHJcbiIsInZhciBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xyXG5zb21ldGhpbmdDbGV2ZXIoKTtcclxuXHJcbmpRdWVyeSgnI3Byb2ZCb251cycpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xyXG4gICAgc29tZXRoaW5nQ2xldmVyKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc29tZXRoaW5nQ2xldmVyKCkge1xyXG4gICAgalF1ZXJ5KCcuaWNvbi1wcm9mJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2xhc3NlcyA9IFsnaWNvbi1wcm9mJywgJ2ljb24tcHJvZiBwcm9maWNpZW50JywgJ2ljb24tcHJvZiBleHBlcnRpc2UnXTtcclxuICAgICAgICB2YXIgY3VycmVudENsYXNzID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSBqUXVlcnkuaW5BcnJheShjdXJyZW50Q2xhc3MsIGNsYXNzZXMpO1xyXG4gICAgICAgIHZhciBteVByb2YgPSBqUXVlcnkodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJy5wcm9mVmFsJyk7XHJcbiAgICAgICAgdXBkYXRlUHJvZihqUXVlcnkobXlQcm9mKSwgY3VycmVudFBvcyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvZihteVByb2YsIG15UHJvZlNraWxsRmxhZykge1xyXG4gICAgdmFyIHRoaXNBYmlsaXR5ID0galF1ZXJ5KG15UHJvZikuYXR0cignaWQnKTtcclxuICAgIHZhciB0aGlzQWJpbGl0eUJvbnVzSUQgPSAnIycgKyB0aGlzQWJpbGl0eSArICctQm9udXMnO1xyXG4gICAgdmFyIHRoaXNBYmlsaXR5Qm9udXMgPSBqUXVlcnkoJy5hYmlsaXRpZXMgJyArIHRoaXNBYmlsaXR5Qm9udXNJRCkudGV4dCgpO1xyXG4gICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xyXG4gICAgaWYgKG15UHJvZlNraWxsRmxhZyA9PSAwKSB7XHJcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG15UHJvZlNraWxsRmxhZyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSArIHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG15UHJvZlNraWxsRmxhZyA9PSAyKSB7XHJcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSAqIDIgKyAocGFyc2VJbnQodGhpc0FiaWxpdHlCb251cykpO1xyXG4gICAgfVxyXG4gICAgalF1ZXJ5KG15UHJvZikudGV4dChuZXdWYWwpO1xyXG59O1xyXG5cclxuXHJcbmpRdWVyeSgnLmljb24tcHJvZicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XHJcbiAgICB2YXIgY3VycmVudENsYXNzID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XHJcbiAgICB2YXIgbmV3UG9zID0gKChjdXJyZW50UG9zICsgMSkgJSBjbGFzc2VzLmxlbmd0aCk7XHJcbiAgICB2YXIgbmV3Q2xhc3MgPSBjbGFzc2VzW25ld1Bvc107XHJcbiAgICBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnLCBuZXdDbGFzcyk7XHJcbiAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xyXG4gICAgdXBkYXRlUHJvZihqUXVlcnkobXlQcm9mKSwgbmV3UG9zKTtcclxufSk7XHJcbiIsImFicnJldmlhdGVMYWJlbHMoKTtcclxualF1ZXJ5KCcudGV4dFNpemUgI2ZvbnQtc2l6ZS11cCcpLmNsaWNrKCBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YXJnZXQgPSBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCk7XHJcbiAgICB2YXIgY3VyclNpemUgPSBwYXJzZUludChqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJykuc3BsaXQoXCJweFwiKVswXSk7XHJcbiAgICAvLyBjdXJyU2l6ZSA9IE1hdGgucm91bmQoY3VyclNpemUpO1xyXG4gICAgdmFyIG5ld1NpemUgPSBjdXJyU2l6ZSszO1xyXG4gICAgaWYgKG5ld1NpemUgPiAxNil7XHJcbiAgICAgICAgbmV3U2l6ZSA9IDE2O1xyXG4gICAgfVxyXG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcclxuICAgIGpRdWVyeSh0YXJnZXQpLmNzcygnZm9udFNpemUnLG5ld0VtcysnZW0nKTtcclxuICAgIGFicnJldmlhdGVMYWJlbHMoKTtcclxufSlcclxuXHJcbmpRdWVyeSgnLnRleHRTaXplICNmb250LXNpemUtZG93bicpLmNsaWNrKCBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YXJnZXQgPSBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCk7XHJcbiAgICB2YXIgY3VyclNpemUgPSBwYXJzZUludChqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJykuc3BsaXQoXCJweFwiKVswXSk7XHJcbiAgICB2YXIgbmV3U2l6ZSA9IGN1cnJTaXplLTM7XHJcbiAgICBpZiAobmV3U2l6ZSA8IDkpe1xyXG4gICAgICAgIG5ld1NpemUgPSA5O1xyXG4gICAgfVxyXG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcclxuICAgIGpRdWVyeSh0YXJnZXQpLmNzcygnZm9udFNpemUnLG5ld0VtcysnZW0nKTtcclxuICAgIGFicnJldmlhdGVMYWJlbHMoKTtcclxufSlcclxuIiwiLy90aGVtZXNcclxudmFyIGJ1dHRvbk9wdGlvbnMgPSBbJ2RlZmF1bHQnLCAnd29ybicsICdsaWdodCcsICdibGFjaycsICdncmF5JywgJ3JlZCddO1xyXG5qUXVlcnkoYnV0dG9uT3B0aW9ucykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHZhciBteVN0eWxlID0gdGhpcztcclxuICAgIHZhciBteUlkID0gJyMnICsgbXlTdHlsZTtcclxuICAgIGpRdWVyeShteUlkKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgalF1ZXJ5KCdib2R5JykuYWRkQ2xhc3MoJ3RoZW1lLScgKyBteVN0eWxlKTtcclxuICAgIH0pXHJcbn0pXHJcbiJdfQ==

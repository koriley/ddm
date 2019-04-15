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
listBooks().then(function (data) {
  console.log(data);
});

function listBooks() {
  return new Promise(function (resolve, reject) {
    var titleArray = [];

    try {
      getDirContents(bookPath).then(function (data) {
        // console.log(JSON.stringify(data))
        for (var i = 0; i <= data.files.length - 1; i++) {
          var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name));
          readAFile(path).then(function (book) {
            var bookTitle = JSON.parse(book);
            var bookObj = {
              "name": bookTitle.details.name,
              "path": path
            };
            titleArray.push(JSON.stringify(bookObj)); // console.log(JSON.stringify(bookTitle.details.name))
          });
        } // console.log(titleArray)


        books = {
          "books": titleArray
        };
        resolve(books);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImRlYXRoU2F2ZXMuanMiLCJsb2FkQm9va3MuanMiLCJsb2FkQ2FtcGFpZ24uanMiLCJtZW51QnV0dG9ucy5qcyIsIm5wYy5qcyIsInBhc3NpdmVQZXJjZXB0aW9uLmpzIiwicHJvZmljaWVuY2llcy5qcyIsInRleHRTaXplLmpzIiwidGhlbWVzLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsInJpbXJhZiIsImNhbXBhaWduTGlzdFBhdGgiLCJib29rUGF0aCIsImNhbXBhaWduRGlyUGF0aCIsInRoaXNDYW1wYWlnblBhdGgiLCJib29rcyIsIm5wYyIsImNhbXBhaWduT2JqIiwidGhpc0NhbXBhaWduIiwic3BhY2VDaGFyIiwialF1ZXJ5Iiwib24iLCJyZW1vdmUiLCJyZWFkeSIsImRyYWdnYWJsZSIsImNvbnRhaW5tZW50Iiwic2Nyb2xsIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0eSIsInVuZGVmaW5lZCIsImRvY3VtZW50Iiwic3RhcnRBcHAiLCJ0aGVuIiwiZGF0YSIsInNldENhbXBhaWducyIsImNhbXBMaXN0IiwicHJlcGVuZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0Q2FtcGFpZ25zIiwiZXJyb3IiLCJyZWFkQUZpbGUiLCJmaWxlcGF0aCIsInJlYWRGaWxlIiwiZXJyIiwibWVzc2FnZSIsIndyaXRlRmlsZSIsImdldERpckNvbnRlbnRzIiwiZGlyIiwiZmlsZXMiLCJmaWxlTmFtZXMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlTmFtZSIsInB1c2giLCJjaGVja0ZpbGVFeGlzdCIsInBhdGgiLCJhY2Nlc3MiLCJGX09LIiwiY2hlY2tEaXJFeGlzdCIsImV4aXN0c1N5bmMiLCJjcmVhdGVEaXIiLCJta2RpclN5bmMiLCJyZW1vdmVTcGFjZSIsInN0cmluZyIsImNsZWFuU3RyaW5nIiwicmVwbGFjZSIsImFkZFNwYWNlIiwiUmVnRXhwIiwidXBkYXRlQWJpbGl0eUJvbnVzIiwibXlBYmlsaXR5IiwiYWJpbGl0eSIsInZhbCIsIm1vZGlmaWVyIiwicGFyZW50IiwiY2hpbGRyZW4iLCJ0ZXh0IiwiaXNOdW1lcmljIiwiTWF0aCIsImZsb29yIiwiYXR0ciIsInBhc3NpdmVQZXJjZXB0aW9uIiwiZWFjaCIsInNlbGVjdCIsInVwZGF0ZVByb2YiLCJ0aGlzQWJpbGl0eSIsInRoaXNBYmlsaXR5Qm9udXMiLCJjYWxsQWJpbGl0eSIsInBhcnNlSW50IiwiYWJycmV2aWF0ZUxhYmVscyIsImFiYnJXb3JkcyIsIm15U2l6ZSIsImNzcyIsInNwbGl0IiwiaW5kZXgiLCJsYWJlbCIsIndvcmQiLCJsb25nIiwic2hvcnQiLCJjbGVhclRvcCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsImxpc3RCb29rcyIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZUFycmF5IiwiaSIsImxlbmd0aCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIm5hbWUiLCJib29rIiwiYm9va1RpdGxlIiwiYm9va09iaiIsImRldGFpbHMiLCJuZXdDYW1wYWlnbiIsInRvTG9hZCIsInRoaXNOYW1lIiwidGhpc0RpciIsImFsZXJ0IiwiZGVsZXRlQ2FtcGFpZ24iLCJ0b0RlbGV0ZSIsInRvRGVsZXRlTmFtZSIsIm5ld0NhbXBOYW1lIiwiY2FtcE9iaiIsImNhbXBhaWducyIsImNyZWF0ZUNhbXBhaWduIiwiRXJyb3IiLCJuZXdBcnJheSIsInNwbGljZSIsInN0dWZmIiwiaHRtbCIsImNhbXBOYW1lIiwiYWRkT25IdG1sIiwibmV3SHRtbCIsImNhbXBBcnJheSIsIm5vZGUiLCJjbGljayIsInRvZ2dsZSIsIm9wZW5NZSIsInByb2ZCIiwic29tZXRoaW5nQ2xldmVyIiwiY2xhc3NlcyIsImN1cnJlbnRDbGFzcyIsImN1cnJlbnRQb3MiLCJpbkFycmF5IiwibXlQcm9mIiwibXlQcm9mU2tpbGxGbGFnIiwidGhpc0FiaWxpdHlCb251c0lEIiwibmV3VmFsIiwibmV3UG9zIiwibmV3Q2xhc3MiLCJ0YXJnZXQiLCJjdXJyU2l6ZSIsIm5ld1NpemUiLCJuZXdFbXMiLCJidXR0b25PcHRpb25zIiwibXlTdHlsZSIsIm15SWQiLCIkIiwicmVtb3ZlQXR0ciJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNFOztBQUNBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLElBQUQsQ0FBaEI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHRCxPQUFPLENBQUMsUUFBRCxDQUFwQixDLENBRUY7OztBQUNBLElBQUlFLGdCQUFnQixHQUFHLGlCQUF2QjtBQUNBLElBQUlDLFFBQVEsR0FBRyxVQUFmO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLGNBQXRCO0FBQ0EsSUFBSUMsZ0JBQUosQyxDQUNBO0FBRUE7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxJQUFJQyxHQUFHLEdBQUcsRUFBVjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLFlBQVksR0FBRyxFQUFuQixDLENBQ0E7QUFFQTs7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEIsQyxDQUNBO0FBRUE7O0FBQ0FDLE1BQU0sQ0FBQyxrQkFBRCxDQUFOLENBQTJCQyxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFVO0FBQy9DRCxFQUFBQSxNQUFNLENBQUMsWUFBRCxDQUFOLENBQXFCRSxNQUFyQjtBQUNELENBRkQ7QUFJQUYsTUFBTSxDQUFDLFVBQUQsQ0FBTixDQUFtQkcsS0FBbkIsQ0FBeUIsWUFBWTtBQUNuQ0gsRUFBQUEsTUFBTSxDQUFDLE9BQUQsQ0FBTixDQUFnQkksU0FBaEIsQ0FBMEI7QUFDdEJDLElBQUFBLFdBQVcsRUFBRSxXQURTO0FBRXRCQyxJQUFBQSxNQUFNLEVBQUU7QUFG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QUFJLEdBQUcsTUFBTUQsT0FBakI7QUFDQTlJLEVBQUFBLE1BQU0sQ0FBQytJLElBQUQsQ0FBTixDQUFhOUksRUFBYixDQUFnQixPQUFoQixFQUF5QixZQUFXO0FBQ2hDK0ksSUFBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxVQUFWLENBQXFCLE9BQXJCO0FBQ0FqSixJQUFBQSxNQUFNLENBQUMsTUFBRCxDQUFOLENBQWVvRixRQUFmLENBQXdCLFdBQVcwRCxPQUFuQztBQUNILEdBSEQ7QUFJSCxDQVBEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbiAgLy8gcmVtb3ZlIGxpbmUgYmVsb3cgd2hlbiB0ZXN0aW5nIGZyb250ZW5kXG4gIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIHZhciByaW1yYWYgPSByZXF1aXJlKFwicmltcmFmXCIpO1xuXG4vLyBQYXRoc1xubGV0IGNhbXBhaWduTGlzdFBhdGggPSBcIi4vY2FtcGFpZ24uanNvblwiO1xubGV0IGJvb2tQYXRoID0gXCIuL2Jvb2tzL1wiO1xubGV0IGNhbXBhaWduRGlyUGF0aCA9IFwiLi9jYW1wYWlnbnMvXCI7XG5sZXQgdGhpc0NhbXBhaWduUGF0aDtcbi8vL1xuXG4vL2dsb2RhbCBvYmplY3RzXG52YXIgYm9va3MgPSB7fTtcbnZhciBucGMgPSB7fTtcbnZhciBjYW1wYWlnbk9iaiA9IHt9O1xudmFyIHRoaXNDYW1wYWlnbiA9IHt9O1xuLy8vXG5cbi8vZ2xvYmFsIHZhcnNcbmxldCBzcGFjZUNoYXIgPSBcIl9fXCI7XG4vLy9cblxuLy90ZW1wIHRvIGNvc2UgdGhlIGNhbXBhaWduIHBpY2tlci5cbmpRdWVyeShcIi5jbG9zZUNhbXBXaW5kb3dcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xufSk7XG5cbmpRdWVyeShcImRvY3VtZW50XCIpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgalF1ZXJ5KFwiLmRyYWdcIikuZHJhZ2dhYmxlKHtcbiAgICAgIGNvbnRhaW5tZW50OiBcIi5tYWluVmlld1wiLFxuICAgICAgc2Nyb2xsOiBmYWxzZVxuICB9KTtcblxuXG59KTtcblxuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KSB7XG5yZXR1cm4gdGhpc1twcm9wZXJ0eV0gIT09IHVuZGVmaW5lZDtcbn07XG5cblxuLy8gICAgICAgIC8vbG9vayBmb3IgbnBjLCB0aGlzIHdpbGwgZXZlbnR1YWxseSBiZSBpdHMgb3duIGZ1bmN0aW9uXG4vLyAgICAgICBpZihib29rVGl0bGUuaGFzT3duUHJvcGVydHkoXCJOUENcIikpe1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lK1wiIHRydWVcIilcbi8vICAgICAgIH1lbHNle1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm5vbmUgZm91bmRcIilcbi8vICAgICAgIH1cblxuLy8gICAgIH0pO1xuXG5cblxuLy8gICB9XG4vLyB9KTtcbiIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgXG4gIHN0YXJ0QXBwKCkudGhlbigoZGF0YSk9PntcbiAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoY2FtcExpc3QpPT57XG4gICAgICBqUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLnByZXBlbmQoY2FtcExpc3QpO1xuICAgIH0pXG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNhbXBhaWduT2JqKVxuICB9KTtcbiBcbiAgfSlcbiAgXG5cbiAgZnVuY3Rpb24gc3RhcnRBcHAoKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgIHRyeXtcbiAgICAgICAgZ2V0Q2FtcGFpZ25zKGNhbXBhaWduTGlzdFBhdGgpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH0pXG4gICAgXG4gIH0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHJlYWRBRmlsZShmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZzLnJlYWRGaWxlKGZpbGVwYXRoLCAndXRmLTgnLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiQW4gZXJyb3Igb2N1cnJlZCByZWFkaW5nIHRoZSBmaWxlIDpcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcIkZpbGUgV3JpdHRlblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RGlyQ29udGVudHMoZGlyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmFyIGZpbGVzID0ge307XG4gICAgICAgIHZhciBmaWxlTmFtZXMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBmaWxlTmFtZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmlsZXMgPSB7IFwiZmlsZXNcIjogZmlsZU5hbWVzIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXNvbHZlKGZpbGVzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cblxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0KHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgIHJlamVjdChcIlBhdGggaXMgaW52YWxpZCBcIiArIHBhdGgpXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLmFjY2VzcyhwYXRoLCBmcy5GX09LLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoXCJlcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja0RpckV4aXN0KGRpcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcInRydWVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJmYWxzZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEaXIoZGlyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXIpO1xuICAgICAgICAgICAgcmVzb2x2ZShcImRvbmVcIik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY2xlYW5TdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxzL2csIHNwYWNlQ2hhcik7XG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KVxuXG5cbn1cblxuZnVuY3Rpb24gYWRkU3BhY2Uoc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGFkZFNwYWNlID0gbmV3IFJlZ0V4cChzcGFjZUNoYXIsIFwiZ1wiKVxuICAgICAgICAgICAgdmFyIGNsZWFuU3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoYWRkU3BhY2UsIC9cXHMvKTtcbiAgICAgICAgICAgIHJlc29sdmUoY2xlYW5TdHJpbmcpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG4vL3dyaXRlIHRlc3Rcbi8vIHZhciB0ZXN0T2JqICA9IFwiVGhpcyBpcyBhIHdyaXRlIHRlc3RcIjtcbi8vIHdyaXRlRmlsZShcIi4uL3Rlc3QudHh0XCIsIHRlc3RPYmopO1xuIiwiXG5mdW5jdGlvbiB1cGRhdGVBYmlsaXR5Qm9udXMobXlBYmlsaXR5KSB7XG4gICAgdmFyIGFiaWxpdHkgPSBqUXVlcnkobXlBYmlsaXR5KS52YWwoKTtcblxuICAgIHZhciBtb2RpZmllciA9IGpRdWVyeShteUFiaWxpdHkpLnBhcmVudCgpLmNoaWxkcmVuKCcubW9kaWZpZXItYnViYmxlJykudGV4dCgpO1xuICAgIGlmICghalF1ZXJ5LmlzTnVtZXJpYyhhYmlsaXR5KSkge1xuICAgICAgICBhYmlsaXR5ID0gMTtcbiAgICAgICAgalF1ZXJ5KG15QWJpbGl0eSkudmFsKGFiaWxpdHkpO1xuXG5cbiAgICB9XG5cbiAgICBtb2RpZmllciA9IE1hdGguZmxvb3IoKGFiaWxpdHkgLSAxMCkgLyAyKTtcbiAgICBqUXVlcnkobXlBYmlsaXR5KS5wYXJlbnQoKS5jaGlsZHJlbignLm1vZGlmaWVyLWJ1YmJsZScpLnRleHQobW9kaWZpZXIpO1xuICAgIFxuICAgIGlmIChteUFiaWxpdHkuYXR0cignaWQnKSA9PSAnd2lzJykge1xuICAgICAgICBwYXNzaXZlUGVyY2VwdGlvbigpO1xuICAgIH1cbn07XG5cblxualF1ZXJ5KFwiLmFiaWxpdHlcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICB1cGRhdGVBYmlsaXR5Qm9udXMoalF1ZXJ5KHRoaXMpKTtcblxuICAgIGpRdWVyeSh0aGlzKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuc2VsZWN0KCk7XG4gICAgfSlcbiAgICBqUXVlcnkodGhpcykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlQWJpbGl0eUJvbnVzKGpRdWVyeSh0aGlzKSk7XG4gICAgICAgIHVwZGF0ZVByb2YoalF1ZXJ5KCcuc2F2aW5nVGhyb3dzICMnK2pRdWVyeSh0aGlzKS5hdHRyKCdpZCcpKSk7XG4gICAgfSk7XG59KTtcbiIsInZhciB0aGlzQWJpbGl0eSA9IFwiXCI7XG52YXIgdGhpc0FiaWxpdHlCb251cyA9IFwiXCI7XG5cbmZ1bmN0aW9uIGNhbGxBYmlsaXR5KGFiaWxpdHkpIHtcbiAgICB0aGlzQWJpbGl0eSA9IGpRdWVyeSgnLmFiaWxpdHktYm94ICMnK2FiaWxpdHkpLnZhbCgpO1xuICAgIHRoaXNBYmlsaXR5Qm9udXMgPSBwYXJzZUludChqUXVlcnkoJy5hYmlsaXR5LWJveCAjJythYmlsaXR5KyctQm9udXMnKS50ZXh0KCkpO1xufVxuIiwiZnVuY3Rpb24gYWJycmV2aWF0ZUxhYmVscygpIHtcbiAgICB2YXIgYWJicldvcmRzID0gWydTcGVlZHxTUEQnLCdJbml0aWF0aXZlfElOSVQnLCdUZW1wb3Jhcnl8VEVNUCcsJ0hpdCBQb2ludHN8SFAnLCdBcm1vciBDbGFzc3xBQycsJ01heGltdW18TUFYJywnQ3VycmVudHxDUk5UJywnRXhwZXJpZW5jZSBQb2ludHN8WFAnXTtcbiAgICB2YXIgbXlTaXplID0galF1ZXJ5KCcuY2hhclNoZWV0JykuY3NzKCdmb250LXNpemUnKTtcbiAgICBteVNpemUgPSBwYXJzZUludChteVNpemUuc3BsaXQoJ3B4JylbMF0pO1xuICAgIC8vIGNvbnNvbGUubG9nKG15U2l6ZSk7XG4gICAgaWYgKG15U2l6ZTwxNikge1xuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XG4gICAgICAgICAgICBqUXVlcnkoYWJicldvcmRzKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgd29yZCkge1xuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcbiAgICAgICAgICAgICAgICBqUXVlcnkobGFiZWwpLnRleHQoZnVuY3Rpb24oaW5kZXgsIHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShsb25nLCBzaG9ydCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XG4gICAgICAgICAgICBqUXVlcnkoYWJicldvcmRzKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgd29yZCkge1xuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcbiAgICAgICAgICAgICAgICBqUXVlcnkobGFiZWwpLnRleHQoZnVuY3Rpb24oaW5kZXgsIHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShzaG9ydCwgbG9uZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG59XG4iLCIvLyBqUXVlcnkoJyNjbGFzc01hbmFnZXInKS5oaWRlKCk7XG4vL1xuLy8gdmFyIGdldExhYmVsID0galF1ZXJ5KCcuY2hhclNoZWV0ICNjbGFzc01vcmUnKS5odG1sKCk7XG4vLyBjb25zb2xlLmxvZyhnZXRMYWJlbCk7XG4vLyBnZXRMYWJlbCA9IGdldExhYmVsKyc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpyaWdodDsgZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOjEwZW07XCI+aGVsbG8hPC9kaXY+Jztcbi8vIGNvbnNvbGUubG9nKGdldExhYmVsKTtcbi8vIGpRdWVyeSgnLmNoYXJTaGVldCAjY2xhc3NNb3JlJykuaHRtbChnZXRMYWJlbCk7XG5cbi8vIDxzdmc+PHVzZSB4bGluazpocmVmPVwiI2Rvd25BbmdsZVwiPjwvdXNlPjwvc3ZnPlxuIiwiZnVuY3Rpb24gY2xlYXJUb3AoKSB7XG4gICAgalF1ZXJ5KFwiLmRyYWdcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnJlbW92ZUNsYXNzKFwib25Ub3BcIik7XG4gICAgfSk7XG59O1xuXG5qUXVlcnkoXCIuZHJhZ1wiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpIHtcbiAgICBjbGVhclRvcCgpO1xuICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcyhcIm9uVG9wXCIpO1xufSk7XG4iLCJqUXVlcnkoXCIuZGVhdGhTYXZlc1wiKS5vbihcImNsaWNrXCIsIFwiLmljb25cIiwgZnVuY3Rpb24oKSB7XG4gIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG59KTtcbmpRdWVyeShcIi5kZWF0aFNhdmVzXCIpLm9uKFwiY2xpY2tcIiwgXCIucmVhcGVyXCIsIGZ1bmN0aW9uKCkge1xuICBqUXVlcnkoXCIuaWNvblwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG59KTtcbiIsIi8vIGdldERpckNvbnRlbnRzKFwiLi9ib29rc1wiKS50aGVuKGZ1bmN0aW9uIChmaWxlcykge1xuLy8gICAvLyBjb25zb2xlLmxvZygpO1xuLy8gICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbGVzLmZpbGVzWzBdLm5hbWUpKSk7XG4vLyAgIGZvcih2YXIgaSA9IDA7IGkgPD0gZmlsZXMuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4vLyAgICAgcmVhZEFGaWxlKFwiLi9ib29rcy9cIiArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsZXMuZmlsZXNbaV0ubmFtZSkpKS50aGVuKGZ1bmN0aW9uIChib29rKSB7XG4vLyAgICAgICB2YXIgYm9va1RpdGxlID0gSlNPTi5wYXJzZShib29rKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpO1xuLy8gICAgICAgalF1ZXJ5KFwiLmJvb2tMaXN0XCIpLmFwcGVuZChgPGRpdiBjbGFzcz1cImJvb2tcIj4ke2Jvb2tUaXRsZS5kZXRhaWxzLm5hbWV9PGRpdj5gKTtcblxuLy8gICAgICAgIC8vbG9vayBmb3IgbnBjLCB0aGlzIHdpbGwgZXZlbnR1YWxseSBiZSBpdHMgb3duIGZ1bmN0aW9uXG4vLyAgICAgICBpZihib29rVGl0bGUuaGFzT3duUHJvcGVydHkoXCJOUENcIikpe1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lK1wiIHRydWVcIilcbi8vICAgICAgIH1lbHNle1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm5vbmUgZm91bmRcIilcbi8vICAgICAgIH1cblxuLy8gICAgIH0pO1xuXG5cblxuLy8gICB9XG4vLyB9KTtcbmxpc3RCb29rcygpLnRoZW4oKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxufSk7XG5mdW5jdGlvbiBsaXN0Qm9va3MoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IHRpdGxlQXJyYXkgPVtdXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBnZXREaXJDb250ZW50cyhib29rUGF0aCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZGF0YS5maWxlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBib29rUGF0aCArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5maWxlc1tpXS5uYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFGaWxlKHBhdGgpLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBib29rVGl0bGUgPSBKU09OLnBhcnNlKGJvb2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJvb2tPYmogPSB7XCJuYW1lXCI6Ym9va1RpdGxlLmRldGFpbHMubmFtZSwgXCJwYXRoXCI6cGF0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlQXJyYXkucHVzaChKU09OLnN0cmluZ2lmeShib29rT2JqKSk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYm9va1RpdGxlLmRldGFpbHMubmFtZSkpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGl0bGVBcnJheSlcbiAgICAgICAgICAgICAgICBib29rcyA9IHtcImJvb2tzXCI6dGl0bGVBcnJheX07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShib29rcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9XG4gICAgfSk7XG59IiwiLyoqXG4gKiBOZWVkIHRvIGJ1aWxkIGxvYWRpbmcgYSBjYW1wYWlnblxuICogbmVlZCBuZXcgY2FtcGFpZ24gdG8gbWFrZSBzdXJlIGl0cyBuYW1lIGlzIHVuaXF1ZS5cbiAqL1xuXG5cbmpRdWVyeShcIi5jYW1wQWRkXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG5ld0NhbXBhaWduKCk7XG59KTtcblxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLmNhbXBMb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9Mb2FkID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLWxvYWRcIik7XG4gICAgdmFyIHRoaXNOYW1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW5hbWVcIik7XG4gICAgdmFyIHRoaXNEaXI7XG4gICAgLy8gICBjb25zb2xlLmxvZyh0b0xvYWROYW1lKVxuICAgIHJlbW92ZVNwYWNlKHRoaXNOYW1lKS50aGVuKChuYW1lKSA9PiB7XG4gICAgICAgIHRoaXNEaXIgPSBjYW1wYWlnbkRpclBhdGggKyBuYW1lICsgXCIvY2FtcC5qc29uXCI7XG4gICAgICAgIGNoZWNrRmlsZUV4aXN0KHRoaXNEaXIpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhpcyBjYW1wYWlnbiBkb2Vzbid0IGV4aXN0Li4uIE5vdyBkZWxldGluZ1wiKTtcbiAgICAgICAgICAgICAgICBkZWxldGVDYW1wYWlnbih0aGlzTmFtZSwgdG9Mb2FkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWFkQUZpbGUodGhpc0RpcikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzQ2FtcGFpZ24gPT0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIC8vV2lsbCBuZWVkIHRvIGxvYWQgdXAgYWxsIHRoZSBib29rcyBhbmQgc3R1ZmYsIFxuICAgICAgICAgICAgICAgICAgICAvL2J1dCB3ZSBuZWVkIHRvIGZpZ3VyZSBvdXQgdGhlIG9ialxuICAgICAgICAgICAgICAgICAgICAvLyBzbyBmb3Igbm93IHdlIHdpbGwganVzdCBnbyB0byB0aGUgdWlcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduc1wiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfSlcbn0pXG5cbi8vdGhlIGRlbGV0ZSBidXR0b25cbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5jYW1wRGVsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9EZWxldGUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtZGVsZXRlXCIpO1xuICAgIHZhciB0b0RlbGV0ZU5hbWUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbmFtZVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XG4gICAgLy9zaG91bGQgYWRkIGEgYXJlIHlvdSBzdXJlIHBvcHVwXG4gICAgZGVsZXRlQ2FtcGFpZ24odG9EZWxldGVOYW1lLCB0b0RlbGV0ZSlcbn0pO1xuXG5qUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuc2F2ZU5ld0NhbXBcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXdDYW1wTmFtZSA9IGpRdWVyeShcImlucHV0W25hbWU9J25ld0NhbXAnXVwiKS52YWwoKTtcbiAgICB2YXIgY2FtcE9iaiA9IHtcbiAgICAgICAgXCJuYW1lXCI6IG5ld0NhbXBOYW1lXG4gICAgfTtcbiAgICB0aGlzQ2FtcGFpZ24gPSB7XG4gICAgICAgIFwiY2FtcGFpZ25cIjoge1xuICAgICAgICAgICAgXCJuYW1lXCI6IG5ld0NhbXBOYW1lXG4gICAgICAgIH1cbiAgICB9XG4gICAgY2FtcGFpZ25PYmouY2FtcGFpZ25zLnB1c2goY2FtcE9iaik7IC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSlcblxuICAgIHdyaXRlRmlsZShjYW1wYWlnbkxpc3RQYXRoLCBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEgPT0gXCJGaWxlIFdyaXR0ZW5cIikge1xuICAgICAgICAgICAgY3JlYXRlQ2FtcGFpZ24obmV3Q2FtcE5hbWUpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcImRvbmVcIikge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVTcGFjZShuZXdDYW1wTmFtZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc0NhbXBhaWduUGF0aCA9IGNhbXBhaWduRGlyUGF0aCArIGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUZpbGUodGhpc0NhbXBhaWduUGF0aCArIFwiL2NhbXAuanNvblwiLCBKU09OLnN0cmluZ2lmeSh0aGlzQ2FtcGFpZ24pKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBkZWxldGVDYW1wYWlnbih0b0RlbGV0ZU5hbWUsIHRvRGVsZXRlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmFyIG5ld0FycmF5ID0gY2FtcGFpZ25PYmouY2FtcGFpZ25zO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdBcnJheSlcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJkZWxldCB0aGlzIG51bWJlciBcIiArIHRvRGVsZXRlICsgXCIgYW5kIHRoaXMgaXMgdGhlIG9iamVjdFwiICsgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmouY2FtcGFpZ25zKSk7XG4gICAgICAgIG5ld0FycmF5LnNwbGljZSh0b0RlbGV0ZSwgMSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSk7XG4gICAgICAgIHdyaXRlRmlsZShjYW1wYWlnbkxpc3RQYXRoLCBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhID09IFwiRmlsZSBXcml0dGVuXCIpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVTcGFjZSh0b0RlbGV0ZU5hbWUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmltcmFmKGNhbXBhaWduRGlyUGF0aCArIGRhdGEsIChzdHVmZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3R1ZmYpXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENhbXBhaWducyhkYXRhKS50aGVuKChjYW1wTGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLmh0bWwoY2FtcExpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2FtcGFpZ24oY2FtcE5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB2YXIgZGlyO1xuICAgICAgICByZW1vdmVTcGFjZShjYW1wTmFtZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZGlyID0gY2FtcGFpZ25EaXJQYXRoICsgZGF0YTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjaGVja0RpckV4aXN0KGRpcikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVEaXIoZGlyKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbmV3Q2FtcGFpZ24oKSB7XG4gICAgZ2V0Q2FtcGFpZ25zKGNhbXBhaWduTGlzdFBhdGgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGh0bWwpID0+IHtcbiAgICAgICAgICAgIHZhciBhZGRPbkh0bWwgPSBcIjx0cj48dGQ+PGlucHV0IHR5cGU9J3RleHQnIG5hbWU9J25ld0NhbXAnIC8+PC90ZD48dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgc2F2ZU5ld0NhbXAnPlNhdmU8L2J1dHRvbj48L3RkPjwvdHI+PC90YWJsZT5cIjtcbiAgICAgICAgICAgIHZhciBuZXdIdG1sID0gaHRtbC5yZXBsYWNlKFwiPC90YWJsZT5cIiwgYWRkT25IdG1sKTtcbiAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikuaHRtbChuZXdIdG1sKTtcbiAgICAgICAgfSlcbiAgICB9KVxuXG59XG5cbi8vR2V0cyB0aGUgbGlzdCBvZiBjYW1wYWlnbnNcbmZ1bmN0aW9uIGdldENhbXBhaWducyhwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0Q2FtcGFpZ25zIFwiICsgcGF0aCk7XG4gICAgICAgICAgICBjaGVja0ZpbGVFeGlzdChwYXRoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZEFGaWxlKHBhdGgpLnRoZW4oKGNhbXBhaWducykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FtcGFpZ25zID0gSlNPTi5wYXJzZShjYW1wYWlnbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FtcGFpZ25PYmogPSBjYW1wYWlnbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNhbXBhaWduT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxuLy9QdXRzIHRoZSBsaXN0IG9mIGNhbXBhaWducyBvbiB0aGUgY2FtcGFpZ24gc2VsZWN0b3IuXG5mdW5jdGlvbiBzZXRDYW1wYWlnbnMoY2FtcGFpZ25zKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBjYW1wQXJyYXkgPSBjYW1wYWlnbnMuY2FtcGFpZ25zO1xuICAgICAgICAgICAgdmFyIGh0bWwgPSBcIjx0YWJsZT5cIjtcbiAgICAgICAgICAgIGNhbXBBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobm9kZSkpXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lKVxuICAgICAgICAgICAgICAgIGh0bWwgKz0gXCI8dHI+PHRkPlwiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCI8L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS1uYW1lPSdcIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiJyBkYXRhLWxvYWQ9J1wiICsgaSArIFwiJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGNhbXBMb2FkJz5Mb2FkPC9idXR0b24+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtbmFtZT0nXCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIicgZGF0YS1kZWxldGU9J1wiICsgaSArIFwiJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGNhbXBEZWxldGUnPkRlbGV0ZTwvYnV0dG9uPjwvdGQ+PC90cj5cIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBodG1sICs9IFwiPC90YWJsZT5cIjtcblxuICAgICAgICAgICAgcmVzb2x2ZShodG1sKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImpRdWVyeShcIi5jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgalF1ZXJ5KHRoaXMpLnBhcmVudCgpLnRvZ2dsZSgpO1xufSlcbmpRdWVyeShcIi5tZW51IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wZW5NZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1vcGVuXCIpO1xuICAgIGpRdWVyeShcIi5cIiArIG9wZW5NZSkudG9nZ2xlKCk7XG4gICAgY2xlYXJUb3AoKTtcbiAgICBqUXVlcnkoXCIuXCIgKyBvcGVuTWUpLmFkZENsYXNzKFwib25Ub3BcIik7XG59KTtcbiIsIiIsImZ1bmN0aW9uIHBhc3NpdmVQZXJjZXB0aW9uKCkge1xuICAgIGNhbGxBYmlsaXR5KCd3aXMnKTtcbiAgICBqUXVlcnkoJyNwYXNzUGVyYycpLnZhbCh0aGlzQWJpbGl0eUJvbnVzKzEwKTtcbn1cbiIsInZhciBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xuc29tZXRoaW5nQ2xldmVyKCk7XG5cbmpRdWVyeSgnI3Byb2ZCb251cycpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgcHJvZkIgPSBqUXVlcnkoJyNwcm9mQm9udXMnKS52YWwoKTtcbiAgICBzb21ldGhpbmdDbGV2ZXIoKTtcbn0pO1xuXG5mdW5jdGlvbiBzb21ldGhpbmdDbGV2ZXIoKSB7XG4gICAgalF1ZXJ5KCcuaWNvbi1wcm9mJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XG4gICAgICAgIHZhciBjdXJyZW50Q2xhc3MgPSBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnKTtcbiAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSBqUXVlcnkuaW5BcnJheShjdXJyZW50Q2xhc3MsIGNsYXNzZXMpO1xuICAgICAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xuICAgICAgICB1cGRhdGVQcm9mKGpRdWVyeShteVByb2YpLCBjdXJyZW50UG9zKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUHJvZihteVByb2YsIG15UHJvZlNraWxsRmxhZykge1xuICAgIHZhciB0aGlzQWJpbGl0eSA9IGpRdWVyeShteVByb2YpLmF0dHIoJ2lkJyk7XG4gICAgdmFyIHRoaXNBYmlsaXR5Qm9udXNJRCA9ICcjJyArIHRoaXNBYmlsaXR5ICsgJy1Cb251cyc7XG4gICAgdmFyIHRoaXNBYmlsaXR5Qm9udXMgPSBqUXVlcnkoJy5hYmlsaXRpZXMgJyArIHRoaXNBYmlsaXR5Qm9udXNJRCkudGV4dCgpO1xuICAgIHZhciBuZXdWYWwgPSBwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKTtcbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDApIHtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xuICAgIH1cbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDEpIHtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSArIHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xuICAgIH1cbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDIpIHtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSAqIDIgKyAocGFyc2VJbnQodGhpc0FiaWxpdHlCb251cykpO1xuICAgIH1cbiAgICBqUXVlcnkobXlQcm9mKS50ZXh0KG5ld1ZhbCk7XG59O1xuXG5cbmpRdWVyeSgnLmljb24tcHJvZicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gWydpY29uLXByb2YnLCAnaWNvbi1wcm9mIHByb2ZpY2llbnQnLCAnaWNvbi1wcm9mIGV4cGVydGlzZSddO1xuICAgIHZhciBjdXJyZW50Q2xhc3MgPSBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnKTtcbiAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XG4gICAgdmFyIG5ld1BvcyA9ICgoY3VycmVudFBvcyArIDEpICUgY2xhc3Nlcy5sZW5ndGgpO1xuICAgIHZhciBuZXdDbGFzcyA9IGNsYXNzZXNbbmV3UG9zXTtcbiAgICBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnLCBuZXdDbGFzcyk7XG4gICAgdmFyIG15UHJvZiA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignLnByb2ZWYWwnKTtcbiAgICB1cGRhdGVQcm9mKGpRdWVyeShteVByb2YpLCBuZXdQb3MpO1xufSk7XG4iLCJhYnJyZXZpYXRlTGFiZWxzKCk7XG5qUXVlcnkoJy50ZXh0U2l6ZSAjZm9udC1zaXplLXVwJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgIHZhciB0YXJnZXQgPSBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCk7XG4gICAgdmFyIGN1cnJTaXplID0gcGFyc2VJbnQoalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScpLnNwbGl0KFwicHhcIilbMF0pO1xuICAgIC8vIGN1cnJTaXplID0gTWF0aC5yb3VuZChjdXJyU2l6ZSk7XG4gICAgdmFyIG5ld1NpemUgPSBjdXJyU2l6ZSszO1xuICAgIGlmIChuZXdTaXplID4gMTYpe1xuICAgICAgICBuZXdTaXplID0gMTY7XG4gICAgfVxuICAgIHZhciBuZXdFbXMgPSAobmV3U2l6ZS8xNik7XG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScsbmV3RW1zKydlbScpO1xuICAgIGFicnJldmlhdGVMYWJlbHMoKTtcbn0pXG5cbmpRdWVyeSgnLnRleHRTaXplICNmb250LXNpemUtZG93bicpLmNsaWNrKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFyZ2V0ID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xuICAgIHZhciBjdXJyU2l6ZSA9IHBhcnNlSW50KGpRdWVyeSh0YXJnZXQpLmNzcygnZm9udFNpemUnKS5zcGxpdChcInB4XCIpWzBdKTtcbiAgICB2YXIgbmV3U2l6ZSA9IGN1cnJTaXplLTM7XG4gICAgaWYgKG5ld1NpemUgPCA5KXtcbiAgICAgICAgbmV3U2l6ZSA9IDk7XG4gICAgfVxuICAgIHZhciBuZXdFbXMgPSAobmV3U2l6ZS8xNik7XG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScsbmV3RW1zKydlbScpO1xuICAgIGFicnJldmlhdGVMYWJlbHMoKTtcbn0pXG4iLCIvL3RoZW1lc1xudmFyIGJ1dHRvbk9wdGlvbnMgPSBbJ2RlZmF1bHQnLCAnd29ybicsICdsaWdodCcsICdibGFjaycsICdncmF5JywgJ3JlZCddO1xualF1ZXJ5KGJ1dHRvbk9wdGlvbnMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIG15U3R5bGUgPSB0aGlzO1xuICAgIHZhciBteUlkID0gJyMnICsgbXlTdHlsZTtcbiAgICBqUXVlcnkobXlJZCkub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQXR0cignY2xhc3MnKTtcbiAgICAgICAgalF1ZXJ5KCdib2R5JykuYWRkQ2xhc3MoJ3RoZW1lLScgKyBteVN0eWxlKTtcbiAgICB9KVxufSlcbiJdfQ==

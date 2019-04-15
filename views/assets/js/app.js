'use strict'; // remove line below when testing frontend
// var fs = require('fs');
// var rimraf = require("rimraf");
// Paths

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
};
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
"use strict";

jQuery('#classManager').hide();
var getLabel = jQuery('.charSheet #classMore').html();
console.log(getLabel);
getLabel = getLabel + '<div style="text-align:right; display:inline-block; width:10em;">hello!</div>';
console.log(getLabel);
jQuery('.charSheet #classMore').html(getLabel); // <svg><use xlink:href="#downAngle"></use></svg>
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

<<<<<<< HEAD
=======
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

>>>>>>> 7d6b80e5f5d909539ab36dbc988c15968ef4b11a
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
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImxvYWRDYW1wYWlnbi5qcyIsIm1lbnVCdXR0b25zLmpzIiwibnBjLmpzIiwicGFzc2l2ZVBlcmNlcHRpb24uanMiLCJwcm9maWNpZW5jaWVzLmpzIiwidGV4dFNpemUuanMiLCJ0aGVtZXMuanMiXSwibmFtZXMiOlsiY2FtcGFpZ25MaXN0UGF0aCIsImJvb2tQYXRoIiwiY2FtcGFpZ25EaXJQYXRoIiwidGhpc0NhbXBhaWduUGF0aCIsImJvb2tzIiwibnBjIiwiY2FtcGFpZ25PYmoiLCJ0aGlzQ2FtcGFpZ24iLCJzcGFjZUNoYXIiLCJqUXVlcnkiLCJvbiIsInJlbW92ZSIsInJlYWR5IiwiZHJhZ2dhYmxlIiwiY29udGFpbm1lbnQiLCJzY3JvbGwiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3BlcnR5IiwidW5kZWZpbmVkIiwiZG9jdW1lbnQiLCJzdGFydEFwcCIsInRoZW4iLCJkYXRhIiwic2V0Q2FtcGFpZ25zIiwiY2FtcExpc3QiLCJwcmVwZW5kIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldENhbXBhaWducyIsImVycm9yIiwicmVhZEFGaWxlIiwiZmlsZXBhdGgiLCJmcyIsInJlYWRGaWxlIiwiZXJyIiwibWVzc2FnZSIsIndyaXRlRmlsZSIsImdldERpckNvbnRlbnRzIiwiZGlyIiwiZmlsZXMiLCJmaWxlTmFtZXMiLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlTmFtZSIsInB1c2giLCJjaGVja0ZpbGVFeGlzdCIsInBhdGgiLCJhY2Nlc3MiLCJGX09LIiwiY2hlY2tEaXJFeGlzdCIsImV4aXN0c1N5bmMiLCJjcmVhdGVEaXIiLCJta2RpclN5bmMiLCJyZW1vdmVTcGFjZSIsInN0cmluZyIsImNsZWFuU3RyaW5nIiwicmVwbGFjZSIsImFkZFNwYWNlIiwiUmVnRXhwIiwidXBkYXRlQWJpbGl0eUJvbnVzIiwibXlBYmlsaXR5IiwiYWJpbGl0eSIsInZhbCIsIm1vZGlmaWVyIiwicGFyZW50IiwiY2hpbGRyZW4iLCJ0ZXh0IiwiaXNOdW1lcmljIiwiTWF0aCIsImZsb29yIiwiYXR0ciIsInBhc3NpdmVQZXJjZXB0aW9uIiwiZWFjaCIsInNlbGVjdCIsInVwZGF0ZVByb2YiLCJ0aGlzQWJpbGl0eSIsInRoaXNBYmlsaXR5Qm9udXMiLCJjYWxsQWJpbGl0eSIsInBhcnNlSW50IiwiYWJycmV2aWF0ZUxhYmVscyIsImFiYnJXb3JkcyIsIm15U2l6ZSIsImNzcyIsInNwbGl0IiwiaW5kZXgiLCJsYWJlbCIsIndvcmQiLCJsb25nIiwic2hvcnQiLCJoaWRlIiwiZ2V0TGFiZWwiLCJodG1sIiwiY2xlYXJUb3AiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwibmV3Q2FtcGFpZ24iLCJ0b0RlbGV0ZSIsInRvRGVsZXRlTmFtZSIsIm5ld0FycmF5IiwiY2FtcGFpZ25zIiwic3BsaWNlIiwicmltcmFmIiwic3R1ZmYiLCJuZXdDYW1wTmFtZSIsImNhbXBPYmoiLCJjcmVhdGVDYW1wYWlnbiIsIkVycm9yIiwiY2FtcE5hbWUiLCJhZGRPbkh0bWwiLCJuZXdIdG1sIiwicGFyc2UiLCJjYW1wQXJyYXkiLCJub2RlIiwiaSIsIm5hbWUiLCJjbGljayIsInRvZ2dsZSIsIm9wZW5NZSIsInByb2ZCIiwic29tZXRoaW5nQ2xldmVyIiwiY2xhc3NlcyIsImN1cnJlbnRDbGFzcyIsImN1cnJlbnRQb3MiLCJpbkFycmF5IiwibXlQcm9mIiwibXlQcm9mU2tpbGxGbGFnIiwidGhpc0FiaWxpdHlCb251c0lEIiwibmV3VmFsIiwibmV3UG9zIiwibGVuZ3RoIiwibmV3Q2xhc3MiLCJ0YXJnZXQiLCJjdXJyU2l6ZSIsIm5ld1NpemUiLCJuZXdFbXMiLCJidXR0b25PcHRpb25zIiwibXlTdHlsZSIsIm15SWQiLCIkIiwicmVtb3ZlQXR0ciJdLCJtYXBwaW5ncyI6IkFBQUEsYSxDQUNFO0FBQ0E7QUFDQTtBQUVGOztBQUNBLElBQUlBLGdCQUFnQixHQUFHLGlCQUF2QjtBQUNBLElBQUlDLFFBQVEsR0FBRyxTQUFmO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLGNBQXRCO0FBQ0EsSUFBSUMsZ0JBQUosQyxDQUNBO0FBRUE7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQSxJQUFJQyxHQUFHLEdBQUcsRUFBVjtBQUNBLElBQUlDLFdBQVcsR0FBRyxFQUFsQjtBQUNBLElBQUlDLFlBQVksR0FBRyxFQUFuQixDLENBQ0E7QUFFQTs7QUFDQSxJQUFJQyxTQUFTLEdBQUcsSUFBaEIsQyxDQUNBO0FBRUE7O0FBQ0FDLE1BQU0sQ0FBQyxrQkFBRCxDQUFOLENBQTJCQyxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFVO0FBQy9DRCxFQUFBQSxNQUFNLENBQUMsWUFBRCxDQUFOLENBQXFCRSxNQUFyQjtBQUNELENBRkQ7QUFJQUYsTUFBTSxDQUFDLFVBQUQsQ0FBTixDQUFtQkcsS0FBbkIsQ0FBeUIsWUFBWTtBQUNuQ0gsRUFBQUEsTUFBTSxDQUFDLE9BQUQsQ0FBTixDQUFnQkksU0FBaEIsQ0FBMEI7QUFDdEJDLElBQUFBLFdBQVcsRUFBRSxXQURTO0FBRXRCQyxJQUFBQSxNQUFNLEVBQUU7QUFGYyxHQUExQjtBQU1ELENBUEQ7O0FBU0FDLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsY0FBakIsR0FBa0MsVUFBU0MsUUFBVCxFQUFtQjtBQUNyRCxTQUFPLEtBQUtBLFFBQUwsTUFBbUJDLFNBQTFCO0FBQ0MsQ0FGRCxDLENBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTs7O0FDOURBWCxNQUFNLENBQUNZLFFBQUQsQ0FB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QUFPLEdBQUdELFFBQVEsR0FBQyxDQUF2Qjs7QUFDQSxNQUFJQyxPQUFPLEdBQUcsQ0FBZCxFQUFnQjtBQUNaQSxJQUFBQSxPQUFPLEdBQUcsQ0FBVjtBQUNIOztBQUNELE1BQUlDLE1BQU0sR0FBSUQsT0FBTyxHQUFDLEVBQXRCO0FBQ0FuSSxFQUFBQSxNQUFNLENBQUNpSSxNQUFELENBQU4sQ0FBZWpELEdBQWYsQ0FBbUIsVUFBbkIsRUFBOEJvRCxNQUFNLEdBQUMsSUFBckM7QUFDQXZELEVBQUFBLGdCQUFnQjtBQUNuQixDQVZEOzs7QUNkQTtBQUNBLElBQUl3RCxhQUFhLEdBQUcsQ0FBQyxTQUFELEVBQVksTUFBWixFQUFvQixPQUFwQixFQUE2QixPQUE3QixFQUFzQyxNQUF0QyxFQUE4QyxLQUE5QyxDQUFwQjtBQUNBckksTUFBTSxDQUFDcUksYUFBRCxDQUFOLENBQXNCL0QsSUFBdEIsQ0FBMkIsWUFBVztBQUNsQyxNQUFJZ0UsT0FBTyxHQUFHLElBQWQ7QUFDQSxNQUFJQyxJQUFJLEdBQUcsTUFBTUQsT0FBakI7QUFDQXRJLEVBQUFBLE1BQU0sQ0FBQ3VJLElBQUQsQ0FBTixDQUFhdEksRUFBYixDQUFnQixPQUFoQixFQUF5QixZQUFXO0FBQ2hDdUksSUFBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxVQUFWLENBQXFCLE9BQXJCO0FBQ0F6SSxJQUFBQSxNQUFNLENBQUMsTUFBRCxDQUFOLENBQWU0RixRQUFmLENBQXdCLFdBQVcwQyxPQUFuQztBQUNILEdBSEQ7QUFJSCxDQVBEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbiAgLy8gcmVtb3ZlIGxpbmUgYmVsb3cgd2hlbiB0ZXN0aW5nIGZyb250ZW5kXG4gIC8vIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIC8vIHZhciByaW1yYWYgPSByZXF1aXJlKFwicmltcmFmXCIpO1xuXG4vLyBQYXRoc1xubGV0IGNhbXBhaWduTGlzdFBhdGggPSBcIi4vY2FtcGFpZ24uanNvblwiO1xubGV0IGJvb2tQYXRoID0gXCIuL2Jvb2svXCI7XG5sZXQgY2FtcGFpZ25EaXJQYXRoID0gXCIuL2NhbXBhaWducy9cIjtcbmxldCB0aGlzQ2FtcGFpZ25QYXRoO1xuLy8vXG5cbi8vZ2xvZGFsIG9iamVjdHNcbnZhciBib29rcyA9IHt9O1xudmFyIG5wYyA9IHt9O1xudmFyIGNhbXBhaWduT2JqID0ge307XG52YXIgdGhpc0NhbXBhaWduID0ge307XG4vLy9cblxuLy9nbG9iYWwgdmFyc1xubGV0IHNwYWNlQ2hhciA9IFwiX19cIjtcbi8vL1xuXG4vL3RlbXAgdG8gY29zZSB0aGUgY2FtcGFpZ24gcGlja2VyLlxualF1ZXJ5KFwiLmNsb3NlQ2FtcFdpbmRvd1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gIGpRdWVyeShcIi5jYW1wYWlnbnNcIikucmVtb3ZlKCk7XG59KTtcblxualF1ZXJ5KFwiZG9jdW1lbnRcIikucmVhZHkoZnVuY3Rpb24gKCkge1xuICBqUXVlcnkoXCIuZHJhZ1wiKS5kcmFnZ2FibGUoe1xuICAgICAgY29udGFpbm1lbnQ6IFwiLm1haW5WaWV3XCIsXG4gICAgICBzY3JvbGw6IGZhbHNlXG4gIH0pO1xuXG5cbn0pO1xuXG5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5ID0gZnVuY3Rpb24ocHJvcGVydHkpIHtcbnJldHVybiB0aGlzW3Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkO1xufTtcblxuLy8gZ2V0RGlyQ29udGVudHMoXCIuL2Jvb2tzXCIpLnRoZW4oZnVuY3Rpb24gKGZpbGVzKSB7XG4vLyAgIC8vIGNvbnNvbGUubG9nKCk7XG4vLyAgIC8vIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsZXMuZmlsZXNbMF0ubmFtZSkpKTtcbi8vICAgZm9yKHZhciBpID0gMDsgaSA8PSBmaWxlcy5maWxlcy5sZW5ndGggLSAxOyBpKyspIHtcbi8vICAgICByZWFkQUZpbGUoXCIuL2Jvb2tzL1wiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWxlcy5maWxlc1tpXS5uYW1lKSkpLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcbi8vICAgICAgIHZhciBib29rVGl0bGUgPSBKU09OLnBhcnNlKGJvb2spO1xuLy8gICAgICAgY29uc29sZS5sb2coYm9va1RpdGxlLmRldGFpbHMubmFtZSk7XG4vLyAgICAgICBqUXVlcnkoXCIuYm9va0xpc3RcIikuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiYm9va1wiPiR7Ym9va1RpdGxlLmRldGFpbHMubmFtZX08ZGl2PmApO1xuXG4vLyAgICAgICAgLy9sb29rIGZvciBucGMsIHRoaXMgd2lsbCBldmVudHVhbGx5IGJlIGl0cyBvd24gZnVuY3Rpb25cbi8vICAgICAgIGlmKGJvb2tUaXRsZS5oYXNPd25Qcm9wZXJ0eShcIk5QQ1wiKSl7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUrXCIgdHJ1ZVwiKVxuLy8gICAgICAgfWVsc2V7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwibm9uZSBmb3VuZFwiKVxuLy8gICAgICAgfVxuXG4vLyAgICAgfSk7XG5cblxuXG4vLyAgIH1cbi8vIH0pO1xuIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICBcbiAgc3RhcnRBcHAoKS50aGVuKChkYXRhKT0+e1xuICAgIHNldENhbXBhaWducyhkYXRhKS50aGVuKChjYW1wTGlzdCk9PntcbiAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikucHJlcGVuZChjYW1wTGlzdCk7XG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgY29uc29sZS5sb2coY2FtcGFpZ25PYmopXG4gIH0pO1xuIFxuICB9KVxuICBcblxuICBmdW5jdGlvbiBzdGFydEFwcCgpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgdHJ5e1xuICAgICAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSk9PntcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICB9IGNhdGNoIChlcnJvcil7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfSlcbiAgICBcbiAgfSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gcmVhZEFGaWxlKGZpbGVwYXRoKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgJ3V0Zi04JywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiQW4gZXJyb3Igb2N1cnJlZCByZWFkaW5nIHRoZSBmaWxlIDpcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZnMud3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhLCAoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgcmVzb2x2ZShcIkZpbGUgV3JpdHRlblwiKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBnZXREaXJDb250ZW50cyhkaXIpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB2YXIgZmlsZXMgPSB7fTtcbiAgICAgICAgdmFyIGZpbGVOYW1lcyA9IFtdO1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBmcy5yZWFkZGlyU3luYyhkaXIpLmZvckVhY2goKGZpbGVOYW1lKT0+e1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6ZmlsZU5hbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGZpbGVzID0ge1wiZmlsZXNcIjpmaWxlTmFtZXN9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzb2x2ZShmaWxlcyk7XG4gICAgICAgIH1jYXRjaChlcnJvcil7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjaGVja0ZpbGVFeGlzdChwYXRoKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICBpZighcGF0aCl7XG4gICAgICAgICAgICAgcmVqZWN0KFwiUGF0aCBpcyBpbnZhbGlkIFwiK3BhdGgpXG4gICAgICAgIH1cbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZnMuYWNjZXNzKHBhdGgsIGZzLkZfT0ssIChlcnIpPT57XG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgIHJlamVjdChcImVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRGlyRXhpc3QoZGlyKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgaWYoZnMuZXhpc3RzU3luYyhkaXIpKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiZmFsc2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURpcihkaXIpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlyKTtcbiAgICAgICAgICAgIHJlc29sdmUoXCJkb25lXCIpO1xuICAgICAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3BhY2Uoc3RyaW5nKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdmFyIGNsZWFuU3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccy9nLHNwYWNlQ2hhcik7XG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcbiAgICAgICAgfWNhdGNoIChlcnJvcil7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSlcblxuXG59XG5cbmZ1bmN0aW9uIGFkZFNwYWNlKHN0cmluZyl7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgdmFyIGFkZFNwYWNlID0gbmV3IFJlZ0V4cChzcGFjZUNoYXIsXCJnXCIpXG4gICAgICAgICAgICB2YXIgY2xlYW5TdHJpbmcgPSBzdHJpbmcucmVwbGFjZShhZGRTcGFjZSwgL1xccy8gKTtcbiAgICAgICAgICAgIHJlc29sdmUoY2xlYW5TdHJpbmcpO1xuICAgICAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KVxufVxuLy93cml0ZSB0ZXN0XG4vLyB2YXIgdGVzdE9iaiAgPSBcIlRoaXMgaXMgYSB3cml0ZSB0ZXN0XCI7XG4vLyB3cml0ZUZpbGUoXCIuLi90ZXN0LnR4dFwiLCB0ZXN0T2JqKTtcbiIsIlxuZnVuY3Rpb24gdXBkYXRlQWJpbGl0eUJvbnVzKG15QWJpbGl0eSkge1xuICAgIHZhciBhYmlsaXR5ID0galF1ZXJ5KG15QWJpbGl0eSkudmFsKCk7XG5cbiAgICB2YXIgbW9kaWZpZXIgPSBqUXVlcnkobXlBYmlsaXR5KS5wYXJlbnQoKS5jaGlsZHJlbignLm1vZGlmaWVyLWJ1YmJsZScpLnRleHQoKTtcbiAgICBpZiAoIWpRdWVyeS5pc051bWVyaWMoYWJpbGl0eSkpIHtcbiAgICAgICAgYWJpbGl0eSA9IDE7XG4gICAgICAgIGpRdWVyeShteUFiaWxpdHkpLnZhbChhYmlsaXR5KTtcblxuXG4gICAgfVxuXG4gICAgbW9kaWZpZXIgPSBNYXRoLmZsb29yKChhYmlsaXR5IC0gMTApIC8gMik7XG4gICAgalF1ZXJ5KG15QWJpbGl0eSkucGFyZW50KCkuY2hpbGRyZW4oJy5tb2RpZmllci1idWJibGUnKS50ZXh0KG1vZGlmaWVyKTtcbiAgICBcbiAgICBpZiAobXlBYmlsaXR5LmF0dHIoJ2lkJykgPT0gJ3dpcycpIHtcbiAgICAgICAgcGFzc2l2ZVBlcmNlcHRpb24oKTtcbiAgICB9XG59O1xuXG5cbmpRdWVyeShcIi5hYmlsaXR5XCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdXBkYXRlQWJpbGl0eUJvbnVzKGpRdWVyeSh0aGlzKSk7XG5cbiAgICBqUXVlcnkodGhpcykub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNlbGVjdCgpO1xuICAgIH0pXG4gICAgalF1ZXJ5KHRoaXMpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZUFiaWxpdHlCb251cyhqUXVlcnkodGhpcykpO1xuICAgICAgICB1cGRhdGVQcm9mKGpRdWVyeSgnLnNhdmluZ1Rocm93cyAjJytqUXVlcnkodGhpcykuYXR0cignaWQnKSkpO1xuICAgIH0pO1xufSk7XG4iLCJ2YXIgdGhpc0FiaWxpdHkgPSBcIlwiO1xudmFyIHRoaXNBYmlsaXR5Qm9udXMgPSBcIlwiO1xuXG5mdW5jdGlvbiBjYWxsQWJpbGl0eShhYmlsaXR5KSB7XG4gICAgdGhpc0FiaWxpdHkgPSBqUXVlcnkoJy5hYmlsaXR5LWJveCAjJythYmlsaXR5KS52YWwoKTtcbiAgICB0aGlzQWJpbGl0eUJvbnVzID0gcGFyc2VJbnQoalF1ZXJ5KCcuYWJpbGl0eS1ib3ggIycrYWJpbGl0eSsnLUJvbnVzJykudGV4dCgpKTtcbn1cbiIsImZ1bmN0aW9uIGFicnJldmlhdGVMYWJlbHMoKSB7XG4gICAgdmFyIGFiYnJXb3JkcyA9IFsnU3BlZWR8U1BEJywnSW5pdGlhdGl2ZXxJTklUJywnVGVtcG9yYXJ5fFRFTVAnLCdIaXQgUG9pbnRzfEhQJywnQXJtb3IgQ2xhc3N8QUMnLCdNYXhpbXVtfE1BWCcsJ0N1cnJlbnR8Q1JOVCcsJ0V4cGVyaWVuY2UgUG9pbnRzfFhQJ107XG4gICAgdmFyIG15U2l6ZSA9IGpRdWVyeSgnLmNoYXJTaGVldCcpLmNzcygnZm9udC1zaXplJyk7XG4gICAgbXlTaXplID0gcGFyc2VJbnQobXlTaXplLnNwbGl0KCdweCcpWzBdKTtcbiAgICAvLyBjb25zb2xlLmxvZyhteVNpemUpO1xuICAgIGlmIChteVNpemU8MTYpIHtcbiAgICAgICAgalF1ZXJ5KCdsYWJlbCcpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCBsYWJlbCkge1xuICAgICAgICAgICAgalF1ZXJ5KGFiYnJXb3JkcykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHdvcmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IHdvcmQuc3BsaXQoJ3wnKVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2hvcnQgPSB3b3JkLnNwbGl0KCd8JylbMV07XG4gICAgICAgICAgICAgICAgalF1ZXJ5KGxhYmVsKS50ZXh0KGZ1bmN0aW9uKGluZGV4LCB0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UobG9uZywgc2hvcnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgalF1ZXJ5KCdsYWJlbCcpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCBsYWJlbCkge1xuICAgICAgICAgICAgalF1ZXJ5KGFiYnJXb3JkcykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHdvcmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IHdvcmQuc3BsaXQoJ3wnKVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2hvcnQgPSB3b3JkLnNwbGl0KCd8JylbMV07XG4gICAgICAgICAgICAgICAgalF1ZXJ5KGxhYmVsKS50ZXh0KGZ1bmN0aW9uKGluZGV4LCB0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2Uoc2hvcnQsIGxvbmcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwialF1ZXJ5KCcjY2xhc3NNYW5hZ2VyJykuaGlkZSgpO1xuXG52YXIgZ2V0TGFiZWwgPSBqUXVlcnkoJy5jaGFyU2hlZXQgI2NsYXNzTW9yZScpLmh0bWwoKTtcbmNvbnNvbGUubG9nKGdldExhYmVsKTtcbmdldExhYmVsID0gZ2V0TGFiZWwrJzxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOnJpZ2h0OyBkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6MTBlbTtcIj5oZWxsbyE8L2Rpdj4nO1xuY29uc29sZS5sb2coZ2V0TGFiZWwpO1xualF1ZXJ5KCcuY2hhclNoZWV0ICNjbGFzc01vcmUnKS5odG1sKGdldExhYmVsKTtcblxuLy8gPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjZG93bkFuZ2xlXCI+PC91c2U+PC9zdmc+XG4iLCJmdW5jdGlvbiBjbGVhclRvcCgpIHtcbiAgICBqUXVlcnkoXCIuZHJhZ1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoXCJvblRvcFwiKTtcbiAgICB9KTtcbn07XG5cbmpRdWVyeShcIi5kcmFnXCIpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVG9wKCk7XG4gICAgalF1ZXJ5KHRoaXMpLmFkZENsYXNzKFwib25Ub3BcIik7XG59KTtcbiIsIi8qKlxuICogTmVlZCB0byBidWlsZCBsb2FkaW5nIGEgY2FtcGFpZ25cbiAqIG5lZWQgbmV3IGNhbXBhaWduIHRvIG1ha2Ugc3VyZSBpdHMgbmFtZSBpcyB1bmlxdWUuXG4gKi9cblxuXG5qUXVlcnkoXCIuY2FtcEFkZFwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICBuZXdDYW1wYWlnbigpO1xufSk7XG5cbi8vdGhlIGRlbGV0ZSBidXR0b25cbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5jYW1wRGVsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG9EZWxldGUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtZGVsZXRlXCIpO1xuICAgIHZhciB0b0RlbGV0ZU5hbWUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbmFtZVwiKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XG4gICAgLy9zaG91bGQgYWRkIGEgYXJlIHlvdSBzdXJlIHBvcHVwXG4gICAgdmFyIG5ld0FycmF5ID0gY2FtcGFpZ25PYmouY2FtcGFpZ25zO1xuICAgIC8vIGNvbnNvbGUubG9nKG5ld0FycmF5KVxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGVsZXQgdGhpcyBudW1iZXIgXCIgKyB0b0RlbGV0ZSArIFwiIGFuZCB0aGlzIGlzIHRoZSBvYmplY3RcIiArIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqLmNhbXBhaWducykpO1xuICAgIG5ld0FycmF5LnNwbGljZSh0b0RlbGV0ZSwgMSk7XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKTtcbiAgICB3cml0ZUZpbGUoY2FtcGFpZ25MaXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhID09IFwiRmlsZSBXcml0dGVuXCIpIHtcbiAgICAgICAgICAgIHJlbW92ZVNwYWNlKHRvRGVsZXRlTmFtZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJpbXJhZihjYW1wYWlnbkRpclBhdGggKyBkYXRhLCAoc3R1ZmYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3R1ZmYpXG4gICAgICAgICAgICAgICAgICAgIGdldENhbXBhaWducyhjYW1wYWlnbkxpc3RQYXRoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoY2FtcExpc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLmh0bWwoY2FtcExpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pXG59KTtcblxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLnNhdmVOZXdDYW1wXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV3Q2FtcE5hbWUgPSBqUXVlcnkoXCJpbnB1dFtuYW1lPSduZXdDYW1wJ11cIikudmFsKCk7XG4gICAgdmFyIGNhbXBPYmogPSB7XG4gICAgICAgIFwibmFtZVwiOiBuZXdDYW1wTmFtZVxuICAgIH07XG4gICAgdGhpc0NhbXBhaWduID0ge1xuICAgICAgICBcImNhbXBhaWduXCI6IHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBuZXdDYW1wTmFtZVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhbXBhaWduT2JqLmNhbXBhaWducy5wdXNoKGNhbXBPYmopOyAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpXG5cbiAgICB3cml0ZUZpbGUoY2FtcGFpZ25MaXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhID09IFwiRmlsZSBXcml0dGVuXCIpIHtcbiAgICAgICAgICAgIGNyZWF0ZUNhbXBhaWduKG5ld0NhbXBOYW1lKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJkb25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU3BhY2UobmV3Q2FtcE5hbWUpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNDYW1wYWlnblBhdGggPSBjYW1wYWlnbkRpclBhdGggKyBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVGaWxlKHRoaXNDYW1wYWlnblBhdGggKyBcIi9jYW1wLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkodGhpc0NhbXBhaWduKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduc1wiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuXG5mdW5jdGlvbiBjcmVhdGVDYW1wYWlnbihjYW1wTmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciBkaXI7XG4gICAgICAgIHJlbW92ZVNwYWNlKGNhbXBOYW1lKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBkaXIgPSBjYW1wYWlnbkRpclBhdGggKyBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrRGlyRXhpc3QoZGlyKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURpcihkaXIpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBuZXdDYW1wYWlnbigpIHtcbiAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoaHRtbCkgPT4ge1xuICAgICAgICAgICAgdmFyIGFkZE9uSHRtbCA9IFwiPHRyPjx0ZD48aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nbmV3Q2FtcCcgLz48L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBzYXZlTmV3Q2FtcCc+U2F2ZTwvYnV0dG9uPjwvdGQ+PC90cj48L3RhYmxlPlwiO1xuICAgICAgICAgICAgdmFyIG5ld0h0bWwgPSBodG1sLnJlcGxhY2UoXCI8L3RhYmxlPlwiLCBhZGRPbkh0bWwpO1xuICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5odG1sKG5ld0h0bWwpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuLy9HZXRzIHRoZSBsaXN0IG9mIGNhbXBhaWduc1xuZnVuY3Rpb24gZ2V0Q2FtcGFpZ25zKHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRDYW1wYWlnbnMgXCIgKyBwYXRoKTtcbiAgICAgICAgICAgIGNoZWNrRmlsZUV4aXN0KHBhdGgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICByZWFkQUZpbGUocGF0aCkudGhlbigoY2FtcGFpZ25zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbnMgPSBKU09OLnBhcnNlKGNhbXBhaWducyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbk9iaiA9IGNhbXBhaWducztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FtcGFpZ25PYmopO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vL1B1dHMgdGhlIGxpc3Qgb2YgY2FtcGFpZ25zIG9uIHRoZSBjYW1wYWlnbiBzZWxlY3Rvci5cbmZ1bmN0aW9uIHNldENhbXBhaWducyhjYW1wYWlnbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNhbXBBcnJheSA9IGNhbXBhaWducy5jYW1wYWlnbnM7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IFwiPHRhYmxlPlwiO1xuICAgICAgICAgICAgY2FtcEFycmF5LmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShub2RlKSlcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUpXG4gICAgICAgICAgICAgICAgaHRtbCArPSBcIjx0cj48dGQ+XCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIjwvdGQ+PHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLWxvYWQ9J1wiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcExvYWQnPkxvYWQ8L2J1dHRvbj48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS1uYW1lPSdcIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiJyBkYXRhLWRlbGV0ZT0nXCIgKyBpICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcERlbGV0ZSc+RGVsZXRlPC9idXR0b24+PC90ZD48L3RyPlwiO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L3RhYmxlPlwiO1xuXG4gICAgICAgICAgICByZXNvbHZlKGh0bWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwialF1ZXJ5KFwiLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBqUXVlcnkodGhpcykucGFyZW50KCkudG9nZ2xlKCk7XG59KVxualF1ZXJ5KFwiLm1lbnUgYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3Blbk1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW9wZW5cIik7XG4gICAgalF1ZXJ5KFwiLlwiICsgb3Blbk1lKS50b2dnbGUoKTtcbiAgICBjbGVhclRvcCgpO1xuICAgIGpRdWVyeShcIi5cIiArIG9wZW5NZSkuYWRkQ2xhc3MoXCJvblRvcFwiKTtcbn0pO1xuIiwiIiwiZnVuY3Rpb24gcGFzc2l2ZVBlcmNlcHRpb24oKSB7XG4gICAgY2FsbEFiaWxpdHkoJ3dpcycpO1xuICAgIGpRdWVyeSgnI3Bhc3NQZXJjJykudmFsKHRoaXNBYmlsaXR5Qm9udXMrMTApO1xufVxuIiwidmFyIHByb2ZCID0galF1ZXJ5KCcjcHJvZkJvbnVzJykudmFsKCk7XG5zb21ldGhpbmdDbGV2ZXIoKTtcblxualF1ZXJ5KCcjcHJvZkJvbnVzJykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcbiAgICBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xuICAgIHNvbWV0aGluZ0NsZXZlcigpO1xufSk7XG5cbmZ1bmN0aW9uIHNvbWV0aGluZ0NsZXZlcigpIHtcbiAgICBqUXVlcnkoJy5pY29uLXByb2YnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFsnaWNvbi1wcm9mJywgJ2ljb24tcHJvZiBwcm9maWNpZW50JywgJ2ljb24tcHJvZiBleHBlcnRpc2UnXTtcbiAgICAgICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xuICAgICAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XG4gICAgICAgIHZhciBteVByb2YgPSBqUXVlcnkodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJy5wcm9mVmFsJyk7XG4gICAgICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIGN1cnJlbnRQb3MpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9mKG15UHJvZiwgbXlQcm9mU2tpbGxGbGFnKSB7XG4gICAgdmFyIHRoaXNBYmlsaXR5ID0galF1ZXJ5KG15UHJvZikuYXR0cignaWQnKTtcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251c0lEID0gJyMnICsgdGhpc0FiaWxpdHkgKyAnLUJvbnVzJztcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251cyA9IGpRdWVyeSgnLmFiaWxpdGllcyAnICsgdGhpc0FiaWxpdHlCb251c0lEKS50ZXh0KCk7XG4gICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMCkge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XG4gICAgfVxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMSkge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICsgcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XG4gICAgfVxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMikge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICogMiArIChwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKSk7XG4gICAgfVxuICAgIGpRdWVyeShteVByb2YpLnRleHQobmV3VmFsKTtcbn07XG5cblxualF1ZXJ5KCcuaWNvbi1wcm9mJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XG4gICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xuICAgIHZhciBjdXJyZW50UG9zID0galF1ZXJ5LmluQXJyYXkoY3VycmVudENsYXNzLCBjbGFzc2VzKTtcbiAgICB2YXIgbmV3UG9zID0gKChjdXJyZW50UG9zICsgMSkgJSBjbGFzc2VzLmxlbmd0aCk7XG4gICAgdmFyIG5ld0NsYXNzID0gY2xhc3Nlc1tuZXdQb3NdO1xuICAgIGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycsIG5ld0NsYXNzKTtcbiAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xuICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIG5ld1Bvcyk7XG59KTtcbiIsImFicnJldmlhdGVMYWJlbHMoKTtcbmpRdWVyeSgnLnRleHRTaXplICNmb250LXNpemUtdXAnKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRhcmdldCA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKTtcbiAgICB2YXIgY3VyclNpemUgPSBwYXJzZUludChqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJykuc3BsaXQoXCJweFwiKVswXSk7XG4gICAgLy8gY3VyclNpemUgPSBNYXRoLnJvdW5kKGN1cnJTaXplKTtcbiAgICB2YXIgbmV3U2l6ZSA9IGN1cnJTaXplKzM7XG4gICAgaWYgKG5ld1NpemUgPiAxNil7XG4gICAgICAgIG5ld1NpemUgPSAxNjtcbiAgICB9XG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xufSlcblxualF1ZXJ5KCcudGV4dFNpemUgI2ZvbnQtc2l6ZS1kb3duJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgIHZhciB0YXJnZXQgPSBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCk7XG4gICAgdmFyIGN1cnJTaXplID0gcGFyc2VJbnQoalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScpLnNwbGl0KFwicHhcIilbMF0pO1xuICAgIHZhciBuZXdTaXplID0gY3VyclNpemUtMztcbiAgICBpZiAobmV3U2l6ZSA8IDkpe1xuICAgICAgICBuZXdTaXplID0gOTtcbiAgICB9XG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xufSlcbiIsIi8vdGhlbWVzXG52YXIgYnV0dG9uT3B0aW9ucyA9IFsnZGVmYXVsdCcsICd3b3JuJywgJ2xpZ2h0JywgJ2JsYWNrJywgJ2dyYXknLCAncmVkJ107XG5qUXVlcnkoYnV0dG9uT3B0aW9ucykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgbXlTdHlsZSA9IHRoaXM7XG4gICAgdmFyIG15SWQgPSAnIycgKyBteVN0eWxlO1xuICAgIGpRdWVyeShteUlkKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVBdHRyKCdjbGFzcycpO1xuICAgICAgICBqUXVlcnkoJ2JvZHknKS5hZGRDbGFzcygndGhlbWUtJyArIG15U3R5bGUpO1xuICAgIH0pXG59KVxuIl19
=======
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImxvYWRCb29rcy5qcyIsImxvYWRDYW1wYWlnbi5qcyIsIm1lbnVCdXR0b25zLmpzIiwibnBjLmpzIiwicHJvZmljaWVuY2llcy5qcyIsInRoZW1lcy5qcyJdLCJuYW1lcyI6WyJmcyIsInJlcXVpcmUiLCJyaW1yYWYiLCJjYW1wYWlnbkxpc3RQYXRoIiwiYm9va1BhdGgiLCJjYW1wYWlnbkRpclBhdGgiLCJ0aGlzQ2FtcGFpZ25QYXRoIiwiYm9va3MiLCJucGMiLCJjYW1wYWlnbk9iaiIsInRoaXNDYW1wYWlnbiIsInNwYWNlQ2hhciIsImpRdWVyeSIsIm9uIiwicmVtb3ZlIiwicmVhZHkiLCJkcmFnZ2FibGUiLCJjb250YWlubWVudCIsInNjcm9sbCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicHJvcGVydHkiLCJ1bmRlZmluZWQiLCJkb2N1bWVudCIsInN0YXJ0QXBwIiwidGhlbiIsImRhdGEiLCJzZXRDYW1wYWlnbnMiLCJjYW1wTGlzdCIsInByZXBlbmQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldENhbXBhaWducyIsImVycm9yIiwicmVhZEFGaWxlIiwiZmlsZXBhdGgiLCJyZWFkRmlsZSIsImVyciIsIm1lc3NhZ2UiLCJ3cml0ZUZpbGUiLCJnZXREaXJDb250ZW50cyIsImRpciIsImZpbGVzIiwiZmlsZU5hbWVzIiwicmVhZGRpclN5bmMiLCJmb3JFYWNoIiwiZmlsZU5hbWUiLCJwdXNoIiwiY2hlY2tGaWxlRXhpc3QiLCJwYXRoIiwiYWNjZXNzIiwiRl9PSyIsImNoZWNrRGlyRXhpc3QiLCJleGlzdHNTeW5jIiwiY3JlYXRlRGlyIiwibWtkaXJTeW5jIiwicmVtb3ZlU3BhY2UiLCJzdHJpbmciLCJjbGVhblN0cmluZyIsInJlcGxhY2UiLCJhZGRTcGFjZSIsIlJlZ0V4cCIsInVwZGF0ZUFiaWxpdHlCb251cyIsIm15QWJpbGl0eSIsImFiaWxpdHkiLCJ2YWwiLCJtb2RpZmllciIsInBhcmVudCIsImNoaWxkcmVuIiwidGV4dCIsImlzTnVtZXJpYyIsIk1hdGgiLCJmbG9vciIsImVhY2giLCJzZWxlY3QiLCJ1cGRhdGVQcm9mIiwiYXR0ciIsImNsZWFyVG9wIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImxpc3RCb29rcyIsImNvbnNvbGUiLCJsb2ciLCJ0aXRsZUFycmF5IiwiaSIsImxlbmd0aCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIm5hbWUiLCJib29rIiwiYm9va1RpdGxlIiwiYm9va09iaiIsImRldGFpbHMiLCJuZXdDYW1wYWlnbiIsInRvTG9hZCIsInRoaXNOYW1lIiwidGhpc0RpciIsImFsZXJ0IiwiZGVsZXRlQ2FtcGFpZ24iLCJ0b0RlbGV0ZSIsInRvRGVsZXRlTmFtZSIsIm5ld0NhbXBOYW1lIiwiY2FtcE9iaiIsImNhbXBhaWducyIsImNyZWF0ZUNhbXBhaWduIiwiRXJyb3IiLCJuZXdBcnJheSIsInNwbGljZSIsInN0dWZmIiwiaHRtbCIsImNhbXBOYW1lIiwiYWRkT25IdG1sIiwibmV3SHRtbCIsImNhbXBBcnJheSIsIm5vZGUiLCJjbGljayIsInRvZ2dsZSIsIm9wZW5NZSIsInByb2ZCIiwic29tZXRoaW5nQ2xldmVyIiwiY2xhc3NlcyIsImN1cnJlbnRDbGFzcyIsImN1cnJlbnRQb3MiLCJpbkFycmF5IiwibXlQcm9mIiwibXlQcm9mU2tpbGxGbGFnIiwidGhpc0FiaWxpdHkiLCJ0aGlzQWJpbGl0eUJvbnVzSUQiLCJ0aGlzQWJpbGl0eUJvbnVzIiwibmV3VmFsIiwicGFyc2VJbnQiLCJuZXdQb3MiLCJuZXdDbGFzcyIsImJ1dHRvbk9wdGlvbnMiLCJteVN0eWxlIiwibXlJZCIsIiQiLCJyZW1vdmVBdHRyIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0U7O0FBQ0EsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsSUFBRCxDQUFoQjs7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R0FBRyxJQUFkO0FBQ0EsTUFBSUMsSUFBSSxHQUFHLE1BQU1ELE9BQWpCO0FBQ0E3SCxFQUFBQSxNQUFNLENBQUM4SCxJQUFELENBQU4sQ0FBYTdILEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsWUFBVztBQUNoQzhILElBQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUMsVUFBVixDQUFxQixPQUFyQjtBQUNBaEksSUFBQUEsTUFBTSxDQUFDLE1BQUQsQ0FBTixDQUFlcUUsUUFBZixDQUF3QixXQUFXd0QsT0FBbkM7QUFDSCxHQUhEO0FBSUgsQ0FQRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbiAgLy8gcmVtb3ZlIGxpbmUgYmVsb3cgd2hlbiB0ZXN0aW5nIGZyb250ZW5kXHJcbiAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuICB2YXIgcmltcmFmID0gcmVxdWlyZShcInJpbXJhZlwiKTtcclxuICBcclxuLy8gUGF0aHNcclxubGV0IGNhbXBhaWduTGlzdFBhdGggPSBcIi4vY2FtcGFpZ24uanNvblwiO1xyXG5sZXQgYm9va1BhdGggPSBcIi4vYm9va3MvXCI7XHJcbmxldCBjYW1wYWlnbkRpclBhdGggPSBcIi4vY2FtcGFpZ25zL1wiO1xyXG5sZXQgdGhpc0NhbXBhaWduUGF0aDtcclxuLy8vXHJcblxyXG4vL2dsb2RhbCBvYmplY3RzXHJcbnZhciBib29rcyA9IHt9O1xyXG52YXIgbnBjID0ge307XHJcbnZhciBjYW1wYWlnbk9iaiA9IHt9O1xyXG52YXIgdGhpc0NhbXBhaWduID0ge307XHJcbi8vL1xyXG5cclxuLy9nbG9iYWwgdmFyc1xyXG5sZXQgc3BhY2VDaGFyID0gXCJfX1wiO1xyXG4vLy9cclxuXHJcbi8vdGVtcCB0byBjb3NlIHRoZSBjYW1wYWlnbiBwaWNrZXIuXHJcbmpRdWVyeShcIi5jbG9zZUNhbXBXaW5kb3dcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gIGpRdWVyeShcIi5jYW1wYWlnbnNcIikucmVtb3ZlKCk7XHJcbn0pO1xyXG5cclxualF1ZXJ5KFwiZG9jdW1lbnRcIikucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gIGpRdWVyeShcIi5kcmFnXCIpLmRyYWdnYWJsZSh7XHJcbiAgICAgIGNvbnRhaW5tZW50OiBcIi5tYWluVmlld1wiLFxyXG4gICAgICBzY3JvbGw6IGZhbHNlXHJcbiAgfSk7XHJcblxyXG5cclxufSk7XHJcblxyXG5PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5ID0gZnVuY3Rpb24ocHJvcGVydHkpIHtcclxucmV0dXJuIHRoaXNbcHJvcGVydHldICE9PSB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5cclxuXHJcbiIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBzdGFydEFwcCgpLnRoZW4oKGRhdGEpPT57XHJcbiAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoY2FtcExpc3QpPT57XHJcbiAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikucHJlcGVuZChjYW1wTGlzdCk7XHJcbiAgICB9KVxyXG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY2FtcGFpZ25PYmopXHJcbiAgfSk7XHJcbiBcclxuICB9KVxyXG4gIFxyXG5cclxuICBmdW5jdGlvbiBzdGFydEFwcCgpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgIHRyeXtcclxuICAgICAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSk9PntcclxuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgfSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIHJlYWRBRmlsZShmaWxlcGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgJ3V0Zi04JywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoXCJBbiBlcnJvciBvY3VycmVkIHJlYWRpbmcgdGhlIGZpbGUgOlwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlRmlsZShmaWxlcGF0aCwgZGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiRmlsZSBXcml0dGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREaXJDb250ZW50cyhkaXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdmFyIGZpbGVzID0ge307XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lcyA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogZmlsZU5hbWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBmaWxlcyA9IHsgXCJmaWxlc1wiOiBmaWxlTmFtZXMgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZmlsZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0KHBhdGgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKCFwYXRoKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChcIlBhdGggaXMgaW52YWxpZCBcIiArIHBhdGgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLmFjY2VzcyhwYXRoLCBmcy5GX09LLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcInRydWVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0RpckV4aXN0KGRpcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEaXIoZGlyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKFwiZG9uZVwiKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTcGFjZShzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNsZWFuU3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccy9nLCBzcGFjZUNoYXIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3BhY2Uoc3RyaW5nKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgYWRkU3BhY2UgPSBuZXcgUmVnRXhwKHNwYWNlQ2hhciwgXCJnXCIpXHJcbiAgICAgICAgICAgIHZhciBjbGVhblN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGFkZFNwYWNlLCAvXFxzLyk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2xlYW5TdHJpbmcpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vL3dyaXRlIHRlc3RcclxuLy8gdmFyIHRlc3RPYmogID0gXCJUaGlzIGlzIGEgd3JpdGUgdGVzdFwiO1xyXG4vLyB3cml0ZUZpbGUoXCIuLi90ZXN0LnR4dFwiLCB0ZXN0T2JqKTtcclxuIiwiXHJcbmZ1bmN0aW9uIHVwZGF0ZUFiaWxpdHlCb251cyhteUFiaWxpdHkpIHtcclxuICAgIHZhciBhYmlsaXR5ID0galF1ZXJ5KG15QWJpbGl0eSkudmFsKCk7XHJcblxyXG4gICAgdmFyIG1vZGlmaWVyID0galF1ZXJ5KG15QWJpbGl0eSkucGFyZW50KCkuY2hpbGRyZW4oJy5tb2RpZmllci1idWJibGUnKS50ZXh0KCk7XHJcbiAgICBpZiAoIWpRdWVyeS5pc051bWVyaWMoYWJpbGl0eSkpIHtcclxuICAgICAgICBhYmlsaXR5ID0gMTtcclxuICAgICAgICBqUXVlcnkobXlBYmlsaXR5KS52YWwoYWJpbGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kaWZpZXIgPSBNYXRoLmZsb29yKChhYmlsaXR5IC0gMTApIC8gMik7XHJcbiAgICBqUXVlcnkobXlBYmlsaXR5KS5wYXJlbnQoKS5jaGlsZHJlbignLm1vZGlmaWVyLWJ1YmJsZScpLnRleHQobW9kaWZpZXIpO1xyXG59O1xyXG5cclxuXHJcbmpRdWVyeShcIi5hYmlsaXR5XCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB1cGRhdGVBYmlsaXR5Qm9udXMoalF1ZXJ5KHRoaXMpKTtcclxuXHJcbiAgICBqUXVlcnkodGhpcykub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBqUXVlcnkodGhpcykuc2VsZWN0KCk7XHJcbiAgICB9KVxyXG4gICAgalF1ZXJ5KHRoaXMpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdXBkYXRlQWJpbGl0eUJvbnVzKGpRdWVyeSh0aGlzKSk7XHJcbiAgICAgICAgdXBkYXRlUHJvZihqUXVlcnkoJy5zYXZpbmdUaHJvd3MgIycralF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJykpKTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwiZnVuY3Rpb24gY2xlYXJUb3AoKSB7XHJcbiAgICBqUXVlcnkoXCIuZHJhZ1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5yZW1vdmVDbGFzcyhcIm9uVG9wXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5qUXVlcnkoXCIuZHJhZ1wiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpIHtcclxuICAgIGNsZWFyVG9wKCk7XHJcbiAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoXCJvblRvcFwiKTtcclxufSk7XHJcbiIsIi8vIGdldERpckNvbnRlbnRzKFwiLi9ib29rc1wiKS50aGVuKGZ1bmN0aW9uIChmaWxlcykge1xyXG4vLyAgIC8vIGNvbnNvbGUubG9nKCk7XHJcbi8vICAgLy8gY29uc29sZS5sb2coSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWxlcy5maWxlc1swXS5uYW1lKSkpO1xyXG4vLyAgIGZvcih2YXIgaSA9IDA7IGkgPD0gZmlsZXMuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbi8vICAgICByZWFkQUZpbGUoXCIuL2Jvb2tzL1wiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWxlcy5maWxlc1tpXS5uYW1lKSkpLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcclxuLy8gICAgICAgdmFyIGJvb2tUaXRsZSA9IEpTT04ucGFyc2UoYm9vayk7XHJcbi8vICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpO1xyXG4vLyAgICAgICBqUXVlcnkoXCIuYm9va0xpc3RcIikuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiYm9va1wiPiR7Ym9va1RpdGxlLmRldGFpbHMubmFtZX08ZGl2PmApO1xyXG5cclxuLy8gICAgICAgIC8vbG9vayBmb3IgbnBjLCB0aGlzIHdpbGwgZXZlbnR1YWxseSBiZSBpdHMgb3duIGZ1bmN0aW9uXHJcbi8vICAgICAgIGlmKGJvb2tUaXRsZS5oYXNPd25Qcm9wZXJ0eShcIk5QQ1wiKSl7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coYm9va1RpdGxlLmRldGFpbHMubmFtZStcIiB0cnVlXCIpXHJcbi8vICAgICAgIH1lbHNle1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwibm9uZSBmb3VuZFwiKVxyXG4vLyAgICAgICB9XHJcblxyXG4vLyAgICAgfSk7XHJcblxyXG5cclxuXHJcbi8vICAgfVxyXG4vLyB9KTtcclxubGlzdEJvb2tzKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZGF0YSlcclxufSk7XHJcbmZ1bmN0aW9uIGxpc3RCb29rcygpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IHRpdGxlQXJyYXkgPVtdXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZ2V0RGlyQ29udGVudHMoYm9va1BhdGgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBib29rUGF0aCArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YS5maWxlc1tpXS5uYW1lKSlcclxuICAgICAgICAgICAgICAgICAgICByZWFkQUZpbGUocGF0aCkudGhlbihmdW5jdGlvbiAoYm9vaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYm9va1RpdGxlID0gSlNPTi5wYXJzZShib29rKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJvb2tPYmogPSB7XCJuYW1lXCI6Ym9va1RpdGxlLmRldGFpbHMubmFtZSwgXCJwYXRoXCI6cGF0aH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVBcnJheS5wdXNoKEpTT04uc3RyaW5naWZ5KGJvb2tPYmopKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShib29rVGl0bGUuZGV0YWlscy5uYW1lKSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGl0bGVBcnJheSlcclxuICAgICAgICAgICAgICAgIGJvb2tzID0ge1wiYm9va3NcIjp0aXRsZUFycmF5fTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoYm9va3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiLyoqXHJcbiAqIE5lZWQgdG8gYnVpbGQgbG9hZGluZyBhIGNhbXBhaWduXHJcbiAqIG5lZWQgbmV3IGNhbXBhaWduIHRvIG1ha2Ugc3VyZSBpdHMgbmFtZSBpcyB1bmlxdWUuXHJcbiAqL1xyXG5cclxuXHJcbmpRdWVyeShcIi5jYW1wQWRkXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgbmV3Q2FtcGFpZ24oKTtcclxufSk7XHJcblxyXG5qUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2FtcExvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRvTG9hZCA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1sb2FkXCIpO1xyXG4gICAgdmFyIHRoaXNOYW1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW5hbWVcIik7XHJcbiAgICB2YXIgdGhpc0RpcjtcclxuICAgIC8vICAgY29uc29sZS5sb2codG9Mb2FkTmFtZSlcclxuICAgIHJlbW92ZVNwYWNlKHRoaXNOYW1lKS50aGVuKChuYW1lKSA9PiB7XHJcbiAgICAgICAgdGhpc0RpciA9IGNhbXBhaWduRGlyUGF0aCArIG5hbWUgKyBcIi9jYW1wLmpzb25cIjtcclxuICAgICAgICBjaGVja0ZpbGVFeGlzdCh0aGlzRGlyKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGlzIGNhbXBhaWduIGRvZXNuJ3QgZXhpc3QuLi4gTm93IGRlbGV0aW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlQ2FtcGFpZ24odGhpc05hbWUsIHRvTG9hZClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlYWRBRmlsZSh0aGlzRGlyKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc0NhbXBhaWduID09IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vV2lsbCBuZWVkIHRvIGxvYWQgdXAgYWxsIHRoZSBib29rcyBhbmQgc3R1ZmYsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCB0aGUgb2JqXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gZm9yIG5vdyB3ZSB3aWxsIGp1c3QgZ28gdG8gdGhlIHVpXHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pXHJcblxyXG4vL3RoZSBkZWxldGUgYnV0dG9uXHJcbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5jYW1wRGVsZXRlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0b0RlbGV0ZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1kZWxldGVcIik7XHJcbiAgICB2YXIgdG9EZWxldGVOYW1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW5hbWVcIik7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XHJcbiAgICAvL3Nob3VsZCBhZGQgYSBhcmUgeW91IHN1cmUgcG9wdXBcclxuICAgIGRlbGV0ZUNhbXBhaWduKHRvRGVsZXRlTmFtZSwgdG9EZWxldGUpXHJcbn0pO1xyXG5cclxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLnNhdmVOZXdDYW1wXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBuZXdDYW1wTmFtZSA9IGpRdWVyeShcImlucHV0W25hbWU9J25ld0NhbXAnXVwiKS52YWwoKTtcclxuICAgIHZhciBjYW1wT2JqID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBuZXdDYW1wTmFtZVxyXG4gICAgfTtcclxuICAgIHRoaXNDYW1wYWlnbiA9IHtcclxuICAgICAgICBcImNhbXBhaWduXCI6IHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IG5ld0NhbXBOYW1lXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FtcGFpZ25PYmouY2FtcGFpZ25zLnB1c2goY2FtcE9iaik7IC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSlcclxuXHJcbiAgICB3cml0ZUZpbGUoY2FtcGFpZ25MaXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gXCJGaWxlIFdyaXR0ZW5cIikge1xyXG4gICAgICAgICAgICBjcmVhdGVDYW1wYWlnbihuZXdDYW1wTmFtZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJkb25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVTcGFjZShuZXdDYW1wTmFtZSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzQ2FtcGFpZ25QYXRoID0gY2FtcGFpZ25EaXJQYXRoICsgZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVGaWxlKHRoaXNDYW1wYWlnblBhdGggKyBcIi9jYW1wLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkodGhpc0NhbXBhaWduKSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlQ2FtcGFpZ24odG9EZWxldGVOYW1lLCB0b0RlbGV0ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB2YXIgbmV3QXJyYXkgPSBjYW1wYWlnbk9iai5jYW1wYWlnbnM7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3QXJyYXkpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJkZWxldCB0aGlzIG51bWJlciBcIiArIHRvRGVsZXRlICsgXCIgYW5kIHRoaXMgaXMgdGhlIG9iamVjdFwiICsgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmouY2FtcGFpZ25zKSk7XHJcbiAgICAgICAgbmV3QXJyYXkuc3BsaWNlKHRvRGVsZXRlLCAxKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpO1xyXG4gICAgICAgIHdyaXRlRmlsZShjYW1wYWlnbkxpc3RQYXRoLCBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJGaWxlIFdyaXR0ZW5cIikge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU3BhY2UodG9EZWxldGVOYW1lKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmltcmFmKGNhbXBhaWduRGlyUGF0aCArIGRhdGEsIChzdHVmZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdHVmZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q2FtcGFpZ25zKGNhbXBhaWduTGlzdFBhdGgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENhbXBhaWducyhkYXRhKS50aGVuKChjYW1wTGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikuaHRtbChjYW1wTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhbXBhaWduKGNhbXBOYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHZhciBkaXI7XHJcbiAgICAgICAgcmVtb3ZlU3BhY2UoY2FtcE5hbWUpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZGlyID0gY2FtcGFpZ25EaXJQYXRoICsgZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjaGVja0RpckV4aXN0KGRpcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRGlyKGRpcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXdDYW1wYWlnbigpIHtcclxuICAgIGdldENhbXBhaWducyhjYW1wYWlnbkxpc3RQYXRoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGh0bWwpID0+IHtcclxuICAgICAgICAgICAgdmFyIGFkZE9uSHRtbCA9IFwiPHRyPjx0ZD48aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nbmV3Q2FtcCcgLz48L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBzYXZlTmV3Q2FtcCc+U2F2ZTwvYnV0dG9uPjwvdGQ+PC90cj48L3RhYmxlPlwiO1xyXG4gICAgICAgICAgICB2YXIgbmV3SHRtbCA9IGh0bWwucmVwbGFjZShcIjwvdGFibGU+XCIsIGFkZE9uSHRtbCk7XHJcbiAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikuaHRtbChuZXdIdG1sKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbi8vR2V0cyB0aGUgbGlzdCBvZiBjYW1wYWlnbnNcclxuZnVuY3Rpb24gZ2V0Q2FtcGFpZ25zKHBhdGgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRDYW1wYWlnbnMgXCIgKyBwYXRoKTtcclxuICAgICAgICAgICAgY2hlY2tGaWxlRXhpc3QocGF0aCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRBRmlsZShwYXRoKS50aGVuKChjYW1wYWlnbnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FtcGFpZ25zID0gSlNPTi5wYXJzZShjYW1wYWlnbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbk9iaiA9IGNhbXBhaWducztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYW1wYWlnbk9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLy9QdXRzIHRoZSBsaXN0IG9mIGNhbXBhaWducyBvbiB0aGUgY2FtcGFpZ24gc2VsZWN0b3IuXHJcbmZ1bmN0aW9uIHNldENhbXBhaWducyhjYW1wYWlnbnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNhbXBBcnJheSA9IGNhbXBhaWducy5jYW1wYWlnbnM7XHJcbiAgICAgICAgICAgIHZhciBodG1sID0gXCI8dGFibGU+XCI7XHJcbiAgICAgICAgICAgIGNhbXBBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShub2RlKSlcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSlcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gXCI8dHI+PHRkPlwiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCI8L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS1uYW1lPSdcIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiJyBkYXRhLWxvYWQ9J1wiICsgaSArIFwiJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGNhbXBMb2FkJz5Mb2FkPC9idXR0b24+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtbmFtZT0nXCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIicgZGF0YS1kZWxldGU9J1wiICsgaSArIFwiJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGNhbXBEZWxldGUnPkRlbGV0ZTwvYnV0dG9uPjwvdGQ+PC90cj5cIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaHRtbCArPSBcIjwvdGFibGU+XCI7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKGh0bWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJqUXVlcnkoXCIuY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgalF1ZXJ5KHRoaXMpLnBhcmVudCgpLnRvZ2dsZSgpO1xyXG59KVxyXG5qUXVlcnkoXCIubWVudSBidXR0b25cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG9wZW5NZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1vcGVuXCIpO1xyXG4gICAgalF1ZXJ5KFwiLlwiICsgb3Blbk1lKS50b2dnbGUoKTtcclxuICAgIGNsZWFyVG9wKCk7XHJcbiAgICBqUXVlcnkoXCIuXCIgKyBvcGVuTWUpLmFkZENsYXNzKFwib25Ub3BcIik7XHJcbn0pOyIsIiIsInZhciBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xyXG5zb21ldGhpbmdDbGV2ZXIoKTtcclxuXHJcbmpRdWVyeSgnI3Byb2ZCb251cycpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xyXG4gICAgc29tZXRoaW5nQ2xldmVyKCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gc29tZXRoaW5nQ2xldmVyKCkge1xyXG4gICAgalF1ZXJ5KCcuaWNvbi1wcm9mJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2xhc3NlcyA9IFsnaWNvbi1wcm9mJywgJ2ljb24tcHJvZiBwcm9maWNpZW50JywgJ2ljb24tcHJvZiBleHBlcnRpc2UnXTtcclxuICAgICAgICB2YXIgY3VycmVudENsYXNzID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSBqUXVlcnkuaW5BcnJheShjdXJyZW50Q2xhc3MsIGNsYXNzZXMpO1xyXG4gICAgICAgIHZhciBteVByb2YgPSBqUXVlcnkodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJy5wcm9mVmFsJyk7XHJcbiAgICAgICAgdXBkYXRlUHJvZihqUXVlcnkobXlQcm9mKSwgY3VycmVudFBvcyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvZihteVByb2YsIG15UHJvZlNraWxsRmxhZykge1xyXG4gICAgdmFyIHRoaXNBYmlsaXR5ID0galF1ZXJ5KG15UHJvZikuYXR0cignaWQnKTtcclxuICAgIHZhciB0aGlzQWJpbGl0eUJvbnVzSUQgPSAnIycgKyB0aGlzQWJpbGl0eSArICctQm9udXMnO1xyXG4gICAgdmFyIHRoaXNBYmlsaXR5Qm9udXMgPSBqUXVlcnkoJy5hYmlsaXRpZXMgJyArIHRoaXNBYmlsaXR5Qm9udXNJRCkudGV4dCgpO1xyXG4gICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xyXG4gICAgaWYgKG15UHJvZlNraWxsRmxhZyA9PSAwKSB7XHJcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG15UHJvZlNraWxsRmxhZyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSArIHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG15UHJvZlNraWxsRmxhZyA9PSAyKSB7XHJcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSAqIDIgKyAocGFyc2VJbnQodGhpc0FiaWxpdHlCb251cykpO1xyXG4gICAgfVxyXG4gICAgalF1ZXJ5KG15UHJvZikudGV4dChuZXdWYWwpO1xyXG59O1xyXG5cclxuXHJcbmpRdWVyeSgnLmljb24tcHJvZicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XHJcbiAgICB2YXIgY3VycmVudENsYXNzID0galF1ZXJ5KHRoaXMpLmF0dHIoJ2NsYXNzJyk7XHJcbiAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XHJcbiAgICB2YXIgbmV3UG9zID0gKChjdXJyZW50UG9zICsgMSkgJSBjbGFzc2VzLmxlbmd0aCk7XHJcbiAgICB2YXIgbmV3Q2xhc3MgPSBjbGFzc2VzW25ld1Bvc107XHJcbiAgICBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnLCBuZXdDbGFzcyk7XHJcbiAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xyXG4gICAgdXBkYXRlUHJvZihqUXVlcnkobXlQcm9mKSwgbmV3UG9zKTtcclxufSk7XHJcbiIsIi8vdGhlbWVzXHJcbnZhciBidXR0b25PcHRpb25zID0gWydkZWZhdWx0JywgJ2JsYWNrJywgJ2dyYXknLCAnbGlnaHQnLCAncmVkJ107XHJcbmpRdWVyeShidXR0b25PcHRpb25zKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG15U3R5bGUgPSB0aGlzO1xyXG4gICAgdmFyIG15SWQgPSAnIycgKyBteVN0eWxlO1xyXG4gICAgalF1ZXJ5KG15SWQpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQXR0cignY2xhc3MnKTtcclxuICAgICAgICBqUXVlcnkoJ2JvZHknKS5hZGRDbGFzcygndGhlbWUtJyArIG15U3R5bGUpO1xyXG4gICAgfSlcclxufSlcclxuIl19
>>>>>>> 7d6b80e5f5d909539ab36dbc988c15968ef4b11a

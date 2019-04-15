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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImRlYXRoU2F2ZXMuanMiLCJsb2FkQm9va3MuanMiLCJsb2FkQ2FtcGFpZ24uanMiLCJtZW51QnV0dG9ucy5qcyIsIm5wYy5qcyIsInBhc3NpdmVQZXJjZXB0aW9uLmpzIiwicHJvZmljaWVuY2llcy5qcyIsInRleHRTaXplLmpzIiwidGhlbWVzLmpzIl0sIm5hbWVzIjpbImNhbXBhaWduTGlzdFBhdGgiLCJib29rUGF0aCIsImNhbXBhaWduRGlyUGF0aCIsInRoaXNDYW1wYWlnblBhdGgiLCJib29rcyIsIm5wYyIsImNhbXBhaWduT2JqIiwidGhpc0NhbXBhaWduIiwic3BhY2VDaGFyIiwialF1ZXJ5Iiwib24iLCJyZW1vdmUiLCJyZWFkeSIsImRyYWdnYWJsZSIsImNvbnRhaW5tZW50Iiwic2Nyb2xsIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwcm9wZXJ0eSIsInVuZGVmaW5lZCIsImRvY3VtZW50Iiwic3RhcnRBcHAiLCJ0aGVuIiwiZGF0YSIsInNldENhbXBhaWducyIsImNhbXBMaXN0IiwicHJlcGVuZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZ2V0Q2FtcGFpZ25zIiwiZXJyb3IiLCJyZWFkQUZpbGUiLCJmaWxlcGF0aCIsImZzIiwicmVhZEZpbGUiLCJlcnIiLCJtZXNzYWdlIiwid3JpdGVGaWxlIiwiZ2V0RGlyQ29udGVudHMiLCJkaXIiLCJmaWxlcyIsImZpbGVOYW1lcyIsInJlYWRkaXJTeW5jIiwiZm9yRWFjaCIsImZpbGVOYW1lIiwicHVzaCIsImNoZWNrRmlsZUV4aXN0IiwicGF0aCIsImFjY2VzcyIsIkZfT0siLCJjaGVja0RpckV4aXN0IiwiZXhpc3RzU3luYyIsImNyZWF0ZURpciIsIm1rZGlyU3luYyIsInJlbW92ZVNwYWNlIiwic3RyaW5nIiwiY2xlYW5TdHJpbmciLCJyZXBsYWNlIiwiYWRkU3BhY2UiLCJSZWdFeHAiLCJ1cGRhdGVBYmlsaXR5Qm9udXMiLCJteUFiaWxpdHkiLCJhYmlsaXR5IiwidmFsIiwibW9kaWZpZXIiLCJwYXJlbnQiLCJjaGlsZHJlbiIsInRleHQiLCJpc051bWVyaWMiLCJNYXRoIiwiZmxvb3IiLCJhdHRyIiwicGFzc2l2ZVBlcmNlcHRpb24iLCJlYWNoIiwic2VsZWN0IiwidXBkYXRlUHJvZiIsInRoaXNBYmlsaXR5IiwidGhpc0FiaWxpdHlCb251cyIsImNhbGxBYmlsaXR5IiwicGFyc2VJbnQiLCJhYnJyZXZpYXRlTGFiZWxzIiwiYWJicldvcmRzIiwibXlTaXplIiwiY3NzIiwic3BsaXQiLCJpbmRleCIsImxhYmVsIiwid29yZCIsImxvbmciLCJzaG9ydCIsImhpZGUiLCJnZXRMYWJlbCIsImh0bWwiLCJjb25zb2xlIiwibG9nIiwiY2xlYXJUb3AiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwidG9nZ2xlQ2xhc3MiLCJsaXN0Qm9va3MiLCJ0aXRsZUFycmF5IiwiaSIsImxlbmd0aCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIm5hbWUiLCJib29rIiwiYm9va1RpdGxlIiwiYm9va09iaiIsImRldGFpbHMiLCJuZXdDYW1wYWlnbiIsInRvTG9hZCIsInRoaXNOYW1lIiwidGhpc0RpciIsImFsZXJ0IiwiZGVsZXRlQ2FtcGFpZ24iLCJ0b0RlbGV0ZSIsInRvRGVsZXRlTmFtZSIsIm5ld0NhbXBOYW1lIiwiY2FtcE9iaiIsImNhbXBhaWducyIsImNyZWF0ZUNhbXBhaWduIiwiRXJyb3IiLCJuZXdBcnJheSIsInNwbGljZSIsInJpbXJhZiIsInN0dWZmIiwiY2FtcE5hbWUiLCJhZGRPbkh0bWwiLCJuZXdIdG1sIiwiY2FtcEFycmF5Iiwibm9kZSIsImNsaWNrIiwidG9nZ2xlIiwib3Blbk1lIiwicHJvZkIiLCJzb21ldGhpbmdDbGV2ZXIiLCJjbGFzc2VzIiwiY3VycmVudENsYXNzIiwiY3VycmVudFBvcyIsImluQXJyYXkiLCJteVByb2YiLCJteVByb2ZTa2lsbEZsYWciLCJ0aGlzQWJpbGl0eUJvbnVzSUQiLCJuZXdWYWwiLCJuZXdQb3MiLCJuZXdDbGFzcyIsInRhcmdldCIsImN1cnJTaXplIiwibmV3U2l6ZSIsIm5ld0VtcyIsImJ1dHRvbk9wdGlvbnMiLCJteVN0eWxlIiwibXlJZCIsIiQiLCJyZW1vdmVBdHRyIl0sIm1hcHBpbmdzIjoiQUFBQSxhLENBQ0U7QUFDQTtBQUNBO0FBRUY7O0FBQ0EsSUFBSUEsZ0JBQWdCLEdBQUcsaUJBQXZCO0FBQ0EsSUFBSUMsUUFBUSxHQUFHLFVBQWY7QUFDQSxJQUFJQyxlQUFlLEdBQUcsY0FBdEI7QUFDQSxJQUFJQyxnQkFBSixDLENBQ0E7QUFFQTs7QUFDQSxJQUFJQyxLQUFLLEdBQUcsRUFBWjtBQUNBLElBQUlDLEdBQUcsR0FBRyxFQUFWO0FBQ0EsSUFBSUMsV0FBVyxHQUFHLEVBQWxCO0FBQ0EsSUFBSUMsWUFBWSxHQUFHLEVBQW5CLEMsQ0FDQTtBQUVBOztBQUNBLElBQUlDLFNBQVMsR0FBRyxJQUFoQixDLENBQ0E7QUFFQTs7QUFDQUMsTUFBTSxDQUFDLGtCQUFELENBQU4sQ0FBMkJDLEVBQTNCLENBQThCLE9BQTlCLEVBQXVDLFlBQVU7QUFDL0NELEVBQUFBLE1BQU0sQ0FBQyxZQUFELENBQU4sQ0FBcUJFLE1BQXJCO0FBQ0QsQ0FGRDtBQUlBRixNQUFNLENBQUMsVUFBRCxDQUFOLENBQW1CRyxLQUFuQixDQUF5QixZQUFZO0FBQ25DSCxFQUFBQSxNQUFNLENBQUMsT0FBRCxDQUFOLENBQWdCSSxTQUFoQixDQUEwQjtBQUN0QkMsSUFBQUEsV0FBVyxFQUFFLFdBRFM7QUFFdEJDLElBQUFBLE1BQU0sRUFBRTtBQUZjLEdBQTFCO0FBTUQsQ0FQRDs7QUFTQUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCQyxjQUFqQixHQUFrQyxVQUFTQyxRQUFULEVB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QVosRUFBb0IsT0FBcEIsRUFBNkIsT0FBN0IsRUFBc0MsTUFBdEMsRUFBOEMsS0FBOUMsQ0FBcEI7QUFDQWpKLE1BQU0sQ0FBQ2lKLGFBQUQsQ0FBTixDQUFzQi9FLElBQXRCLENBQTJCLFlBQVc7QUFDbEMsTUFBSWdGLE9BQU8sR0FBRyxJQUFkO0FBQ0EsTUFBSUMsSUFBSSxHQUFHLE1BQU1ELE9BQWpCO0FBQ0FsSixFQUFBQSxNQUFNLENBQUNtSixJQUFELENBQU4sQ0FBYWxKLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsWUFBVztBQUNoQ21KLElBQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUMsVUFBVixDQUFxQixPQUFyQjtBQUNBckosSUFBQUEsTUFBTSxDQUFDLE1BQUQsQ0FBTixDQUFlMEYsUUFBZixDQUF3QixXQUFXd0QsT0FBbkM7QUFDSCxHQUhEO0FBSUgsQ0FQRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4gIC8vIHJlbW92ZSBsaW5lIGJlbG93IHdoZW4gdGVzdGluZyBmcm9udGVuZFxuICAvLyB2YXIgZnMgPSByZXF1aXJlKCdmcycpO1xuICAvLyB2YXIgcmltcmFmID0gcmVxdWlyZShcInJpbXJhZlwiKTtcblxuLy8gUGF0aHNcbmxldCBjYW1wYWlnbkxpc3RQYXRoID0gXCIuL2NhbXBhaWduLmpzb25cIjtcbmxldCBib29rUGF0aCA9IFwiLi9ib29rcy9cIjtcbmxldCBjYW1wYWlnbkRpclBhdGggPSBcIi4vY2FtcGFpZ25zL1wiO1xubGV0IHRoaXNDYW1wYWlnblBhdGg7XG4vLy9cblxuLy9nbG9kYWwgb2JqZWN0c1xudmFyIGJvb2tzID0ge307XG52YXIgbnBjID0ge307XG52YXIgY2FtcGFpZ25PYmogPSB7fTtcbnZhciB0aGlzQ2FtcGFpZ24gPSB7fTtcbi8vL1xuXG4vL2dsb2JhbCB2YXJzXG5sZXQgc3BhY2VDaGFyID0gXCJfX1wiO1xuLy8vXG5cbi8vdGVtcCB0byBjb3NlIHRoZSBjYW1wYWlnbiBwaWNrZXIuXG5qUXVlcnkoXCIuY2xvc2VDYW1wV2luZG93XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgalF1ZXJ5KFwiLmNhbXBhaWduc1wiKS5yZW1vdmUoKTtcbn0pO1xuXG5qUXVlcnkoXCJkb2N1bWVudFwiKS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIGpRdWVyeShcIi5kcmFnXCIpLmRyYWdnYWJsZSh7XG4gICAgICBjb250YWlubWVudDogXCIubWFpblZpZXdcIixcbiAgICAgIHNjcm9sbDogZmFsc2VcbiAgfSk7XG5cblxufSk7XG5cbk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgPSBmdW5jdGlvbihwcm9wZXJ0eSkge1xucmV0dXJuIHRoaXNbcHJvcGVydHldICE9PSB1bmRlZmluZWQ7XG59O1xuXG5cbi8vICAgICAgICAvL2xvb2sgZm9yIG5wYywgdGhpcyB3aWxsIGV2ZW50dWFsbHkgYmUgaXRzIG93biBmdW5jdGlvblxuLy8gICAgICAgaWYoYm9va1RpdGxlLmhhc093blByb3BlcnR5KFwiTlBDXCIpKXtcbi8vICAgICAgICAgY29uc29sZS5sb2coYm9va1RpdGxlLmRldGFpbHMubmFtZStcIiB0cnVlXCIpXG4vLyAgICAgICB9ZWxzZXtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJub25lIGZvdW5kXCIpXG4vLyAgICAgICB9XG5cbi8vICAgICB9KTtcblxuXG5cbi8vICAgfVxuLy8gfSk7XG4iLCJqUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIFxuICBzdGFydEFwcCgpLnRoZW4oKGRhdGEpPT57XG4gICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGNhbXBMaXN0KT0+e1xuICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5wcmVwZW5kKGNhbXBMaXN0KTtcbiAgICB9KVxuICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAvLyBjb25zb2xlLmxvZyhjYW1wYWlnbk9iailcbiAgfSk7XG4gXG4gIH0pXG4gIFxuXG4gIGZ1bmN0aW9uIHN0YXJ0QXBwKCl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICB0cnl7XG4gICAgICAgIGdldENhbXBhaWducyhjYW1wYWlnbkxpc3RQYXRoKS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgIH0gY2F0Y2ggKGVycm9yKXtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICB9IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiByZWFkQUZpbGUoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgJ3V0Zi04JywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIkFuIGVycm9yIG9jdXJyZWQgcmVhZGluZyB0aGUgZmlsZSA6XCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZnMud3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJGaWxlIFdyaXR0ZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGdldERpckNvbnRlbnRzKGRpcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciBmaWxlcyA9IHt9O1xuICAgICAgICB2YXIgZmlsZU5hbWVzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy5yZWFkZGlyU3luYyhkaXIpLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogZmlsZU5hbWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGZpbGVzID0geyBcImZpbGVzXCI6IGZpbGVOYW1lcyB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzb2x2ZShmaWxlcyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjaGVja0ZpbGVFeGlzdChwYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICByZWplY3QoXCJQYXRoIGlzIGludmFsaWQgXCIgKyBwYXRoKVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy5hY2Nlc3MocGF0aCwgZnMuRl9PSywgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcImZhbHNlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tEaXJFeGlzdChkaXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGlyKSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiZmFsc2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGlyKGRpcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGlyKTtcbiAgICAgICAgICAgIHJlc29sdmUoXCJkb25lXCIpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNsZWFuU3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccy9nLCBzcGFjZUNoYXIpO1xuICAgICAgICAgICAgcmVzb2x2ZShjbGVhblN0cmluZyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSlcblxuXG59XG5cbmZ1bmN0aW9uIGFkZFNwYWNlKHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBhZGRTcGFjZSA9IG5ldyBSZWdFeHAoc3BhY2VDaGFyLCBcImdcIilcbiAgICAgICAgICAgIHZhciBjbGVhblN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGFkZFNwYWNlLCAvXFxzLyk7XG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KVxufVxuLy93cml0ZSB0ZXN0XG4vLyB2YXIgdGVzdE9iaiAgPSBcIlRoaXMgaXMgYSB3cml0ZSB0ZXN0XCI7XG4vLyB3cml0ZUZpbGUoXCIuLi90ZXN0LnR4dFwiLCB0ZXN0T2JqKTtcbiIsIlxuZnVuY3Rpb24gdXBkYXRlQWJpbGl0eUJvbnVzKG15QWJpbGl0eSkge1xuICAgIHZhciBhYmlsaXR5ID0galF1ZXJ5KG15QWJpbGl0eSkudmFsKCk7XG5cbiAgICB2YXIgbW9kaWZpZXIgPSBqUXVlcnkobXlBYmlsaXR5KS5wYXJlbnQoKS5jaGlsZHJlbignLm1vZGlmaWVyLWJ1YmJsZScpLnRleHQoKTtcbiAgICBpZiAoIWpRdWVyeS5pc051bWVyaWMoYWJpbGl0eSkpIHtcbiAgICAgICAgYWJpbGl0eSA9IDE7XG4gICAgICAgIGpRdWVyeShteUFiaWxpdHkpLnZhbChhYmlsaXR5KTtcblxuXG4gICAgfVxuXG4gICAgbW9kaWZpZXIgPSBNYXRoLmZsb29yKChhYmlsaXR5IC0gMTApIC8gMik7XG4gICAgalF1ZXJ5KG15QWJpbGl0eSkucGFyZW50KCkuY2hpbGRyZW4oJy5tb2RpZmllci1idWJibGUnKS50ZXh0KG1vZGlmaWVyKTtcbiAgICBcbiAgICBpZiAobXlBYmlsaXR5LmF0dHIoJ2lkJykgPT0gJ3dpcycpIHtcbiAgICAgICAgcGFzc2l2ZVBlcmNlcHRpb24oKTtcbiAgICB9XG59O1xuXG5cbmpRdWVyeShcIi5hYmlsaXR5XCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdXBkYXRlQWJpbGl0eUJvbnVzKGpRdWVyeSh0aGlzKSk7XG5cbiAgICBqUXVlcnkodGhpcykub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnNlbGVjdCgpO1xuICAgIH0pXG4gICAgalF1ZXJ5KHRoaXMpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZUFiaWxpdHlCb251cyhqUXVlcnkodGhpcykpO1xuICAgICAgICB1cGRhdGVQcm9mKGpRdWVyeSgnLnNhdmluZ1Rocm93cyAjJytqUXVlcnkodGhpcykuYXR0cignaWQnKSkpO1xuICAgIH0pO1xufSk7XG4iLCJ2YXIgdGhpc0FiaWxpdHkgPSBcIlwiO1xudmFyIHRoaXNBYmlsaXR5Qm9udXMgPSBcIlwiO1xuXG5mdW5jdGlvbiBjYWxsQWJpbGl0eShhYmlsaXR5KSB7XG4gICAgdGhpc0FiaWxpdHkgPSBqUXVlcnkoJy5hYmlsaXR5LWJveCAjJythYmlsaXR5KS52YWwoKTtcbiAgICB0aGlzQWJpbGl0eUJvbnVzID0gcGFyc2VJbnQoalF1ZXJ5KCcuYWJpbGl0eS1ib3ggIycrYWJpbGl0eSsnLUJvbnVzJykudGV4dCgpKTtcbn1cbiIsImZ1bmN0aW9uIGFicnJldmlhdGVMYWJlbHMoKSB7XG4gICAgdmFyIGFiYnJXb3JkcyA9IFsnU3BlZWR8U1BEJywnSW5pdGlhdGl2ZXxJTklUJywnVGVtcG9yYXJ5fFRFTVAnLCdIaXQgUG9pbnRzfEhQJywnQXJtb3IgQ2xhc3N8QUMnLCdNYXhpbXVtfE1BWCcsJ0N1cnJlbnR8Q1JOVCcsJ0V4cGVyaWVuY2UgUG9pbnRzfFhQJ107XG4gICAgdmFyIG15U2l6ZSA9IGpRdWVyeSgnLmNoYXJTaGVldCcpLmNzcygnZm9udC1zaXplJyk7XG4gICAgbXlTaXplID0gcGFyc2VJbnQobXlTaXplLnNwbGl0KCdweCcpWzBdKTtcbiAgICAvLyBjb25zb2xlLmxvZyhteVNpemUpO1xuICAgIGlmIChteVNpemU8MTYpIHtcbiAgICAgICAgalF1ZXJ5KCdsYWJlbCcpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCBsYWJlbCkge1xuICAgICAgICAgICAgalF1ZXJ5KGFiYnJXb3JkcykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHdvcmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IHdvcmQuc3BsaXQoJ3wnKVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2hvcnQgPSB3b3JkLnNwbGl0KCd8JylbMV07XG4gICAgICAgICAgICAgICAgalF1ZXJ5KGxhYmVsKS50ZXh0KGZ1bmN0aW9uKGluZGV4LCB0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UobG9uZywgc2hvcnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgalF1ZXJ5KCdsYWJlbCcpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCBsYWJlbCkge1xuICAgICAgICAgICAgalF1ZXJ5KGFiYnJXb3JkcykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHdvcmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IHdvcmQuc3BsaXQoJ3wnKVswXTtcbiAgICAgICAgICAgICAgICB2YXIgc2hvcnQgPSB3b3JkLnNwbGl0KCd8JylbMV07XG4gICAgICAgICAgICAgICAgalF1ZXJ5KGxhYmVsKS50ZXh0KGZ1bmN0aW9uKGluZGV4LCB0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2Uoc2hvcnQsIGxvbmcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIiwialF1ZXJ5KCcjY2xhc3NNYW5hZ2VyJykuaGlkZSgpO1xuXG52YXIgZ2V0TGFiZWwgPSBqUXVlcnkoJy5jaGFyU2hlZXQgI2NsYXNzTW9yZScpLmh0bWwoKTtcbmNvbnNvbGUubG9nKGdldExhYmVsKTtcbmdldExhYmVsID0gZ2V0TGFiZWwrJzxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOnJpZ2h0OyBkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6MTBlbTtcIj5oZWxsbyE8L2Rpdj4nO1xuY29uc29sZS5sb2coZ2V0TGFiZWwpO1xualF1ZXJ5KCcuY2hhclNoZWV0ICNjbGFzc01vcmUnKS5odG1sKGdldExhYmVsKTtcblxuLy8gPHN2Zz48dXNlIHhsaW5rOmhyZWY9XCIjZG93bkFuZ2xlXCI+PC91c2U+PC9zdmc+XG4iLCJmdW5jdGlvbiBjbGVhclRvcCgpIHtcbiAgICBqUXVlcnkoXCIuZHJhZ1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkodGhpcykucmVtb3ZlQ2xhc3MoXCJvblRvcFwiKTtcbiAgICB9KTtcbn07XG5cbmpRdWVyeShcIi5kcmFnXCIpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVG9wKCk7XG4gICAgalF1ZXJ5KHRoaXMpLmFkZENsYXNzKFwib25Ub3BcIik7XG59KTtcbiIsImpRdWVyeShcIi5kZWF0aFNhdmVzXCIpLm9uKFwiY2xpY2tcIiwgXCIuaWNvblwiLCBmdW5jdGlvbigpIHtcbiAgalF1ZXJ5KHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbn0pO1xualF1ZXJ5KFwiLmRlYXRoU2F2ZXNcIikub24oXCJjbGlja1wiLCBcIi5yZWFwZXJcIiwgZnVuY3Rpb24oKSB7XG4gIGpRdWVyeShcIi5pY29uXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbn0pO1xuIiwiLy8gZ2V0RGlyQ29udGVudHMoXCIuL2Jvb2tzXCIpLnRoZW4oZnVuY3Rpb24gKGZpbGVzKSB7XG4vLyAgIC8vIGNvbnNvbGUubG9nKCk7XG4vLyAgIC8vIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsZXMuZmlsZXNbMF0ubmFtZSkpKTtcbi8vICAgZm9yKHZhciBpID0gMDsgaSA8PSBmaWxlcy5maWxlcy5sZW5ndGggLSAxOyBpKyspIHtcbi8vICAgICByZWFkQUZpbGUoXCIuL2Jvb2tzL1wiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWxlcy5maWxlc1tpXS5uYW1lKSkpLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcbi8vICAgICAgIHZhciBib29rVGl0bGUgPSBKU09OLnBhcnNlKGJvb2spO1xuLy8gICAgICAgY29uc29sZS5sb2coYm9va1RpdGxlLmRldGFpbHMubmFtZSk7XG4vLyAgICAgICBqUXVlcnkoXCIuYm9va0xpc3RcIikuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiYm9va1wiPiR7Ym9va1RpdGxlLmRldGFpbHMubmFtZX08ZGl2PmApO1xuXG4vLyAgICAgICAgLy9sb29rIGZvciBucGMsIHRoaXMgd2lsbCBldmVudHVhbGx5IGJlIGl0cyBvd24gZnVuY3Rpb25cbi8vICAgICAgIGlmKGJvb2tUaXRsZS5oYXNPd25Qcm9wZXJ0eShcIk5QQ1wiKSl7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUrXCIgdHJ1ZVwiKVxuLy8gICAgICAgfWVsc2V7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwibm9uZSBmb3VuZFwiKVxuLy8gICAgICAgfVxuXG4vLyAgICAgfSk7XG5cblxuXG4vLyAgIH1cbi8vIH0pO1xubGlzdEJvb2tzKCkudGhlbigoZGF0YSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpXG59KTtcbmZ1bmN0aW9uIGxpc3RCb29rcygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgdGl0bGVBcnJheSA9W11cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGdldERpckNvbnRlbnRzKGJvb2tQYXRoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBkYXRhLmZpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGJvb2tQYXRoICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLmZpbGVzW2ldLm5hbWUpKVxuICAgICAgICAgICAgICAgICAgICByZWFkQUZpbGUocGF0aCkudGhlbihmdW5jdGlvbiAoYm9vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJvb2tUaXRsZSA9IEpTT04ucGFyc2UoYm9vayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYm9va09iaiA9IHtcIm5hbWVcIjpib29rVGl0bGUuZGV0YWlscy5uYW1lLCBcInBhdGhcIjpwYXRofVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVBcnJheS5wdXNoKEpTT04uc3RyaW5naWZ5KGJvb2tPYmopKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShib29rVGl0bGUuZGV0YWlscy5uYW1lKSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aXRsZUFycmF5KVxuICAgICAgICAgICAgICAgIGJvb2tzID0ge1wiYm9va3NcIjp0aXRsZUFycmF5fTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJvb2tzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCIvKipcbiAqIE5lZWQgdG8gYnVpbGQgbG9hZGluZyBhIGNhbXBhaWduXG4gKiBuZWVkIG5ldyBjYW1wYWlnbiB0byBtYWtlIHN1cmUgaXRzIG5hbWUgaXMgdW5pcXVlLlxuICovXG5cblxualF1ZXJ5KFwiLmNhbXBBZGRcIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmV3Q2FtcGFpZ24oKTtcbn0pO1xuXG5qUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2FtcExvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b0xvYWQgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbG9hZFwiKTtcbiAgICB2YXIgdGhpc05hbWUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbmFtZVwiKTtcbiAgICB2YXIgdGhpc0RpcjtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRvTG9hZE5hbWUpXG4gICAgcmVtb3ZlU3BhY2UodGhpc05hbWUpLnRoZW4oKG5hbWUpID0+IHtcbiAgICAgICAgdGhpc0RpciA9IGNhbXBhaWduRGlyUGF0aCArIG5hbWUgKyBcIi9jYW1wLmpzb25cIjtcbiAgICAgICAgY2hlY2tGaWxlRXhpc3QodGhpc0RpcikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGlzIGNhbXBhaWduIGRvZXNuJ3QgZXhpc3QuLi4gTm93IGRlbGV0aW5nXCIpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUNhbXBhaWduKHRoaXNOYW1lLCB0b0xvYWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlYWRBRmlsZSh0aGlzRGlyKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNDYW1wYWlnbiA9PSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgLy9XaWxsIG5lZWQgdG8gbG9hZCB1cCBhbGwgdGhlIGJvb2tzIGFuZCBzdHVmZiwgXG4gICAgICAgICAgICAgICAgICAgIC8vYnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCB0aGUgb2JqXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIGZvciBub3cgd2Ugd2lsbCBqdXN0IGdvIHRvIHRoZSB1aVxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9KVxufSlcblxuLy90aGUgZGVsZXRlIGJ1dHRvblxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLmNhbXBEZWxldGVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b0RlbGV0ZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1kZWxldGVcIik7XG4gICAgdmFyIHRvRGVsZXRlTmFtZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1uYW1lXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcbiAgICAvL3Nob3VsZCBhZGQgYSBhcmUgeW91IHN1cmUgcG9wdXBcbiAgICBkZWxldGVDYW1wYWlnbih0b0RlbGV0ZU5hbWUsIHRvRGVsZXRlKVxufSk7XG5cbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5zYXZlTmV3Q2FtcFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5ld0NhbXBOYW1lID0galF1ZXJ5KFwiaW5wdXRbbmFtZT0nbmV3Q2FtcCddXCIpLnZhbCgpO1xuICAgIHZhciBjYW1wT2JqID0ge1xuICAgICAgICBcIm5hbWVcIjogbmV3Q2FtcE5hbWVcbiAgICB9O1xuICAgIHRoaXNDYW1wYWlnbiA9IHtcbiAgICAgICAgXCJjYW1wYWlnblwiOiB7XG4gICAgICAgICAgICBcIm5hbWVcIjogbmV3Q2FtcE5hbWVcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW1wYWlnbk9iai5jYW1wYWlnbnMucHVzaChjYW1wT2JqKTsgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKVxuXG4gICAgd3JpdGVGaWxlKGNhbXBhaWduTGlzdFBhdGgsIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSA9PSBcIkZpbGUgV3JpdHRlblwiKSB7XG4gICAgICAgICAgICBjcmVhdGVDYW1wYWlnbihuZXdDYW1wTmFtZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhID09IFwiZG9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVNwYWNlKG5ld0NhbXBOYW1lKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzQ2FtcGFpZ25QYXRoID0gY2FtcGFpZ25EaXJQYXRoICsgZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlRmlsZSh0aGlzQ2FtcGFpZ25QYXRoICsgXCIvY2FtcC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KHRoaXNDYW1wYWlnbikpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbnNcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGRlbGV0ZUNhbXBhaWduKHRvRGVsZXRlTmFtZSwgdG9EZWxldGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB2YXIgbmV3QXJyYXkgPSBjYW1wYWlnbk9iai5jYW1wYWlnbnM7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0FycmF5KVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlbGV0IHRoaXMgbnVtYmVyIFwiICsgdG9EZWxldGUgKyBcIiBhbmQgdGhpcyBpcyB0aGUgb2JqZWN0XCIgKyBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iai5jYW1wYWlnbnMpKTtcbiAgICAgICAgbmV3QXJyYXkuc3BsaWNlKHRvRGVsZXRlLCAxKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKTtcbiAgICAgICAgd3JpdGVGaWxlKGNhbXBhaWduTGlzdFBhdGgsIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJGaWxlIFdyaXR0ZW5cIikge1xuICAgICAgICAgICAgICAgIHJlbW92ZVNwYWNlKHRvRGVsZXRlTmFtZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByaW1yYWYoY2FtcGFpZ25EaXJQYXRoICsgZGF0YSwgKHN0dWZmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdHVmZilcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENhbXBhaWducyhjYW1wYWlnbkxpc3RQYXRoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGNhbXBMaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikuaHRtbChjYW1wTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYW1wYWlnbihjYW1wTmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciBkaXI7XG4gICAgICAgIHJlbW92ZVNwYWNlKGNhbXBOYW1lKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBkaXIgPSBjYW1wYWlnbkRpclBhdGggKyBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrRGlyRXhpc3QoZGlyKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURpcihkaXIpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBuZXdDYW1wYWlnbigpIHtcbiAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoaHRtbCkgPT4ge1xuICAgICAgICAgICAgdmFyIGFkZE9uSHRtbCA9IFwiPHRyPjx0ZD48aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nbmV3Q2FtcCcgLz48L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBzYXZlTmV3Q2FtcCc+U2F2ZTwvYnV0dG9uPjwvdGQ+PC90cj48L3RhYmxlPlwiO1xuICAgICAgICAgICAgdmFyIG5ld0h0bWwgPSBodG1sLnJlcGxhY2UoXCI8L3RhYmxlPlwiLCBhZGRPbkh0bWwpO1xuICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5odG1sKG5ld0h0bWwpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuLy9HZXRzIHRoZSBsaXN0IG9mIGNhbXBhaWduc1xuZnVuY3Rpb24gZ2V0Q2FtcGFpZ25zKHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRDYW1wYWlnbnMgXCIgKyBwYXRoKTtcbiAgICAgICAgICAgIGNoZWNrRmlsZUV4aXN0KHBhdGgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICByZWFkQUZpbGUocGF0aCkudGhlbigoY2FtcGFpZ25zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbnMgPSBKU09OLnBhcnNlKGNhbXBhaWducyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbk9iaiA9IGNhbXBhaWducztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FtcGFpZ25PYmopO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vL1B1dHMgdGhlIGxpc3Qgb2YgY2FtcGFpZ25zIG9uIHRoZSBjYW1wYWlnbiBzZWxlY3Rvci5cbmZ1bmN0aW9uIHNldENhbXBhaWducyhjYW1wYWlnbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNhbXBBcnJheSA9IGNhbXBhaWducy5jYW1wYWlnbnM7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IFwiPHRhYmxlPlwiO1xuICAgICAgICAgICAgY2FtcEFycmF5LmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShub2RlKSlcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUpXG4gICAgICAgICAgICAgICAgaHRtbCArPSBcIjx0cj48dGQ+XCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIjwvdGQ+PHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLW5hbWU9J1wiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCInIGRhdGEtbG9hZD0nXCIgKyBpICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcExvYWQnPkxvYWQ8L2J1dHRvbj48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS1uYW1lPSdcIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiJyBkYXRhLWRlbGV0ZT0nXCIgKyBpICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcERlbGV0ZSc+RGVsZXRlPC9idXR0b24+PC90ZD48L3RyPlwiO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L3RhYmxlPlwiO1xuXG4gICAgICAgICAgICByZXNvbHZlKGh0bWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwialF1ZXJ5KFwiLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBqUXVlcnkodGhpcykucGFyZW50KCkudG9nZ2xlKCk7XG59KVxualF1ZXJ5KFwiLm1lbnUgYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3Blbk1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW9wZW5cIik7XG4gICAgalF1ZXJ5KFwiLlwiICsgb3Blbk1lKS50b2dnbGUoKTtcbiAgICBjbGVhclRvcCgpO1xuICAgIGpRdWVyeShcIi5cIiArIG9wZW5NZSkuYWRkQ2xhc3MoXCJvblRvcFwiKTtcbn0pO1xuIiwiIiwiZnVuY3Rpb24gcGFzc2l2ZVBlcmNlcHRpb24oKSB7XG4gICAgY2FsbEFiaWxpdHkoJ3dpcycpO1xuICAgIGpRdWVyeSgnI3Bhc3NQZXJjJykudmFsKHRoaXNBYmlsaXR5Qm9udXMrMTApO1xufVxuIiwidmFyIHByb2ZCID0galF1ZXJ5KCcjcHJvZkJvbnVzJykudmFsKCk7XG5zb21ldGhpbmdDbGV2ZXIoKTtcblxualF1ZXJ5KCcjcHJvZkJvbnVzJykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcbiAgICBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xuICAgIHNvbWV0aGluZ0NsZXZlcigpO1xufSk7XG5cbmZ1bmN0aW9uIHNvbWV0aGluZ0NsZXZlcigpIHtcbiAgICBqUXVlcnkoJy5pY29uLXByb2YnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFsnaWNvbi1wcm9mJywgJ2ljb24tcHJvZiBwcm9maWNpZW50JywgJ2ljb24tcHJvZiBleHBlcnRpc2UnXTtcbiAgICAgICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xuICAgICAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XG4gICAgICAgIHZhciBteVByb2YgPSBqUXVlcnkodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJy5wcm9mVmFsJyk7XG4gICAgICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIGN1cnJlbnRQb3MpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9mKG15UHJvZiwgbXlQcm9mU2tpbGxGbGFnKSB7XG4gICAgdmFyIHRoaXNBYmlsaXR5ID0galF1ZXJ5KG15UHJvZikuYXR0cignaWQnKTtcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251c0lEID0gJyMnICsgdGhpc0FiaWxpdHkgKyAnLUJvbnVzJztcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251cyA9IGpRdWVyeSgnLmFiaWxpdGllcyAnICsgdGhpc0FiaWxpdHlCb251c0lEKS50ZXh0KCk7XG4gICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMCkge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XG4gICAgfVxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMSkge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICsgcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XG4gICAgfVxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMikge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICogMiArIChwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKSk7XG4gICAgfVxuICAgIGpRdWVyeShteVByb2YpLnRleHQobmV3VmFsKTtcbn07XG5cblxualF1ZXJ5KCcuaWNvbi1wcm9mJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XG4gICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xuICAgIHZhciBjdXJyZW50UG9zID0galF1ZXJ5LmluQXJyYXkoY3VycmVudENsYXNzLCBjbGFzc2VzKTtcbiAgICB2YXIgbmV3UG9zID0gKChjdXJyZW50UG9zICsgMSkgJSBjbGFzc2VzLmxlbmd0aCk7XG4gICAgdmFyIG5ld0NsYXNzID0gY2xhc3Nlc1tuZXdQb3NdO1xuICAgIGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycsIG5ld0NsYXNzKTtcbiAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xuICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIG5ld1Bvcyk7XG59KTtcbiIsImFicnJldmlhdGVMYWJlbHMoKTtcbmpRdWVyeSgnLnRleHRTaXplICNmb250LXNpemUtdXAnKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRhcmdldCA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKTtcbiAgICB2YXIgY3VyclNpemUgPSBwYXJzZUludChqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJykuc3BsaXQoXCJweFwiKVswXSk7XG4gICAgLy8gY3VyclNpemUgPSBNYXRoLnJvdW5kKGN1cnJTaXplKTtcbiAgICB2YXIgbmV3U2l6ZSA9IGN1cnJTaXplKzM7XG4gICAgaWYgKG5ld1NpemUgPiAxNil7XG4gICAgICAgIG5ld1NpemUgPSAxNjtcbiAgICB9XG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xufSlcblxualF1ZXJ5KCcudGV4dFNpemUgI2ZvbnQtc2l6ZS1kb3duJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgIHZhciB0YXJnZXQgPSBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCk7XG4gICAgdmFyIGN1cnJTaXplID0gcGFyc2VJbnQoalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScpLnNwbGl0KFwicHhcIilbMF0pO1xuICAgIHZhciBuZXdTaXplID0gY3VyclNpemUtMztcbiAgICBpZiAobmV3U2l6ZSA8IDkpe1xuICAgICAgICBuZXdTaXplID0gOTtcbiAgICB9XG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xufSlcbiIsIi8vdGhlbWVzXG52YXIgYnV0dG9uT3B0aW9ucyA9IFsnZGVmYXVsdCcsICd3b3JuJywgJ2xpZ2h0JywgJ2JsYWNrJywgJ2dyYXknLCAncmVkJ107XG5qUXVlcnkoYnV0dG9uT3B0aW9ucykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgbXlTdHlsZSA9IHRoaXM7XG4gICAgdmFyIG15SWQgPSAnIycgKyBteVN0eWxlO1xuICAgIGpRdWVyeShteUlkKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVBdHRyKCdjbGFzcycpO1xuICAgICAgICBqUXVlcnkoJ2JvZHknKS5hZGRDbGFzcygndGhlbWUtJyArIG15U3R5bGUpO1xuICAgIH0pXG59KVxuIl19

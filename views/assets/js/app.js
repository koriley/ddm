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

jQuery(document).ready(function(){
  
  startApp().then((data)=>{
    setCampaigns(data).then((campList)=>{
      jQuery(".campaignList").prepend(campList);
    })
    // console.log(JSON.stringify(data));
    // console.log(campaignObj)
  });
 
  })
  

  function startApp(){
    return new Promise((resolve, reject)=>{
      try{
        getCampaigns(campaignListPath).then((data)=>{
          resolve(data);
        });
        
      } catch (error){
        reject(error);
      }
    })
    
  }
'use strict';

function readAFile(filepath) {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("File Written");
            }
        });
    })
}

function getDirContents(dir) {
    return new Promise((resolve, reject) => {
        var files = {};
        var fileNames = [];
        try {
            fs.readdirSync(dir).forEach((fileName) => {
                fileNames.push({
                    "name": fileName
                })
                files = { "files": fileNames }

            });
            resolve(files);
        } catch (error) {
            reject(error);
        }

    })
}

function checkFileExist(path) {
    return new Promise((resolve, reject) => {
        if (!path) {
            reject("Path is invalid " + path)
        }
        try {
            fs.access(path, fs.F_OK, (err) => {
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
        try {
            fs.mkdirSync(dir);
            resolve("done");
        } catch (error) {
            reject(error);
        }
    });
}

function removeSpace(string) {
    return new Promise((resolve, reject) => {
        try {
            var cleanString = string.replace(/\s/g, spaceChar);
            resolve(cleanString);
        } catch (error) {
            reject(error);
        }
    })


}

function addSpace(string) {

    return new Promise((resolve, reject) => {
        try {
            var addSpace = new RegExp(spaceChar, "g")
            var cleanString = string.replace(addSpace, /\s/);
            resolve(cleanString);
        } catch (error) {
            reject(error);
        }
    })
}
//write test
// var testObj  = "This is a write test";
// writeFile("../test.txt", testObj);


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
};


jQuery(".ability").each(function() {
    updateAbilityBonus(jQuery(this));

    jQuery(this).on("focus", function() {
        jQuery(this).select();
    })
    jQuery(this).on("keyup", function() {
        updateAbilityBonus(jQuery(this));
        updateProf(jQuery('.savingThrows #'+jQuery(this).attr('id')));
    });
});

var thisAbility = "";
var thisAbilityBonus = "";

function callAbility(ability) {
    thisAbility = jQuery('.ability-box #'+ability).val();
    thisAbilityBonus = parseInt(jQuery('.ability-box #'+ability+'-Bonus').text());
}

function abrreviateLabels() {
    var abbrWords = ['Speed|SPD','Initiative|INIT','Temporary|TEMP','Hit Points|HP','Armor Class|AC','Maximum|MAX','Current|CRNT','Experience Points|XP'];
    var mySize = jQuery('.charSheet').css('font-size');
    mySize = parseInt(mySize.split('px')[0]);
    // console.log(mySize);
    if (mySize<16) {
        jQuery('label').each( function(index, label) {
            jQuery(abbrWords).each( function(index, word) {
                var long = word.split('|')[0];
                var short = word.split('|')[1];
                jQuery(label).text(function(index, text) {
                    return text.replace(long, short);
                });
            });
        })
    } else {
        jQuery('label').each( function(index, label) {
            jQuery(abbrWords).each( function(index, word) {
                var long = word.split('|')[0];
                var short = word.split('|')[1];
                jQuery(label).text(function(index, text) {
                    return text.replace(short, long);
                });
            });
        })
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

function clearTop() {
    jQuery(".drag").each(function() {
        jQuery(this).removeClass("onTop");
    });
};

jQuery(".drag").on("mousedown", function() {
    clearTop();
    jQuery(this).addClass("onTop");
});

jQuery(".deathSaves").on("click", ".icon", function() {
  jQuery(this).toggleClass('active');
});
jQuery(".deathSaves").on("click", ".reaper", function() {
  jQuery(".icon").removeClass('active');
});

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
let bookFileArray = [];
let bookTitleArray = [];
getBookFiles().then(async function (data) {
    for (var i = 0; i <= data.files.length - 1; i++) {
        var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name));
        bookFileArray.push(path);
    }
    await getBookTitles(bookFileArray).then((data) => {
        //console.log(data[0])
        for (var i = 0; i <= data.length - 1; i++) {
            bookTitleArray.push(data[i]);
        }
    });
    console.log(bookFileArray);
    console.log(bookTitleArray);
    let bookObjArray = [];
    let bookTPObj = {};
    for (var i = 0; i <= bookTitleArray.length - 1; i++) {
        bookTPObj = {
            "name": bookTitleArray[i],
            "path": bookFileArray[i]
        }
        bookObjArray.push(bookTPObj);
    }
    books = {
        "books": bookObjArray
    };
    listBooks().then((data)=>{
        // console.log(data)
        jQuery(".bookList").html(data);
    })
});



async function getBookTitles(bookArray) {
    // console.log(bookArray)
    return new Promise(async function (resolve, reject) {
        var titleArray = [];
        var count = 0;

        try {
            for (var i = 0; i <= bookArray.length - 1; i++) {
                count++; //console.log(bookArray[i])

                await readAFile(bookArray[i]).then(function (book) {
                    var bookTitle = JSON.parse(book);
                    // console.log(bookTitle.details.name);
                    // console.log(bookTitle.details.name)
                    titleArray.push(bookTitle.details.name)
                }); // console.log(file)
                if (i == bookArray.length - 1) {
                    // console.log("here")
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
        return new Promise((resolve, reject) => {
            try{
               let html = `<ul class="list-group">`;
                for(var i = 0; i<=books.books.length-1;i++){
                    html += `<li class="list-group-item bList"><div class="d-flex justify-content-start bName" data-path="${books.books[i].path}">${books.books[i].name}</div><div class="d-flex justify-content-end bButtons"><button type="button" data-path="${books.books[i].path}" class="btn btn-info load">Load</button><button type="button" class="btn btn-info unload">Unload</button></div></li>`
                    if(i == books.books.length-1){
                        html+="</ul>";
                        resolve(html);
                    }
                }
                // resolve(JSON.stringify(books));
            }catch(error){
                reject(error);
            }
        });
     }
/**
 * Need to build loading a campaign
 * need new campaign to make sure its name is unique.
 */


jQuery(".campAdd").on("click", () => {
    newCampaign();
});

jQuery(".campaignList").on("click", ".campLoad", function () {
    var toLoad = jQuery(this).attr("data-load");
    var thisName = jQuery(this).attr("data-name");
    var thisDir;
    //   console.log(toLoadName)
    removeSpace(thisName).then((name) => {
        thisDir = campaignDirPath + name + "/camp.json";
        checkFileExist(thisDir).then((data) => {
            if (data == "false") {
                alert("This campaign doesn't exist... Now deleting");
                deleteCampaign(thisName, toLoad)
            } else {
                readAFile(thisDir).then((data) => {
                    thisCampaign == JSON.parse(JSON.stringify(data));
                    //Will need to load up all the books and stuff, 
                    //but we need to figure out the obj
                    // so for now we will just go to the ui
                    jQuery(".campaigns").remove();
                })
            }
        })

    })
})

//the delete button
jQuery(".campaignList").on("click", ".campDelete", function () {
    var toDelete = jQuery(this).attr("data-delete");
    var toDeleteName = jQuery(this).attr("data-name");
    // console.log("clicked");
    //should add a are you sure popup
    deleteCampaign(toDeleteName, toDelete)
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
    }
    campaignObj.campaigns.push(campObj); // console.log(JSON.stringify(campaignObj))

    writeFile(campaignListPath, JSON.stringify(campaignObj)).then(function (data) {
        if (data == "File Written") {
            createCampaign(newCampName).then(function (data) {
                if (data == "done") {
                    removeSpace(newCampName).then((data) => {
                        thisCampaignPath = campaignDirPath + data;
                        writeFile(thisCampaignPath + "/camp.json", JSON.stringify(thisCampaign)).then(function () {
                            jQuery(".campaigns").remove();
                        });
                    })
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
    return new Promise((resolve, reject) => {
        var newArray = campaignObj.campaigns;
        // console.log(newArray)
        // console.log("delet this number " + toDelete + " and this is the object" + JSON.stringify(campaignObj.campaigns));
        newArray.splice(toDelete, 1);
        // console.log(JSON.stringify(campaignObj));
        writeFile(campaignListPath, JSON.stringify(campaignObj)).then((data) => {
            if (data == "File Written") {
                removeSpace(toDeleteName).then((data) => {
                    rimraf(campaignDirPath + data, (stuff) => {
                        // console.log(stuff)
                        getCampaigns(campaignListPath).then((data) => {
                            setCampaigns(data).then((campList) => {
                                jQuery(".campaignList").html(campList);
                            })
                        });
                    });
                });
            }
        })
    })
}

function createCampaign(campName) {
    return new Promise((resolve, reject) => {
        var dir;
        removeSpace(campName).then((data) => {
            dir = campaignDirPath + data;
        });
        try {
            checkDirExist(dir).then((data) => {
                if (data == "false") {
                    createDir(dir).then((data) => {
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
    getCampaigns(campaignListPath).then((data) => {
        setCampaigns(data).then((html) => {
            var addOnHtml = "<tr><td><input type='text' name='newCamp' /></td><td><button type='button' class='btn btn-primary saveNewCamp'>Save</button></td></tr></table>";
            var newHtml = html.replace("</table>", addOnHtml);
            jQuery(".campaignList").html(newHtml);
        })
    })

}

//Gets the list of campaigns
function getCampaigns(path) {
    return new Promise((resolve, reject) => {
        try {
            // console.log("getCampaigns " + path);
            checkFileExist(path).then((data) => {
                // console.log(data);
                if (data == "true") {
                    readAFile(path).then((campaigns) => {
                        campaigns = JSON.parse(campaigns);
                        campaignObj = campaigns;
                        resolve(campaignObj);
                    });
                }
            });
        } catch (error) {
            reject(error);
        }
    })
}

//Puts the list of campaigns on the campaign selector.
function setCampaigns(campaigns) {
    return new Promise((resolve, reject) => {
        try {
            var campArray = campaigns.campaigns;
            var html = "<table>";
            campArray.forEach(function (node, i) {
                // console.log(JSON.stringify(node))
                // console.log(campaigns.campaigns[i].name)
                html += "<tr><td>" + campaigns.campaigns[i].name + "</td><td><button type='button' data-name='" + campaigns.campaigns[i].name + "' data-load='" + i + "' class='btn btn-primary campLoad'>Load</button><button type='button' data-name='" + campaigns.campaigns[i].name + "' data-delete='" + i + "' class='btn btn-primary campDelete'>Delete</button></td></tr>";
            })
            html += "</table>";

            resolve(html);
        } catch (error) {
            reject(error);
        }
    });
}

jQuery(".close").click(function () {
    jQuery(this).parent().toggle();
})
jQuery(".menu button").click(function () {
    var openMe = jQuery(this).attr("data-open");
    jQuery("." + openMe).toggle();
    clearTop();
    jQuery("." + openMe).addClass("onTop");
});


function passivePerception() {
    callAbility('wis');
    jQuery('#passPerc').val(thisAbilityBonus+10);
}

var profB = jQuery('#profBonus').val();
somethingClever();

jQuery('#profBonus').on("keyup", function() {
    profB = jQuery('#profBonus').val();
    somethingClever();
});

function somethingClever() {
    jQuery('.icon-prof').each(function() {
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
        var newVal = parseInt(profB) * 2 + (parseInt(thisAbilityBonus));
    }
    jQuery(myProf).text(newVal);
};


jQuery('.icon-prof').click(function() {
    var classes = ['icon-prof', 'icon-prof proficient', 'icon-prof expertise'];
    var currentClass = jQuery(this).attr('class');
    var currentPos = jQuery.inArray(currentClass, classes);
    var newPos = ((currentPos + 1) % classes.length);
    var newClass = classes[newPos];
    jQuery(this).attr('class', newClass);
    var myProf = jQuery(this).parent().children('.profVal');
    updateProf(jQuery(myProf), newPos);
});

abrreviateLabels();
jQuery('.textSize #font-size-up').click( function() {
    var target = jQuery(this).parent().parent();
    var currSize = parseInt(jQuery(target).css('fontSize').split("px")[0]);
    // currSize = Math.round(currSize);
    var newSize = currSize+3;
    if (newSize > 16){
        newSize = 16;
    }
    var newEms = (newSize/16);
    jQuery(target).css('fontSize',newEms+'em');
    abrreviateLabels();
})

jQuery('.textSize #font-size-down').click( function() {
    var target = jQuery(this).parent().parent();
    var currSize = parseInt(jQuery(target).css('fontSize').split("px")[0]);
    var newSize = currSize-3;
    if (newSize < 9){
        newSize = 9;
    }
    var newEms = (newSize/16);
    jQuery(target).css('fontSize',newEms+'em');
    abrreviateLabels();
})

//themes
var buttonOptions = ['default', 'worn', 'light', 'black', 'gray', 'red'];
jQuery(buttonOptions).each(function() {
    var myStyle = this;
    var myId = '#' + myStyle;
    jQuery(myId).on("click", function() {
        $("body").removeAttr('class');
        jQuery('body').addClass('theme-' + myStyle);
    })
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImRlYXRoU2F2ZXMuanMiLCJsb2FkQm9va3MuanMiLCJsb2FkQ2FtcGFpZ24uanMiLCJtZW51QnV0dG9ucy5qcyIsIm5wYy5qcyIsInBhc3NpdmVQZXJjZXB0aW9uLmpzIiwicHJvZmljaWVuY2llcy5qcyIsInRleHRTaXplLmpzIiwidGhlbWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNUQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XHJcbiAgLy8gcmVtb3ZlIGxpbmUgYmVsb3cgd2hlbiB0ZXN0aW5nIGZyb250ZW5kXHJcbiAgdmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcclxuICB2YXIgcmltcmFmID0gcmVxdWlyZShcInJpbXJhZlwiKTtcclxuXHJcbi8vIFBhdGhzXHJcbmxldCBjYW1wYWlnbkxpc3RQYXRoID0gXCIuL2NhbXBhaWduLmpzb25cIjtcclxubGV0IGJvb2tQYXRoID0gXCIuL2Jvb2tzL1wiO1xyXG5sZXQgY2FtcGFpZ25EaXJQYXRoID0gXCIuL2NhbXBhaWducy9cIjtcclxubGV0IHRoaXNDYW1wYWlnblBhdGg7XHJcbi8vL1xyXG5cclxuLy9nbG9kYWwgb2JqZWN0c1xyXG52YXIgYm9va3MgPSB7fTtcclxudmFyIG5wYyA9IHt9O1xyXG52YXIgY2FtcGFpZ25PYmogPSB7fTtcclxudmFyIHRoaXNDYW1wYWlnbiA9IHt9O1xyXG4vLy9cclxuXHJcbi8vZ2xvYmFsIHZhcnNcclxubGV0IHNwYWNlQ2hhciA9IFwiX19cIjtcclxuLy8vXHJcblxyXG4vL3RlbXAgdG8gY29zZSB0aGUgY2FtcGFpZ24gcGlja2VyLlxyXG5qUXVlcnkoXCIuY2xvc2VDYW1wV2luZG93XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xyXG59KTtcclxuXHJcbmpRdWVyeShcImRvY3VtZW50XCIpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICBqUXVlcnkoXCIuZHJhZ1wiKS5kcmFnZ2FibGUoe1xyXG4gICAgICBjb250YWlubWVudDogXCIubWFpblZpZXdcIixcclxuICAgICAgc2Nyb2xsOiBmYWxzZVxyXG4gIH0pO1xyXG5cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KSB7XHJcbnJldHVybiB0aGlzW3Byb3BlcnR5XSAhPT0gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuXHJcbi8vICAgICAgICAvL2xvb2sgZm9yIG5wYywgdGhpcyB3aWxsIGV2ZW50dWFsbHkgYmUgaXRzIG93biBmdW5jdGlvblxyXG4vLyAgICAgICBpZihib29rVGl0bGUuaGFzT3duUHJvcGVydHkoXCJOUENcIikpe1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUrXCIgdHJ1ZVwiKVxyXG4vLyAgICAgICB9ZWxzZXtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm5vbmUgZm91bmRcIilcclxuLy8gICAgICAgfVxyXG5cclxuLy8gICAgIH0pO1xyXG5cclxuXHJcblxyXG4vLyAgIH1cclxuLy8gfSk7XHJcbiIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICBcclxuICBzdGFydEFwcCgpLnRoZW4oKGRhdGEpPT57XHJcbiAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoY2FtcExpc3QpPT57XHJcbiAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikucHJlcGVuZChjYW1wTGlzdCk7XHJcbiAgICB9KVxyXG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY2FtcGFpZ25PYmopXHJcbiAgfSk7XHJcbiBcclxuICB9KVxyXG4gIFxyXG5cclxuICBmdW5jdGlvbiBzdGFydEFwcCgpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgIHRyeXtcclxuICAgICAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSk9PntcclxuICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKXtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgfSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIHJlYWRBRmlsZShmaWxlcGF0aCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgJ3V0Zi04JywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoXCJBbiBlcnJvciBvY3VycmVkIHJlYWRpbmcgdGhlIGZpbGUgOlwiICsgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdyaXRlRmlsZShmaWxlcGF0aCwgZGF0YSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEsIChlcnIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwiRmlsZSBXcml0dGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREaXJDb250ZW50cyhkaXIpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdmFyIGZpbGVzID0ge307XHJcbiAgICAgICAgdmFyIGZpbGVOYW1lcyA9IFtdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogZmlsZU5hbWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBmaWxlcyA9IHsgXCJmaWxlc1wiOiBmaWxlTmFtZXMgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZmlsZXMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0KHBhdGgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKCFwYXRoKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChcIlBhdGggaXMgaW52YWxpZCBcIiArIHBhdGgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLmFjY2VzcyhwYXRoLCBmcy5GX09LLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcInRydWVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0RpckV4aXN0KGRpcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEaXIoZGlyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKFwiZG9uZVwiKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTcGFjZShzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNsZWFuU3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccy9nLCBzcGFjZUNoYXIpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3BhY2Uoc3RyaW5nKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgYWRkU3BhY2UgPSBuZXcgUmVnRXhwKHNwYWNlQ2hhciwgXCJnXCIpXHJcbiAgICAgICAgICAgIHZhciBjbGVhblN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGFkZFNwYWNlLCAvXFxzLyk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY2xlYW5TdHJpbmcpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG4vL3dyaXRlIHRlc3RcclxuLy8gdmFyIHRlc3RPYmogID0gXCJUaGlzIGlzIGEgd3JpdGUgdGVzdFwiO1xyXG4vLyB3cml0ZUZpbGUoXCIuLi90ZXN0LnR4dFwiLCB0ZXN0T2JqKTtcclxuIiwiXHJcbmZ1bmN0aW9uIHVwZGF0ZUFiaWxpdHlCb251cyhteUFiaWxpdHkpIHtcclxuICAgIHZhciBhYmlsaXR5ID0galF1ZXJ5KG15QWJpbGl0eSkudmFsKCk7XHJcblxyXG4gICAgdmFyIG1vZGlmaWVyID0galF1ZXJ5KG15QWJpbGl0eSkucGFyZW50KCkuY2hpbGRyZW4oJy5tb2RpZmllci1idWJibGUnKS50ZXh0KCk7XHJcbiAgICBpZiAoIWpRdWVyeS5pc051bWVyaWMoYWJpbGl0eSkpIHtcclxuICAgICAgICBhYmlsaXR5ID0gMTtcclxuICAgICAgICBqUXVlcnkobXlBYmlsaXR5KS52YWwoYWJpbGl0eSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2RpZmllciA9IE1hdGguZmxvb3IoKGFiaWxpdHkgLSAxMCkgLyAyKTtcclxuICAgIGpRdWVyeShteUFiaWxpdHkpLnBhcmVudCgpLmNoaWxkcmVuKCcubW9kaWZpZXItYnViYmxlJykudGV4dChtb2RpZmllcik7XHJcbiAgICBcclxuICAgIGlmIChteUFiaWxpdHkuYXR0cignaWQnKSA9PSAnd2lzJykge1xyXG4gICAgICAgIHBhc3NpdmVQZXJjZXB0aW9uKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxualF1ZXJ5KFwiLmFiaWxpdHlcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIHVwZGF0ZUFiaWxpdHlCb251cyhqUXVlcnkodGhpcykpO1xyXG5cclxuICAgIGpRdWVyeSh0aGlzKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5zZWxlY3QoKTtcclxuICAgIH0pXHJcbiAgICBqUXVlcnkodGhpcykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB1cGRhdGVBYmlsaXR5Qm9udXMoalF1ZXJ5KHRoaXMpKTtcclxuICAgICAgICB1cGRhdGVQcm9mKGpRdWVyeSgnLnNhdmluZ1Rocm93cyAjJytqUXVlcnkodGhpcykuYXR0cignaWQnKSkpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJ2YXIgdGhpc0FiaWxpdHkgPSBcIlwiO1xyXG52YXIgdGhpc0FiaWxpdHlCb251cyA9IFwiXCI7XHJcblxyXG5mdW5jdGlvbiBjYWxsQWJpbGl0eShhYmlsaXR5KSB7XHJcbiAgICB0aGlzQWJpbGl0eSA9IGpRdWVyeSgnLmFiaWxpdHktYm94ICMnK2FiaWxpdHkpLnZhbCgpO1xyXG4gICAgdGhpc0FiaWxpdHlCb251cyA9IHBhcnNlSW50KGpRdWVyeSgnLmFiaWxpdHktYm94ICMnK2FiaWxpdHkrJy1Cb251cycpLnRleHQoKSk7XHJcbn1cclxuIiwiZnVuY3Rpb24gYWJycmV2aWF0ZUxhYmVscygpIHtcclxuICAgIHZhciBhYmJyV29yZHMgPSBbJ1NwZWVkfFNQRCcsJ0luaXRpYXRpdmV8SU5JVCcsJ1RlbXBvcmFyeXxURU1QJywnSGl0IFBvaW50c3xIUCcsJ0FybW9yIENsYXNzfEFDJywnTWF4aW11bXxNQVgnLCdDdXJyZW50fENSTlQnLCdFeHBlcmllbmNlIFBvaW50c3xYUCddO1xyXG4gICAgdmFyIG15U2l6ZSA9IGpRdWVyeSgnLmNoYXJTaGVldCcpLmNzcygnZm9udC1zaXplJyk7XHJcbiAgICBteVNpemUgPSBwYXJzZUludChteVNpemUuc3BsaXQoJ3B4JylbMF0pO1xyXG4gICAgLy8gY29uc29sZS5sb2cobXlTaXplKTtcclxuICAgIGlmIChteVNpemU8MTYpIHtcclxuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XHJcbiAgICAgICAgICAgIGpRdWVyeShhYmJyV29yZHMpLmVhY2goIGZ1bmN0aW9uKGluZGV4LCB3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG9uZyA9IHdvcmQuc3BsaXQoJ3wnKVswXTtcclxuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcclxuICAgICAgICAgICAgICAgIGpRdWVyeShsYWJlbCkudGV4dChmdW5jdGlvbihpbmRleCwgdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UobG9uZywgc2hvcnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGpRdWVyeSgnbGFiZWwnKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgbGFiZWwpIHtcclxuICAgICAgICAgICAgalF1ZXJ5KGFiYnJXb3JkcykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIHdvcmQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3J0ID0gd29yZC5zcGxpdCgnfCcpWzFdO1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KGxhYmVsKS50ZXh0KGZ1bmN0aW9uKGluZGV4LCB0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShzaG9ydCwgbG9uZyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCIvLyBqUXVlcnkoJyNjbGFzc01hbmFnZXInKS5oaWRlKCk7XHJcbi8vXHJcbi8vIHZhciBnZXRMYWJlbCA9IGpRdWVyeSgnLmNoYXJTaGVldCAjY2xhc3NNb3JlJykuaHRtbCgpO1xyXG4vLyBjb25zb2xlLmxvZyhnZXRMYWJlbCk7XHJcbi8vIGdldExhYmVsID0gZ2V0TGFiZWwrJzxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOnJpZ2h0OyBkaXNwbGF5OmlubGluZS1ibG9jazsgd2lkdGg6MTBlbTtcIj5oZWxsbyE8L2Rpdj4nO1xyXG4vLyBjb25zb2xlLmxvZyhnZXRMYWJlbCk7XHJcbi8vIGpRdWVyeSgnLmNoYXJTaGVldCAjY2xhc3NNb3JlJykuaHRtbChnZXRMYWJlbCk7XHJcblxyXG4vLyA8c3ZnPjx1c2UgeGxpbms6aHJlZj1cIiNkb3duQW5nbGVcIj48L3VzZT48L3N2Zz5cclxuIiwiZnVuY3Rpb24gY2xlYXJUb3AoKSB7XHJcbiAgICBqUXVlcnkoXCIuZHJhZ1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGpRdWVyeSh0aGlzKS5yZW1vdmVDbGFzcyhcIm9uVG9wXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5qUXVlcnkoXCIuZHJhZ1wiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpIHtcclxuICAgIGNsZWFyVG9wKCk7XHJcbiAgICBqUXVlcnkodGhpcykuYWRkQ2xhc3MoXCJvblRvcFwiKTtcclxufSk7XHJcbiIsImpRdWVyeShcIi5kZWF0aFNhdmVzXCIpLm9uKFwiY2xpY2tcIiwgXCIuaWNvblwiLCBmdW5jdGlvbigpIHtcclxuICBqUXVlcnkodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxualF1ZXJ5KFwiLmRlYXRoU2F2ZXNcIikub24oXCJjbGlja1wiLCBcIi5yZWFwZXJcIiwgZnVuY3Rpb24oKSB7XHJcbiAgalF1ZXJ5KFwiLmljb25cIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxuIiwiLy8gZ2V0RGlyQ29udGVudHMoXCIuL2Jvb2tzXCIpLnRoZW4oZnVuY3Rpb24gKGZpbGVzKSB7XHJcbi8vICAgLy8gY29uc29sZS5sb2coKTtcclxuLy8gICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbGVzLmZpbGVzWzBdLm5hbWUpKSk7XHJcbi8vICAgZm9yKHZhciBpID0gMDsgaSA8PSBmaWxlcy5maWxlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuLy8gICAgIHJlYWRBRmlsZShcIi4vYm9va3MvXCIgKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbGVzLmZpbGVzW2ldLm5hbWUpKSkudGhlbihmdW5jdGlvbiAoYm9vaykge1xyXG4vLyAgICAgICB2YXIgYm9va1RpdGxlID0gSlNPTi5wYXJzZShib29rKTtcclxuLy8gICAgICAgY29uc29sZS5sb2coYm9va1RpdGxlLmRldGFpbHMubmFtZSk7XHJcbi8vICAgICAgIGpRdWVyeShcIi5ib29rTGlzdFwiKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJib29rXCI+JHtib29rVGl0bGUuZGV0YWlscy5uYW1lfTxkaXY+YCk7XHJcblxyXG4vLyAgICAgICAgLy9sb29rIGZvciBucGMsIHRoaXMgd2lsbCBldmVudHVhbGx5IGJlIGl0cyBvd24gZnVuY3Rpb25cclxuLy8gICAgICAgaWYoYm9va1RpdGxlLmhhc093blByb3BlcnR5KFwiTlBDXCIpKXtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lK1wiIHRydWVcIilcclxuLy8gICAgICAgfWVsc2V7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJub25lIGZvdW5kXCIpXHJcbi8vICAgICAgIH1cclxuXHJcbi8vICAgICB9KTtcclxuXHJcblxyXG5cclxuLy8gICB9XHJcbi8vIH0pO1xyXG5sZXQgYm9va0ZpbGVBcnJheSA9IFtdO1xyXG5sZXQgYm9va1RpdGxlQXJyYXkgPSBbXTtcclxuZ2V0Qm9va0ZpbGVzKCkudGhlbihhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZGF0YS5maWxlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICB2YXIgcGF0aCA9IGJvb2tQYXRoICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLmZpbGVzW2ldLm5hbWUpKTtcclxuICAgICAgICBib29rRmlsZUFycmF5LnB1c2gocGF0aCk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBnZXRCb29rVGl0bGVzKGJvb2tGaWxlQXJyYXkpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbMF0pXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZGF0YS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgYm9va1RpdGxlQXJyYXkucHVzaChkYXRhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKGJvb2tGaWxlQXJyYXkpO1xyXG4gICAgY29uc29sZS5sb2coYm9va1RpdGxlQXJyYXkpO1xyXG4gICAgbGV0IGJvb2tPYmpBcnJheSA9IFtdO1xyXG4gICAgbGV0IGJvb2tUUE9iaiA9IHt9O1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gYm9va1RpdGxlQXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgYm9va1RQT2JqID0ge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogYm9va1RpdGxlQXJyYXlbaV0sXHJcbiAgICAgICAgICAgIFwicGF0aFwiOiBib29rRmlsZUFycmF5W2ldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvb2tPYmpBcnJheS5wdXNoKGJvb2tUUE9iaik7XHJcbiAgICB9XHJcbiAgICBib29rcyA9IHtcclxuICAgICAgICBcImJvb2tzXCI6IGJvb2tPYmpBcnJheVxyXG4gICAgfTtcclxuICAgIGxpc3RCb29rcygpLnRoZW4oKGRhdGEpPT57XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICBqUXVlcnkoXCIuYm9va0xpc3RcIikuaHRtbChkYXRhKTtcclxuICAgIH0pXHJcbn0pO1xyXG5cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRCb29rVGl0bGVzKGJvb2tBcnJheSkge1xyXG4gICAgLy8gY29uc29sZS5sb2coYm9va0FycmF5KVxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB2YXIgdGl0bGVBcnJheSA9IFtdO1xyXG4gICAgICAgIHZhciBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGJvb2tBcnJheS5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7IC8vY29uc29sZS5sb2coYm9va0FycmF5W2ldKVxyXG5cclxuICAgICAgICAgICAgICAgIGF3YWl0IHJlYWRBRmlsZShib29rQXJyYXlbaV0pLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm9va1RpdGxlID0gSlNPTi5wYXJzZShib29rKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlQXJyYXkucHVzaChib29rVGl0bGUuZGV0YWlscy5uYW1lKVxyXG4gICAgICAgICAgICAgICAgfSk7IC8vIGNvbnNvbGUubG9nKGZpbGUpXHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBib29rQXJyYXkubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaGVyZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGl0bGVBcnJheSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Qm9va0ZpbGVzKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBnZXREaXJDb250ZW50cyhib29rUGF0aCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4gICAgZnVuY3Rpb24gbGlzdEJvb2tzKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgbGV0IGh0bWwgPSBgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPmA7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpPD1ib29rcy5ib29rcy5sZW5ndGgtMTtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gYDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBiTGlzdFwiPjxkaXYgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LXN0YXJ0IGJOYW1lXCIgZGF0YS1wYXRoPVwiJHtib29rcy5ib29rc1tpXS5wYXRofVwiPiR7Ym9va3MuYm9va3NbaV0ubmFtZX08L2Rpdj48ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmQgYkJ1dHRvbnNcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLXBhdGg9XCIke2Jvb2tzLmJvb2tzW2ldLnBhdGh9XCIgY2xhc3M9XCJidG4gYnRuLWluZm8gbG9hZFwiPkxvYWQ8L2J1dHRvbj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4taW5mbyB1bmxvYWRcIj5VbmxvYWQ8L2J1dHRvbj48L2Rpdj48L2xpPmBcclxuICAgICAgICAgICAgICAgICAgICBpZihpID09IGJvb2tzLmJvb2tzLmxlbmd0aC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCs9XCI8L3VsPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHJlc29sdmUoSlNPTi5zdHJpbmdpZnkoYm9va3MpKTtcclxuICAgICAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICB9IiwiLyoqXHJcbiAqIE5lZWQgdG8gYnVpbGQgbG9hZGluZyBhIGNhbXBhaWduXHJcbiAqIG5lZWQgbmV3IGNhbXBhaWduIHRvIG1ha2Ugc3VyZSBpdHMgbmFtZSBpcyB1bmlxdWUuXHJcbiAqL1xyXG5cclxuXHJcbmpRdWVyeShcIi5jYW1wQWRkXCIpLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgbmV3Q2FtcGFpZ24oKTtcclxufSk7XHJcblxyXG5qUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2FtcExvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRvTG9hZCA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1sb2FkXCIpO1xyXG4gICAgdmFyIHRoaXNOYW1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW5hbWVcIik7XHJcbiAgICB2YXIgdGhpc0RpcjtcclxuICAgIC8vICAgY29uc29sZS5sb2codG9Mb2FkTmFtZSlcclxuICAgIHJlbW92ZVNwYWNlKHRoaXNOYW1lKS50aGVuKChuYW1lKSA9PiB7XHJcbiAgICAgICAgdGhpc0RpciA9IGNhbXBhaWduRGlyUGF0aCArIG5hbWUgKyBcIi9jYW1wLmpzb25cIjtcclxuICAgICAgICBjaGVja0ZpbGVFeGlzdCh0aGlzRGlyKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhID09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGlzIGNhbXBhaWduIGRvZXNuJ3QgZXhpc3QuLi4gTm93IGRlbGV0aW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlQ2FtcGFpZ24odGhpc05hbWUsIHRvTG9hZClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlYWRBRmlsZSh0aGlzRGlyKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc0NhbXBhaWduID09IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vV2lsbCBuZWVkIHRvIGxvYWQgdXAgYWxsIHRoZSBib29rcyBhbmQgc3R1ZmYsIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCB0aGUgb2JqXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gZm9yIG5vdyB3ZSB3aWxsIGp1c3QgZ28gdG8gdGhlIHVpXHJcbiAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduc1wiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn0pXHJcblxyXG4vL3RoZSBkZWxldGUgYnV0dG9uXHJcbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5jYW1wRGVsZXRlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0b0RlbGV0ZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1kZWxldGVcIik7XHJcbiAgICB2YXIgdG9EZWxldGVOYW1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW5hbWVcIik7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XHJcbiAgICAvL3Nob3VsZCBhZGQgYSBhcmUgeW91IHN1cmUgcG9wdXBcclxuICAgIGRlbGV0ZUNhbXBhaWduKHRvRGVsZXRlTmFtZSwgdG9EZWxldGUpXHJcbn0pO1xyXG5cclxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLnNhdmVOZXdDYW1wXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBuZXdDYW1wTmFtZSA9IGpRdWVyeShcImlucHV0W25hbWU9J25ld0NhbXAnXVwiKS52YWwoKTtcclxuICAgIHZhciBjYW1wT2JqID0ge1xyXG4gICAgICAgIFwibmFtZVwiOiBuZXdDYW1wTmFtZVxyXG4gICAgfTtcclxuICAgIHRoaXNDYW1wYWlnbiA9IHtcclxuICAgICAgICBcImNhbXBhaWduXCI6IHtcclxuICAgICAgICAgICAgXCJuYW1lXCI6IG5ld0NhbXBOYW1lXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2FtcGFpZ25PYmouY2FtcGFpZ25zLnB1c2goY2FtcE9iaik7IC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSlcclxuXHJcbiAgICB3cml0ZUZpbGUoY2FtcGFpZ25MaXN0UGF0aCwgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gXCJGaWxlIFdyaXR0ZW5cIikge1xyXG4gICAgICAgICAgICBjcmVhdGVDYW1wYWlnbihuZXdDYW1wTmFtZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJkb25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVTcGFjZShuZXdDYW1wTmFtZSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzQ2FtcGFpZ25QYXRoID0gY2FtcGFpZ25EaXJQYXRoICsgZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVGaWxlKHRoaXNDYW1wYWlnblBhdGggKyBcIi9jYW1wLmpzb25cIiwgSlNPTi5zdHJpbmdpZnkodGhpc0NhbXBhaWduKSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlQ2FtcGFpZ24odG9EZWxldGVOYW1lLCB0b0RlbGV0ZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB2YXIgbmV3QXJyYXkgPSBjYW1wYWlnbk9iai5jYW1wYWlnbnM7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3QXJyYXkpXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJkZWxldCB0aGlzIG51bWJlciBcIiArIHRvRGVsZXRlICsgXCIgYW5kIHRoaXMgaXMgdGhlIG9iamVjdFwiICsgSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmouY2FtcGFpZ25zKSk7XHJcbiAgICAgICAgbmV3QXJyYXkuc3BsaWNlKHRvRGVsZXRlLCAxKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpO1xyXG4gICAgICAgIHdyaXRlRmlsZShjYW1wYWlnbkxpc3RQYXRoLCBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iaikpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJGaWxlIFdyaXR0ZW5cIikge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlU3BhY2UodG9EZWxldGVOYW1lKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmltcmFmKGNhbXBhaWduRGlyUGF0aCArIGRhdGEsIChzdHVmZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdHVmZilcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q2FtcGFpZ25zKGNhbXBhaWduTGlzdFBhdGgpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENhbXBhaWducyhkYXRhKS50aGVuKChjYW1wTGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikuaHRtbChjYW1wTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhbXBhaWduKGNhbXBOYW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHZhciBkaXI7XHJcbiAgICAgICAgcmVtb3ZlU3BhY2UoY2FtcE5hbWUpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgZGlyID0gY2FtcGFpZ25EaXJQYXRoICsgZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjaGVja0RpckV4aXN0KGRpcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRGlyKGRpcikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBuZXdDYW1wYWlnbigpIHtcclxuICAgIGdldENhbXBhaWducyhjYW1wYWlnbkxpc3RQYXRoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGh0bWwpID0+IHtcclxuICAgICAgICAgICAgdmFyIGFkZE9uSHRtbCA9IFwiPHRyPjx0ZD48aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nbmV3Q2FtcCcgLz48L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBzYXZlTmV3Q2FtcCc+U2F2ZTwvYnV0dG9uPjwvdGQ+PC90cj48L3RhYmxlPlwiO1xyXG4gICAgICAgICAgICB2YXIgbmV3SHRtbCA9IGh0bWwucmVwbGFjZShcIjwvdGFibGU+XCIsIGFkZE9uSHRtbCk7XHJcbiAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikuaHRtbChuZXdIdG1sKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbn1cclxuXHJcbi8vR2V0cyB0aGUgbGlzdCBvZiBjYW1wYWlnbnNcclxuZnVuY3Rpb24gZ2V0Q2FtcGFpZ25zKHBhdGgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRDYW1wYWlnbnMgXCIgKyBwYXRoKTtcclxuICAgICAgICAgICAgY2hlY2tGaWxlRXhpc3QocGF0aCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRBRmlsZShwYXRoKS50aGVuKChjYW1wYWlnbnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FtcGFpZ25zID0gSlNPTi5wYXJzZShjYW1wYWlnbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbk9iaiA9IGNhbXBhaWducztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjYW1wYWlnbk9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLy9QdXRzIHRoZSBsaXN0IG9mIGNhbXBhaWducyBvbiB0aGUgY2FtcGFpZ24gc2VsZWN0b3IuXHJcbmZ1bmN0aW9uIHNldENhbXBhaWducyhjYW1wYWlnbnMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdmFyIGNhbXBBcnJheSA9IGNhbXBhaWducy5jYW1wYWlnbnM7XHJcbiAgICAgICAgICAgIHZhciBodG1sID0gXCI8dGFibGU+XCI7XHJcbiAgICAgICAgICAgIGNhbXBBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShub2RlKSlcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSlcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gXCI8dHI+PHRkPlwiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCI8L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS1uYW1lPSdcIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiJyBkYXRhLWxvYWQ9J1wiICsgaSArIFwiJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGNhbXBMb2FkJz5Mb2FkPC9idXR0b24+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtbmFtZT0nXCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIicgZGF0YS1kZWxldGU9J1wiICsgaSArIFwiJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGNhbXBEZWxldGUnPkRlbGV0ZTwvYnV0dG9uPjwvdGQ+PC90cj5cIjtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaHRtbCArPSBcIjwvdGFibGU+XCI7XHJcblxyXG4gICAgICAgICAgICByZXNvbHZlKGh0bWwpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwialF1ZXJ5KFwiLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGpRdWVyeSh0aGlzKS5wYXJlbnQoKS50b2dnbGUoKTtcclxufSlcclxualF1ZXJ5KFwiLm1lbnUgYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBvcGVuTWUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtb3BlblwiKTtcclxuICAgIGpRdWVyeShcIi5cIiArIG9wZW5NZSkudG9nZ2xlKCk7XHJcbiAgICBjbGVhclRvcCgpO1xyXG4gICAgalF1ZXJ5KFwiLlwiICsgb3Blbk1lKS5hZGRDbGFzcyhcIm9uVG9wXCIpO1xyXG59KTtcclxuIiwiIiwiZnVuY3Rpb24gcGFzc2l2ZVBlcmNlcHRpb24oKSB7XHJcbiAgICBjYWxsQWJpbGl0eSgnd2lzJyk7XHJcbiAgICBqUXVlcnkoJyNwYXNzUGVyYycpLnZhbCh0aGlzQWJpbGl0eUJvbnVzKzEwKTtcclxufVxyXG4iLCJ2YXIgcHJvZkIgPSBqUXVlcnkoJyNwcm9mQm9udXMnKS52YWwoKTtcclxuc29tZXRoaW5nQ2xldmVyKCk7XHJcblxyXG5qUXVlcnkoJyNwcm9mQm9udXMnKS5vbihcImtleXVwXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgcHJvZkIgPSBqUXVlcnkoJyNwcm9mQm9udXMnKS52YWwoKTtcclxuICAgIHNvbWV0aGluZ0NsZXZlcigpO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNvbWV0aGluZ0NsZXZlcigpIHtcclxuICAgIGpRdWVyeSgnLmljb24tcHJvZicpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XHJcbiAgICAgICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xyXG4gICAgICAgIHZhciBjdXJyZW50UG9zID0galF1ZXJ5LmluQXJyYXkoY3VycmVudENsYXNzLCBjbGFzc2VzKTtcclxuICAgICAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xyXG4gICAgICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIGN1cnJlbnRQb3MpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2YobXlQcm9mLCBteVByb2ZTa2lsbEZsYWcpIHtcclxuICAgIHZhciB0aGlzQWJpbGl0eSA9IGpRdWVyeShteVByb2YpLmF0dHIoJ2lkJyk7XHJcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251c0lEID0gJyMnICsgdGhpc0FiaWxpdHkgKyAnLUJvbnVzJztcclxuICAgIHZhciB0aGlzQWJpbGl0eUJvbnVzID0galF1ZXJ5KCcuYWJpbGl0aWVzICcgKyB0aGlzQWJpbGl0eUJvbnVzSUQpLnRleHQoKTtcclxuICAgIHZhciBuZXdWYWwgPSBwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKTtcclxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMCkge1xyXG4gICAgICAgIHZhciBuZXdWYWwgPSBwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKTtcclxuICAgIH1cclxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMSkge1xyXG4gICAgICAgIHZhciBuZXdWYWwgPSBwYXJzZUludChwcm9mQikgKyBwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKTtcclxuICAgIH1cclxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMikge1xyXG4gICAgICAgIHZhciBuZXdWYWwgPSBwYXJzZUludChwcm9mQikgKiAyICsgKHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpKTtcclxuICAgIH1cclxuICAgIGpRdWVyeShteVByb2YpLnRleHQobmV3VmFsKTtcclxufTtcclxuXHJcblxyXG5qUXVlcnkoJy5pY29uLXByb2YnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAgIHZhciBjbGFzc2VzID0gWydpY29uLXByb2YnLCAnaWNvbi1wcm9mIHByb2ZpY2llbnQnLCAnaWNvbi1wcm9mIGV4cGVydGlzZSddO1xyXG4gICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xyXG4gICAgdmFyIGN1cnJlbnRQb3MgPSBqUXVlcnkuaW5BcnJheShjdXJyZW50Q2xhc3MsIGNsYXNzZXMpO1xyXG4gICAgdmFyIG5ld1BvcyA9ICgoY3VycmVudFBvcyArIDEpICUgY2xhc3Nlcy5sZW5ndGgpO1xyXG4gICAgdmFyIG5ld0NsYXNzID0gY2xhc3Nlc1tuZXdQb3NdO1xyXG4gICAgalF1ZXJ5KHRoaXMpLmF0dHIoJ2NsYXNzJywgbmV3Q2xhc3MpO1xyXG4gICAgdmFyIG15UHJvZiA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignLnByb2ZWYWwnKTtcclxuICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIG5ld1Bvcyk7XHJcbn0pO1xyXG4iLCJhYnJyZXZpYXRlTGFiZWxzKCk7XHJcbmpRdWVyeSgnLnRleHRTaXplICNmb250LXNpemUtdXAnKS5jbGljayggZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xyXG4gICAgdmFyIGN1cnJTaXplID0gcGFyc2VJbnQoalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScpLnNwbGl0KFwicHhcIilbMF0pO1xyXG4gICAgLy8gY3VyclNpemUgPSBNYXRoLnJvdW5kKGN1cnJTaXplKTtcclxuICAgIHZhciBuZXdTaXplID0gY3VyclNpemUrMztcclxuICAgIGlmIChuZXdTaXplID4gMTYpe1xyXG4gICAgICAgIG5ld1NpemUgPSAxNjtcclxuICAgIH1cclxuICAgIHZhciBuZXdFbXMgPSAobmV3U2l6ZS8xNik7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XHJcbiAgICBhYnJyZXZpYXRlTGFiZWxzKCk7XHJcbn0pXHJcblxyXG5qUXVlcnkoJy50ZXh0U2l6ZSAjZm9udC1zaXplLWRvd24nKS5jbGljayggZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xyXG4gICAgdmFyIGN1cnJTaXplID0gcGFyc2VJbnQoalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScpLnNwbGl0KFwicHhcIilbMF0pO1xyXG4gICAgdmFyIG5ld1NpemUgPSBjdXJyU2l6ZS0zO1xyXG4gICAgaWYgKG5ld1NpemUgPCA5KXtcclxuICAgICAgICBuZXdTaXplID0gOTtcclxuICAgIH1cclxuICAgIHZhciBuZXdFbXMgPSAobmV3U2l6ZS8xNik7XHJcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XHJcbiAgICBhYnJyZXZpYXRlTGFiZWxzKCk7XHJcbn0pXHJcbiIsIi8vdGhlbWVzXHJcbnZhciBidXR0b25PcHRpb25zID0gWydkZWZhdWx0JywgJ3dvcm4nLCAnbGlnaHQnLCAnYmxhY2snLCAnZ3JheScsICdyZWQnXTtcclxualF1ZXJ5KGJ1dHRvbk9wdGlvbnMpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbXlTdHlsZSA9IHRoaXM7XHJcbiAgICB2YXIgbXlJZCA9ICcjJyArIG15U3R5bGU7XHJcbiAgICBqUXVlcnkobXlJZCkub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVBdHRyKCdjbGFzcycpO1xyXG4gICAgICAgIGpRdWVyeSgnYm9keScpLmFkZENsYXNzKCd0aGVtZS0nICsgbXlTdHlsZSk7XHJcbiAgICB9KVxyXG59KVxyXG4iXX0=

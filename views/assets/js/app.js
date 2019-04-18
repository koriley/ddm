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
        "books": [bookObjArray]
    };
    console.log(JSON.stringify(books.books))
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
    // function listBooks() {
    //     return new Promise((resolve, reject) => {
    //         let titleArray = [];
    //         let pathArray = [];
    //         try {
    //             getDirContents(bookPath).then((data) => {
    //                 // console.log(JSON.stringify(data))

    //                 for (var i = 0; i <= data.files.length - 1; i++) {
    //                     var path = bookPath + JSON.parse(JSON.stringify(data.files[i].name))
    //                     pathArray.push(path)
    //                     readAFile(path).then(function (book) {
    //                         var bookTitle = JSON.parse(book);
    //                         // var bookObj = {"name":bookTitle.details.name, "path":path}
    //                         titleArray.push(bookTitle.details.name);
    //                         // console.log(JSON.stringify(bookTitle.details.name))
    //                     })
    //                     // .then((data)=>{
    //                     //     // console.log(titleArray)
    //                     //     // console.log(titleArray.length)
    //                     //     // for(var i=0;i<=titleArray.length -1; i++){
    //                     //     //     console.log("stuff");
    //                     //     // }
    //                     //     titleArray.forEach(function(i,key){
    //                     //         console.log("This is i "+i+", this is key?"+key)
    //                     //     })
    //                     // });
    //                 }
    //                 // console.log(titleArray)
    //                 // books = {"books":titleArray};
    //                 // resolve(books);

    //             })

    //         } catch (error) {
    //             reject(error)
    //         }
    //     });
    // }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAyX3N0YXJ0dXAuanMiLCIwM19pby5qcyIsImFiaWxpdHlCb251cy5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImRlYXRoU2F2ZXMuanMiLCJsb2FkQm9va3MuanMiLCJsb2FkQ2FtcGFpZ24uanMiLCJtZW51QnV0dG9ucy5qcyIsIm5wYy5qcyIsInBhc3NpdmVQZXJjZXB0aW9uLmpzIiwicHJvZmljaWVuY2llcy5qcyIsInRleHRTaXplLmpzIiwidGhlbWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbiAgLy8gcmVtb3ZlIGxpbmUgYmVsb3cgd2hlbiB0ZXN0aW5nIGZyb250ZW5kXG4gIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gIHZhciByaW1yYWYgPSByZXF1aXJlKFwicmltcmFmXCIpO1xuXG4vLyBQYXRoc1xubGV0IGNhbXBhaWduTGlzdFBhdGggPSBcIi4vY2FtcGFpZ24uanNvblwiO1xubGV0IGJvb2tQYXRoID0gXCIuL2Jvb2tzL1wiO1xubGV0IGNhbXBhaWduRGlyUGF0aCA9IFwiLi9jYW1wYWlnbnMvXCI7XG5sZXQgdGhpc0NhbXBhaWduUGF0aDtcbi8vL1xuXG4vL2dsb2RhbCBvYmplY3RzXG52YXIgYm9va3MgPSB7fTtcbnZhciBucGMgPSB7fTtcbnZhciBjYW1wYWlnbk9iaiA9IHt9O1xudmFyIHRoaXNDYW1wYWlnbiA9IHt9O1xuLy8vXG5cbi8vZ2xvYmFsIHZhcnNcbmxldCBzcGFjZUNoYXIgPSBcIl9fXCI7XG4vLy9cblxuLy90ZW1wIHRvIGNvc2UgdGhlIGNhbXBhaWduIHBpY2tlci5cbmpRdWVyeShcIi5jbG9zZUNhbXBXaW5kb3dcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xufSk7XG5cbmpRdWVyeShcImRvY3VtZW50XCIpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgalF1ZXJ5KFwiLmRyYWdcIikuZHJhZ2dhYmxlKHtcbiAgICAgIGNvbnRhaW5tZW50OiBcIi5tYWluVmlld1wiLFxuICAgICAgc2Nyb2xsOiBmYWxzZVxuICB9KTtcblxuXG59KTtcblxuT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKHByb3BlcnR5KSB7XG5yZXR1cm4gdGhpc1twcm9wZXJ0eV0gIT09IHVuZGVmaW5lZDtcbn07XG5cblxuLy8gICAgICAgIC8vbG9vayBmb3IgbnBjLCB0aGlzIHdpbGwgZXZlbnR1YWxseSBiZSBpdHMgb3duIGZ1bmN0aW9uXG4vLyAgICAgICBpZihib29rVGl0bGUuaGFzT3duUHJvcGVydHkoXCJOUENcIikpe1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lK1wiIHRydWVcIilcbi8vICAgICAgIH1lbHNle1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm5vbmUgZm91bmRcIilcbi8vICAgICAgIH1cblxuLy8gICAgIH0pO1xuXG5cblxuLy8gICB9XG4vLyB9KTtcbiIsImpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgXG4gIHN0YXJ0QXBwKCkudGhlbigoZGF0YSk9PntcbiAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoY2FtcExpc3QpPT57XG4gICAgICBqUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLnByZXBlbmQoY2FtcExpc3QpO1xuICAgIH0pXG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNhbXBhaWduT2JqKVxuICB9KTtcbiBcbiAgfSlcbiAgXG5cbiAgZnVuY3Rpb24gc3RhcnRBcHAoKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgIHRyeXtcbiAgICAgICAgZ2V0Q2FtcGFpZ25zKGNhbXBhaWduTGlzdFBhdGgpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH0pXG4gICAgXG4gIH0iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHJlYWRBRmlsZShmaWxlcGF0aCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZzLnJlYWRGaWxlKGZpbGVwYXRoLCAndXRmLTgnLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiQW4gZXJyb3Igb2N1cnJlZCByZWFkaW5nIHRoZSBmaWxlIDpcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy53cml0ZUZpbGUoZmlsZXBhdGgsIGRhdGEsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcIkZpbGUgV3JpdHRlblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RGlyQ29udGVudHMoZGlyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmFyIGZpbGVzID0ge307XG4gICAgICAgIHZhciBmaWxlTmFtZXMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBmaWxlTmFtZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmlsZXMgPSB7IFwiZmlsZXNcIjogZmlsZU5hbWVzIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXNvbHZlKGZpbGVzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cblxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0KHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgIHJlamVjdChcIlBhdGggaXMgaW52YWxpZCBcIiArIHBhdGgpXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLmFjY2VzcyhwYXRoLCBmcy5GX09LLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoXCJlcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja0RpckV4aXN0KGRpcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcInRydWVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJmYWxzZVwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEaXIoZGlyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkaXIpO1xuICAgICAgICAgICAgcmVzb2x2ZShcImRvbmVcIik7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY2xlYW5TdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxzL2csIHNwYWNlQ2hhcik7XG4gICAgICAgICAgICByZXNvbHZlKGNsZWFuU3RyaW5nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KVxuXG5cbn1cblxuZnVuY3Rpb24gYWRkU3BhY2Uoc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGFkZFNwYWNlID0gbmV3IFJlZ0V4cChzcGFjZUNoYXIsIFwiZ1wiKVxuICAgICAgICAgICAgdmFyIGNsZWFuU3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoYWRkU3BhY2UsIC9cXHMvKTtcbiAgICAgICAgICAgIHJlc29sdmUoY2xlYW5TdHJpbmcpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG4vL3dyaXRlIHRlc3Rcbi8vIHZhciB0ZXN0T2JqICA9IFwiVGhpcyBpcyBhIHdyaXRlIHRlc3RcIjtcbi8vIHdyaXRlRmlsZShcIi4uL3Rlc3QudHh0XCIsIHRlc3RPYmopO1xuIiwiXG5mdW5jdGlvbiB1cGRhdGVBYmlsaXR5Qm9udXMobXlBYmlsaXR5KSB7XG4gICAgdmFyIGFiaWxpdHkgPSBqUXVlcnkobXlBYmlsaXR5KS52YWwoKTtcblxuICAgIHZhciBtb2RpZmllciA9IGpRdWVyeShteUFiaWxpdHkpLnBhcmVudCgpLmNoaWxkcmVuKCcubW9kaWZpZXItYnViYmxlJykudGV4dCgpO1xuICAgIGlmICghalF1ZXJ5LmlzTnVtZXJpYyhhYmlsaXR5KSkge1xuICAgICAgICBhYmlsaXR5ID0gMTtcbiAgICAgICAgalF1ZXJ5KG15QWJpbGl0eSkudmFsKGFiaWxpdHkpO1xuXG5cbiAgICB9XG5cbiAgICBtb2RpZmllciA9IE1hdGguZmxvb3IoKGFiaWxpdHkgLSAxMCkgLyAyKTtcbiAgICBqUXVlcnkobXlBYmlsaXR5KS5wYXJlbnQoKS5jaGlsZHJlbignLm1vZGlmaWVyLWJ1YmJsZScpLnRleHQobW9kaWZpZXIpO1xuICAgIFxuICAgIGlmIChteUFiaWxpdHkuYXR0cignaWQnKSA9PSAnd2lzJykge1xuICAgICAgICBwYXNzaXZlUGVyY2VwdGlvbigpO1xuICAgIH1cbn07XG5cblxualF1ZXJ5KFwiLmFiaWxpdHlcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICB1cGRhdGVBYmlsaXR5Qm9udXMoalF1ZXJ5KHRoaXMpKTtcblxuICAgIGpRdWVyeSh0aGlzKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkodGhpcykuc2VsZWN0KCk7XG4gICAgfSlcbiAgICBqUXVlcnkodGhpcykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlQWJpbGl0eUJvbnVzKGpRdWVyeSh0aGlzKSk7XG4gICAgICAgIHVwZGF0ZVByb2YoalF1ZXJ5KCcuc2F2aW5nVGhyb3dzICMnK2pRdWVyeSh0aGlzKS5hdHRyKCdpZCcpKSk7XG4gICAgfSk7XG59KTtcbiIsInZhciB0aGlzQWJpbGl0eSA9IFwiXCI7XG52YXIgdGhpc0FiaWxpdHlCb251cyA9IFwiXCI7XG5cbmZ1bmN0aW9uIGNhbGxBYmlsaXR5KGFiaWxpdHkpIHtcbiAgICB0aGlzQWJpbGl0eSA9IGpRdWVyeSgnLmFiaWxpdHktYm94ICMnK2FiaWxpdHkpLnZhbCgpO1xuICAgIHRoaXNBYmlsaXR5Qm9udXMgPSBwYXJzZUludChqUXVlcnkoJy5hYmlsaXR5LWJveCAjJythYmlsaXR5KyctQm9udXMnKS50ZXh0KCkpO1xufVxuIiwiZnVuY3Rpb24gYWJycmV2aWF0ZUxhYmVscygpIHtcbiAgICB2YXIgYWJicldvcmRzID0gWydTcGVlZHxTUEQnLCdJbml0aWF0aXZlfElOSVQnLCdUZW1wb3Jhcnl8VEVNUCcsJ0hpdCBQb2ludHN8SFAnLCdBcm1vciBDbGFzc3xBQycsJ01heGltdW18TUFYJywnQ3VycmVudHxDUk5UJywnRXhwZXJpZW5jZSBQb2ludHN8WFAnXTtcbiAgICB2YXIgbXlTaXplID0galF1ZXJ5KCcuY2hhclNoZWV0JykuY3NzKCdmb250LXNpemUnKTtcbiAgICBteVNpemUgPSBwYXJzZUludChteVNpemUuc3BsaXQoJ3B4JylbMF0pO1xuICAgIC8vIGNvbnNvbGUubG9nKG15U2l6ZSk7XG4gICAgaWYgKG15U2l6ZTwxNikge1xuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XG4gICAgICAgICAgICBqUXVlcnkoYWJicldvcmRzKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgd29yZCkge1xuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcbiAgICAgICAgICAgICAgICBqUXVlcnkobGFiZWwpLnRleHQoZnVuY3Rpb24oaW5kZXgsIHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShsb25nLCBzaG9ydCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XG4gICAgICAgICAgICBqUXVlcnkoYWJicldvcmRzKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgd29yZCkge1xuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcbiAgICAgICAgICAgICAgICBqUXVlcnkobGFiZWwpLnRleHQoZnVuY3Rpb24oaW5kZXgsIHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShzaG9ydCwgbG9uZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG59XG4iLCIvLyBqUXVlcnkoJyNjbGFzc01hbmFnZXInKS5oaWRlKCk7XG4vL1xuLy8gdmFyIGdldExhYmVsID0galF1ZXJ5KCcuY2hhclNoZWV0ICNjbGFzc01vcmUnKS5odG1sKCk7XG4vLyBjb25zb2xlLmxvZyhnZXRMYWJlbCk7XG4vLyBnZXRMYWJlbCA9IGdldExhYmVsKyc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpyaWdodDsgZGlzcGxheTppbmxpbmUtYmxvY2s7IHdpZHRoOjEwZW07XCI+aGVsbG8hPC9kaXY+Jztcbi8vIGNvbnNvbGUubG9nKGdldExhYmVsKTtcbi8vIGpRdWVyeSgnLmNoYXJTaGVldCAjY2xhc3NNb3JlJykuaHRtbChnZXRMYWJlbCk7XG5cbi8vIDxzdmc+PHVzZSB4bGluazpocmVmPVwiI2Rvd25BbmdsZVwiPjwvdXNlPjwvc3ZnPlxuIiwiZnVuY3Rpb24gY2xlYXJUb3AoKSB7XG4gICAgalF1ZXJ5KFwiLmRyYWdcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnJlbW92ZUNsYXNzKFwib25Ub3BcIik7XG4gICAgfSk7XG59O1xuXG5qUXVlcnkoXCIuZHJhZ1wiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpIHtcbiAgICBjbGVhclRvcCgpO1xuICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcyhcIm9uVG9wXCIpO1xufSk7XG4iLCJqUXVlcnkoXCIuZGVhdGhTYXZlc1wiKS5vbihcImNsaWNrXCIsIFwiLmljb25cIiwgZnVuY3Rpb24oKSB7XG4gIGpRdWVyeSh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG59KTtcbmpRdWVyeShcIi5kZWF0aFNhdmVzXCIpLm9uKFwiY2xpY2tcIiwgXCIucmVhcGVyXCIsIGZ1bmN0aW9uKCkge1xuICBqUXVlcnkoXCIuaWNvblwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG59KTtcbiIsIi8vIGdldERpckNvbnRlbnRzKFwiLi9ib29rc1wiKS50aGVuKGZ1bmN0aW9uIChmaWxlcykge1xuLy8gICAvLyBjb25zb2xlLmxvZygpO1xuLy8gICAvLyBjb25zb2xlLmxvZyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGZpbGVzLmZpbGVzWzBdLm5hbWUpKSk7XG4vLyAgIGZvcih2YXIgaSA9IDA7IGkgPD0gZmlsZXMuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4vLyAgICAgcmVhZEFGaWxlKFwiLi9ib29rcy9cIiArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsZXMuZmlsZXNbaV0ubmFtZSkpKS50aGVuKGZ1bmN0aW9uIChib29rKSB7XG4vLyAgICAgICB2YXIgYm9va1RpdGxlID0gSlNPTi5wYXJzZShib29rKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpO1xuLy8gICAgICAgalF1ZXJ5KFwiLmJvb2tMaXN0XCIpLmFwcGVuZChgPGRpdiBjbGFzcz1cImJvb2tcIj4ke2Jvb2tUaXRsZS5kZXRhaWxzLm5hbWV9PGRpdj5gKTtcblxuLy8gICAgICAgIC8vbG9vayBmb3IgbnBjLCB0aGlzIHdpbGwgZXZlbnR1YWxseSBiZSBpdHMgb3duIGZ1bmN0aW9uXG4vLyAgICAgICBpZihib29rVGl0bGUuaGFzT3duUHJvcGVydHkoXCJOUENcIikpe1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lK1wiIHRydWVcIilcbi8vICAgICAgIH1lbHNle1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIm5vbmUgZm91bmRcIilcbi8vICAgICAgIH1cblxuLy8gICAgIH0pO1xuXG5cblxuLy8gICB9XG4vLyB9KTtcbmxldCBib29rRmlsZUFycmF5ID0gW107XG5sZXQgYm9va1RpdGxlQXJyYXkgPSBbXTtcbmdldEJvb2tGaWxlcygpLnRoZW4oYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBkYXRhLmZpbGVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICB2YXIgcGF0aCA9IGJvb2tQYXRoICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLmZpbGVzW2ldLm5hbWUpKTtcbiAgICAgICAgYm9va0ZpbGVBcnJheS5wdXNoKHBhdGgpO1xuICAgIH1cbiAgICBhd2FpdCBnZXRCb29rVGl0bGVzKGJvb2tGaWxlQXJyYXkpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhWzBdKVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBkYXRhLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgYm9va1RpdGxlQXJyYXkucHVzaChkYXRhW2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGJvb2tGaWxlQXJyYXkpO1xuICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZUFycmF5KTtcbiAgICBsZXQgYm9va09iakFycmF5ID0gW107XG4gICAgbGV0IGJvb2tUUE9iaiA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGJvb2tUaXRsZUFycmF5Lmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBib29rVFBPYmogPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogYm9va1RpdGxlQXJyYXlbaV0sXG4gICAgICAgICAgICBcInBhdGhcIjogYm9va0ZpbGVBcnJheVtpXVxuICAgICAgICB9XG4gICAgICAgIGJvb2tPYmpBcnJheS5wdXNoKGJvb2tUUE9iaik7XG4gICAgfVxuICAgIGJvb2tzID0ge1xuICAgICAgICBcImJvb2tzXCI6IFtib29rT2JqQXJyYXldXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShib29rcy5ib29rcykpXG59KTtcblxuXG5cbmFzeW5jIGZ1bmN0aW9uIGdldEJvb2tUaXRsZXMoYm9va0FycmF5KSB7XG4gICAgLy8gY29uc29sZS5sb2coYm9va0FycmF5KVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciB0aXRsZUFycmF5ID0gW107XG4gICAgICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGJvb2tBcnJheS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrOyAvL2NvbnNvbGUubG9nKGJvb2tBcnJheVtpXSlcblxuICAgICAgICAgICAgICAgIGF3YWl0IHJlYWRBRmlsZShib29rQXJyYXlbaV0pLnRoZW4oZnVuY3Rpb24gKGJvb2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvb2tUaXRsZSA9IEpTT04ucGFyc2UoYm9vayk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhib29rVGl0bGUuZGV0YWlscy5uYW1lKVxuICAgICAgICAgICAgICAgICAgICB0aXRsZUFycmF5LnB1c2goYm9va1RpdGxlLmRldGFpbHMubmFtZSlcbiAgICAgICAgICAgICAgICB9KTsgLy8gY29uc29sZS5sb2coZmlsZSlcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSBib29rQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImhlcmVcIilcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aXRsZUFycmF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcblxufVxuXG5mdW5jdGlvbiBnZXRCb29rRmlsZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGdldERpckNvbnRlbnRzKGJvb2tQYXRoKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuICAgIC8vIGZ1bmN0aW9uIGxpc3RCb29rcygpIHtcbiAgICAvLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyAgICAgICAgIGxldCB0aXRsZUFycmF5ID0gW107XG4gICAgLy8gICAgICAgICBsZXQgcGF0aEFycmF5ID0gW107XG4gICAgLy8gICAgICAgICB0cnkge1xuICAgIC8vICAgICAgICAgICAgIGdldERpckNvbnRlbnRzKGJvb2tQYXRoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuXG4gICAgLy8gICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGRhdGEuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IGJvb2tQYXRoICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhLmZpbGVzW2ldLm5hbWUpKVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgcGF0aEFycmF5LnB1c2gocGF0aClcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHJlYWRBRmlsZShwYXRoKS50aGVuKGZ1bmN0aW9uIChib29rKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJvb2tUaXRsZSA9IEpTT04ucGFyc2UoYm9vayk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIGJvb2tPYmogPSB7XCJuYW1lXCI6Ym9va1RpdGxlLmRldGFpbHMubmFtZSwgXCJwYXRoXCI6cGF0aH1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZUFycmF5LnB1c2goYm9va1RpdGxlLmRldGFpbHMubmFtZSk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYm9va1RpdGxlLmRldGFpbHMubmFtZSkpXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy8gLnRoZW4oKGRhdGEpPT57XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2codGl0bGVBcnJheSlcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZyh0aXRsZUFycmF5Lmxlbmd0aClcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBmb3IodmFyIGk9MDtpPD10aXRsZUFycmF5Lmxlbmd0aCAtMTsgaSsrKXtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyAgICAgY29uc29sZS5sb2coXCJzdHVmZlwiKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyB9XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGl0bGVBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGksa2V5KXtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJUaGlzIGlzIGkgXCIraStcIiwgdGhpcyBpcyBrZXk/XCIra2V5KVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aXRsZUFycmF5KVxuICAgIC8vICAgICAgICAgICAgICAgICAvLyBib29rcyA9IHtcImJvb2tzXCI6dGl0bGVBcnJheX07XG4gICAgLy8gICAgICAgICAgICAgICAgIC8vIHJlc29sdmUoYm9va3MpO1xuXG4gICAgLy8gICAgICAgICAgICAgfSlcblxuICAgIC8vICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgICAgICAgICAgICByZWplY3QoZXJyb3IpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0iLCIvKipcbiAqIE5lZWQgdG8gYnVpbGQgbG9hZGluZyBhIGNhbXBhaWduXG4gKiBuZWVkIG5ldyBjYW1wYWlnbiB0byBtYWtlIHN1cmUgaXRzIG5hbWUgaXMgdW5pcXVlLlxuICovXG5cblxualF1ZXJ5KFwiLmNhbXBBZGRcIikub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbmV3Q2FtcGFpZ24oKTtcbn0pO1xuXG5qUXVlcnkoXCIuY2FtcGFpZ25MaXN0XCIpLm9uKFwiY2xpY2tcIiwgXCIuY2FtcExvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b0xvYWQgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbG9hZFwiKTtcbiAgICB2YXIgdGhpc05hbWUgPSBqUXVlcnkodGhpcykuYXR0cihcImRhdGEtbmFtZVwiKTtcbiAgICB2YXIgdGhpc0RpcjtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRvTG9hZE5hbWUpXG4gICAgcmVtb3ZlU3BhY2UodGhpc05hbWUpLnRoZW4oKG5hbWUpID0+IHtcbiAgICAgICAgdGhpc0RpciA9IGNhbXBhaWduRGlyUGF0aCArIG5hbWUgKyBcIi9jYW1wLmpzb25cIjtcbiAgICAgICAgY2hlY2tGaWxlRXhpc3QodGhpc0RpcikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGlzIGNhbXBhaWduIGRvZXNuJ3QgZXhpc3QuLi4gTm93IGRlbGV0aW5nXCIpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUNhbXBhaWduKHRoaXNOYW1lLCB0b0xvYWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlYWRBRmlsZSh0aGlzRGlyKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNDYW1wYWlnbiA9PSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgLy9XaWxsIG5lZWQgdG8gbG9hZCB1cCBhbGwgdGhlIGJvb2tzIGFuZCBzdHVmZiwgXG4gICAgICAgICAgICAgICAgICAgIC8vYnV0IHdlIG5lZWQgdG8gZmlndXJlIG91dCB0aGUgb2JqXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIGZvciBub3cgd2Ugd2lsbCBqdXN0IGdvIHRvIHRoZSB1aVxuICAgICAgICAgICAgICAgICAgICBqUXVlcnkoXCIuY2FtcGFpZ25zXCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9KVxufSlcblxuLy90aGUgZGVsZXRlIGJ1dHRvblxualF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5vbihcImNsaWNrXCIsIFwiLmNhbXBEZWxldGVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b0RlbGV0ZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1kZWxldGVcIik7XG4gICAgdmFyIHRvRGVsZXRlTmFtZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1uYW1lXCIpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcbiAgICAvL3Nob3VsZCBhZGQgYSBhcmUgeW91IHN1cmUgcG9wdXBcbiAgICBkZWxldGVDYW1wYWlnbih0b0RlbGV0ZU5hbWUsIHRvRGVsZXRlKVxufSk7XG5cbmpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikub24oXCJjbGlja1wiLCBcIi5zYXZlTmV3Q2FtcFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5ld0NhbXBOYW1lID0galF1ZXJ5KFwiaW5wdXRbbmFtZT0nbmV3Q2FtcCddXCIpLnZhbCgpO1xuICAgIHZhciBjYW1wT2JqID0ge1xuICAgICAgICBcIm5hbWVcIjogbmV3Q2FtcE5hbWVcbiAgICB9O1xuICAgIHRoaXNDYW1wYWlnbiA9IHtcbiAgICAgICAgXCJjYW1wYWlnblwiOiB7XG4gICAgICAgICAgICBcIm5hbWVcIjogbmV3Q2FtcE5hbWVcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYW1wYWlnbk9iai5jYW1wYWlnbnMucHVzaChjYW1wT2JqKTsgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKVxuXG4gICAgd3JpdGVGaWxlKGNhbXBhaWduTGlzdFBhdGgsIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YSA9PSBcIkZpbGUgV3JpdHRlblwiKSB7XG4gICAgICAgICAgICBjcmVhdGVDYW1wYWlnbihuZXdDYW1wTmFtZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhID09IFwiZG9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVNwYWNlKG5ld0NhbXBOYW1lKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzQ2FtcGFpZ25QYXRoID0gY2FtcGFpZ25EaXJQYXRoICsgZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlRmlsZSh0aGlzQ2FtcGFpZ25QYXRoICsgXCIvY2FtcC5qc29uXCIsIEpTT04uc3RyaW5naWZ5KHRoaXNDYW1wYWlnbikpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbnNcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGRlbGV0ZUNhbXBhaWduKHRvRGVsZXRlTmFtZSwgdG9EZWxldGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB2YXIgbmV3QXJyYXkgPSBjYW1wYWlnbk9iai5jYW1wYWlnbnM7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld0FycmF5KVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRlbGV0IHRoaXMgbnVtYmVyIFwiICsgdG9EZWxldGUgKyBcIiBhbmQgdGhpcyBpcyB0aGUgb2JqZWN0XCIgKyBKU09OLnN0cmluZ2lmeShjYW1wYWlnbk9iai5jYW1wYWlnbnMpKTtcbiAgICAgICAgbmV3QXJyYXkuc3BsaWNlKHRvRGVsZXRlLCAxKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoY2FtcGFpZ25PYmopKTtcbiAgICAgICAgd3JpdGVGaWxlKGNhbXBhaWduTGlzdFBhdGgsIEpTT04uc3RyaW5naWZ5KGNhbXBhaWduT2JqKSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJGaWxlIFdyaXR0ZW5cIikge1xuICAgICAgICAgICAgICAgIHJlbW92ZVNwYWNlKHRvRGVsZXRlTmFtZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByaW1yYWYoY2FtcGFpZ25EaXJQYXRoICsgZGF0YSwgKHN0dWZmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdHVmZilcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENhbXBhaWducyhjYW1wYWlnbkxpc3RQYXRoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q2FtcGFpZ25zKGRhdGEpLnRoZW4oKGNhbXBMaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShcIi5jYW1wYWlnbkxpc3RcIikuaHRtbChjYW1wTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDYW1wYWlnbihjYW1wTmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciBkaXI7XG4gICAgICAgIHJlbW92ZVNwYWNlKGNhbXBOYW1lKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBkaXIgPSBjYW1wYWlnbkRpclBhdGggKyBkYXRhO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoZWNrRGlyRXhpc3QoZGlyKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURpcihkaXIpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBuZXdDYW1wYWlnbigpIHtcbiAgICBnZXRDYW1wYWlnbnMoY2FtcGFpZ25MaXN0UGF0aCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBzZXRDYW1wYWlnbnMoZGF0YSkudGhlbigoaHRtbCkgPT4ge1xuICAgICAgICAgICAgdmFyIGFkZE9uSHRtbCA9IFwiPHRyPjx0ZD48aW5wdXQgdHlwZT0ndGV4dCcgbmFtZT0nbmV3Q2FtcCcgLz48L3RkPjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBzYXZlTmV3Q2FtcCc+U2F2ZTwvYnV0dG9uPjwvdGQ+PC90cj48L3RhYmxlPlwiO1xuICAgICAgICAgICAgdmFyIG5ld0h0bWwgPSBodG1sLnJlcGxhY2UoXCI8L3RhYmxlPlwiLCBhZGRPbkh0bWwpO1xuICAgICAgICAgICAgalF1ZXJ5KFwiLmNhbXBhaWduTGlzdFwiKS5odG1sKG5ld0h0bWwpO1xuICAgICAgICB9KVxuICAgIH0pXG5cbn1cblxuLy9HZXRzIHRoZSBsaXN0IG9mIGNhbXBhaWduc1xuZnVuY3Rpb24gZ2V0Q2FtcGFpZ25zKHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRDYW1wYWlnbnMgXCIgKyBwYXRoKTtcbiAgICAgICAgICAgIGNoZWNrRmlsZUV4aXN0KHBhdGgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICByZWFkQUZpbGUocGF0aCkudGhlbigoY2FtcGFpZ25zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbnMgPSBKU09OLnBhcnNlKGNhbXBhaWducyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1wYWlnbk9iaiA9IGNhbXBhaWducztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2FtcGFpZ25PYmopO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vL1B1dHMgdGhlIGxpc3Qgb2YgY2FtcGFpZ25zIG9uIHRoZSBjYW1wYWlnbiBzZWxlY3Rvci5cbmZ1bmN0aW9uIHNldENhbXBhaWducyhjYW1wYWlnbnMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNhbXBBcnJheSA9IGNhbXBhaWducy5jYW1wYWlnbnM7XG4gICAgICAgICAgICB2YXIgaHRtbCA9IFwiPHRhYmxlPlwiO1xuICAgICAgICAgICAgY2FtcEFycmF5LmZvckVhY2goZnVuY3Rpb24gKG5vZGUsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShub2RlKSlcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUpXG4gICAgICAgICAgICAgICAgaHRtbCArPSBcIjx0cj48dGQ+XCIgKyBjYW1wYWlnbnMuY2FtcGFpZ25zW2ldLm5hbWUgKyBcIjwvdGQ+PHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLW5hbWU9J1wiICsgY2FtcGFpZ25zLmNhbXBhaWduc1tpXS5uYW1lICsgXCInIGRhdGEtbG9hZD0nXCIgKyBpICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcExvYWQnPkxvYWQ8L2J1dHRvbj48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS1uYW1lPSdcIiArIGNhbXBhaWducy5jYW1wYWlnbnNbaV0ubmFtZSArIFwiJyBkYXRhLWRlbGV0ZT0nXCIgKyBpICsgXCInIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgY2FtcERlbGV0ZSc+RGVsZXRlPC9idXR0b24+PC90ZD48L3RyPlwiO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L3RhYmxlPlwiO1xuXG4gICAgICAgICAgICByZXNvbHZlKGh0bWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwialF1ZXJ5KFwiLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBqUXVlcnkodGhpcykucGFyZW50KCkudG9nZ2xlKCk7XG59KVxualF1ZXJ5KFwiLm1lbnUgYnV0dG9uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3Blbk1lID0galF1ZXJ5KHRoaXMpLmF0dHIoXCJkYXRhLW9wZW5cIik7XG4gICAgalF1ZXJ5KFwiLlwiICsgb3Blbk1lKS50b2dnbGUoKTtcbiAgICBjbGVhclRvcCgpO1xuICAgIGpRdWVyeShcIi5cIiArIG9wZW5NZSkuYWRkQ2xhc3MoXCJvblRvcFwiKTtcbn0pO1xuIiwiIiwiZnVuY3Rpb24gcGFzc2l2ZVBlcmNlcHRpb24oKSB7XG4gICAgY2FsbEFiaWxpdHkoJ3dpcycpO1xuICAgIGpRdWVyeSgnI3Bhc3NQZXJjJykudmFsKHRoaXNBYmlsaXR5Qm9udXMrMTApO1xufVxuIiwidmFyIHByb2ZCID0galF1ZXJ5KCcjcHJvZkJvbnVzJykudmFsKCk7XG5zb21ldGhpbmdDbGV2ZXIoKTtcblxualF1ZXJ5KCcjcHJvZkJvbnVzJykub24oXCJrZXl1cFwiLCBmdW5jdGlvbigpIHtcbiAgICBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xuICAgIHNvbWV0aGluZ0NsZXZlcigpO1xufSk7XG5cbmZ1bmN0aW9uIHNvbWV0aGluZ0NsZXZlcigpIHtcbiAgICBqUXVlcnkoJy5pY29uLXByb2YnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFsnaWNvbi1wcm9mJywgJ2ljb24tcHJvZiBwcm9maWNpZW50JywgJ2ljb24tcHJvZiBleHBlcnRpc2UnXTtcbiAgICAgICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xuICAgICAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XG4gICAgICAgIHZhciBteVByb2YgPSBqUXVlcnkodGhpcykucGFyZW50KCkuY2hpbGRyZW4oJy5wcm9mVmFsJyk7XG4gICAgICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIGN1cnJlbnRQb3MpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9mKG15UHJvZiwgbXlQcm9mU2tpbGxGbGFnKSB7XG4gICAgdmFyIHRoaXNBYmlsaXR5ID0galF1ZXJ5KG15UHJvZikuYXR0cignaWQnKTtcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251c0lEID0gJyMnICsgdGhpc0FiaWxpdHkgKyAnLUJvbnVzJztcbiAgICB2YXIgdGhpc0FiaWxpdHlCb251cyA9IGpRdWVyeSgnLmFiaWxpdGllcyAnICsgdGhpc0FiaWxpdHlCb251c0lEKS50ZXh0KCk7XG4gICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMCkge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XG4gICAgfVxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMSkge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICsgcGFyc2VJbnQodGhpc0FiaWxpdHlCb251cyk7XG4gICAgfVxuICAgIGlmIChteVByb2ZTa2lsbEZsYWcgPT0gMikge1xuICAgICAgICB2YXIgbmV3VmFsID0gcGFyc2VJbnQocHJvZkIpICogMiArIChwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKSk7XG4gICAgfVxuICAgIGpRdWVyeShteVByb2YpLnRleHQobmV3VmFsKTtcbn07XG5cblxualF1ZXJ5KCcuaWNvbi1wcm9mJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XG4gICAgdmFyIGN1cnJlbnRDbGFzcyA9IGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycpO1xuICAgIHZhciBjdXJyZW50UG9zID0galF1ZXJ5LmluQXJyYXkoY3VycmVudENsYXNzLCBjbGFzc2VzKTtcbiAgICB2YXIgbmV3UG9zID0gKChjdXJyZW50UG9zICsgMSkgJSBjbGFzc2VzLmxlbmd0aCk7XG4gICAgdmFyIG5ld0NsYXNzID0gY2xhc3Nlc1tuZXdQb3NdO1xuICAgIGpRdWVyeSh0aGlzKS5hdHRyKCdjbGFzcycsIG5ld0NsYXNzKTtcbiAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xuICAgIHVwZGF0ZVByb2YoalF1ZXJ5KG15UHJvZiksIG5ld1Bvcyk7XG59KTtcbiIsImFicnJldmlhdGVMYWJlbHMoKTtcbmpRdWVyeSgnLnRleHRTaXplICNmb250LXNpemUtdXAnKS5jbGljayggZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRhcmdldCA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKTtcbiAgICB2YXIgY3VyclNpemUgPSBwYXJzZUludChqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJykuc3BsaXQoXCJweFwiKVswXSk7XG4gICAgLy8gY3VyclNpemUgPSBNYXRoLnJvdW5kKGN1cnJTaXplKTtcbiAgICB2YXIgbmV3U2l6ZSA9IGN1cnJTaXplKzM7XG4gICAgaWYgKG5ld1NpemUgPiAxNil7XG4gICAgICAgIG5ld1NpemUgPSAxNjtcbiAgICB9XG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xufSlcblxualF1ZXJ5KCcudGV4dFNpemUgI2ZvbnQtc2l6ZS1kb3duJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgIHZhciB0YXJnZXQgPSBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCk7XG4gICAgdmFyIGN1cnJTaXplID0gcGFyc2VJbnQoalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScpLnNwbGl0KFwicHhcIilbMF0pO1xuICAgIHZhciBuZXdTaXplID0gY3VyclNpemUtMztcbiAgICBpZiAobmV3U2l6ZSA8IDkpe1xuICAgICAgICBuZXdTaXplID0gOTtcbiAgICB9XG4gICAgdmFyIG5ld0VtcyA9IChuZXdTaXplLzE2KTtcbiAgICBqUXVlcnkodGFyZ2V0KS5jc3MoJ2ZvbnRTaXplJyxuZXdFbXMrJ2VtJyk7XG4gICAgYWJycmV2aWF0ZUxhYmVscygpO1xufSlcbiIsIi8vdGhlbWVzXG52YXIgYnV0dG9uT3B0aW9ucyA9IFsnZGVmYXVsdCcsICd3b3JuJywgJ2xpZ2h0JywgJ2JsYWNrJywgJ2dyYXknLCAncmVkJ107XG5qUXVlcnkoYnV0dG9uT3B0aW9ucykuZWFjaChmdW5jdGlvbigpIHtcbiAgICB2YXIgbXlTdHlsZSA9IHRoaXM7XG4gICAgdmFyIG15SWQgPSAnIycgKyBteVN0eWxlO1xuICAgIGpRdWVyeShteUlkKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVBdHRyKCdjbGFzcycpO1xuICAgICAgICBqUXVlcnkoJ2JvZHknKS5hZGRDbGFzcygndGhlbWUtJyArIG15U3R5bGUpO1xuICAgIH0pXG59KVxuIl19

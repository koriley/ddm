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
'use strict'; //remove line below when testing frontend
// var fs = require('fs');
//////////////////

jQuery("document").ready(function () {
  jQuery(".drag").draggable({
    containment: ".mainView",
    scroll: false
  });
  var books = {};
  getDirContents("./books").then(function (files) {
    // console.log();
    // console.log(JSON.parse(JSON.stringify(files.files[0].name)));
    for (var i = 0; i <= files.files.length - 1; i++) {
      readAFile("./books/" + JSON.parse(JSON.stringify(files.files[i].name))).then(function (book) {
        var bookTitle = JSON.parse(book);
        console.log(bookTitle.details.name);
        jQuery(".bookList").append("<div class=\"book\">".concat(bookTitle.details.name, "<div>"));
      });
    }
  });
  passivePerception();
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

var getAllClasses = jQuery('.charSheet #class').val();
var setClassVal = getAllClasses + ' +';
jQuery('.charSheet #class').val(setClassVal); // <svg><use xlink:href="#downAngle"></use></svg>
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
} //write test
// var testObj  = "This is a write test";
// writeFile("../test.txt", testObj);
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

  if (newSize > 24) {
    newSize = 24;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFiaWxpdHlCb251cy5qcyIsImFwcC5qcyIsImNhbGxBYmlsaXR5LmpzIiwiY2hhclNoZWV0QWJicmV2aWF0ZS5qcyIsImNoYXJTaGVldENsYXNzTWFuYWdlci5qcyIsImNsaWNrVG9Gcm9udC5qcyIsImlvLmpzIiwibWVudUJ1dHRvbnMuanMiLCJwYXNzaXZlUGVyY2VwdGlvbi5qcyIsInByb2ZpY2llbmNpZXMuanMiLCJ0ZXh0U2l6ZS5qcyIsInRoZW1lcy5qcyJdLCJuYW1lcyI6WyJ1cGRhdGVBYmlsaXR5Qm9udXMiLCJteUFiaWxpdHkiLCJhYmlsaXR5IiwialF1ZXJ5IiwidmFsIiwibW9kaWZpZXIiLCJwYXJlbnQiLCJjaGlsZHJlbiIsInRleHQiLCJpc051bWVyaWMiLCJNYXRoIiwiZmxvb3IiLCJhdHRyIiwicGFzc2l2ZVBlcmNlcHRpb24iLCJlYWNoIiwib24iLCJzZWxlY3QiLCJ1cGRhdGVQcm9mIiwicmVhZHkiLCJkcmFnZ2FibGUiLCJjb250YWlubWVudCIsInNjcm9sbCIsImJvb2tzIiwiZ2V0RGlyQ29udGVudHMiLCJ0aGVuIiwiZmlsZXMiLCJpIiwibGVuZ3RoIiwicmVhZEFGaWxlIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwibmFtZSIsImJvb2siLCJib29rVGl0bGUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlscyIsImFwcGVuZCIsInRoaXNBYmlsaXR5IiwidGhpc0FiaWxpdHlCb251cyIsImNhbGxBYmlsaXR5IiwicGFyc2VJbnQiLCJhYnJyZXZpYXRlTGFiZWxzIiwiYWJicldvcmRzIiwibXlTaXplIiwiY3NzIiwic3BsaXQiLCJpbmRleCIsImxhYmVsIiwid29yZCIsImxvbmciLCJzaG9ydCIsInJlcGxhY2UiLCJnZXRBbGxDbGFzc2VzIiwic2V0Q2xhc3NWYWwiLCJjbGVhclRvcCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJmaWxlcGF0aCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnMiLCJyZWFkRmlsZSIsImVyciIsImRhdGEiLCJtZXNzYWdlIiwid3JpdGVGaWxlIiwiZGlyIiwiZmlsZU5hbWVzIiwicmVhZGRpclN5bmMiLCJmb3JFYWNoIiwiZmlsZU5hbWUiLCJwdXNoIiwiZXJyb3IiLCJjbGljayIsInRvZ2dsZSIsIm9wZW5NZSIsInByb2ZCIiwic29tZXRoaW5nQ2xldmVyIiwiY2xhc3NlcyIsImN1cnJlbnRDbGFzcyIsImN1cnJlbnRQb3MiLCJpbkFycmF5IiwibXlQcm9mIiwibXlQcm9mU2tpbGxGbGFnIiwidGhpc0FiaWxpdHlCb251c0lEIiwibmV3VmFsIiwibmV3UG9zIiwibmV3Q2xhc3MiLCJ0YXJnZXQiLCJjdXJyU2l6ZSIsIm5ld1NpemUiLCJuZXdFbXMiLCJidXR0b25PcHRpb25zIiwibXlTdHlsZSIsIm15SWQiLCIkIiwicmVtb3ZlQXR0ciJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxTQUFTQSxrQkFBVCxDQUE0QkMsU0FBNUIsRUFBdUM7QUFDbkMsTUFBSUMsT0FBTyxHQUFHQyxNQUFNLENBQUNGLFNBQUQsQ0FBTixDQUFrQkcsR0FBbEIsRUFBZDtBQUVBLE1BQUlDLFFBQVEsR0FBR0YsTUFBTSxDQUFDRixTQUFELENBQU4sQ0FBa0JLLE1BQWxCLEdBQTJCQyxRQUEzQixDQUFvQyxrQkFBcEMsRUFBd0RDLElBQXhELEVBQWY7O0FBQ0EsTUFBSSxDQUFDTCxNQUFNLENBQUNNLFNBQVAsQ0FBaUJQLE9BQWpCLENBQUwsRUFBZ0M7QUFDNUJBLElBQUFBLE9BQU8sR0FBRyxDQUFWO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0YsU0FBRCxDQUFOLENBQWtCRyxHQUFsQixDQUFzQkYsT0FBdEI7QUFHSDs7QUFFREcsRUFBQUEsUUFBUSxHQUFHSyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDVCxPQUFPLEdBQUcsRUFBWCxJQUFpQixDQUE1QixDQUFYO0FBQ0FDLEVBQUFBLE1BQU0sQ0FBQ0YsU0FBRCxDQUFOLENBQWtCSyxNQUFsQixHQUEyQkMsUUFBM0IsQ0FBb0Msa0JBQXBDLEVBQXdEQyxJQUF4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TUFBTSxHQUFDLElBQXJDO0FBQ0FuRCxFQUFBQSxnQkFBZ0I7QUFDbkIsQ0FWRDs7O0FDZEE7QUFDQSxJQUFJb0QsYUFBYSxHQUFHLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsT0FBcEIsRUFBNkIsT0FBN0IsRUFBc0MsTUFBdEMsRUFBOEMsS0FBOUMsQ0FBcEI7QUFDQTVGLE1BQU0sQ0FBQzRGLGFBQUQsQ0FBTixDQUFzQmpGLElBQXRCLENBQTJCLFlBQVc7QUFDbEMsTUFBSWtGLE9BQU8sR0FBRyxJQUFkO0FBQ0EsTUFBSUMsSUFBSSxHQUFHLE1BQU1ELE9BQWpCO0FBQ0E3RixFQUFBQSxNQUFNLENBQUM4RixJQUFELENBQU4sQ0FBYWxGLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsWUFBVztBQUNoQ21GLElBQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVUMsVUFBVixDQUFxQixPQUFyQjtBQUNBaEcsSUFBQUEsTUFBTSxDQUFDLE1BQUQsQ0FBTixDQUFldUQsUUFBZixDQUF3QixXQUFXc0MsT0FBbkM7QUFDSCxHQUhEO0FBSUgsQ0FQRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmZ1bmN0aW9uIHVwZGF0ZUFiaWxpdHlCb251cyhteUFiaWxpdHkpIHtcbiAgICB2YXIgYWJpbGl0eSA9IGpRdWVyeShteUFiaWxpdHkpLnZhbCgpO1xuXG4gICAgdmFyIG1vZGlmaWVyID0galF1ZXJ5KG15QWJpbGl0eSkucGFyZW50KCkuY2hpbGRyZW4oJy5tb2RpZmllci1idWJibGUnKS50ZXh0KCk7XG4gICAgaWYgKCFqUXVlcnkuaXNOdW1lcmljKGFiaWxpdHkpKSB7XG4gICAgICAgIGFiaWxpdHkgPSAxO1xuICAgICAgICBqUXVlcnkobXlBYmlsaXR5KS52YWwoYWJpbGl0eSk7XG5cblxuICAgIH1cblxuICAgIG1vZGlmaWVyID0gTWF0aC5mbG9vcigoYWJpbGl0eSAtIDEwKSAvIDIpO1xuICAgIGpRdWVyeShteUFiaWxpdHkpLnBhcmVudCgpLmNoaWxkcmVuKCcubW9kaWZpZXItYnViYmxlJykudGV4dChtb2RpZmllcik7XG4gICAgXG4gICAgaWYgKG15QWJpbGl0eS5hdHRyKCdpZCcpID09ICd3aXMnKSB7XG4gICAgICAgIHBhc3NpdmVQZXJjZXB0aW9uKCk7XG4gICAgfVxufTtcblxuXG5qUXVlcnkoXCIuYWJpbGl0eVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHVwZGF0ZUFiaWxpdHlCb251cyhqUXVlcnkodGhpcykpO1xuXG4gICAgalF1ZXJ5KHRoaXMpLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGpRdWVyeSh0aGlzKS5zZWxlY3QoKTtcbiAgICB9KVxuICAgIGpRdWVyeSh0aGlzKS5vbihcImtleXVwXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB1cGRhdGVBYmlsaXR5Qm9udXMoalF1ZXJ5KHRoaXMpKTtcbiAgICAgICAgdXBkYXRlUHJvZihqUXVlcnkoJy5zYXZpbmdUaHJvd3MgIycralF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJykpKTtcbiAgICB9KTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy9yZW1vdmUgbGluZSBiZWxvdyB3aGVuIHRlc3RpbmcgZnJvbnRlbmRcbi8vIHZhciBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4vLy8vLy8vLy8vLy8vLy8vLy9cblxualF1ZXJ5KFwiZG9jdW1lbnRcIikucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgalF1ZXJ5KFwiLmRyYWdcIikuZHJhZ2dhYmxlKHtcbiAgICAgICAgY29udGFpbm1lbnQ6IFwiLm1haW5WaWV3XCIsXG4gICAgICAgIHNjcm9sbDogZmFsc2VcbiAgICB9KTtcblxuICAgIHZhciBib29rcyA9IHt9O1xuICAgIGdldERpckNvbnRlbnRzKFwiLi9ib29rc1wiKS50aGVuKGZ1bmN0aW9uKGZpbGVzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZmlsZXMuZmlsZXNbMF0ubmFtZSkpKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZmlsZXMuZmlsZXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICByZWFkQUZpbGUoXCIuL2Jvb2tzL1wiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShmaWxlcy5maWxlc1tpXS5uYW1lKSkpLnRoZW4oZnVuY3Rpb24oYm9vaykge1xuICAgICAgICAgICAgICAgIHZhciBib29rVGl0bGUgPSBKU09OLnBhcnNlKGJvb2spO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvb2tUaXRsZS5kZXRhaWxzLm5hbWUpO1xuICAgICAgICAgICAgICAgIGpRdWVyeShcIi5ib29rTGlzdFwiKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJib29rXCI+JHtib29rVGl0bGUuZGV0YWlscy5uYW1lfTxkaXY+YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcGFzc2l2ZVBlcmNlcHRpb24oKTtcblxufSlcbiIsInZhciB0aGlzQWJpbGl0eSA9IFwiXCI7XG52YXIgdGhpc0FiaWxpdHlCb251cyA9IFwiXCI7XG5cbmZ1bmN0aW9uIGNhbGxBYmlsaXR5KGFiaWxpdHkpIHtcbiAgICB0aGlzQWJpbGl0eSA9IGpRdWVyeSgnLmFiaWxpdHktYm94ICMnK2FiaWxpdHkpLnZhbCgpO1xuICAgIHRoaXNBYmlsaXR5Qm9udXMgPSBwYXJzZUludChqUXVlcnkoJy5hYmlsaXR5LWJveCAjJythYmlsaXR5KyctQm9udXMnKS50ZXh0KCkpO1xufVxuIiwiZnVuY3Rpb24gYWJycmV2aWF0ZUxhYmVscygpIHtcbiAgICB2YXIgYWJicldvcmRzID0gWydTcGVlZHxTUEQnLCdJbml0aWF0aXZlfElOSVQnLCdUZW1wb3Jhcnl8VEVNUCcsJ0hpdCBQb2ludHN8SFAnLCdBcm1vciBDbGFzc3xBQycsJ01heGltdW18TUFYJywnQ3VycmVudHxDUk5UJywnRXhwZXJpZW5jZSBQb2ludHN8WFAnXTtcbiAgICB2YXIgbXlTaXplID0galF1ZXJ5KCcuY2hhclNoZWV0JykuY3NzKCdmb250LXNpemUnKTtcbiAgICBteVNpemUgPSBwYXJzZUludChteVNpemUuc3BsaXQoJ3B4JylbMF0pO1xuICAgIC8vIGNvbnNvbGUubG9nKG15U2l6ZSk7XG4gICAgaWYgKG15U2l6ZTwxNikge1xuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XG4gICAgICAgICAgICBqUXVlcnkoYWJicldvcmRzKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgd29yZCkge1xuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcbiAgICAgICAgICAgICAgICBqUXVlcnkobGFiZWwpLnRleHQoZnVuY3Rpb24oaW5kZXgsIHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShsb25nLCBzaG9ydCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICBqUXVlcnkoJ2xhYmVsJykuZWFjaCggZnVuY3Rpb24oaW5kZXgsIGxhYmVsKSB7XG4gICAgICAgICAgICBqUXVlcnkoYWJicldvcmRzKS5lYWNoKCBmdW5jdGlvbihpbmRleCwgd29yZCkge1xuICAgICAgICAgICAgICAgIHZhciBsb25nID0gd29yZC5zcGxpdCgnfCcpWzBdO1xuICAgICAgICAgICAgICAgIHZhciBzaG9ydCA9IHdvcmQuc3BsaXQoJ3wnKVsxXTtcbiAgICAgICAgICAgICAgICBqUXVlcnkobGFiZWwpLnRleHQoZnVuY3Rpb24oaW5kZXgsIHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZShzaG9ydCwgbG9uZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG59XG4iLCJ2YXIgZ2V0QWxsQ2xhc3NlcyA9IGpRdWVyeSgnLmNoYXJTaGVldCAjY2xhc3MnKS52YWwoKTtcblxuXG52YXIgc2V0Q2xhc3NWYWwgPSBnZXRBbGxDbGFzc2VzKycgKyc7XG5cblxualF1ZXJ5KCcuY2hhclNoZWV0ICNjbGFzcycpLnZhbChzZXRDbGFzc1ZhbCk7XG5cbi8vIDxzdmc+PHVzZSB4bGluazpocmVmPVwiI2Rvd25BbmdsZVwiPjwvdXNlPjwvc3ZnPlxuIiwiZnVuY3Rpb24gY2xlYXJUb3AoKSB7XG4gICAgalF1ZXJ5KFwiLmRyYWdcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnJlbW92ZUNsYXNzKFwib25Ub3BcIik7XG4gICAgfSk7XG59O1xuXG5qUXVlcnkoXCIuZHJhZ1wiKS5vbihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpIHtcbiAgICBjbGVhclRvcCgpO1xuICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcyhcIm9uVG9wXCIpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHJlYWRBRmlsZShmaWxlcGF0aCl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZnMucmVhZEZpbGUoZmlsZXBhdGgsICd1dGYtOCcsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIkFuIGVycm9yIG9jdXJyZWQgcmVhZGluZyB0aGUgZmlsZSA6XCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZzLndyaXRlRmlsZShmaWxlcGF0aCwgZGF0YSwgKGVycikgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0RGlyQ29udGVudHMoZGlyKXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdmFyIGZpbGVzID0ge307XG4gICAgICAgIHZhciBmaWxlTmFtZXMgPSBbXTtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZnMucmVhZGRpclN5bmMoZGlyKS5mb3JFYWNoKChmaWxlTmFtZSk9PntcbiAgICAgICAgICAgICAgICBmaWxlTmFtZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOmZpbGVOYW1lXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmaWxlcyA9IHtcImZpbGVzXCI6ZmlsZU5hbWVzfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc29sdmUoZmlsZXMpO1xuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9KVxufVxuLy93cml0ZSB0ZXN0XG4vLyB2YXIgdGVzdE9iaiAgPSBcIlRoaXMgaXMgYSB3cml0ZSB0ZXN0XCI7XG4vLyB3cml0ZUZpbGUoXCIuLi90ZXN0LnR4dFwiLCB0ZXN0T2JqKTtcbiIsImpRdWVyeShcIi5jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgalF1ZXJ5KHRoaXMpLnBhcmVudCgpLnRvZ2dsZSgpO1xufSlcbmpRdWVyeShcIi5tZW51IGJ1dHRvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wZW5NZSA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS1vcGVuXCIpO1xuICAgIGpRdWVyeShcIi5cIiArIG9wZW5NZSkudG9nZ2xlKCk7XG4gICAgY2xlYXJUb3AoKTtcbiAgICBqUXVlcnkoXCIuXCIgKyBvcGVuTWUpLmFkZENsYXNzKFwib25Ub3BcIik7XG59KTtcbiIsImZ1bmN0aW9uIHBhc3NpdmVQZXJjZXB0aW9uKCkge1xuICAgIGNhbGxBYmlsaXR5KCd3aXMnKTtcbiAgICBqUXVlcnkoJyNwYXNzUGVyYycpLnZhbCh0aGlzQWJpbGl0eUJvbnVzKzEwKTtcbn1cbiIsInZhciBwcm9mQiA9IGpRdWVyeSgnI3Byb2ZCb251cycpLnZhbCgpO1xuc29tZXRoaW5nQ2xldmVyKCk7XG5cbmpRdWVyeSgnI3Byb2ZCb251cycpLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24oKSB7XG4gICAgcHJvZkIgPSBqUXVlcnkoJyNwcm9mQm9udXMnKS52YWwoKTtcbiAgICBzb21ldGhpbmdDbGV2ZXIoKTtcbn0pO1xuXG5mdW5jdGlvbiBzb21ldGhpbmdDbGV2ZXIoKSB7XG4gICAgalF1ZXJ5KCcuaWNvbi1wcm9mJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBbJ2ljb24tcHJvZicsICdpY29uLXByb2YgcHJvZmljaWVudCcsICdpY29uLXByb2YgZXhwZXJ0aXNlJ107XG4gICAgICAgIHZhciBjdXJyZW50Q2xhc3MgPSBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnKTtcbiAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSBqUXVlcnkuaW5BcnJheShjdXJyZW50Q2xhc3MsIGNsYXNzZXMpO1xuICAgICAgICB2YXIgbXlQcm9mID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLmNoaWxkcmVuKCcucHJvZlZhbCcpO1xuICAgICAgICB1cGRhdGVQcm9mKGpRdWVyeShteVByb2YpLCBjdXJyZW50UG9zKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUHJvZihteVByb2YsIG15UHJvZlNraWxsRmxhZykge1xuICAgIHZhciB0aGlzQWJpbGl0eSA9IGpRdWVyeShteVByb2YpLmF0dHIoJ2lkJyk7XG4gICAgdmFyIHRoaXNBYmlsaXR5Qm9udXNJRCA9ICcjJyArIHRoaXNBYmlsaXR5ICsgJy1Cb251cyc7XG4gICAgdmFyIHRoaXNBYmlsaXR5Qm9udXMgPSBqUXVlcnkoJy5hYmlsaXRpZXMgJyArIHRoaXNBYmlsaXR5Qm9udXNJRCkudGV4dCgpO1xuICAgIHZhciBuZXdWYWwgPSBwYXJzZUludCh0aGlzQWJpbGl0eUJvbnVzKTtcbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDApIHtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xuICAgIH1cbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDEpIHtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSArIHBhcnNlSW50KHRoaXNBYmlsaXR5Qm9udXMpO1xuICAgIH1cbiAgICBpZiAobXlQcm9mU2tpbGxGbGFnID09IDIpIHtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IHBhcnNlSW50KHByb2ZCKSAqIDIgKyAocGFyc2VJbnQodGhpc0FiaWxpdHlCb251cykpO1xuICAgIH1cbiAgICBqUXVlcnkobXlQcm9mKS50ZXh0KG5ld1ZhbCk7XG59O1xuXG5cbmpRdWVyeSgnLmljb24tcHJvZicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIHZhciBjbGFzc2VzID0gWydpY29uLXByb2YnLCAnaWNvbi1wcm9mIHByb2ZpY2llbnQnLCAnaWNvbi1wcm9mIGV4cGVydGlzZSddO1xuICAgIHZhciBjdXJyZW50Q2xhc3MgPSBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnKTtcbiAgICB2YXIgY3VycmVudFBvcyA9IGpRdWVyeS5pbkFycmF5KGN1cnJlbnRDbGFzcywgY2xhc3Nlcyk7XG4gICAgdmFyIG5ld1BvcyA9ICgoY3VycmVudFBvcyArIDEpICUgY2xhc3Nlcy5sZW5ndGgpO1xuICAgIHZhciBuZXdDbGFzcyA9IGNsYXNzZXNbbmV3UG9zXTtcbiAgICBqUXVlcnkodGhpcykuYXR0cignY2xhc3MnLCBuZXdDbGFzcyk7XG4gICAgdmFyIG15UHJvZiA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5jaGlsZHJlbignLnByb2ZWYWwnKTtcbiAgICB1cGRhdGVQcm9mKGpRdWVyeShteVByb2YpLCBuZXdQb3MpO1xufSk7XG4iLCJhYnJyZXZpYXRlTGFiZWxzKCk7XG5qUXVlcnkoJy50ZXh0U2l6ZSAjZm9udC1zaXplLXVwJykuY2xpY2soIGZ1bmN0aW9uKCkge1xuICAgIHZhciB0YXJnZXQgPSBqUXVlcnkodGhpcykucGFyZW50KCkucGFyZW50KCk7XG4gICAgdmFyIGN1cnJTaXplID0gcGFyc2VJbnQoalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScpLnNwbGl0KFwicHhcIilbMF0pO1xuICAgIC8vIGN1cnJTaXplID0gTWF0aC5yb3VuZChjdXJyU2l6ZSk7XG4gICAgdmFyIG5ld1NpemUgPSBjdXJyU2l6ZSszO1xuICAgIGlmIChuZXdTaXplID4gMjQpe1xuICAgICAgICBuZXdTaXplID0gMjQ7XG4gICAgfVxuICAgIHZhciBuZXdFbXMgPSAobmV3U2l6ZS8xNik7XG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScsbmV3RW1zKydlbScpO1xuICAgIGFicnJldmlhdGVMYWJlbHMoKTtcbn0pXG5cbmpRdWVyeSgnLnRleHRTaXplICNmb250LXNpemUtZG93bicpLmNsaWNrKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFyZ2V0ID0galF1ZXJ5KHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xuICAgIHZhciBjdXJyU2l6ZSA9IHBhcnNlSW50KGpRdWVyeSh0YXJnZXQpLmNzcygnZm9udFNpemUnKS5zcGxpdChcInB4XCIpWzBdKTtcbiAgICB2YXIgbmV3U2l6ZSA9IGN1cnJTaXplLTM7XG4gICAgaWYgKG5ld1NpemUgPCA5KXtcbiAgICAgICAgbmV3U2l6ZSA9IDk7XG4gICAgfVxuICAgIHZhciBuZXdFbXMgPSAobmV3U2l6ZS8xNik7XG4gICAgalF1ZXJ5KHRhcmdldCkuY3NzKCdmb250U2l6ZScsbmV3RW1zKydlbScpO1xuICAgIGFicnJldmlhdGVMYWJlbHMoKTtcbn0pXG4iLCIvL3RoZW1lc1xudmFyIGJ1dHRvbk9wdGlvbnMgPSBbJ2RlZmF1bHQnLCAnd29ybicsICdsaWdodCcsICdibGFjaycsICdncmF5JywgJ3JlZCddO1xualF1ZXJ5KGJ1dHRvbk9wdGlvbnMpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIG15U3R5bGUgPSB0aGlzO1xuICAgIHZhciBteUlkID0gJyMnICsgbXlTdHlsZTtcbiAgICBqUXVlcnkobXlJZCkub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQXR0cignY2xhc3MnKTtcbiAgICAgICAgalF1ZXJ5KCdib2R5JykuYWRkQ2xhc3MoJ3RoZW1lLScgKyBteVN0eWxlKTtcbiAgICB9KVxufSlcbiJdfQ==

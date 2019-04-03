var profB = jQuery('#profBonus').val();
somethingClever();

jQuery('#profBonus').on("keyup", function() {
    profB = jQuery('#profBonus').val();
    somethingClever();
});

function somethingClever() {
    jQuery('.icon-prof').each(function() {
        var classes = ['icon-prof off', 'icon-prof on', 'icon-prof doubled'];
        var currentClass = jQuery(this).attr('class');
        var currentPos = jQuery.inArray(currentClass, classes);
        var myProf = jQuery(this).parent().children('.profVal');
        updateProf(jQuery(myProf), currentPos);
    });
}

function updateProf(myProf, myProfSkillFlag) {
    console.log(myProf + ":" + myProfSkillFlag);
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
    var classes = ['icon-prof off', 'icon-prof on', 'icon-prof doubled'];
    var currentClass = jQuery(this).attr('class');
    var currentPos = jQuery.inArray(currentClass, classes);
    var newPos = ((currentPos + 1) % classes.length);
    var newClass = classes[newPos];
    jQuery(this).attr('class', newClass);
    var myProf = jQuery(this).parent().children('.profVal');
    updateProf(jQuery(myProf), newPos);
});

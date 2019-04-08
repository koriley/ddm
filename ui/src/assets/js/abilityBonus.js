
function updateAbilityBonus(myAbility) {
    var ability = jQuery(myAbility).val();

    var modifier = jQuery(myAbility).parent().children('.modifier-bubble').text();
    if (!jQuery.isNumeric(ability)) {
        ability = 1;
        jQuery(myAbility).val(ability);
    }

    modifier = Math.floor((ability - 10) / 2);
    jQuery(myAbility).parent().children('.modifier-bubble').text(modifier);
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

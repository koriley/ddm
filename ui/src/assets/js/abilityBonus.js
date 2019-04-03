// jQuery(".ability").each(function () {
//     jQuery(this).on("focus", function () {
//         jQuery(this).select();
//     })
//     $(this).on("keyup", function () {
//         var ability = $(this).val();
//         var modifier = $(this).closest('.ability-box').children('.badge').text();
//         if (!$.isNumeric(ability)) {
//             ability = 1;
//             $(this).val(ability);
//         }
//         //     if (ability < 1) {
//         //         ability = 1;
//         //         $(this).val(ability);
//         //     }
//         //     if (ability > 30) {
//         //         ability = 30;
//         //         $(this).val(ability);
//         //     }
//
//         modifier = Math.floor((ability - 10) / 2)
//         $(this).closest('.ability-box').children('.badge').text(modifier);
//     });
// });


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

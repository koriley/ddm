var thisAbility = "";
var thisAbilityBonus = "";

function callAbility(ability) {
    thisAbility = jQuery('.ability-box #'+ability).val();
    thisAbilityBonus = parseInt(jQuery('.ability-box #'+ability+'-Bonus').text());
}

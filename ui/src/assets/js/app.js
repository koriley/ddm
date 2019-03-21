import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();


$('.ability-box input').blur(function() {
    var ability = $(this).val();
    var modifier = $(this).closest('.ability-box').children('.badge').text();
    if (!$.isNumeric(ability)) {
        ability = 1;
        $(this).val(ability);
    }
    if (ability < 1) {
        ability = 1;
        $(this).val(ability);
    }
    if (ability > 30) {
        ability = 30;
        $(this).val(ability);
    }
    if (ability == 1) {
        modifier = '-5';
    }
    if (ability == 2 || ability == 3) {
        modifier = '-4';
    }
    if (ability == 4 || ability == 5) {
            modifier = '-3';
    }
    if (ability == 6 || ability == 7) {
            modifier = '-2';
    }
    if (ability == 8 || ability == 9) {
            modifier = '-1';
    }
    if (ability == 10 || ability == 11) {
            modifier = '0';
    }
    if (ability == 12 || ability == 13) {
            modifier = '+1';
    }
    if (ability == 14 || ability == 15) {
            modifier = '+2';
    }
    if (ability == 16 || ability == 17) {
            modifier = '+3';
    }
    if (ability == 18 || ability == 19) {
            modifier = '+4';
    }
    if (ability == 20 || ability == 21) {
            modifier = '+5';
    }
    if (ability == 22 || ability == 23) {
            modifier = '+6';
    }
    if (ability == 24 || ability == 25) {
            modifier = '+7';
    }
    if (ability == 26 || ability == 27) {
            modifier = '+8';
    }
    if (ability == 28 || ability == 29) {
            modifier = '+9';
    }
    if (ability == 30) {
            modifier = '+10';
    }

    $(this).closest('.ability-box').children('.badge').text(modifier);
});

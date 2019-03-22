import $ from 'jquery';
import libs from './lib/dependencies';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
// window.libs = libs
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


$(document).foundation();

jQuery(".ability").each(function(){
        jQuery(this).on("focus", function(){
                jQuery(this).select();
        })
        $(this).on("keyup", function() {
                var ability = $(this).val();
                var modifier = $(this).closest('.ability-box').children('.badge').text();
                if (!$.isNumeric(ability)) {
                    ability = 1;
                    $(this).val(ability);
                }
            //     if (ability < 1) {
            //         ability = 1;
            //         $(this).val(ability);
            //     }
            //     if (ability > 30) {
            //         ability = 30;
            //         $(this).val(ability);
            //     }
            
               modifier = Math.floor((ability - 10)/2)
                $(this).closest('.ability-box').children('.badge').text(modifier);
            });
});

jQuery( function() {
    jQuery( ".drag" ).draggable();
  } );
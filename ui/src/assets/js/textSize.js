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

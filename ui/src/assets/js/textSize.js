jQuery('.textSize #font-size-reset').click( function() {
    var target = jQuery(this).parent().parent();
    jQuery(target).css('fontSize','1em');
    abrreviateLabels();
})

jQuery('.textSize #font-size-up').click( function() {
    var target = jQuery(this).parent().parent();
    var currEms = Math.round(jQuery(target).css('fontSize').split("px")[0]/16);
    var newSize = currEms+0.1;
    if (newSize > 1.5){
        newSize = 1.5;
    }
    console.log(currEms+':'+newSize);
    jQuery(target).css('fontSize',newSize+'em');
    abrreviateLabels();
})

jQuery('.textSize #font-size-down').click( function() {
    var target = jQuery(this).parent().parent();
    var currEms = jQuery(target).css('fontSize').split("px")[0]/16;
    var newSize = currEms-0.1;
    if (newSize < 0.5){
        newSize = 0.5;
    }
    console.log(currEms+':'+newSize);
    jQuery(target).css('fontSize',newSize+'em');
    abrreviateLabels();
})

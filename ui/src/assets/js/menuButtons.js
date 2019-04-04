
jQuery(".close").click(function(){
    jQuery(this).parent().toggle();
})
jQuery(".menu .players-btn").click(function(){
    jQuery(".charSheet").toggle();
    clearTop();
    jQuery(".charSheet").addClass("onTop");
})

jQuery(".menu .library-btn").click(function(){
    jQuery(".library-container").toggle();
    clearTop();
    jQuery(".library-container").addClass("onTop");
})

jQuery(".menu .themes-btn").click(function(){
    jQuery(".themes-container").toggle();
})

jQuery(".menu .attribution-btn").click(function(){
    jQuery(".attribution-container").toggle();
    clearTop();
    jQuery(".attribution-container").addClass("onTop");
})

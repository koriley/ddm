



jQuery(".drag").on("mousedown", function(){
    jQuery(".drag").each(function(){
        jQuery(this).removeClass("onTop");
    });
    jQuery(this).addClass("onTop");
})


jQuery(".close").click(function () {
    jQuery(this).parent().toggle();
})
jQuery(".menu button").click(function () {
    var openMe = jQuery(this).attr("data-open");
    jQuery("." + openMe).toggle();
    clearTop();
    jQuery("." + openMe).addClass("onTop");
});

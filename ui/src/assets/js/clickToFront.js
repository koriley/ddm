function clearTop() {
    jQuery(".drag").each(function() {
        jQuery(this).removeClass("onTop");
    });
};

jQuery(".drag").on("mousedown", function() {
    clearTop();
    jQuery(this).addClass("onTop");
});

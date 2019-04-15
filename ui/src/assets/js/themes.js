//themes
var buttonOptions = ['default', 'worn', 'light', 'black', 'gray', 'red'];
jQuery(buttonOptions).each(function() {
    var myStyle = this;
    var myId = '#' + myStyle;
    jQuery(myId).on("click", function() {
        $("body").removeAttr('class');
        jQuery('body').addClass('theme-' + myStyle);
    })
})

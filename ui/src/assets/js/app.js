jQuery("document").ready(function() {
    jQuery(".drag").draggable({
        containment: ".mainView",
        scroll: false
    });

    jQuery( ".resize" ).resizable({
        containment: ".mainView",
        autoHide: true,
        distance: 1,
        handles: 'se'
    });

    passivePerception();
});

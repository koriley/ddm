jQuery("document").ready(function () {
    jQuery(".ability").each(function () {
        jQuery(this).on("focus", function () {
            jQuery(this).select();
        })
        $(this).on("keyup", function () {
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

            modifier = Math.floor((ability - 10) / 2)
            $(this).closest('.ability-box').children('.badge').text(modifier);
        });
    });

    jQuery(function () {
        jQuery(".drag").draggable();
    });
})
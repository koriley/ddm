function abrreviateLabels() {
    var abbrWords = ['Speed|Spd','Initiative|Init ','Temporary |Temp ','Hit Points|HP','Armor Class|AC'];
    var mySize = jQuery('.charSheet').css('font-size');
    mySize = parseInt(mySize.split('px')[0]);
    // console.log(mySize);
    if (mySize<15) {
        jQuery('.stat label').each( function(index, label) {
            jQuery(abbrWords).each( function(index, word) {
                var long = word.split('|')[0];
                var short = word.split('|')[1];
                jQuery(label).text(function(index, text) {
                    return text.replace(long, short);
                });
            });
        })
    } else {
        jQuery('.stat label').each( function(index, label) {
            jQuery(abbrWords).each( function(index, word) {
                var long = word.split('|')[0];
                var short = word.split('|')[1];
                jQuery(label).text(function(index, text) {
                    return text.replace(short, long);
                });
            });
        })
    }
}

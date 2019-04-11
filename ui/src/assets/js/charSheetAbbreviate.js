function abrreviateLabels() {
    var abbrWords = ['Speed|SPD','Initiative|INIT','Temporary|TEMP','Hit Points|HP','Armor Class|AC','Maximum|MAX','Current|CRNT','Experience Points|XP'];
    var mySize = jQuery('.charSheet').css('font-size');
    mySize = parseInt(mySize.split('px')[0]);
    // console.log(mySize);
    if (mySize<16) {
        jQuery('label').each( function(index, label) {
            jQuery(abbrWords).each( function(index, word) {
                var long = word.split('|')[0];
                var short = word.split('|')[1];
                jQuery(label).text(function(index, text) {
                    return text.replace(long, short);
                });
            });
        })
    } else {
        jQuery('label').each( function(index, label) {
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

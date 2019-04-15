jQuery('#classManager').hide();

var getLabel = jQuery('.charSheet #classMore').html();
console.log(getLabel);
getLabel = getLabel+'<div style="text-align:right; display:inline-block; width:10em;">hello!</div>';
console.log(getLabel);
jQuery('.charSheet #classMore').html(getLabel);

// <svg><use xlink:href="#downAngle"></use></svg>

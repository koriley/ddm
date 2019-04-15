jQuery(".deathSaves").on("click", ".icon", function() {
  jQuery(this).toggleClass('active');
});
jQuery(".deathSaves").on("click", ".reaper", function() {
  jQuery(".icon").removeClass('active');
});

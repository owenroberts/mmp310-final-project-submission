var $sun = $('.sun');
var $win = $(window);

$win.on('scroll', function () {
  console.log('$win.scrolling')
  var top = $win.scrollTop() / 3;
  $sun.css('transform', 'rotate(' + top + 'deg)');
});

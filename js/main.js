$(".animsition").animsition({
  inClass: 'fade-in-right-lg',
  outClass: 'fade-out-right-lg',
  linkElement: 'header a',
  inDuration: 1000,
  outDuration: 500
});

$(".header").sticky();

// Lightbox

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');

// Add image to overlay
$overlay.append($image);

// A caption
$overlay.append($caption);



// Capture the click event on a link to an image
$('.lb').click(function(event) {
  event.preventDefault();
  var imageLocation = $(this).attr('href');
  var caption = $(this).first().attr('alt');

  //Update overlay with the image linked in the link
  $image.attr('src', imageLocation);
  $
   //Show the overlay.
   // Add overlay

  $overlay.show();

  // Get child's alt attribute and set caption
  // var captionText = $(this).children('img').attr('alt');
  // $caption.text(captionText);
});

// When overlay is clicked
$overlay.click(function() {
  //Hide the overlay
  $(this).hide();
});

 $('body').append($overlay);

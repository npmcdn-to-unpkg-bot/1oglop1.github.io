// $(function() {
//     $('nav').on('click', '.page-scroll a', function(event) {
//         var anchor = $(this);
//         console.log(anchor);
//         $('html, body').stop().animate({
//             scrollTop: $(anchor.attr('href')).offset().top
//         }, 1500, 'easeInOutExpo');
//         event.preventDefault();
//     });
// });

 //$('a[href*="#"]:not([href="#"])').click(function() {
// smooth scrolling
$(function() {
  $('a[href*="#"]').not('a[href="#"], a[class*="carousel"]').click(function () {
  //$('a[class="page-scroll"]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      if (target.length) {
          var nav_height=$('nav').height();

        $('html, body').animate({
          scrollTop: target.offset().top - nav_height
        }, 700);
        return false;
      }
    }
  });
});


// document.onmousemove = function(e){
// var x = e.pageX;
// var y = e.pageY;
// e.target.title = "X is "+x+" and Y is "+y;
// };
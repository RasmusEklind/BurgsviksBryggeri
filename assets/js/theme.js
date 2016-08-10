jQuery(document).ready(function() {

var $content = $('header .header')
  , $blur    = $('header .overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});

window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {

  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  },

  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;

    var slowScroll = currentScrollY / 4
      , blurScroll = currentScrollY * 2;

    $content.css({
      'transform'         : 'translateY(-' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(-' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(-' + slowScroll + 'px)'
    });

    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};

var scroller = new Scroller();
scroller.init();

$(document).ready(function() {

    $(window).scroll( function(){

        $('.fadein').each( function(i){

            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},1000);


            }

        });

    });

});
});

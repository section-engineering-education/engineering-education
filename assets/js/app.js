AOS.init({
  once: true
});

var app = (function() {

  function init() {
    $(document).ready(function() {
      navDrop();
      removeLsep();
      var observer = lozad('.lozad', {
        rootMargin: '200px 0px',
        threshold: 0.1
      });
      observer.observe();
    });
  }

  function removeLsep() {
    $("body").children().each(function() {
      $(this).html().replace(/&#8232;/g," ");
    });
  }

  function navDrop() {

    $(document).ready(function(){
      $("li.has-mega-dropdown").mouseenter(function(){
        $(".section-mega-wrapper").scrollTop(0);
      });
    });

    const $body = $("body");
    const $html = $("html");
    const $dropdownTrigger = $(".section-nav-mobile-dropdown");
    const $dropdownTriggerMega = $(".drop-mega");
    const $mobileTriggerList = $(".section-mega-mobile-trigger");
    const $mobileMegaDrop = $(".section-mega-mobile");
    const $mobileMegaLists = $(".section-mega-mobile-lists");
    const $open = $(".section-nav-triggers-show");
    const $close = $(".section-nav-triggers-close");
    const $mobileNav = $(".section-nav-mobile");
    const $mobileNavDrop = $(".pointer-object");
    const $pointer = $(".pointer-object-mobile");
    const $mobileNavSub = $(".section-nav-mobile-drop");
    const $scrollDrop = $("li.has-mega-dropdown");
    const $megaDrop = $(".section-mega-wrapper");
    const $closeMega = $(".close-mega");

    // Mobile nav toggles
    $open.on("click", function() {
      if (!$mobileNav.hasClass("-open")) {
        $mobileNav.addClass("-open");
        $open.removeClass("-show");
        $open.addClass("-hide");
        $close.addClass("-show");
        $close.removeClass("-hide");
        $close.focus();
        $body.addClass("-nav-open");
        $html.addClass("-nav-open");
      }
    });

    $close.on("click", function() {
      if ($mobileNav.hasClass("-open")) {
        $mobileNav.removeClass("-open");
        $open.addClass("-show");
        $open.removeClass("-hide");
        $close.removeClass("-show");
        $close.addClass("-hide");
        $body.removeClass("-nav-open");
        $html.removeClass("-nav-open");
      }
    });

    var navTimeout;

    $scrollDrop.hover(function() {
      clearTimeout(navTimeout);
      setTimeout(function() {
        $body.addClass("toggle-scroll");
        $megaDrop.removeClass("remove-mega-menu");
      }, 150);
    },
    function() {
      $megaDrop.addClass("remove-mega-menu");
      $body.removeClass("toggle-scroll");
    });

    // Close Mega
    $closeMega.click(function() {
      $megaDrop.addClass("remove-mega-menu");
    });

    $dropdownTrigger.click(function() {
      $(this).next("ul.section-nav-mobile-drop").toggleClass("-open");
    });

    // Mega Dropdown Mobile
    $dropdownTriggerMega.click(function() {
      $(this).next(".section-mega-mobile").toggleClass("-open");
    });

    // Flip arrow on First Level Dropdowns - shown on Green
    $mobileNavDrop.click(function() {
      $(this).toggleClass("-flip");
    });

    // Mega Dropdown Internal Dropdowns
    $mobileTriggerList.click(function() {
      $(this).next(".section-mega-mobile-lists").toggleClass("-open");
      $(this).children(".pointer-object-mobile").toggleClass("-flip");
    });


    $(window).on("resize", function() {
    if ( $(window).height() < 680) {
      $megaDrop.addClass("-expanded");
    } else {
      $megaDrop.removeClass("-expanded");
    }
    }).resize();


    $(window).on("resize", function() {
      if ($(window).innerWidth() > 768) {
        $mobileNav.removeClass("-open");
        $mobileNavDrop.removeClass("-flip");
        $pointer.removeClass("-flip");
        $mobileMegaLists.removeClass("-open");
        $mobileMegaDrop.removeClass("-open");
        $mobileNavSub.removeClass("-open");
        $open.removeClass("-hide");
        $body.removeClass("-nav-open");
        $html.removeClass("-nav-open");
      }
    });
  }

  // jQuery function to randomize the slick slider slides on refresh.
  $.fn.randomize = function (selector) {
    let $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function () {
      $(this).children(selector).sort(function (childA, childB) {
        // * Prevent last slide from being reordered
        if($(childB).index() !== $(this).children(selector).length - 1) {
          return Math.round(Math.random()) - 0.5;
        }
      }).detach().appendTo(this);
    });

    return this;
  };

  $('.testimonials-slider').randomize().slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    prevArrow: "<div class='prev'><img src='/engineering-education/images/right-chevron-icon.png' alt='Previous Testimonial'></div>",
    nextArrow: "<div class='next'><img src='/engineering-education/images/right-chevron-icon.png' alt='Next Testimonial'></div>",
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  });

  return {
    start: init
  };
})();

app.start();

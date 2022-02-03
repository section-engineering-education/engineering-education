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

  return {
    start: init
  };
})();

app.start();

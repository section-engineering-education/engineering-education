AOS.init({
  once: true
});

var app = (function() {

  var asciinemaEmbed = document.getElementById('asciinemaEmbed');

  function init() {
    $(document).ready(function() {
      navDrop();
      spreadTabs();
      testimonialInit();
      removeLsep();
      newsletterActive();
      // searchActive();
      asciinemaPlayerWatch();
      scrollEvents();

      var observer = lozad('.lozad', {
        rootMargin: '200px 0px',
        threshold: 0.1
      });
      observer.observe();
    });
  }

  // function searchActive() {
  //   if ($('#blogSearch').length) {
  //     var $input = $('#blogSearch');

  //     $input.focus(function() {
  //       $(this).parents('form').find('[type="submit"]').addClass('-active');
  //     });

  //     $input.blur(function() {
  //       if (!$(this).val().length) {
  //         $(this).parents('form').find('[type="submit"]').removeClass('-active');
  //       }
  //     });
  //   }
  // }

  function newsletterActive() {
    if ($(".section-form-footer #mce-EMAIL").length) {
      var $input = $(".section-form-footer #mce-EMAIL");

      $input.focus(function() {
        $(this).parents('form').find('input[type="submit"]').addClass('-active');
      });

      $input.blur(function() {
        $(this).parents('form').find('input[type="submit"]').removeClass('-active');
      });
    }
  }

  function testimonialInit() {
    var $testimonials = $(".testimonial-slider");
    var $testimonials_nav = $(".testimonial-nav");

    if ($testimonials.length) {
      $testimonials.slick({
        arrows: true,
        prevArrow:"<div class='arrow-left'></div>",
        nextArrow:"<div class='arrow-right'></div>",

        adaptiveHeight: true,
        infinite: false,
        dots: false,
        // appendDots: '.testimonial-nav',
        asNavFor: '.testimonial-nav',

        prevArrow:"<div class='arrow-left'></div>",
        nextArrow:"<div class='arrow-right'></div>",

        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              arrows: false
            }
          }
        ]
      });
    }

    if ($testimonials_nav.length) {

      $testimonials_nav.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        infinite: false,
        focusOnSelect: true,
        asNavFor: '.testimonial-slider',
      });
    }
  }

  function scrollEvents() {
    asciinemaPlayerWatch();

    $(window).scroll(function() {
      asciinemaPlayerWatch();
    });
  }

  function asciinemaPlayerWatch() {
    if (!!asciinemaEmbed) {

      if (isInViewport(asciinemaEmbed)) {
        asciinemaEmbed.play();
      } else {
        asciinemaEmbed.pause();
      }
    }
  }

  function spreadTabs() {
    const $tabsItems = $(".section-spread-block-content-inner-tabs li");
    const $tabsContent = $(".tab-img");

    $tabsItems.click(function(){
      var tabID = $(this).attr('data-tab');

      $tabsItems.removeClass('current');
      $tabsContent.removeClass('current');

      $(this).addClass('current');
      $("#"+tabID).addClass('current');
    })
  }

  function isMobile() {
    var isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
    return isMobile;
  }

  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.top >= -100 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight + 200 || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  };

  // function navScroll() {
  //   const $window = $(window);
  //   const $header = $(".section-nav");

  //   if ($header.length) {
  //     $window.scroll(function () {
  //       var scroll = $window.scrollTop();
  //       if (scroll >= 80) {
  //         $header.css("border-bottom", "1px solid #eee");
  //       } else {
  //         $header.css("border-bottom", "1px solid transparent");
  //       }
  //     });
  //   }
  // }

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
    const $mainNav = $("nav.section-nav");
    const $mobileNav = $(".section-nav-mobile");
    const $subNavs = $(".section-nav-mobile ul li ul");
    const $mobileNavDrop = $(".pointer-object");
    const $pointer = $(".pointer-object-mobile");
    const $pointerWrapper = $(".pointer-wrapper");
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

  function removeLsep() {
    $("body").children().each(function() {
      $(this).html().replace(/&#8232;/g," ");
    });
  }

  return {
    start: init
  };
})();

app.start();

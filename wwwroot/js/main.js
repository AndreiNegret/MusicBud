/*global jQuery */
(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        /*---------------------------------
         All Window Scroll Function Start
        --------------------------------- */
        $(window).scroll(function () {

            // Header Fix Js Here
            if ($(window).scrollTop() >= 200) {
                $('#header-area').addClass('fixTotop');
            } else {
                $('#header-area').removeClass('fixTotop');
            }

            // Scroll top Js Here
            if ($(window).scrollTop() >= 400) {
                $('.scroll-top').slideDown(400);
            } else {
                $('.scroll-top').slideUp(400);
            }
        });
        /*--------------------------------
            All Window Scroll Function End
        --------------------------------- */
    });
    // Click to Scroll TOP
    $(".scroll-top").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500);
    }); //Scroll TOP End


    setTimeout(function () {
        $('.preloader-spinner').delay(150).fadeOut('slow');
        $('.preloader').fadeOut('slow');
        $('body').removeClass('loader-active');
    }, 1500);

}(jQuery));
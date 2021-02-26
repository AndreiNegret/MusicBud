/*global jQuery */
(function ($) {
    "use strict";

        // Click to Scroll TOP
        $(".scroll-top").click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 1500);
        }); //Scroll TOP End


   /*jQuery(window).load(function () {
        jQuery('.preloader').fadeOut();
        jQuery('.preloader-spinner').delay(350).fadeOut('slow');
        jQuery('body').removeClass('loader-active');
    }); //window load End */

    setTimeout(function () {
        $('.preloader-spinner').delay(150).fadeOut('slow');
        $('.preloader').fadeOut('slow');
        $('body').removeClass('loader-active');
    }, 2000);

}(jQuery));



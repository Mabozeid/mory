/*jslint browser: true*/
/*global $, console, window*/

$(document).ready(function () {
    'use strict';

    var win = $(window),
            navbar = $('.navbar');




    /*========== Start Navbar Auto Change  ==========*/
    win.on('scroll', function () {
        if (win.scrollTop() > 50) {
            navbar.addClass('scroll').removeClass('fixed-top');
        } else {
            navbar.addClass('fixed-top').removeClass('scroll');
        }
    });

// Sync Navbar Links With Section
    $('body').scrollspy({
        target: '#navtoggler',
        offset: 82
    });

    /*========== Start Scroll For Navigation Menu ==========*/
    navbar.on('click', 'a', function (e) {
        e.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 82
        }, 1000);
    });

//// COLLAPSED MENU CLOSE ON CLICK
    navbar.on('click', '.navbar-collapse', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

    /*========== Start Counter To Js Statistics   ==========*/

    win.on('scroll.statistics', function () {
        var stat = $('.statistics');
        if ($(this).scrollTop() >= stat.offset().top - win.height() + 220) {
            $('.count').countTo();
            win.off('scroll.statistics');
        }
    });


// start owl-carousel
    $(document).ready(function () {
        $("#partners,#testimonial-carousel").owlCarousel();
    });
    $('#partners').owlCarousel({
        loop: true,
        merge: true,
        margin: 30,
        smartSpeed: 1000,
        autoplay: 2000,
        dots: false,
        responsive: {
            0: {
                items: 2
            },
            768: {
                items: 3
            },
            1000: {
                items: 5
            }
        }

    })

    $('#testimonial-carousel').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'flipInX',
        stagePadding: 30,
        smartSpeed: 450,
        loop: true,
        nav: true,
        navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
        items: 1,
        margin: 10,
        autoplay: false,
        dots: false,
        merge: true

    })
});

/*------------ start isotope  ---------*/

$(window).on('load', function () {
    $('.portfolio-item').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.work-img',
    });
});
$(document).on('click', '.featured-work li', function () {
    $('.featured-work li').removeClass('active');
    $(this).addClass('active');
    var selector = $(this).attr('data-filter');
    $('.portfolio-item').isotope({
        filter: selector});
    return false;
});

/*------------ end isotope  -----------*/


/*-----------  Start magnificPopup  js  ---------*/
$(document).ready(function () {
    $('.work-img').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });
});
/*-----------  End magnificPopup  js  ---------*/


/*-----------  strat Progress Bar  js  ---------*/


// start animated Progress bar //

$(document).ready(function () {
    'use strict';

// start animated Progress bar //

function animateProgressBar() {
    $('.skills-bar .skills .gragh').each(function () {
        var percent = $(this).data('percent');
        $(this).css({
            height: percent + '%'
        },function() { $('.percent').fadeIn(3000);});
    });
}

$(window).on('scroll', function () {
    if ($(window).scrollTop() > $('.about').offset().top + 200) {
        animateProgressBar();
    }
});
if ($(window).scrollTop() > $('.about').offset().top + 200) {
    animateProgressBar();
}
});
// end animated progress  bar //

/*-----------  End Progress Bar  js  ---------*/

/* ------ start Tilt Plugin in Team Section ---------*/

if ($(".about").length) {

    $(".about .about-img").tilt({
        maxTilt: 10,
        speed: 500
    });
}

/* ------ end Tilt Plugin in Team Section ---------*/

/*-----------  strat Pre-loader  ---------*/
$(window).on('load', function () {
    $(".overlay-loading").fadeOut(2000);
});
/*-----------  End Pre-loader   ---------*/


/*-----------  start scroll-up  ---------*/

$(window).on('scroll', function () {
    var scrolltop = $(".scroll-top");
    if ($(window).scrollTop() >= 1000) {
        scrolltop.fadeIn(400);

    } else {
        scrolltop.fadeOut(400);
    }
});
// Back To 0 Scroll Top body
var scrolltop = $(".scroll-top");
scrolltop.on('click', function () {
    $("html, body").animate({
        scrollTop: 0
    }, 1000);
});



/*-----------  end scroll-up  ---------*/

//var mohamedelsayedcontactformflag;
jQuery(document).ready(function () {
    jQuery("form#contact-form").submit(function (e) {
        e.preventDefault();
        validate_contact_us_form();
    });
    jQuery("#contact-form input, #contact-form textarea").on("change paste keyup", function () {
        validate_required_input(jQuery(this));
    });
});

function validate_contact_us_form() {
    var custom_form_error = 0;
    var focused = 0;
    jQuery('#contact-form input, #contact-form textarea').each(function () {
        validate_required_input(jQuery(this));
    });
    jQuery('#contact-form input, #contact-form textarea').each(function () {
        if (jQuery(this).hasClass('error')) {
            custom_form_error = 1;
            if (focused == 0) {
                focused = 1;
                jQuery(this).focus();
            }
        }
    });
//    console.log(custom_form_error);
//    if (mohamedelsayedcontactformflag == 1) {
    if (custom_form_error === 0) {
        jQuery.ajax({
            url: 'contact_form.php',
            type: 'POST',
            data: jQuery('form#contact-form').serialize(),
            async: false,
            beforeSend: function () {
                jQuery('#sendmessage').hide();
                jQuery('#errormessage').hide();
                jQuery('#sendmail_ajaxLoading').show();
            },
            success: function (result) {
//                error = result.error;
                error = result;
                jQuery('#sendmail_ajaxLoading').hide();
                if (error == 0) {
                    jQuery('#sendmessage').show();
                    setTimeout(function(){
                         jQuery('#sendmessage').hide();
                         },5000);
                } else {
                    jQuery('#errormessage').show();
                    setTimeout(function(){
                        jQuery('#sendmessage').hide();
                        },5000);
                }
                jQuery("form#contact-form")[0].reset();
            }
        });
    }
//    } else {
//        return false;
//    }
}
function validate_required_input(obj) {
    var val = obj.val();
    var input_name = obj.attr('name');
    var error = 0;
    if (jQuery.trim(val).length !== 0) {
        error = 0;
    } else {
        error = 1;
    }
    if (input_name == 'email') {
        if (!isValidEmailAddress(val)) {
            error = 1;
        } else {
            error = 0;
        }
    }
    if (error == 0) {
        if (obj.hasClass('error')) {
            obj.removeClass("error");
        }
    } else {
        if (!(obj.hasClass('error'))) {
            obj.addClass("error");
        }
    }
}
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


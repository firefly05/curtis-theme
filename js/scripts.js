$(document).foundation();


jQuery(document).ready(function ($){
        
    /**
    *
    * automatically size height of header to height of window
    *
    **/

    var wheight = $(window).height();
    var wwidth = $(window).width();
    var cardHeight = $('.header-cards').height();
    var dtop = (wheight/2) - (cardHeight);
    if(wwidth >= 640 ) {// if it is a large screen
        $('.header').height(wheight); //make header full-screen
        $('.header').css('padding-top',dtop);
    }

    /**
    *
    * slick slider
    *
    **/
    $('.gallery').slick({
        slide:"img",
        autoplay:true,
        speed:2000,
        pauseOnHover:true,
        fade:true
    });


    /**
     *
     * Show and position portfolio details
     *
     * - shows the portfolio detials fo rthe clicked item
     *
     */
    $('.show-details').click(function(e){
        e.preventDefault();
        var windowID = $(this).data('window-id');
        $('.the-details[data-window="' + windowID +'"]').removeClass('hide').addClass('show-details-window');
    });


});
$(document).foundation();


jQuery(document).ready(function ($){

        
        var wwidth = $(window).width();
    /**
    *
    * automatically size height of header to height of window
    *
    **/
    function match_window_height(){
        var wheight = $(window).height();
        var cardHeight = $('.header-cards').height();
        var dtop = (wheight/2) - (cardHeight);
            $('.header').height(wheight); //make header full-screen
            $('.header').css('padding-top',dtop);

            // align footer to bottom of screen
            $('.footer').css('bottom','0');
    }
    /**
     *
     * Resize height of content area to match screen on load
     * and when the window is resized
     *
     */
        if(wwidth >= 640 ) {// if it is a large screen
            match_window_height();
        }
    
    $(window).resize(function(){
        if(wwidth >= 640 ) {// if it is a large screen
            match_window_height();
        }
    });

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
        $('.the-details').addClass('hide');
        $('.the-details[data-window="' + windowID +'"]').removeClass('hide').css('height', '300px');
    });


});
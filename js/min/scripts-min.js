$(document).foundation(),jQuery(document).ready(function($){function e(){var e=$(window).height(),a=$(".header-cards").height(),d=e/2-a;$(".header").height(e),$(".header").css("padding-top",d),$(".footer").css("bottom","0")}var a=$(window).width();a>=640&&e(),$(window).resize(function(){a>=640&&e()}),$(".gallery").slick({slide:"img",autoplay:!0,speed:2e3,pauseOnHover:!0,fade:!0}),$(".show-details").click(function(e){e.preventDefault();var a=$(this).data("window-id");$(".the-details").addClass("hide"),$('.the-details[data-window="'+a+'"]').removeClass("hide").css("height","320px"),$(".card").removeClass("active"),$('.card[data-card-id="'+a+'"]').addClass("active")}),$(".close").click(function(e){e.preventDefault(),$(".the-details").addClass("hide")})});
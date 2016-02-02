(function(e,t,n,r){"use strict";var i=i||!1;Foundation.libs.joyride={name:"joyride",version:"5.4.7",defaults:{expose:!1,modal:!0,keyboard:!0,tip_location:"bottom",nub_position:"auto",scroll_speed:1500,scroll_animation:"linear",timer:0,start_timer_on_click:!0,start_offset:0,next_button:!0,prev_button:!0,tip_animation:"fade",pause_after:[],exposed:[],tip_animation_fade_speed:300,cookie_monster:!1,cookie_name:"joyride",cookie_domain:!1,cookie_expires:365,tip_container:"body",abort_on_close:!0,tip_location_patterns:{top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},post_ride_callback:function(){},post_step_callback:function(){},pre_step_callback:function(){},pre_ride_callback:function(){},post_expose_callback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',prev_button:'<a href="#" class="small button joyride-prev-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',expose_cover:'<div class="joyride-expose-cover"></div>'},expose_add_class:""},init:function(t,n,r){Foundation.inherit(this,"throttle random_str");this.settings=this.settings||e.extend({},this.defaults,r||n);this.bindings(n,r)},go_next:function(){if(this.settings.$li.next().length<1)this.end();else if(this.settings.timer>0){clearTimeout(this.settings.automate);this.hide();this.show();this.startTimer()}else{this.hide();this.show()}},go_prev:function(){if(!(this.settings.$li.prev().length<1))if(this.settings.timer>0){clearTimeout(this.settings.automate);this.hide();this.show(null,!0);this.startTimer()}else{this.hide();this.show(null,!0)}},events:function(){var n=this;e(this.scope).off(".joyride").on("click.fndtn.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault();this.go_next()}.bind(this)).on("click.fndtn.joyride",".joyride-prev-tip",function(e){e.preventDefault();this.go_prev()}.bind(this)).on("click.fndtn.joyride",".joyride-close-tip",function(e){e.preventDefault();this.end(this.settings.abort_on_close)}.bind(this)).on("keyup.fndtn.joyride",function(e){if(!this.settings.keyboard||!this.settings.riding)return;switch(e.which){case 39:e.preventDefault();this.go_next();break;case 37:e.preventDefault();this.go_prev();break;case 27:e.preventDefault();this.end(this.settings.abort_on_close)}}.bind(this));e(t).off(".joyride").on("resize.fndtn.joyride",n.throttle(function(){if(e("["+n.attr_name()+"]").length>0&&n.settings.$next_tip&&n.settings.riding){if(n.settings.exposed.length>0){var t=e(n.settings.exposed);t.each(function(){var t=e(this);n.un_expose(t);n.expose(t)})}n.is_phone()?n.pos_phone():n.pos_default(!1)}},100))},start:function(){var t=this,n=e("["+this.attr_name()+"]",this.scope),r=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],i=r.length;if(!n.length>0)return;this.settings.init||this.events();this.settings=n.data(this.attr_name(!0)+"-init");this.settings.$content_el=n;this.settings.$body=e(this.settings.tip_container);this.settings.body_offset=e(this.settings.tip_container).position();this.settings.$tip_content=this.settings.$content_el.find("> li");this.settings.paused=!1;this.settings.attempts=0;this.settings.riding=!0;typeof e.cookie!="function"&&(this.settings.cookie_monster=!1);if(!this.settings.cookie_monster||this.settings.cookie_monster&&!e.cookie(this.settings.cookie_name)){this.settings.$tip_content.each(function(n){var s=e(this);this.settings=e.extend({},t.defaults,t.data_options(s));var o=i;while(o--)t.settings[r[o]]=parseInt(t.settings[r[o]],10);t.create({$li:s,index:n})});if(!this.settings.start_timer_on_click&&this.settings.timer>0){this.show("init");this.startTimer()}else this.show("init")}},resume:function(){this.set_li();this.show()},tip_template:function(t){var n,r;t.tip_class=t.tip_class||"";n=e(this.settings.template.tip).addClass(t.tip_class);r=e.trim(e(t.li).html())+this.prev_button_text(t.prev_button_text,t.index)+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index);n.append(e(this.settings.template.wrapper));n.first().attr(this.add_namespace("data-index"),t.index);e(".joyride-content-wrapper",n).append(r);return n[0]},timer_instance:function(t){var n;t===0&&this.settings.start_timer_on_click&&this.settings.timer>0||this.settings.timer===0?n="":n=e(this.settings.template.timer)[0].outerHTML;return n},button_text:function(t){if(this.settings.tip_settings.next_button){t=e.trim(t)||"Next";t=e(this.settings.template.button).append(t)[0].outerHTML}else t="";return t},prev_button_text:function(t,n){if(this.settings.tip_settings.prev_button){t=e.trim(t)||"Previous";n==0?t=e(this.settings.template.prev_button).append(t).addClass("disabled")[0].outerHTML:t=e(this.settings.template.prev_button).append(t)[0].outerHTML}else t="";return t},create:function(t){this.settings.tip_settings=e.extend({},this.settings,this.data_options(t.$li));var n=t.$li.attr(this.add_namespace("data-button"))||t.$li.attr(this.add_namespace("data-text")),r=t.$li.attr(this.add_namespace("data-button-prev"))||t.$li.attr(this.add_namespace("data-prev-text")),i=t.$li.attr("class"),s=e(this.tip_template({tip_class:i,index:t.index,button_text:n,prev_button_text:r,li:t.$li}));e(this.settings.tip_container).append(s)},show:function(t,n){var i=null;if(this.settings.$li===r||e.inArray(this.settings.$li.index(),this.settings.pause_after)===-1){this.settings.paused?this.settings.paused=!1:this.set_li(t,n);this.settings.attempts=0;if(this.settings.$li.length&&this.settings.$target.length>0){if(t){this.settings.pre_ride_callback(this.settings.$li.index(),this.settings.$next_tip);this.settings.modal&&this.show_modal()}this.settings.pre_step_callback(this.settings.$li.index(),this.settings.$next_tip);this.settings.modal&&this.settings.expose&&this.expose();this.settings.tip_settings=e.extend({},this.settings,this.data_options(this.settings.$li));this.settings.timer=parseInt(this.settings.timer,10);this.settings.tip_settings.tip_location_pattern=this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];/body/i.test(this.settings.$target.selector)||this.scroll_to();this.is_phone()?this.pos_phone(!0):this.pos_default(!0);i=this.settings.$next_tip.find(".joyride-timer-indicator");if(/pop/i.test(this.settings.tip_animation)){i.width(0);if(this.settings.timer>0){this.settings.$next_tip.show();setTimeout(function(){i.animate({width:i.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)}else this.settings.$next_tip.show()}else if(/fade/i.test(this.settings.tip_animation)){i.width(0);if(this.settings.timer>0){this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed).show();setTimeout(function(){i.animate({width:i.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tip_animation_fade_speed)}else this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed)}this.settings.$current_tip=this.settings.$next_tip}else this.settings.$li&&this.settings.$target.length<1?this.show(t,n):this.end()}else this.settings.paused=!0},is_phone:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose();this.settings.modal||e(".joyride-modal-bg").hide();this.settings.$current_tip.css("visibility","hidden");setTimeout(e.proxy(function(){this.hide();this.css("visibility","visible")},this.settings.$current_tip),0);this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(e,t){if(e){this.settings.$li=this.settings.$tip_content.eq(this.settings.start_offset);this.set_next_tip();this.settings.$current_tip=this.settings.$next_tip}else{t?this.settings.$li=this.settings.$li.prev():this.settings.$li=this.settings.$li.next();this.set_next_tip()}this.set_target()},set_next_tip:function(){this.settings.$next_tip=e(".joyride-tip-guide").eq(this.settings.$li.index());this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr(this.add_namespace("data-class")),r=this.settings.$li.attr(this.add_namespace("data-id")),i=function(){return r?e(n.getElementById(r)):t?e("."+t).first():e("body")};this.settings.$target=i()},scroll_to:function(){var n,r;n=e(t).height()/2;r=Math.ceil(this.settings.$target.offset().top-n+this.settings.$next_tip.outerHeight());r!=0&&e("html, body").stop().animate({scrollTop:r},this.settings.scroll_speed,"swing")},paused:function(){return e.inArray(this.settings.$li.index()+1,this.settings.pause_after)===-1},restart:function(){this.hide();this.settings.$li=r;this.show("init")},pos_default:function(e){var t=this.settings.$next_tip.find(".joyride-nub"),n=Math.ceil(t.outerWidth()/2),r=Math.ceil(t.outerHeight()/2),i=e||!1;if(i){this.settings.$next_tip.css("visibility","hidden");this.settings.$next_tip.show()}if(!/body/i.test(this.settings.$target.selector)){var s=this.settings.tip_settings.tipAdjustmentY?parseInt(this.settings.tip_settings.tipAdjustmentY):0,o=this.settings.tip_settings.tipAdjustmentX?parseInt(this.settings.tip_settings.tipAdjustmentX):0;if(this.bottom()){this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top+r+this.settings.$target.outerHeight()+s,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()+o}):this.settings.$next_tip.css({top:this.settings.$target.offset().top+r+this.settings.$target.outerHeight()+s,left:this.settings.$target.offset().left+o});this.nub_position(t,this.settings.tip_settings.nub_position,"top")}else if(this.top()){this.rtl?this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-r+s,left:this.settings.$target.offset().left+this.settings.$target.outerWidth()-this.settings.$next_tip.outerWidth()}):this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.settings.$next_tip.outerHeight()-r+s,left:this.settings.$target.offset().left+o});this.nub_position(t,this.settings.tip_settings.nub_position,"bottom")}else if(this.right()){this.settings.$next_tip.css({top:this.settings.$target.offset().top+s,left:this.settings.$target.outerWidth()+this.settings.$target.offset().left+n+o});this.nub_position(t,this.settings.tip_settings.nub_position,"left")}else if(this.left()){this.settings.$next_tip.css({top:this.settings.$target.offset().top+s,left:this.settings.$target.offset().left-this.settings.$next_tip.outerWidth()-n+o});this.nub_position(t,this.settings.tip_settings.nub_position,"right")}if(!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tip_settings.tip_location_pattern.length){t.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");this.settings.tip_settings.tip_location=this.settings.tip_settings.tip_location_pattern[this.settings.attempts];this.settings.attempts++;this.pos_default()}}else this.settings.$li.length&&this.pos_modal(t);if(i){this.settings.$next_tip.hide();this.settings.$next_tip.css("visibility","visible")}},pos_phone:function(t){var n=this.settings.$next_tip.outerHeight(),r=this.settings.$next_tip.offset(),i=this.settings.$target.outerHeight(),s=e(".joyride-nub",this.settings.$next_tip),o=Math.ceil(s.outerHeight()/2),u=t||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left");if(u){this.settings.$next_tip.css("visibility","hidden");this.settings.$next_tip.show()}if(!/body/i.test(this.settings.$target.selector))if(this.top()){this.settings.$next_tip.offset({top:this.settings.$target.offset().top-n-o});s.addClass("bottom")}else{this.settings.$next_tip.offset({top:this.settings.$target.offset().top+i+o});s.addClass("top")}else this.settings.$li.length&&this.pos_modal(s);if(u){this.settings.$next_tip.hide();this.settings.$next_tip.css("visibility","visible")}},pos_modal:function(e){this.center();e.hide();this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t=e(".joyride-modal-bg");t.length<1&&e("body").append(this.settings.template.modal).show();/pop/i.test(this.settings.tip_animation)?t.show():t.fadeIn(this.settings.tip_animation_fade_speed)}},expose:function(){var n,r,i,s,o,u="expose-"+this.random_str(6);if(arguments.length>0&&arguments[0]instanceof e)i=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;i=this.settings.$target}if(i.length<1){t.console&&console.error("element not valid",i);return!1}n=e(this.settings.template.expose);this.settings.$body.append(n);n.css({top:i.offset().top,left:i.offset().left,width:i.outerWidth(!0),height:i.outerHeight(!0)});r=e(this.settings.template.expose_cover);s={zIndex:i.css("z-index"),position:i.css("position")};o=i.attr("class")==null?"":i.attr("class");i.css("z-index",parseInt(n.css("z-index"))+1);s.position=="static"&&i.css("position","relative");i.data("expose-css",s);i.data("orig-class",o);i.attr("class",o+" "+this.settings.expose_add_class);r.css({top:i.offset().top,left:i.offset().left,width:i.outerWidth(!0),height:i.outerHeight(!0)});this.settings.modal&&this.show_modal();this.settings.$body.append(r);n.addClass(u);r.addClass(u);i.data("expose",u);this.settings.post_expose_callback(this.settings.$li.index(),this.settings.$next_tip,i);this.add_exposed(i)},un_expose:function(){var n,r,i,s,o,u=!1;if(arguments.length>0&&arguments[0]instanceof e)r=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;r=this.settings.$target}if(r.length<1){t.console&&console.error("element not valid",r);return!1}n=r.data("expose");i=e("."+n);arguments.length>1&&(u=arguments[1]);u===!0?e(".joyride-expose-wrapper,.joyride-expose-cover").remove():i.remove();s=r.data("expose-css");s.zIndex=="auto"?r.css("z-index",""):r.css("z-index",s.zIndex);s.position!=r.css("position")&&(s.position=="static"?r.css("position",""):r.css("position",s.position));o=r.data("orig-class");r.attr("class",o);r.removeData("orig-classes");r.removeData("expose");r.removeData("expose-z-index");this.remove_exposed(r)},add_exposed:function(t){this.settings.exposed=this.settings.exposed||[];t instanceof e||typeof t=="object"?this.settings.exposed.push(t[0]):typeof t=="string"&&this.settings.exposed.push(t)},remove_exposed:function(t){var n,r;t instanceof e?n=t[0]:typeof t=="string"&&(n=t);this.settings.exposed=this.settings.exposed||[];r=this.settings.exposed.length;while(r--)if(this.settings.exposed[r]==n){this.settings.exposed.splice(r,1);return}},center:function(){var n=e(t);this.settings.$next_tip.css({top:(n.height()-this.settings.$next_tip.outerHeight())/2+n.scrollTop(),left:(n.width()-this.settings.$next_tip.outerWidth())/2+n.scrollLeft()});return!0},bottom:function(){return/bottom/i.test(this.settings.tip_settings.tip_location)},top:function(){return/top/i.test(this.settings.tip_settings.tip_location)},right:function(){return/right/i.test(this.settings.tip_settings.tip_location)},left:function(){return/left/i.test(this.settings.tip_settings.tip_location)},corners:function(n){var r=e(t),i=r.height()/2,s=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),o=r.width()+r.scrollLeft(),u=r.height()+s,a=r.height()+r.scrollTop(),f=r.scrollTop();s<f&&(s<0?f=0:f=s);u>a&&(a=u);return[n.offset().top<f,o<n.offset().left+n.outerWidth(),a<n.offset().top+n.outerHeight(),r.scrollLeft()>n.offset().left]},visible:function(e){var t=e.length;while(t--)if(e[t])return!1;return!0},nub_position:function(e,t,n){t==="auto"?e.addClass(n):e.addClass(t)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide();this.show();this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(t){this.settings.cookie_monster&&e.cookie(this.settings.cookie_name,"ridden",{expires:this.settings.cookie_expires,domain:this.settings.cookie_domain});this.settings.timer>0&&clearTimeout(this.settings.automate);this.settings.modal&&this.settings.expose&&this.un_expose();e(this.scope).off("keyup.joyride");this.settings.$next_tip.data("closed",!0);this.settings.riding=!1;e(".joyride-modal-bg").hide();this.settings.$current_tip.hide();if(typeof t=="undefined"||t===!1){this.settings.post_step_callback(this.settings.$li.index(),this.settings.$current_tip);this.settings.post_ride_callback(this.settings.$li.index(),this.settings.$current_tip)}e(".joyride-tip-guide").remove()},off:function(){e(this.scope).off(".joyride");e(t).off(".joyride");e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride");e(".joyride-tip-guide, .joyride-modal-bg").remove();clearTimeout(this.settings.automate);this.settings={}},reflow:function(){}}})(jQuery,window,window.document);
(function(e,t,n,r){"use strict";Foundation.libs.accordion={name:"accordion",version:"5.4.7",settings:{content_class:"content",active_class:"active",multi_expand:!1,toggleable:!0,callback:function(){}},init:function(e,t,n){this.bindings(t,n)},events:function(){var t=this,n=this.S;n(this.scope).off(".fndtn.accordion").on("click.fndtn.accordion","["+this.attr_name()+"] > dd > a",function(r){var i=n(this).closest("["+t.attr_name()+"]"),s=t.attr_name()+"="+i.attr(t.attr_name()),o=i.data(t.attr_name(!0)+"-init"),u=n("#"+this.href.split("#")[1]),a=e("> dd",i),f=a.children("."+o.content_class),l=f.filter("."+o.active_class);r.preventDefault();if(i.attr(t.attr_name())){f=f.add("["+s+"] dd > ."+o.content_class);a=a.add("["+s+"] dd")}if(o.toggleable&&u.is(l)){u.parent("dd").toggleClass(o.active_class,!1);u.toggleClass(o.active_class,!1);o.callback(u);u.triggerHandler("toggled",[i]);i.triggerHandler("toggled",[u]);return}if(!o.multi_expand){f.removeClass(o.active_class);a.removeClass(o.active_class)}u.addClass(o.active_class).parent().addClass(o.active_class);o.callback(u);u.triggerHandler("toggled",[i]);i.triggerHandler("toggled",[u])})},off:function(){},reflow:function(){}}})(jQuery,window,window.document);
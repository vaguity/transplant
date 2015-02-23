webpackJsonp([2],{0:function(e,t,n){(function(e){n(2);e.panelSnap=n(14),n(16)}).call(t,function(){return this}())},14:function(e,t,n){(function(e){"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),/*!
	 * jQuery panelSnap
	 * Version 0.14.0
	 *
	 * Requires:
	 * - jQuery 1.7 or higher (no jQuery.migrate needed)
	 *
	 * https://github.com/guidobouman/jquery-panelsnap
	 *
	 * Copyright 2013, Guido Bouman
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 * Date: Wed Feb 13 16:05:00 2013 +0100
	 */
function(e,t,n){var o="panelSnap",i="plugin_"+o,r={isMouseDown:!1,isSnapping:!1,enabled:!0,scrollInterval:0,scrollOffset:0,init:function(t,o){var i=this;if(i.container=o,i.$container=e(o),i.$eventContainer=i.$container,i.$snapContainer=i.$container,i.$container.is("body")){i.$eventContainer=e(n),i.$snapContainer=e(n.documentElement);var r=navigator.userAgent;~r.indexOf("WebKit")&&(i.$snapContainer=e("body"))}if(i.updateScrollInterval(),i.options=e.extend(!0,{},e.fn.panelSnap.options,t),i.bind(),i.options.$menu!==!1&&e(".active",i.options.$menu).length>0)e(".active",i.options.$menu).click();else{var a=i.getPanel(":first");i.activatePanel(a)}return i},bind:function(){var n=this;n.bindProxied(n.$eventContainer,"scrollstop",n.scrollStop),n.bindProxied(n.$eventContainer,"mousewheel",n.mouseWheel),n.bindProxied(n.$eventContainer,"mousedown",n.mouseDown),n.bindProxied(n.$eventContainer,"mouseup",n.mouseUp),n.bindProxied(e(t),"resizestop",n.resize),n.options.keyboardNavigation.enabled&&n.bindProxied(e(t),"keydown",n.keyDown,n.$eventContainer),n.options.$menu!==!1&&n.bindProxied(e(n.options.$menu),"click",n.captureMenuClick,n.options.menuSelector)},bindProxied:function(t,n,o,i){var r=this;i="string"==typeof i?i:null,t.on(n+r.options.namespace,i,e.proxy(function(e){return o.call(r,e)},r))},destroy:function(){var n=this;n.$eventContainer.off(n.options.namespace),e(t).off(n.options.namespace),n.options.$menu!==!1&&e(n.options.menuSelector,n.options.$menu).off(n.options.namespace),n.$container.removeData(i)},scrollStop:function(e){var t=this;if(e.stopPropagation(),!t.isMouseDown&&!t.isSnapping){t.updateScrollInterval();var n,o=t.$snapContainer.scrollTop(),i=o-t.scrollOffset,r=t.$container[0].scrollHeight-t.scrollInterval,a=t.getPanel().length-1;n=t.enabled&&i<-t.options.directionThreshold&&i>-t.scrollInterval?Math.floor(o/t.scrollInterval):t.enabled&&i>t.options.directionThreshold&&i<t.scrollInterval?Math.ceil(o/t.scrollInterval):Math.round(o/t.scrollInterval),n=Math.max(0,Math.min(n,a));var s=t.getPanel(":eq("+n+")");return t.enabled?void(t.getPanelsInViewport().length<2||0===i||(0>=o||o>=r?(t.activatePanel(s),t.scrollOffset=0>=o?0:r):t.snapToPanel(s))):void(s.is(t.getPanel(".active"))||t.activatePanel(s))}},getPanelsInViewport:function(){var n=this,o=e(t),i={top:o.scrollTop()};i.bottom=i.top+o.height();var r=n.getPanel().filter(function(t,n){var o=e(n),r=o.offset();return r.bottom=r.top+o.outerHeight(),!(i.bottom<r.top||i.top>r.bottom)});return r},mouseWheel:function(){var e=this;e.$container.stop(!0),e.isSnapping=!1},mouseDown:function(){var e=this;e.isMouseDown=!0},mouseUp:function(e){var t=this;t.isMouseDown=!1,t.scrollOffset!==t.$snapContainer.scrollTop()&&t.scrollStop(e)},keyDown:function(e){var t=this,n=t.options.keyboardNavigation;if(t.enabled)if(t.isSnapping){if(e.which==n.previousPanelKey||e.which==n.nextPanelKey)return e.preventDefault(),!1}else switch(e.which){case n.previousPanelKey:e.preventDefault(),t.snapTo("prev",n.wrapAround);break;case n.nextPanelKey:e.preventDefault(),t.snapTo("next",n.wrapAround)}},resize:function(){var e=this;if(e.updateScrollInterval(),e.enabled){var t=e.getPanel(".active");e.snapToPanel(t)}},captureMenuClick:function(t){var n=this,o=e(t.currentTarget).data("panel"),i=n.getPanel('[data-panel="'+o+'"]');return n.snapToPanel(i),!1},snapToPanel:function(e){var t=this;if(e.jquery){t.isSnapping=!0,t.options.onSnapStart.call(t,e),t.$container.trigger("panelsnap:start",[e]);var n=0;n=t.$container.is("body")?e.offset().top-t.options.offset:t.$snapContainer.scrollTop()+e.position().top-t.options.offset,t.$snapContainer.stop(!0).animate({scrollTop:n},t.options.slideSpeed,t.options.easing,function(){t.scrollOffset=t.$snapContainer.scrollTop(),t.isSnapping=!1,t.options.onSnapFinish.call(t,e),t.$container.trigger("panelsnap:finish",[e]),t.activatePanel(e)})}},activatePanel:function(t){var n=this;if(n.getPanel(".active").removeClass("active"),t.addClass("active"),n.options.$menu!==!1){var o=n.options.menuSelector+".active";e(o,n.options.$menu).removeClass("active");var i='[data-panel="'+t.data("panel")+'"]',r=n.options.menuSelector+i,a=e(r,n.options.$menu);a.addClass("active")}n.options.onActivate.call(n,t),n.$container.trigger("panelsnap:activate",[t])},getPanel:function(t){var n=this;return"undefined"==typeof t&&(t=""),e(n.options.panelSelector+t,n.$container)},snapTo:function(e,t){var n=this;"boolean"!=typeof t&&(t=!0);var o;switch(e){case"prev":o=n.getPanel(".active").prevAll(n.options.panelSelector).last(),o.length<1&&t&&(o=n.getPanel(":last"));break;case"next":o=n.getPanel(".active").nextAll(n.options.panelSelector).first(),o.length<1&&t&&(o=n.getPanel(":first"));break;case"first":o=n.getPanel(":first");break;case"last":o=n.getPanel(":last")}o.length>0&&n.snapToPanel(o)},getScrollInterval:function(){return this.$container.is("body")?t.innerHeight:this.$container.height()},updateScrollInterval:function(){this.scrollInterval=this.getScrollInterval()},enable:function(){var e=this;e.scrollOffset=e.$snapContainer.scrollTop(),e.enabled=!0},disable:function(){var e=this;e.enabled=!1},toggle:function(){var e=this;e.enabled?e.disable():e.enable()}};e.fn[o]=function(t){var n=Array.prototype.slice.call(arguments);return this.each(function(){var o=e.data(this,i);if("object"!=typeof t&&"init"!==t&&t){if(!o)return void e.error("Plugin is not initialized for this object yet.");if(!o[t])return void e.error("Method "+t+" does not exist on jQuery.panelSnap.");var a=t;t=n.slice(1),o[a].apply(o,t)}else{if(o)return void e.error("Plugin is already initialized for this object.");"init"===t&&(t=n[1]||{}),o=Object.create(r).init(t,this),e.data(this,i,o)}})},e.fn[o].options={$menu:!1,menuSelector:"a",panelSelector:"> section",namespace:".panelSnap",onSnapStart:function(){},onSnapFinish:function(){},onActivate:function(){},directionThreshold:50,slideSpeed:200,easing:"linear",offset:0,keyboardNavigation:{enabled:!1,nextPanelKey:40,previousPanelKey:38,wrapAround:!0}}}(e,window,document),/*!
	 * Special flavoured jQuery Mobile scrollstart & scrollstop events.
	 * Version 0.1.3
	 *
	 * Requires:
	 * - jQuery 1.7.1 or higher (no jQuery.migrate needed)
	 *
	 * Copyright 2013, Guido Bouman
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 * Date: Wed Feb 13 16:05:00 2013 +0100
	 */
function(e){e.event.special.scrollstart={enabled:!0,setup:function(){function t(e,t){e.type=t?"scrollstart":"scrollstop",r.trigger(e)}var n,o,i=this,r=e(i);r.data("scrollwatch",!0),r.on("touchstart",function(){o=!0}),r.on("touchleave touchcancel touchend",function(){o=!1,setTimeout(function(){clearTimeout(n)},50)}),r.on("touchmove scroll",function(i){o||e.event.special.scrollstart.enabled&&(e.event.special.scrollstart.scrolling||(e.event.special.scrollstart.scrolling=!0,t(i,!0)),clearTimeout(n),n=setTimeout(function(){e.event.special.scrollstart.scrolling=!1,t(i,!1)},50))})}},e.event.special.scrollstop={setup:function(){var t=this,n=e(t);n.data("scrollwatch")||e(this).on("scrollstart",function(){})}}}(e),/*!
	 * Resizestart and resizestop events.
	 * Version 0.0.1
	 *
	 * Requires:
	 * - jQuery 1.7.1 or higher (no jQuery.migrate needed)
	 *
	 * Copyright 2013, Guido Bouman
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *
	 * Date: Fri Oct 25 15:05:00 2013 +0100
	 */
function(e){e.event.special.resizestart={enabled:!0,setup:function(){function t(e,t){e.type=t?"resizestart":"resizestop",i.trigger(e)}var n,o=this,i=e(o);i.data("resizewatch",!0),i.on("resize",function(o){e.event.special.resizestart.enabled&&(e.event.special.resizestart.resizing||(e.event.special.resizestart.resizing=!0,t(o,!0)),clearTimeout(n),n=setTimeout(function(){e.event.special.resizestart.resizing=!1,t(o,!1)},200))})}},e.event.special.resizestop={setup:function(){var t=this,n=e(t);n.data("resizewatch")||e(this).on("resizestart",function(){})}}}(e),/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
	 * Licensed under the MIT License (LICENSE.txt).
	 *
	 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
	 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
	 * Thanks to: Seamus Leahy for adding deltaX and deltaY
	 *
	 * Version: 3.0.6
	 *
	 * Requires: 1.2.2+
	 */
function(e){function t(t){var n=t||window.event,o=[].slice.call(arguments,1),i=0,r=0,a=0;return t=e.event.fix(n),t.type="mousewheel",n.wheelDelta&&(i=n.wheelDelta/120),n.detail&&(i=-n.detail/3),a=i,void 0!==n.axis&&n.axis===n.HORIZONTAL_AXIS&&(a=0,r=-1*i),void 0!==n.wheelDeltaY&&(a=n.wheelDeltaY/120),void 0!==n.wheelDeltaX&&(r=-1*n.wheelDeltaX/120),o.unshift(t,i,r,a),(e.event.dispatch||e.event.handle).apply(this,o)}var n=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks)for(var o=n.length;o;)e.event.fixHooks[n[--o]]=e.event.mouseHooks;e.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var e=n.length;e;)this.addEventListener(n[--e],t,!1);else this.onmousewheel=t},teardown:function(){if(this.removeEventListener)for(var e=n.length;e;)this.removeEventListener(n[--e],t,!1);else this.onmousewheel=null}},e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}(e)}).call(t,n(1))},16:function(e,t,n){(function(e){var t=[".content.our-platform",".content.our-platform > .panel-container",".body-container .image.left",{selector:".content.our-platform > .panel-container-offset",offset:".sticky"},{selector:".wistia-embed",offset:".header-container",ratio:16/9}],n=[{selector:"#customize .copy.right",offset:".sticky"},{selector:"#planning .copy.right",offset:".sticky"},{selector:"#briefing .copy.right",offset:".sticky"},{selector:"#sourcing .copy.right",offset:".sticky"},{selector:"#production .copy.right",offset:".sticky"},{selector:"#distribution .copy.right",offset:".sticky"},{selector:"#monitoring .copy.right",offset:".sticky"},{selector:"#analysis .copy.right",offset:".sticky"},{selector:".hero-container section",offset:".header-container"}];e(document).ready(function(){enquire.register("screen and (min-width: 1180px)",{deferSetup:!0,setup:function(){setFullFrame(t)},match:function(){setFullFrame(t)},unmatch:function(){setFullFrame(t,!0)}})}),e(window).load(function(){enquire.register("screen and (min-width: 1180px)",{deferSetup:!0,setup:function(){e(".content.our-platform").panelSnap({panelSelector:"> .panel-container",directionThreshold:20,slideSpeed:400,offset:e(".sticky").outerHeight()}),e(".content.our-platform .hero .copy").fadeIn(),e(".content.our-platform").scroll(e.throttle(150,function(){e(".content.our-platform").scrollTop()>=e(window).height()-e(".sticky").outerHeight()?e(".sticky").addClass("enabled").css("display","block"):e(".sticky").removeClass("enabled").css("display","")})),e(window).resize(e.throttle(150,function(){setFullFrame(t),setVerticalCenter(n)}))},match:function(){setFullFrame(t),setVerticalCenter(n),e(".content.our-platform").panelSnap("enable")},unmatch:function(){setFullFrame(t,!0),e(".content.our-platform").panelSnap("disable")}})})}).call(t,n(1))}});
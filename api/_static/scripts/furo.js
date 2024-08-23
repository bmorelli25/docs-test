/*! For license information please see furo.js.LICENSE.txt */
(()=>{var e={856:function(e,t,n){var o,c;c=void 0!==n.g?n.g:"undefined"!=typeof window?window:this,o=function(){return function(e){"use strict";var t={navClass:"active",contentClass:"active",nested:!1,nestedClass:"active",offset:0,reflow:!1,events:!0},n=function(e,t,n){if(n.settings.events){var o=new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n});t.dispatchEvent(o)}},o=function(e){var t=0;if(e.offsetParent)for(;e;)t+=e.offsetTop,e=e.offsetParent;return t>=0?t:0},c=function(e){e&&e.sort((function(e,t){return o(e.content)<o(t.content)?-1:1}))},r=function(t,n,o){var c=t.getBoundingClientRect(),r=function(e){return"function"==typeof e.offset?parseFloat(e.offset()):parseFloat(e.offset)}(n);return o?parseInt(c.bottom,10)<(e.innerHeight||document.documentElement.clientHeight):parseInt(c.top,10)<=r},s=function(){return Math.ceil(e.innerHeight+e.pageYOffset)>=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},l=function(e,t){var n=e[e.length-1];if(function(e,t){return!(!s()||!r(e.content,t,!0))}(n,t))return n;for(var o=e.length-1;o>=0;o--)if(r(e[o].content,t))return e[o]},a=function(e,t){if(t.nested&&e.parentNode){var n=e.parentNode.closest("li");n&&(n.classList.remove(t.nestedClass),a(n,t))}},i=function(e,t){if(e){var o=e.nav.closest("li");o&&(o.classList.remove(t.navClass),e.content.classList.remove(t.contentClass),a(o,t),n("gumshoeDeactivate",o,{link:e.nav,content:e.content,settings:t}))}},u=function(e,t){if(t.nested){var n=e.parentNode.closest("li");n&&(n.classList.add(t.nestedClass),u(n,t))}};return function(o,r){var s,a,d,f,m,v={setup:function(){s=document.querySelectorAll(o),a=[],Array.prototype.forEach.call(s,(function(e){var t=document.getElementById(decodeURIComponent(e.hash.substr(1)));t&&a.push({nav:e,content:t})})),c(a)},detect:function(){var e=l(a,m);e?d&&e.content===d.content||(i(d,m),function(e,t){if(e){var o=e.nav.closest("li");o&&(o.classList.add(t.navClass),e.content.classList.add(t.contentClass),u(o,t),n("gumshoeActivate",o,{link:e.nav,content:e.content,settings:t}))}}(e,m),d=e):d&&(i(d,m),d=null)}},h=function(t){f&&e.cancelAnimationFrame(f),f=e.requestAnimationFrame(v.detect)},g=function(t){f&&e.cancelAnimationFrame(f),f=e.requestAnimationFrame((function(){c(a),v.detect()}))};return v.destroy=function(){d&&i(d,m),e.removeEventListener("scroll",h,!1),m.reflow&&e.removeEventListener("resize",g,!1),a=null,s=null,d=null,f=null,m=null},m=function(){var e={};return Array.prototype.forEach.call(arguments,(function(t){for(var n in t){if(!t.hasOwnProperty(n))return;e[n]=t[n]}})),e}(t,r||{}),v.setup(),v.detect(),e.addEventListener("scroll",h,!1),m.reflow&&e.addEventListener("resize",g,!1),v}}(c)}.apply(t,[]),void 0===o||(e.exports=o)}},t={};function n(o){var c=t[o];if(void 0!==c)return c.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=n(856),t=n.n(e),o=null,c=null,r=document.documentElement.scrollTop;const s=64;function l(){const e=localStorage.getItem("theme")||"auto";var t;"light"!==(t=window.matchMedia("(prefers-color-scheme: dark)").matches?"auto"===e?"light":"light"==e?"dark":"auto":"auto"===e?"dark":"dark"==e?"light":"auto")&&"dark"!==t&&"auto"!==t&&(console.error(`Got invalid theme mode: ${t}. Resetting to auto.`),t="auto"),document.body.dataset.theme=t,localStorage.setItem("theme",t),console.log(`Changed to ${t} mode.`)}function a(){!function(){const e=document.getElementsByClassName("theme-toggle");Array.from(e).forEach((e=>{e.addEventListener("click",l)}))}(),function(){let e=0,t=!1;window.addEventListener("scroll",(function(n){e=window.scrollY,t||(window.requestAnimationFrame((function(){var n;(function(e){const t=Math.floor(c.getBoundingClientRect().top);console.log(`headerTop: ${t}`),0==t&&e!=t?c.classList.add("scrolled"):c.classList.remove("scrolled")})(n=e),function(e){e<s?document.documentElement.classList.remove("show-back-to-top"):e<r?document.documentElement.classList.add("show-back-to-top"):e>r&&document.documentElement.classList.remove("show-back-to-top"),r=e}(n),function(e){null!==o&&(0==e?o.scrollTo(0,0):Math.ceil(e)>=Math.floor(document.documentElement.scrollHeight-window.innerHeight)?o.scrollTo(0,o.scrollHeight):document.querySelector(".scroll-current"))}(n),t=!1})),t=!0)})),window.scroll()}(),null!==o&&new(t())(".toc-tree a",{reflow:!0,recursive:!0,navClass:"scroll-current",offset:()=>{let e=parseFloat(getComputedStyle(document.documentElement).fontSize);return c.getBoundingClientRect().height+2.5*e+1}})}document.addEventListener("DOMContentLoaded",(function(){document.body.parentNode.classList.remove("no-js"),c=document.querySelector("header"),o=document.querySelector(".toc-scroll"),a()})),((e,t)=>{const n=document.getElementById("header-toggle"),o=document.getElementById("nav-menu");n&&o&&n.addEventListener("click",(()=>{o.classList.toggle("show"),n.classList.toggle("bx-x")}))})();const i=document.querySelectorAll(".nav__link");function u(){i.forEach((e=>e.classList.remove("active"))),this.classList.add("active")}i.forEach((e=>e.addEventListener("click",u)))})()})();
//# sourceMappingURL=furo.js.map
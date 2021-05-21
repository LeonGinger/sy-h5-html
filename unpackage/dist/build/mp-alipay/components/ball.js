;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/ball"],{"2e4b":function(t,n,e){"use strict";var o=e("84cf"),c=e.n(o);c.a},"52dc":function(t,n,e){"use strict";e.r(n);var o=e("a1c1"),c=e("742e");for(var i in c)"default"!==i&&function(t){e.d(n,t,(function(){return c[t]}))}(i);e("2e4b");var u,a=e("f0c5"),r=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=r.exports},"742e":function(t,n,e){"use strict";e.r(n);var o=e("974f"),c=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=c.a},"84cf":function(t,n,e){},"974f":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{show:!1,top:400,deviationTop:0,windowHeight:t.getSystemInfoSync().windowHeight}},methods:{clickBtn:function(t){console.log("点击了："+t.text)},touchstart:function(t){var n=t.touches[0]||t.changedTouches[0];this.deviationTop=n.clientY-this.top},touchmove:function(t){var n=t.touches[0]||t.changedTouches[0],e=n.clientY;return e-=this.deviationTop,e<0&&(e=0),e>this.windowHeight-120&&(e=this.windowHeight-120),this.top=e,!1}}};n.default=e}).call(this,e("c11b")["default"])},a1c1:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var c=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.show=!1})},i=[]}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/ball-create-component',
    {
        'components/ball-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("52dc"))
        })
    },
    [['components/ball-create-component']]
]);

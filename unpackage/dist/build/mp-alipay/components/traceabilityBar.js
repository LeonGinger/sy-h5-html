;my.defineComponent || (my.defineComponent = Component);(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["components/traceabilityBar"],{"358a":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{index:!0,my:!0,ym:0,bottomHegiht:"100rpx",tabBar:[{pagePath:"/pages/index/index",iconPath:"/static/iconfont/index-dj.png",text:"首页",textColor:"#555555"},{pagePath:"/pages/my/my",iconPath:"/static/iconfont/my-dj.png",text:"我的",textColor:"#555555"}]}},created:function(){t.getSystemInfo({success:function(t){var n=t.screenHeight;n>700?this.bottomHegiht="86rpx":n>=980&&(this.bottomHegiht="150rpx")}})},methods:{setSelected:function(n){t.switchTab({url:this.tabBar[n].pagePath})},Buy:function(){}}};n.default=e}).call(this,e("c11b")["default"])},"3a71":function(t,n,e){"use strict";e.r(n);var a=e("358a"),c=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=c.a},9288:function(t,n,e){"use strict";var a=e("d5b3"),c=e.n(a);c.a},ce28:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var c=function(){var t=this,n=t.$createElement;t._self._c},i=[]},d5b3:function(t,n,e){},f52b:function(t,n,e){"use strict";e.r(n);var a=e("ce28"),c=e("3a71");for(var i in c)"default"!==i&&function(t){e.d(n,t,(function(){return c[t]}))}(i);e("9288");var o,r=e("f0c5"),u=Object(r["a"])(c["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);n["default"]=u.exports}}]);
;(my["webpackJsonp"] = my["webpackJsonp"] || []).push([
    'components/traceabilityBar-create-component',
    {
        'components/traceabilityBar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('c11b')['createComponent'](__webpack_require__("f52b"))
        })
    },
    [['components/traceabilityBar-create-component']]
]);

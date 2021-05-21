import Vue from 'vue'
import App from './App'
import compressImage from '@/common/util.js';
import axios from '@/common/axios'
Vue.prototype.$axios = axios;
//注册全局组件

//悬浮球组件
import ball from "./components/ball.vue";
Vue.component("ball",ball)
//热卖商品
import Hotgoods from "./components/Hotgoods.vue";
Vue.component("Hotgoods",Hotgoods)
//css连接样式
import connect from "./components/connect.vue";
Vue.component("connect",connect)
//切换页面过度动画组件
import uploadimg from "./components/amazarashi-uploadimg/uploadImg.vue";
Vue.component("uploadimg",uploadimg)
//溯源页导航栏
import traceabilityBar from "./components/traceabilityBar.vue";
Vue.component("traceabilityBar",traceabilityBar)
//页面导航栏
import bottomBar from "./components/bottomBar.vue";
Vue.component("bottomBar",bottomBar)
Vue.config.productionTip = false
//注册uView
import uView from './uview-ui';
Vue.use(uView);
//注册全局接口
import * as api from '@/config/api.js' //请求接口列表api
// import {myRequest} from './config/http.js'
//圈就挂载请求接口
Vue.prototype.$api = api;
// Vue.prototype.$myRequest = myRequest
App.mpType = 'app'
//图片转换base64 、 base64转换图片


Vue.prototype.syhttp ='https://sy.zsicp.com/h5'; //溯源网址
Vue.prototype.gethttp ='https://sy.zsicp.com/wap'; //请求网址
Vue.prototype.isloading =function (data) {  //缓存用户信息
Vue.config.ignoredElements = ['wx-open-launch-weapp']	//注册打开微信小程序
		var httpshowpath=sessionStorage.getItem("isloadingget");
		if(httpshowpath){			
			return true;	
		}else{
			return false;
		}
};

const app = new Vue({
    ...App
})
app.$mount()

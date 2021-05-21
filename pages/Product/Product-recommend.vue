<template>
	
	<view class="wrapper" >
		<image src="../../static/sp-bg.jpg" class="bg"></image>
		<view class="ytitle">
			<text class="ytext">商品信息档案</text>
		</view>
		<!-- 轮播图 -->
		<view class="whitebox">
			<view class="lbt">			
					<u-swiper :list="lbtimg"></u-swiper>
			</view>
		</view>
		<!-- 轮播图 -->
		<connect class="connect"></connect>
		<!-- 溯源信息 -->
		<view class="whitebox" style="margin-top: 33upx;">
			<view class="utitlebox" style="margin-top: 30upx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">溯源信息</view>
			</view>
			<u-form :model="form" ref="uForm" style="margin-left: 20upx;">
					<u-form-item label="商品名称:"><text>{{cname}}</text></u-form-item>
					<u-form-item label="商品规格:"><text>{{cgg}}</text></u-form-item>
					<u-form-item label="生源产地:"><text>{{cyd}}</text></u-form-item>
					<u-form-item label="生产日期:"><text>{{input.slice(0,10)}}</text></u-form-item>
					<u-form-item label="保质日期:"><text>{{cbz}}</text></u-form-item>
					<u-form-item label="商品售价:"><text>{{cprice}}元</text></u-form-item>
			</u-form>
		</view>	
		<!-- 溯源信息 -->
		<!-- 检测信息 -->
		
		<view class="greenbox" v-if="jcdd">
			<view class="utitlebox">
			    <view class="w-utitleblock"></view>
			    <view class="w-utitle">检测信息</view>
			</view>
			<view class="jctbox">
				<text class="jctext">
					该产品是由<span>{{jcdd}}</span>实施监测，<span>{{cyd}}</span>生产的<span>{{jcypname}}</span>，<span>产品检疫检测报告可点击更多查看</span>
				</text>
				<image src="../../static/hg.png"></image>
				<view class="gdbtn"  @click="ck">更多</view>
			</view>
			<!-- <u-mask :show="cklt"  @click="qx">
			<view :class="cklt==false ? 'noseeill':'seeill'">
				<image src="http://qp9mr1fhs.hn-bkt.clouddn.com/img/lt.jpg" class="ltimg"></image>
				
			</view>
			</u-mask> -->
			
		</view>
		<u-mask :show="cklt" @click="qx">
		<view :class="cklt==false ? 'noseeill':'seeill'">
			<image :src="jyjcimg[0]" class="ltimg" v-if="tp == 0"></image>
			<image :src="bigimg" class="ltimg" v-if="tp == 1"  :style="{width:bigimgWidth,height:bigimgHeight}"></image>
			<!-- <image :src="report" class="ltimg" v-if="tp == 2"></image>					 -->
		</view>
		</u-mask>
		<!-- 检测信息 -->

		<!-- 商品认证 -->
		<view class="whitebox" v-if="spzsimg.length !=0">
			<view class="utitlebox">
			    <view class="utitleblock"></view>
			    <view class="utitle">商品认证</view>
			   </view>
			<text class="rzts">(向左滑动可浏览更多图片)</text>
			<view class="rzbox">
				<scroll-view class="rzscrool" scroll-x="true" scroll-with-animation="true">
					<span class="rzimg" v-for="(item,index) in spzsimg" 
					:key="index">
					<image mode="aspectFill" @click="previewImg(item.image)" :src="item.image"></image>
					</span>		
				</scroll-view>
			</view>
		</view>
		<!-- 商品认证 -->
		<!-- 商家信息 -->
		<view class="greenbox" :style="xspd ? '':'margin-bottom: 150upx; position: relative;'">
			<view class="utitlebox">
			    <view class="w-utitleblock"></view>
			    <view class="w-utitle">商家信息</view>
			   </view>
			<text class="qyxx">商家名称：{{sjname}}</text>
			<view :class="sj==true ? 'sjbt':'sjbtf'" @click="business" >更多</view>
			<text :class="sj==true ? 'sjts':'sjtsf'">(向左滑动可浏览更多图片,点击更多查看商家信息)</text>
			<!-- <text class="rzts">(向左滑动可浏览更多图片)</text> -->
			<view :class="sj==true ? 'sjbox':'sjboxf'">
				<scroll-view class="sjscrool" scroll-x="true" scroll-with-animation="true">
					<span class="sjimg" v-for="(item,index) in sjimg" 
					:key="index">
					<image mode="aspectFill" @click="previewImg(item.image)" :src="item.image"></image>
					</span>		
				</scroll-view>
			</view>
		</view>
		<!-- 商家信息 -->
		<!-- 推荐商品 -->
	
				<view v-if="xspd">
				<view class="whitebox" style="margin-bottom: 150upx; position: relative;" v-if="my_menu">
					<view class="utitlebox">
						<view class="utitleblock"></view>
						<view class="utitle">热卖商品</view>
					</view>
					<view class="recommend">
						<view class="sbox" v-for="(item,index) in my_menu[0]" @click="recommend(index)" v-if="index<rmsplengh && item.recommend !=0"  :index="index">
							<view class="simage">
								<image mode="aspectFill" :src='item.menu_images_json[0]'></image>
							</view>
							<view class="stxtbox">
								<text class="stext">{{item.menu_name}}</text>
								<text class="stextg">{{item.menu_weight}}</text>
							</view>
							<view class="sbtbox">
								<text class="sprice"><span class="smtext">￥</span>{{item.menu_money}}</text>
								<view class="sbt" v-if="item.menu_url" @click="recommend(index)">
									<text class="sbtext">购买</text>
								</view>
								<view class="sbt" v-if="!item.menu_url" style="background-color: #0ABB9A;" @click="recommend(index)">
									<text class="sbtext">查看</text>
								</view>
							</view>
						</view>
						<view class="more" @click="more" v-if="rmspmore == false && my_menu[0].length>4">
	
							<image src="../../static/iconfont/load.png" v-if="moreload == false"></image>
							<view class="loadbox" style="margin-left:-60upx;">
							<u-loading mode="circle" size="40" :show="moreload" color="#0abb99"></u-loading>
							</view>
						</view>
					</view>
				</view>
				</view>
	
		<view class="aa" style="padding-bottom: 60rpx;"></view>
		<view class="iPhone" style="padding-bottom: 40rpx;" v-if="model == 'iPhone'"></view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		

			
		<view v-if="!menu_url">
			<bottomBar></bottomBar>
		</view>
		<view v-if="menu_url" style="overflow: hidden;">
			<traceabilityBar></traceabilityBar>
			<wx-open-launch-weapp  id="launch-btn" :username="xcx.username" :path='xcx.url'
			style="background-color: #000000;width: 300rpx;height: 130rpx;position:fixed;right: 8%;bottom: 0;
			z-index: 999; opacity: 0;
			">
				<script type="text/wxtag-template"> 

						  <style>
						     .btn {
								width: 300rpx;height: 130rpx;color: white;display: block;background-color: #0ABB9A;opacity: 0;
							 }
						    </style>							
							<!-- 因height无作用，复制多两条铺满wx-open-launch-weapp -->
							
						   <view class="btn">
							 打开小程序
							</view>
							<view class="btn">
							 打开小程序
							</view>
							<view class="btn">
							打开小程序
							</view>
				</script>
			</wx-open-launch-weapp>	
			
		</view>
		
		
		
	</view>
</template>

<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
<script>
	import wx from '../../components/weixin-js-sdk/index.js';
	export default {
		data() {
			return {
			xcx:{
				username:'gh_77acf6c16111',
				url:'',
			},
			
			menu_url:'',
			cklt:false,
			scrollTop: 0,	
			path:'',
			bigimg:'',
			bigimgHeight:0,
			bigimgWidth:0,
			model:'',
			rmspmore:false,
			moreload:false, 
			business_id:'',
			cname: '',
			cyd: '',
			cgg: '',
			input: '',
			inputjc: '',
			cbz: '',
			cprice: '',
			ypname: '',
			jcdd: '',	
			jcypname:'',
			rmsplengh:4,
			rmnewlengh:'',
			lbtimg:[], //轮播图图片
			jyjcimg:[], //检疫检测图片
			spzsimg:[],//商品证书图片
			my_menu:[],
			sj:true,
			sjname:'',
			id:'',
			sjimg:[],
			menu:[],
			my_menu_recommend :0,
			my_menu_length:0,
			xspd:true,
			}
		},
		onReady() {
			const _this = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					let allheight = res.windowHeight
					let shopWidth = res.windowWidth
					// 背景图片高度
					_this.bgHeight = res.windowHeight + "px"
					_this.allWidth = res.screenWidth
					_this.model = res.model
		
				}
			})
			
		},
		onLoad(res) {
			let _this=this;
			let menu=[];	
			let lbtjson=[];
			let spzsjson=[];
			let jyjcjson=[];
			let id=res.index;
				 _this.$api.find_menu({menu_id:id}).then((res) =>{
					console.log("find_menu",res.data);
						_this.cname=res.data.menu_name;
						_this.cgg=res.data.menu_weight;
						_this.cyd=res.data.menu_address;
						_this.input=res.data.production_time;
						_this.cbz=res.data.quality_time; 						
						// res.data.menu_url=res.data.menu_url.replace('?','.html?');
						_this.menu_url=res.data.menu_url;
						_this.xcx.url=res.data.menu_url;
						console.log("_this.men_url",_this.menu_url);
						console.log("_this.xcx.url",_this.xcx.url);
						_this.jcdd=res.data.menu_monitor[0].test_location;
						_this.jcypname=res.data.menu_monitor[0].sample_name;
						if(res.data.menu_url){
							_this.sdsdk();
						}
						console.log("_this.xcx",_this.xcx)
						_this.sjname=res.data.business.business_name;
						_this.cprice=res.data.menu_money;
						_this.business_id=res.data.business.id;
						
						res.data.business.business_images=JSON.parse(res.data.business.business_images);
						for(let p=0;p<res.data.business.business_images.length;p++){
								_this.sjimg.push({'image':res.data.business.business_images[p]});
						}
						if(res.data.business.business_name.length <=8){
							_this.sj=false;
						}				
							lbtjson = JSON.parse(res.data.menu_images_json)   //轮播图
							_this.lbtimg=lbtjson;
					
					res.data.menu_monitor[0].monitor_image=JSON.parse(res.data.menu_monitor[0].monitor_image) //检疫检测
					_this.jyjcimg.push(res.data.menu_monitor[0].monitor_image)
							
							if(res.data.menu_certificate[0].certificate_image){
								res.data.menu_certificate[0].certificate_image =JSON.parse(res.data.menu_certificate[0].certificate_image) //商品证书
								for(let c=0;c<res.data.menu_certificate[0].certificate_image.length;c++){
									spzsjson.push({'image':res.data.menu_certificate[0].certificate_image[c]});
								}
								_this.spzsimg=spzsjson;
							}
							
							
							for(let i=0;i<res.data.menuAll.length;i++){
							res.data.menuAll[i].menu_images_json=JSON.parse(res.data.menuAll[i].menu_images_json)  //商品列表图片
							// res.data.menuAll[i].menu_monitor[0].monitor_image=JSON.parse(res.data.menuAll[i].menu_monitor[0].monitor_image)  
							// res.data.menuAll[i].menu_certificate[0].certificate_image=JSON.parse(res.data.menuAll[i].menu_certificate[0].certificate_image)
							}
							_this.my_menu.push(res.data.menuAll)
							_this.rmnewlengh=_this.my_menu[0].length;
							console.log("总数组长度",_this.rmnewlengh);
							console.log("_this.my_menu",_this.my_menu)
							_this.my_menu_recommend=_this.my_menu[0][0].recommend
								console.log("_this.my_menu_recommend",_this.my_menu_recommend)
							_this.my_menu_length=_this.my_menu[0].length
								console.log("_this.my_menu_length",_this.my_menu_length)
							if( _this.my_menu_recommend == 0 && _this.my_menu_length<=1){
								_this.xspd = false;
							}	
						});	
		},
		methods: {
	
			more(){
				let _this = this
				this.moreload = true
				setTimeout(function(){
					_this.rmspmore = true
					_this.moreload = true
					_this.rmsplengh=_this.rmnewlengh
					
				},2000)
				
			},
			ck(){
				this.cklt=true
				this.tp = 0
			},
			qx(){
				this.cklt=false
			},
			previewImg(logourl) {
				let _this=this;
				  if (logourl) {
				  	let _this = this;
				  	_this.bigimg = logourl
					console.log("_this.bigimg ",_this.bigimg );
				  	_this.tp = 1
				  	_this.cklt = true
				  	// console.log(this.bigimg)
				  	// let imgsArray = [];
				  	// imgsArray[0] = logourl
				  	// console.log(imgsArray)
				  	// uni.previewImage({
				  	// 	current: 0,
				  	// 	urls: imgsArray
				  	// });
				  	uni.getImageInfo({
				  		src: logourl,
				  		success: (res) => {
							console.log(res)
				  			// resolve(res);
				  			// console.log(res)
								_this.bigimgHeight = res.height + 'rpx'
								_this.bigimgWidth = res.width + 'rpx'
								  			
				  		},
				  		fail: (err) => {
				  			console.log(err)
				  		}
				  	});
				  
				  }
			},
			onPageScroll(e) {
					this.scrollTop = e.scrollTop;
			},
			recommend(index){
				let _this=this;
				console.log(index);
				uni.navigateTo({				
					url: './Product-recommend?index='+_this.my_menu[0][index].id
				})
			},
			business(){
				let _this=this;
				uni.navigateTo({
					url:'../business/business?id='+_this.business_id
				})
			},
			zzc(){
				this.bigimg = '',
				this.bigimgWidth = 0,
				this.bigimgHeight = 0
			},
			sdsdk(){
					let token = uni.getStorageSync('token'); //从缓存数据中获取token
						let _this = this
						var data ={
							url : window.location.href.split('#')[0],
							APIs:JSON.stringify(['getLocalImgData','chooseImage','scanQRCode','uploadImage','downloadImage','openProductSpecificView','chooseWXPay'])
						}
						// console.log("url",data)
					
						uni.request({
							url:'https://sy.zsicp.com/wap/getConfig',
							method:'POST',
							data:data,
							header:{
								token:token
							},
							success: ((res) => {
								console.log("res",res)
							if(res.data.code == 200){
								console.log("res.data",res.data)
								console.log("res.data.data",res.data.data)
								var appId = res.data.data.appid
								var nonceStr = res.data.data.nonceStr
								var signature = res.data.data.signature
								var ticket = res.data.data.ticket
								var timestamp = res.data.data.timestamp
								
							}
							if(appId == '' ||  signature == '' || nonceStr == '' || timestamp == ''){
								console.log("no")
								alert("no")
							}else{
								console.log("appId",appId)
								console.log("nonceStr",nonceStr)
								console.log("signature",signature)
								console.log("ticket",ticket)
								console.log("timestamp",timestamp)
								wx.config({
									
								    debug: false, // 开启调试模式,
									
								    appId: appId, // 必填，企业号的唯一标识，此处填写企业号corpid
									
								    timestamp: timestamp, // 必填，生成签名的时间戳
									
								    nonceStr: nonceStr, // 必填，生成签名的随机串
									
								    signature: signature, // 必填，签名，见附录1
									
								    jsApiList: ['getLocalImgData','chooseImage','scanQRCode','uploadImage','downloadImage','openProductSpecificView','chooseWXPay','wx-open-launch-weapp'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
									
									openTagList: ['wx-open-launch-weapp']
									
								  })
								  
								  wx.ready(function () {
								  	console.log("ok")
					
								  	
								  })
								  
							}
							}),fail(err) {
									let _this = this
									
									if(err.data.message == "身份验证失败"){
										console.log("err",err)
										uni.reLaunch({
											url:'../wxauthorize/wxauthorize'
										})
									}
							}
						
					})	
				},
			}
	}
</script>

<style>
	.noseeill{
		display: none;
	}
	.seeill{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.ltimg{
		height: 830upx;
		width: 640upx;
		 margin-top: -100rpx;
	}
	.seeill .qx{
		height: 80upx;
		width: 80upx;
		position: absolute;
		top: 82%;
	}
	.qxbt{
		height: 80upx;
		width: 80upx;
		margin-top: 10upx;
	}
	page{
		background-color:transparent;
	}
	.bg{
		position: absolute;
		z-index: -1;
		
		left: 0;
		width: 100%;
		height: 1300upx;
		
	}
	.whitebox:first-child{
		padding-bottom: 60upx;
	}
	.lbt{
		margin-top: 10upx;
		box-shadow: 0 0 5upx #C0C4CC;
		border-radius: 30upx;
		overflow: hidden;
		margin-bottom: 20upx;
		height: 430upx;
	}
	.scrq{
		font-size: 28upx;
	}
	.htitle{
		display: flex;
		margin-left:20upx;
	}
	.htitle text{
		font-weight: bold;
		font-size: 30upx;
		margin-top: 5upx;
	}
	.jctbox{
		width: 430upx;
		margin-top: 20upx;
		margin-left: 10upx;
		position: relative;
		display: flex;
	}
	.jctext{
		display: flex;
		font-size: 25upx;
		color:white;
		line-height: 50upx;
	}
	.jctext span{
		font-weight: bold;
		font-size: 26upx;
	}
	.jctbox image{
		width: 180upx;
		height: 190upx;
		position: absolute;
		left: 102%;
		margin-top: -90upx;
	}
	.gdbtn{
		width: 120upx;
		background-color: white;
		height: 50upx;
		position: absolute;
		border-radius: 30upx;
		line-height: 50upx;
		text-align: center;
		left: 109%;
		margin-top: 120upx;
		color: #0ABB9A;
		font-weight: bold;
		}
	.gdbtn:hover{
		opacity: 0.9;
	}
		
	.rzbox{
			margin-top: 30upx;
			width: 610upx;
			height: 300upx;
			display: flex;
			position: relative;
		}
	.rzts{
		margin-left: 20upx;
		position: absolute;
		margin-top: 20upx;
		color: #807d7d;
		font-size: 25upx;
		
	}
	.rzscrool{
		margin-top: 40upx;
		border-radius: 30upx;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block; 
		background-color: #F6F6F6;
		margin-left: -8upx;
		box-shadow: 0 0 10upx #C0C4CC;
	}
	.rzimg image{
		width: 260upx;
		height: 300upx;
		margin-right: 10upx;
	}
	.rzimg:last-child image{
		margin-right: 0upx;
	}
	.qyxx{
		color: white;
		font-size: 35upx;
		position: absolute;
		margin-left: 20upx;
		width:580upx;
		margin-top: 20upx;
		line-height: 55upx;
	}
	.sjbt{
		width: 120upx;
		background-color: white;
		height: 50upx;
		position: absolute;
		border-radius: 30upx;
		line-height: 50upx;
		text-align: center;
		margin-top: 80upx;
		color: #0ABB9A;
		left: 75%;
		font-weight: bold;
		}
	.sjbt:hover{
		opacity: 0.9;
	}
	.sjbtf{
		width: 120upx;
		background-color: white;
		height: 50upx;
		position: absolute;
		border-radius: 30upx;
		line-height: 50upx;
		text-align: center;
		margin-top: 25upx;
		color: #0ABB9A;
		left: 75%;
		font-weight: bold;
		}
	.sjbtf:hover{
		opacity: 0.9;
	}
	.sjbox{
			margin-top: 150upx;
			width: 610upx;
			height: 350upx;
			display: flex;
			position: relative;
			overflow: hidden;
		}
	.sjboxf{
			margin-top: 100upx;
			width: 610upx;
			height: 350upx;
			display: flex;
			position: relative;
			overflow: hidden;
		}	
	.sjscrool{
		margin-top: 40upx;
		border-radius: 30upx;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block; 
		background-color: #F6F6F6;
		margin-left: -8upx;
		box-shadow: 0 0 10upx #C0C4CC;
	}
	.sjts{
		position: absolute;
		color: white;
		font-size: 25upx;
		margin-top: 145upx;
		margin-left: 20upx;
		}
	.sjtsf{
		position: absolute;
		color: white;
		font-size: 25upx;
		margin-top: 85upx;
		margin-left: 20upx;
		}	
	.sjimg image{
		width: 450upx;
		height: 350upx;;
		margin-right: 10upx;
	}
	.sjimg:last-child image{
		margin-right: 0upx;
	}
	.aa{
		box-sizing: content-box;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	/* 图片放大 */
	.bigimg{
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.bigimg .bao{
		position: relative;
		width: 100%;
		height: 100%;
	} 
	.bigimg .bao .zzc{
		position: absolute;
		top: 0;
		left: 0;
		background-color: #3e3e3e;
		width: 100%;
		height: 100%;
		opacity: 0.7;
		
		z-index:-1;
	}
	.bigimg .bao .image{
		
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 1;
	}
	.bigimg .bao .image image{
		width: 100%;
		height: 100%;
	}
	
	
	
</style>

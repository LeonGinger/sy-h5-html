<template>
	<view class="wrapper">
		<image src="@/static/index-bgtest.jpg" :style="{height:bgHeight}" class="bg2"></image>
		<image src="@/static/index-bg.jpg" :style="{height:bgHeight}" class="bg"></image>		
		<view class="content">
			<view class="title">
				<!-- {{title}} -->
				<image src="../../static/logo.png" style="height: 350upx;width: 350upx;"></image>
			</view>
			<view class="modular">
				<view class="scan" @click="scan">
					<view class="icon">
						<image src="../../static/iconfont/scan.png"></image>
					</view>
					<view class="text">扫码溯源</view>
				</view>
				<view class="tips" :style="allWidth < 360 ? 'font-size:12rpx' : 'font-size:24rpx'" @click="login">
					扫描商品溯源标签或箱子上二维码</br>即可查看溯源信息
				</view>
			</view>
			<view class="examples">
				<view class="label"> 
					<image src="../../static/ewma.jpg"></image>
				</view>
				<view class="tips" >
					扫一扫关注公众号
				</view>
			</view>
		
		</view>
		<!-- <connect></connect> -->
		<bottomBar :selected="0" style="background-color: transparent; font-weight: bold;"></bottomBar>
	</view>
</template>
<!-- <script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script> -->

<script>
	// var jweixin = require('@/components/jweixin-module/index.js');
	
	import $ from "../../components/dist/jquery-3.5.1.min.js"
	import wx from '../../components/weixin-js-sdk/index.js';
	// import { getSignature } from '@/api/configure.js'
	export default {
		data() {
			return {
				bgHeight: "",
				allWidth: "",
				title: '协成溯源',
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

				}
			})
		},
		onLoad(res) {
			
			// console.log("toekn",token)
		},
		mounted() {

		},
		methods: {
			
			
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
								
							    jsApiList: ['getLocalImgData','chooseImage','scanQRCode','uploadImage','downloadImage','openProductSpecificView','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
								
							  })
							  
							  wx.ready(function () {
							  	console.log("ok")
							   //  wx.scanQRCode({
							  	
							   //    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
							  	
							   //    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
							  	
							   //    success: function (res) {
							  	
							   //      var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
							  	
							   //      // console.log("rrrr",res)
							  	
							   //      let params = {opType: 'add', result}
							  	
							   //      // alert(result)
							  	
							   //      // that.$router.push({path: '/speaker_set', query: { boxMsg: encodeURIComponent(JSON.stringify(params)) }})
							  	
							   //    }
							  	
							   //  })
							  	
							  })
							  
						}
						}),fail(err) {
								let _this = this
								
								if(err.data.message == "身份验证失败"){
									console.log("err",err)
									_this.sdsdk()
								}
						}
					
				})	
			},
			bindPickerChange: function(e) {
						this.index = e.detail.value;
						console.log(e.detail.value+1);
					},

			scan() {
				// uni.navigateTo({
				// 	url: "../traceability/traceability"
				// })
				this.sdsdk()
				wx.scanQRCode({
				  needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				  success: function (res) {
				    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				  }
				});
				//  uni.request({
				// 	url:"https://devs.zsicp.com" + "/api/User/session_set",
				// 	method:"GET",
				// 	success(res) {
				// 		console.log("res",res)
				// 	}
				// })
				
				
				
				
				// let that = this
				// that.$axios({
				// 		method: "post", //指定请求方式
				// 		url: "http://swm5.jiedx.cn/entrance/JD/no/menuselect", //请求接口（相对接口，后面会介绍到）
				// 		data: {

				// 		} //欢迎加入全栈开发交流圈一起学习交流：864305860
				// 	}) //面向1-3年前端人员
				// 	.then(function(res) { //帮助突破技术瓶颈，提升思维能力
				// 		//接口成功返回结果执行
				// 		console.log(res)
				// 	})
				// 	.catch(function(err) { 
				// 		//请求失败或者接口返回失败或者.then()中的代码发生错误时执行
				// 		console.log(err)
				// 	})
			},
			
						
				scaneCode () {
						
				    const _this = this
						
				    
			
			
			}
		},

		
		   
		

	}
</script>

<style lang="scss">
	page {
		background-color: transparent;
	}

	.wrapper {
		position: relative;

		.bg {
			width: 100%;
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			animation:mybg 0.8s linear;
		}
		@keyframes mybg
		{
		0% {opacity: 0;}
		50% {opacity: 0;}
		100% {opacity: 1;}
		}
		.bg2 {
			width: 100%;
			z-index: -999;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.content {
		position: relative;
		display: flex;
		flex-wrap: wrap;

		.title {
			margin: 70rpx auto;
			// font-family: "btfont";
			// font-size: 140rpx;
			color: #FFFFFF;
			// text-shadow: -4px -4px #0abb9a,4px 4px #0abb9a,-4px 4px #0abb9a,3px -3px #0abb9a;
			-webkit-text-stroke: 5rpx #0abb9a;
			letter-spacing: 5rpx;
			font-weight: 900;
		}
		
		.modular {
			width: 100%;
			margin: 0 auto;

			.scan {
				width: 90%;
				margin: 30rpx auto;
				display: flex;
				justify-content: center;
				background-color: #0abb9a;
				border-radius: 80rpx;
				padding: 20rpx 0rpx;
				box-shadow: 1px 1px 3px #8c8c8c;
				overflow: hidden;
				height: 110upx;
				.icon {
					width: 70rpx;
					height: 70rpx;
					margin-right: 30rpx;
					animation:myfirst 1.1s;
					// margin-top: 5upx;
					image {
						width: 100%;
						height: 100%;
					}
				@keyframes myfirst
				{
				from {transform: scale(0.4);}
				to {ransform: scale(1)}
				}	
				}

				.text {
					font-size: 40rpx;
					color: #FFFFFF;
					line-height: 80rpx;
					animation:myfirst2 1.1s;
					margin-top: -5upx;
				}
				@keyframes myfirst2
				{
				from {margin-left:300rpx;opacity: 0;}
				to {margin-left: 0rpx;opacity: 1;}
				}
			}

			.tips {
				width: 100%;
				color: #696c6b;
				text-align: center;
				font-size: 6rpx;
			}
		}

		.examples {
			margin: 80rpx auto 0rpx;

			.label {
				margin: 0 auto;
				width: 230rpx;
				height: 230rpx;
				// border-radius: 50%;
				// overflow: hidden;

				image {

					width: 100%;
					height: 100%;
				}
			}

			.tips {
				text-align: center;
				margin-top: 30rpx;
				color: #696c6b;
				font-size: 26rpx;
			}
		}
	}
</style>

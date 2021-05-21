<template>
	<view>
		
	</view>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
	import wx from "@/components/weixin-js-sdk/index.js"
	export default {
	
	data(){
			return {
				token: '',
				message: '',
				showloading: true,
				weizinlogin: false,
				userinfo:[],
			};
		},
		onLoad(res) {
			this.login()
			// setTimeout(() => {
			// this.sdsdk()
			// },1000)
			
			
			// let _this=this;
			
			
			
		},
		methods:{
			
			login(){
				let _this = this
				function getQueryString(name) {
					// console.log("name",name)
				    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
					// console.log("reg",reg)
				    var r = window.location.search.substr(1).match(reg);
					// console.log("r",r)
				    if (r != null) return unescape(r[2]);
				    return null;
				}	
			
				let code = getQueryString('code');
				console.log("code",code)
				// console.log("window",window.location.href)
				var local = this.syhttp + '/#/pages/wxauthorize/wxauthorize'; // 获取页面url
				// console.log("local",local)
				// var appid = 'wxd49aee67b33932b2';
				var appid = 'wxde8d5214f18aa7e4';  //乐乡游
				if (code == null || code === '') { //如果没有code就打开微信网址请求获取code
						window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
				}
				uni.request({
					url:this.gethttp+'/user/user/Login',//发起请求让后台解析code获取用户信息
					data: {
						code: code
					},
					success: ((res) => {
						uni.setStorage({   //保存这个token
						    key: 'token',
						    data: res.data.data.token
						   
						});
						_this.token = res.data.data.token
						console.log("token",res.data.data.token)
						_this.userinfo=res.data.data;
						if (res.data.message =='您未关注公众号，请重试' ) {
								//跳去关注公众号
								var gzhlink='https://mp.weixin.qq.com/s/gOw4IdpDcIUYGuFxJFBc_A';
								window.location.replace(gzhlink);
						}else{
							let thishref = uni.getStorageSync('thishref',thishref);
							var href= 'https://sy.zsicp.com/h5/#/pages/index/index';  
							console.log("上个页面获取的url",thishref);
				
								if(thishref){
									window.location.replace(thishref);
								}
								else{
									window.location.replace(href);
								}
						
						}
					})
				})
				
			},
			
			
			sdsdk(){
				let _this = this
				console.log("fdsafdsaf",_this.token)
				var data ={
					url : window.location.href.split('#')[0],
					APIs:JSON.stringify(['getLocalImgData','chooseImage','scanQRCode','uploadImage','downloadImage','openProductSpecificView','chooseWXPay']),
				}
				// console.log("url",data)
			
				uni.request({
					url:'https://sy.zsicp.com/wap/getConfig',
					method:'POST',
					data:data,
					header:{
						token:_this.token
					},
					success: ((res) => {
						console.log("res",res)
						console.log("thisff",_this.token)
					if(res.data.code == 200){
						
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
		}
		
		}}
</script>

<style>
</style>

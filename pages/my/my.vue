
<template>
	<view class="content">
		<!-- 个人信息 start -->
		<view class="state">
			<image src="@/static/my-bg2.jpg" class="bg2"></image>
			<image src="@/static/my-bg.jpg" class="bg"></image>
			<!-- 设置 start -->
			<view class="setup">
				<view class="fun" v-if="animation == 0">
					<view class="btn modify" @click="Modify" :style="State == 3 ? '':'border:none'">修改个人信息</view>
					<view class="btn register" @click="Register" v-if="State == 3">操作人员注销</view>
				</view>
				<view :class="animation == 2 ?'fun_false':'fun_true'" v-else>
					<view class="btn modify" @click="Modify" :style="State == 3 ? '':'border:none'">修改个人信息</view>
					<view class="btn register" @click="Register" v-if="State == 3">操作人员注销</view>
				</view>
				<view class="setup_img" @click="Setup" v-if="animation == 0">
					<image src="../../static/iconfont/setup.png"></image>
					<view class="sz">设置</view>
				</view>
				<!-- <view class="setup">设置</view> -->
				<view class="setup_img "  @click="Setup" v-else>
					<image src="../../static/iconfont/setup.png" :class="animation != 2 ? 'setup_img_animation_left':'setup_img_animation_right'"></image>
					<view class="sz">设置</view>
				</view>
			</view>
			<!-- 设置 end -->
			<!-- 登录头像 start -->
			<view class="login">
				<view class="login_information">					
					<image src="../../static/default_img.png" style="box-shadow:none" v-if="State == 0" @click="gologin"></image>
					<image :src="Img"  v-if="State != 0"></image>
					<view class="login_state_yes" v-if="State == 1 || State == 2 || State == 3">
						<view class="text">{{role_name}}</view>
						<image :src="State == 3 ? '../../static/iconfont/czy.png' : '../../static/iconfont/fzr.png'" :style="State == 3 ? '' : ''"></image>
					</view>
					<view class="login_state_no" v-else>
						<view class="text">{{role_name}}</view>
					</view>
				</view>
				<view class="text">
					<view class="login_name" :style="State == 0 ? 'font-size: 34rpx; font-weight: normal;' : ''">{{State == 0 ? '点击头像授权登陆' : Name}}</view>
					<view class="login_address" v-if="verify_if == 1 && State != 0">{{business_name}}</view>
					<view class="login_address" v-if="verify_if == 3">{{State == 4 ? '商家入驻申请审核中，请耐心等待...':'商家信息修改审核中，请耐心等待...'}}</view>
				</view>
			</view>
			<!-- 登录头像 end -->
		</view>
		<!-- 个人信息 end -->
		
		
		<view class="funbar">
			<!-- 通用工具栏 start -->
			<view class="currency">
				<view class="btn history" @click="History">
					<view class="icon">
						<image src="../../static/iconfont/syls.png"></image>
					</view>
					<view class="text">溯源记录</view>
				</view>
				<view class="btn problem" @click="Problem">
					<view class="icon">
						<image src="../../static/iconfont/lxwm.png"></image>
					</view>
					<view class="text">联系我们</view>
				</view>
				
				<view class="btn shopping" @click="Shopping" name="lxy" style="position: relative;">
						<view class="icon">
							<image src="../../static/iconfont/sc.png"></image>
						</view>
						<view class="text">乐乡游商城</view>
						<wx-open-launch-weapp  id="launch-btn" username="gh_77acf6c16111"  path="/pages/index/index"
						style="background-color: #000000;width: 50rpx;height: 150rpx;position: absolute;margin-left: 5upx;opacity: 0;">
							<script type="text/wxtag-template">   
									  <style>
									     .btn {
											width: 70rpx;
											height: 50rpx;
											background-color: #18B566;
											font-weight: bold;
											display: block;
											opacity: 0;
										 }
									    </style>
									   <view class="btn">打开程序</view>
	
							</script>
						</wx-open-launch-weapp>	
				</view>
				
				<view class="btn join" @click="Join" v-if="State == 1 || State == 0 || State == 4 && verify_if != 3">
					<view class="icon">
						<image src="../../static/iconfont/cwsj.png"></image>
					</view>
					<view class="text">商家入驻</view>
				</view>
				<!-- <view class="btn shop_admin" @click="shop_Admin" v-if="state == 3">
					<image src="../../static/iconfont/sjgl.png"></image>
					<view class="text">商家管理</view>
				</view> -->
				<view class="btn shop_admin" @click="shop_Admin" v-if="State == 1 || State == 2 &&  verify_if !=3">
					<view class="icon">
						<image src="../../static/iconfont/sjgl.png" style="margin-left: -5upx;"></image>
					</view>
					<view class="text">商家管理</view>
				</view>
				<!-- 审核中或审核不通过状态 -->
				<view class="btn noshop_admin" @click="noshop_Admin" v-if="verify_if ==3">
					<view class="icon">
						<image src="../../static/iconfont/sjgl.png" style="margin-left: -5upx;"></image>
					</view>
					<view class="text">等待审核</view>
				</view>
				<view class="btn staff" @click="Staff" v-if="State == 1 || State == 2 || State == 3">
					<view class="icon">
						<image src="../../static/iconfont/rygl.png"></image>
					</view>
					<view class="text">员工管理</view>
				</view>
				<view class="btn scan" @click="Scan"  v-if="State == 1 || State == 2 || State == 3">
					<view class="icon">
						<image src="../../static/iconfont/scan.png"></image>
					</view>
					<view class="text">出入库扫码</view>
				</view>
				<view class="btn cancellation" @click="Cancellation" v-if="State == 1 || State == 2 || State == 3">
					<view class="icon">
						<image src="../../static/iconfont/crkjl.png"></image>
					</view>
					<view class="text">出入库记录</view>
				</view>
				<view class="btn commodity_admin" @click="commodity_Admin" v-if="State == 1 || State == 2 || State == 3">
					<view class="icon">
						<image src="../../static/iconfont/spgl.png"></image>
					</view>
					<view class="text">商品管理</view>
				</view>
			</view>
			
		</view>
		<view class="caption">
			<!-- <view class="corporate_name">协成科技有限公司 版权所有</view>
			<view class="qq">QQ:985424414</view> -->
			<view class="title">溯源平台</view>
			<view class="contact">客服微信:18938746486</view>
			<view class="jvc">(加微信请留言"溯源平台")</view>
			<view class="copyright">Copyright 2021 ZhiLv. All Rights Reserved</view>
		</view>
		<bottomBar :selected="1"></bottomBar>
	</view>
</template>

<script src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
<script type="text/javascript">
	import $ from "../../components/dist/jquery-3.5.1.min.js"
	import wx from '../../components/weixin-js-sdk/index.js';
	
	export default {
		data() {
			return {
				//用户信息
				uinfo: [],
				token: '',
				//动画状态
				animation: 0,
				//登陆状态 : 0游客 / 1管理员 / 2商家 / 3操作员 / 4消费者
				//用户名
				// state: 0,
				Name: "",
				//用户头像
				Img: "@/static/login.jpg",
				//用户状态
				State:0,
				business_id:'',
				//商家地址
				business_name:'',
				business_images:[],
				//判断商家是否有图集
				img_info:0,
				role_name:'',
				verify_if:0,  //1已核审2不通过核审3未核审
				shts:'' //审核提示
			}
		},
		onLoad() {
			// this.refresh()
			let _this=this
			// let token = uni.getStorageSync("token");
			this.sdsdk()
			
			// console.log("toekn",token)
			// uni.getStorage({
			// key:"token",
			// success(e){
			//  _this.token={token : e.data}
			 // console.log(e.data)
			 _this.$api.userinfo().then((res) =>{
				 _this.uinfo = res.data
				 _this.Name = _this.uinfo.username
				 _this.Img = _this.uinfo.user_image
				 _this.State = _this.uinfo.role_id
				 _this.role_name = _this.uinfo.role_name
				 _this.verify_if=_this.uinfo.business.verify_if
				 _this.business_name = res.data.business.business_name
				 _this.business_images  = res.data.business.business_images 
				 _this.business_id  = res.data.business.business_id 
				  console.log("res",res.data[0])
				 if(_this.uinfo.role_id == 2 || _this.uinfo.role_id == 3){
					_this.$api.business_selectall().then((res) =>{
						
				
						if(res.data[0].img_info == 1){
							_this.img_info = res.data[0].img_info
						}
					}).catch((err) => {
							 _this.shts=err.data.message
						});
				 }
			 })
			
			 // console.log(_this.token)
			// }
			// })
		},
		onShow(){
			this.animation = 0
		},
		onReady() {
			const _this = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					let allheight = res.windowHeight
					let shopWidth = res.windowWidth
					// 背景图片高度
				}
			})
		},
		methods: {
			//获取用户信息
			// obtain_uinfo(){
			// 	this.uinfo = getApp().globalData.data
			// 	this.img = uinfo.uinfo.user_image
			// 	this.Name = uinfo.uinfo.username
			// 	this.token = uinfo.token
			// 	console.log("tt",this.uinfo)
			// },
			//登录
			gologin(){
				var thishref = window.location.href; 
				uni.setStorageSync('thishref',thishref);
				uni.reLaunch({
					url:'../wxauthorize/wxauthorize'
				})
			},
			// 溯源历史
			History() {
				if(this.State == 0){
					
				}else{
					uni.navigateTo({
						url: "../traceability/traceability-list"
					})
				}
				

			},
			//联系我们
			Problem() {
				uni.navigateTo({
					url: "../contact/contact"
				})
			},
			//乐乡游商城
			Shopping() {
				wx.ready(res => {
				                console.log(res);
				                this.$nextTick(() => {
				                    let btn = document.getElementById('launch-btn');
				                    btn.addEventListener('launch', e => {
				                        console.log('success');
				                    });
				                    btn.addEventListener('error', e => {
				                        alert('小程序打开失败');
				                        console.log('fail', e.detail);
				                    });
				                });
				 });
			},
			//商家入驻
			Join() {
				uni.navigateTo({
					url: "../business/business-notice"
				})
			},
			//员工管理
			Staff() {
				let _this=this;
				if(!_this.business_images){
					uni.showModal({
						title:"提示",
						content:"您的商家信息还未填写完整\n请您点击”确定“去完善商家信息",
						confirmColor:'#0ABB9A',
						showCancel:false,
						success:(res) =>{
							if(res.confirm){
								uni.navigateTo({
									url: '../business/business-addition?business_id='+_this.business_id
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url: "../employee/employee-list"
					})
				}
				
			},
			//商品管理
			commodity_Admin() {
		let _this=this;		
		if(!_this.business_images){
			uni.showModal({
				title:"提示",
				content:"您的商家信息还未填写完整\n请您点击”确定“去完善商家信息",
				confirmColor:'#0ABB9A',
				showCancel:false,
				success:(res) =>{
					if(res.confirm){
						uni.navigateTo({
							url: '../business/business-addition?business_id='+_this.business_id
						})
					}
				}
			})
		}else{
						uni.navigateTo({
							url: '../Product/Product-list'
						})
		
			}	
				
			},
			//出入库扫码
			Scan() {
				
				wx.scanQRCode({
				  needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
				  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
				  success: function (res) {
				    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				  }
				});
			},
			//出入库记录
			Cancellation() {
				let _this=this;
				if(!_this.business_images){
					uni.showModal({
						title:"提示",
						content:"您的商家信息还未填写完整\n请您点击”确定“去完善商家信息",
						confirmColor:'#0ABB9A',
						showCancel:false,
						success:(res) =>{
							if(res.confirm){
								uni.navigateTo({
									url: '../business/business-addition?business_id='+_this.business_id
								})
							}
						}
					})
				}else{
				uni.navigateTo({
					url: '../operation/operation-list'
				})
				}
			},
			//商家管理
			shop_Admin() {
				uni.navigateTo({
					url: '../business/business-admin'
				})
			},
			noshop_Admin(){
				let _this=this;
				if(_this.State == 4){
					uni.showModal({
						title: '提示',
						content:'您的入驻申请审核中\n请耐心等待..\n',
						confirmColor: '#0ABB9A',
						showCancel: false,
						success: function(res) {
							
						}
					})
				}else{
					uni.showModal({
						title: '提示',
						content: '您的商家信息修改审核中\n请耐心等待..\n',
						confirmColor: '#0ABB9A',
						showCancel: false,
						success: function(res) {
							
						}
					})
				}
				
			},
			Setup() {
				if (this.animation == 0 || this.animation == 2) {
					this.animation = 1
				} else if (this.animation == 1) {
					this.animation = 2
				}
			},
			Modify() {
				if (this.animation == 0 || this.animation == 2) {

				} else if (this.animation == 1) {
					// console.log("aaaa")
					uni.navigateTo({
						url: "./modify"
					})
				}

			},
			
			Register() {
				let _this = this
				if(this.animation == 1 && this.State == 3){
					uni.showModal({
						title:"提示",
						content:"请问您确定要注销操作员吗",
						confirmColor:'#0ABB9A',
						success: (res) => {
							if (res.confirm) {
								_this.$api.my_quit().then((res)=>{
									uni.showToast({
										icon:true,
										title: '注销操作员成功',
									});
									uni.reLaunch({
										url:'my'
									})
								})
								
							} else if (res.cancel) {
								
							}
						}
					})
				}
				
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
									
								    signature: signature, // 必填，签名
									
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
				bindPickerChange: function(e) {
							this.index = e.detail.value;
							console.log(e.detail.value+1);
						},
			
				
				
							
					scaneCode () {
							
					    const _this = this
							
					    
				
				
				}
			},
			



		


	}
</script>

<style lang="scss">
	page {
		// font-family: "webfont";
		background-color: transparent;
	}

	//设置左转
	@keyframes setup_img_animation_left {
		form {}

		to {
			transform: rotate(60deg);
		}
	}

	@-moz-keyframes setup_img_animation_left {
		form {}

		to {
			transform: rotate(60deg);
		}
	}

	@-webkit-keyframes setup_img_animation_left {
		form {}

		to {
			transform: rotate(60deg);
		}
	}

	@-o-keyframes setup_img_animation_left {
		form {}

		to {
			transform: rotate(60deg);
		}
	}

	//设置右转
	@keyframes setup_img_animation_right {
		form {}

		to {
			transform: rotate(-60deg);
		}
	}

	@-moz-keyframes setup_img_animation_right {
		form {}

		to {
			transform: rotate(-60deg);
		}
	}

	@-webkit-keyframes setup_img_animation_right {
		form {}

		to {
			transform: rotate(-60deg);
		}
	}

	@-o-keyframes setup_img_animation_right_right {
		form {}

		to {
			transform: rotate(-60deg);
		}
	}

	//开启动画设置
	@keyframes setup_animation_true {
		form {
			opacity: 0;
			transform: translateX(60rpx);
		}

		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@-moz-keyframes setup_animation_true {
		form {
			opacity: 0;
			transform: translateX(60rpx);
		}

		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@-webkit-keyframes setup_animation_true {
		form {
			opacity: 0;
			transform: translateX(60rpx);
		}

		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@-o-keyframes setup_animation_true {
		form {
			opacity: 0;
			transform: translateX(60rpx);
		}

		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	//关闭设置动画
	@keyframes setup_animation_false {
		form {
			opacity: 1;
			transform: translateX(0rpx);
		}

		to {
			opacity: 0;
			transform: translateX(60rpx);
		}
	}

	@-moz-keyframes setup_animation_false {
		form {
			opacity: 1;
			transform: translateX(0rpx);
		}

		to {
			opacity: 0;
			transform: translateX(60rpx);
		}
	}

	@-webkit-keyframes setup_animation_false {
		form {
			opacity: 1;
			transform: translateX(0rpx);
		}

		to {
			opacity: 0;
			transform: translateX(60rpx);
		}
	}

	@-o-keyframes setup_animation_false {
		form {
			opacity: 1;
			transform: translateX(0rpx);
		}

		to {
			opacity: 0;
			transform: translateX(60rpx);
		}
	}

	.setup_img_animation_left {
		animation: setup_img_animation_left 0.5s forwards;
		-moz-animation: setup_img_animation_left 0.5s forwards;
		/* Firefox */
		-webkit-animation: setup_img_animation_left 0.5s forwards;
		/* Safari 和 Chrome */
		-o-animation: setup_img_animation_left 0.5s forwards;
		/* Opera */
	}

	.setup_img_animation_right {
		animation: setup_img_animation_right 0.5s forwards;
		-moz-animation: setup_img_animation_right 0.5s forwards;
		/* Firefox */
		-webkit-animation: setup_img_animation_right 0.5s forwards;
		/* Safari 和 Chrome */
		-o-animation: setup_img_animation_right 0.5s forwards;
		/* Opera */
	}

	.content {

		//登陆
		.state {
			position: relative;
			width: 100%;
			height: 400rpx;

			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				animation:mybg 0.8s linear;
			}
			@keyframes mybg
			{
			0% {opacity: 0;}
			50% {opacity: 0;}
			100% {opacity: 1;}
			}
			.bg2 {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
			}
			.setup {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				display: flex;
				.sz{
					color: #909090;
					text-align: center;
					font-size: 26rpx;
					margin-top: 60rpx;
				}
				.setup_img {
					position: relative;
					width: 60rpx;
					height: 60rpx;
					flex: 1;
					image {
						position: absolute;
						width: 100%;
						height: 100%;
					}
				}

				//开启动画
				.fun_true {

					animation: setup_animation_true 0.5s forwards;
					-moz-animation: setup_animation_true 0.5s forwards;
					/* Firefox */
					-webkit-animation: setup_animation_true 0.5s forwards;
					/* Safari 和 Chrome */
					-o-animation: setup_animation_true 0.5s forwards;
					/* Opera */
					opacity: 0;
					transform: translateX(60rpx);
					border-radius: 30rpx;
					padding: 20rpx;
					background-color: #FFFFFF;
					z-index: 1;

					.btn {
						padding: 10rpx 0;

						font-size: 24rpx;
						color: #8b8f8e;
					}

					.btn:first-child {
						border-bottom: 1px solid #d9dfde;
					}
				}

				//关闭动画
				.fun_false {
					animation: setup_animation_false 0.5s forwards;
					-moz-animation: setup_animation_false 0.5s forwards;
					/* Firefox */
					-webkit-animation: setup_animation_false 0.5s forwards;
					/* Safari 和 Chrome */
					-o-animation: setup_animation_false 0.5s forwards;
					// opacity: 0;
					transform: translateX(0rpx);
					/* Opera */
					border-radius: 30rpx;
					padding: 20rpx;
					background-color: #FFFFFF;

					.btn {
						padding: 10rpx 0;
						font-size: 24rpx;
					}
				}

				//开头
				.fun {
					opacity: 0;
					transform: translateX(0rpx);
					/* Opera */
					border-radius: 30rpx;
					padding: 20rpx;
					background-color: #FFFFFF;

					.btn {
						padding: 10rpx 0;
						font-size: 24rpx;
					}
				}
			}

			.login {
				position: absolute;
				left: 10%;
				top: 32%;
				display: flex;

				//用户头像
				.login_information {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					position: relative;
					box-shadow:0rpx 0rpx 10rpx #909090;

					image {
						position: absolute;
						width: 100%;
						height: 100%;
						border-radius: 50%;
						
						box-shadow: 5rpx 5rpx 0rpx #FFFFFF, -5rpx -5rpx 0rpx #FFFFFF, -5rpx 5rpx 0rpx #FFFFFF, 5rpx -5rpx 0rpx #FFFFFF;
					}

					//用户状态
					//操作员和负责人状态样式
					.login_state_yes {
						position: absolute;
						background-color: #0abb9a;
						width: 80%;
						height: 25%;
						border-radius: 30rpx;
						bottom: -20rpx;
						left: 50%;
						display: flex;
						justify-content: flex-start;
						transform: translate(-50%, 0%);
						box-shadow: 5rpx 5rpx 0rpx #FFFFFF, -5rpx -5rpx 0rpx #FFFFFF, -5rpx 5rpx 0rpx #FFFFFF, 5rpx -5rpx 0rpx #FFFFFF;

						.text {
							font-size: 25rpx;
							// text-align: left;
							color: #FFFFFF;
							font-weight: 900;
							line-height: 45rpx;
							margin: 0 0 0 20rpx;
						}

						image {
							left: 75%;
							top: 20%;
							width: 15%;
							height: 60%;
							box-shadow: none;
						}

					}

					//游客和消费者状态样式
					.login_state_no {
						position: absolute;
						background-color: #0abb9a;
						width: 70%;
						height: 25%;
						border-radius: 30rpx;
						bottom: -20rpx;
						left: 50%;
						transform: translate(-50%, 0%);
						box-shadow: 5rpx 5rpx 0rpx #FFFFFF, -5rpx -5rpx 0rpx #FFFFFF, -5rpx 5rpx 0rpx #FFFFFF, 5rpx -5rpx 0rpx #FFFFFF;

						.text {
							font-size: 26rpx;
							color: #FFFFFF;
							font-weight: 700;
							line-height: 45rpx;
							// background-color: red;
							margin: 0rpx;
							text-align: center;
							// background-color: red;

						}
					}
				}

				.text {
					margin-left: 20rpx;
					margin-top: 30rpx;

					//用户名
					.login_name {
						font-weight: 700;
						line-height: 80rpx;
						font-size: 38rpx;
					}

					.login_address {
						font-size: 26rpx;
					}
				}
			}
		}

		//功能栏
		.funbar {
			width: 100%;
			// height: 500rpx;
			margin-top: -30rpx;

			//通用功能栏
			.currency {
				margin: 0 auto;
				width: 90%;
				background-color: #FFFFFF;
				// box-shadow: 0rpx 5rpx 10px 1rpx #dcd5d5;
				box-shadow: 0 0 12upx #C0C4CC;
				border-radius: 50rpx;
				display: flex;
				flex-wrap: wrap;
				padding: 20rpx 20rpx 50rpx;

				//统一按钮样式
				.btn {
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					margin-top: 30rpx;
					animation:myfirst 1s;
					// background-color: red;
				@keyframes myfirst
					{
					from {transform: scale(0.8);opacity: 0;}
					to {ransform: scale(1);opacity: 1;}
					}
					.icon {
						width: 65%;
						height: 105rpx;
						border-radius: 50%;
						box-shadow: 0rpx 0rpx 8rpx #a3a3a3;

						image {
							width: 55%;
							height: 50%;
							transform: translate(45%, 50%)
						}
					}

					.text {
						margin-top: 30rpx;
						font-size: 26rpx;
					}
				}
			}

			//溯源历史
			.history {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#98d4ff, #37abff);
					box-shadow: -15rpx -15rpx 20rpx #339dff inset;
				}
			}

			//联系我们
			.problem {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#c298fa, #8a75f3);
					box-shadow: -15rpx -15rpx 20rpx #8a75f3 inset;

					image {
						width: 60% !important;
						height: 60% !important;
						transform: translate(35%, 35%) !important;
					}
				}
			}

			//乐乡游商城
			.shopping {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#88f4e7, #4ed8cb);
					box-shadow: -15rpx -15rpx 20rpx #4ed8cb inset;
				}
			}

			//商家入驻
			.join {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#faa989, #f17669);
					box-shadow: -15rpx -15rpx 20rpx #f17669 inset;

					image {
						width: 75% !important;
						height: 75% !important;
						transform: translate(20%, 20%) !important;
					}
				}
			}

			//员工管理
			.staff {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#fcc0a1, #f97581);
					box-shadow: -15rpx -15rpx 20rpx #f97581 inset;

					image {
						width: 60% !important;
						height: 50% !important;
						transform: translate(40%, 45%) !important;
					}
				}
			}

			//出入库扫码
			.scan {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#73f2ad, #3dd380);
					box-shadow: -15rpx -15rpx 20rpx #3dd380 inset;

					image {
						width: 55% !important;
						height: 55% !important;
						transform: translate(43%, 43%) !important;
					}
				}
			}

			//出入库记录
			.cancellation {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#d66897, #8d4b9e);
					box-shadow: -15rpx -15rpx 20rpx #8d4b9e inset;

					image {
						width: 60% !important;
						height: 60% !important;
						transform: translate(35%, 35%) !important;
					}
				}
			}
			
			//商品管理
			.commodity_admin {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#ffc093, #ff7920);
					box-shadow: -10rpx -10rpx 20rpx #8d4b9e inset;
			
					image {
						width: 60% !important;
						height: 65% !important;
						transform: translate(35%, 25%) !important;
					}
				}
			}
			
			//商家管理
			.shop_admin {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#ffa5ce, #ff42ad);
					box-shadow: -15rpx -15rpx 20rpx #8d4b9e inset;
			
					image {
						width: 45% !important;
						height: 55% !important;
						transform: translate(70%, 40%) !important;
					}
				}
			}
			
			
			.noshop_admin {
				.icon {
					width: 50rpx;
					height: 50rpx;
					background: linear-gradient(#bcbaba, #8d8d8d);
					box-shadow: -15rpx -15rpx 20rpx gray inset;
			
					image {
						width: 45% !important;
						height: 55% !important;
						transform: translate(70%, 40%) !important;
					}
				}
			}
			// connect {
			// 	padding: 50rpx;
			// }

			//商家功能栏
		
				// 	.commodity_admin {
				// 		display: flex;
				// 		background-color: #FFFFFF;
				// 		padding: 15rpx 25rpx;
				// 		border-radius: 50rpx;
				// 		margin-right: 20rpx;

				// 		.text {
				// 			margin-left: 10rpx;
				// 			color: #000000;
				// 			font-weight: normal;
				// 		}
				// 	}

				// 	.shop_admin {
				// 		display: flex;
				// 		background-color: #FFFFFF;
				// 		padding: 15rpx 25rpx;
				// 		border-radius: 50rpx;

				// 		.text {
				// 			margin-left: 10rpx;
				// 			color: #000000;
				// 			font-weight: normal;
				// 		}
				// 	}
				// }

				// .shop_rz {
				// 	position: absolute;
				// 	width: 40%;
				// 	height: 85%;
				// 	right: -30rpx;
				// 	bottom: -20rpx;
				// }
			// }
		}

		.caption {
			position: fixed;
			line-height: 40rpx;
			bottom: 50rpx;
			left: 50%;
			transform: translate(-50%, -50%);
			text-align: center;
			color: #C0C4CC;
			font-size: 22rpx;
			z-index: -1;
			width: 100%;
			.copyright{
				flex-wrap: nowrap;
			}	
		}
	}
</style>

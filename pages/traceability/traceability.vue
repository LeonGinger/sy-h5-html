<template>
	<view class="wrapper">
		<u-modal v-model="noqxbg" :content="content" @confirm="confirm" ref="uModal" :async-close="true"></u-modal>
		<view :style="noqxbg? 'display:none':''">
			<image src="../../static/sp-bg.jpg" class="bg"></image>
			<view class="ytitle" v-if="qx == false">
				<text class="ytext" style="font-size: 70rpx;">农产品溯源信息</text>
			</view>
			<view class="ytitle" v-if="qx == true">
				<text class="ytext">商品操作</text>
			</view>
			<!-- 轮播图 -->
			<view class="whitebox">
				<view class="lbt">
					<u-swiper :list="lbtimg[0]"></u-swiper>
				</view>
			</view>
			<!-- 轮播图 -->
			<connect class="connect"></connect>
			<!-- 溯源信息 -->



			<!-- 未入库或未出库 -->
			<view v-if="qx == true">
				<view class="whitebox">
					<view class="utitlebox" style="margin-top: 20upx;margin-bottom: 10upx;">
						<view class="utitleblock"></view>
						<view class="utitle">商品信息</view>

					</view>
					<u-form style="margin-left: 20upx;">
						<u-form-item label="商品名称:"><text>{{spxx.menu_name}}</text></u-form-item>
						<u-form-item label="商品规格:"><text>{{spxx.menu_weight}}</text></u-form-item>
						<u-form-item label="生源产地:"><text>{{spxx.menu_address}}</text></u-form-item>
						<u-form-item label="批次编号:"><text>{{spxx.source_code}}</text></u-form-item>
						<u-form-item label="生产日期:"><text>{{spxx.production_time.slice(0,10)}}</text></u-form-item>						
						<u-form-item label="入库时间:" v-if="spxx.storage_time"><text>{{spxx.storage_time}}</text>
						</u-form-item>
						<u-form-item label="操作人员:" v-if="spxx.storage_time"><text>{{spxx.pull_user}}</text><text
								style="margin-left: 10upx;">{{spxx.pull_phone}}</text></u-form-item>
						<u-form-item label="出库时间:" v-if="spxx.deliver_time"><text>{{spxx.deliver_time}}</text>
						</u-form-item>
					</u-form>
				</view>
				<view v-if="qx == true">
					<view class="whitebox" v-if="spxx.deliver_time">
						<view class="utitlebox" style="margin-top: 20upx;margin-bottom: 10upx;">
							<view class="utitleblock"></view>
							<view class="utitle">物流信息</view>
							<view class="xg" @click="xg">修改</view>
						</view>
						<u-form style="margin-left: 20upx;">
							<u-form-item label="快递编号:" v-if="spxx.deliver_time"><text>{{spxx.goto_order}}</text>
							</u-form-item>
							<u-form-item label="收货人员:" v-if="spxx.deliver_time"><text>{{spxx.goto_user}}</text>
							</u-form-item>
							<u-form-item label="手机号码:" v-if="spxx.deliver_time"><text>{{spxx.goto_mobile}}</text>
							</u-form-item>
							<u-form-item label="发货时间:" v-if="spxx.deliver_time"><text>{{spxx.deliver_time}}</text>
							</u-form-item>
							<u-form-item label="收货时间:" v-if="spxx.scan_time"><text>{{spxx.scan_time}}</text>
							</u-form-item> 
						</u-form>
					</view>

					<view class="btbox">
						<view class="bt1" @click="btback">返回</view>
						<view @click="btconfirmrk" v-if="!spxx.storage_time && !spxx.deliver_time" class="bt2">入库</view>
						<view @click="btconfirmck" v-if="spxx.storage_time && !spxx.deliver_time" class="bt2">出库</view>
						<view class="bt3" v-if="spxx.storage_time && spxx.deliver_time">已出库</view>
					</view>
					<view class="aa" style="padding-bottom: 60rpx;"></view>
					<view class="iPhone" style="padding-bottom: 40rpx;" v-if="model == 'iPhone'"></view>
				</view>
			</view>



				<!-- 已完成 -->
				<view v-if="qx == false">
					<view class="whitebox" style="margin-top: 33upx;">
						<view class="utitlebox" style="margin-top: 30upx;">
							<view class="utitleblock"></view>
							<view class="utitle">溯源信息</view>
						</view>
						<u-form :model="form" ref="uForm" style="margin-left: 20upx;" class="uf">
							<u-form-item label="商品名称:"><text>{{spxx.menu_name}}</text></u-form-item>
							<u-form-item label="商品规格:"><text>{{spxx.menu_weight}}</text></u-form-item>
							<u-form-item label="生源产地:"><text>{{spxx.menu_address}}</text></u-form-item>
							<u-form-item label="批次编号:"><text>{{spxx.source_code}}</text></u-form-item>
							<u-form-item label="生产日期:"><text>{{spxx.production_time.slice(0,10)}}</text></u-form-item>
							<u-form-item label="保质日期:"><text>{{spxx.quality_time}}</text></u-form-item>
							<u-form-item label="入库时间:" v-if="spxx.storage_time"><text>{{spxx.storage_time}}</text>
							</u-form-item>
							<u-form-item label="操作人员:" v-if="spxx.storage_time"><text>{{spxx.operator_name}}</text>
							</u-form-item>
							<u-form-item label="出库时间:" v-if="spxx.deliver_time"><text>{{spxx.deliver_time}}</text>
							</u-form-item>
							<u-form-item label="用户扫码:" v-if="spxx.business_key == false"><text>{{spxx.scan_time}}</text>
							</u-form-item>
							<u-form-item label="扫码次数:" v-if="spxx.business_key == false">
								<text>{{spxx.source_number}}次</text>
							</u-form-item>
						</u-form>
					</view>
					<!-- 溯源信息 -->
					<!-- 检测信息 -->
					<view class="greenbox" v-if="spxx.test_location">
						<view class="utitlebox">
							<view class="w-utitleblock"></view>
							<view class="w-utitle">检测信息</view>
						</view>
						<view class="jctbox">
							<text class="jctext" style="width: 460upx;">
								您扫的溯源码编号为<span>{{spxx.source_code}}</span>对应的产品在<span>{{spxx.monitoring_time.slice(0,10)}}</span>由<span>{{spxx.test_location}}</span>实施监测，<span>{{spxx.menu_address}}</span>生产的<span>{{spxx.sample_name}}</span>，产品检疫检测报告可点击更多查看
							</text>
							<image src="../../static/hg.png"></image>
							<view class="gdbtn" @click="ckk">更多</view>
						</view>						
					</view>
					<u-mask :show="cklt" @click="qxx">
						<view :class="cklt==false ? 'noseeill':'seeill'">
							<image :src="jyjcimg" class="ltimg" v-if="tp == 0"></image>
							<image :src="bigimg" class="ltimg" v-if="tp == 1"
								:style="{width:bigimgWidth,height:bigimgHeight}"></image>
							<!-- <image :src="report" class="ltimg" v-if="tp == 2"></image>					 -->
						</view>
					</u-mask>
					<!-- 检测信息 -->
					<!-- 商品信息 -->
					<!-- <view class="whitebox">
			<view class="utitlebox">
			    <view class="utitleblock"></view>
			    <view class="utitle">商品信息</view>
			   </view>
			<u-form :model="form" ref="uForm" style="margin-left: 20upx;"> 
					<u-form-item label="商品名称:"><text>神湾菠萝</text><text style="margin-left: 15upx;">(500g)</text></u-form-item>
					
			</u-form>
		</view> -->
					<!-- 商品信息 -->
					<!-- 商品认证 -->
					<view class="whitebox" v-if="zsimg.length">
						<view class="utitlebox">
							<view class="utitleblock"></view>
							<view class="utitle">商品认证</view>
						</view>
						<text class="rzts">(向左滑动可浏览更多图片)</text>
						<view class="rzbox">
							<scroll-view class="rzscrool" scroll-x="true" scroll-with-animation="true">
								<span class="rzimg" v-for="(item,index) in zsimg" :key="index">
									<image @click="previewImg(item.image)" :src="item.image"></image>
								</span>
							</scroll-view>
						</view>
					</view>
					<!-- 商品认证 -->
					<!-- 商家信息 -->
					<!-- <view class="greenbox" style="position: relative;"> -->
					<view class="greenbox" :style="xspd ? '':'margin-bottom:150upx; position: relative;'">
						<view class="utitlebox">
							<view class="w-utitleblock"></view>
							<view class="w-utitle">商家信息</view>
						</view>
						<text class="qyxx">商家名称：{{spxx.business[0].business_name}}</text>
						<view :class="sj==true ? 'sjbt':'sjbtf'" @click="business">更多</view>
						<text :class="sj==true ? 'sjts':'sjtsf'">(向左滑动可浏览更多图片,点击更多查看商家信息)</text>
						<!-- <text class="rzts">(向左滑动可浏览更多图片)</text> -->
						<view :class="sj==true ? 'sjbox':'sjboxf'">
							<scroll-view class="sjscrool" scroll-x="true" scroll-with-animation="true">
								<span class="sjimg" v-for="(item,index) in sjimg" :key="index">
									<image @click="previewImg(item.image)" :src="item.image"></image>
								</span>
							</scroll-view>
						</view>
					</view>
				<!-- 	<view class="aa" style="padding-bottom: 60rpx;margin-bottom: 60rpx;" v-if="!my_menu || my_menu_recommend !=0 && my_menu_length >1"></view> -->
					<!-- 商家信息 -->
					<!-- 推荐商品 -->
					<view v-if="xspd">
					<view class="whitebox" style="margin-bottom: 150upx; position: relative;" v-if="my_menu">
						
						<!-- <view class="utitlebox"> -->
						<view class="utitlebox">
							<view class="utitleblock"></view>
							<view class="utitle">热卖商品</view>
						</view>
						<!-- </view> -->
						<view class="recommend">
							<view class="sbox" v-for="(item,index) in my_menu" @click="recommend(index)"
								v-if="index<rmsplenght && item.recommend !=0" :index="index">
								<view class="simage">
									<image mode="aspectFill" :src='item.menu_images_json[0]'></image>
								</view>
								<view class="stxtbox">
									<text class="stext">{{item.menu_name}}</text>
									<text class="stextg">{{item.menu_weight}}</text>
								</view>
								<view class="sbtbox">
									<text class="sprice"><span class="smtext">￥</span>{{item.menu_money}}</text>
									<view class="sbt" v-if="item.menu_url">
										<text class="sbtext">购买</text>
									</view>
									<view class="sbt" v-if="!item.menu_url" style="background-color: #0ABB9A;"
										@click="recommend(index)">
										<text class="sbtext">查看</text>
									</view>
								</view>
							</view>
							<view class="more" @click="more" v-if="rmspmore == false && my_menu.length>4">
								<image src="../../static/iconfont/load.png" v-if="moreload == false"></image>
								<view class="loadbox" style="margin-left:-60upx;">
									<u-loading mode="circle" size="40" :show="moreload" color="#0abb99"></u-loading>
								</view>
							</view>
						</view>
					</view>
					</view>	
					<!-- 推荐商品 -->
					<!-- <view class="bigimg" v-if="bigimg != ''" @click="zzc">
			<view class="bao">
				<view class="image" :style="{width:bigimgWidth,height:bigimgHeight}">
					<image :src="bigimg"></image>
				</view>
				<view class="zzc"></view>
			</view>
		</view> -->
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
						z-index: 999;opacity: 0; 
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
				cklt: false,
				scrollTop: 0,
				tp: 0,
				model: '',
				rmspmore: false,
				moreload: false,
				rmsplenght: 4,
				rmspnewlenght: '',
				bigimg: '',
				bigimgHeight: 0,
				bigimgWidth: 0,
				code: '',
				qx: false,
				id: '',
				spxx: [],
				crzt: 1,
				ck: false,
				lbtimg: [],
				jyjcimg: [],
				zsimg: [],
				noqxbg: false,
				sj: true,
				sjname: '',
				sjimg: [],
				my_menu: [],
				my_menu_recommend :0,
				my_menu_length:0,
				bgHeight: '',
				content: '您无权限操作',
				phone:'',
				xspd:true,
			}
		},
		onReady(res) {
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					let allheight = res.windowHeight
					let shopWidth = res.windowWidth
					// 阅读框高度
					_this.bgHeight = res.windowHeight + "px";
				}
			})


		},
		onLoad(res) {
			let _this = this;
			console.log(res.source_code); //获取传过来的source_code
			_this.code = res.source_code;
			console.log("lalal", _this.code);
			let rk = '';
			let ck = '';
			let qx = '';
			this.$api.userinfo().then((res) =>{
				console.log("用户信息",res)		
				 _this.phone = res.data.phone;
				 console.log("_this.phone",_this.phone);
			});
			_this.$api.SelectAll({
				source_code: _this.code
			}).then((res) => { //用获取下来的编号请求接口
				rk = res.data.storage_time
				ck = res.data.deliver_time
				_this.qx = res.data.business_key
				qx = res.data.business_key
				_this.menu_url=res.data.menu_url;
				_this.xcx.url=res.data.menu_url;
				console.log("_this.menu_url",_this.menu_url);
				console.log("_this.xcx.url",_this.xcx.url);
									
				if(res.data.menu_url){
					_this.sdsdk();
				}
				res.data.menu_images_json = JSON.parse(res.data.menu_images_json); //将返回数组里的图片转换成json格式
				_this.lbtimg.push(res.data.menu_images_json);
				console.log("_this.lbtimg",_this.lbtimg);
				res.data.monitor_image = JSON.parse(res.data.monitor_image);
				if(res.data.certificate_image){
					res.data.certificate_image = JSON.parse(res.data.certificate_image);
					for (let i = 0; i < res.data.certificate_image.length; i++) {
						_this.zsimg.push({
							'image': res.data.certificate_image[i]
						}); //循环图片，给图片加上image字段名
						if (_this.zsimg, length == res.data.certificate_image.lengt) {
							break;
						}
					}
				}
			
				res.data.business[0].business_images = JSON.parse(res.data.business[0].business_images)
				_this.spxx = res.data;
				console.log("spxx", _this.spxx)
				_this.id = res.data.business[0].id
				_this.jyjcimg = res.data.monitor_image[0];
				if (res.data.business[0].business_name.length <= 8) {
					_this.sj = false;
				}
				for (let k = 0; k < res.data.business[0].business_images.length; k++) {
					_this.sjimg.push({
						'image': res.data.business[0].business_images[k]
					});
					if (_this.sjimg.length == res.data.business[0].business_images.length) {
						break;
					}
				}
				setTimeout(function(){
					console.log("_this.phone2",_this.phone);
					if(qx == true && !_this.phone){
						uni.showModal({
							title: '提示',
							content: '请完善个人信息后再进行入库操作',
							confirmColor: '#0ABB9A',
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url:'../my/modify?source_code='+_this.code
									})
								} else {
									uni.navigateTo({
										url:'../my/my'
									})
								}
							}
						})
					}
					
				},1000)
				
				
				if (qx == false && !ck && !rk || qx == false && ck && !rk || qx == false && !ck &&
					rk) {
					uni.setNavigationBarTitle({
						title: ''
					});
				} else if (qx == true) {
					uni.setNavigationBarTitle({
						title: '商品操作'
					});
				} else {
					uni.setNavigationBarTitle({
						title: '农产品溯源信息'
					});
				}
				
				
				console.log("用户权限", _this.qx);
				if (qx == false && !ck && !rk || qx == false && ck && !rk || qx == false && !ck &&
					rk) { //不是操作员且是为入库或出库状态
					_this.noqxbg = true;
				}
				if (rk && ck && qx == false) { //如果不是操作员，且有出库入库时间，就再次请求接口传key=3,获取扫码次数和时间
					_this.$api.open_source({
						source_code: _this.code,
						key: 3
					}).then((res) => {
						console.log("open", res);
						for (let b = 0; b < res.data.menu.length; b++) {
							res.data.menu[b].menu_images_json = JSON.parse(res.data.menu[b].menu_images_json)
						}
						_this.my_menu = res.data.menu;
						
						
						
						_this.rmspnewlenght = _this.my_menu.length
						_this.spxx.scan_time = res.data.scan_time
						_this.spxx.source_number = res.data.source_number+1
						console.log("_this.my_menu", _this.my_menu)
						console.log("_this.my_menu[0]", _this.my_menu[0])
						_this.my_menu_recommend=_this.my_menu[0].recommend
						console.log("_this.my_menu[0].recommend", _this.my_menu[0].recommend)
						_this.my_menu_length=_this.my_menu.length
						console.log("_this.my_menu.lenght",_this.my_menu_length)
						if( _this.my_menu[0].recommend == 0 && _this.my_menu_length<=1){
							_this.xspd = false;
						}
					})
				}
			})





		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			recommend(index) {
				let _this = this;
				console.log("传过去的下标", index)
				uni.navigateTo({
					url: '../Product/Product-recommend?index=' + _this.my_menu[index].id
				})
			},
			btback() {
				let _this = this
				if (_this.spxx.deliver_time) {
					uni.navigateTo({
						url: '../operation/operation-list?list=' + 1
					})
				} else {
					uni.navigateTo({
						url: '../operation/operation-list?list=' + 0
					})
				}

			},
			more() {
				let _this = this
				this.moreload = true
				setTimeout(function() {
					_this.rmspmore = true
					_this.moreload = true
					_this.rmsplenght = _this.rmspnewlenght
				}, 2000)

			},
			ckk() {
				this.cklt = true
				this.tp = 0
			},
			qxx() {
				this.cklt = false
			},
			previewImg(logourl) {
				if (logourl) {
					let _this = this;
					this.bigimg = logourl
					this.tp = 1
					this.cklt = true
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
							// resolve(res);
							// console.log(res)
							this.bigimgHeight = res.height + 'rpx'
							this.bigimgWidth = res.width + 'rpx'
						},
						fail: (err) => {
							// reject(err);
						}
					});

				}
			},
			btconfirmrk() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: "您是否对该商品进行入库处理",
					confirmColor: '#0ABB9A',
					success: (res) => {
						if (res.confirm) {
							_this.$api.open_source({
								source_code: _this.code,
								key: 1
							}).then((res) => {
								uni.showToast({
									title: '入库成功'
								})
								uni.switchTab({
									url: '../my/my'
								})
							})


						} else if (res.cancel) {}
					}
				})


			},
			btconfirmck() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: "出库需填写发货快递信息\n是否前往填写\n",
					confirmColor: '#0ABB9A',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../express/express-list?code=' + _this.code
							})

						} else if (res.cancel) {}
					}
				})



			},
			confirm() {
				uni.switchTab({
					url: '../my/my'
				})
			},
			cancel() {
				uni.switchTab({
					url: '../my/my'
				})
			},
			business() {
				let _this = this
				uni.navigateTo({
					url: '../business/business?id=' + _this.id
				})
			},
			xg() {
				let _this = this
				uni.navigateTo({
					url: '../express/express-list?kddh=' + _this.spxx.goto_order + '&sname=' + _this.spxx
						.goto_user + '&sphone=' + _this.spxx.goto_mobile + '&code=' + _this.code
				})
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
	.wrapper {
		width: 100%;
	}

	.xg {
		background-color: #0ABB9A;
		border-radius: 20upx;
		width: 100upx;
		text-align: center;
		color: white;
		margin-left: 20upx;
		height: 50upx;
		line-height: 50upx;

	}

	.bh {
		font-size: 24upx;
	}

	.noseeill {
		display: none;
	}

	.seeill {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.ltimg {
		height: 830upx;
		width: 640upx;
		margin-top: -100rpx;
	}

	.seeill .qx {
		height: 80upx;
		width: 80upx;
		position: absolute;
		top: 82%;
	}

	.qxbt {
		height: 80upx;
		width: 80upx;
		margin-top: 10upx;
	}

	page {
		background-color: transparent;
	}

	.bg {
		position: absolute;
		z-index: -1;

		left: 0;
		width: 100%;
		height: 1300upx;

	}

	.whitebox:first-child {
		padding-bottom: 60upx;
	}

	.lbt {
		margin-top: 10upx;
		box-shadow: 0 0 5upx #C0C4CC;
		border-radius: 30upx;
		overflow: hidden;
		margin-bottom: 20upx;
		height: 430upx;
	}

	.scrq {
		font-size: 28upx;
	}

	.htitle {
		display: flex;
		margin-left: 20upx;
	}

	.htitle text {
		font-weight: bold;
		font-size: 30upx;
		margin-top: 5upx;
	}

	.jctbox {
		width: 430upx;
		margin-top: 20upx;
		margin-left: 10upx;
		position: relative;
		display: flex;
	}

	.jctext {
		display: flex;
		font-size: 25upx;
		color: white;
		line-height: 50upx;
	}

	.jctext view {
		font-weight: bold;
		font-size: 26upx;
	}
	.jctext span{
		font-weight: bold;
		font-size: 26upx;
	}
	.jctbox image {
		width: 180upx;
		height: 190upx;
		position: absolute;
		left: 102%;
		margin-top: -30upx;
	}

	.gdbtn {
		width: 120upx;
		background-color: white;
		height: 50upx;
		position: absolute;
		border-radius: 30upx;
		line-height: 50upx;
		text-align: center;
		left: 109%;
		margin-top: 180upx;
		color: #0ABB9A;
		font-weight: bold;
	}

	.gdbtn:hover {
		opacity: 0.9;
	}

	.rzbox {
		margin-top: 30upx;
		width: 610upx;
		height: 300upx;
		display: flex;
		position: relative;
	}

	.rzts {
		margin-left: 20upx;
		position: absolute;
		margin-top: 20upx;
		color: #807d7d;
		font-size: 25upx;

	}

	.rzscrool {
		margin-top: 40upx;
		border-radius: 30upx;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
		background-color: #F6F6F6;
		margin-left: -8upx;
		box-shadow: 0 0 10upx #C0C4CC;
	}

	.rzimg image {
		width: 260upx;
		height: 300upx;
		margin-right: 10upx;
	}

	.rzimg:last-child image {
		margin-right: 0upx;
	}

	.qyxx {
		color: white;
		font-size: 35upx;
		position: absolute;
		margin-left: 20upx;
		width: 580upx;
		margin-top: 20upx;
		line-height: 55upx;
	}

	.sjbt {
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

	.sjbtf {
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

	.sjbt:hover {
		opacity: 0.9;
	}

	.sjbox {
		margin-top: 150upx;
		width: 610upx;
		height: 350upx;
		display: flex;
		position: relative;
		overflow: hidden;
	}

	.sjboxf {
		margin-top: 100upx;
		width: 610upx;
		height: 350upx;
		display: flex;
		position: relative;
		overflow: hidden;
	}

	.sjscrool {
		margin-top: 40upx;
		border-radius: 30upx;
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
		background-color: #F6F6F6;
		margin-left: -8upx;
		box-shadow: 0 0 10upx #C0C4CC;
	}

	.sjts {
		position: absolute;
		color: white;
		font-size: 25upx;
		margin-top: 145upx;
		margin-left: 20upx;
	}

	.sjtsf {
		position: absolute;
		color: white;
		font-size: 25upx;
		margin-top: 85upx;
		margin-left: 20upx;
	}

	.sjimg image {
		width: 450upx;
		height: 350upx;
		;
		margin-right: 10upx;
	}

	.sjimg:last-child image {
		margin-right: 0upx;
	}

	.aa {
		box-sizing: content-box;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 图片放大 */
	.bigimg {
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.bigimg .bao {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.bigimg .bao .zzc {
		position: absolute;
		top: 0;
		left: 0;
		background-color: #3e3e3e;
		width: 100%;
		height: 100%;
		opacity: 0.7;

		z-index: -1;
	}

	.bigimg .bao .image {

		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		/* margin: 0 auto; */
		text-align: center;
	}

	.bigimg .bao .image image {
		width: 83%;
		height: 83%;
	}
</style>

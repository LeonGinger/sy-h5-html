<template>
	
	<view class="wrapper" >
		<image src="../../static/sp-bg.jpg" class="bg"></image>
		<view class="ytitle">
			
			<text class="ytext">商家介绍</text>
		</view>
		<!-- 轮播图 -->
		<view class="whitebox">
			<view class="lbt">			
					<u-swiper :list="business_selectall.business_images"></u-swiper>
			</view>
		</view>
		<!-- 轮播图 -->
		
		<connect class="connect"></connect>
		
		<!-- 商家信息 -->
		<view class="whitebox" style="margin-top: 33upx;">
			<view class="utitlebox" style="margin-top: 30upx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">商家信息</view>
			</view>
			<u-form style="margin-left: 20upx;">
					<u-form-item label="商家名称:"><text>{{business_selectall.business_name}}</text></u-form-item>
					<u-form-item label="商家地址:"><text>{{business_selectall.business_address}}</text></u-form-item>
					<u-form-item label="联系人员:"><text>{{business_selectall.responsible_name}}</text></u-form-item>
					<u-form-item label="联系电话:"><text>{{business_selectall.responsible_phone}}</text></u-form-item>
			</u-form>
		</view>	
		<!-- 商家信息 -->
		
		<!-- 商家介绍 -->
		<view class="whitebox" style="margin-top: 33upx;">
			<view class="utitlebox" style="margin-top:10upx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">商家介绍</view>
			</view>
			<view class="jsbox">
				<text class="jstext">
					{{business_selectall.business_introduction}}
				</text>
			</view>
		</view>	
		<!-- 商家介绍 -->
		
		<!-- 商家图集 -->
		<view class="whitebox" style="margin-top: 33upx;" v-if="sjtj != ''">
			<view class="utitlebox" style="margin-top:10upx;margin-bottom: 25upx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">商家图集</view>
			</view>
		</view>	
		<connect class="connect"></connect>
		<view class="whitebox" style="margin-top: 33upx;" v-for="(item,index) in sjtj">
			<image :src="item.image" class="tjimg" @click="previewImg(item.image)"></image>
			<view class="tjtextbox">
				<text class="tjtext">{{item.tjtext}}</text>
			</view>
		</view>	
		<!-- 商家图集 -->
		
		<!-- 商家证书 -->
		<view class="whitebox" :style="xspd ? '':'margin-bottom:150upx;position: relative;'">
			<view class="utitlebox">
			    <view class="utitleblock"></view>
			    <view class="utitle">商家证书</view>
			   </view>
			   
			<text class="rzts">(向左滑动可浏览更多图片)</text>
			<view class="rzbox">
				<scroll-view class="rzscrool" scroll-x="true" scroll-with-animation="true">
					<span class="rzimg" v-for="(item,index) in business_selectall.appraisal_image" 
					:key="index">
					<image  mode="aspectFill" @click="previewImg(item)" :src="item"></image>
					</span>		
				</scroll-view>
			</view>
		</view>
		<!-- 商家证书 -->
			
		<!-- 推荐商品 -->
	
		<view v-if="xspd">
		<view class="whitebox" style="margin-bottom: 150upx; position: relative;" v-if="my_menu.length !=0">
			<!-- <view class="utitlebox"> -->
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<view class="utitle">热卖商品</view>
			</view>
			<!-- </view> -->
			<view class="recommend">
				<view class="sbox" v-for="(item,index) in my_menu" @click="recommend(index)" v-if="index<rmsplengh && item.recommend !=0"  :index="index">
					<view class="simage">
						<image  mode="aspectFill" :src='item.menu_images_json[0]'></image>
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
						<view class="sbt" v-if="!item.menu_url" style="background-color: #0ABB9A;" @click="recommend(index)">
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
		
		
		
		
		
		<u-mask :show="cklt" @click="qx">
		<view :class="cklt==false ? 'noseeill':'seeill'">
			<!-- <image :src="bigimg" class="ltimg" :style="{width:bigimgWidth,height:bigimgHeight}"></image> -->
			<image :src="bigimg" class="ltimg" :style="{width:bigimgWidth+'rpx',height:bigimgHeight+'rpx'}" v-if="bigimgWidth <= 950 && bigimgHeight <= 700 && bigimgWidth >= 500 && bigimgHeight>=500"></image>
			<image :src="bigimg" class="ltimg"  v-else></image>
			<!-- <image :src="report" class="ltimg" v-if="tp == 2"></image>					 -->
		</view>
		</u-mask>
		<!-- <view class="bigimg" v-if="bigimg != ''" @click="zzc">
			<view class="bao">
				<view class="image" :style="{width:bigimgWidth,height:bigimgHeight}">
					<image :src="bigimg"></image>
				</view>
				<view class="zzc"></view>
			</view>
		</view> -->
		<!-- 推荐商品 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<view class="aa" style="padding-bottom: 50rpx;"></view>
		<bottomBar></bottomBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cklt:false,
				scrollTop: 0,
				//轮播图
			list: [],
			zs: [],
			sjtj:[],
			my_menu:[],
			bigimg:'',
			bigimgHeight:0,
			bigimgWidth:0,
			model:'',
			rmspmore:false,
			moreload:false,
			business_selectall:[],
			id:'',
			rmsplengh:4,
			my_menu_recommend :0,
			my_menu_length:0,
			xspd:true,
			}
		},
		onLoad(res) {
			let _this = this;
			console.log(res);
			_this.id=res.id
			console.log(_this.id);
				_this.$api.businessfind({business_id:_this.id}).then((res) => {
						console.log("商家",res.data);	
						_this.rmnewlengh=res.data.menuAll.length;
						
						for(let i=0;i<res.data.menuAll.length;i++){
							res.data.menuAll[i].menu_images_json=JSON.parse(res.data.menuAll[i].menu_images_json)
						}
						_this.my_menu=res.data.menuAll;
						_this.my_menu_recommend=_this.my_menu[0].recommend
						_this.my_menu_length=_this.my_menu.length
						console.log("商品",_this.my_menu);
						if( _this.my_menu_recommend == 0 && _this.my_menu_length<=1){
							_this.xspd = false;
						}
			console.log("ssss",_this.sjtj)
				_this.business_selectall = res.data
				//轮播图转数组
				_this.business_selectall.business_images = JSON.parse(_this.business_selectall.business_images)
				//证书转数组
				_this.business_selectall.appraisal_image = JSON.parse(_this.business_selectall.business_appraisal[0].appraisal_image)
				// console.log("_this.business_selectall.business_appraisal[0].appraisal_image",_this.business_selectall.business_appraisal[0].appraisal_image)
				//商家风光图片和风光文字转数组
				if(_this.business_selectall.business_image_injson == "[]" || _this.business_selectall.business_img[0].business_image_injson == '' || _this.business_selectall.business_img[0].business_img_contentjson == "[]" || _this.business_selectall.business_img[0].business_img_contentjson == ''){
					console.log("aaa")
				}else{
					console.log("bbb")
					let business_image_injson =  JSON.parse(_this.business_selectall.business_img[0].business_image_injson)
					let business_img_contentjson = JSON.parse(_this.business_selectall.business_img[0].business_img_contentjson)
					for(let i = 0;i < business_image_injson.length;i++){
						if(_this.sjtj.length <= i){
							_this.sjtj.push({image:'',tjtext:''})
						}
						_this.sjtj[i].image = business_image_injson[i]
						_this.sjtj[i].tjtext = business_img_contentjson[i]
					}
				}
				console.log("sjtj",_this.sjtj)
				console.log("business_selectall",_this.business_selectall)
				
			})
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
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
			},
			qx(){
				this.cklt=false
			},
			previewImg(logourl) {
				  if(logourl){	  
					let _this = this;
					wx.getImageInfo({
						src: logourl,
						success: (res) => {
						  // resolve(res);
						  console.log(res)
						  this.bigimgHeight = res.height 
						  this.bigimgWidth = res.width 
						},
						fail: (err) => {
						  // reject(err);
						}
					  });
					this.bigimg = logourl
					this.cklt=true
					// console.log(this.bigimg)
					// let imgsArray = [];
					// imgsArray[0] = logourl
					// console.log(imgsArray)
					// uni.previewImage({
					// 	current: 0,
					// 	urls: imgsArray
					// });
					
			
				}
			},
			recommend(index){
				let _this=this;
				uni.navigateTo({
					url:'../Product/Product-recommend?index='+_this.my_menu[index].id
				})
			},
			business(){
				uni.navigateTo({
					url:'../business/business'
				})
			},
			zzc(){
				this.bigimg = '',
				this.bigimgWidth = 0,
				this.bigimgHeight = 0
			}
			}
	}
</script>

<style>
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
		border-radius: 30upx;
		overflow: hidden;
		margin-bottom: 20upx;
		height: 430upx;
		box-shadow: 0 0 12upx #C0C4CC;
	}
	.jsbox{
		width: 100%;
		margin-top: 30upx;
		margin-bottom: 10upx;
	}
	.jstext{
		font-size: 32upx;
		line-height: 50upx;
	}
	.tjimg{
		width: 600upx;
		margin-top: 20upx;
		border-radius: 20upx;
		height: 400upx;
		box-shadow: 0 0 12upx #C0C4CC;
	}
	.tjtextbox{
		width: 630upx;
		background-color: #f8f8f8;
		margin-top: 20upx;
		box-shadow: 0 0 12upx #C0C4CC;
		border-radius: 20upx;
		padding: 20upx;
		margin-left: -10upx;
		line-height: 50upx;
	}
	.tjtext{
		font-size: 32upx;
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
		width: 210upx;
		height: 300upx;
		margin-right: 10upx;
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
</style>


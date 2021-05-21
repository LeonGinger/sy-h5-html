<template>
	<view class="notice">
		<image src="@/static/my-bg.jpg" class="bg"></image>
		<view class="whitebox" :style="{height:bgHeight}" style="position: relative;">
			<view class="utitlebox" style="margin-left: 40rpx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">物流信息</view>
			</view>
			<view class="wlbox">
				<image src="../../static/wlicon.png" class="wl"></image>
			</view>		
			
			<scroll-view class="rztext" scroll-y="true" scroll-x="false" :style="{height:textHeight}">
			
			<view class="inputbox">
				<view class="box"></view>
				<text class="ttile">商家名称</text>
				<view class="input2">{{sjname}}</view>
				<text class="ttile">商品信息</text>
				<view class="input2">{{spxx}}<span style="margin-left: 10upx;padding-bottom: 10upx;">{{spgg}}</span></view>
				<text class="ttile">快递编号</text><span>(可点击复制编号查询物流信息)</span>
				<input type="text" placeholder="请复制快递编号进行查询" v-model="kddh" class="input1">
				<text class="ttile">收件人</text>
				<view class="input2">{{sname}}</view>
				<text class="ttile">发货人</text>
				<view class="input2">{{fname}}</view>
				<text class="ttile">发货时间</text>
				<view class="input2">{{ftime}}</view>
			</view>
			</scroll-view>
		</view>
		<bottomBar></bottomBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgHeight: '',
				radio: 0,
				textHeight:'',
				xztext:'',
				code:'',
				
				sjname:'',
				spxx:'',
				spgg:'',
				kddh:'',
				sname:'',
				fname:'',
				ftime:'',
			}
		},
		methods: {
			back(){
				uni.switchTab({
					url:'../my/my'
				})
			},
			jump(){
				if(this.radio == 1){
					uni.navigateTo({
						url:"./business-apply"
					})
				}else{
					uni.showModal({
						confirmColor:'#0ABB9A',
						content:"请先勾选已阅读",
						showCancel: false,
					})
				}
			}
		},
		onReady() {
			const _this = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					let allheight = res.windowHeight
					let shopWidth = res.windowWidth
					// 阅读框高度
					_this.bgHeight = res.windowHeight - 120 + "px";
					_this.textHeight= res.windowHeight - 300 + "px";

				}
			})
		},
		onLoad(res) {
			let _this=this;
			console.log(res);
			_this.code = res.source_code
			 _this.$api.SelectAll({
			 	source_code: _this.code
			 }).then((res) => { //用获取下来的编号请求接口
					_this.spxx=res.data.menu_name
					_this.spgg=res.data.menu_weight
					_this.kddh=res.data.goto_order
					_this.sname=res.data.goto_user
					_this.fname=res.data.pull_user
					_this.ftime=res.data.deliver_time
					_this.sjname=res.data.business[0].business_name
			 })
		}
	}
</script>

<style lang="scss">
	page {
		height: 0;
		background-color: transparent;
	}
	.rztext{
		
	}
	.wl{
		width: 250upx;
		height: 250upx;
		position:absolute;
		left: 35%;
		top: 10%;
		
	}
	.wlbox{
			width: 100%;
			height: 300upx;
	}
	.inputbox{
	
		width: 600upx;
		margin-bottom: 10upx;
		
	}
	.input1{
		background-color: white;
		width: 96%;
		height: 80upx;
		border: 2upx solid #ccc;
		line-height: 80upx;
		padding-left: 20upx;
		margin-top: 10upx;
	}
	.input2{
		background-color: white;
		width: 100%;
		height: 80upx;
		border: 2upx solid #ccc;
		line-height: 80upx;
		padding-left: 20upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}
	.ttile{
		font-weight: bold;
		font-size: 30upx;
		margin-top: 10upx;
		
	}
	.notice {
		.bg {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.rztext{
			margin-top: 20upx;
			position: absolute;
			width: 92%;
			margin-left: -2upx;
		}
		.operation {
			position: absolute;
			padding: 0 40rpx;
			margin-top: 20upx;
			bottom: 2%;
			left: 18%;
			.agree {
					margin-left: -120upx;
				
				display: flex;
				.radio {
					width: 45rpx;
					height: 45rpx;
				}

				.explain {
					padding: 0 20rpx;
					font-size: 32rpx;
					color: #0abb9a;
				}

			}
			.text{
				width: 100%;
				font-size: 20rpx;
				padding: 15rpx 0;
				color: #C0C4CC;
				text-indent: 0;
				margin:0;
				margin-left: -120upx;
				white-space: nowrap;/*不换行*/
			}
			.btn{
				display: flex;
				justify-content: space-around;
				.back{
					border-radius: 20rpx;
					padding: 10rpx 45rpx;
					color: #0abb9a;
					border: 2rpx solid #0abb9a;
				}
				.jump{
					border-radius: 20rpx;
					padding: 10rpx 45rpx;
					margin-left: 85upx;
					background-color: #0abb9a;
					color: #FFFFFF;
				}
			}
		}
	}
</style>


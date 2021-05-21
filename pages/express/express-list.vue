<template>
	<view class="notice">
		<image src="@/static/my-bg.jpg" class="bg"></image>
		<view class="whitebox" :style="{height:bgHeight}" style="position: relative;">
			<view class="utitlebox" style="margin-left: 40rpx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">{{xg ? '发货快递信息修改':'发货快递信息填写'}}</view>
			</view>		
			<image src="../../static/wlicon.png" class="wl"></image>
			<view class="inputbox">
				<text class="ttile">快递编号</text>
				<input type="text" placeholder="请填写快递编号" v-model="kddh" class="input1" maxlength="16">
				<text class="ttile">收货人</text>
				<input type="text" placeholder="请填写收货人姓名" v-model="sname" class="input1" maxlength="8">
				<text class="ttile">收件人手机号</text>
				<input type="number" placeholder="请填写收货人手机号码" v-model="sphone" class="input1" maxlength="11">
			</view>			
			<span style="color: red;" >{{xg ? '*修改快递信息会使用户收到的推送内容更改，如需修改请谨慎*':'*请认真填写信息,如若填写有误,请在出库列表里或在后台管理系统进行更改'}}</span>
			<view class="bbox" style="padding-bottom: 50upx;">
				<view class="bt1" @click="btback">返回</view>
				<view @click="btconfirmrk"  class="bt2" style="margin-left: 50upx;" v-if="!xg">发货</view>
				<view @click="btconfirmxg"  class="bt2" style="margin-left: 50upx;" v-if="xg">修改</view>
			</view>
		</view>
		
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
				
				kddh:'',
				sname:'',
				sphone:'',
				code:'',
				xg:false,
			}
		},
		methods: {
			btback(){
				uni.navigateBack({
					
				})
			},
			btconfirmrk(){
				let _this=this;
				if(_this.kddh && _this.sname && _this.sphone){
					let _this = this
					uni.showModal({
						title: '提示',
						content: "是否确定发货",
						confirmColor: '#0ABB9A',
						success: (res) => {
							if (res.confirm) {
								_this.$api.open_source({
									source_code: _this.code,
									order:_this.kddh,
									username:_this.sname,
									mobile:_this.sphone,
									key: 2
								}).then((res) => {
									uni.showToast({
										title: '发货成功'
									})
									uni.switchTab({
										url: '../my/my'
									})
								})
					
							} else if (res.cancel) {}
						}
					})
				}else{
					uni.showToast({
						icon:'none',
						title: '请将快递信息填写完整',
					});
				}
				
			},
			btconfirmxg(){  //修改快递
				let _this=this;
				if(_this.kddh && _this.sname && _this.sphone){
					let _this = this;
					uni.showModal({
						title: '提示',
						content: "是否确定修改",
						confirmColor: '#0ABB9A',
						success: (res) => {
							if (res.confirm) {
								_this.$api.goto_update({
									source_code: _this.code,
									goto_order:_this.kddh,
									goto_user:_this.sname,
									goto_mobile:_this.sphone,
								}).then((res) => {
									uni.showToast({
										title: '修改成功'
									})
									uni.navigateTo({
										url:'../traceability/traceability?source_code='+_this.code
									})
								})
					
							} else if (res.cancel) {}
						}
					})
				}else{
					uni.showToast({
						icon:'none',
						title: '请将快递信息填写完整',
					});
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
					_this.bgHeight = res.windowHeight - 80 + "px";
					_this.textHeight= res.windowHeight - 250 + "px";

				}
			})
		},
		onLoad(res) {
			let _this=this;
			console.log(res);
			if(res.code){
				_this.code=res.code
			}
			if(res.kddh){
				_this.kddh=res.kddh;
				_this.sname=res.sname;
				_this.sphone=res.sphone;	
				_this.code=res.code
				_this.xg=true
			}
			if(_this.xg){
				uni.setNavigationBarTitle({
					title: '修改物流信息'
				});
			}else{
				uni.setNavigationBarTitle({
					title: '填写物流信息'
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 0;
		background-color: transparent;
	}
	.wl{
		width: 250upx;
		height: 250upx;
		position:absolute;
		left: 35%;
		top: 10%;
	}
	.inputbox{
		margin-top: 320upx;
		width: 600upx;
		
	}
	.input1{
		background-color: white;
		width: 96%;
		height: 80upx;
		border: 2upx solid #ccc;
		line-height: 80upx;
		padding-left: 20upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}

	.inputbox .ttile{
		font-weight: bold;
		font-size: 30upx;
		
	}
	.bbox{
		position: absolute;
		bottom: 0;
		/* margin-bottom: 50upx; */
		display: flex;
		margin-left: 80upx;
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

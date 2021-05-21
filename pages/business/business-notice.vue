<template>
	<view class="notice">
		<image src="@/static/my-bg.jpg" class="bg"></image>
		<view class="whitebox" :style="{height:bgHeight}" style="position: relative;">
			<view class="utitlebox" style="margin-left: 40rpx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">商家须知</view>
				<view class="ts" style="margin-left: 20upx;">(规则可上下滑动)</view>
			</view>
			<scroll-view class="rztext" scroll-y="true" scroll-x="false" :style="{height:textHeight}">
					<span v-html="xztext">{{xztext}}</span>
			</scroll-view>

			<view class="operation">
				<view class="agree">
					<image src="../../static/iconfont/radio-no.png" class="radio" v-if="radio == 0" @click="radio = 1"></image>
					<image src="../../static/iconfont/radio-yes.png" class="radio" v-if="radio == 1" @click="radio = 0"></image>
					<view class="explain">我已阅读</view>
				</view>
				<view class="text">如有更多疑问可进入联系我们询问人工客服</view>
				<view class="btn">
					<view class="back" @click="back">返回</view>
					<view class="jump" @click="jump">同意</view>
				</view>
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
					// console.log(res)
					let allheight = res.windowHeight
					let shopWidth = res.windowWidth
					// 阅读框高度
					_this.bgHeight = res.windowHeight - 80 + "px";
					_this.textHeight= res.windowHeight - 250 + "px";

				}
			})
		},
		onLoad() {
			let _this=this;
			 _this.$api.business_notice().then((res) =>{
					_this.xztext=res.data[0].content
					console.log(_this.xztext)
				 })
		}
	}
</script>

<style lang="scss">
	page {
		height: 0;
		background-color: transparent;
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

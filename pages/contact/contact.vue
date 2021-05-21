<template>
	<view class="contact">
		<image src="@/static/my-bg.jpg" class="bg" :style="{height:bgHeight}"></image>
		<view class="problem">
			<view class="utitlebox" style="margin-top: 20rpx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">常见问题</view>
			</view>
				<u-collapse class="problem_list">
					<u-collapse-item :title="index+1+ '.' +item.title" v-for="(item, index) in Problem_list" :key="index" class="problem_content">
						<span v-html="item.content">{{item.content}}</span>
					</u-collapse-item>
				</u-collapse>
		</view>
		<view class="contact_mode">
			<view class="corporate_name">本系统由<view class="key">由智旅网络</view>开发和运营</view>
			<view class="zj">
				<view class="text">
					<view class="phone">联系电话:0760-88888789</view>
					<view class="website">网址:www.lexiangyou.net</view>
				</view>
				<image src="../../static/ewma.jpg" class="ewm_img"></image>
			</view>
		<!-- 	<view class="address">
				<image src="../../static/iconfont/address.png" class="icon_img"></image>
			</view> -->
			
		</view>
		<view class="aa" style="padding-bottom: 100rpx" v-if="model == 'iPhone'"></view>
		<ball>
			<!-- <image src="../../static/iconfont/lxwm.png" class="lxwm_img"></image>
			<view class="text">在线客服</view> -->
		</ball>
		<bottomBar></bottomBar>
	</view>
</template>

<script  type="text/javascript">
	import HTMLParser from "../../common/html-parser.js"
	export default {
		data() {
			return {
				bgHeight:'',
				model:'',
				Problem_list:[],
			}
		},
		onReady() {
			const _this = this;
			uni.getSystemInfo({
				success(res) {
				
					let allheight = res.windowHeight
					let shopWidth = res.windowWidth
					// 背景图片高度
					_this.bgHeight = res.windowHeight + "px"
					_this.allWidth = res.screenWidth
					_this.model = res.model
		
				}
			})
			
		},
		onLoad() {
			let _this=this;
			_this.$api.common_problem().then((res) =>{
					_this.Problem_list=res.data
				
				})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" >
	page{
		background-color: transparent;
	}
	.contact{
		.bg{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: -1;
		}
		//常见问题列表
		.problem{
			width: 90%;
			border-radius: 50rpx;
			background-color: #FFFFFF;
			padding: 20rpx 40rpx;
			margin: 30rpx auto;
			box-shadow: 0rpx 0rpx 15rpx #bfbfbf;
			// box-shadow: 0rpx 0rpx 10rpx #dcdcdc;
			.problem_list{
				box-shadow: 0rpx 0rpx 10rpx #dcdcdc;
				border-radius: 20rpx;
				margin: 40rpx 0;
				.problem_content{
					line-height: 50rpx;
					// text-indent: 2em;
					padding: 20rpx 40rpx;
					margin: 00rpx 0;
					border-radius: 20rpx;
					border-bottom: 1px solid #b9b9b9;
					// box-shadow: 0rpx 0rpx 10rpx #dcdcdc;
				}
				
			}
		}
		//联系方式
		.contact_mode{
			margin: 0 auto 130rpx;
			width: 90%;
			background-color: #FFFFFF;
			border-radius: 50rpx;
			line-height: 40rpx;
			padding: 30rpx 0rpx;
			font-size: 26rpx;
			box-shadow: 0rpx 0rpx 15rpx #bfbfbf;
			.corporate_name{
				display: flex;
				justify-content: center;
				font-size: 34rpx;   
				.key{
					font-weight: 900;
				}
			}
			.address{
				display: flex;
				justify-content: center;
				align-items: center;
				.icon_img{
					margin-top: 5rpx;
					width: 30rpx;
					height: 30rpx;
				}
				.text{
					
				}
			}
			.zj{
				display: flex;
				justify-content: center;
				margin: 30rpx 10rpx 10rpx 90rpx;
				.text{
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
					.phone,.website{
						
					}
				}
				
				.ewm_img{
					margin-top: -10rpx;
					margin-right: 100rpx;
					width: 220rpx;
					height: 125rpx;
				}
			}
		}
		//人工客服
		.customer_service{
			position: fixed;
			right: 20rpx;
			bottom: 25%;
			background-color: #0abb9a;
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			box-shadow: 0rpx 0rpx 15rpx #bfbfbf;
			.lxwm_img{
				transform: translate(70%,35%);
				width: 55rpx;
				height: 55rpx;
			}
			.text{
				color: #FFFFFF;
				padding-top: 20rpx;
				font-size: 20rpx;
				text-align: center;
			}
		}
	}
	
</style>

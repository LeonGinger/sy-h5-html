<template>
	<view class="traceabilityBar" :style="{'height':bottomHegiht}">
		<view class="tarbar-list-ul">
			<view class="tarbar-list-li" v-for="(item,index) in tabBar" :key="index" @click="setSelected(index)">
				<view class="tarbar-list-li-icon"><image :src="item.iconPath" mode=""></image></view>
				<view class="tarbar-list-li-name">{{ item.text }}</view>
			</view>
			<view class="buy" @click="Buy">
				<image src="../static/iconfont/buycart.png"></image>
				<view class="text">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:true,
				my:true,
				ym:0,
				bottomHegiht:'100rpx',
				tabBar:[{
					pagePath:'/pages/index/index',
					iconPath:'/static/iconfont/index-dj.png',
					// selectedIconPath:'/static/iconfont/index-dj.png',
					text:'首页',
					// textColor_dj:"#6d6d6b",
					textColor:"#555555"
				},{
					pagePath:'/pages/my/my',
					iconPath:'/static/iconfont/my-dj.png',
					// selectedIconPath:'/static/iconfont/my-dj.png',
					text:'我的',
					// textColor_dj:"#1e1e1e",
					textColor:"#555555"
				}]
			};
		},
		created() {
			const _this = this;
			 uni.getSystemInfo({
				success(res) {
					// console.log(res)
					let allheight = res.screenHeight
					// console.log(allheight)
					if(allheight > 700){
						this.bottomHegiht = 86 + "rpx"
					}else if(allheight >= 980){
						this.bottomHegiht = 150 + "rpx"
					}
				}
			})
		},
		methods:{
			setSelected(index){
				uni.switchTab({
					url:this.tabBar[index].pagePath
				})
			},
			Buy(){
				
			}
		}
	}
</script>

<style lang="scss">
	page{
	}
	.traceabilityBar{
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx #aaaaaa;
		align-items: center;
		z-index: 888;
		overflow: hidden;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		box-sizing: content-box;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.tarbar-list-ul{
			display: flex;
			justify-content: flex-start;
			height: 100%;
			padding: 0 30rpx;
			.tarbar-list-li{
				width: 20%;
				padding-top: 15rpx;
				text-align: center;
				.tarbar-list-li-icon{
					width: 40rpx;
					height: 40rpx;
					margin: 6rpx auto 0;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.tarbar-list-li-name{
					color: #000000;
					// font-family: "webfont";
					margin-top: 2rpx;
					font-size: 26rpx;
				}
				
			}
		}
		.buy{
			display: flex;
			justify-content: center;
			line-height: 90rpx;
			height: 75%;
			width: 45%;
			border-radius: 20rpx;
			background-color: #f49915;
			margin: 2% 0 0 12% ;
			image{
				width: 50rpx;
				height: 50rpx;
				margin: 15rpx 20rpx 0 0;
			}
			.text{
				margin-top: -6rpx;
				font-size: 38rpx;
				color: #FFFFFF;
			}
		}
	}
	
	
</style>

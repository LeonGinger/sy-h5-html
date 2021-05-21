<template>
	<view class="bottomBarWhite" :style="{'height':bottomHegiht}">
		<view class="tarbar-list-ul">
			<view class="tarbar-list-li" v-for="(item,index) in tabBar" :key="index" @click="setSelected(index)" name="no">
				<view class="tarbar-list-li-icon"><image :src="selected == index ? item.selectedIconPath : item.iconPath" mode=""></image></view>
				<view class="tarbar-list-li-name" :style=" selected == index ? { 'color':item.textColor_dj }: {'color':item.textColor}">{{ item.text }}</view>
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
				bottomHegiht:'100rpx',
				tabBar:[{
					pagePath:'/pages/index/index',
					iconPath:'/static/iconfont/index.png',
					selectedIconPath:'/static/iconfont/index-dj.png',
					text:'棣栭〉',
					textColor_dj:"#1e1e1e",
					textColor:"#d2d2d1"
				},{
					pagePath:'/pages/my/my',
					iconPath:'/static/iconfont/my.png',
					selectedIconPath:'/static/iconfont/my-dj.png',
					text:'鎴戠殑',
					textColor_dj:"#1e1e1e",
					textColor:"#d2d2d1"
				}]
			};
		},
		props: ['selected'],
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
		// mounted(){
		// 	console.log(this.ym)
		// },
		methods:{
			setSelected(index) {
				// console.log(index);
				// let ys = "pointer-events: 'none';";
				let dj = document.getElementsByName("no");
				for(let i = 0;i<dj.length;i++){
					// dj[i].style.backgroundColor="black";
					//点击时禁用跳转按钮
					dj[i].style.pointerEvents = "none";
					//0.5s后恢复跳转按钮
					setTimeout(function(){
						dj[i].style.pointerEvents = "";
					},500)
				}
				// dj.style.backgroundColor="black";
				// console.log(dj)
				// console.log(style)
				
				//跳转
					// uni.switchTab({
					// 	url:  this.tabBar[index].pagePath
					// });
					uni.reLaunch({
						url:  this.tabBar[index].pagePath
					})
					// setTimeout(function(){
					// 	this.ym = index
					// },2000)
				// this.$forceUpdate();
			}
		}
	}
</script>

<style lang="scss">
	page{
	}
	.bottomBarWhite{
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx #aaaaaa;
		align-items: center;
		z-index: 9999;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		.tarbar-list-ul{
			display: flex;
			justify-content: space-around;
			height: 100%;
			.tarbar-list-li{
				width: 50%;
				padding-top: 15rpx;
				text-align: center;
				.tarbar-list-li-icon{
					width: 40rpx;
					height: 40rpx;
					margin: 0 auto;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.tarbar-list-li-name{
					color: #000000;
					// font-family: "webfont";
					font-size: 26rpx;
				}
				
			}
		}
	}
	
	
</style>

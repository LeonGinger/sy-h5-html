<template>
	<view>
	<view class="mask" v-if="show" @tap="show = false" @touchmove.stop.prevent></view>
		
		<view class="major-box" :class="{show: show}" :style="{top: top + 'px' }" > 
			<view class="click-btn" draggable="true" @touchstart="touchstart" 
			@touchmove.stop.prevent="touchmove">
				<image src="../static/iconfont/lxwm.png" class="lxwm_img"></image>
				<view class="text">在线客服</view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false ,// 是否显示
			top: 400,	// 顶端距离 
			deviationTop: 0,	// 偏移量
			windowHeight: uni.getSystemInfoSync().windowHeight,	// 视图高度 
		};
	},
	methods: {
		// 点击按钮 
		clickBtn: function(btn) {
			console.log('点击了：' + btn.text);
		},
		// 拖动开始，记录一下偏移量
		touchstart: function(e) {
			
			var touch = e.touches[0] || e.changedTouches[0];
			// console.log(touch)
			this.deviationTop = touch.clientY - this.top;
			// console.log(this.deviationTop);
		},
		// 上下拖动时 
		touchmove: function(e) {
			var touch = e.touches[0] || e.changedTouches[0];
			var top = touch.clientY;
			// console.log(e)
			top = top - this.deviationTop;
			if (top < 0) {
				top = 0;
			}
			if (top > this.windowHeight - 120) {
				top = this.windowHeight - 120;
			}
			this.top = top;
			return false;
		},
	}
};
</script>

<style>
	
	.major-box {
			z-index:10001;
			position:fixed;
			width:450upx;
			/* height:0px; */
			left:620rpx;
			transition-left:0.5s;
			/* margin-top: 200upx; */
			max-height: 500rpx;
		}
	.click-btn {
		color: white;
		font-size: 10upx;
		line-height: 12upx;
		padding:5px,0;		
		background-color: #0ABB9A;
		width: 130rpx;
		height:130rpx;
		border-radius:50%;
		position: relative;
		display: flex;
		}
		.click-btn:hover{
			opacity:0.8;
			}
	.lxwm_img{
		width: 55rpx;
		height: 55rpx;
		position: absolute;
		left:30%;
		top:20%;
	}
	.text{
		color:#FFFFFF;
		padding-top:20rpx;
		font-size:18rpx;
		position:absolute;
		left: 50%;
		margin-top: 7rpx;
		white-space: nowrap;
		transform: translateX(-50%);
		top:55%;
	}	
</style>

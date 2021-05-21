<template>
	<view class="connect">
		<view class="connect-left">
			<view class="circular-up"></view>			
			<view class="circular-down"></view>
			<view class="circular-center"></view>
		</view>		
		<view class="connect-right">
			<view class="circular-up"></view>			
			<view class="circular-down"></view>
			<view class="circular-center"></view>
		</view>	
	</view>
</template>

<script>
</script>

<style>
	.connect{
		width: 90%;
		height: 140upx;
		margin: auto;
		display: flex;
		position: absolute;
		margin-top: -40upx;
		z-index: 100;
		left: 40upx;
	}
	.connect-left{
		margin-left: 50upx;
		position: absolute;
	}
	.connect-right{
		right: 0;
		position: absolute;
		margin-right: 100upx;
	}
	.circular-up{
		width: 40upx;
		height: 40upx;
		background-color: #ededeb;
		border-radius: 50%;
		box-shadow: -5upx 5upx 8upx   #DCDFE6 inset;
		position: absolute;
	}
	.circular-center{
		width: 15upx;
		height: 75upx;
		background-color: white;
		border-radius: 20upx;
		box-shadow: 0 0 3upx   #DCDFE6 inset;
		position: absolute;
		margin-top: 20upx;
		margin-left: 13upx;
	}
	.circular-down{
		width: 40upx;
		height: 40upx;
		background-color: #ededeb;
		border-radius: 50%;
		box-shadow: -5upx 5upx 6upx  #DCDFE6 inset;
		position: absolute;
		margin-top: 70upx;
	}
</style>

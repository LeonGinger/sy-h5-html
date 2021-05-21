<template>
	<view class="wrapper">
		
		<view class="whitebox" style="margin-bottom: 20upx;">
			<ul>
				<li  @click="list=0" :style="list==0 ? 'color: #ffa9a9;':''">已入库<view :class="list==0? 'on1':''"></view></li>
				<li  @click="list=1" :style="list==0 ? '':'color:#0ABB9A;'">已出库<view :class="list==1? 'on2':''"></view></li>
			</ul>
		
		<view class="whitebox" v-for="(item,index) in enter" style="margin-top:20upx;display: flex;position: relative;width: 100%;padding: 25upx;" v-if="list==0" @click="rkxq(index)">
		
			<image :src="item.menu_images_json[0]" class="spimg"></image>			
			<text class="listname">{{item.menu_name}}</text>
			<text class="listgg">商品规格:{{item.menu_weight}}</text>
			<text class="listtime">入库时间:<span>{{item.storage_time}}</span></text>
			<image src="../../static/rk.jpg" class="spzt"></image>
		</view>
		
		<view class="whitebox" v-for="(item,index) in out" style="margin-top:20upx;display: flex;position: relative;width: 100%;padding: 25upx;" v-if="list==1" @click="ckxq(index)">
			<image :src="item.menu_images_json[0]" class="spimg"></image>	
			<text class="listname">{{item.menu_name}}</text>
			<text class="listgg">商品规格:{{item.menu_weight}}</text>
			<text class="listtime">出库时间:<span>{{item.deliver_time}}</span></text>
			<image src="../../static/rk.jpg" class="spzt"></image>
				<image src="../../static/ck.png" class="spzt"></image>
		</view>
		
		<bottomBar></bottomBar>
		
	</view>	
		<view class="aa" style="padding-bottom: 150rpx;"></view>
		<u-empty text="暂无入库记录" mode="list" v-if="!enter.length && list==0"></u-empty>
		<u-empty text="暂无出库记录" mode="list" v-if="!out.length && list==1"></u-empty>
	</view>
	
</template>

<script>
	export default {
			data() {
				return {
					list:0,
					enter:[],
					out:[],
					
				}
			},
			onLoad(res) {
				let _this=this;
				console.log(res.list);
				if(res.list){
					 _this.list=res.list;
				}else{
					 _this.list=0;
				}
				
				 
				_this.$api.opend_list().then((res) =>{
						_this.enter=res.data.enter;
						_this.out=res.data.out;
						for(let i=0;i<res.data.enter.length;i++){
							res.data.enter[i].menu_images_json = JSON.parse(res.data.enter[i].menu_images_json)
							
						}
						
						for(let k=0;k<res.data.out.length;k++){
							res.data.out[k].menu_images_json = JSON.parse(res.data.out[k].menu_images_json)
						}
				 })
				
				},
			methods: {	
				changeTab(list){
					that.navIdx == list;
				},
				rkxq(index){
					let _this=this;
					uni.navigateTo({
						url:'../traceability/traceability?source_code='+_this.enter[index].source_code
					})
				},
				ckxq(index){
					let _this=this;
					uni.navigateTo({
						url:'../traceability/traceability?source_code='+_this.out[index].source_code
					})
				}
				
			}
	}
</script>

<style>
	.nolist{
		display: none;
	}
	page{
		background-color: #f7f7f7;
	}
	ul{
		height: 100upx;
		width: 80%;
		margin: auto;
		margin-top: -30upx;
		
	}
	li{
		width: 50%;
		display: inline-block;
		height: 80upx;
		font-size: 35upx;
		line-height: 100upx;
		text-align: center;
		margin-left: -20upx;
		font-weight: bold;
	}
	@keyframes myfirst
	{
	from {width: 0upx;}
	to {display: block;}
	}
	li .on1{
		width: 130upx;
		height: 10upx;
		background-color: #ffa9a9;
		margin: auto;
		margin-top:-20upx;
		border-radius: 30upx;
		animation:myfirst 0.2s linear;
	}
	li .on2{
		width: 130upx;
		height: 10upx;
		background-color: #0ABB9A;
		margin: auto;
		margin-top:-20upx;
		border-radius: 30upx;
		animation:myfirst 0.2s linear;
	}
	.spimg{
		width: 170upx;
		height: 170upx;
		border-radius: 20upx;
		overflow: hidden;
		box-shadow: 0 0 12upx #C0C4CC;
	}
	.listname{
		position: absolute;
		overflow: hidden;/*超出部分隐藏*/
		white-space: nowrap;/*不换行*/
		text-overflow:ellipsis;/*超出部分文字以...显示*/
		width: 300upx;
		left: 34%;
		font-size: 30upx;
		font-weight: bold;
		top: 15%;
	}
	.listtime{
		position: absolute;
		left: 34%;
		font-size: 30upx;
		top: 70%;
		overflow: hidden;/*超出部分隐藏*/
	}
	.listtime span{
		font-size: 25upx;
		margin-top: -2upx;
	}
	.listgg{
		position: absolute;
		left: 34%;
		font-size: 30upx;
		top: 43%;
		overflow: hidden;/*超出部分隐藏*/
		white-space: nowrap;/*不换行*/
		text-overflow:ellipsis;/*超出部分文字以...显示*/
		width: 263upx;
	}
	.spzt{
		position: absolute;
		width: 130upx;
		height: 50upx;
		right: 5%;
		top: 30%;
		transform:rotate(-10deg);
	}
</style>
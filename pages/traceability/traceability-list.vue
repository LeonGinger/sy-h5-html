<template>
	<view class="wrapper">
			<view class="whitebox">
				<view class="listtitle">
					 <view class="utitleblock"></view>
					<text class="atext">我的记录</text>
					<text class="dtext">共<u-count-to :start-val="0" :end-val="sylist.length" :duration="1500" :use-easing="false"></u-count-to>条记录
					</text>
				</view>
				<view class="whitebox" style="margin-top: 20upx;display: flex;position: relative;width: 100%;padding: 25upx;" v-for="(item,index) in sylist" :key="index" @click="xq(index)">
					<view class="listimg">
						<image :src="item.menu_images_json[0]"></image>
					</view>
					
					<text class="listname">{{item.menu_name}}</text>
					<text class="listday">生产日期:{{item.production_time.slice(0,10)}}</text>
					<text class="listgg">商品规格:{{item.menu_weight}}</text>
					<text class="listyd">{{item.menu_address}}</text>
				</view>
				

				
			</view>
			<view class="aa" style="padding-bottom: 130rpx;"></view>
			<u-empty text="暂无溯源记录" mode="list" v-if="!sylist.length"></u-empty>
			<bottomBar></bottomBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sylist:[],
			}
		},
		onLoad() {
			let _this=this;

				_this.$api.this_source_log().then((res) =>{			
					console.log(res.data)
					for(let i=0;i<res.data.length;i++){
						res.data[i].source[0].menu_images_json=JSON.parse(res.data[i].source[0].menu_images_json);					
						_this.sylist.push(res.data[i].source[0])  
					}
					console.log("log",_this.sylist);
				});
				
		},
		methods: {
		
			xq(index){
					let _this=this;
				uni.navigateTo({
					url: 'traceability?source_code='+_this.sylist[index].source_code
				});
			}
			
		}
	}
</script>
	
<style>
	.inlist{
		margin-top: 250upx;
	}
	.nolist{
		display: none;
	}
	.listtitle{
		display: flex;
		justify-content: space-between;
		height: 50upx;
		margin-top: 10upx;
		position: relative;
		padding: 0 10rpx;
	}
	
	.atext{
		font-size: 30upx;
		font-weight: bold;
		color: black;
		position: absolute;
		margin-top: -2upx;
		left: 8%;		
	}
	.dtext{
		font-size: 30upx;
		/* left: 74%;	 */
		/* position: absolute; */
		font-weight: bold;
		color: black;
	}
	.dtext span{
		color: #0ABB9A;
	}
	.listimg{
		width: 170upx;
		height: 170upx;
		border-radius: 20upx;
		overflow: hidden;
		box-shadow: 0 0 12upx #C0C4CC;
	}
	.listimg image{
		width: 170upx;
		height: 170upx;
		box-shadow: 0 0 12upx #C0C4CC;
	}
	.listname{
		position: absolute;
		left: 34%;
		font-size: 30upx;
		font-weight: bold;
		top: 15%;
	}
	.listday{
		position: absolute;
		left: 34%;
		top: 35%;
		font-size: 26upx;
	}
	.listgg{
		position: absolute;
		left: 34%;
		top: 55%;
		font-size: 26upx;
	}
	.listyd{
		position: absolute;
		left: 34%;
		top: 75%;
		font-size: 26upx;
	}
	</style>


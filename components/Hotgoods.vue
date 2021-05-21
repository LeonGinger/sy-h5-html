<template>

		<view class="whitebox" style="margin-bottom: 150upx;" v-if="my_menu">
			<!-- <view class="utitlebox"> -->
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<view class="utitle">热卖商品</view>
			</view>
			<!-- </view> -->
			<view class="recommend">
				<view class="sbox" v-for="(item,index) in my_menu[0]" @click="recommend" v-if="index<4">
					<view class="simage">
						<image :src='item.menu_images_json[0]'></image>
					</view>
					<view class="stxtbox">
						<text class="stext">{{item.menu_name}}</text>
						<text class="stext">{{item.menu_weight}}</text>
					</view>
					<view class="sbtbox">
						<text class="sprice"><span class="smtext">￥</span>{{item.menu_money}}</text>
						<view class="sbt">
							<text class="sbtext">购买</text>
						</view>
					</view>
				</view>
				<view class="more" @click="more" v-if="rmspmore == false && my_menu.length>4">
					<image src="../static/iconfont/load.png" v-if="moreload == false"></image>
					<view class="loadbox" style="margin-left:-60upx;">
					<u-loading mode="circle" size="40" :show="moreload" color="#0abb99"></u-loading>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				my_menu: [],
				rmspmore: false,
				moreload: false,
				
			}
		},
		onLoad() {
			let _this = this;
			let menu = [];
			_this.$api.my_menu().then((res) => {
				for (let k = 0; k < res.data.length; k++) {
					console.log(res.data[k])
					res.data[k].menu_images_json = JSON.parse(res.data[k].menu_images_json)
					console.log(res.data[k])
				}
				console.log(_this.my_menu)
				_this.my_menu.push(res.data);
			});

		},
		methods: {
			more() {
				let _this = this
				this.moreload = true
				setTimeout(function() {
					_this.rmspmore = true
					_this.moreload = true
				}, 2000)

			},
		}
	}
</script>

<style>
</style>

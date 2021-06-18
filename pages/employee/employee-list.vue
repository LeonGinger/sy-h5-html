<template>
	<view class="wrapper">
		<view class="whitebox">
			<view class="utitlebox" style="margin-top: 20upx;margin-bottom: 10upx;">
			    <view class="utitleblock"></view>
			    <view class="utitle">员工列表</view>
			</view>

			<text class="tips" v-if="State==1 || State==2">{{!my_user.length ? '(点击下方按钮可添加员工)':'(向左滑动可移除该员工)'}}</text>
			<view>	
					<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in my_user" :key="item.id" v-if="index ==0">
						<view class="item u-border-bottom">
							<view class="imgbox">
							<image :src="item.user_image"></image>
							</view>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap">
								<text class="name">商家姓名:{{item.username}}</text>
								<text class="number">电话号码:{{item.phone}}</text>
							</view>
						</view>
					</u-swipe-action>
					<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in my_user"  v-if="index>0" :key="item.id"  @click="click" @open="open":options="options" :disabled="disabled">
						<view class="item u-border-bottom">
							<view class="imgbox">
							<image :src="item.user_image"></image>
							</view>
							<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
							<view class="title-wrap">
								<text class="name">员工姓名:{{item.username}}</text>
								<text class="number">电话号码:{{item.phone}}</text>
							</view>
						</view>
					</u-swipe-action>
				</view>
		</view>
		<u-mask :show="add" >
			<view class="ewmbox">
				<text class="ewmtitle">扫码添加员工</text>
				<view class="ewm" >
					<tki-qrcode v-if="ifShow" 
						cid="qrcode1" 
						ref="qrcode" 
						:val="val" 
						:size="size" 
						:unit="unit" 
						:background="background" 
						:foreground="foreground" 
						:pdground="pdground" 
						:icon="icon" 
						:iconSize="iconsize" 
						:lv="lv" 
						:onval="onval" 
						:loadMake="loadMake" 
						:usingComponents="true" 
						@result="qrR" />
				</view>
				<image src="@/static/qx.png" class="qx" @click="add = false"></image>
			</view>
		</u-mask>
		<u-button :ripple="true"
		style="width: 300upx;background-color: #0ABB9A;color: white;
		position: fixed;left: 30%;bottom: 10%;"
		@click="addemp" v-if="State==1 || State==2">添加员工</u-button>
	<!-- 	<view class="aa" style="padding-bottom: 280rpx;"></view> -->
			<u-empty text="暂无员工" mode="list" v-if="!my_user.length" style="margin-top:-20upx;"></u-empty>		
		<bottomBar></bottomBar>
	</view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		
			data() {
				return {
					ifShow: true,
					val: '1',// 要生成的二维码值
					size: 300, // 二维码大小
					unit: 'upx', // 单位
					background: '#b4e9e2', // 背景色
					foreground: '#309286', // 前景色
					pdground: '#32dbc6', // 角标色
					icon: '', // 二维码图标
					iconsize: 40, // 二维码图标大小
					lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
					onval: true, // val值变化时自动重新生成二维码
					loadMake: true, // 组件加载完成后自动生成二维码
					src: '', // 二维码生成后的图片地址或base64
					add:false,
					disabled:false,
					btnWidth: 180,
					show: false,
					token:'',
					grant_code:'',
					business_name:'',
					my_user:[],
					yg:'',
					State:'',
					options: [
						{
							text: '移除',
							style: {
								backgroundColor: '#dd524d'
							}
						}
					],
				
					
				};
			},
			onLoad() {
				
				let _this=this
				uni.getStorage({
				key:"token",
				success(e){
					_this.token=e.data								
				 }
				 
			 })
				_this.$api.my_user({token:_this.token}).then((res) =>{
						 let lists = res.data;
						for(let i=0;i<lists.length;i++){
							_this.$set(lists[i],'show',false)
						}
						_this.my_user=lists;
					
						console.log("_this.my_user",_this.my_user)
				 })
				_this.$api.business_selectall({token:_this.token}).then((res) =>{
				 		console.log("商家信息",res)
						this.grant_code=res.data[0].grant_code;
						this.business_name=res.data[0].business_name
						 console.log("里",this.grant_code)
						 let grant_code=res.data[0].grant_code
						 this.val=this.syhttp + '/#/pages/scan/staffscan?grant_code='+grant_code; 
				 }).catch((error_res)=>{
					uni.showModal({
						title: "功能无法使用",
						content: error_res.data.message,
						showCancel: false,
						confirmColor: '#0ABB9A',
						// success:function(res){
						// 	uni.navigateTo({
						// 		url: 'Product-list',
						// 		success: res => {},
						// 		fail: () => {},
						// 		complete: () => {}
						// 	});
							
						// }
					})
					 
				 })
				_this.$api.userinfo().then((res) =>{					
								 _this.State = res.data.role_id
								if(res.data.role_id !=1 && res.data.role_id !=2){  //如果不是管理员或商家，就不允许滑动列表
									_this.disabled=true
								}
								else{
									_this.disabled=false
								}
				})	
				
			},
			methods: {
				click(index) {
					let _this=this
					console.log(_this.my_user[index].id)
				uni.showModal({
				    title: '提示',
				    content: '确定要移除该员工吗？',
					confirmColor:'#0ABB9A',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.out_my_user({token:_this.token,out_user_id:_this.my_user[index].id}).then((res) =>{
									_this.$u.toast(`移除成功`);
									uni.reLaunch({
										url:'employee-list'
									})
							 })
							
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});	
				
				},
				// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
				open(index) {
					// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
					// 原本为'false'，再次设置为'false'会无效
					this.my_user[index].show = true;
					this.my_user.map((val, idx) => {
						if(index != idx) this.my_user[idx].show = false;
					})
				},
				addemp(){
					this.add=true
					
				}
			}
		};
</script>

<style>
	.none{
		display: none;
	}
	.utitle{
		padding-bottom: 20upx;
	}
	.tips{
		color:  gray;
		margin-left: 20upx;
		font-size: 25upx;		
		
	}
	.item {
		display: flex;
		padding: 20rpx;
	}
	.title-wrap{
		width: 400upx;
		height: 120rpx;
		position: relative;
		}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.imgbox{
		background-color: white;
		width: 130upx;
		height: 130upx;
		border-radius: 50%;
		border: 6upx white solid;
		box-shadow: 0 0 12upx #C0C4CC;
		overflow: hidden;
	}
	.imgbox image{
		width: 130upx;
		height: 130upx;
	}
	.name{
		position: absolute;
		top: 18%;
		font-weight: bold;
		font-size: 28upx;
		left: 4%;
	}
	.number{
		position: absolute;
		top: 65%;
		font-weight: bold;
		font-size:28upx;
		left: 4%;
	}
	.ewmbox{
		height: 410upx;
		background-color: white;
		width: 400upx;
		position: fixed;
		top: 30%;
		left: 23%;
		border-radius: 30upx;
		position: relative;
	}
	.ewmtitle{
		position: absolute;
		left: 30%;
		top: 5%;
		font-weight: bold;
		}
	.ewm{
		height: 300upx;
		width: 300upx;
		position: absolute;
		left: 13%;
		top: 18%;
	}	
	.ewm image{
		height: 300upx;
		width: 300upx;
	}
	.qx{
		position: absolute;
		left: 50%;
		top: 110%;
		width: 60upx;
		height: 60upx;
		transform: translate(-50%,0);
	}
	
</style>

<template>
	<view class="wrapper">
		<view class="whitebox">
			<view class="listtitle">
				<view class="utitlebox" style="margin-top: 30upx;">
				    <view class="utitleblock"></view>
				    <view class="utitle">商家管理</view>
				</view>
			</view>
			<text class="ts">(左滑列表可进行操作，点击列表浏览商家详情)</text>
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="item.id" @click="click" @open="open"
			 :options="options" class="listbox" :disabled="disabled">
				<view class="item u-border-bottom" @click="xq">
					<image mode="aspectFill" :src="item.images" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="name">{{item.business_name}}</text>
						<text class="ry">联系人员:{{item.responsible_name}}</text>
						<text class="dh">联系电话:{{item.responsible_phone}}</text>
					</view>
				</view>
				<span class="rzfalse" v-if="verify_if == 2">(您上次修改的商家信息审核未通过，可再次修改提交审核)</span>
			</u-swipe-action>


		</view>
		<view class="aa" style="padding-bottom: 150rpx;"></view>
		<u-empty text="暂无商品信息" mode="list" :class="list == 0 ? '':'nolist'"></u-empty>
		<bottomBar></bottomBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					//商家图片
						images: '../../static/wxg.jpg',
						//商家名称
						business_name: '',
						//联系人名称
						responsible_name:'',
						//电话名称
						responsible_phone:'',
						show: false,
						verify_if:'',
					}
				],
				business_id:'',
				disabled:false,
				show: false,
				options: [{
						text: '修改',
						style: {
							backgroundColor: '#5fd0bb'
						}
					},
					{
						text: '注销',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				ck:0
			};
		},
		onLoad() {
			let _this = this
			_this.$api.business_selectall().then((res)=>{
				let business_selectall = res.data[0]
				console.log("Res",res.data[0])
				_this.business_id= business_selectall.id;
				_this.bverify_if=business_selectall.verify_if
				// 商家名称超过10个字后面的字变为省略号
				if(business_selectall.business_name.length >= 10){
					_this.list[0].business_name = business_selectall.business_name.substring(0,10)+"..."
				}else{
					_this.list[0].business_name = business_selectall.business_name
				}
				//联系人名称
				_this.list[0].responsible_name = business_selectall.responsible_name
				//联系电话
				_this.list[0].responsible_phone = business_selectall.responsible_phone
				_this.id = business_selectall.id
				//商家图片
				if(business_selectall.business_images != null){
					let image = JSON.parse(business_selectall.business_images)
					_this.list[0].images = image[0]
					_this.ck = 1
				}
				
				// _this.list.responsible_name = res.data[0].responsible_name
			}).catch((error_res)=>{
				let business_selectall = error_res.data.data[0]
				_this.business_id= business_selectall.id;
				_this.bverify_if=business_selectall.verify_if
				// 商家名称超过10个字后面的字变为省略号
				if(business_selectall.business_name.length >= 10){
					_this.list[0].business_name = business_selectall.business_name.substring(0,10)+"..."
				}else{
					_this.list[0].business_name = business_selectall.business_name
				}
				//联系人名称
				_this.list[0].responsible_name = business_selectall.responsible_name
				//联系电话
				_this.list[0].responsible_phone = business_selectall.responsible_phone
				_this.id = business_selectall.id
				//商家图片
				if(business_selectall.business_images != null){
					let image = JSON.parse(business_selectall.business_images)
					_this.list[0].images = image[0]
					_this.ck = 1
				}
			})
		},
		methods: {
			xq(){
				let _this=this;
				if(this.ck == 0){
					uni.showModal({
						title:"提示",
						content:"您的商家信息还未填写完整\n请您点击”确定“去完善商家信息",
						confirmColor:'#0ABB9A',
						showCancel:false,
						success:(res) =>{
							if(res.confirm){
								uni.navigateTo({
									url: '../business/business-addition?business_id='+_this.business_id
								})
								// console.log("点击确定")
							}
						}
					})
				}else{
					uni.navigateTo({
						url: './business?id='+_this.business_id
					})
				}
				
			},
			click(index, index1) {
				let _this = this
				if (index1 == 1) {
					uni.showModal({
						title:'提示',
						content: "您是否注销商家，您的商品将会全部下架",
						confirmColor:'#0ABB9A',
						success: (res) => {
							if(res.confirm){
								_this.$api.business_delete({business_id: _this.id}).then((res)=>{
									console.log("res",res)
									uni.showModal({
										title:"提示",
										content:"注销成功",
										showCancel:false,
										confirmColor:'#0ABB9A',
										success: (res) => {
											
											if(res.confirm){
												// uni.switchTab({
												// 	url:"../my/my"
												// })
												uni.reLaunch({
													url:"../my/my"
												})
											}
										}
									})
								})
								
							}
							
						}
					})

				} else {
					uni.navigateTo({
						url: './business-addition'
					})
				}
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			}
		}
	};
</script>

<style>
	.rzfalse{
		
		color: red;
		width: 180upx;
	}
	.inlist {
		margin-top: 250upx;
	}

	.nolist {
		display: none;
	}
	.add{
		display: flex;
		align-items: center;
	}
	.add_img{
		width: 35upx;
		height: 35upx;
	}
	.utitlebox{
		margin-bottom: 10upx;
	}
	.atext {
		font-size: 30upx;
		font-weight: bold;
		color: #000000;
		position: absolute;
		margin-top: -2upx;
		left: 8%;
	}

	.dtext span {
		color: #0ABB9A;
	}

	.item {
		display: flex;
		padding: 20rpx;
	}

	.item image {
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
		border-radius: 20upx;
		box-shadow: 0 0 12upx #C0C4CC;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}

	.title-wrap {
		position: relative;
		width: 360upx;
		height: 170upx;
		display: flex;
		font-size: 28upx;
		color: #424242;
		font-size: 30upx;

	}

	.title-wrap text {
		position: absolute;
	}

	.name {
		top: 20%;
		font-weight: bold;
	}

	.ry{
		top: 50%;
	}
	.dh{
		top: 80%;
	}

	.ts {
		margin-left: 20upx;
		font-size: 25upx;
		color: gray;
		padding-top: 10upx;
		
	}
</style>


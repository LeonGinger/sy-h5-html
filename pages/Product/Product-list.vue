<template>
	<view class="wrapper">
		<view class="whitebox">
			<view class="listtitle">
				<view class="add" @click="add">
					<image src="../../static/add.png" class="add_img"></image>
					<text class="atext">添加商品</text>
				</view>
				<text class="dtext">共<u-count-to :start-val="0" :end-val="my_menu.length" :duration="1500" :use-easing="false"></u-count-to>件商品
				</text>
			</view>
			<text class="ts">{{my_menu.length==0 ? '(点击添加按钮可添加商品)':'(左滑列表可操作商品，点击可查看商品详情)'}}</text>
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in my_menu"  @click="click" @open="open"
			 :options="options" class="listbox">
				<view class="item u-border-bottom" :index="index" @click="ckxx(index)">
					<image mode="aspectFill"  :src="item.menu_images_json" />
					<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
					<view class="title-wrap">
						<text class="name">{{item.menu_name}}</text>
						<text class="day">生产日期:{{item.production_time.slice(0,10)}}</text>
						<text class="gg">商品规格:{{item.menu_weight}}</text>
						<text class="dz">{{item.menu_address}}</text>
					</view>
				</view>
			</u-swipe-action>


		</view>
		<view class="aa" style="padding-bottom: 150rpx;"></view>
		<u-empty text="暂无商品信息" mode="list" :class="my_menu.length==0  ? '':'nolist'"></u-empty>
		<bottomBar></bottomBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				my_menu: [],
				disabled: false,
				show: false,
				img:[],
				options: [
					{
						text: '修改',
						style: {
							backgroundColor: '#5fd0bb'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		onLoad() {
			let _this=this;
			let json='';
			let img='';
			_this.$api.my_menu().then((res) =>{			
				let lists = res.data;
				for(let i=0;i<lists.length;i++){
					_this.$set(lists[i],'show',false);
					// console.log("lists",lists)
					// console.log("listssdssss",JSON.parse(lists[i].certificate_image))
					// console.log("listssdssss",JSON.parse(lists[i].menu_images_json))
					
						json = JSON.parse(lists[i].menu_images_json)					
					// img = JSON.parse(lists[i].certificate_image)
						lists[i].menu_images_json = json[0]
					// lists[i].certificate_image = img
				}
				_this.my_menu=lists;
				// sconsole.log("listjson",lists)		
					});
		},
		methods: {
			
	
			add() {
				uni.navigateTo({
					url: './Product-addition'
				})
			},
			click(index, index1) {
				let _this=this;
				if (index1 == 1) {
					uni.showModal({
						title:'提示',
						content: "您是否确定删除此商品",
						confirmColor:'#0ABB9A',
						success: (res) => {
							if (res.confirm) {
								_this.$api.delete_menu({menu_id:_this.my_menu[index].id}).then((res) =>{
										_this.$u.toast(`删除成功`);
										uni.redirectTo({
										    url: 'Product-list'
										});
								 })
									
							} else if (res.cancel) {}
						}
					})

				}else{
					uni.navigateTo({
						url: './Product-modification?index='+_this.my_menu[index].id
					})
				}
			},
			ckxx(index){
				let _this=this;
				uni.navigateTo({
					url: './Product-recommend?index='+_this.my_menu[index].id
				})
			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.my_menu[index].show = true;
				this.my_menu.map((val, idx) => {
					if (index != idx) this.my_menu[idx].show = false;
				})
			}
		}
	};
</script>

<style>
	.inlist {
		margin-top: 250upx;
	}

	.nolist {
		display: none;
	}

	.listtitle {
		display: flex;
		justify-content: space-between;
		height: 50upx;
		margin-top: 10upx;
		margin-left: 20rpx;
		position: relative;
		align-items: center;

	}
	.add{
		display: flex;
		align-items: center;
	}
	.add_img{
		width: 35upx;
		height: 35upx;
	}

	.atext {
		font-size: 30upx;
		font-weight: bold;
		color: #000000;
		position: absolute;
		margin-top: -2upx;
		left: 8%;
	}

	.dtext {
		font-size: 30upx;
		/* left: 74%; */
		/* position: absolute; */
		margin-right: 30rpx;
		font-weight: bold;
		color: #000000;
	}

	.dtext span {
		color: #0ABB9A;
	}

	.item {
		display: flex;
		padding: 20rpx;
	}

	.item image {
		width: 170rpx;
		height: 170rpx;
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
		width: 400upx;
		height: 170upx;
		display: flex;
		font-size: 28upx;
		color: #424242;
		display: -webkit-box;
	}

	.title-wrap text {
		width: 400upx;
		position: absolute;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		
		
	}

	.name {
		top: 3%;
		font-weight: bold;
	}

	.gg {
		top: 30%;
	}

	.day {
		top: 55%;
	}

	.dz {
		top: 80%;
	}

	.ts {
		margin-left: 20upx;
		font-size: 25upx;
		color: gray;
	}
</style>

<template>

	<view class="wrapper">
		<image src="@/static/sp-bg.jpg" class="bg"></image>
		
		<view class="ytitle">
			<text class="ytext">商家信息管理</text>
		</view>
		<!-- 轮播图 -->
		<view class="whitebox">
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<text class="utitle">轮播图</text>
				<text class="uxtitle">（最多上传6张图片）</text>
				<text class="uxtitle" style="color: red;">*必填*</text>
			</view>

			<view class="lbt">
				<u-upload ref="lbtload" :action="action" :auto-upload="false" max-count="6" :model="model"></u-upload>
			</view>
		</view>
		<!-- 轮播图 -->
		<connect class="connect"></connect>
		<!-- 商品信息 -->
		<view class="whitebox">
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<text class="utitle">商家信息</text>
				<text class="uxtitle" style="color: red;">（修改需再次审核）</text>
			</view>
			<u-form style="margin-left: 20upx;">
				<u-form-item label="商家名称:">
					<u-input placeholder="请输入商家名称" v-model="newBusiness_Selectall.business_name"  maxlength='16'/>
				</u-form-item>
				<u-form-item label="商家地址:">
					<u-input placeholder="请输入商家地址" v-model="newBusiness_Selectall.business_address" maxlength='20'/>
				</u-form-item>
				<u-form-item label="联系人员:">
					<u-input placeholder="请输入商家联系人姓名" v-model="newBusiness_Selectall.responsible_name"  maxlength='6'/>
				</u-form-item>
				<u-form-item label="联系电话:">
					<u-input placeholder="请输入商家联系人电话" v-model="newBusiness_Selectall.responsible_phone" type="number" maxlength="11"/>
				</u-form-item>
			</u-form>
		</view>
		<!-- 商品信息 -->

		<!-- 商品信息 -->
		<view class="whitebox">
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<text class="utitle">编辑商家介绍</text>
				<text class="uxtitle" style="color: red;margin-left: 10upx;">*必填*</text>
			</view>
			<view class="jstextbox">
				<textarea maxlength="1000" placeholder="在这输入商家介绍" v-model='newBusiness_Selectall.business_introduction'></textarea>
			</view>
		</view>
		<!-- 商品信息 -->

		<!-- 上传商家图集 -->
		<view class="whitebox">
			<view class="utitlebox" style="margin-bottom: 30upx;">
				<view class="utitleblock"></view>
				<text class="utitle">编辑商家图集</text>
				<text class="uxtitle" style="color: red;">（可不填写）</text>
			</view>
		</view>
		<connect class="connect"></connect>
		<view class="whitebox" v-for="(item,index) in tjlb">
			<view class="mk">
				<view class="tjt1">上传图集图片：</view>
				<!-- 删除图集 -->
				<view class="annv">
					<view class="tjtextbox" v-if="tjlb.length > 1">
						<image src="@/static/remove.png" class="removeimg" @click="tjremove(index)"
						 :animation="animationData1"></image>
						<text class="tjt2">删除</text>
					</view>
					<!-- 删除图集 -->

					<!-- 添加图集 -->
					<view class="tjtextbox" v-if="tjlb.length < 5">
						<image src="@/static/add.png" :class="index===tjlb.length-1? 'addimg':'addimgno'"
						 @click="pd(index)" :animation="animationData"></image>
						<text :class="index===tjlb.length-1? 'tjt2':'addimgno'">添加</text>
					</view>
				</view>
				<!-- 添加图集 -->
			</view>
			<view class="xztp" style="position: relative;">
				<!-- <uploadimg
					:width="600"
					:height="360"
					@chooseimg="handleChooseImg(index)"
					:model='model'
					>
				</uploadimg> -->
				<!-- <u-upload ref="tjload" :action="action" :auto-upload="false" max-count="1" width="600upx" height="360upx" style="margin-top: 20upx;opacity: 0;z-index: 1 ;position: absolute;"  :model="model" @click.native="img(index)"></u-upload> -->
				<image :src="tjlb[index].image == '' ? '../../static/xztp.png' : tjlb[index].image  " style="width: 610upx; height: 360upx;margin-top: 20upx;border-radius: 10upx;"
				 @click="img(index)" />
				</image>
				<image src="../../static/qx.png" style="width: 50upx;height: 50upx;position: absolute;top:50upx;right: 30upx;" v-if="tjlb[index].image != ''"
				 @click="off(index)"></image>
			</view>
			<view class="tjtextarea">
				<textarea maxlength="1000" placeholder="在这输入图集文本" v-model="item.tjtext"></textarea>
			</view>
			
		</view>
		<u-mask :show="ckll" @click="fg_qx">
			<view :class="ckll==false ? 'noseeill':'seeill'">
				<image :src="bigimg" class="ltimg" :style="{width:bigimgWidth+'rpx',height:bigimgHeight+'rpx'}" v-if="bigimgWidth <= 950 && bigimgHeight <= 700 && bigimgWidth >= 500 && bigimgHeight>=500"></image>
				<image :src="bigimg" class="ltimg" v-else></image>
				<!-- <image :src="scimg" class="scimg" ></image> -->
				<!-- <image :src="report" class="ltimg" v-if="tp == 2"></image>					 -->
			</view>
		</u-mask>
		<!-- 上传商家图集 -->

		<!-- 上传证书 -->
		<view class="whitebox">
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<text class="utitle">上传商家证书</text>
				<text class="uxtitle"  style="color: red;">（修改需再次审核）</text>
			</view>
			<view class="whitebox" style="width: 638upx;margin-left:-15upx ;padding: 20upx;">

				<view class="htitle">
					<text>上传营业执照/营销执照:</text>

					<view class="illustration" @click="ck">查看例图</view>
				</view>
				<u-mask :show="cklt" @click="qx">

					<view :class="cklt==false ? 'noseeill':'seeill'">
						<image src="@/static/yyzz.jpg" class="ltimg"></image>

					</view>
				</u-mask>
				<view class="scbg">
					<u-upload ref="yyzzload" :action="action" :auto-upload="false" max-count="6" :model="model"></u-upload>
				</view>
			</view>
		</view>
		<!-- 上传证书 -->

		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<view class="btbox">
			<view class="bt1" @click="btback">返回</view>
			<view class="bt2" @click="btconfirm">确定</view>
		</view>
		<view class="aa" style="padding-bottom: 50rpx;"></view>

	</view>
</template>

<script>
	import EXIF from '@/common/exif.js';
	export default {
		data() {

			return {
				action: '',
				scrollTop: 0,
				// 表单
				//商家名称
				business_name: '',
				//商家地址
				business_address: '',
				//联系人员
				responsible_name: '',
				//联系电话
				responsible_phone: '',
				addpd: true,
				jstext: '',
				model: '',
				// 表单
				//旧商家信息数组，用来对比
				newBusiness_Selectall: [],
				oldBusiness_Selectall: [],
				fileList: [],
				animationData: {

				},
				animationData1: {

				},
				show: false,
				mode: 'time',
				cklt: false,
				ckll: false,
				tjlb: [{
					id: 0,
					tjtext: '',
					image: '',
				}],
				bigimgHeight: '',
				bigimgWidth: '',
				bigimg: '',
				dy: '',
				waitsh:false,
			}

		},
		onReady() {
			const _this = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					_this.model = res.model
				}
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow: function() {
			let animation = uni.createAnimation({
				duration: 100,
				timingFunction: 'ease',
			})
			this.animation = animation
			

		},
		onLoad() {
			let _this = this
			_this.$api.business_selectall().then((res) => {
				console.log("ressssss", res)
				
				//为新数组赋值
				_this.newBusiness_Selectall = {...res.data[0]}
				console.log(_this.newBusiness_Selectall)
				// _this.newBusiness_Selectall = JSON.parse(JSON.stringify(res.data[0]))
				// //为对比数组赋值
				_this.oldBusiness_Selectall = JSON.parse(JSON.stringify(res.data[0]))
				//企业证书赋值
				console.log("_this.OldBusiness_Selectall",_this.oldBusiness_Selectall)
				console.log("_this.newBusiness_Selectall",_this.newBusiness_Selectall)
				let zs_img = JSON.parse(_this.newBusiness_Selectall.business_appraisal[0].appraisal_image)
				// console.log("aa",_this.$refs.lbtload._data.lists)
				for(let i = 0;i < zs_img.length;i++){
					_this.$refs.yyzzload._data.lists.push({'url' : zs_img[i]})
				}
				
				//轮播图赋值 
				if(_this.newBusiness_Selectall.business_images != null || _this.newBusiness_Selectall.business_images == ''){
					let lbt_img = JSON.parse(_this.newBusiness_Selectall.business_images)
					for(let i = 0;i < lbt_img.length;i++){
						_this.$refs.lbtload._data.lists.push({'url' : lbt_img[i]})
					}
					console.log("lbt_img",lbt_img)
				}
				console.log("tjlb",_this.tjlb)
				console.log("_this.newBusiness_Selectall.business_img[0].business_image_injson",_this.newBusiness_Selectall.business_img[0].business_image_injson)
				//商家风光图片赋值
				if(typeof(_this.newBusiness_Selectall.business_img[0].business_image_injson) == 'undefined' || _this.newBusiness_Selectall.business_img[0].business_image_injson == ' '){
					
					
				}else{
					if(_this.newBusiness_Selectall.business_img[0].business_image_injson){
						var fg_img = JSON.parse(_this.newBusiness_Selectall.business_img[0].business_image_injson)
					}else{
						var fg_img = []
					}


					
					console.log("fg_imgfff",fg_img)
					
					for(let i = 0;i < fg_img.length;i++){
						if(i >= _this.tjlb.length){
							_this.tjlb.push({
								id: i + 1,
								tjtext: '',
								image: ''
							})
						}
						// console.log("aaa",fg_img[i])
						console.log("_this.tjlb[i]",_this.tjlb[i])
						_this.tjlb[i].image = fg_img[i]
					}
					// console.log("fg_img",fg_img)
				}
				//商家风光文字赋值
				if(_this.newBusiness_Selectall.business_img[0].business_img_contentjson != ' '){
					if(_this.newBusiness_Selectall.business_img[0].business_img_contentjson){
						var fgwz_img = JSON.parse(_this.newBusiness_Selectall.business_img[0].business_img_contentjson)
					}else{
						var fgwz_img = []
					
					}
					// console.log("fgwz_imgdd",fgwz_img)
					for(let i = 0;i < fgwz_img.length;i++){
						// console.log("aaa",fgwz_img[i])
						_this.tjlb[i].tjtext = fgwz_img[i]
						
					}
					// console.log("fgwz_img",fgwz_img)
				 }
			})
			
			// .catch((error_res)=>{
			// 	console.log(error_res)
			// 	let res = error_res.data
			// 	//为新数组赋值
			// 	_this.newBusiness_Selectall = JSON.parse(JSON.stringify(res.data[0]))
				
			// 	//为对比数组赋值
			// 	_this.oldBusiness_Selectall = JSON.parse(JSON.stringify(res.data[0]))
			// 	//企业证书赋值
			// 	console.log("_this.OldBusiness_Selectall",_this.oldBusiness_Selectall)
			// 	console.log("_this.newBusiness_Selectall",_this.newBusiness_Selectall)
			// 	let zs_img = JSON.parse(_this.newBusiness_Selectall.business_appraisal[0].appraisal_image)
			// 	// console.log("aa",_this.$refs.lbtload._data.lists)
			// 	for(let i = 0;i < zs_img.length;i++){
			// 		_this.$refs.yyzzload._data.lists.push({'url' : zs_img[i]})
			// 	}
				
			// 	//轮播图赋值 
			// 	if(_this.newBusiness_Selectall.business_images != null || _this.newBusiness_Selectall.business_images == ''){
			// 		let lbt_img = JSON.parse(_this.newBusiness_Selectall.business_images)
			// 		for(let i = 0;i < lbt_img.length;i++){
			// 			_this.$refs.lbtload._data.lists.push({'url' : lbt_img[i]})
			// 		}
			// 		console.log("lbt_img",lbt_img)
			// 	}
			// 	console.log("tjlb",_this.tjlb)
			// 	console.log("_this.newBusiness_Selectall.business_img[0].business_image_injson",_this.newBusiness_Selectall.business_img[0].business_image_injson)
			// 	//商家风光图片赋值
			// 	if(typeof(_this.newBusiness_Selectall.business_img[0].business_image_injson) == 'undefined' || _this.newBusiness_Selectall.business_img[0].business_image_injson == ' '){
					
					
			// 	}else{
			// 		let fg_img = JSON.parse(_this.newBusiness_Selectall.business_img[0].business_image_injson)
			// 		console.log("fg_imgfff",fg_img)
					
			// 		for(let i = 0;i < fg_img.length;i++){
			// 			if(i >= _this.tjlb.length){
			// 				_this.tjlb.push({
			// 					id: i + 1,
			// 					tjtext: '',
			// 					image: ''
			// 				})
			// 			}
			// 			// console.log("aaa",fg_img[i])
			// 			console.log("_this.tjlb[i]",_this.tjlb[i])
			// 			_this.tjlb[i].image = fg_img[i]
			// 		}
			// 		// console.log("fg_img",fg_img)
			// 	}
			// 	//商家风光文字赋值
			// 	if(_this.newBusiness_Selectall.business_img[0].business_img_contentjson != ' '){
			// 		let fgwz_img = JSON.parse(_this.newBusiness_Selectall.business_img[0].business_img_contentjson)
			// 		// console.log("fgwz_imgdd",fgwz_img)
			// 		for(let i = 0;i < fgwz_img.length;i++){
			// 			// console.log("aaa",fgwz_img[i])
			// 			_this.tjlb[i].tjtext = fgwz_img[i]
						
			// 		}
			// 		// console.log("fgwz_img",fgwz_img)
			// 	 }
			// })

		},
		methods: {
			
			//添加商家风光图片
			img(index) {
				let _this = this;
				console.log(index)
				if (this.tjlb[index].image == '') {
					uni.chooseImage({
						count: 1,

						sizeType: ['original', 'compressed'],

						success: async function(res) {
							_this.dy = index
							console.log("res",res)
							const tempFilePaths = res.tempFilePaths;
							
							if (_this.model != "iPhone") {
								await _this.detail(tempFilePaths[0], index,res.tempFiles[0])
							}else{
								_this.tjlb[index].image = tempFilePaths[0];
							}
							// 因底层限制一次上传一个
							console.log("thisaf",this.tjlb)
						}
					});
				} else {
					wx.getImageInfo({
						src: _this.tjlb[index].image,
						success: (res) => {
							// resolve(res);
							this.bigimg = _this.tjlb[index].image
							// this.cklt=true
							// console.log(res)
							this.ckll = true
							this.bigimgHeight = res.height
							this.bigimgWidth = res.width
						},
						fail: (err) => {
							// reject(err);
						}
					});

				}

			},
			//关闭商家风光图片大图显示
			fg_qx() {
				this.ckll = false
				// console.log("tjlb", this.tjlb)
			},
			//删除对应商家风光图片
			off(index) {
				this.tjlb[index].image = ''
			},

			//查看例图按钮
			ck() {
				this.cklt = true
				console.log("aaaa", this.$refs.yyzzload)

			},
			//例图消失按钮
			qx() {
				this.cklt = false
			},
			//选择图片
			// handleChooseImg(index) {

			// },

			//删除图集按钮
			tjremove(index) {
				if (this.tjlb.length > 1) {
					// let files = [];
					let _this = this
					this.animation.scale(1.1, 1.1).step()
					this.animation.scale(1, 1).step()
					this.animationData1 = this.animation.export()
					this.tjlb.splice(index, 1);
					// delete _this.tjlb[index]

				}

			},

			//判断是否添加图集图集
			pd(index) {
				let _this = this
				
				for (let i = 0; i < this.tjlb.length; i++) {
					if (this.tjlb[i].image != '' && this.tjlb[i].tjtext != '') {
						// console.log("i",i)
						// console.log("this.tjlb.length",this.tjlb.length)
						if (i == this.tjlb.length - 1) {
							return _this.tjadd(index)
						}

					} else {
						uni.showToast({
							title: '商家图集以及文字一定要填写',
							icon: 'none'
						});
						return
					}
				}


			},
			
			//添加图集按钮
			async tjadd(index) {
				console.log("thisaf",this.tjlb)
				let _this = this
				// console.log("new", this.newBusiness_Selectall)
				// console.log("old", this.OldBusiness_Selectall)
				// console.log("name", this.business_name)
				// await _this.$api.upFile(_this.tjlb[0].image).then((res) => {
				// 	console.log("aaa", res)
				// 	let tp_list = JSON.parse(res[1].data)
				// 	business_images_injson.push(tp_list.data.link)
				// 	// console.log("business_images_injson",business_images_injson)
				// })
				console.log("ert",this.tjlb)
				this.animation.scale(1.1, 1.1).step()
				this.animation.scale(1, 1).step()
				this.animationData = this.animation.export()

				if (this.tjlb.length > 6) {
					uni.showToast({
						title: '商家图集添加已上限',
						icon: 'none'
					});
					return
				} else {
					this.tjlb.push({
						id: index + 1,
						tjtext: '',
						image: ''
					})
					uni.showToast({
						title: '已添加图集',
						icon: 'none'
					});

				}
			},
			//返回到上一页按钮
			btback() {
				uni.navigateBack({

				})
			},
			
			async handle(){
				let _this = this
				//获取商家轮播图
				let business_images = []
				
				let lbt_arr = this.$refs.lbtload._data.lists;
				console.log("fsdfas",lbt_arr)
				// 先new一个img和fileReader的实例
				// const img = new Image()
				// const reader = new FileReader()// 读取文件资源
				// reader.readAsDataURL(lbt_arr.url) 
				// reader.onload = function(e){ 
					// console.log("e",e)
				 // img.src = e.target.result
				// }
				console.log("lbt_arr",lbt_arr)
				// console.log("lbt_arr", lbt_arr)
				if (lbt_arr.length == 0) {
					uni.hideLoading()
					uni.showToast({
						title: '请添加轮播图',
						icon: 'none'
					});
					return
				} else {
					for (let i = 0; i < lbt_arr.length; i++) {
						if (!lbt_arr[i].file) {
							business_images.push(lbt_arr[i].url)
						} else {
							await _this.$api.upFile(lbt_arr[i].url).then((res) => {
								console.log("aaa", res)
								let tp_list = JSON.parse(res[1].data)
								// console.log("tp_list",tp_list)
								business_images.push(tp_list.data.link)
							})
						}
					}
					this.newBusiness_Selectall.business_images = business_images
					console.log("business_images", business_images)
				}
				
				//商家介绍
				
				console.log("neeeeeee",_this.newBusiness_Selectall)
				if (_this.newBusiness_Selectall.business_introduction != '' && _this.newBusiness_Selectall.business_introduction != null) {
					
				} else {
					// console.log("aaaaaa")
					uni.hideLoading()
					uni.showToast({
						title: '请将商家介绍填写完整',
						icon: 'none'
					})
					return
				}
				
				//风光图片
				let business_images_injson = []
				//风光文字
				let business_img_contentjson = []
				//获取商家风光的图片
				//获取商家风光文字
				for (let i = 0; i < _this.tjlb.length; i++) {
					console.log("i", i)
					console.log("_this.tjlb", _this.tjlb)
					console.log("_this.tjlb[i].tjtext", _this.tjlb.length)
					console.log("sssb", _this.tjlb[i])
					if (_this.tjlb[i].image != '' && _this.tjlb[i].tjtext != '' && _this.tjlb[i].image.slice(0,4) != 'http') {
						await _this.$api.upFile(_this.tjlb[i].image).then((res) => {
							console.log("aaa", res)
							let tp_list = JSON.parse(res[1].data)
							business_images_injson.push(tp_list.data.link)
							// console.log("business_images_injson",business_images_injson)
						})
						business_img_contentjson.push(_this.tjlb[i].tjtext)
				
				
					} else if(_this.tjlb[i].image == '' || _this.tjlb[i].tjtext == ''){
						if(_this.tjlb[0].image == '' && _this.tjlb[0].tjtext == ''){
							
						}else{
							uni.hideLoading()
							uni.showToast({
								title: '请将商家图集信息填写完整',
								icon: 'none'
							})
							return
						}
						
					}else{
						business_images_injson.push(_this.tjlb[i].image)
						business_img_contentjson.push(_this.tjlb[i].tjtext)
					}
				}
				// //将获取到的商家风光图片放到新数组里
				this.newBusiness_Selectall.business_images_injson = business_images_injson
				// //将获取到的商家风光文字放到新数组里
				this.newBusiness_Selectall.business_img_contentjson = business_img_contentjson
				
				console.log("this.newBusiness_Selectall.business_images_injson", this.newBusiness_Selectall.business_images_injson)
				console.log("this.newBusiness_Selectall.business_img_contentjson", this.newBusiness_Selectall.business_img_contentjson)
				
			
				//获取商家证书图片
				let appraisal_image = []
				let zs_arr = this.$refs.yyzzload.lists
				console.log("zs_arr", zs_arr)
				if (zs_arr.length == 0) {
					uni.hideLoading()
					uni.showToast({
						title: '请上营业执照/营销执照',
						icon: 'none'
					})
					return
				} else {
					for (let i = 0; i < zs_arr.length; i++) {
						if (!zs_arr[i].file) {
							console.log("aaaa")
							appraisal_image.push(zs_arr[i].url)
						} else {
							await _this.$api.upFile(zs_arr[i].url).then((res) => {
								console.log("nnn", res)
								let tp_list = JSON.parse(res[1].data)
								appraisal_image.push(tp_list.data.link)
							})
						}
					}
					console.log("appraisal_image",appraisal_image)
					this.newBusiness_Selectall.appraisal_image = appraisal_image
				}
				
				
				console.log("new", this.newBusiness_Selectall)
				console.log("old", this.oldBusiness_Selectall)
				this.modify()
				
			},
			
			//请求修改接口
			modify(){
				let _this = this
				if (_this.newBusiness_Selectall.business_name == _this.oldBusiness_Selectall.business_name && _this.newBusiness_Selectall.responsible_name == _this.oldBusiness_Selectall.responsible_name && _this.newBusiness_Selectall.responsible_phone == _this.oldBusiness_Selectall.responsible_phone && _this.newBusiness_Selectall.business_address == _this.oldBusiness_Selectall.business_address) {
					console.log("通过")
					console.log("_this.oldBusiness_Selectall",_this.oldBusiness_Selectall)
					
					let zs_img = JSON.parse(_this.oldBusiness_Selectall.business_appraisal[0].appraisal_image)
					if(zs_img == null){
						zs_img = []
					}
					if(!zs_img){
						for (let i = 0; i < zs_img.length; i++) {
							// console.log("i", i)
							// console.log("this.oldBusiness_Selectall.appraisal_image.length", zs_img.length)
							// console.log("_this.newBusiness_Selectall.appraisal_image[i]",_this.newBusiness_Selectall.appraisal_image[i])
							// console.log("zs_img[i]",zs_img[i])
							// console.log("_this.newBusiness_Selectall.appraisal_image",_this.newBusiness_Selectall.appraisal_image)
							// console.log("this.oldBusiness_Selectall.appraisal_image.length", zs_img)
							// console.log("_this.newBusiness_Selectall.appraisal_image[i]",_this.newBusiness_Selectall.appraisal_image[i])
							// console.log("zs_img[i]",zs_img[i])
							if (zs_img[i] == _this.newBusiness_Selectall.appraisal_image[i] && _this.newBusiness_Selectall.appraisal_image.length == zs_img.length) {
								console.log("_this.newBusiness_Selectall",_this.newBusiness_Selectall)
								// uni.hideLoading()
								// uni.showModal({
								// 	title: '提示',
								// 	content: '确定上传商家信息',
								// 	confirmColor: '#0ABB9A',
								// 	success: function(res) {
										
								// 		if (res.confirm) {
								// 			uni.showLoading({
								// 				title:"加载中...",
								// 				mask:true
								// 			})
											let bf_list ={
												"business_images":[],
												"business_introduction":'',
												"business_images_injson":[],
												"business_img_contentjson":[],
												}
											bf_list.business_images = _this.newBusiness_Selectall.business_images
											bf_list.business_introduction = _this.newBusiness_Selectall.business_introduction
											bf_list.business_images_injson = _this.newBusiness_Selectall.business_images_injson
											bf_list.business_img_contentjson = _this.newBusiness_Selectall.business_img_contentjson
											console.log(bf_list)
											_this.$api.business_update(bf_list).then((res) => {
												console.log("res", res)
												uni.hideLoading()
												uni.showModal({
													title: "提示",
													content: "信息录入成功",
													showCancel: false,
													confirmColor: '#0ABB9A',
													success: (res) => {
														
														if (res.confirm) {
															wx.reLaunch({
																url:'../my/my'
															})	
														}
													},
													fail(err) {
														console.log("err",err)
													}
												})
											}).catch((error)=>{
												uni.hideLoading()
												uni.showModal({
													title: "提交失败",
													content: error.data.message,
													showCancel: false,
													confirmColor: '#0ABB9A',
												})
						
											})
								// 		} else if (res.cancel) {
								// 			console.log('用户点击取消');
								// 		}
								// 	}
								// });
										
							}else{
								console.log("_this.newBusiness_Selectall",_this.newBusiness_Selectall)
								// uni.hideLoading()
								// uni.showModal({
								// 	title: '提示',
								// 	content: '确定上传qffffff商家信息',
								// 	confirmColor: '#0ABB9A',
								// 	success: function(res) {
								// 		if (res.confirm) {
								// 			uni.showLoading({
								// 				title:"加载中...",
								// 				mask:true
								// 			})
											// console.log('用户点击确定');
											_this.$api.business_updateall(_this.newBusiness_Selectall).then((res) => {
												console.log("res", res)
												uni.hideLoading()
												uni.showModal({
													title: "修改审核",
													content: "将在3个工作日内给予您答复\n请多关注公众号推送\n",
													showCancel: false,
													confirmColor: '#0ABB9A',
													success: (res) => {
														
														if (res.confirm) {
															wx.reLaunch({
																url:'../my/my'
															})	
														}
													}
												})
												// uni.navigateTo({
												// 	url: './business'
												// })
											})
								
								// 		} else if (res.cancel) {
								// 			console.log('用户点击取消');
								// 		}
								// 	}
								// });
							}
							
						}
					}else{
						_this.$api.business_updateall(_this.newBusiness_Selectall).then((res) => {
							console.log("res", res)
							uni.hideLoading()
							uni.showModal({
								title: "修改审核",
								content: "将在3个工作日内给予您答复\n请多关注公众号推送\n",
								showCancel: false,
								confirmColor: '#0ABB9A',
								success: (res) => {
									
									if (res.confirm) {
										wx.reLaunch({
											url:'../my/my'
										})	
									}
								}
							})
							// uni.navigateTo({
							// 	url: './business'
							// })
						})
					}
					
				} else {
					console.log("未通过")
					console.log("_this.newBusiness_Selectallaaa",_this.newBusiness_Selectall)
					// uni.hideLoading()
					// uni.showModal({
					// 	title: '提示',
					// 	content: '确定上传qff商家信息',
					// 	confirmColor: '#0ABB9A',
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			uni.showLoading({
					// 				title:"加载中...",
					// 				mask:true
					// 			})
								// console.log('用户点击确定');
								_this.$api.business_updateall(_this.newBusiness_Selectall).then((res) => {
									console.log("res", res)
									uni.hideLoading()
									uni.showModal({
										title: "修改审核",
										content: "将在3个工作日内给予您答复\n请多关注公众号推送\n",
										showCancel: false,
										confirmColor: '#0ABB9A',
										success: (res) => {
											
											if (res.confirm) {
												wx.reLaunch({
													url:'../my/my'
												})	
											}
										}
									})
									// uni.navigateTo({
									// 	url: './business'
									// })
								})
					
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
					
					
					
				}
			},
			
			
			
			//确认修改按钮
			async btconfirm() {
				let _this = this
				if(_this.newBusiness_Selectall.business_name != _this.oldBusiness_Selectall.business_name || _this.newBusiness_Selectall.responsible_name != _this.oldBusiness_Selectall.responsible_name || _this.newBusiness_Selectall.responsible_phone != _this.oldBusiness_Selectall.responsible_phone || _this.newBusiness_Selectall.business_address != _this.oldBusiness_Selectall.business_address){
					_this.waitsh=true
				}else{
					_this.waitsh=false
				}
				uni.showModal({
					title: '提示',
					content: _this.waitsh == false ? '确定上传商家信息':'是否确定上传商家信息\n确定后需要等待信息审核\n',
					confirmColor: '#0ABB9A',
					// success: function(res) {
					// 	console.log("resee",res)
					// if (res.confirm) {
					// 	// uni.showLoading({
					// 	// 	title:"加载中...",
					// 	// 	mask:true
					// 	// })
					// 	}},
					}).then((res)=>{
						if(res[1].confirm == true){
							uni.showLoading({
								title:"加载中...",
								mask:true
							})
							// console.log("res",res)
							_this.handle()
							
						}else{
							// console.log("bbbb")
						}
						
					})
					// console.log("aaa")
						
						
				// }else if (res.cancel) {
				// 	// return
				// 	console.log('用户点击取消');
				// }},fail:function(err){
				// 	console.log("err",err)
				// }
				// })
				
				
				
				
			},
			async detail(url, index,type) {
				// console.log("type",type)
				console.log("aa", index)
				let maxWidth = 500;
				let Orientation = 1;
				//获取图片META信息  
				await this.getImageTag(url, 'Orientation', function(e) {
					if (e != undefined) Orientation = e;
				})
				var img = null;
				var canvas = null;
				await this.comprossImage(url, maxWidth, function(e) {
					img = e.img;
					canvas = e.canvas;
				})

				console.log(Orientation, "Orientation")
				console.log("ttt",type)
				let baseStr = '';
				//如果方向角不为1，都需要进行旋转  
				switch (Orientation) {
					case 6: //需要顺时针（向右）90度旋转  
						baseStr = this.rotateImg(img, 'right', canvas,type);
						break;
					case 8: //需要逆时针（向左）90度旋转   
						baseStr = this.rotateImg(img, 'left', canvas,type);
						break;

					case 3: //需要180度旋转 转两次  
						baseStr = this.rotateImg(img, 'right', canvas, 2,type);
						break;
					default:
						baseStr = this.rotateImg(img, '', canvas,type);
						break;
				}
				console.log(baseStr, "baseStr")
				// this.uploadImg(baseStr)//图片上传到服务器的方法
			},
			//-------------------------------直接粘贴的三个方法
			async comprossImage(imgSrc, maxWidth, func) {
				if (!imgSrc) return 0;
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success(res) {
							let img = new Image();
							img.src = res.path;
							console.log(img)

							let canvas = document.createElement('canvas');

							let obj = new Object();
							obj.img = img;
							obj.canvas = canvas;
							resolve(func(obj));
						}
					});
				})
			},
			/**  
			 * @desc 获取图片信息，使用exif.js库，具体用法请在github中搜索  
			 * @param {Object} file 上传的图片文件  
			 * @param {String} tag 需要获取的信息 例如：'Orientation'旋转信息  
			 * @return {Promise<Any>} 读取是个异步操作，返回指定的图片信息  
			 */
			getImageTag(file, tag, suc) {
				if (!file) return 0;
				return new Promise((resolve, reject) => {
					/* eslint-disable func-names */
					// 箭头函数会修改this，所以这里不能用箭头函数  
					let imgObj = new Image()
					imgObj.src = file
					console.log("imgObj", imgObj)
					uni.getImageInfo({
						src: file,
						success(res) {
							EXIF.getData(imgObj, function() {
								EXIF.getAllTags(this);
								let or = EXIF.getTag(this, 'Orientation'); //这个Orientation 就是我们判断需不需要旋转的值了，有1、3、6、8  
								resolve(suc(or))
							});
						}
					})
				});
			},
			rotateImg(img, direction, canvas, type,times = 1) {
				// console.log("canvas",canvas)
				// console.log("img",img)
				// console.log("direction",direction)
				console.log('开始旋转')
				// console.log("type",type)
				//最小与最大旋转方向，图片旋转4次后回到原方向    
				var min_step = 0;
				var max_step = 3;
				if (img == null) return;

				//img的高度和宽度不能在img元素隐藏后获取，否则会出错    
				var height = img.height;
				var width = img.width;
				let maxWidth = 800;
				let canvasWidth = width; //图片原始长宽  
				let canvasHeight = height;
				let base = canvasWidth / canvasHeight;
				console.log(maxWidth);
				if (canvasWidth > maxWidth) {
					canvasWidth = maxWidth;
					canvasHeight = Math.floor(canvasWidth / base);
				}
				width = canvasWidth;
				height = canvasHeight;
				var step = 0;

				if (step == null) {
					step = min_step;
				}

				if (direction == 'right') {
					step += times;
					//旋转到原位置，即超过最大值    
					step > max_step && (step = min_step);
				} else if (direction == 'left') {
					step -= times;
					step < min_step && (step = max_step);
				} else { //不旋转  
					step = 0;
				}

				//旋转角度以弧度值为参数    
				var degree = step * 90 * Math.PI / 180;
				var ctx = canvas.getContext('2d');
				// console.log("degree", degree)
				// console.log("step", step)
				switch (step) {
					case 1:
						console.log('右旋转 90度')
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, 0, -height, width, height);
						break;
					case 2:
						//console.log('旋转 180度')  
						canvas.width = width;
						canvas.height = height;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, -height, width, height);
						break;
					case 3:
						console.log('左旋转 90度')
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, 0, width, height);
						break;
					default: //不旋转  
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0, width, height);
						break;
				}

				let baseStr = canvas.toDataURL("image/jpeg", 1);
				
				// console.log("baseStr",baseStr)
				// this.tjlb[this.dy].image = baseStr
				// let files = new window.File([baseStr], type.name, {type: type.type})
				// this.tjlb[this.dy].file = files
				// console.log("files",files)
				this.tjlb[this.dy].image = baseStr
				
				// console.log("tttt",this.tjlb)
				// console.log("files",files)
				// console.log( this.currentImage)
				// this.$emit('chooseimg', {
				// 	src: this.baseStr
				// });
				// console.log("baseStr",baseStr)
				// return baseStr;  
			}
		},

	}
</script>

<style>
	.addimgno {
		display: none;
	}

	page {
		background-color: transparent;
	}

	.bg {
		position: absolute;
		z-index: -1;

		left: 0;
		width: 100%;
		height: 1300upx;

	}

	.whitebox:first-child {
		padding-bottom: 60upx;
	}

	.mk {
		/* background-color: blue; */
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0upx;
		margin-top: 20upx;
	}

	.annv {
		display: flex;
	}

	.lbt {
		margin-top: 30upx;
		box-shadow: 0 0 5upx #C0C4CC;
		border-radius: 30upx;
		padding: 5upx;
		margin-bottom: 20upx;
	}

	.scrq {
		font-size: 28upx;
	}

	.htitle {
		display: flex;
		margin-left: 20upx;
	}

	.htitle text {
		font-weight: bold;
		font-size: 30upx;
		margin-top: 5upx;
	}

	.illustration {
		width: 130upx;
		height: 50upx;
		background-color: #0ABB9A;
		margin-left: 20upx;
		color: white;
		font-size: 20upx;
		line-height: 50upx;
		text-align: center;
		border-radius: 15upx;
	}

	.scbg {

		margin-top: 20upx;
	}

	.noseeill {
		display: none;
	}

	.seeill {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.ltimg {
		height: 830upx;
		width: 640upx;
	}

	.seeill .qx {
		height: 80upx;
		width: 80upx;
		position: absolute;
		top: 82%;
	}

	.qxbt {
		height: 80upx;
		width: 80upx;
		margin-top: 10upx;
	}

	.jstextbox {
		width: 100%;
		background-color: #f4f5f7;
		margin-top: 30upx;
		border-radius: 20upx;
		overflow: hidden;
		padding: 30upx;
	}

	.jstextbox textarea {
		height: 300upx;
		width: 100%;
		font-size: 30upx;
	}

	.tjtextbox {
		font-size: 30upx;
		/* position: relative; */
		/* background-color: red; */
		/* width: 100%; */
		/* height: 40upx; */
		display: flex;
		align-items: center;
		margin-left: 20upx;
		/* justify-content: left; */
		/* margin-top: 30upx; */
		/* margin-left: 10upx; */
	}

	.tjtextboxno {
		display: flex;
	}

	.removeimg {
		width: 30upx;
		height: 30upx;
		margin-right: 10upx;
	}

	.addimg {
		width: 30upx;
		height: 30upx;
		/* position: absolute; */
		/* right: 21%; */
		margin-right: 10upx;
	}

	.addimgdh {
		width: 35upx;
		height: 35upx;
		/* position: absolute; */
		/* right: 21%;		 */
		margin-right: 10upx;
		animation: add 3s;
	}

	@keyframes add {
		0% {
			transform: scale(1);
			/*开始为原始大小*/
		}

		25% {
			transform: scale(1.1);
			/*放大1.1倍*/
		}

		50% {
			transform: scale(1);

		}
	}

	.tjt1 {
		/* position: absolute; */

	}

	.tjt2 {
		/* position: absolute; */
		/* right: 1%; */
	}

	.tjtextarea {
		width: 100%;
		background-color: #f4f5f7;
		margin-top: 20upx;
		border-radius: 10upx;
		overflow: hidden;
		padding: 30upx;
		margin-left: 6upx;
	}

	.tjtextarea textarea {
		height: 200upx;
		width: 100%;
		font-size: 30upx;

	}
</style>

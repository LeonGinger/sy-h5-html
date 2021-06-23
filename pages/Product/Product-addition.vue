<template>

	<view class="wrapper">
		<image src="../../static/sp-bg.jpg" class="bg"></image>
		<view class="ytitle">
			<text class="ytext">商品添加</text>
		</view>
		<!-- 轮播图 -->
		<view class="whitebox">
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<text class="utitle">上传轮播图</text>
				<text class="uxtitle">（最多上传6张图片）</text>
			</view>
			<view class="lbt">
				<u-upload ref="lbtload" :action="action" :auto-upload="false" max-count="6" :model="model"  ></u-upload>
		
			</view>
		</view>
		<!-- 轮播图 -->
		<connect class="connect"></connect>
		<!-- 商品信息 -->
		<view class="whitebox">
			<view class="utitlebox" style="margin-top: 20upx;">
				<view class="utitleblock"></view>
				<text class="utitle">填写商品信息</text>
			</view>
			<u-form :model="form" ref="forminfo"  style="margin-left: 20upx;margin-top: 15upx;" :error-type="errorType">
				<u-form-item label="商品名称:" prop="cname" required>
					<u-input placeholder="请输入商品名称" v-model="form.cname" maxlength='14'  />
				</u-form-item>
				<u-form-item label="生源产地:" prop="cyd" required>
					<u-input placeholder="请输入生源产地" v-model="form.cyd" maxlength='14' />
				</u-form-item>
				<u-form-item label="商品规格:" prop="newcgg" required>
					<u-input placeholder="请输入商品规格" v-model="form.newcgg"  maxlength='5'/>
					<!-- <u-input placeholder="请输入商品规格" v-model="form.cgg"  maxlength='5'/> -->
					<!-- <span style="position: absolute; margin-left: 85upx;margin-top: -1.5upx;" v-if="cgg">{{gg}}</span> -->
					<!-- <view class="gg" @click="ggshow = true">规格</view>					 -->
					<!-- <u-select v-model="ggshow" :list="list"  @confirm="confirmgg"></u-select> -->
				</u-form-item>
				<u-form-item label="生产日期:" prop="input" required>
					<view @click="show = true" :style="input=='' ? 'color:#C0C4CC':'color:black'" class="scrq" style="width: 420upx;">{{ input ? input : '请选择生产日期' }}</view>
					<!-- <u-icon name="close-circle-fill" color="#c1c1cb" size="30"  @click="qxinputjc" v-if="inputjc!='请选择生产日期'"></u-icon> -->
					<u-icon style="margin-top: 10rpx;margin-left: -8rpx;" size="20" name="arrow-down-fill"></u-icon>
					
				</u-form-item>
				<u-picker mode="time" v-model="show" :params="params" @confirm="confirm"></u-picker>
				<u-form-item label="保质期限:" prop="newcbz" required>
					<u-input placeholder="请输入商品保质期" v-model="form.newcbz" maxlength='3'/>
<!-- 					<u-input placeholder="请输入商品保质期" v-model="cbz" maxlength='3'  type="number"/>
					<span style="position: absolute; margin-left: 85upx;margin-top: -1.5upx;" v-if="cbz">{{bz}}</span>
					<view class="gg" @click="bzshow = true">期限</view>	
					<u-select v-model="bzshow" :list="lists"  @confirm="confirmbz"></u-select> -->
				</u-form-item>
				<u-form-item label="商品售价:" prop="cprice" required>
					<u-input placeholder="请输入商品的价格(元)" v-model="form.cprice"  type="number" maxlength='5'/>
					
				</u-form-item>
			</u-form>
		</view>
		<!-- 商品信息 -->
		<!-- 检测信息 -->
		<view class="whitebox">
			<view class="utitlebox" >
				<view class="utitleblock"></view>
				<text class="utitle">上传商品检测信息</text>
				<text class="uxtitle" style="margin-left: 10upx;">(若无可以暂不上传)</text>
			</view>
			<view class="whitebox" style="width: 638upx;margin-left:-15upx ;padding: 20upx;">

				<view class="htitle">
					<text>上传检疫检测报告:</text>
					<view class="illustration" @click="ck">查看例图</view>
				</view>
				<u-mask :show="cklt" @click="qx">
					<view :class="cklt==false ? 'noseeill':'seeill'">
						<image src="../../static/lt.jpg" class="ltimg"></image>
					</view>
				</u-mask>
				<view class="scbg">
					<u-upload ref="jyjcload" :action="action" :auto-upload="false" max-count="1" :model="model" ></u-upload>
					<u-form>
						<u-form-item label="正宗名称:">
							<u-input placeholder="需与商品名称和检测报告是同一商品" v-model="ypname"  maxlength='10' />
						</u-form-item>
						<u-form-item label="检测日期:">
							<view @click="showjc = true" :style="inputjc=='' ? 'color:#C0C4CC':'color:black'" class="scrq" style="width: 420upx;">{{ inputjc ? inputjc : '请选择检疫检测日期' }}</view>
							<u-icon name="close-circle-fill" color="#c1c1cb" size="30"  @click="qxinputjc" v-if="inputjc"></u-icon>
							<u-icon style="margin-top: 10rpx;margin-left: -8rpx;" size="20" name="arrow-down-fill" v-if="!inputjc"></u-icon>
						</u-form-item>
						<u-picker mode="time" v-model="showjc" :params="paramsjc" @confirm="confirmjc"></u-picker>
						<u-form-item label="检验地点:">
							<u-input placeholder="检查机构的地点" v-model="jcdd"   maxlength='14'/>
						</u-form-item>
					</u-form>
				</view>
			</view>
		</view>
		<!-- 检测信息 -->
		<!-- 产品认证 -->
		<view class="whitebox">
			<view class="utitlebox" >
				<view class="utitleblock"></view>
				<text class="utitle">上传商品证书</text>
				<text class="uxtitle" style="margin-left: 10upx;">(若无可以暂不上传)</text>
			</view>
			<view class="whitebox" style="width: 638upx;margin-left:-15upx ;padding: 20upx;">

				<view class="htitle">
					<text>上传商品证书:</text>
					<view class="illustration" @click="ck2">查看例图</view>
				</view>
				<u-mask :show="cklt2" @click="qx2">
					<view :class="cklt2==false ? 'noseeill':'seeill'">
						<image src="../../static/zs.jpg" class="ltimg"></image>
						
					</view>
				</u-mask>
				<view class="scbg">
					<u-upload ref="spzsload" :action="action" :auto-upload="false" max-count="9" :model="model" ></u-upload>
				</view>
			</view>
		</view>
		<!-- 产品认证 -->
		<u-mask :show="queding"></u-mask>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<view class="btbox">
			<view class="bt1" @click="btback">返回</view>
			<view class="bt2" @click="btconfirm">确定</view>
		</view>
		<view class="aa" style="padding-bottom: 50rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// message：默认为输入框下方用文字进行提示
				// none：只要包含此值，将不会进行任何提示
				// border-bottom：配置作用域底部的下划线显示为红色
				// border：配置输入框的边框为红色进行提示 -- 如果有配置显示Input组件显示边框的话
				// toast：以"toast"提示的方式弹出错误信息，每次只弹出最前面的那个表单域的错误信息(1.3.5新增)
				errorType:['toast','border-bottom'],
				forminfo_rules:{
					cname:[
							{required: true,message: '请输入商品名称',trigger: 'blur,change'},
							// 可以单个或者同时写两个触发验证方式trigger: 'blur,change'
							// {
							// 	// 自定义验证函数，见上说明
							// 	validator: (rule, value, callback) => {
							// 		// 上面有说，返回true表示校验通过，返回false表示不通过
							// 		// this.$u.test.mobile()就是返回true或者false的
							// 		return this.$u.test.mobile(value);
							// 	},
							// 	message: '请输入姓名',
							// 	// 触发器可以同时用blur和change
							// 	trigger: ['change','blur'],
							// }
					],
					cyd:[
							{required: true,message: '请输入生源产地',trigger: 'blur,change'},
					],
					newcgg:[
							{required: true,message: '请输入商品规格',trigger: 'blur,change'},
					],
					newcbz:[
							{required: true,message: '请输入商品保质期',trigger: 'blur,change'},
					],
					cprice:[
							{required: true,message: '请输入商品的价格(元)',trigger: 'blur,change'},
					],
					input:[
						// {required: true,message: '请选择生产日期',trigger: 'blur,change'},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								if(this.input){
									return true
								}else{
									return false
								}
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								// return this.$u.test.mobile(value);
							},
							message: '请选择生产日期',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
				},
				model:'',
				action: '',//后端接口地址
				scrollTop: 0,
				// 新表单
				form:{
					cname: '',
					cyd: '',
					cgg: '',
					input: '',
					inputjc: '',
					cbz: '',
					cprice: '',
					ypname: '',
					jcdd: '',
					newcgg:'',
				},
				// 表单
				cname: '',
				cyd: '',
				cgg: '',
				input: '',
				inputjc: '',
				cbz: '',
				cprice: '',
				ypname: '',
				jcdd: '',
				// 表单
				newcgg:'',
				show: false,
				showjc: false,
				mode: 'time',
				cklt: false,
				cklt2: false,
				queding:false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					econd: false
				},
				paramsjc: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					econd: false
				},
				year: 0,
				month: 0,
				day: 0,
				aa:'',
				lbtimg:[], //轮播图图片
				jyjcimg:[], //检疫检测图片
				spzsimg:[],//商品证书图片
				gg:'',
				bz:'',
				ggshow:false,
				bzshow:false,
				list: [
					{
						value: '1',
						label: '个'
					},
					{
						value: '2',
						label: '箱'
					},
					{
						value: '3',
						label: 'L/升'
					},
					{
						value: '4',
						label: 'ML/毫升'
					},
					{
						value: '5',
						label: 'G/克'
					},
					{
						value: '6',
						label: 'KG/千克'
					},
					{
						value: '7',
						label: '公斤'
					},
					{
						value: '8',
						label: '斤'
					}
				],
				lists: [
					{
						value: '1',
						label: '年'
					},
					{
						value: '2',
						label: '月'
					},
					{
						value: '3',
						label: '日'
					},
					{
						value: '4',
						label: '季度'
					}
				],
			}
			
		},
		onReady() {
			// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
			this.$refs.forminfo.setRules(this.forminfo_rules);
		
		},
		onLoad() {

		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		methods: {
			qxinputjc(){
				this.inputjc='';
			},
			submit() {
				this.$refs.uUpload.upload();
			},
			aa() {
				console.log("aa")
				this.show = true
			},
			ck() {
				this.cklt = true
			},
			qx() {
				this.cklt = false
			},
			ck2() {
				this.cklt2 = true
			},
			qx2() {
				this.cklt2 = false
			},
			confirm(e) {
				this.input = '';
				if (this.mode == 'time') {
					if (this.params.year) this.input += e.year;
					if (this.params.month) this.input += '-' + e.month;
					if (this.params.day) this.input += '-' + e.day;
					if (this.params.hour) this.input += ' ' + e.hour;
					if (this.params.minute) this.input += ':' + e.minute;
					if (this.params.second) this.input += ':' + e.second;
				} else if (this.mode == 'region') {
					this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				} else if (this.mode == 'selector') {
					this.input = this.range[e[0]];
				} else if (this.mode == 'multiSelector') {
					this.input = this.range[0][e[0]] + '-' + this.range[1][e[1]] + '-' + this.range[2][e[2]];
				}
			},
			confirmjc(e) {
				this.inputjc = '';
				if (this.mode == 'time') {
					if (this.paramsjc.year) this.inputjc += e.year;
					if (this.paramsjc.month) this.inputjc += '-' + e.month;
					if (this.paramsjc.day) this.inputjc += '-' + e.day;
					if (this.paramsjc.hour) this.inputjc += ' ' + e.hour;
					if (this.paramsjc.minute) this.inputjc += ':' + e.minute;
					if (this.paramsjc.second) this.inputjc += ':' + e.second;
				} else if (this.mode == 'region') {
					this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				} else if (this.mode == 'selector') {
					this.input = this.range[e[0]];
				} else if (this.mode == 'multiSelector') {
					this.input = this.range[0][e[0]] + '-' + this.range[1][e[1]] + '-' + this.range[2][e[2]];
				}
			},
			confirmgg(e){
				let _this=this;
				console.log(e[0].value)
				
				if(_this.cgg){
					_this.gg=e[0].label
				}else{
					uni.showToast({
						icon:'none',
						title: '请先输入数量',
					});
				}
			},
			//期限年份
			confirmbz(e){
				let _this=this;
				let lbtList=[]
					lbtList = _this.$refs.lbtload.lists.filter(val => {  //把轮播图放入lbtList数组里
					return val;
				})
				console.log("lbtList",lbtList)
				if(_this.cbz){
					_this.bz=e[0].label
				}else{
					uni.showToast({
						icon:'none',
						title: '请先输入时间',
					});
				}
			},
			async btconfirm() {
			
				let re = /[^\u4e00-\u9fa5]/;
				let time = new Date();
				this.year = time.getFullYear();
				this.month = Number(time.getMonth()) + 1;
				this.day = time.getDate();
				this.$refs.forminfo.validate(valid => {
					if (valid) {
					//START TRUE VALID
					
					
					
					// if(this.cname == '' || this.cyd == '' || this.cgg == '' || this.input == ''  || this.cbz == '' ||  this.cprice == ''){
					// 	uni.showToast({
					// 		title:'请将信息输入完整',
					// 		icon:'none'
					// 	})
					// }
					// else if(this.$refs.lbtload.lists.length == 0 ){
					if(this.$refs.lbtload.lists.length == 0 ){
						uni.showToast({
							title:'请添加轮播图',
							icon:'none'
						})					
					}
					else if(this.input.slice(0,4) == this.year && this.input.slice(5,7)>this.month){
							uni.showToast({
								title:'生产日期有误',
								icon:'none'
							})				
					}
					else if(this.input.slice(0,4) == this.year && this.input.slice(5,7)>this.month && this.input.slice(8,10)>this.day){
						uni.showToast({
							title:'生产日期有误',
							icon:'none'
						})					
					}
					else if(this.inputjc && this.inputjc.slice(0,4) == this.year && this.inputjc.slice(5,7)>this.month){
							uni.showToast({
								title:'检测日期有误',
								icon:'none'
							})				
					}
					else if(this.inputjc && this.inputjc.slice(0,4) == this.year && this.inputjc.slice(5,7)>this.month && this.inputjc.slice(8,10)>this.day){
						uni.showToast({
							title:'检测日期有误',
							icon:'none'
						})					
					}
					else if(this.$refs.jyjcload.lists.length == 0 && this.ypname ||  this.$refs.jyjcload.lists.length == 0 && this.jcdd || this.$refs.jyjcload.lists.length == 0 &&  this.inputjc){
						console.log("this.$refs.jyjcload.lists.length",this.$refs.jyjcload.lists.length)
						console.log("noimg");
						uni.showToast({
							title:'请完善检测检疫信息',
							icon:'none'
						})					
					}
					else if(!this.ypname && this.$refs.jyjcload.lists.length != 0  ||  !this.ypname && this.jcdd || !this.ypname && this.inputjc){
						console.log("noname");
						uni.showToast({
							title:'请完善检测检疫信息',
							icon:'none'
						})					
					}
					else if(!this.jcdd && this.$refs.jyjcload.lists.length != 0  ||  !this.jcdd && this.ypname || !this.jcdd && this.inputjc){
						console.log("nodd");
						uni.showToast({
							title:'请完善检测检疫信息',
							icon:'none'
						})					
					}
					else if(!this.inputjc && this.$refs.jyjcload.lists.length != 0  ||  !this.inputjc && this.ypname || !this.inputjc && this.jcdd){
						console.log("notime");
						uni.showToast({
							title:'请完善检测检疫信息',
							icon:'none'
						})					
					}
					
					// else if(this.bz.length == 0 ){
					// 	uni.showToast({
					// 		title:'请选择保质期限的期限',
					// 		icon:'none'
					// 	})					
					// }
					// else if(this.gg.length == 0 ){
					// 	uni.showToast({
					// 		title:'请选择商品日期的规格',
					// 		icon:'none'
					// 	})					
					// }
					else if (this.ypname && re.test(this.ypname)){
						uni.showToast({
							title:'正宗名称输入有误',
							icon:'none'
						})
						
					}
					//end twice check
					else{		
						
						let _this = this
						//轮播图
						let lbtList=[]
							lbtList = _this.$refs.lbtload.lists.filter(val => {  //把轮播图放入lbtList数组里
							return val;
						})
						//检疫证书
						let jyjcList=[]
							jyjcList = _this.$refs.jyjcload.lists.filter(val => {  //把检疫检测图放入jyjcList数组里
							return val;
						})
						//商品证书
						let spzsList=[]
							spzsList = _this.$refs.spzsload.lists.filter(val => {  //把商品证书图放入jyjcList数组里
							return val;
						})
						
						
						uni.showModal({
							title: '提示',
							content: '确定上架商品无误',
							confirmColor: '#0ABB9A',
							success:async function(res) {
								if (res.confirm) {	
									// let _this = this
									_this.queding=true;
									
									uni.showLoading({
										title:"正在上传..."
									});
									
									let newlbtList = []; //定义一个新的轮播图数组newlbtList
									for(let i = 0;i <lbtList.length;i++){
										newlbtList.push(lbtList[i].url) //循环出轮播图里面的blob图片地址，并插入newlbtList数组里
									}
									for(let k= 0;k <newlbtList.length;k++){ //循环newlbtList数组并请求接口upFile上传图片接口转换图片地址
										 await _this.$api.upFile(newlbtList[k]).then((res)=>{									
											let lbt_list = JSON.parse(res[1].data) //成功返回的图片地址转化成json放入lbt_list里
											_this.lbtimg.push(lbt_list.data.link) //转换好json的图片地址放入lbtimg数组里
										})
									}
									
									let newjyjcList = []; //定义一个新的轮播图数组newlbtList
									for(let i = 0;i <jyjcList.length;i++){
										newjyjcList.push(jyjcList[i].url) //循环出轮播图里面的blob图片地址，并插入newjyjcList数组里
									}
									for(let k= 0;k <newjyjcList.length;k++){ //循环newjyjcList数组并请求接口upFile上传图片接口转换图片地址
										 await _this.$api.upFile(newjyjcList[k]).then((res)=>{									
											let jyjc_list = JSON.parse(res[1].data) //成功返回的图片地址转化成json放入lbt_list里
											_this.jyjcimg.push(jyjc_list.data.link) //转换好json的图片地址放入jyjcimg数组里
										})
									}
									
									
									let newspzsList = []; //定义一个新的轮播图数组newspzsList
									for(let i = 0;i <spzsList.length;i++){
										newspzsList.push(spzsList[i].url) //循环出轮播图里面的blob图片地址，并插入newspzsList数组里
									}
									for(let k= 0;k <newspzsList.length;k++){ //循环newlbtList数组并请求接口upFile上传图片接口转换图片地址
										await  _this.$api.upFile(newspzsList[k]).then((res)=>{									
											let spzs_list = JSON.parse(res[1].data) //成功返回的图片地址转化成json放入spzs_list里
											_this.spzsimg.push(spzs_list.data.link) //转换好json的图片地址放入spzsimg数组里
											console.log("_this.spzsimg",_this.spzsimg);
										})
									}
									
									//请求添加商品接口
									// _this.newcgg=_this.cgg+_this.gg; //数量加规格
									// _this.newcbz=_this.cbz+_this.bz; 
									_this.$api.create_menu({
										menu_name:_this.form.cname,
										menu_address:_this.form.cyd,
										menu_weight:_this.form.newcgg,
										production_time:_this.input,
										quality_time:_this.form.newcbz,
										menu_money:_this.form.cprice,
										menu_images_json:_this.lbtimg,
										monitor_image:_this.jyjcimg,
										sample_name:_this.ypname,
										monitoring_time:_this.inputjc,
										test_location:_this.jcdd,
										certificate_image:_this.spzsimg,
									}).then((res) =>{
										uni.hideLoading();
										uni.showToast({
											title: '添加成功',
										});	
										uni.navigateTo({
											url: 'Product-list',
											success: res => {},
											fail: () => {},
											complete: () => {}
										});
									}).catch((error)=>{
										uni.hideLoading();
										uni.showModal({
											title: "提交失败",
											content: error.data.message,
											showCancel: false,
											confirmColor: '#0ABB9A',
											success:function(res){
												uni.navigateTo({
													url: 'Product-list',
													success: res => {},
													fail: () => {},
													complete: () => {}
												});
												
											}
										})
										//重置本页面
										
									})
									
								} else if (res.cancel) {
									console.log('用户点击取消');
									_this.lbtimg=[];
									_this.jyjcimg=[];
									_this.spzsimg=[];
								}
							}
						});
					}


					//END TRUE VALID 
					} else {
						//START FALID VALID
						// console.log(valid)
						// console.log('验证失败');
						return;
					}
				});

				
			},
			// image(){
			
			// },
			btback() {
				uni.navigateTo({
					url: 'Product-list'
				})
				// uni.navigateBack({
					
				// })
			}

		}
	}
</script>

<style>
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

	.lbt {
		margin-top: 20upx;
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
	.gg{
		background-color: #0ABB9A;
		border-radius: 20upx;
		width: 100upx;
		text-align: center;
		color: white;
		margin-right: 100upx;
		height: 70upx;
		}
</style>

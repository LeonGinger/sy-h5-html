<template>
	<view class="wrapper">
		<image src="@/static/my-bg.jpg" class="bg"></image>
		<view class="content" :style="{height:bgHeight}">
			<view class="whitebox">
				<view class="utitlebox">
					<view class="utitleblock"></view>
					<view class="utitle">入驻申请</view>
				</view>
				<u-form style="margin-left: 20upx;margin-top: 20upx;">
					<u-form-item label="商户名称:">
						<u-input placeholder="请输入商户或公司名称" v-model="shuju.business_name" />
					</u-form-item>
					<u-form-item label="商户地址:">
						<u-input placeholder="请输入商户或公司的详细地址" v-model="shuju.business_address" />
					</u-form-item>
					<u-form-item label="法人姓名:">
						<u-input placeholder="请输入商户法定代表人的姓名" v-model="shuju.responsible_name" />
					</u-form-item>
					<u-form-item label="联系方式:">
						<u-input placeholder="请输入商户联系人的手机号码" v-model="shuju.responsible_phone" type="number" maxlength="11"/>
					</u-form-item>
					<u-form-item label="验证码:" v-if="shuju.responsible_phone">
						<u-input placeholder="请输入验证码" v-model="shuju.responsible_phonecode" type="number" minlength="4" maxlength="7"/>
						<view class="send_code" 
							  @click="send_Code" type="default" :disabled="!show" 
							  :style="!timer ? '':'background:#cccccc'" >
							{{!timer ? '发送验证码':count+'s'}}
						</view>
					</u-form-item>
					
					
				</u-form>
				<view class="utitlebox" style="margin-top: 30upx; margin-bottom: 20upx;">
					<view class="utitleblock"></view>
					<view class="utitle">上传企业证书</view>
						<view class="illustration" @click="ck">查看例图</view>
				</view>
				<u-mask :show="cklt" @click="qx">
					<view :class="cklt==false ? 'noseeill':'seeill'">
						<image src="@/static/yyzz.jpg" class="ltimg"></image>
					</view>
				</u-mask>
				<text class="scts">
					(请上传食品经营许可证、营业执照等)
				</text>
				<view class="scbox">
					<u-upload ref="uUpload" :action="action" :auto-upload="false" max-count="6" :model="model"></u-upload>
				</view>
			</view>
			<view class="btbox" style="margin-top: 100upx;">
				<view class="bt1" @click="btback">返回</view>
				<view class="bt2" @click="btconfirm">申请</view>
			</view>
		</view>

	</view>

</template>

<script>
	// import { pathToBase64, base64ToPath } from '@/common/base64.js'
	export default {
		data() {
			return {
				timer:'',
				model:'',
				userinfo:[],
				yzm:false,
				show:true,
				TIME_COUNT:60,//验证码倒计时60s
				count:'',
				cklt:false,
				bgHeight: '',
				//表单
				fileList:[],
				//表单
				action:'',//后台接口地址
				shuju:{
					business_name: '',
					business_address: '',
					responsible_name: '',
					responsible_phone: '',
					appraisal_img:{}
				},
				verify_if:'',
				
					
				
			}
		},
		methods: {
			noInput(e){
				this.fu = true
				if(this.shuju.responsible_phone == this.userinfo.phone || shuju.responsible_phone == ''){
					this.yzm = false
					
				}
			},
			send_Code(){
				let _this = this
				if(this.shuju.responsible_phone.length < 11 || this.shuju.responsible_phone == this.userinfo.phone){
					uni.showToast({
						icon:'none',
						title:'手机号输入有误'
					})
				}else{
					if (!this.timer) {
						this.count = this.TIME_COUNT;
						this.show = false;
						_this.$api.iphonebs_code({mobile : this.shuju.responsible_phone}).then((res)=>{
							console.log("res",res)
								uni.showModal({
									title:"提示",
									content:"手机二维码已发送\n请你打开短信查看\n",
									showCancel:false,
									confirmColor: '#0ABB9A'
								})
												
						}).catch((err) => {
							console.log("err", err.data.message)
							uni.showModal({
								title: '提示',
								content: err.data.message,
								confirmColor: '#0ABB9A',
								showCancel: false,
								success: function(res) {
									_this.shuju.responsible_phone == _this.userinfo.phone
								}
							})

						})
						this.timer = setInterval(() => {
						  if (this.count > 0 && this.count <= this.TIME_COUNT) {
							this.count--;
						  } else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						  }
						}, 1000)
					  }
				}
			},
			ck() {
				this.cklt = true
			},
			qx() {
				this.cklt = false
			},
			btback() {
				uni.switchTab({
					url: '../my/my'
				})
			},
			
			btconfirm(){
				let _this = this
				let img_list = []
				uni.showLoading({
					title:"加载中...",
					mask:true
				})
				_this.fileList = this.$refs.uUpload.lists.filter(val => {
					return val;
				})		
					// console.log("res",this.fileList)				
				let re = /[^\u4e00-\u9fa5]/;
				// let _this=this;
				if(this.shuju.business_name == '' || this.shuju.business_address == '' || this.shuju.responsible_name == '' || this.shuju.snum == '' ){
					uni.showToast({
						title:'请将信息输入完整',
						icon:'none'
					})
				}
				// else if(this.shuju.name.length <4){
				// 	uni.showToast({
				// 		title:'您的商户名称输入有误',
				// 		icon:'none'
				// 	})
				// }
				else if (re.test(this.shuju.responsible_name)){
					uni.hideLoading()
					uni.showToast({
						title:'您的商家姓名输入有误',
						icon:'none'
					})
				}
				     
				else if(this.shuju.responsible_name.length >4 || this.shuju.responsible_name.length <2){
					uni.hideLoading()
					uni.showToast({
						title:'您的商家姓名输入有误',
						icon:'none'
					})
				}
				else if(this.shuju.responsible_phone.substr(0,1) != 1){
					uni.hideLoading()
					uni.showToast({
						title:'您的手机号码有误',
						icon:'none'
					})
				}
				else if(this.shuju.responsible_phone.length >11 || this.shuju.responsible_phone.length <11){
					uni.hideLoading()
					uni.showToast({
						title:'您的手机号码有误',
						icon:'none'
					})
				}
				else if(!this.shuju.responsible_phonecode){
						uni.hideLoading()
						uni.showToast({
							title:'请输入正确短信验证码',
							icon:'none'
						})
				}
				else if(this.shuju.responsible_phonecode.length<6){
						uni.hideLoading()
						uni.showToast({
							title:'请输入正确短信验证码',
							icon:'none'
						})
				}
				else if(this.$refs.uUpload.lists.length == 0 ){
					uni.hideLoading()
					uni.showToast({
						title:'请选择图片',
						icon:'none'
					})					
				}
				else{
					let _this = this;
					_this.img_list = [];
					
					let zsList=[];
					let zsref=[];
					let zslink=[];
					let newspzsList = [];
					for(let i=0;i<_this.$refs.uUpload.lists.length;i++){
						if(!_this.$refs.uUpload.lists[i].file){
							zsref.push(_this.$refs.uUpload.lists[i].url)
						}else{
							zsList.push(_this.$refs.uUpload.lists[i])
						}
					}
				
					console.log("获取的图片",zsref);
					console.log("要解析的图片",zsList);
					console.log("获取的图片cd",zsref.length);
					console.log("要解析的图片cd",zsList.length);
					
					
					//解析上传
					
					if(zsList.length != 0 && zsref.length ==0){
						console.log("zsList",zsList);
						console.log("a")
					for(let a=0;a <zsList.length;a++){
							newspzsList.push(zsList[a].url) 			
					}
					console.log("newspzsList",newspzsList)				
					for(let k= 0;k <newspzsList.length;k++){ 
							_this.$api.upFile(newspzsList[k]).then((res)=>{									
								let spzs_list = JSON.parse(res[1].data) 
								zslink.push(spzs_list.data.link) 
						})						
					}	
					setTimeout(function(){
						console.log("linkcd",zslink.length)
						console.log("link",zslink)
							_this.shuju.appraisal_img=zslink					
						console.log("解析后要上传的图片",_this.shuju.appraisal_img)
						_this.tijiao();
					},1000)
					
					
								
					}
					
					
					//获取上传
					else if(zsList.length == 0  && zsref.length !=0){		
						console.log("b")
							_this.shuju.appraisal_img = zsref
							console.log("获取后要上传的图片",_this.shuju.appraisal_img)	
							_this.tijiao();					
					}
					
					
					//合并上传
					else if(zsList.length != 0  && zsref.length != 0){
						console.log("c")
						
					for(let a=0;a <zsList.length;a++){
							newspzsList.push(zsList[a].url) 			
					}
					console.log("newspzsList",newspzsList)				
					for(let k= 0;k <newspzsList.length;k++){ 
							_this.$api.upFile(newspzsList[k]).then((res)=>{									
								let spzs_list = JSON.parse(res[1].data) 
								zslink.push(spzs_list.data.link) 
						})						
					}	
					setTimeout(function(){
					console.log("linkcd",zslink.length)		
					console.log("zsref",zsref)
						_this.shuju.appraisal_img=zslink					
						console.log("解析后要上传的图片",_this.shuju.appraisal_img)
						_this.shuju.appraisal_img=_this.shuju.appraisal_img.concat(zsref)
						console.log("合并后要上传的图片",_this.shuju.appraisal_img)
					_this.tijiao();
					},1000)
			
					}
					
					
					
				}
			},
			tijiao(){
				let _this = this;
				console.log("状态",_this.verify_if);
				console.log("要上传的数组",_this.shuju)

				if(!this.shuju.appraisal_img ){
					uni.hideLoading()
					uni.showToast({
						title:'请选择图片',
						icon:'none'
					})					
				}else{
					if(_this.verify_if != 2){
						//首次入驻申请
						this.$api.business_applyad(_this.shuju).then((res) =>{
							
							uni.hideLoading()
							if(res.code=='33'){
								uni.hideLoading()
								uni.showToast({
									title:'验证码错误或过期',
									icon:'none'
								})
								return;
							}
							console.log("res",res)
							uni.showModal({
								title:"申请成功",
								content:"将在3个工作日内给予您答复\n请多关注公众号推送\n",
								showCancel:false,
								confirmColor:'#0ABB9A',
								success: (res) => {
									if(res.confirm){
										wx.reLaunch({
											url:'../my/my'
										})	
									}
								}
							})
						}).catch((error_res)=>{
								uni.hideLoading()
								if(error_res.data.code==33){
									uni.showToast({
										title:error_res.data.message,
										icon:'none'
									})
								}else{
									uni.showToast({
										title:'请求失败',
										icon:'none'
									})
								}
						});
					}else{
						//二次提交(入驻不通过,重新提交)
						this.$api.business_open(_this.shuju).then((res) =>{
							uni.showModal({
								title:"申请成功",
								content:"将在3个工作日内给予您答复\n请多关注公众号推送\n",
								showCancel:false,
								confirmColor:'#0ABB9A',
								success: (res) => {
									if(res.confirm){
										wx.reLaunch({
											url:'../my/my'
										})	
									}
								}
							})
						}).catch((error_res)=>{
								uni.hideLoading()
								if(error_res.data.code==33){
									uni.showToast({
										title:error_res.data.message,
										icon:'none'
									})
								}else{
									uni.showToast({
										title:'请求失败',
										icon:'none'
									})
								}

						});
					}
				}
				
			}
		},
		onLoad() {
			let _this=this
			 let sjzs=[];
			 _this.$api.userinfo().then((res) =>{
				 this.userinfo = res.data
				 //如果用户有手机号 回显
				 if(res.data.phone){
					 this.shuju.responsible_phone = res.data.phone;
				 }
				 //如果是商家
				 if(res.data.business){					
					 _this.verify_if=res.data.business.verify_if
					_this.shuju.business_name=res.data.business.business_name
					_this.shuju.business_address=res.data.business.business_address
					_this.shuju.responsible_name=res.data.business.responsible_name
					_this.shuju.responsible_phone=res.data.business.responsible_phone
					res.data.business_appraisal.appraisal_image=JSON.parse(res.data.business_appraisal.appraisal_image)
					 console.log("商家",res.data.business)
					 console.log("证书",res.data.business_appraisal)
					for(let i=0;i<res.data.business_appraisal.appraisal_image.length;i++){
						sjzs.push({'url':res.data.business_appraisal.appraisal_image[i]}); 
						_this.$refs.uUpload.lists.push(sjzs[i]);
						console.log(sjzs);
						if(sjzs.length == res.data.business_appraisal.appraisal_image.length){
							break;
						}
						
					}
					
					
					_this.shuju.appraisal_img=res.data.business.appraisal_image
				 }
				  
				 })
		},
		onReady() {
			const _this = this;
			uni.getSystemInfo({
				success(res) {
					let allheight = res.windowHeight
					let shopWidth = res.windowWidth
					// 阅读框高度
					_this.bgHeight = res.windowHeight - 80 + "px";

				}
			})
		},
	}
</script>

<style>
	page {
		background-color: transparent;
	}

	.bg {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.scbox {
		margin-top: 20upx;
		box-shadow: 0 0 12upx #C0C4CC;
		border-radius: 20upx;
		padding: 15upx 0upx 15upx 9upx;
	}

	.scts {
		color: #C0C0C0;
		font-size: 20upx;
		margin-left: 15upx;
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
		margin-top: -5upx;
	}
	.ltimg {
		height: 830upx;
		width: 640upx;
	}
	.send_code{
		background-color: #0abb9a;
		white-space:nowrap;
		margin-left: 8rpx;
		padding: 8rpx;
		font-size: 24rpx;
		color: #FFFFFF;
		border-radius: 15rpx;
	}
</style>

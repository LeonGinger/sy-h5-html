<template>
	<view class="modify">
		<image src="@/static/my-bg.jpg" class="bg"></image>
		<view class="information">
			<view class="text">{{company == 0 ? '个人信息编辑':'请完善个人资料'}}</view>
			<view class="content">
				<view class="img">
					<view class="information_text">我的头像</view>
					<!-- <uploadimg 
						:width="100"
						:height="100"
						:bgsrc="user_image"
						@chooseimg="handleChooseImg"
						:model='model'>
					</uploadimg> -->
					<view class="imgbox">
					<image :src="information.user_image" style="width: 130upx; height: 130upx; background-color:white;" @click="handleChooseImg"/>
					</view>
					<!-- <u-upload
						:width="200"
						:height="200"
						:bgsrc="img"
						@chooseimg="handleChooseImg"
						:auto-upload="false"
						max-count="1"
						:show-progress="false"
						:deletable="false"
						>
					</u-upload> -->
				</view>
				<view class="name" v-if="business_name && verify_if != 2">
					<view class="information_text">{{verify_if != 3 ? '商家名称':'商家状态'}}</view>
					<text class="information_name" v-if="verify_if != 3">{{business_name}}</text>
					<text class="information_name" v-if="verify_if == 3">商家信息审核中...</text>
				</view>
				<view :class="grant_code ||source_code ?  'namec':'name'">
					<view class="information_text"  v-if="!grant_code && !source_code">我的昵称</view>
					<view class="information_text"  v-if="grant_code || source_code">真实姓名</view>
					<input v-model="information.username" placeholder="请输入您的真实姓名" class="information_name" @focus="onName" @blur="noInput"  maxlength="4" v-if="grant_code || source_code ">
					<input v-model="information.username" placeholder="请输入您的昵称" class="information_name" @focus="onName" @blur="noInput"  maxlength="8" v-if="!grant_code && !source_code">
				</view>
				<view :class="grant_code || source_code ? 'phonec':'phone'" :style="yzm == true ? 'border-bottom: 1rpx solid #f1f1f1;margin-bottom: 0;':''">
					<view class="information_text">手机号</view>
					<input type="number" v-model="information.phone" placeholder="请输入您的手机号" class="information_phone" maxlength="11" @focus="onInput" @blur="noInput">
				</view>
				<view class="code" v-if="yzm == true">
					<view class="code_text">验证码</view>
					<input v-model="information.phonecode" placeholder="请输入验证码" class="information_code"  @focus="onHeight" @blur="noInput"  maxlength="6">
					<view class="send_code" @click="send_Code" type=“default” :disabled="!show" :style="!timer ? '':'background:#cccccc'" >{{!timer ? '发送验证码':count+'s'}}</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<view class="back" @click="back">返回</view>
			<view class="jump" @click="jump">{{company == 0 ? '提交':'确定'}}</view>
		</view>
	
		<bottomBar :style="fu == true ? '':{top:bottomBarTop}"></bottomBar>
	</view>
</template>

<script>
	import EXIF from '@/common/exif.js';
	
	export default {
		data() {
			return {
				verify_if:'',
				yzm:false,
				fu:true,
				lxfsTop:'',
				bottomBarTop:'',
				model:'',
				company:'',
				TIME_COUNT:60,//验证码倒计时60s
				count:'',
				show:true,
				token:'',
				userinfo:[],
				grant_code:'',
				source_code:'',
				business_name:'',
				//上传的用户信息
				information:{
					username:'',
					phone:'',
					user_image:'',
					phonecode:'',
				},
			}
		},
		onLoad(res) {
			let _this=this;
				let grant_code=res.grant_code;  //商家code
				_this.grant_code=res.grant_code; 
				console.log("grant_code",_this.grant_code)
				let source_code=res.source_code;  //溯源码code
				_this.source_code=res.source_code;
				console.log("_this.source_code",_this.source_code)
			
			this.$api.userinfo().then((res) =>{		
				console.log("用户信息",res)
				 _this.userinfo = res.data;
				 if(res.data.business){
					 _this.business_name=res.data.business.business_name
					 _this.verify_if=res.data.business.verify_if
				 }else{
					 
				 }
				
				 _this.information.phone = _this.userinfo.phone;
				 _this.information.user_image = _this.userinfo.user_image;
				 if(!grant_code && !source_code){
					  _this.information.username = _this.userinfo.username;
				 }else{
					  _this.information.username = '';
				 }
			});
			if(res.company == undefined){
				
			}else{
				_this.company = res.company
				uni.setNavigationBarTitle({
				　　title:'完善个人资料'
				})
			}
		},
		methods: {		
			back(){
				uni.navigateBack({
					
				})
			},
			async jump(){
				let _this=this;
				uni.showLoading({
					title:"加载中...",
					mask:true
				})
				
				if(!this.information.username){
					uni.hideLoading()
					uni.showModal({
						title:"提示",
						content:"您的昵称尚未填写",
						showCancel:false,
						confirmColor: '#0ABB9A'
						
					})
					
				}
				
				 else if(!this.information.phone){
				 	uni.hideLoading()
				 	uni.showModal({
				 		title:"提示",
				 		content:"您的手机号码未填写",
				 		showCancel:false,
				 		confirmColor: '#0ABB9A'
				 	})
				 }
				else if(this.information.phone.length != 11){
					uni.hideLoading()
					uni.showModal({
						title:"提示",
						content:"您输入的手机号码有误",
						showCancel:false,
						confirmColor: '#0ABB9A'
					})
				}
				else if(this.userinfo.phone != this.information.phone && !this.information.phonecode){
					uni.hideLoading()
					uni.showModal({
						title:"提示",
						content:"请输入验证码",
						showCancel:false,
						confirmColor: '#0ABB9A'
					})					
				}
				
				else if(this.information.username || this.information.phone || this.information.phonecode){
					if(_this.userinfo.user_image === _this.information.user_image){
						// console.log("bu",bu)
					}else{
						if(_this.information.user_image.substring(0,4) != "http"){
							await _this.$api.upFile(_this.information.user_image).then((res)=>{
								console.log("res",res)
								let tp_list = JSON.parse(res[1].data)
								_this.information.user_image = tp_list.data.link
							})
						}else{
							
						}
						
					}
					
					this.$api.usersave(_this.information).then((res) =>{		
						console.log("ressss",res)
						if(res){
							// console.log("res",res)
							uni.hideLoading()
							uni.showModal({
								title:"提示",
								content:'修改成功',
								showCancel:false,
								confirmColor: '#0ABB9A',	
								success(res) {
									if(!_this.grant_code && !_this.source_code){
										wx.reLaunch({
											url:'./my'
										})	
										}else if(_this.grant_code &&  !_this.source_code){
											uni.navigateTo({
												url:'../scan/staffscan?grant_code='+_this.grant_code
											})
										}else if(_this.source_code && !_this.grant_code){
											uni.navigateTo({
												url:'../traceability/traceability?source_code='+_this.source_code
											})
										}
								}
							})
						}else{
							uni.hideLoading()
							// console.log('请求失败')
						}
							
					}).catch((err) => {
						console.log("err",err)
						uni.hideLoading()
						if(err.data.message == "验证码错误"){
							uni.showModal({
								title:"提示",
								content:"验证码错误",
								showCancel:false,
								confirmColor: '#0ABB9A',	
							})
						}
					})
					
				}
			},
			
			handleChooseImg(){
				 let _this=this;
				uni.chooseImage({
					count: 1,
					
					sizeType: ['original', 'compressed'],
					 
					success:function(res){					
						  const tempFilePaths = res.tempFilePaths;
						  
						_this.detail(tempFilePaths[0])
						
						// _this.information.user_image=tempFilePaths[0]; 
						// 因底层限制一次上传一个
					
					}
				});
			},
			onName(e){
				console.log(" this.information.user_image", this.information.user_image)
				this.fu = false
				this.yzm = false
			},
			onInput(e){
				console.log(e)
					this.yzm = true
					this.fu = false
				
			},
			onHeight(e){
				this.fu = false
			},
			noInput(e){
				this.fu = true
				if(this.information.phone == this.userinfo.phone || this.information.phone == ''){
					this.yzm = false
					
				}
			},
			send_Code(){
				let _this = this
				if(this.information.phone.length < 11 || this.information.phone == this.userinfo.phone){
					uni.showToast({
						icon:'none',
						title:'手机号输入有误'
					})
				}else{
					if (!this.timer) {
						this.count = this.TIME_COUNT;
						this.show = false;
						_this.$api.iphone_code({mobile : this.information.phone}).then((res)=>{
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
									_this.information.phone == _this.userinfo.phone
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
			onResize(e){
				alert(e)
			},
			//旋转
			async detail(url){
				console.log("url",url)
				 let maxWidth = 500;  
				 let Orientation = 1;  
				 //获取图片META信息  
				 await this.getImageTag(url, 'Orientation', function(e) {  
					 if(e != undefined) Orientation = e;  
				 })  
				 var img = null;  
				 var canvas = null;  
				 await this.comprossImage(url, maxWidth, function(e) {  
					 img = e.img;  
					 canvas = e.canvas;  
				 })  
			 
				 // console.log(Orientation,"Orientation")  
				 let baseStr = '';  
				 //如果方向角不为1，都需要进行旋转  
				 switch(Orientation){  
					 case 6://需要顺时针（向右）90度旋转  
						 baseStr = this.rotateImg(img,'right',canvas);  
						 break;  
					 case 8://需要逆时针（向左）90度旋转   
						 baseStr = this.rotateImg(img,'left',canvas);  
						 break;  
			 
					 case 3://需要180度旋转 转两次  
						 baseStr = this.rotateImg(img,'right',canvas, 2);  
						 break;  
					 default:  
						 baseStr = this.rotateImg(img,'',canvas);  
						 break;  
				 }  
					// console.log(baseStr,"baseStr")
					// this.uploadImg(baseStr)//图片上传到服务器的方法
			},
			//-------------------------------直接粘贴的三个方法
				 	 async comprossImage(imgSrc, maxWidth, func){  
				     if(!imgSrc) return 0;  
				     return new Promise((resolve, reject) => {  
				         uni.getImageInfo({  
				             src: imgSrc,  
				             success(res) {  
				                 let img = new Image();  
				                 img.src = res.path;  
				                 // console.log("img",img)  
				 
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
				 	getImageTag(file, tag, suc){  
				 	     if (!file) return 0;  
				 	     return new Promise((resolve, reject) => {  
				 	         /* eslint-disable func-names */  
				 	         // 箭头函数会修改this，所以这里不能用箭头函数  
				 	         let imgObj = new Image()  
				 	         imgObj.src = file  
				 	         console.log("imgObj",imgObj)  
				 	         uni.getImageInfo({  
				 	             src: file,  
				 	             success(res) {
				 	                 EXIF.getData(imgObj, function () {  
				 	                     EXIF.getAllTags(this);    
				 	                     let or = EXIF.getTag(this,'Orientation');//这个Orientation 就是我们判断需不需要旋转的值了，有1、3、6、8  
				 	                     resolve(suc(or))  
				 	                 });  
				 	             }  
				 	         })  
				 	     });  
				 	 },
					 rotateImg(img, direction, canvas, times = 1){   
							let _this = this
					 	     console.log('开始旋转')  
					 	     //最小与最大旋转方向，图片旋转4次后回到原方向    
					 	     var min_step = 0;    
					 	     var max_step = 3;    
					 	     if (img == null)return;    
					 	 
					 	     //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
					 	     var height = img.height;    
					 	     var width = img.width;    
					 	     let maxWidth = 400;  
					 	     let canvasWidth = width; //图片原始长宽  
					 	     let canvasHeight = height;  
					 	     let base = canvasWidth/canvasHeight;  
					 	     console.log(maxWidth);  
					 	     if(canvasWidth > maxWidth){  
					 	         canvasWidth = maxWidth;  
					 	         canvasHeight = Math.floor(canvasWidth/base);  
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
					 	     } else if(direction == 'left'){    
					 	       step -= times;    
					 	       step < min_step && (step = max_step);    
					 	     } else {    //不旋转  
					 	         step = 0;  
					 	     }  
					 	 
					 	     //旋转角度以弧度值为参数    
					 	     var degree = step * 90 * Math.PI / 180;    
					 	     var ctx = canvas.getContext('2d');    
					 	     console.log("degree",degree)  
					 	     console.log("step",step)  
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
					 	       default:  //不旋转  
					 	         canvas.width = width;  
					 	         canvas.height = height;  
					 	         ctx.drawImage(img, 0, 0, width, height);  
					 	         break;  
					 	     }  
							
					 	     let baseStr = canvas.toDataURL("image/jpeg", 1); 
							 _this.information.user_image = baseStr
							 // this.dataURLtoFile(baseStr,)
							 
							 
							
							 // console.log("baseStr",baseStr)
							 // this.information.user_image=  baseStr
							 // _this.base64ToPath(baseStr)
							 //   .then(path => {
								//  // _this.information.user_image = path
							 //     console.log("path",path)
							 //   })
							 //   .catch(error => {
							 //     console.error(error)
							 //   })
							 
							 // console.log("this.resImg",this.resImg)
			
							 
							 // var base64src = require('@/common/base64.js')
							 // console.log("list",this.lists)				
							 // base64src.base64ToPath(this.resImg)
							 //   .then(path => {
							 //     console.log("path",path)
								//  this.lists[this]
							 //   })
							 //   .catch(error => {
							 //     console.error(error)
							 //   })
							 
							 
							 // console.log( this.currentImage)
							 // this.$emit('chooseimg', {
							 // 	src: this.baseStr
							 // });
							 // console.log("baseStr",baseStr)
					 	     // return baseStr;  
					 	 },
						 // dataURLtoFile(dataurl, filename) {
						 //     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
						 //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
						 //     while (n--) {
						 //         u8arr[n] = bstr.charCodeAt(n);
						 //     }
						 //     return new File([u8arr], filename, { type: mime }); // file 类型
						 // }
		},
		onReady() {
			let _this = this
			uni.getSystemInfo({
				success: function (res) {
					console.log(res)
					_this.lxfsTop = res.windowHeight -88 +'px'
					_this.bottomBarTop = res.windowHeight - 56 + 'px'
					// console.log(_this.Top)
					_this.model = res.model
				}
			})
			
		}
	}
</script>

<style lang="scss">
	.imgbox{
		box-shadow: 0 0 15upx  #C0C4CC;
		border-radius: 50%;	
		width: 120upx;
		height: 120upx;
	}
	.imgbox image{
		border-radius: 50%;	
		
	}
	page{
		background-color: transparent;
	}
	.modify{
		.bg{
			width: 100%;
			height: 100%;
			z-index: -1;
			position: fixed;
			top: 0;
			left: 0;
		}
		.information{
			width: 90%;
			background-color: #FFFFFF;
			border-radius: 30rpx;
			margin: 50rpx auto;
			box-shadow: 0 0 15rpx #d0d5dd;
			.text{
				padding-top: 20rpx;
				text-align: center;
				font-size: 38rpx;
			}
			.content{
				display: flex;
				flex-wrap: wrap;
				font-size: 30rpx;
				.img{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin: 20rpx 30rpx;
					padding-bottom: 20rpx;
					align-items: center;
					border-bottom: 1rpx solid #f1f1f1;
					.information_img{
						border-radius: 50%;
					}
				}
				.name{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin: 30rpx;
					padding-bottom: 30rpx;
					align-items: center;
					border-bottom: 1rpx solid #f1f1f1;
					.information_name{
						text-align: right;
					
					}
				}
				.namec{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin: 30rpx;
					padding-bottom: 30rpx;
					align-items: center;
					border-bottom: 3rpx solid red;
					.information_name{
						text-align: right;
				
					}
				}
				.phone{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin: 30rpx;
					padding-bottom: 30rpx;
					align-items: center;
					.information_phone{
						text-align: right;
						font-weight: 700;
					}
				}
				.phonec{
					width: 100%;
					border-bottom: 3rpx solid red;
					display: flex;
					justify-content: space-between;
					margin: 30rpx;
					padding-bottom: 30rpx;
					align-items: center;
					.information_phone{
						text-align: right;
						font-weight: 700;
					}
				}
				.code{
					width: 100%;
					display: flex;
					justify-content: space-between;
					margin: 30rpx;
					padding-bottom: 30rpx;
					align-items: center;
					.code_text{
						white-space:nowrap !important;
					}
					.information_code{
						text-align: right;
						font-weight: 700;
					}
					.send_code{
						background-color: #0abb9a;
						white-space:nowrap;
						margin-left: 10rpx;
						padding: 20rpx;
						font-size: 24rpx;
						color: #FFFFFF;
						border-radius: 15rpx;
					}
				}
			}
		}
		.btn{
			display: flex;
			justify-content: space-around;
			font-size: 32rpx;
			margin: 0 60rpx;
			.back{
				border-radius: 20rpx;
				padding: 10rpx 55rpx;
				color: #0abb9a;
				background-color: #FFFFFF;
				border: 2rpx solid #0abb9a;
			}
			.jump{
				border-radius: 20rpx;
				padding: 10rpx 55rpx;
				background-color: #0abb9a;
				color: #FFFFFF;
			}
		}
		.caption{
			position: fixed;
			line-height: 40rpx;
			bottom: 80rpx;
			left: 50%;
			transform: translate(-50%,-50%);
			text-align: center;
			color: #C0C4CC;
			font-size: 22rpx;
			z-index: -1;
		}
	}
	
</style>

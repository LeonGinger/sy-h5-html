<template>
	<view
		class="upload-img"
		:style="{
			width: width + 'rpx',
			height: height + 'rpx',
		}"
		@tap="handleAddNewImage()"
	>
		<image class="cover" :src="currentImage" mode="aspectFill"></image>
		<view class="plusicon">
			<slot name="icon">
				<text
					v-if="!choosed"
					class="iconfont " 
					>&#xe8fe;</text>
			</slot>
		</view>
	</view>
</template>
<!-- 'background-image': 'url(' + bgsrc +')' -->
<script>
	import EXIF from '@/common/exif.js';
export default {
	props: {
		width: {
			type: Number,
			default: 300
		},
		height: {
			type: Number,
			default: 190
		},
		bgsrc: {
			type: String
		},
		model: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			gifimg:'',
			currentImage: '',
			choosed:false,
			resImg:'',
			model:'',
		};
	},
	methods: {
		handleAddNewImage() {
			const _that = this;
			uni.chooseImage({
				count: 1,
				sourceType: ['album', 'camera'],
				sizeType: ['compressed'],
				success:async (res) => {
					console.log(res)
					// _that.currentImage = res.tempFilePaths[0];
					_that.choosed = true;
					_that.resImg = res.tempFilePaths[0]//这就是要的blod
					// console.log("resImg",_that.resImg)
					// if(res.tempFiles[0].type == "image/gif"){
					// 	// console.log("aaaa")
					// 	_that.gifimg = res.tempFilePaths[0]//这就是要的blod
						
					// }else{
						
					// }
					if(_that.model != "iPhone"){
						await _that.detail(_that.resImg)
					}
					_that.$emit('img', _that.resImg);
					// _that.$emit('chooseimg', {
					// 	src: _that.resImg
					// });
					// alert(_that.resImg)
				}
			});
			
		},
		async detail(url){
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
	 
		 console.log(Orientation,"Orientation")  
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
			console.log(baseStr,"baseStr")
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
			 	     console.log('开始旋转')  
			 	     //最小与最大旋转方向，图片旋转4次后回到原方向    
			 	     var min_step = 0;    
			 	     var max_step = 3;    
			 	     if (img == null)return;    
			 	 
			 	     //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
			 	     var height = img.height;    
			 	     var width = img.width;    
			 	     let maxWidth = 500;  
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
					 this.currentImage = baseStr
					 // console.log( this.currentImage)
					 // this.$emit('chooseimg', {
					 // 	src: this.baseStr
					 // });
					 // console.log("baseStr",baseStr)
			 	     // return baseStr;  
			 	 },
				 //-----------------------------------------------结束
				 	 uploadImg(tempFilePaths) {
				 			console.log(tempFilePaths,"触发上传接口")
				 			uni.uploadFile({
				 				url: '服务器地址',
				 				filePath: tempFilePaths,
				 				fileType:"image",
				 				header:{"Authorization":'Bearer ' + localStorage.getItem('token')},
				 				name: 'file',
				 				success: (res) => {
				 					uni.hideLoading()
				 					let resObj = JSON.parse(res.data)
				 					if (resObj.meta.code === 200) {
				 						let data = resObj.data.url;
				 						console.log(data)
				 					} 
				 				}
				 		})
						}
	},
	
	
}
</script>

<style lang="scss">
@font-face {
	font-family: "iconfont";
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-plus:before {
  content: "\e8fe";
}
.upload-img {
	position: relative;
	margin-top: 20rpx;
	background-size: 100% 100%;
	-webkit-background-size: 100% 100%;
	// border-radius: 50%;
	overflow: hidden;
	background-image: url(../../static/xztp.png);
	// box-shadow: 0 0 20rpx #d6d6d6;
	.cover {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
	.plusicon{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: -1;
	}
}
</style>

 

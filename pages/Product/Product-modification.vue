<template>

	<view class="wrapper">
		<image src="../../static/sp-bg.jpg" class="bg"></image>
		<view class="ytitle">
			<text class="ytext">商品修改</text>
		</view>
		<!-- 轮播图 -->
		<view class="whitebox">
			<view class="utitlebox">
				<view class="utitleblock"></view>
				<text class="utitle">修改轮播图</text>
				<text class="uxtitle">（最多上传6张图片）</text>
			</view>
			<view class="lbt">
				<u-upload ref="lbtload" :action="action" :auto-upload="false" max-count="6" :model="model"></u-upload>
			</view>
		</view>
		<!-- 轮播图 -->
		<connect class="connect"></connect>
		<!-- 商品信息 -->
		<view class="whitebox">
			<view class="utitlebox" style="margin-top: 20upx;">
				<view class="utitleblock"></view>
				<text class="utitle">修改商品信息</text>
			</view>
			<u-form  style="margin-left: 20upx;margin-top: 15upx;">
				<u-form-item label="商品名称:">
					<u-input placeholder="请输入商品名称" v-model="cname"  maxlength='14'/>
				</u-form-item>
				<u-form-item label="生源产地:">
					<u-input placeholder="请输入生源产地" v-model="cyd"  maxlength='14'/>
				</u-form-item>
			<u-form-item label="商品规格:">
				<u-input placeholder="请输入商品规格" v-model="cgg" type='number' maxlength='5'/>
				<span style="position: absolute; margin-left: 85upx;margin-top: -1.5upx;" v-if="cgg">{{gg}}</span>
				<view class="gg" @click="ggshow = true">规格</view>					
				<u-select v-model="ggshow" :list="list"  @confirm="confirmgg"></u-select>
			</u-form-item>
				<u-form-item label="生产日期:">
					<view @click="show = true" :style="input=='' ? 'color:#C0C4CC':'color:black'" class="scrq" style="width: 420upx;">{{ input.slice(0,10) }}</view>
				</u-form-item>
				<u-picker mode="time" v-model="show" :params="params" @confirm="confirm"></u-picker>
				<u-form-item label="保质日期:">
					<u-input placeholder="请输入商品保质期" v-model="cbz" maxlength='3'  type="number"/>
					<span style="position: absolute; margin-left: 85upx;margin-top: -1.5upx;" v-if="cbz">{{bz}}</span>
					<view class="gg" @click="bzshow = true">期限</view>	
					<u-select v-model="bzshow" :list="lists"  @confirm="confirmbz"></u-select>
				</u-form-item>
				<u-form-item label="商品售价:">
					<u-input placeholder="请输入商品的价格(元)" v-model="cprice"  type="number"  maxlength='5'/>
				</u-form-item>
			</u-form>
		</view>
		<!-- 商品信息 -->
		<!-- 检测信息 -->
		<view class="whitebox">
			<view class="utitlebox" >
				<view class="utitleblock"></view>
				<text class="utitle">修改商品检测信息</text>
				<text class="uxtitle" style="margin-left: 10upx;">(可不上传)</text>
			</view>
			<view class="whitebox" style="width: 638upx;margin-left:-15upx ;padding: 20upx;">

				<view class="htitle">
					<text>修改检疫检测报告:</text>
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
							<u-input placeholder="需与商品名称和检测报告是同一商品" v-model="ypname"   maxlength='10'/>
						</u-form-item>
						<u-form-item label="检测日期:">
							
							<view @click="showjc = true" :style="inputjc=='请选择检疫检测日期' ? 'color:#C0C4CC':'color:black'" class="scrq" style="width: 420upx;">{{ inputjc ? inputjc.slice(0,10) : '请选择检疫检测日期' }}</view>
							<u-icon name="close-circle-fill" color="#c1c1cb" size="30"  @click="qxinputjc" v-if="inputjc != '请选择检疫检测日期'"></u-icon>
						</u-form-item>
						<u-picker mode="time" v-model="showjc" :params="paramsjc" @confirm="confirmjc"></u-picker>
						<u-form-item label="检验地点:">
							<u-input placeholder="检查机构的地点" v-model="jcdd" maxlength='14' />
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
				<text class="uxtitle" style="margin-left: 10upx;">(可不上传)</text>
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
					<u-upload ref="spzsload" :action="action" :auto-upload="false" max-count="9" :model="model"></u-upload>
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

				action: '',//后端接口地址
				scrollTop: 0,
				// 表单
				show: false,
				showjc: false,
				mode: 'time',
				cklt: false,
				cklt2: false,
				queding:false,
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
				id:0,
				thismenu:[],
				lbtimg:[], //轮播图图片
				jyjcimg:[], //检疫检测图片
				spzsimg:[],//商品证书图片
				lbtlink:[],
				jyjclink:[],
				spzslink:[],
				
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
		
		onLoad(res) {
			let _this=this;
			let id=res.index;
			_this.id=res.index; 
			let lastlbt=[];
			let lastjyjc=[];
			let lastzs=[];
			 _this.$api.find_menu({menu_id:id}).then((res) =>{
					_this.thismenu=res.data
					console.log("menu",_this.thismenu)
					console.log("monitoring_time",res.data.menu_monitor[0].monitoring_time)
					if(res.data.menu_monitor[0].monitoring_time == '0000-00-00 00:00:00'){
						_this.inputjc='请选择检疫检测日期' //检测时间
					}else{
						_this.inputjc=res.data.menu_monitor[0].monitoring_time //检测时间
						
					}
					
					res.data.menu_images_json =  JSON.parse(res.data.menu_images_json)	
					for(let q=0;q<res.data.menu_images_json.length;q++){
						lastlbt.push({'url':res.data.menu_images_json[q]}); //往menu_images_json插入url
						_this.$refs.lbtload.lists.push(lastlbt[q]);  //赋值到轮播图组件上
						console.log(lastlbt);
						if(lastlbt.length == res.data.menu_images_json.length){
							break;
						}						
					}	
						
				// 检疫检测图片		
				for(let w=0;w<res.data.menu_monitor.length;w++){
					res.data.menu_monitor[w].monitor_image= JSON.parse(res.data.menu_monitor[w].monitor_image)								
					for(let j=0;j<res.data.menu_monitor[w].monitor_image.length;j++){
						lastjyjc.push({'url':res.data.menu_monitor[w].monitor_image[j]});
						_this.$refs.jyjcload.lists.push(lastjyjc[j]);  
						if(lastjyjc.length == res.data.menu_monitor[w].monitor_image.length){
							break;
						}
					}
				break;
				}		
				
				_this.ypname=_this.thismenu.menu_monitor[0].sample_name //检测样品名称
				
				
				_this.jcdd=_this.thismenu.menu_monitor[0].test_location //检测地点
				_this.cname=_this.thismenu.menu_name; //商品名称
				_this.cyd=_this.thismenu.menu_address //生产源地
				_this.cgg=_this.thismenu.menu_weight.match(/\d+/g) //商品规格
				_this.gg=_this.thismenu.menu_weight.replace(_this.thismenu.menu_weight.match(/\d+/g),"")
				
				_this.input=_this.thismenu.production_time //生产日期
				_this.cbz=_this.thismenu.quality_time.match(/\d+/g)//保质日期
				_this.bz=_this.thismenu.quality_time.replace(_this.thismenu.quality_time.match(/\d+/g),"")
				
				_this.cprice=_this.thismenu.menu_money //商品售价	
				
				
				// 商品认证
				if(res.data.menu_certificate){
					for(let w=0;w<res.data.menu_certificate.length;w++){
						res.data.menu_certificate[w].certificate_image= JSON.parse(res.data.menu_certificate[w].certificate_image)								
						for(let p=0;p<res.data.menu_certificate[w].certificate_image.length;p++){
							lastzs.push({'url':res.data.menu_certificate[w].certificate_image[p]});
							_this.$refs.spzsload.lists.push(lastzs[p]);  
							if(lastzs.length == res.data.menu_certificate[w].certificate_image.length){
								break;
							}
						}
					break;
					}
				}
						
						
							
						
				
					
					
								
					
					
			 });	
			
		
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		methods: {
			qxinputjc(){
				this.inputjc='请选择检疫检测日期';
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
				
				
				if(_this.cgg){
					_this.gg=e[0].label
				}else{
					uni.showToast({
						icon:'none',
						title: '请先输入数量',
					});
				}
			},
			confirmbz(e){
				let _this=this;
						
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
						
				let _this = this
				console.log("this.inputjc",this.inputjc);
				let re = /[^\u4e00-\u9fa5]/;
				let time = new Date();
				this.year = time.getFullYear();
				this.month = Number(time.getMonth()) + 1;
				this.day = time.getDate();
		
				if(this.cname == '' || this.cyd == '' || this.cgg == '' || this.input == '' || this.cbz == '' ||  this.cprice == ''){
					uni.showToast({
						title:'请将信息输入完整',
						icon:'none'
					})
				}
				
				else if(this.$refs.lbtload.lists.length == 0 ){
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
				else if(this.$refs.jyjcload.lists.length == 0 && this.ypname ||  this.$refs.jyjcload.lists.length == 0 && this.jcdd || this.$refs.jyjcload.lists.length == 0 &&  this.inputjc !='请选择检疫检测日期'){
					console.log("this.$refs.jyjcload.lists.length",this.$refs.jyjcload.lists.length)
					console.log("noimg");
					uni.showToast({
						title:'请完善检测检疫信息',
						icon:'none'
					})					
				}
				else if(!this.ypname && this.$refs.jyjcload.lists.length != 0  ||  !this.ypname && this.jcdd || !this.ypname && this.inputjc !='请选择检疫检测日期'){
					console.log("noname");
					uni.showToast({
						title:'请完善检测检疫信息',
						icon:'none'
					})					
				}
				else if(!this.jcdd && this.$refs.jyjcload.lists.length != 0  ||  !this.jcdd && this.ypname || !this.jcdd && this.inputjc !='请选择检疫检测日期'){
					console.log("nodd");
					uni.showToast({
						title:'请完善检测检疫信息',
						icon:'none'
					})					
				}
				else if(this.inputjc =='请选择检疫检测日期' && this.$refs.jyjcload.lists.length != 0  || this.inputjc =='请选择检疫检测日期' && this.inputjc =='请选择检疫检测日期' && this.jcdd){
					console.log("notime");
					uni.showToast({
						title:'请完善检测检疫信息',
						icon:'none'
					})					
				}			
				// else if (re.test(this.cname)){
				// 	uni.showToast({
				// 		title:'商品名称输入有误',
				// 		icon:'none' 
				// 	})
				// }
				else if(this.gg.length == 0 ){
					uni.showToast({
						title:'请选择商品日期的规格',
						icon:'none'
					})					
				}
				else if (this.ypname && re.test(this.ypname)){
					uni.showToast({
						title:'正宗名称输入有误',
						icon:'none'
					})
					
				}
				else{
					
					
					
					// }, 3000) //  3秒后执行代码
					
					
					uni.showModal({
						title: '提示',
						content: '确定修改商品无误',
						confirmColor: '#0ABB9A',
						success:async function(res) {
							_this.queding=true;
							if (res.confirm) {
								uni.showLoading({
									title:"正在上传..."
								});
								
								
								let lbtList=[];
								let lbtref=[];
								let aa=false;
								for(let i=0;i<_this.$refs.lbtload.lists.length;i++){
									if(!_this.$refs.lbtload.lists[i].file){
										lbtref.push(_this.$refs.lbtload.lists[i].url)
									}else{
										lbtList.push(_this.$refs.lbtload.lists[i])
									}
								}
								console.log("获取的轮播图图片",lbtref);
								console.log("要上传的轮播图图片",lbtList);
								if(lbtList.length != 0){
								let newlbtList = []; //定义一个新的轮播图数组newlbtList
								for(let a=0;a <lbtList.length;a++){
									newlbtList.push(lbtList[a].url) //循环出轮播图里面的blob图片地址，并插入newlbtList数组里					
								}
								console.log("去转换的轮播图",newlbtList);
								for(let k= 0;k <newlbtList.length;k++){ //循环newlbtList数组并请求接口upFile上传图片接口转换图片地址
											console.log("转换的轮播图",newlbtList[k]);
										 await _this.$api.upFile(newlbtList[k]).then((res)=>{									
											let lbt_list = JSON.parse(res[1].data) //成功返回的图片地址转化成json放入lbt_list里	
											_this.lbtlink.push(lbt_list.data.link) //转换好json的图片地址放入lbtimg数组里
										})
										if(_this.lbtlink.length == newlbtList.length){
											break;
										}
									}
								}
								let imgb=[];
								console.log("要上传的轮播图图片解析后",_this.lbtlink);
								console.log("获取的轮播图片的长度",lbtref.length)
											
											
											
											
											
											
											
											
									
								//检疫检测图	
								let jyjcList=[];
								let jyjcref=[];
								for(let e=0;e<_this.$refs.jyjcload.lists.length;e++){
									if(!_this.$refs.jyjcload.lists[e].file){
										jyjcref.push(_this.$refs.jyjcload.lists[e].url)
									}else{
										jyjcList.push(_this.$refs.jyjcload.lists[e])
									}
								}
								console.log("获取的检疫检测图片",jyjcref);
								console.log("要上传的检疫检测图片",jyjcList);
								if(jyjcList){
								let newjyjcList = [];
								for(let r=0;r <jyjcList.length;r++){
												
										newjyjcList.push(jyjcList[r].url) 	
								}
												
								for(let t=0;t<newjyjcList.length;t++){ 
										await _this.$api.upFile(newjyjcList[t]).then((res)=>{									
											let jyjc_list = JSON.parse(res[1].data) 
											_this.jyjclink.push(jyjc_list.data.link) 
										})
										if(_this.jyjclink.length == newjyjcList.length){
											break;
										}
									}
								}
								let imgc=[];
								console.log("要上传的检疫检测图片解析后",_this.jyjclink);
								console.log("获取检疫检测图片的长度",jyjcref.length)
														
														
										
										
										
										
										
										
										
								//商品证书图	
								let spzsList=[];
								let spzsref=[];
								for(let i=0;i<_this.$refs.spzsload.lists.length;i++){
									if(!_this.$refs.spzsload.lists[i].file){
										spzsref.push(_this.$refs.spzsload.lists[i].url)
									}else{
										spzsList.push(_this.$refs.spzsload.lists[i])
									}
								}
								console.log("获取的图片",spzsref);
								console.log("要上传的图片",spzsList);
								if(spzsList){
								let newspzsList = [];
								for(let a=0;a <spzsList.length;a++){
										newspzsList.push(spzsList[a].url) 			
								}
												
								for(let k= 0;k <newspzsList.length;k++){ 
										await _this.$api.upFile(newspzsList[k]).then((res)=>{									
											let spzs_list = JSON.parse(res[1].data) 
											_this.spzslink.push(spzs_list.data.link) 
										})
										if(_this.spzslink.length == newspzsList.length){
											break;
										}
									}
								}
								let imgd=[];
								console.log("要上传的图片解析后",_this.spzslink);
								console.log("获取图片的长度",spzsref.length)				
											
								 // setTimeout(() => {
								//轮播
								console.log("要上传的轮播图片的长度",_this.lbtlink.length);
								for(let b=0;b<lbtref.length;b++){
										_this.lbtimg.push(lbtref[b])
									if(_this.lbtimg.length ==lbtref.length ){
										break;
									}
								}		
								for(let c=0;c<_this.lbtlink.length;c++){
									imgb.push(_this.lbtlink[c]) 
									if(imgb.length ==_this.lbtlink.length ){
										break;
									}
								}
								console.log("_this.lbtimg",_this.lbtimg);
								console.log("_this.lbtimg,lenght",_this.lbtimg.length);
								
								_this.lbtimg=_this.lbtimg.concat(imgb);
								console.log("合并后的轮播图图片",_this.lbtimg);
								
								
								//检疫检测
								
								console.log("要上传检疫检测图片的长度",_this.jyjclink.length);
								for(let u=0;u<jyjcref.length;u++){
										_this.jyjcimg.push(jyjcref[u])
									if(_this.jyjcimg.length ==jyjcref.length ){
										break;
									}
								}		
									console.log("imgb,lenght",imgb.length);
								if(_this.jyjclink !=''){
									for(let z=0;z<_this.jyjclink.length;z++){
										imgc.push(_this.jyjclink[z]) 
										if(imgc.length ==_this.jyjclink.length ){
											break;
										}
									}
									_this.jyjcimg=_this.jyjcimg.concat(imgc);
								}
								
								console.log("_this.jyjcimg",_this.jyjcimg);
								console.log("_this.jyjcimg,lenght",_this.jyjcimg.length);
								
								
								console.log("合并后的检疫检测图片",_this.jyjcimg);
								
								
								
								
								//证书
								console.log("要上传图片的长度",_this.spzslink.length);
								for(let b=0;b<spzsref.length;b++){
										_this.spzsimg.push(spzsref[b])
									if(_this.spzsimg.length ==spzsref.length ){
										break;
									}
								}		
								for(let c=0;c<_this.spzslink.length;c++){
									imgd.push(_this.spzslink[c]) 
									if(imgd.length ==_this.spzslink.length ){
										break;
									}
								}
								_this.spzsimg=_this.spzsimg.concat(imgd);
								console.log("合并后的证书图片",_this.spzsimg);
								
								
								
								//请求修改商品接口
								console.log("aaa证书aaa",_this.jyjcimg)
								console.log("aaa检疫aaa",_this.spzsimg)
								_this.newcgg=_this.cgg+_this.gg; //数量加规格
								_this.newcbz=_this.cbz+_this.bz; 
								 // setTimeout(() => {									 
								_this.$api.update_menu({
									menu_id:_this.id,
									menu_name:_this.cname,
									menu_address:_this.cyd,
									menu_weight:_this.newcgg,
									production_time:_this.input,
									quality_time:_this.newcbz,
									menu_money:_this.cprice,
									menu_images_json:_this.lbtimg,
									monitor_image:_this.jyjcimg,
									sample_name:_this.ypname,
									monitoring_time:_this.inputjc,
									test_location:_this.jcdd,
									certificate_image:_this.spzsimg,
								}).then((res) =>{
									uni.hideLoading();
									uni.showToast({
										title: '修改成功',
									});	
									uni.navigateTo({
										url: 'Product-list',
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
								});
								// },3500);
								
							} else if (res.cancel) {
								console.log('用户点击取消');
								_this.queding = false
								_this.lbtimg=[];
								_this.jyjcimg=[];
								_this.spzsimg=[];
								
							}
						}
					});
				}
				},
				btback() {
						// console.log("aaaa")
						// uni.navigateBack({
							
						// })
						uni.navigateTo({
							url: 'Product-list',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
				
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

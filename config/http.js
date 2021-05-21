const baseUrl = 'https://sy.zsicp.com/wap/';
  //获取当前页面url
// const baseUrl = 
//基本的接口请求
const baseRequest = (url,method,data) =>{
	console.log("data",data)
	console.log("url",url)
	console.log("method",method)
	// console.log("process.env.NODE_ENV",process.env.NODE_ENV)
	let token = uni.getStorageSync('token'); //从缓存数据中获取token
	let baseDefaultOpts = {
		url: baseUrl + url,
		//请求接口地址
		data:data,
		//传入请求参数
		method:method,
		//配置请求类型
		header: method == 'GET' ? {
			'token':token,
			// 'X-Requested-With': 'XMLHttpRequest',
			// 'Accept' : '*/*',
			// "Content-Type": "application/json;charset=utf-8",
		} : {
			'token':token,
			// 'X-Requested-With': 'XMLHttpRequest',
			// 'Accept' : 'application/json',
			// 'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8',
			
		},
		//配置请求头
		dataType:'json',
	}
	let promise = new Promise(function(resolve,reject){
		uni.request(baseDefaultOpts).then((response) => {
				// console.log("response",response)
				const res = response[1].data;
				var thishref = window.location.href; 
				var href= 'https://sy.zsicp.com/h5/#/pages/wxauthorize/wxauthorize';  
				var my= 'https://sy.zsicp.com/h5/#/pages/my/my'; 
				uni.setStorageSync('thishref',thishref);
				var ahref = uni.getStorageSync('thishref',thishref);
				console.log("页面url",ahref)
				
				//禁止再外置浏览器内打开
				let ua = navigator.userAgent.toLowerCase();
				    let isWeixin = ua.indexOf('micromessenger') != -1;
				    if (!isWeixin) {
				      window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=888"
				    }
				
				
				if(res.message == '身份验证失败'){
					setTimeout(()=>{
						window.location.replace(href);  //失败跳转		
					},1000)
							
				}
				else if(res.message == '您的溯源码错误，请重试'){
						uni.showModal({
							title:"提示",
							content:"你查询的溯源码有误，请重试",
							confirmColor:'#0ABB9A',
							showCancel:false,
							success:(res) =>{
								if(res.confirm){							
										window.location.replace(my);													
								}
							}
						})			
					}else if (res.message =='您未关注公众号，请重试' ) {
								//跳去关注公众号
								var gzhlink='https://mp.weixin.qq.com/s/gOw4IdpDcIUYGuFxJFBc_A';  //关注公众号文章页面连接
								uni.showModal({
									title:"提示",
									content:"您还未关注公众号",
									confirmColor:'#0ABB9A',
									confirmText:'去关注',
									showCancel:false,
									success:(res) =>{
										if(res.confirm){							
											window.location.replace(gzhlink);													
										}
									}
								})	
								
						}
				if(res.status == 1){
					// resolve(res)
				}else if(res.status == 2){
					this.$common.toast(res.msg,success)
					// resolve(res)
				}else if(res.status == -700){
					// resolve(res)
				}else if(res.status == -2){
					// this.$common.toast(res.msg)
				}else if(res.code == 200){
					resolve(res)
				}else{
					
					reject(response[1])
				}
			}).catch((response) =>{
				reject(response)
				uni.setStorageSync('thishref',thishref);
				var href= 'https://sy.zsicp.com/h5/#/pages/wxauthorize/wxauthorize';  
				console.log("请求接口失败的url",thishref)
			})
	})
	return promise
}

//上传图片接口请求
const uploadFile = (url,method,file) => {
	let token = uni.getStorageSync("token");
	console.log("url",url)
	console.log("method",method)
	// console.log("data",data)
	console.log("file",file)
		let baseDefaultOpts = {
			url: baseUrl + url,
			filePath:file,
			name:'imgurl',
			imgurl:file,
			header:{
				token:token,
			},
			formData:{
				
			},
			method:method,
			//配置请求头
			dataType:'json',
		}
	
	
	let promise = new Promise(function(resolve,reject){
		uni.uploadFile(baseDefaultOpts).then((response) => {
				// const res = JSON.parse(response[1]);
				resolve(response)
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
}

export default{
	baseUrl,
	baseRequest,
	uploadFile
}


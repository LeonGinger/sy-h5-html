getStore() {
	let _this = this
	_this.$axios({
			method: "post", //指定请求方式
			url: "http://swm5.jiedx.cn/entrance/JD/no/menuselect", //请求接口（相对接口，后面会介绍到）
			data: {
				cityId: cityId,
				data: {},
				isDebug: "1",
				longitude: "",
				latitude: ""
			} //欢迎加入全栈开发交流圈一起学习交流：864305860
		})
		.then(function(res) {
			//接口成功返回结果执行
			console.log(res)
		})
		.catch(function(err) { 
			console.log("失败") //请求失败或者接口返回失败或者.then()中的代码发生错误时执行
		})
}
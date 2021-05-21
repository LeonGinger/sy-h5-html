<script>
	import pageAnimation from '@/components/page-animation'
	import wxauthorize from '@/pages/wxauthorize/wxauthorize'
	export default {
		mixins: [pageAnimation],
		onLaunch: function() {
			console.log('App Launch')
			// var token = uni.getStorageSync('token');
			let _this = this
			// if(token == '' || !token){
			// 	console.log("aaa")
			// }
			// _this.wxauthorize.login()
			// _this.wxauthorize.sdsdk()
			// console.log("token",token)
			uni.hideTabBar()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			try {
			    uni.removeStorageSync('storage_key');
			} catch (e) {
			    // error
			}
		},
	}
</script>

<style lang="scss">
	/* 导入uView样式 */
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	@import "static/css/ucss.css";
	body,html{
		height: 0;
	}
	page{
		background-color: #f8f8f8;
	}
	// @font-face {
	// 	font-family: "webfont";
	// 	src: url('~@/static/font/GenJyuuGothic-Medium.ttf') format("truetype");
	// }
	// @font-face {
	// 	font-family: "btfont";
	// 	src: url('~@/static/font/Alibaba-PuHuiTi-Heavy.ttf') format("truetype");
	// }
</style>

<template>
	<view>

	</view>
</template>

<script type="text/javascript">
	// import HTMLParser from "../../common/html-parser.js"
	export default {
		data() {
			return {
				grant_code: '',
				business_name: ''
			}
		},
		onLoad(event) {
			let _this = this
			_this.grant_code = event.grant_code
			console.log(_this.grant_code);
			_this.$api.userinfo().then((res) => {
				console.log(res)
				if (!res.data.phone || res.data.username.length>4) {
					uni.showModal({
						title: '提示',
						content: '请完善信息后再加入商家',
						confirmColor: '#0ABB9A',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url:'../my/modify?grant_code='+_this.grant_code
								})
							} else {
								uni.navigateTo({
									url:'../my/my'
								})
							}
						}
					})
				}
			})

			uni.showModal({
				title: '提示',
				content: "您是否加入该商家？",
				confirmColor: '#0ABB9A',
				success: (res) => {
					if (res.confirm) {
						_this.$api.join_my({
							grant_code: _this.grant_code
						}).then((res) => {
							uni.showToast({
								title: '加入成功',
							});
							uni.switchTab({
								url: "../my/my"
							})



						}).catch((err) => {
							console.log("err", err.data.message)
							// let message =new HTMLParser(err.data.message).data.message;
							// console.log("ww",message);
							uni.showModal({
								title: '提示',
								content: err.data.message,
								confirmColor: '#0ABB9A',
								showCancel: false,
								success: function(res) {
									uni.switchTab({
										url: "../my/my"
									})
								}
							})

						});




					} else {
						uni.switchTab({
							url: "../my/my"
						})
					}

				}
			})

		}
	}
</script>

<style>
</style>

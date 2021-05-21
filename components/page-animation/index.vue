<script>
	import './index.css'
	export default {
		
		// #ifdef H5
		onLaunch: function() {
			// var datapage = document.querySelectorAll('uni-page')
			// console.log(datapage[0].dataset.page)
			// if(datapage[0].dataset.page != '/preview-image'){
				// alert("aaa")
				this.show()
				this.$router.beforeEach((to, from, next) => {
					// if(to.params.urls){
						// console.log("to.params",to.params)
						// console.log("to.meta",to.meta)
						// console.log("from.params",from.params)
						// console.log("from.meta",from.meta)
						// this.show()
						// console.log("Aaa")
					// }else{
						this.hide(next)
						// console.log("fdsfsadfsfas")
					// }
					
				})
				this.$router.afterEach(() => {
					setTimeout(this.show, 200)
				})
			// }else{
			// 	console.log("aaa")
			// }
		},
		
		methods: {
			hide(callback) {
				// console.log(callback)
				// console.log("aa")
				// var datapage = document.querySelectorAll('uni-page')
				const classList = document.querySelector('uni-page').classList
				// console.log("aa",datapage[0].dataset.page)
				// if(datapage[0].dataset.page != '/preview-image'){
					classList.add('animation-before', 'animation-leave')
					classList.remove('animation-show')
					setTimeout(() => {
						classList.remove('animation-before', 'animation-leave')
						callback && callback()
					}, 300)
				// }else{
				// 	classList.remove('animation-show')
				// }
			},
			show() {
				// console.log("bb")
				var datapage = document.querySelectorAll('uni-page')
				const classList = document.querySelector('uni-page').classList
				// console.log("aa",datapage[0].dataset.page)
				// if(datapage[0].dataset.page != '/preview-image'){
					
					classList.add('animation-before')
					setTimeout(() => {
						classList.add('animation-enter', 'animation-after', 'animation-show')
						setTimeout(() => {
							classList.remove('animation-before', 'animation-after', 'animation-enter')
						}, 300)
					}, 20)
				// }else{
				// 	classList.add('animation-enter', 'animation-after', 'animation-show')
				// }
			}
		},
		// #endif
	}
</script>

var app = new Vue({
	el: '#app',
	data: {
		product : 'Socks',
		brand: 'Vue Mastery',
		selectedvariant:0,
		details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
		variants: [
		{
			variantId:2234,
			variantColor:'Green',
			variantImage:'./imgs/vmSocks-green-onWhite.jpg',
			variantQuantity: 3,
		},
		{
			variantId:2235,
			variantColor:'Blue',
			variantImage:'./imgs/vmSocks-blue-onWhite.jpg',
			variantQuantity:0,
		}
		],
		cart:0,
		color:'navyblue',
		color_almost_sold:'orange',
		


	},
	methods: {
		addToCart () {
			if(this.inventory > 0){
				this.cart += 1;
				this.variants[this.selectedvariant].variantQuantity -= 1
			}
			
		},
		updateProduct  (index) {
			this.selectedvariant = index
		},
		removeFromCart () {
			if(this.cart > 0){
			this.cart -= 1
			this.variants[this.selectedvariant].variantQuantity  += 1
		}
		if(this.inventory == 0){
			inStock:false
		}
		}
	},
	computed: {
		title(){
			return this.brand + ' ' + this.product
		},
		image() {
			return this.variants[this.selectedvariant].variantImage
		},
		inventory() {
			return this.variants[this.selectedvariant].variantQuantity
		},
	}
})
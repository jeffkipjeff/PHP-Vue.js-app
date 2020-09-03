
// Product Review Component

Vue.component('product-review', {
	template: `
		<form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
      <b>Please Correct the following error(s): </b>
      <ul>
      <li v-for="error in errors">{{error}}</li>
      </ul>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
	`,
	data() {
      return {
        name: null,
        review: null,
        rating: null,
        errors: []
      }
    },
    methods: {
		onSubmit() {
		if(this.name && this.review && this.rating){
			let productReview = {
		    name: this.name,
		    review: this.review,
		    rating: this.rating
	      }
	      this.$emit('review-submitted',productReview)
	      this.name = null
	      this.review = null
	      this.rating = null
	  }else{
	  	if(!this.name) this.errors.push("Name required")
	  	if(!this.review) this.errors.push("Review required")
	  	if(!this.rating) this.errors.push("Rating required")
	  }
	  	
    }
    }
})

// Product Details Component

Vue.component('product-details', {
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: `
		<ul>
			<li v-for="detail in details">{{detail}}</li>
		</ul>

	`
})

// Products Component

Vue.component('product', {
	props: {
			premium: {
				type: Boolean,
				required: true
			}
		},
	template: `
	<div class="product">
		<div class="product-image">
			<img :src="image">
		</div>
		<div class="product-info">
			<h1 :style="{ color: color }"> {{title}}</h1>
			<p v-show='inventory >= 1 && inventory <10' class="almostSoldOut">Almost Sold Out </p>
			<p v-show='inventory >= 10' class="inStock">In Stock </p>
			<p v-show='inventory  < 1' :class="{ outOfStock: !inventory }" >Out of Stock </p>
			<p> Shipping: {{shipping}} </p>
			<product-details :details="details"></product-details>
			<div v-for="(variant, index) in variants" :key="variant.variantId"
			class="color-box"
			:style="{backgroundColor:variant.variantColor }" @mouseover="updateProduct(index)">
			</div>
			<button v-on:click="addToCart" :disabled="!inventory" :class="{disabledButton: !inventory}" >Add</button>
			<button v-on:click="removeFromCart">Remove</button>

			
		</div>
		<div>
		<h2>Reviews</h2>
		<p v-if="!reviews.length" >There are no reviews yet.</p>
		<ul>
		<li v-for="review in reviews">
		<p>{{review.name}}</p>
		<p>Rating: {{review.rating}}</p>
		<p>Review: {{review.review}}</p>
		</li>
		
		</ul>
		</div>

		<product-review @review-submitted="addReview"></product-review>  
	</div>
	`,
	data() {
		return {
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
		reviews: [],
		color:'navyblue',
		color_almost_sold:'orange',
	} 
	},
	methods: {
		addToCart () {
			if(this.inventory > 0){
				this.$emit('add-to-cart', this.variants[this.selectedvariant].variantId)
				this.variants[this.selectedvariant].variantQuantity -= 1
			}
			
		},
		updateProduct  (index) {
			this.selectedvariant = index
		},
	    addReview(productReview) {
	      this.reviews.push(productReview)
	    },
		removeFromCart () {
			//if(this.variants > 0){
				this.$emit('remove-from-cart', this.variants[this.selectedvariant].variantId)
				this.variants[this.selectedvariant].variantQuantity  += 1
		//}
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
		shipping(){
			if(this.premium){
				return 'Free'
			}else{
				return 2.99
			}
		}

	}

});

var app = new Vue({
	el: '#app',
	data: {
		premium:false,
		cart:[],
	},
	methods: {
		updateCart(id){
			this.cart.push(id);
		},
		removeCartItem(id){
			this.cart.pop(id)
		},
		cart_count(){
			return this.cart.length
		}

	}
	
})
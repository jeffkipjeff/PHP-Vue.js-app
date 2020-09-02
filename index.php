<!DOCTYPE html>
<html>
<head>
	<title>Vue Learn</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<div id="nav-bar"></div>

<div id="app">
	<div class="product">
		<div class="product-image">
			<img :src="image">
		</div>
		<div class="product-info">
			<h1 :style="{ color: color }"> {{title}}</h1>
			<p v-show='inventory >= 1 && inventory <10' class="almostSoldOut">Almost Sold Out </p>
			<p v-show='inventory >= 10' class="inStock">In Stock </p>
			<p v-show='inventory  < 1' :class="{ outOfStock: !inventory }" >Out of Stock </p>
			<ul>
				<li v-for="detail in details">{{detail}}</li>
			</ul>
			<div v-for="(variant, index) in variants" :key="variant.variantId"
			class="color-box"
			:style="{backgroundColor:variant.variantColor }" @mouseover="updateProduct(index)">
			</div>
			<button v-on:click="addToCart" :disabled="!inventory" :class="{disabledButton: !inventory}" >Add</button>
			<button v-on:click="removeFromCart">Remove</button>

			<div class="cart">
				<p>cart {{cart}}</p>
			</div>
		</div>


	
</div>
</div>


<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script type="text/javascript" src="main.js"></script>
</body>
</html>
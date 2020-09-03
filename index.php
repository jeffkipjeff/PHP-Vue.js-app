<!DOCTYPE html>
<html>
<head>
	<title>Vue Learn</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<div id="nav-bar"></div>

<div id="app">
	<div class="cart">
		<p>cart {{cart.length}}</p>
	</div>
	<product :premium="premium" @add-to-cart="updateCart" @remove-from-cart="removeCartItem"></product>
</div>


    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script type="text/javascript" src="main.js"></script>
</body>
</html>
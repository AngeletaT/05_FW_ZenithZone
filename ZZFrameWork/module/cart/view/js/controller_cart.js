var subtotal = 0
var total_extras = 0
var total = 0

function fill_cart() {
	// console.log("fill_cart")
	var access_token = localStorage.getItem("access_token")

	if (access_token) {
		ajaxPromise(friendlyURL("?module=cart"), "POST", "JSON", {
			"access_token": access_token,
			"op": "fill_cart",
		})
			.then(function (data) {
				// console.log(data)
				// return
				$(".cart-usertable").append(`
                <tr>
				    <th style="width: 800px; text-align: left">Product</th>
				    <th style="width: 150px">Price</th>
				    <th style="width: 150px">Quantity</th>
				    <th style="width: 150px">Subtotal</th>
			    </tr>
                `)
				for (var row in data) {
					if (data[row].remaining_stock == 0) {
						subtotal = 0
					} else {
						subtotal = data[row].price_prod * data[row].quantity
					}

					if (data[row].remaining_stock == 0) {
						$(".cart-usertable").append(`
						<tr>
							<td style="width: 800px;">
								<b style="color:gray">${data[row].name_prod}</b>
								<br>
								<span style="color: red">OUT OF STOCK</span>
							</td>
							<td style="width: 150px; text-align: center">${data[row].price_prod}€</td>
							<td style="width: 150px; text-align: center">
								<button class="del_product button-cart" id="${data[row].code_prod}">-</button>
								&nbsp;&nbsp;${data[row].quantity}&nbsp;&nbsp;
								<button class="add_product button-cart" id="${data[row].code_prod}" disabled>+</button>
							</td>
							<td style="width: 150px; text-align: center">${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}€</td>
						</tr>
					`)
					} else if (data[row].remaining_stock[0].remaining_stock == 0) {
						$(".cart-usertable").append(`
						<tr>
							<td style="width: 800px;">
								<b>${data[row].name_prod}</b>
								<br>
								<span style="color: red">Last unit!</span>
							</td>
							<td style="width: 150px; text-align: center">${data[row].price_prod}€</td>
							<td style="width: 150px; text-align: center">
								<button class="del_product button-cart" id="${data[row].code_prod}">-</button>
								&nbsp;&nbsp;${data[row].quantity}&nbsp;&nbsp;
								<button class="add_product button-cart" id="${data[row].code_prod}">+</button>
							</td>
							<td style="width: 150px; text-align: center">${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}€</td>
						</tr>
					`)
					} else if (data[row].remaining_stock[0].remaining_stock <= 10) {
						$(".cart-usertable").append(`
						<tr>
							<td style="width: 800px;">
								<b>${data[row].name_prod}</b>
								<br>
								<span style="color: red">${data[row].remaining_stock[0].remaining_stock} units left</span>
							</td>
							<td style="width: 150px; text-align: center">${data[row].price_prod}€</td>
							<td style="width: 150px; text-align: center">
								<button class="del_product button-cart" id="${data[row].code_prod}">-</button>
								&nbsp;&nbsp;${data[row].quantity}&nbsp;&nbsp;
								<button class="add_product button-cart" id="${data[row].code_prod}">+</button>
							</td>
							<td style="width: 150px; text-align: center">${subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}€</td>
						</tr>
					`)
					} else if (data[row].remaining_stock[0].remaining_stock > 10) {
						$(".cart-usertable").append(`
						<tr>
							<td style="width: 800px;"><b>${data[row].name_prod}</b></td>
							<td style="width: 150px; text-align: center">${data[row].price_prod}€</td>
                    	    <td style="width: 150px; text-align: center">
                    	        <button class="del_product button-cart" id="${data[row].code_prod}">-</button>
                    	        &nbsp;&nbsp;${data[row].quantity}&nbsp;&nbsp;
                    	        <button class="add_product button-cart" id="${data[row].code_prod}">+</button>
                    	    </td>
                    	    <td style="width: 150px; text-align: center">${subtotal
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}€</td>
						</tr>
						`)
					}
				}

				for (var row in data) {
					if (data[row].remaining_stock == 0) {
						subtotal = 0
						total_extras += subtotal
					} else {
						subtotal = data[row].price_prod * data[row].quantity
						total_extras += subtotal
					}
				}

				$(".cart-total").html(`
                    ${total_extras.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}€
                `)

				cart_prop()
			})
			.catch(function (error) {
				console.error(error)
			})
	} else {
		// console.log("No existe access_token")
		$(".cart-usertable").append(`
			<tr>
				<th style="width: 800px; text-align: left">Product</th>
				<th style="width: 150px">Price</th>
				<th style="width: 150px">Quantity</th>
				<th style="width: 150px">Subtotal</th>
			</tr>
			`)
		$(".cart-usertable").append(`
			<tr>
				<td colspan="4" style="text-align: center">No hay productos en el carrito</td>
			</tr>
			`)
		$(".cart-total").html("0€")
		$(".cart-total-prop").html("0€")
		cart_prop()
	}
}

function click() {
	// console.log("click")
	$(document)
		.off("click", ".add_product")
		.on("click", ".add_product", function () {
			console.log("add_prod")
			var code_prod = this.getAttribute("id")
			var add = "add"
			modifyCart(code_prod, add)
		})
	$(document)
		.off("click", ".del_product")
		.on("click", ".del_product", function () {
			console.log("del_prod")
			var code_prod = this.getAttribute("id")
			var del = "del"
			modifyCart(code_prod, del)
		})
	$(document).on("click", ".button-checkout", function () {
		console.log("button-checkout")
		checkout()
	})
	$(document).on("click", ".button-discard", function () {
		console.log("button-discard")
		discard()
	})
}

function modifyCart(code_prod, action) {
	console.log("modifyCart", code_prod)
	var code_prop = localStorage.getItem("code_prop")
	var access_token = localStorage.getItem("access_token")
	// return
	if (access_token) {
		ajaxPromise(friendlyURL("?module=cart"), "POST", "JSON", {
			"code_prod": code_prod,
			"action": action,
			"access_token": access_token,
			"op": "modify_cart",
		})
			.then(function (data) {
				console.log(data)
				// return
				if (data === "added") {
					console.log("Producto añadido al carrito")
					var cartCount = parseInt($(".cart-count").text())
					$(".cart-count").text(cartCount + 1)
				} else if (data === "updated") {
					console.log("Producto ya existe en el carrito")
				} else if (data === "removed") {
					console.log("Producto eliminado del carrito")
					var cartCount = parseInt($(".cart-count").text())
					$(".cart-count").text(cartCount - 1)
				} else {
					console.log("Error en la modificación del carrito")
				}
				$(".cart-usertable").empty()
				$(".cart-total").empty()
				$(".cart-total-prop").empty()
				fill_cart()
				total_extras = 0
			})
			.catch(function (error) {
				console.error(error)
			})
	} else {
		// console.log("No existe access_token")
		localStorage.setItem("redirect_product", code_prop)
		window.location.href = friendlyURL("?module=login")
	}
}

function cart_prop() {
	var access_token = localStorage.getItem("access_token")

	if (access_token) {
		ajaxPromise(friendlyURL("?module=cart"), "POST", "JSON", {
			"access_token": access_token,
			"op": "cart_prop",
		})
			.then(function (data) {
				// console.log(data)
				// return
				if (data === "error") {
					$(".cart-property").text("No hay propiedad seleccionada")
					$(".cart-prop-price").text("0€")
					$(".cart-total-prop").text("0€")
				} else {
					$(".cart-property").text(data[0].name_prop)
					$(".cart-prop-price").text(data[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€")
					// console.log("total_Extras", total_extras)
					// console.log("precio propiedad", total)
					total = parseInt(data[0].price) + parseInt(total_extras)
					// console.log(total)
					$(".cart-total-prop").html(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€")
				}
			})
			.catch(function (error) {
				console.error(error)
			})
	} else {
		// console.log("No existe access_token")
		$(".cart-property").text("No hay propiedad seleccionada")
		$(".cart-prop-price").text("0€")
		$(".cart-total-prop").text("0€")
	}
}

function checkout() {
	var access_token = localStorage.getItem("access_token")

	if (access_token) {
		ajaxPromise(friendlyURL("?module=cart"), "POST", "JSON", {
			"access_token": access_token,
			"op": "checkout",
		})
			.then(function (data) {
				// console.log(data)
				// return
				if (data === "done") {
					console.log("Compra realizada")
					toastr.success("Compra realizada")
					$(".cart-usertable").empty()
					$(".cart-total").empty()
					$(".cart-total-prop").empty()
					fill_cart()
					total_extras = 0
					$(".cart-count").text("0")
					$(".cart-property").text("No hay propiedad seleccionada")
					$(".cart-prop-price").text("0€")
					$(".cart-total-prop").text("0€")
				} else {
					console.log("Error en la compra")
				}
			})
			.catch(function (error) {
				console.error(error)
			})
	} else {
		// console.log("No existe access_token")
		window.location.href = friendlyURL("?module=login")
	}
}

function discard() {
	var access_token = localStorage.getItem("access_token")

	if (access_token) {
		ajaxPromise(friendlyURL("?module=cart"), "POST", "JSON", {
			"access_token": access_token,
			"op": "discard",
		})
			.then(function (data) {
				// console.log(data)
				// return
				if (data === "discard") {
					console.log("Carrito vaciado")
					toastr.warning("Carrito vaciado")
					$(".cart-usertable").empty()
					$(".cart-total").empty()
					fill_cart()
					total_extras = 0
					$(".cart-count").text("0")
					$(".cart-property").text("No hay propiedad seleccionada")
					$(".cart-prop-price").text("0€")
					$(".cart-total-prop").text("0€")
				} else {
					console.log("Error al vaciar el carrito")
				}
			})
			.catch(function (error) {
				console.error(error)
			})
	} else {
		// console.log("No existe access_token")
		window.location.href = friendlyURL("?module=login")
	}
}

$(document).ready(function () {
	// console.log("ready")
	fill_cart()
	click()
})

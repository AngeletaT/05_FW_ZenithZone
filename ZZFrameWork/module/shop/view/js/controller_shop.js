function loadprops() {
	// ajaxForSearch("module/shop/controller/controller_shop.php?op=all_prop");
	// console.log("loadprops")
	var filters_home = JSON.parse(localStorage.getItem("filters_home")) || false
	var filters_details = JSON.parse(localStorage.getItem("filters_details")) || false
	var filters_shop = JSON.parse(localStorage.getItem("filters_shop")) || false
	var redirect_like = localStorage.getItem("redirect_like") || false
	// var filters_search = JSON.parse(localStorage.getItem("filters_search")) || false (funciona con filters_Shop)

	if (filters_home !== false) {
		ajaxForSearch(friendlyURL("?module=shop"), "filters_home")
		pagination()
	} else if (filters_details !== false) {
		// console.log(filters_details[0].property[0]);
		loadDetails(filters_details[0].property[0])
	} else if (filters_shop !== false) {
		ajaxForSearch_Shop(friendlyURL("?module=shop"), "filters_shop")
		// console.log("filtershop")
		highlight_filters()
		// pagination()
	} else if (redirect_like !== false) {
		console.log("LOADPROPS redirect_like")
		loadDetails(redirect_like)
		localStorage.removeItem("redirect_like")
	} else {
		ajaxForSearch(friendlyURL("?module=shop"), "all_prop")
		// console.log("allprop")
	}
}
var userLiked = "no-like"

// #region AJAX
// FUNCION QUE LLAMA A SALTO HOME
function ajaxForSearch(url, op, items_page = 2) {
	var filters_home = JSON.parse(localStorage.getItem("filters_home"))
	var access_token = localStorage.getItem("access_token")
	localStorage.removeItem("filters_home")
	// console.log("filters home:", filters_home)
	// console.log(url)

	var page = 1
	if (localStorage.getItem("page")) {
		page = parseInt(localStorage.getItem("page"))
	}

	var offset = (page - 1) * items_page
	// console.log(offset)

	ajaxPromise(url, "POST", "JSON", {"filters_home": filters_home, "offset": offset, "items_page": items_page, "op": op})
		.then(function (data) {
			// console.log("Los datos del AjaxForSearch:", data)
			// return
			$("#content_shop_prop").empty()
			$(".date_img" && ".date_prop").empty()
			$("#mapdet").hide()
			$("#container-cart").hide()

			if (data === "error") {
				$("<div></div>")
					.appendTo("#content_shop_prop")
					.html("<h3>¡No se encuentran resultados con los filtros aplicados!</h3>")
			} else {
				for (var row in data) {
					;(function (row) {
						setTimeout(function () {
							// console.log("Row:", row)
							// Crear una función para capturar el valor de row
							if (access_token) {
								console.log("Existe access_token")
								var carousel = ""
								data[row].images.forEach(function (image) {
									// console.log("image:", image)
									carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
								})
								checkLike(data[row].code_prop, access_token)
									.then(function (userLiked) {
										// console.log("userLiked", userLiked)
										// return
										$("<div></div>")
											.attr({"id": data[row].code_prop, "class": "propertytable"})
											.appendTo("#content_shop_prop").html(`
                	    					    <table>
                	    					        <tr>
														<td rowspan="7" class="imagen">
                										    <div class="owl-container imagen shop">
                										        <div class="owl-list owl-carousel owl-theme imagen shop">
                										            ${carousel}
                										        </div>
                										    </div>
                										</td>
                	    					            <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
															<h2>${data[row].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;
															<i class="fa-solid fa-euro-sign"></i></h2></a>
														</td>
                	    					        </tr>
                	    					        <tr>
														<td colspan="8"><h5>${data[row].name_prop}</h5</td>
													</tr>
													<tr>
														<td colspan="8">${data[row].description}</td>
													</tr>
                	    					        <tr>
                	    					            <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                	    					            <td class="text">${data[row].rooms}</td>
                	    					            <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                	    					            <td class="text">${data[row].baths}</td>
                	    					            <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                	    					            <td class="text">${data[row].name_cat}</td>
                	    					        </tr>
                	    					        <tr>
                	    					            <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                	    					            <td class="text">${data[row].m2}</td>
                	    					            <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                	    					            <td class="text">${data[row].name_city}</td>
                	    					            <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                	    					            <td class="text">${data[row].name_extra}</td>
                	    					        </tr>
													<tr>
                	    					            <td colspan='4'>
                	    					                <button id='${data[row].code_prop}' 
															class='more_info_list Button_principal'>More Info</button>
                	    					            </td>
														<td>
															<button id='${data[row].code_prop}' class="carrito Button_segundario">
																<i class="fa fa-shopping-cart" aria-hidden="true"></i>
															</button>
														</td>
														<td class="like-content">
															<button id='${data[row].code_prop}'class="${userLiked}">
															<i class="fa fa-heart" aria-hidden="true"></i>${data[row].likes}
														</td>
													</tr>
                	    					    </table>
											`)
										$(".owl-list").owlCarousel({
											loop: true,
											autoplay: true,
											margin: 10,
											nav: true,
											dots: false,
											responsive: {
												0: {
													items: 1,
												},
												600: {
													items: 1,
												},
												1000: {
													items: 1,
												},
											},
										})
									})
									.catch(function (error) {
										console.error("Error en checkLike:", error)
									})
							} else {
								// console.log("No existe access_token")
								var carousel = ""
								data[row].images.forEach(function (image) {
									// console.log("image:", image)
									carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
								})
								$("<div></div>")
									.attr({"id": data[row].code_prop, "class": "propertytable"})
									.appendTo("#content_shop_prop").html(`
                	        			<table>
                	        			    <tr>
												<td rowspan="7" class="imagen">
                								    <div class="owl-container imagen shop">
                								        <div class="owl-list owl-carousel owl-theme imagen shop">
                								            ${carousel}
                								        </div>
                								    </div>
                								</td>
                	        			        <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
													<h2>${data[row].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;
													<i class="fa-solid fa-euro-sign"></i></h2></a>
												</td>
                	        			    </tr>
                	        			    <tr>
												<td colspan="8"><h5>${data[row].name_prop}</h5</td>
											</tr>
											<tr>
												<td colspan="8">${data[row].description}</td>
											</tr>
                	        			    <tr>
                	        			        <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                	        			        <td class="text">${data[row].rooms}</td>
                	        			        <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                	        			        <td class="text">${data[row].baths}</td>
                	        			        <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                	        			        <td class="text">${data[row].name_cat}</td>
                	        			    </tr>
                	        			    <tr>
                	        			        <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                	        			        <td class="text">${data[row].m2}</td>
                	        			        <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                	        			        <td class="text">${data[row].name_city}</td>
                	        			        <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                	        			        <td class="text">${data[row].name_extra}</td>
                	        			    </tr>
											<tr>
                	        			        <td colspan='4'>
                	        			            <button id='${data[row].code_prop}' 
													class='more_info_list Button_principal'>More Info</button>
                	        			        </td>
												<td>
													<button id='${data[row].code_prop}' class="carrito Button_segundario">
														<i class="fa fa-shopping-cart" aria-hidden="true"></i>
													</button>
												</td>
												<td class="like-content">
													<button id='${data[row].code_prop}'class="like-review Button_segundario">
													<i class="fa fa-heart" aria-hidden="true"></i>${data[row].likes}</button>
												</td>
											</tr>
                	        			</table>
									`)
								$(".owl-list").owlCarousel({
									loop: true,
									autoplay: true,
									margin: 10,
									nav: true,
									dots: false,
									responsive: {
										0: {
											items: 1,
										},
										600: {
											items: 1,
										},
										1000: {
											items: 1,
										},
									},
								})
							}
						}, 1000) // 1 segundo de espera
					})(row) // Pasar el valor actual de row a la función anónima
				}
			}

			if (localStorage.getItem("id")) {
				document.getElementById(move_id).scrollIntoView()
			}

			load_map_shop(data)
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

// FUNCION QUE LLAMA A CARGAR SHOP
function ajaxForSearch_Shop(url, op, items_page = 2) {
	var filters_shop = JSON.parse(localStorage.getItem("filters_shop"))
	var access_token = localStorage.getItem("access_token")

	// console.log(filters_shop)

	console.log("offset es:", offset)

	var page = 1
	if (localStorage.getItem("page")) {
		page = parseInt(localStorage.getItem("page"))
	}

	var offset = (page - 1) * items_page
	console.log(offset)

	ajaxPromise(url, "POST", "JSON", {"filters_shop": filters_shop, "offset": offset, "items_page": items_page, "op": op})
		.then(function (data) {
			// console.log("Los datos del AjaxForSearch_Shop:", data)
			// return
			$("#content_shop_prop").empty()
			$(".date_img" && ".date_prop").empty()
			$("#mapdet").hide()
			$("#container-cart").hide()

			if (data === "error") {
				$("<div></div>")
					.appendTo("#content_shop_prop")
					.html("<h3>¡No se encuentran resultados con los filtros aplicados!</h3>")
			} else {
				// console.log(data)
				for (var row in data) {
					;(function (row) {
						setTimeout(function () {
							console.log("Row:", row)
							// Crear una función para capturar el valor de row
							if (access_token) {
								console.log("Existe access_token")
								var carousel = ""
								data[row].images.forEach(function (image) {
									carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
								})
								checkLike(data[row].code_prop, access_token)
									.then(function (userLiked) {
										console.log("userLiked", userLiked)
										$("<div></div>")
											.attr({"id": data[row].code_prop, "class": "propertytable"})
											.appendTo("#content_shop_prop").html(`
                	    			    <table>
                	    			        <tr>
												<td rowspan="7" class="imagen">
                								    <div class="owl-container imagen shop">
                								        <div class="owl-list owl-carousel owl-theme imagen shop">
                								            ${carousel}
                								        </div>
                								    </div>
                								</td>
                	    			            <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
													<h2>${data[row].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;
													<i class="fa-solid fa-euro-sign"></i></h2></a>
												</td>
                	    			        </tr>
                	    			        <tr>
												<td colspan="8"><h5>${data[row].name_prop}</h5</td>
											</tr>
											<tr>
												<td colspan="8">${data[row].description}</td>
											</tr>
                	    			        <tr>
                	    			            <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                	    			            <td class="text">${data[row].rooms}</td>
                	    			            <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                	    			            <td class="text">${data[row].baths}</td>
                	    			            <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                	    			            <td class="text">${data[row].name_cat}</td>
                	    			        </tr>
                	    			        <tr>
                	    			            <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                	    			            <td class="text">${data[row].m2}</td>
                	    			            <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                	    			            <td class="text">${data[row].name_city}</td>
                	    			            <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                	    			            <td class="text">${data[row].name_extra}</td>
                	    			        </tr>
											<tr>
                	    			            <td colspan='4'>
                	    			                <button id='${data[row].code_prop}' 
													class='more_info_list Button_principal'>More Info</button>
                	    			            </td>
												<td>
													<button id='${data[row].code_prop}' class="carrito Button_segundario">
														<i class="fa fa-shopping-cart" aria-hidden="true"></i>
													</button>
												</td>
												<td class="like-content">
													<button id='${data[row].code_prop}'class="${userLiked}">
													<i class="fa fa-heart" aria-hidden="true"></i>${data[row].likes}</button>
												</td>
											</tr>
                	    			    </table>
											`)
										$(".owl-list").owlCarousel({
											loop: true,
											autoplay: true,
											margin: 10,
											nav: true,
											dots: false,
											responsive: {
												0: {
													items: 1,
												},
												600: {
													items: 1,
												},
												1000: {
													items: 1,
												},
											},
										})
									})
									.catch(function (error) {
										console.error("Error en checkLike:", error)
									})
							} else {
								console.log("No existe access_token")
								var carousel = ""
								data[row].images.forEach(function (image) {
									carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
								})
								$("<div></div>")
									.attr({"id": data[row].code_prop, "class": "propertytable"})
									.appendTo("#content_shop_prop").html(`
                	        			<table>
                	        			    <tr>
												<td rowspan="7" class="imagen">
                								    <div class="owl-container imagen shop">
                								        <div class="owl-list owl-carousel owl-theme imagen shop">
                								            ${carousel}
                								        </div>
                								    </div>
                								</td>
                	        			        <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
													<h2>${data[row].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;
													<i class="fa-solid fa-euro-sign"></i></h2></a>
												</td>
                	        			    </tr>
                	        			    <tr>
												<td colspan="8"><h5>${data[row].name_prop}</h5</td>
											</tr>
											<tr>
												<td colspan="8">${data[row].description}</td>
											</tr>
                	        			    <tr>
                	        			        <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                	        			        <td class="text">${data[row].rooms}</td>
                	        			        <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                	        			        <td class="text">${data[row].baths}</td>
                	        			        <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                	        			        <td class="text">${data[row].name_cat}</td>
                	        			    </tr>
                	        			    <tr>
                	        			        <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                	        			        <td class="text">${data[row].m2}</td>
                	        			        <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                	        			        <td class="text">${data[row].name_city}</td>
                	        			        <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                	        			        <td class="text">${data[row].name_extra}</td>
                	        			    </tr>
											<tr>
                	        			        <td colspan='4'>
                	        			            <button id='${data[row].code_prop}' 
													class='more_info_list Button_principal'>More Info</button>
                	        			        </td>
												<td>
													<button id='${data[row].code_prop}' class="carrito Button_segundario">
														<i class="fa fa-shopping-cart" aria-hidden="true"></i>
													</button>
												</td>
												<td class="like-content">
													<button id='${data[row].code_prop}'class="like-review Button_segundario">
													<i class="fa fa-heart" aria-hidden="true"></i>${data[row].likes}</button>
												</td>
											</tr>
                	        			</table>
									`)
								$(".owl-list").owlCarousel({
									loop: true,
									autoplay: true,
									margin: 10,
									nav: true,
									dots: false,
									responsive: {
										0: {
											items: 1,
										},
										600: {
											items: 1,
										},
										1000: {
											items: 1,
										},
									},
								})
							}
						}, 1000) // 1 segundo de espera
					})(row) // Pasar el valor actual de row a la función anónima
				}

				if (localStorage.getItem("id")) {
					document.getElementById(move_id).scrollIntoView()
				}
				load_map_shop(data)
			}
		})
		.catch(function (e) {
			console.error(e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

// #region DETAILS
// FUNCION QUE LLAMA A CARGAR DETAILS
function clicks() {
	$(document).on("click", ".more_info_list", function () {
		var code_prop = this.getAttribute("id")
		localStorage.setItem("code_prop", code_prop)
		// console.log(code_prop);
		loadDetails(code_prop)
		loadCarrito(code_prop)
		loadSuggestionsDetails()
	})
	$(document).on("click", ".carrito", function () {
		var code_prop = this.getAttribute("id")
		localStorage.setItem("code_prop", code_prop)
		// console.log(code_prop);
		loadDetails(code_prop)
		loadCarrito(code_prop)
		loadSuggestionsDetails()
	})
	$(document).on("click", "#load_more_props", function () {
		limit += 3
		console.log("limit:", limit)
		$("#title-suggestions").empty()
		$("#button-suggestions").empty()
		$("#suggestions").empty()
		loadSuggestionsDetails()
	})
}

function loadDetails(code_prop) {
	var access_token = localStorage.getItem("access_token")
	localStorage.removeItem("filters_details")

	ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {"code_prop": code_prop, "op": "details_prop"})
		.then(function (data) {
			// console.log(data)
			// return
			$("#content_shop_prop").empty()
			$("#filters_shop").empty()
			$(".shopdiv").empty()
			$(".date_img_dentro").empty()
			$(".date_prop_dentro").empty()
			$(".orderbyshop").empty()
			$("#mapdet").show()
			$("#container-cart").show()

			if (access_token) {
				// console.log(data)
				checkLike(data[0].code_prop, access_token).then(function (userLiked) {
					// console.log("userLiked", userLiked)
					for (row in data[0].images) {
						$("<div></div>").attr({class: "item date_img_dentro"}).appendTo(".date_img").html(`
						<div class='detailsimg'>
							<img src='${data[0].images[row]}'></img>
						</div>`)
					}

					$("<div></div>")
						.attr({"id": data[0].code_prop, class: "date_prop_dentro"})
						.appendTo(".date_prop").html(`<div class="list_product_details">
							<div class="product-info_details">
							<div class="product-content_details detailstable">
								<br />
								<h1>
									<b>${data[0].name_prop}</b>
								</h1>
								<hr class="hr-shop" />
								<table id="table-shop" class="tabledetails">
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-bed fa-2xl"></i>
										</td>
										<td class="text">${data[0].rooms}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-bath fa-2xl"></i>
										</td>
										<td class="text">${data[0].baths}</td>
									</tr>
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-expand fa-2xl"></i>
										</td>
										<td class="text">${data[0].m2}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-key fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_cat}</td>
									</tr>
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-house fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_type}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-plus fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_extra}</td>
									</tr>
								</table>
								<br />
								<h3>
									<b>More Information:</b>
								</h3>
								<p>${data[0].description}</p>
								<br />
								<hr class="hr-shop" />
								<div class="buttons_details">
									<span class="button" id="price_details" style="font-size: 24px;">
										${data[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} &nbsp;
										<i class="fa-solid fa-euro-sign"></i>
									</span>
									<br />
									<br />
									<table class="tablebuttons">
										<tr>
                                			<td>
                                			    <button id='${data[0].code_prop}' 
												class='Button_principal contact'>Contacta</button>
                                			</td>
											<td class="like-content">
												<button id='${data[0].code_prop}'class="${userLiked}">												
												<i class="fa fa-heart" aria-hidden="true"></i> ${data[0].likes}</button>
											</td>
										</tr>
                        			</table>
								</div>
							</div>
						</div>
					</div>
					`)
					$(".owl-details").owlCarousel({
						loop: true,
						autoplay: true,
						margin: 10,
						nav: false,
						dots: true,
						responsive: {
							0: {
								items: 1,
							},
							600: {
								items: 2,
							},
							1000: {
								items: 2,
							},
						},
					})
					load_map_details(data[0])
				})
			} else {
				// console.log("en el else", data)

				// return
				for (row in data[0].images) {
					$("<div></div>").attr({class: "item date_img_dentro"}).appendTo(".date_img").html(`
						<div class='detailsimg'>
							<img src='${data[0].images[row]}'></img>
						</div>`)
				}

				$("<div></div>")
					.attr({"id": data[0].code_prop, class: "date_prop_dentro"})
					.appendTo(".date_prop")
					.html(
						`<div class="list_product_details">
							<div class="product-info_details">
							<div class="product-content_details detailstable">
								<br />
								<h1>
									<b>${data[0].name_prop}</b>
								</h1>
								<hr class="hr-shop" />
								<table id="table-shop" class="tabledetails">
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-bed fa-2xl"></i>
										</td>
										<td class="text">${data[0].rooms}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-bath fa-2xl"></i>
										</td>
										<td class="text">${data[0].baths}</td>
									</tr>
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-expand fa-2xl"></i>
										</td>
										<td class="text">${data[0].m2}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-key fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_cat}</td>
									</tr>
									<tr>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-house fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_type}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-plus fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_extra}</td>
									</tr>
									<tr>
										<td class="icon">
											<i class="fa-solid fa-person-running fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_act}</td>
										<td class="icon">
											<i id="col-ico" class="fa-solid fa-map-marker-alt fa-2xl"></i>
										</td>
										<td class="text">${data[0].name_city}</td>
									</tr>
								</table>
								<br />
								<h3>
									<b>More Information:</b>
								</h3>
								<p>${data[0].description}</p>
								<br />
								<hr class="hr-shop" />
								<div class="buttons_details">
									<span class="button" id="price_details" style="font-size: 24px;">
										${data[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} &nbsp;
										<i class="fa-solid fa-euro-sign"></i>
									</span>
									<br />
									<br />
									<table class="tablebuttons">
										<tr>
                                			<td>
                                			    <button id='${data[0].code_prop}' 
												class='Button_principal contact'>Contacta</button>
                                			</td>
											<td class="like-content">
												<button id='${data[0].code_prop}'class="like-review Button_segundario">
												<i class="fa fa-heart" aria-hidden="true"></i> ${data[0].likes}</button>
											</td>
										</tr>
                        			</table>
								</div>
							</div>
						</div>
					</div>`
					)
				$(".owl-details").owlCarousel({
					loop: true,
					autoplay: true,
					margin: 10,
					nav: false,
					dots: true,
					responsive: {
						0: {
							items: 1,
						},
						600: {
							items: 2,
						},
						1000: {
							items: 2,
						},
					},
				})
				load_map_details(data[0])
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
		})
}

var limit = 3
function loadSuggestionsDetails() {
	// console.log("loadSuggestionsDetails")
	ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {
		"limit": limit,
		"code_prop": localStorage.getItem("code_prop"),
		"op": "scroll_details",
	})
		.then(function (sdata) {
			// console.log("then:", sdata)
			$('<h2 class="cat">Properties related</h2>').appendTo("#title-suggestions")

			if (sdata.length >= limit) {
				$('<button class="load_more_button Button_principal" id="load_more_props">LOAD MORE</button>').appendTo(
					"#button-suggestions"
				)
			}

			for (row in sdata) {
				$("<div></div>").attr({class: "cardtypeproperty detai"}).appendTo("#suggestions").html(`
				<img src=${sdata[row].img_prop} alt='foto'/>
				<div class='card-content'>
				<h2>${sdata[row].name_prop}</h2>
				<a class='button clicksuggest' id="${sdata[row].code_prop}">Find out more<i class='bi bi-arrow-right'></i></a>
				</div>
				`)
			}
			// localStorage.removeItem("code_prop")
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Suggestions_Details SHOP";
		})
}

// CARRITO
function loadCarrito(code_prop) {
	console.log("loadCarrito", code_prop)
	ajaxPromise(friendlyURL("?module=cart"), "POST", "JSON", {"code_prop": code_prop, "op": "cart_products"})
		.then(function (data) {
			console.log(data)
			// return
			for (var row in data) {
				$(".cart-table").append(`
					<tr>
						<td style="width: 800px;"><b>${data[row].name_prod}</b></td>
						<td style="width: 150px; text-align: center">${data[row].price_prod}€</td>
						<td style="width: 20px;"><button class="btn Button_principal"><i class="fas fa-shopping-cart"></i></button></td>
						<td style="width: 20px;"><button class="btn Button_principal"><i class="fas fa-trash"></i></button></td>
					</tr>
				`)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Carrito SHOP";
		})
}

// #region FILTROS
// FUNCION QUE IMPRIME LOS FILTROS
function print_filters() {
	// console.log("print_filters");
	$(
		'<div class="banner-filters" style="display: flex; flex-direction: row; justify-content: space-between;"></div>'
	).appendTo(".filters-select").html(`
				<select class="form-select filter_type" id="filter_type">
					<option value="0" selected disabled>Type</option>
					
				</select>
				<select class="form-select filter_location" id="filter_location">
					<option value="0" selected disabled>Location</option>
					
				</select>
				<select class="form-select filter_category" id="filter_category">
					<option value="0" selected disabled>Category</option>
					
				</select>
				<button class="form-select filter_rooms buttonroom" id="filter_rooms">
					Rooms		
				</button>
				<button class="form-select filter_bath buttonbath" id="filter_bath">
					Bath					
				</button>
				<button class="form-select filter_size buttonsize" id="filter_size">
					Size
				</button>
				<button class="form-select filter_price buttonprice" id="filter_price">
					Price
				</button>
				<button class="form-select filter_extra" id="filter_extra">
					Extras					
				</button>
				<select class="form-select filter_activity" id="filter_activity">
					<option value="0" selected disabled>Activities</option>
				</select>
				
				<button class="filter_remove Button_segundario" id="Remove_filter">Remove</button>
				`)
	$
	print_type()
	print_location()
	print_category()
	// print_extra();
	print_activity()
	modalrooms()
	modalbath()
	modalsize()
	modalprice()
	modalextra()

	$(document).on("click", "#Remove_filter", function () {
		remove_filter()
	})
}

function print_type() {
	// console.log("print_dynamic_filters")
	ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {"op": "dynamic_filters_type"})
		.then(function (data) {
			// console.log(data)
			// return
			for (row in data) {
				$("<option></option>").attr({value: data[row].code_type}).appendTo("#filter_type").html(data[row].name_type)
			}
			var selectedOption = localStorage.getItem("filter_type")
			if (selectedOption) {
				$("#filter_type").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

function print_location() {
	// console.log("print_dynamic_filters")
	ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {"op": "dynamic_filters_city"})
		.then(function (data) {
			// console.log(data);
			for (row in data) {
				$("<option></option>").attr({value: data[row].code_city}).appendTo("#filter_location").html(data[row].name_city)
			}
			var selectedOption = localStorage.getItem("filter_location")
			if (selectedOption) {
				$("#filter_location").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

function print_category() {
	// console.log("print_dynamic_filters")
	ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {"op": "dynamic_filters_category"})
		.then(function (data) {
			for (row in data) {
				// console.log(data);
				$("<option></option>").attr({value: data[row].code_cat}).appendTo("#filter_category").html(data[row].name_cat)
			}
			var selectedOption = localStorage.getItem("filter_category")
			if (selectedOption) {
				$("#filter_category").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

// function print_extra() {
// 	// console.log("print_dynamic_filters")
// 	ajaxPromise("module/shop/controller/controller_shop.php?op=dynamic_filters_extra", "GET", "JSON")
// 		.then(function (data) {
// 			for (row in data) {
// 				// console.log(data);
// 				$("<option></option>").attr({value: data[row].code_extra}).appendTo("#filter_extra").html(data[row].name_extra)
// 			}
// 			var selectedOption = localStorage.getItem("filter_extra")
// 			if (selectedOption) {
// 				$("#filter_extra").val(selectedOption)
// 			}
// 		})
// 		.catch(function (error) {
// 			console.error(error)
// 			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
// 		})
// }

function print_activity() {
	// console.log("print_dynamic_filters")
	ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {"op": "dynamic_filters_activity"})
		.then(function (data) {
			for (row in data) {
				// console.log(data);
				$("<option></option>").attr({value: data[row].code_act}).appendTo("#filter_activity").html(data[row].name_act)
			}
			var selectedOption = localStorage.getItem("filter_activity")
			if (selectedOption) {
				$("#filter_activity").val(selectedOption)
			}
		})
		.catch(function (error) {
			console.error(error)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Print_Dynamic_Filters SHOP";
		})
}

// #region MODAL FILTRO
// MODALES
function modalrooms() {
	$("#filter_rooms").click(function () {
		$("#filtersModalRoom").modal("show")
		localStorage.setItem("filter_rooms", this.value)
		// console.log("modalrooms");
	})

	$("#ApplyFiltersRoom").click(function () {
		// console.log("modalrooms")
		var selectedValueroom = $('input[name="rooms"]:checked').val()
		localStorage.setItem("filter_rooms", selectedValueroom)
		$("#filtersModalRoom").modal("hide")
		applyFilters()
	})
	if (localStorage.getItem("filter_rooms")) {
		$(".filter_rooms").val(localStorage.getItem("filter_rooms"))
	}

	$("#CloseFiltersRoom").click(function () {
		$("#filtersModalRoom").modal("hide")
	})
}

function modalbath() {
	$("#filter_bath").click(function () {
		$("#filtersModalBath").modal("show")
		localStorage.setItem("filter_bath", this.value)
		// console.log("modalbath");
	})

	$("#ApplyFiltersBath").click(function () {
		// console.log("modalbath")
		var selectedValuebath = $('input[name="bath"]:checked').val()
		localStorage.setItem("filter_bath", selectedValuebath)
		$("#filtersModalBath").modal("hide")
		applyFilters()
	})
	if (localStorage.getItem("filter_bath")) {
		$(".filter_bath").val(localStorage.getItem("filter_bath"))
	}

	$("#CloseFiltersBath").click(function () {
		$("#filtersModalBath").modal("hide")
	})
}

var selectedValuesize
function modalsize() {
	$(document).ready(function () {
		$("#rangeSlidersize").on("input", function () {
			selectedValuesize = $(this).val()
			// console.log(selectedValuesize)
			$("#selectedValuesize").text(selectedValuesize)
		})

		$("#filter_size").click(function () {
			$("#filtersModalSize").modal("show")
		})

		$("#ApplyFiltersSize").click(function () {
			// console.log("modalsize")
			localStorage.setItem("filter_size", selectedValuesize)
			$("#filtersModalSize").modal("hide")
			applyFilters()
		})

		$("#CloseFiltersSize").click(function () {
			$("#filtersModalSize").modal("hide")
		})
	})
}

var selectedValueprice
function modalprice() {
	$(document).ready(function () {
		$("#rangeSliderprice").on("input", function () {
			selectedValueprice = $(this).val()
			// console.log(selectedValueprice)
			$("#selectedValueprice").text(selectedValueprice)
		})

		$("#filter_price").click(function () {
			$("#filtersModalPrice").modal("show")
		})

		$("#ApplyFiltersPrice").click(function () {
			// console.log("modalprice")
			localStorage.setItem("filter_price", selectedValueprice)
			$("#filtersModalPrice").modal("hide")
			applyFilters()
		})

		$("#CloseFiltersPrice").click(function () {
			$("#filtersModalPrice").modal("hide")
		})
	})
}

function modalextra() {
	$("#filter_extra").click(function () {
		$("#filtersModalExtra").modal("show")
	})

	$("#ApplyFiltersExtra").click(function () {
		var extraValues = $("input[name='extra[]']:checked")
			.map(function () {
				return parseInt(this.value) // Convierte el valor a un entero
			})
			.get()
		localStorage.setItem("filter_extra", JSON.stringify(extraValues))
		$("#filtersModalExtra").modal("hide")
		// applyFilters()
	})
	if (localStorage.getItem("filter_extra")) {
		var extraValues = JSON.parse(localStorage.getItem("filter_extra"))
		$(".filter_extra").val(extraValues.join(", "))
	}

	$("#CloseFiltersExtra").click(function () {
		$("#filtersModalExtra").modal("hide")
	})
}

// #region FUNCIONES DE FILTROS
// FUNCIONES DE FILTROS
function filters_shop() {
	// console.log("filters_shop");

	$(".filter_type").change(function () {
		localStorage.setItem("filter_type", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_type")) {
		$(".filter_type").val(localStorage.getItem("filter_type"))
	}

	$(".filter_location").change(function () {
		localStorage.setItem("filter_location", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_location")) {
		$(".filter_location").val(localStorage.getItem("filter_location"))
	}

	$(".filter_category").change(function () {
		localStorage.setItem("filter_category", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_category")) {
		$(".filter_category").val(localStorage.getItem("filter_category"))
	}

	$(".filter_rooms").change(function () {
		localStorage.setItem("filter_rooms", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_rooms")) {
		$(".filter_rooms").val(localStorage.getItem("filter_rooms"))
	}

	$(".filter_bath").change(function () {
		localStorage.setItem("filter_bath", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_bath")) {
		$(".filter_bath").val(localStorage.getItem("filter_bath"))
	}

	$(".filter_size").change(function () {
		localStorage.setItem("filter_size", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_size")) {
		$(".filter_size").val(localStorage.getItem("filter_size"))
	}

	$(".filter_price").change(function () {
		localStorage.setItem("filter_price", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_price")) {
		$(".filter_price").val(localStorage.getItem("filter_price"))
	}

	$(".filter_extra").change(function () {
		localStorage.setItem("filter_extra", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_extra")) {
		$(".filter_extra").val(localStorage.getItem("filter_extra"))
	}

	$(".filter_activity").change(function () {
		localStorage.setItem("filter_activity", this.value)
		applyFilters()
	})
	if (localStorage.getItem("filter_activity")) {
		$(".filter_activity").val(localStorage.getItem("filter_activity"))
	}
}

function applyFilters() {
	// console.log("applyFilters")
	var filters_shop = []

	localStorage.removeItem("filters")

	if (localStorage.getItem("filter_type")) {
		filters_shop.push(["code_type", localStorage.getItem("filter_type")])
		// localStorage.removeItem("filter_type");
	}
	if (localStorage.getItem("filter_category")) {
		filters_shop.push(["code_cat", localStorage.getItem("filter_category")])
		// localStorage.removeItem("filter_category");
	}
	if (localStorage.getItem("filter_location")) {
		filters_shop.push(["code_city", localStorage.getItem("filter_location")])
		// localStorage.removeItem("filter_location");
	}
	if (localStorage.getItem("filter_rooms")) {
		filters_shop.push(["rooms", localStorage.getItem("filter_rooms")])
		// localStorage.removeItem("filter_rooms");
	}
	if (localStorage.getItem("filter_bath")) {
		filters_shop.push(["baths", localStorage.getItem("filter_bath")])
		// localStorage.removeItem("filter_bath");
	}
	if (localStorage.getItem("filter_size")) {
		filters_shop.push(["m2", localStorage.getItem("filter_size")])
		// localStorage.removeItem("filter_size");
	}
	if (localStorage.getItem("filter_price")) {
		filters_shop.push(["price", localStorage.getItem("filter_price")])
		// localStorage.removeItem("filter_price");
	}
	if (localStorage.getItem("filter_extra")) {
		filters_shop.push(["code_extra", JSON.parse(localStorage.getItem("filter_extra"))])
		// localStorage.removeItem("filter_extra");
	}
	if (localStorage.getItem("filter_activity")) {
		filters_shop.push(["code_act", localStorage.getItem("filter_activity")])
		// localStorage.removeItem("filter_activity");
	}

	localStorage.setItem("filters_shop", JSON.stringify(filters_shop))
	location.reload()
}

function highlight_filters() {
	var filters_shop = JSON.parse(localStorage.getItem("filters_shop"))
	// console.log(filters_shop);

	for (var i = 0; i < filters_shop.length; i++) {
		if (filters_shop[i][0] === "code_type") {
			// console.log(filters_shop[0][1]);
			// document.getElementById("filter_type").value = "3";
			$("#filter_type").val(filters_shop[0][1])
			$("#filter_type").addClass("activefilter")
		}
		if (filters_shop[i][0] === "code_city") {
			// console.log(filters_shop[i][1]);
			$("#filter_location").val(filters_shop[i][1])
			$("#filter_location").addClass("activefilter")
		}
		if (filters_shop[i][0] === "code_cat") {
			// console.log(filters_shop[i][1]);
			$("#filter_category").val(filters_shop[i][1])
			$("#filter_category").addClass("activefilter")
		}
		if (filters_shop[i][0] === "rooms") {
			// console.log(filters_shop[i][1]);
			$("#filter_rooms").val(filters_shop[i][1])
			$("#filter_rooms").addClass("activefilter")
			if (localStorage.getItem("filter_rooms")) {
				var roomsValue = parseInt(localStorage.getItem("filter_rooms"))
				$("input[name='rooms']")
					.filter("[value='" + roomsValue + "']")
					.prop("checked", true)
				$(".buttonroom").text(roomsValue)
			}
		}
		if (filters_shop[i][0] === "baths") {
			// console.log(filters_shop[i][1]);
			$("#filter_bath").val(filters_shop[i][1])
			$("#filter_bath").addClass("activefilter")
			if (localStorage.getItem("filter_bath")) {
				var bathsValue = parseInt(localStorage.getItem("filter_bath"))
				// console.log(bathsValue)
				$("input[name='bath']")
					.filter("[value='" + bathsValue + "']")
					.prop("checked", true)
				$(".buttonbath").text(bathsValue)
			}
		}
		if (filters_shop[i][0] === "m2") {
			// console.log(filters_shop[i][1]);
			$("#filter_size").val(filters_shop[i][1])
			$("#filter_size").addClass("activefilter")
			if (localStorage.getItem("filter_size")) {
				selectedValuesize = localStorage.getItem("filter_size")
				// console.log(selectedValuesize)
				$("#rangeSlidersize").val(selectedValuesize)
				$("#selectedValuesize").text(selectedValuesize)
				$(".buttonsize").text(selectedValuesize)
			}
		}
		if (filters_shop[i][0] === "price") {
			// console.log(filters_shop[i][1]);
			$("#filter_price").val(filters_shop[i][1])
			$("#filter_price").addClass("activefilter")
			if (localStorage.getItem("filter_price")) {
				selectedValueprice = localStorage.getItem("filter_price")
				$("#rangeSliderprice").val(selectedValueprice)
				$("#selectedValueprice").text(selectedValueprice)
				$(".buttonprice").text(selectedValueprice)
			}
		}
		if (filters_shop[i][0] === "code_extra") {
			// console.log(filters_shop[i][1]);
			$("#filter_extra").val(filters_shop[i][1])
			$("#filter_extra").addClass("activefilter")
			if (localStorage.getItem("filter_extra")) {
				var extraValues = JSON.parse(localStorage.getItem("filter_extra"))
				extraValues.forEach(function (value) {
					$("input[name='extra[]'][value='" + value + "']").prop("checked", true)
				})
			}
		}
		if (filters_shop[i][0] === "code_act") {
			// console.log(filters_shop[i][1]);
			$("#filter_activity").val(filters_shop[i][1])
			$("#filter_activity").addClass("activefilter")
		}
	}
}

function remove_filter() {
	localStorage.removeItem("filters_shop")
	localStorage.removeItem("filter_extra")
	localStorage.removeItem("filter_price")
	localStorage.removeItem("filter_size")
	localStorage.removeItem("filter_bath")
	localStorage.removeItem("filter_rooms")
	localStorage.removeItem("filter_category")
	localStorage.removeItem("filter_location")
	localStorage.removeItem("filter_type")
	localStorage.removeItem("filter_activity")
	location.reload()
}

function filter_orderby() {
	// console.log("orderby");
	$("#filter_orderby").change(function () {
		var orderby = this.value
		// console.log(orderby)
		localStorage.setItem("filter_orderby", orderby)
		// location.reload()
		print_orderby()
	})
	if (localStorage.getItem("filter_orderby")) {
		$("#filter_orderby").val(localStorage.getItem("filter_orderby"))
	}
}

function print_orderby() {
	// console.log("print_orderby")
	ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {
		"orderby": localStorage.getItem("filter_orderby"),
		"op": "orderby",
	})
		.then(function (data) {
			// console.log("dentro de then print_orderby")
			// console.log(data)
			// return
			$("#content_shop_prop").empty()
			$(".date_img" && ".date_prop").empty()

			if (data === "error") {
				$("<div></div>")
					.appendTo("#content_shop_prop")
					.html("<h3>¡No se encuentran resultados con los filtros aplicados!</h3>")
			} else {
				for (row in data) {
					var carousel = ""
					data[row].images.forEach(function (image) {
						carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
					})
					$("<div></div>").attr({"id": data[row].code_prop, "class": "propertytable"}).appendTo("#content_shop_prop")
						.html(`
                        <table>
                            <tr>
								<td rowspan="7" class="imagen">
                				    <div class="owl-container imagen shop">
                				        <div class="owl-list owl-carousel owl-theme imagen shop">
                				            ${carousel}
                				        </div>
                				    </div>
                				</td>
                                <td colspan="8"><a class="titlelist" id="${data[row].code_prop}">
									<h2>${data[row].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;
									<i class="fa-solid fa-euro-sign"></i></h2></a>
								</td>
                            </tr>
                            <tr>
								<td colspan="8">${data[row].name_prop}</td>
							</tr>
							<tr>
								<td colspan="8">${data[row].description}</td>
							</tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                                <td class="text">${data[row].rooms}</td>
                                <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                                <td class="text">${data[row].baths}</td>
                                <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                                <td class="text">${data[row].name_cat}</td>
                            </tr>
                            <tr>
                                <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                                <td class="text">${data[row].m2}</td>
                                <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                                <td class="text">${data[row].name_city}</td>
                                <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                                <td class="text">${data[row].name_extra}</td>
                            </tr>
							<tr>
                                <td colspan='8'>
                                    <button id='${
																			data[row].code_prop
																		}' class='more_info_list Button_principal'>More Info</button>
                                </td>
							</tr>
                        </table>
					`)
				}
				$(".owl-list").owlCarousel({
					loop: true,
					autoplay: true,
					margin: 10,
					nav: true,
					dots: false,
					responsive: {
						0: {
							items: 1,
						},
						600: {
							items: 1,
						},
						1000: {
							items: 1,
						},
					},
				})
			}
			localStorage.removeItem("filter_orderby")
		})
		.catch(function (e) {
			console.error(e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

// #region MAPA
// MAPAS
function load_map_shop(data) {
	// console.log("load_map_shop")
	mapboxgl.accessToken = "pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g"
	const map = new mapboxgl.Map({
		container: "map_shop",
		style: "mapbox://styles/mapbox/streets-v11",
		center: [-3.7035825, 40.416705], // starting position [lng, lat]
		zoom: 4, // starting zoom
	})

	for (row in data) {
		const marker = new mapboxgl.Marker()
		const minPopup = new mapboxgl.Popup()
		minPopup.setHTML(`
			<h5 style="text-align:center;">${data[row].name_prop}</h5>
			<table>
				<tr>
					<td><i class="fa-solid fa-bed fa-xl"></i></td>
					<td style="width: 50px;">${data[row].rooms}</td>
					<td><i class="fa-solid fa-bath fa-xl"></i></td>
					<td>${data[row].baths}</td>
                </tr>
                <tr>
					<td><i class="fa-solid fa-expand fa-xl"></i></td>
					<td>${data[row].m2}</td>
					<td><i class="fa-solid fa-euro-sign fa-xl"></i></td>
					<td>${data[row].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                </tr>
			</table>
			<img src="${data[row].images[0]}" style="width:200px; height:200px; text-align:center;" /><br><br>
			<button id='${data[row].code_prop}' class='more_info_list Button_principal' style>More Info</button>
		`)
		marker.setPopup(minPopup).setLngLat([data[row].longitud, data[row].latitud]).addTo(map)
	}
}

function load_map_details(code_prop) {
	// console.log("load_map_details")
	// console.log(code_prop.longitud, code_prop.latitud)
	mapboxgl.accessToken = "pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g"
	const map = new mapboxgl.Map({
		container: "map-details",
		style: "mapbox://styles/mapbox/streets-v11",
		center: [code_prop.longitud, code_prop.latitud], // starting position [lng, lat]
		zoom: 10, // starting zoom
	})
	const markerDetails = new mapboxgl.Marker()
	const minPopup = new mapboxgl.Popup()
	markerDetails.setPopup(minPopup).setLngLat([code_prop.longitud, code_prop.latitud]).addTo(map)
}

// #region PAGINACION
// PAGINACION
function pagination() {
	// console.log("pagination")
	var filters_home = JSON.parse(localStorage.getItem("filters_home")) || false
	// console.log("filters_home", filters_home)
	var filters_shop = JSON.parse(localStorage.getItem("filters_shop")) || false
	if (filters_home !== false) {
		var url = friendlyURL("?module=shop")
		var op = "count_home"
	} else if (filters_shop !== false) {
		var url = friendlyURL("?module=shop")
		var op = "count_shop"
	} else {
		var url = friendlyURL("?module=shop")
		var op = "count"
	}
	ajaxPromise(url, "POST", "JSON", {"filters_home": filters_home, "filters_shop": filters_shop, "op": op}).then(
		function (data) {
			// console.log("dentro de then pagination", data)
			var total_items = data[0].contador
			var items_page = 2
			var total_pages = Math.ceil(total_items / items_page)
			// console.log("Hay estas paginas", total_pages)
			var currentPage = parseInt(localStorage.getItem("page")) || 1

			var paginationContainer = document.getElementById("pagination")
			paginationContainer.innerHTML = ""

			if (currentPage > 1) {
				let firstPageButton = document.createElement("button")
				firstPageButton.innerHTML = "<<"
				firstPageButton.classList.add("buttonpagination")
				firstPageButton.addEventListener("click", function () {
					localStorage.setItem("page", 1)
					location.reload()
				})
				paginationContainer.appendChild(firstPageButton)

				let prevButton = document.createElement("button")
				prevButton.innerHTML = "<"
				prevButton.classList.add("buttonpagination")
				prevButton.addEventListener("click", function () {
					localStorage.setItem("page", currentPage - 1)
					location.reload()
				})
				paginationContainer.appendChild(prevButton)
			}

			for (let i = 1; i <= total_pages; i++) {
				if (i < currentPage - 1 || i > currentPage + 1) continue
				let button = document.createElement("button")
				button.id = i
				button.classList.add("buttonpagination")
				button.innerHTML = i
				button.addEventListener("click", function () {
					let page = parseInt(this.id)
					let offset = (page - 1) * items_page
					localStorage.setItem("page", page)
					// console.log("El page es", page)
					// console.log("El offset es", offset)
					// console.log("Filter es:", filter)
					location.reload()
					$("html, body").animate({scrollTop: $(".wrap")})
				})
				paginationContainer.appendChild(button)
			}

			if (currentPage < total_pages) {
				let nextButton = document.createElement("button")
				nextButton.innerHTML = ">"
				nextButton.classList.add("buttonpagination")
				nextButton.addEventListener("click", function () {
					localStorage.setItem("page", currentPage + 1)
					location.reload()
				})
				paginationContainer.appendChild(nextButton)

				let lastPageButton = document.createElement("button")
				lastPageButton.innerHTML = ">>"
				lastPageButton.classList.add("buttonpagination")
				lastPageButton.addEventListener("click", function () {
					localStorage.setItem("page", total_pages)
					location.reload()
				})
				paginationContainer.appendChild(lastPageButton)
			}
		}
	)
}

// LIKES
function buttonLike() {
	$(document).one("click", ".like-review", function (e) {
		var code_prop = $(this).attr("id")
		var access_token = localStorage.getItem("access_token")
		if (access_token) {
			console.log("dentro de if buttonLike")
			console.log("access_token", access_token)
			console.log("code_prop", code_prop)
			ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {
				"code_prop": code_prop,
				"access_token": access_token,
				"op": "like",
			})
				.then(function (data) {
					$(this).children(".fa-heart").addClass("animate-like")
					$(this).css("background", "#ed2553")
					location.reload()
				})
				.catch(function (error) {
					console.error(error)
					// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=ButtonLike SHOP";
				})
		} else {
			localStorage.setItem("redirect_like", code_prop)
			window.location.href = friendlyURL("?module=login")
		}
	})
}

function checkLike(code_prop, access_token) {
	return new Promise((resolve, reject) => {
		ajaxPromise(friendlyURL("?module=shop"), "POST", "JSON", {
			"code_prop": code_prop,
			"access_token": access_token,
			"op": "checklike",
		})
			.then(function (data) {
				console.log("dentro de then checklike", data)
				if (data === "ExisteLike") {
					resolve("like-review Button_segundario active")
				} else {
					resolve("like-review Button_segundario")
				}
			})
			.catch(function (error) {
				console.error(error)
				reject(error)
			})
	})
}

$(document).ready(function () {
	// console.log("loadprops1")
	print_filters()
	filter_orderby()
	loadprops()
	clicks()
	filters_shop()
	pagination()
	buttonLike()
})

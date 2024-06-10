function click() {
	$(".profile-pref-sect, .profile-orders-sect, .profile-likes-sect").hide()

	$(".profile-sidebar a.profile-info").click(function (e) {
		e.preventDefault()
		$(".profile-pref-sect").hide()
		$(".profile-orders-sect").hide()
		$(".profile-info-sect").show()
		$(".profile-likes-sect").hide()
	})

	$(".profile-sidebar a.profile-orders").click(function (e) {
		e.preventDefault()
		$(".profile-info-sect").hide()
		$(".profile-pref-sect").hide()
		$(".profile-orders-sect").show()
		$(".profile-likes-sect").hide()
	})

	$(".profile-sidebar a.profile-preferences").click(function (e) {
		e.preventDefault()
		$(".profile-info-sect").hide()
		$(".profile-orders-sect").hide()
		$(".profile-pref-sect").show()
		$(".profile-likes-sect").hide()
	})

	$(".profile-sidebar a.profile-likes")
		.off("click")
		.on("click", function (e) {
			e.preventDefault()
			$(".profile-info-sect").hide()
			$(".profile-orders-sect").hide()
			$(".profile-pref-sect").hide()
			$(".profile-likes-sect").show()
			likes_profile()
		})

	$(".profile-sidebar a.profile-logout").click(function (e) {
		e.preventDefault()
		logout()
	})

	$(".profile-pref-sect form").submit(function (e) {
		console.log("submit")
		e.preventDefault()
		update_profile()
	})

	$(".prop-table-profile").on("click", ".more_info_profile", function () {
		var code_prop = $(this).attr("id")
		localStorage.setItem("redirect_profile", code_prop)
		window.location.href = friendlyURL("?module=shop")
	})

	$(".order-pdf")
		.off("click")
		.on("click", function (e) {
			e.preventDefault()
			console.log("order-pdf")
			var code_purchase = $(this).attr("id")
			// console.log("code_purchase", code_purchase)
			generate_pdf(code_purchase)
		})
}
// INFORMACION USER
function list_profile() {
	// console.log("list_profile")
	var access_token = localStorage.getItem("access_token")
	// console.log("access_token", access_token)

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {access_token: access_token, op: "list_profile"})
		.then(function (result) {
			// console.log("Dentro del then", result[0])
			// return
			// INFORMACION DEL USUARIO
			$(".profile-username").text(result[0].username)
			$(".profile-name").text(result[0].name)
			$(".profile-surname").text(result[0].surname)
			$(".profile-email").text(result[0].email)
			$(".profile-phone").text(result[0].phone_number)
			$(".profile-city").text(result[0].city)
			$(".profile-avatar").attr("src", result[0].avatar)

			// PLACEHOLDERS DE LOS INPUTS
			$("#user_name").attr("placeholder", result[0].name)
			$("#user_surname").attr("placeholder", result[0].surname)
			$("#user_phone").attr("placeholder", result[0].phone_number)
			$("#user_city").attr("placeholder", result[0].city)
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

function update_profile() {
	console.log("update_profile")
	var access_token = localStorage.getItem("access_token")
	var name = $("#user_name").val()
	var surname = $("#user_surname").val()
	var phone = $("#user_phone").val()
	var city = $("#user_city").val()
	var op = "update_profile"

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {
		access_token: access_token,
		name: name,
		surname: surname,
		phone: phone,
		city: city,
		op: op,
	})
		.then(function (data) {
			// console.log("Dentro del then", data)
			// return
			// console.log("Success")
			location.reload()
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
		})
}

// DROPZONE AVATAR
function dropzone_avatar() {
	var dropZone = $("#drop_zone")
	var fileInput = $("#fileInput")

	dropZone.on("dragover", function (e) {
		e.preventDefault()
		e.stopPropagation()
		dropZone.addClass("highlight")
	})

	dropZone.on("dragleave", function (e) {
		e.preventDefault()
		e.stopPropagation()
		dropZone.removeClass("highlight")
	})

	dropZone.on("drop", function (e) {
		e.preventDefault()
		e.stopPropagation()
		dropZone.removeClass("highlight")

		var files = e.originalEvent.dataTransfer.files
		handleFiles(files)
	})

	dropZone.on("click", function () {
		fileInput.click()
	})

	fileInput.on("change", function () {
		var files = fileInput[0].files
		handleFiles(files)
	})
}

function handleFiles(files) {
	for (var i = 0; i < files.length; i++) {
		var file = files[i]
		if (validateFile(file)) {
			uploadFile(file)
		}
	}
}

function validateFile(file) {
	var allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
	var maxSize = 5 * 1024 * 1024 // 5MB

	if (allowedTypes.indexOf(file.type) === -1) {
		$("#drop_zone").addClass("error")
		$("#drop_zone").text("File type not supported")
		setTimeout(function () {
			$("#drop_zone").removeClass("error")
			$("#drop_zone").text("Drop file here")
		}, 2000)

		return false
	}

	if (file.size > maxSize) {
		$("#drop_zone").addClass("error")
		$("#drop_zone").text("File is too large")
		setTimeout(function () {
			$("#drop_zone").removeClass("error")
			$("#drop_zone").text("Drop file here")
		}, 2000)
		return false
	}

	return true
}

function uploadFile(file) {
	var formData = new FormData()
	formData.append("file", file)
	formData.append("access_token", localStorage.getItem("access_token"))

	console.log("file", formData)

	$.ajax({
		url: friendlyURL("?module=profile&op=upload_avatar"),
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			console.log("File uploaded successfully", response)
		},
		error: function (e) {
			console.error("Catch error: ", e)
		},
	})
}

// FAVORITOS
function likes_profile() {
	$(".prop-table-profile").empty()
	// console.log("likes_profile")
	var access_token = localStorage.getItem("access_token")
	var op = "likes_profile"

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {access_token: access_token, op: op})
		.then(function (data) {
			console.log("Dentro del then", data)
			// return
			if (data === "No likes") {
				$(".prop-table-profile").html("<h4>No likes</h4>")
			} else {
				for (row in data) {
					var carousel = ""
					data[row][0].images.forEach(function (image) {
						// console.log("image:", image)
						carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
					})
					$("<div></div>")
						.attr({"id": data[row][0].code_prop, "class": "propertytable"})
						.appendTo(".prop-table-profile").html(`
                		<table>
                		    <tr>
								<td rowspan="7" class="imagen">
                				    <div class="owl-container imagen shop">
                				        <div class="owl-list-profile owl-carousel owl-theme imagen shop">
                				            ${carousel}
                				        </div>
                				    </div>
                				</td>
                		        <td colspan="8"><a class="titlelist" id="${data[row][0].code_prop}">
									<h2>${data[row][0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;
									<i class="fa-solid fa-euro-sign"></i></h2></a>
								</td>
                		    </tr>
                		    <tr>
								<td colspan="8"><h5>${data[row][0].name_prop}</h5</td>
							</tr>
							<tr>
								<td colspan="8">${data[row][0].description}</td>
							</tr>
                		    <tr>
                		        <td class="icon"><i class="fa-solid fa-bed fa-xl"></i></td>
                		        <td class="text">${data[row][0].rooms}</td>
                		        <td class="icon"><i class="fa-solid fa-bath fa-xl"></i></td>
                		        <td class="text">${data[row][0].baths}</td>
                		        <td class="icon"><i class="fa-solid fa-key fa-xl"></i></td>
                		        <td class="text">${data[row][0].name_cat}</td>
                		    </tr>
                		    <tr>
                		        <td class="icon"><i class="fa-solid fa-expand fa-xl"></i></td>
                		        <td class="text">${data[row][0].m2}</td>
                		        <td class="icon"><i class="fa-solid fa-location-dot fa-xl"></i></td>
                		        <td class="text">${data[row][0].name_city}</td>
                		        <td class="icon"><i class="fa-solid fa-plus fa-xl"></i></td>
                		        <td class="text">${data[row][0].name_extra}</td>
                		    </tr>
							<tr>
                		        <td colspan='4'>
                		            <button id='${data[row][0].code_prop}' 
									class='more_info_profile Button_principal'>More Info</button>
                		        </td>
								<td>
									<button id='${data[row][0].code_prop}' class="carrito Button_segundario">
										<i class="fa fa-shopping-cart" aria-hidden="true"></i>
									</button>
								</td>
								<td class="like-content">
									<button id='${data[row][0].code_prop}'class="like-profile Button_segundario active">
									<i class="fa fa-heart" aria-hidden="true"></i>${data[row][0].likes}</button>
								</td>
							</tr>
                		</table>
						`)
					$(".owl-list-profile").owlCarousel({
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
			}

			// console.log("Success")
			// location.reload()
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
		})
}

$(document).on("click", ".like-profile", function () {
	var code_prop = $(this).attr("id")
	var access_token = localStorage.getItem("access_token")
	console.log("code_prop", code_prop)
	if (access_token) {
		ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {
			"code_prop": code_prop,
			"access_token": access_token,
			"op": "like",
		})
			.then(function (data) {
				// console.log(data)
				likes_profile()
			})
			.catch(function (error) {
				console.error(error)
			})
	} else {
		window.location.href = friendlyURL("?module=login")
	}
})

// ORDERS
function orders_profile() {
	// console.log("orders_profile")
	var access_token = localStorage.getItem("access_token")
	var op = "orders_profile"

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {access_token: access_token, op: op})
		.then(function (data) {
			// console.log("Dentro del then", data)
			// return
			if (data === "No orders") {
				$(".cart-table-profile").html("<h4>No orders</h4>")
			} else {
				for (row in data) {
					var total = calculateInvoiceTotal(data[row])
					$("<tr></tr>")
						.attr({"id": data[row].code_order, "class": "cart-table-profile"})
						.appendTo(".tbody-table-profile").html(`
								<td>${data[row].code_purchase}</td>
								<td>${data[row].date_purchase}</td>
								<td>${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}&nbsp;
								<i class="fa-solid fa-euro-sign"></i></td>
								<td>
									<button id="${data[row].code_purchase}" class="order-pdf Button_segundario">Generate PDF</button>
								</td>
								<td>
									<button id="${data[row].code_purchase}" class="order-qr Button_segundario">Generate QR</button>
								</td>
							
						`)
				}
				click()
			}
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
		})
}

function calculateInvoiceTotal(data) {
	// console.log("calculateInvoiceTotal", data)
	var total = 0

	data.lineas.forEach((line) => {
		total += Number(line.price)
	})

	// console.log("total", total)

	return total
}

function generate_pdf(code_purchase) {
	console.log("generate_pdf")
	var access_token = localStorage.getItem("access_token")
	var op = "generate_pdf"

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {
		access_token: access_token,
		code_purchase: code_purchase,
		op: op,
	})
		.then(function (data) {
			console.log("Dentro del then", data)
			// return
			ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {
				data: data,
				op: "invoice_data",
			})
				.then(function (data) {
					console.log("Dentro del then2", data)
					// return
					var pdf = data.invoice
					window.open(pdf, "_blank")
					// console.log("Success")
					// location.reload()
				})
				.catch(function (e) {
					console.error("Catch error: ", e)
				})

			// location.reload()
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
		})
}

$(document).ready(function () {
	click()
	list_profile()
	dropzone_avatar()
	orders_profile()
})

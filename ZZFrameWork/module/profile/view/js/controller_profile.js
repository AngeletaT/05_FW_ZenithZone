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

	$(".profile-sidebar a.profile-likes").click(function (e) {
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
}

function list_profile() {
	console.log("list_profile")
	var access_token = localStorage.getItem("access_token")
	console.log("access_token", access_token)

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {access_token: access_token, op: "list_profile"})
		.then(function (result) {
			console.log("Dentro del then", result[0])
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

function likes_profile() {
	$(".prop-table-profile").empty()
	console.log("likes_profile")
	var access_token = localStorage.getItem("access_token")
	var op = "likes_profile"

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {access_token: access_token, op: op})
		.then(function (data) {
			console.log("Dentro del then", data)
			// return
			for (row in data) {
				var carousel = ""
				data[row][0].images.forEach(function (image) {
					// console.log("image:", image)
					carousel += `<div class="item imagen"><img src="${image}" alt="property" /></div>`
				})
				$("<div></div>").attr({"id": data[row][0].code_prop, "class": "propertytable"}).appendTo(".prop-table-profile")
					.html(`
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
								class='more_info_list Button_principal'>More Info</button>
                	        </td>
							<td>
								<button id='${data[row][0].code_prop}' class="carrito Button_segundario">
									<i class="fa fa-shopping-cart" aria-hidden="true"></i>
								</button>
							</td>
							<td class="like-content">
								<button id='${data[row][0].code_prop}'class="like-review Button_segundario">
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

			// console.log("Success")
			// location.reload()
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
		})
}

$(document).ready(function () {
	click()
	list_profile()
})

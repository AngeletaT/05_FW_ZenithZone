// ================AJAX-PROMISE================

function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: sUrl,
			type: sType,
			dataType: sTData,
			data: sData,
		})
			.done((data) => {
				// console.log("hola");
				// console.log(data);
				resolve(data)
			})
			.fail((jqXHR, textStatus, errorThrow) => {
				reject(errorThrow)
			})
	})
}

//================LOAD-HEADER================
function load_menu() {
	$("#nav_list").empty()
	// $("<li></li>")
	// 	.attr({"class": "nav_item"})
	// 	.html('<a href="' + friendlyURL("?module=home&op=view") + '" class="nav_link">Home</a>')
	// 	.appendTo("#nav_list")
	$("<li></li>")
		.attr({"class": "nav_item"})
		.html('<a href="' + friendlyURL("?module=shop") + '" class="nav_link">Shop</a>')
		.appendTo("#nav_list")

	if (localStorage.getItem("access_token")) {
		var access_token = localStorage.getItem("access_token")
		console.log(access_token)

		ajaxPromise(friendlyURL("?module=cart"), "POST", "JSON", {access_token: access_token, op: "count_cart"})
			.then(function (data) {
				console.log(data)
				// return
				$("<li></li>")
					.attr({"class": "nav_item nav_cart"})
					.html(
						`<a href="${friendlyURL("?module=cart")}" class="nav_link">
						<i class="fas fa-shopping-cart"></i><span id="cart-count">&nbsp;${data[0].count}</span></a>`
					)
					.appendTo("#nav_list")
			})
			.catch(function () {
				console.log("Error")
			})

		ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {
			access_token: access_token,
			op: "data_user",
		})
			.then(function (data) {
				// console.log(data)
				// return
				if (data[0].type_user === "admin") {
					menu_admin()
				} else if (data[0].type_user === "client") {
					// console.log("menu_client")
					$("<li></li>")
						.html(
							'<a class="active" id="useravatar" href="' +
								friendlyURL("?module=login") +
								'"><img class="useravatar avatar" src="' +
								data[0].avatar +
								'" alt="UserAvatar"/></a>'
						)
						.appendTo("#nav_list")

					$("<li></li>")
						.html('<a class="Button_red" id="logout" href="' + friendlyURL("?module=login") + '">Log out</a>')
						.appendTo("#nav_list")
				}
			})
			.catch(function () {
				console.log("Log in")
				$("<li></li>")
					.attr({"class": "nav_item"})
					.html(
						'<a class="loginbutton" href="' +
							friendlyURL("?module=login") +
							'" class="nav_link" data-tr="Log in">Log in</a>'
					)
					.appendTo("#nav_list")
			})
	} else {
		var access_token = ""
		$("<li></li>")
			.attr({"class": "nav_item"})
			.html(
				'<a class="loginbutton" href="' +
					friendlyURL("?module=login") +
					'" class="nav_link" data-tr="Log in">Log in</a>'
			)
			.appendTo("#nav_list")
	}
}

//================CLICK-LOGOUT================
function click_logout() {
	$(document).on("click", "#logout", function () {
		// localStorage.removeItem("offset")
		logout()
		toastr.success("Logout succesfully")
		setTimeout("logout(); ", 1000)
	})
}

//================LOG-OUT================
function logout() {
	ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {op: "logout"})
		.then(function (data) {
			if (data == "logout") {
				console.log("Borrando acces_token")
				localStorage.removeItem("access_token")
				localStorage.removeItem("refresh_token")
				toastr.warning("The account has been closed for security!!")
				$(".useravatar").hide()
				window.location.href = friendlyURL("?module=home")
			} else {
				console.log("Error")
			}
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

//================FRIENDLY URL================
function friendlyURL(url) {
	var link = ""
	url = url.replace("?", "")
	url = url.split("&")
	cont = 0
	for (var i = 0; i < url.length; i++) {
		cont++
		var aux = url[i].split("=")
		if (cont == 2) {
			link += "/" + aux[1] + "/"
		} else {
			link += "/" + aux[1]
		}
	}
	return "http://localhost/angela/ZZFrameWork" + link
}

// Remove localstorage('page') with click in shop
// function click_shop() {
// 	$(document).on("click", "#opc_shop", function () {
// 		localStorage.removeItem("page")
// 		localStorage.removeItem("total_prod")
// 	})
// }

$(document).ready(function () {
	load_menu()
	click_logout()
	// click_shop()
})

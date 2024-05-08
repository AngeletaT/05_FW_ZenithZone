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
	// $("<li></li>")
	// 	.attr({"class": "nav_item"})
	// 	.html('<a href="' + friendlyURL("?module=home&op=view") + '" class="nav_link">Home</a>')
	// 	.appendTo("#nav_list")
	$("<li></li>")
		.attr({"class": "nav_item"})
		.html('<a href="' + friendlyURL("?module=shop") + '" class="nav_link">Shop</a>')
		.appendTo("#nav_list")
	// $("<li></li>")
	// 	.attr({"class": "nav_item"})
	// 	.html('<a href="' + friendlyURL("?module=contact") + '" class="nav_link">Contact us</a>')
	// 	.appendTo("#nav_list")

	ajaxPromise(friendlyURL("?module=login&op=data_user"), "POST", "JSON", {token: localStorage.getItem("token")})
		.then(function (data) {
			if (data[0].user_type === "admin") {
				menu_admin()
			} else if (data[0].user_type === "client") {
				menu_client()
			}
			click_profile(data[0])
		})
		.catch(function () {
			$("<li></li>")
				.attr({"class": "nav_item"})
				.html('<a href="' + friendlyURL("?module=login") + '" class="nav_link" data-tr="Log in">Log in</a>')
				.appendTo(".nav_list")
		})
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
	ajaxPromise("module/login/controller/controller_login.php?op=logout", "POST", "JSON")
		.then(function (data) {
			console.log("Borrando acces_token")
			localStorage.removeItem("acces_token")
			localStorage.removeItem("refresh_token")
			toastr.warning("The account has been closed for security!!")
			$(".useravatar").hide()
			window.location.href = "index.php?module=controller_home&op=list"
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

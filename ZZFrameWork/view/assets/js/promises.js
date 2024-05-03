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
	var acces_token = localStorage.getItem("acces_token")
	if (acces_token) {
		ajaxPromise("module/login/controller/controller_login.php?op=data_user", "POST", "JSON", {
			"acces_token": acces_token,
		})
			.then(function (data) {
				console.log(data)
				// if (data.type_user == "client") {
				// 	console.log("Client loged")
				// 	$(".opc_CRUD").empty()
				// 	$(".opc_exceptions").empty()
				// } else {
				// 	console.log("Admin loged")
				// 	$(".opc_CRUD").show()
				// 	$(".opc_exceptions").show()
				// }
				$(".loginbutton").hide()
				$(".loginbutton").text("Logout")
				$(".loginbutton").attr("id", "logout")
				$(".loginbutton").addClass("Button_red")
				if (data.avatar) {
					$(".useravatar").show()
					$(".useravatar").attr("src", data.avatar)
				}
				$(".loginbutton").show()
			})
			.catch(function (e) {
				console.error("Catch error: ", e)
				// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
			})
	} else {
		console.log("No hay acces_token disponible")
		$(".useravatar").hide()

		// $(".opc_CRUD").empty()
		// $(".opc_exceptions").empty()
		// $("#user_info").hide()
		// $(".log-icon").empty()
		// $(
		// 	'<a href="index.php?module=ctrl_login&op=login-register_view"><i id="col-ico" class="fa-solid fa-user fa-2xl"></i></a>'
		// ).appendTo(".log-icon")
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

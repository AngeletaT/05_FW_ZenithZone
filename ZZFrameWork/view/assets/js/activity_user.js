function protecturl() {
	var acces_token = localStorage.getItem("acces_token")
	ajaxPromise("module/login/controller/controller_login.php?op=controluser", "POST", "JSON", {
		"acces_token": acces_token,
	})
		.then(function (data) {
			if (data == "Correct_User") {
				console.log("CORRECT--> The user matches the session")
			} else if (data == "Wrong_User") {
				console.log("INCORRECT--> Someone is trying to access an account")
				logout()
			}
		})
		.catch(function () {
			console.log("ANONYMOUS_user")
		})
}

function control_activity() {
	var acces_token = localStorage.getItem("acces_token")
	if (acces_token) {
		ajaxPromise("module/login/controller/controller_login.php?op=actividad", "POST", "JSON").then(function (response) {
			if (response == "inactivo") {
				console.log("usuario INACTIVO")
				logout()
			} else {
				console.log("usuario ACTIVO")
			}
		})
	} else {
		console.log("No hay usario logeado")
	}
}

// function refresh_token() {
// 	var acces_token = localStorage.getItem("acces_token")
// 	if (acces_token) {
// 		ajaxPromise("module/login/controller/controller_login.php?op=refresh_token", "POST", "JSON", {
// 			"acces_token": acces_token,
// 		}).then(function (data_token) {
// 			console.log("Refresh acces_token correctly")
// 			localStorage.setItem("acces_token", data_token)
// 			load_menu()
// 		})
// 	}
// }

function refresh_cookie() {
	ajaxPromise("module/login/controller/controller_login.php?op=refresh_cookie", "POST", "JSON").then(function (
		response
	) {
		console.log("Refresh cookie correctly")
	})
}

// function logout_auto() {
//     localStorage.removeItem('acces_token');
//     toastr.warning("Se ha cerrado la cuenta por seguridad!!");
//     setTimeout('window.location.href = "index.php?module=ctrl_login&op=login-register_view";', 2000);
// }

$(document).ready(function () {
	setInterval(function () {
		control_activity()
	}, 600000) //10min= 600000
	protecturl()
	// setInterval(function () {
	// 	refresh_token()
	// }, 600)
	setInterval(function () {
		refresh_cookie()
	}, 600000)
})

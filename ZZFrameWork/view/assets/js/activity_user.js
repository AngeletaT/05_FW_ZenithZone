function protecturl() {
	var access_token = localStorage.getItem("access_token")
	var refresh_token = localStorage.getItem("refresh_token")
	ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {
		"access_token": access_token,
		"refresh_token": refresh_token,
		"op": "controluser",
	})
		.then(function (data) {
			if (data == "Correct_User") {
				console.log("CORRECT--> The user matches the session")
			} else if (data == "Wrong_User") {
				console.log("INCORRECT--> Someone is trying to accesss an account")
				logout()
			}
		})
		.catch(function () {
			console.log("ANONYMOUS_user")
		})
}

function control_activity() {
	var access_token = localStorage.getItem("access_token")
	if (access_token) {
		ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {op: "actividad"}).then(function (response) {
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
// 	var access_token = localStorage.getItem("access_token")
// 	if (access_token) {
// 		ajaxPromise("module/login/controller/controller_login.php?op=refresh_token", "POST", "JSON", {
// 			"access_token": access_token,
// 		}).then(function (data_token) {
// 			console.log("Refresh access_token correctly")
// 			localStorage.setItem("access_token", data_token)
// 			load_menu()
// 		})
// 	}
// }

function refresh_cookie() {
	ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {op: "refresh_cookie"}).then(function (response) {
		console.log("Refresh cookie correctly")
	})
}

// function logout_auto() {
//     localStorage.removeItem('access_token');
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

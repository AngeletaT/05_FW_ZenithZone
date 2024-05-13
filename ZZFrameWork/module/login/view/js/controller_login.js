function login() {
	console.log("login")
	// console.log("validate_login", validate_login())
	if (validate_login() != 0) {
		var data = []
		var username = document.getElementById("username_log").value
		var password = document.getElementById("passwd_log").value
		data = {username: username, password: password}
		console.log(data)

		ajaxPromise("module/login/controller/controller_login.php?op=login", "POST", "JSON", data)
			.then(function (result) {
				console.log("Dentro del then", result)
				if (result == "error_username") {
					document.getElementById("error_username_log").innerHTML =
						"The user does not exist, make sure you have written it correctly"
				} else if (result == "error_passwd") {
					document.getElementById("error_passwd_log").innerHTML = "The password is incorrect"
				} else {
					localStorage.setItem("acces_token", result[0])
					localStorage.setItem("refresh_token", result[1])

					console.log("acces_token", result)
					toastr.success("Loged succesfully")
					// Mostrar el perfil del usuario
					document.getElementById("login-form").style.display = "none"
					// document.getElementById("login-profile").style.display = "block"
					// PARA HACER EL PROFILE
					// document.getElementById("username").innerHTML = result.username
					// document.getElementById("avatar").src = result.avatar

					if (localStorage.getItem("redirect_like")) {
						// console.log("redirect_like")
						setTimeout(' window.location.href = "index.php?page=controller_shop&op=list"; ', 500)
					} else {
						// console.log("redirect_home")
						setTimeout(' window.location.href = "index.php?page=controller_home&op=list"; ', 1000)
					}
				}
			})
			.catch(function (e) {
				console.error("Catch error: ", e)
				// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
			})
	}
}

function key_login() {
	// console.log("key_login")
	$("#login").keypress(function (e) {
		console.log("keypress_login")
		var code = e.keyCode ? e.keyCode : e.which
		if (code == 13) {
			e.preventDefault()
			login()
		}
	})
}

function button_login() {
	// console.log("button_login")
	$("#login").on("click", function (e) {
		console.log("click_login")
		e.preventDefault()
		login()
	})
}

function validate_login() {
	// console.log("validate_login")
	var error = false

	if (document.getElementById("username_log").value.length === 0) {
		document.getElementById("error_username_log").innerHTML = "You have to write the username"
		error = true
	} else {
		if (document.getElementById("username_log").value.length < 5) {
			document.getElementById("error_username_log").innerHTML = "The username must have at least 5 characters"
			error = true
		} else {
			document.getElementById("error_username_log").innerHTML = ""
		}
	}

	if (document.getElementById("passwd_log").value.length === 0) {
		document.getElementById("error_passwd_log").innerHTML = "You have to write the password"
		error = true
	} else {
		document.getElementById("error_passwd_log").innerHTML = ""
	}

	if (error == true) {
		return 0
	}
}

// Cambiar entre formularios
function switchform() {
	// Oculta el formulario de registro cuando se carga la página
	$("#register__form").css("display", "none")
	$(".login__radio").hide()
	$("#login-profile").css("display", "none")

	// Cambiar del formulario de inicio de sesion al de registro
	$(".login-form .register-text a").click(function (event) {
		event.preventDefault()
		$("#login__form").css("display", "none")
		$("#register__form").css("display", "block")
		$("#tab-1").prop("checked", false)
		$("#tab-2").prop("checked", true)
	})

	// Cambiar del formulario de registro al de inicio de sesion
	$(".text.login-text a").click(function (event) {
		event.preventDefault()
		$("#register__form").css("display", "none")
		$("#login__form").css("display", "block")
		$("#tab-2").prop("checked", false)
		$("#tab-1").prop("checked", true)
	})
}

$(document).ready(function () {
	key_login()
	button_login()
	switchform()
})

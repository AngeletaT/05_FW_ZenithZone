function click_login() {
	// LOGIN
	$("#login").keypress(function (e) {
		console.log("keypress_login")
		var code = e.keyCode ? e.keyCode : e.which
		if (code == 13) {
			e.preventDefault()
			login()
		}
	})

	$("#login").on("click", function (e) {
		console.log("click_login")
		e.preventDefault()
		login()
	})

	// SOCIAL LOGIN
	$("#google").on("click", function (e) {
		e.preventDefault()
		social_login("google")
	})

	$("#github").on("click", function (e) {
		e.preventDefault()
		social_login("github")
	})

	// RECOVERY PASSWORD
	$("#recover").keypress(function (e) {
		var code = e.keyCode ? e.keyCode : e.which
		if (code == 13) {
			e.preventDefault()
			send_recover_password()
		}
	})

	$("#recover").on("click", function (e) {
		e.preventDefault()
		send_recover_password()
	})

	// NEW PASSWORD
	$("#button_set_pass").keypress(function (e) {
		var code = e.keyCode ? e.keyCode : e.which
		if (code == 13) {
			e.preventDefault()
			send_new_password(token_email)
		}
	})

	$("#button_set_pass").on("click", function (e) {
		e.preventDefault()
		send_new_password(token_email)
	})

	// OTP
	$("#submit_otp").keypress(function (e) {
		var code = e.keyCode ? e.keyCode : e.which
		if (code == 13) {
			e.preventDefault()
			validateotp()
		}
	})

	$("#submit_otp").on("click", function (e) {
		e.preventDefault()
		validateotp()
	})
}

// LOGIN
function login() {
	console.log("login")
	// console.log("validate_login", validate_login())
	if (validate_login() != 0) {
		var data = []
		var username = document.getElementById("username_log").value
		var password = document.getElementById("passwd_log").value
		var op = "login"
		data = {username: username, password: password, op: op}
		// console.log(data)

		ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", data)
			.then(function (result) {
				console.log("Dentro del then", result)
				// return

				if (result == "error_username") {
					document.getElementById("error_username_log").innerHTML =
						"The user does not exist, make sure you have written it correctly"
				} else if (result == "error_passwd") {
					document.getElementById("error_passwd_log").innerHTML = "The password is incorrect"
				} else if (result == "inactive_user") {
					toastr.error("Inactive user, please verify your email")
				} else if (result == "otp") {
					$("#login__form").css("display", "none")
					$("#otp__form").css("display", "block")
				} else {
					var tokens = JSON.parse(result)
					// console.log("tokens", tokens)
					// console.log("access_token", tokens[0])
					// console.log("refresh_token", tokens[1])
					localStorage.setItem("access_token", tokens[0])
					localStorage.setItem("refresh_token", tokens[1])

					toastr.success("Loged succesfully")
					// Mostrar el perfil del usuario
					document.getElementById("login-form").style.display = "none"
					// document.getElementById("login-profile").style.display = "block"
					// PARA HACER EL PROFILE
					// document.getElementById("username").innerHTML = result.username
					// document.getElementById("avatar").src = result.avatar

					if (localStorage.getItem("redirect_like")) {
						// console.log("redirect_like")
						setTimeout(function () {
							window.location.href = friendlyURL("?module=shop")
						}, 3000)
					} else {
						// console.log("redirect_home")
						setTimeout(function () {
							window.location.href = friendlyURL("?module=shop")
						}, 3000)
					}
				}
			})
			.catch(function (e) {
				console.error("Catch error: ", e)
				// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
			})
	}
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

// SOCIAL LOGIN
function social_login(provider) {
	authService = firebase_config()
	authService
		.signInWithPopup(provider_config(provider))
		.then(function (result) {
			console.log("Hemos autenticado al usuario ", result.user)
			console.log(result)
			email_name = result.user.email
			var username = email_name.split("@")
			console.log(username[0])

			social_user = {
				id: result.user.uid,
				username: username[0],
				email: result.user.email,
				avatar: result.user.photoURL,
				provider: provider,
			}
			console.log(social_user)
			// return
			if (result) {
				ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {social_user: social_user, op: "social_login"})
					.then(function (data) {
						console.log(data)
						// return
						if (data == "error") {
							toastr.error("This email is already registered in the database")
						} else {
							localStorage.setItem("access_token", data[0])
							localStorage.setItem("refresh_token", data[1])
							console.log("access:", data[0])
							console.log("refresh:", data[1])
							toastr.options.timeOut = 3000
							toastr.success("Login successful")
							if (localStorage.getItem("redirect_like")) {
								// console.log("redirect_like")
								setTimeout(function () {
									window.location.href = friendlyURL("?module=shop")
								}, 3000)
							} else {
								// console.log("redirect_home")
								setTimeout(function () {
									window.location.href = friendlyURL("?module=shop")
								}, 3000)
							}
						}
					})
					.catch(function () {
						console.log("Error: Social login error")
					})
			}
		})
		.catch(function (error) {
			var errorCode = error.code
			console.log(errorCode)
			var errorMessage = error.message
			console.log(errorMessage)
			var email = error.email
			console.log(email)
			var credential = error.credential
			console.log(credential)
		})
}

function firebase_config() {
	// usando config_sl como variable global con las credenciales.
	if (!firebase.apps.length) {
		firebase.initializeApp(config_sl)
	} else {
		firebase.app()
	}
	return (authService = firebase.auth())
}

function provider_config(provider) {
	if (provider === "google") {
		var provider = new firebase.auth.GoogleAuthProvider()
		provider.addScope("email")
		return provider
	} else if (provider === "github") {
		return (provider = new firebase.auth.GithubAuthProvider())
	}
}

// RECOVERY PASSWORD
function send_recover_password() {
	if (validate_recover_password() != 0) {
		var email = document.getElementById("email_recovery").value
		var op = "send_recover_email"
		var data = {email: email, op: op}
		ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", data)
			.then(function (data) {
				console.log(data)
				// return
				if (data == "error") {
					$("#error_email_recovery").html("The email doesn't exist")
				} else {
					toastr.options.timeOut = 3000
					toastr.success("Email sended")
					setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000)
				}
			})
			.catch(function (e) {
				console.log("Error: Recover password error")
			})
	}
}

function validate_recover_password() {
	var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/
	var error = false

	if (document.getElementById("email_recovery").value.length === 0) {
		document.getElementById("error_email_recovery").innerHTML = "Tienes que escribir un correo"
		error = true
	} else {
		if (!mail_exp.test(document.getElementById("email_recovery").value)) {
			document.getElementById("error_email_recovery").innerHTML = "El formato del mail es invalido"
			error = true
		} else {
			document.getElementById("error_email_recovery").innerHTML = ""
		}
	}

	if (error == true) {
		return 0
	}
}

function load_form_new_password() {
	token_email = localStorage.getItem("token_email")
	console.log("token_email", token_email)
	localStorage.removeItem("token_email")
	ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {token_email: token_email, op: "verify_token"})
		.then(function (data) {
			console.log("loadform", data)
			// return
			if (data == "verify") {
				key_password(token_email)
				button_password(token_email)
			} else {
				console.log("Then error")
			}
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
		})
}

function validate_new_password() {
	var error = false

	if (document.getElementById("pass_rec").value.length === 0) {
		document.getElementById("error_password_rec").innerHTML = "You have to write a password"
		error = true
	} else {
		if (document.getElementById("pass_rec").value.length < 8) {
			document.getElementById("error_password_rec").innerHTML = "The password must be longer than 8 characters"
			error = true
		} else {
			document.getElementById("error_password_rec").innerHTML = ""
		}
	}

	if (document.getElementById("pass_rec_2").value != document.getElementById("pass_rec").value) {
		document.getElementById("error_password_rec_2").innerHTML = "Passwords don't match"
		error = true
	} else {
		document.getElementById("error_password_rec_2").innerHTML = ""
	}

	if (error == true) {
		return 0
	}
}

function send_new_password(token_email) {
	if (validate_new_password() != 0) {
		var data = {token_email: token_email, password: $("#pass_rec").val(), op: "new_password"}
		ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", data)
			.then(function (data) {
				// console.log("new pass", data)
				// return
				if (data == "update") {
					toastr.options.timeOut = 3000
					toastr.success("New password changed")
					setTimeout('window.location.href = friendlyURL("?module=login")', 1000)
				} else {
					toastr.options.timeOut = 3000
					toastr.error("Error setting new password")
				}
			})
			.catch(function (e) {
				console.error("Catch error: ", e)
			})
	}
}

// OTP
function validateotp() {
	var otp = document.getElementById("otp").value
	var username = document.getElementById("username_otp").value
	ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {username: username, otp: otp, op: "validate_otp"})
		.then(function (data) {
			console.log(data)
			// return
			if (data === "valid") {
				toastr.success("OTP validated")
				document.getElementById("otp__form").style.display = "none"
				document.getElementById("login__form").style.display = "block"
			} else if (data === "error_otp") {
				document.getElementById("error_otp").innerHTML = "The code is incorrect"
				console.log("Then Error: OTP validation failed")
			} else if (data === "error_username_otp") {
				document.getElementById("error_username_otp").innerHTML = "The username does not exist"
				console.log("Then Error: OTP validation failed")
			}
		})
		.catch(function () {
			console.log("Catch Error: OTP validation error")
		})
}

// FORMULARIOS
function switchform() {
	// Oculta el formulario de registro cuando se carga la página
	$(".login__radio").hide()
	$("#register__form").css("display", "none")
	$("#password_recovery_form").css("display", "none")
	$("#otp__form").css("display", "none")

	// Cambiar del formulario de inicio de sesion al de registro
	$(".login-form .register-text a").click(function (event) {
		event.preventDefault()
		$("#register__form").css("display", "block")
		$("#login__form").css("display", "none")
		$("#password_recovery_form").css("display", "none")
		$("#tab-1").prop("checked", false)
		$("#tab-2").prop("checked", true)
		$("#tab-3").prop("checked", false)
		$("#tab-4").prop("checked", false)
	})

	// Cambiar del formulario de registro al de inicio de sesion
	$(".text.login-text a").click(function (event) {
		event.preventDefault()
		$("#register__form").css("display", "none")
		$("#login__form").css("display", "block")
		$("#password_recovery_form").css("display", "none")
		$("#tab-2").prop("checked", false)
		$("#tab-1").prop("checked", true)
		$("#tab-3").prop("checked", false)
		$("#tab-4").prop("checked", false)
	})

	// Cambiar al formulario de recuperación de contraseña
	$(".text.password-recovery-text a").click(function (event) {
		event.preventDefault()
		$("#login__form").css("display", "none")
		$("#register__form").css("display", "none")
		$("#password_recovery_form").css("display", "block")
		$("#tab-1").prop("checked", false)
		$("#tab-2").prop("checked", false)
		$("#tab-3").prop("checked", true)
		$("#tab-4").prop("checked", false)
	})
}

// LOAD CONTENT
function load_content() {
	let path = window.location.pathname.split("/")
	// console.log("load_content")
	// console.log([path[1], path[2], path[3], path[4], path[5]])
	// console.log("token_email", path[5])

	if (path[4] === "recover") {
		window.location.href = friendlyURL("?module=login&op=recover_view")
		localStorage.setItem("token_email", path[5])
	} else if (path[4] === "verify") {
		ajaxPromise(friendlyURL("?module=login"), "POST", "JSON", {token_email: path[5], op: "verify_email"})
			.then(function (data) {
				// console.log(data)
				// return
				if (data === "verify") {
					toastr.options.timeOut = 3000
					toastr.success("Email verified")
					setTimeout(function () {
						window.location.href = friendlyURL("?module=login")
					}, 3000)
				} else {
					console.log("Then Error: verify email error")
				}
			})
			.catch(function () {
				console.log("Catch Error: verify email error")
			})
	} else if (path[4] === "recover_view") {
		load_form_new_password()
	}
}

$(document).ready(function () {
	switchform()
	load_content()
	click_login()
})

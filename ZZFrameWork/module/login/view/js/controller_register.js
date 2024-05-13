function register() {
	if (validate_register() != 0) {
		var data = []
		var username = document.getElementById("username_reg").value
		var email = document.getElementById("email_reg").value
		var password = document.getElementById("passwd1_reg").value
		data = {username: username, email: email, password: password}
		// console.log(data)

		ajaxPromise("module/login/controller/controller_login.php?op=register", "POST", "JSON", data)
			.then(function (result) {
				console.log("Dentro del then", result)
				if (result == "error_email") {
					document.getElementById("error_email_reg").innerHTML = "The email is already registered"
				} else if (result == "error_username") {
					document.getElementById("error_username_reg").innerHTML = "The username is already registered"
				} else if (result == "error_both") {
					document.getElementById("error_email_reg").innerHTML = "The email is already registered"
					document.getElementById("error_username_reg").innerHTML = "The username is already registered"
				} else {
					toastr.success("User registered correctly")
					setTimeout(function () {
						window.location.href = "index.php?page=login&op=list"
					}, 3000)
				}
			})
			.catch(function (e) {
				console.error("Catch error: ", e)
				// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
			})
	}
}

function key_register() {
	// console.log("key_register")
	$("#register").keypress(function (e) {
		// console.log("key_press")
		var code = e.keyCode ? e.keyCode : e.which
		// Tecla enter=13
		if (code == 13) {
			e.preventDefault()
			register()
		}
	})
}

function button_register() {
	// console.log("button_register")
	$("#register").on("click", function (e) {
		// console.log("button_click")
		e.preventDefault()
		register()
	})
}

function validate_register() {
	// username_exp: 5 caracteres minimo, no caracteres especiales
	var username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/
	// mail_exp: formato de mail
	var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/
	// pssswd_exp: minimo 8 caracteres, mayusculas, minusculas y simbolos especiales
	var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
	var error = false

	if (document.getElementById("username_reg").value.length === 0) {
		document.getElementById("error_username_reg").innerHTML = "You must write a name for your username"
		error = true
	} else {
		if (document.getElementById("username_reg").value.length < 5) {
			document.getElementById("error_username_reg").innerHTML = "The username must be at least 5 characters long"
			error = true
		} else {
			if (!username_exp.test(document.getElementById("username_reg").value)) {
				document.getElementById("error_username_reg").innerHTML = "Special characters are not allowed"
				error = true
			} else {
				document.getElementById("error_username_reg").innerHTML = ""
			}
		}
	}

	if (document.getElementById("email_reg").value.length === 0) {
		document.getElementById("error_email_reg").innerHTML = "You must enter an email"
		error = true
	} else {
		if (!mail_exp.test(document.getElementById("email_reg").value)) {
			document.getElementById("error_email_reg").innerHTML = "The email format is not valid"
			error = true
		} else {
			document.getElementById("error_email_reg").innerHTML = ""
		}
	}

	if (document.getElementById("passwd1_reg").value.length === 0) {
		document.getElementById("error_passwd1_reg").innerHTML = "You must enter a password"
		error = true
	} else {
		if (document.getElementById("passwd1_reg").value.length < 8) {
			document.getElementById("error_passwd1_reg").innerHTML = "The password must be at least 8 characters long"
			error = true
		} else {
			if (!pssswd_exp.test(document.getElementById("passwd1_reg").value)) {
				document.getElementById("error_passwd1_reg").innerHTML =
					"Must contain at least 8 characters, uppercase, lowercase, and special symbols"
				error = true
			} else {
				document.getElementById("error_passwd1_reg").innerHTML = ""
			}
		}
	}

	if (document.getElementById("passwd2_reg").value.length === 0) {
		document.getElementById("error_passwd2_reg").innerHTML = "You must repeat the password"
		error = true
	} else {
		if (document.getElementById("passwd2_reg").value.length < 8) {
			document.getElementById("error_passwd2_reg").innerHTML = "The password must be at least 8 characters long"
			error = true
		} else {
			if (document.getElementById("passwd2_reg").value === document.getElementById("passwd1_reg").value) {
				document.getElementById("error_passwd2_reg").innerHTML = ""
			} else {
				document.getElementById("error_passwd2_reg").innerHTML = "The passwords do not match"
				error = true
			}
		}
	}

	if (error == true) {
		return 0
	}
}

$(document).ready(function () {
	// console.log("ready!")
	key_register()
	button_register()
})

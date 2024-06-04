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
	})

	$(".profile-sidebar a.profile-preferences").click(function (e) {
		e.preventDefault()
		$(".profile-info-sect").hide()
		$(".profile-orders-sect").hide()
		$(".profile-pref-sect").show()
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

$(document).ready(function () {
	click()
	list_profile()
})

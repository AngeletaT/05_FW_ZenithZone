function click() {
	$(".profile-pref-sect, .profile-orders-sect").hide()

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
}

function list_profile() {
	console.log("list_profile")
	var access_token = localStorage.getItem("access_token")
	console.log("access_token", access_token)

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {access_token: access_token, op: "list_profile"})
		.then(function (result) {
			console.log("Dentro del then", result[0])
			// return
			$(".profile-username").text(result[0].username)
			$(".profile-name").text(result[0].name)
			$(".profile-surname").text(result[0].surname)
			$(".profile-email").text(result[0].email)
			$(".profile-phone").text(result[0].phone_number)
			$(".profile-city").text(result[0].city)
			$(".profile-avatar").attr("src", result[0].avatar)
		})
		.catch(function (e) {
			console.error("Catch error: ", e)
			// window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function ajxForSearch SHOP";
		})
}

$(document).ready(function () {
	click()
	list_profile()
})

function click() {
	$(".profile-pref-sect, .profile-orders-sect").hide()

	$(".profile-sidebar a.profile-orders").click(function (e) {
		e.preventDefault()
		$(".profile-pref-sect").hide()
		$(".profile-orders-sect").show()
	})

	$(".profile-sidebar a.profile-preferences").click(function (e) {
		e.preventDefault()
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

	ajaxPromise(friendlyURL("?module=profile"), "POST", "JSON", {"access_token": access_token, "op": "list_profile"})
		.then(function (result) {
			console.log("Dentro del then", result)
			return

			if (result == "error") {
				toastr.error("Error loading profile")
			} else {
				var profile = JSON.parse(result)
				console.log("profile", profile)
				document.getElementById("profile_avatar").src = profile.avatar
				document.getElementById("profile_username").innerHTML = profile.username
				document.getElementById("profile_email").innerHTML = profile.email
				document.getElementById("profile_name").innerHTML = profile.name
			}
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

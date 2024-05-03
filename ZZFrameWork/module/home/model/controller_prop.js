function carrousel_Act() {
	ajaxPromise("module/home/controller/controller_prop.php?op=carrouselAct", "GET", "JSON")
		.then(function (data) {
			// console.log(data)
			for (row in data) {
				$("<div></div>")
					.addClass(`swiper-slide`)
					.css({
						"background-image": `url(${data[row].img_act})`,
						"background-position": "center",
						"background-size": "cover",
					})
					.appendTo(".swiper-wrapper")
					.appendTo("#carrouselAct").html(`
                        <h2 data-aos="fade-up">${data[row].name_act}</h2>
                        <br />
                        <a class="button clickact" data-aos="fade-up" id="${data[row].code_act}">Leer mas</a>
                    `)
			}

			new Swiper(".swiper-container", {
				loop: true,
				autoplay: {
					delay: 2500,
				},
				slidesPerView: 1,
				paginationClickable: true,
			})
		})
		.catch(function () {
			console.log("error")
			// window.location.href = "index.php?page=503";
			// module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
		})
}

function loadCategory() {
	// console.log("hola");
	ajaxPromise("module/home/controller/controller_prop.php?op=listCategory", "GET", "JSON")
		.then(function (data) {
			// console.log("HOLA");
			for (row in data) {
				$("<div></div>")
					.attr("class", "col-md-2 mx-auto")
					.attr({id: data[row].name_cat})
					.appendTo("#containerCategories")
					.html(
						`<div class="article-card" id="${data[row].code_cat}">
							<div class="content">
								<p class="title">${data[row].name_cat}</p>
							</div>
							<img src="${data[row].img_cat}" alt="article-cover"/>
						</div>`
					)
			}
		})
		.catch(function () {
			console.log("error")
			window.location.href = "index.php?page=503"
			// module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
		})
}

function loadCity() {
	// console.log("hola");
	ajaxPromise("module/home/controller/controller_prop.php?op=listCity", "GET", "JSON")
		.then(function (data) {
			// console.log("HOLA");
			for (row in data) {
				$("<div></div>")
					.attr("class", "col-md-2 mx-auto")
					.attr({id: data[row].name_city})
					.appendTo("#containerCities")
					.html(
						`<div class='cardtypeproperty'>
							<img src=${data[row].img_city} alt='foto'/>
							<div class='card-content'>
								<h2>${data[row].name_city}</h2>
								<a class='button clickcity' id="${data[row].code_city}">Find out more<i class='bi bi-arrow-right'></i></a>
							</div>
						</div>`
					)
			}
		})
		.catch(function () {
			console.log("error")
			window.location.href = "index.php?page=503"
			// module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
		})
}

function loadType() {
	// console.log("hola");
	ajaxPromise("module/home/controller/controller_prop.php?op=listType", "GET", "JSON")
		.then(function (data) {
			// console.log("HOLA");
			for (row in data) {
				$("<div></div>")
					.attr("class", "col-md-2 mx-auto")
					.attr({id: data[row].name_type})
					.appendTo("#containerType")
					.html(
						`<div class='cardtypeproperty'>
							<img src=${data[row].img_type} alt='foto'/>
							<div class='card-content'>
								<h2>${data[row].name_type}</h2>
								<a class='button clicktype' id="${data[row].code_type}">Find out more<i class='bi bi-arrow-right'></i></a>
							</div>
						</div>`
					)
			}
		})
		.catch(function () {
			console.log("error")
			window.location.href = "index.php?page=503"
			// module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
		})
}

function loadLastvisit() {
	// console.log("hola");
	ajaxPromise("module/home/controller/controller_prop.php?op=listlastvisit", "GET", "JSON")
		.then(function (data) {
			// console.log(data)
			for (row in data) {
				$("<div></div>")
					.attr("class", "col-md-2 mx-auto")
					.attr({id: data[row].name_prop})
					.appendTo("#containerLastvisit")
					.html(
						`<div class='cardtypeproperty'>
							<img src=${data[row].img_prop} alt='foto'/>
							<div class='card-content'>
								<h2>${data[row].name_prop}</h2>
								<a class='button clicklastvisit' id="${data[row].code_prop}">Find out more<i class='bi bi-arrow-right'></i></a>
							</div>
						</div>`
					)
			}
		})
		.catch(function () {
			console.log("error")
			window.location.href = "index.php?page=503"
			// module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
		})
}

function loadSuggest() {
	// console.log("hola");
	ajaxPromise("module/home/controller/controller_prop.php?op=listSuggest", "GET", "JSON")
		.then(function (data) {
			// console.log(data)
			for (row in data) {
				$("<div></div>")
					.attr("class", "col-md-2 mx-auto")
					.attr({id: data[row].name_prop})
					.appendTo("#containerSuggest")
					.html(
						`<div class='cardtypeproperty'>
							<img src=${data[row].img_prop} alt='foto'/>
							<div class='card-content'>
								<h2>${data[row].name_prop}</h2>
								<a class='button clicksuggest' id="${data[row].code_prop}">Find out more<i class='bi bi-arrow-right'></i></a>
							</div>
						</div>`
					)
			}
		})
		.catch(function () {
			console.log("error")
			window.location.href = "index.php?page=503"
			// module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
		})
}

function carrousel_Extra() {
	// console.log("hola");
	ajaxPromise("module/home/controller/controller_prop.php?op=listExtra", "GET", "JSON")
		.then(function (data) {
			// console.log("HOLA");
			for (row in data) {
				$("<div></div>").attr("class", "item").attr({id: data[row].name_prop}).appendTo("#containerExtra").html(`
							<div class="cardtypeproperty">
								<img src=${data[row].img_extra} alt='foto'/>
								<div class='card-content'>
									<h2>${data[row].name_extra}</h2>
									<a class='button clickextra' id="${data[row].code_extra}">Find out more<i class='bi bi-arrow-right'></i></a>
								</div>
							</div>
						`)
			}
			$(".owl-carousel").owlCarousel({
				loop: true,
				autoplay: true,
				// margin: 10,
				nav: true,
				dots: true,
				responsive: {
					0: {
						items: 1,
					},
					600: {
						items: 3,
					},
					1000: {
						items: 6,
					},
				},
			})
		})
		.catch(function () {
			console.log("error")
			window.location.href = "index.php?page=503"
			// module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
		})
}

function clicks() {
	// TYPE
	$(document).on("click", "a.clicktype", function () {
		// console.log("hola");
		// return false;
		var filters_home = []
		filters_home.push({"type": [this.getAttribute("id")]})
		localStorage.removeItem("filters_home")
		localStorage.setItem("filters_home", JSON.stringify(filters_home))
		// console.log(filters_home);
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})

	// CATEGORY
	$(document).on("click", "div.article-card", function () {
		// console.log("hola");
		// return false;
		var filters_home = []
		filters_home.push({"category": [this.getAttribute("id")]})
		localStorage.removeItem("filters_home")
		localStorage.setItem("filters_home", JSON.stringify(filters_home))
		// console.log(filters_home);
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})

	// CITY
	$(document).on("click", "a.clickcity", function () {
		// console.log("hola");
		// return false;
		var filters_home = []
		filters_home.push({"city": [this.getAttribute("id")]})
		localStorage.removeItem("filters_home")
		localStorage.setItem("filters_home", JSON.stringify(filters_home))
		// console.log(filters_home);
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})

	// EXTRAS
	$(document).on("click", "a.clickextra", function () {
		// console.log("hola");
		// return false;
		var filters_home = []
		filters_home.push({"extra": [this.getAttribute("id")]})
		localStorage.removeItem("filters_home")
		localStorage.setItem("filters_home", JSON.stringify(filters_home))
		// console.log(filters_home);
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})

	// PROPERTY
	$(document).on("click", "a.clicksuggest", function () {
		// console.log("hola");
		// return false;
		var filters_details = []
		filters_details.push({"property": [this.getAttribute("id")]})
		localStorage.removeItem("filters_details")
		localStorage.setItem("filters_details", JSON.stringify(filters_details))
		// console.log(filters_details);
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})

	// LAST VISIT
	$(document).on("click", "a.clicklastvisit", function () {
		// console.log("hola");
		// return false;
		var filters_details = []
		filters_details.push({"property": [this.getAttribute("id")]})
		localStorage.removeItem("filters_details")
		localStorage.setItem("filters_details", JSON.stringify(filters_details))
		// console.log(filters_details);
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})

	// ACTIVITY
	$(document).on("click", "a.clickact", function () {
		// console.log("hola");
		// return false;
		var filters_home = []
		filters_home.push({"activity": [this.getAttribute("id")]})
		localStorage.removeItem("filters_home")
		localStorage.setItem("filters_home", JSON.stringify(filters_home))
		// console.log(filters_home);
		// return false;

		setTimeout(function () {
			window.location.href = "index.php?page=controller_shop&op=list"
		}, 1000)
	})
}

$(document).ready(function () {
	carrousel_Act()
	loadCategory()
	loadCity()
	loadSuggest()
	loadType()
	loadLastvisit()
	carrousel_Extra()
	clicks()
})

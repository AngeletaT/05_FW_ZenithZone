<?php
if (isset($_GET['page'])) {
	switch ($_GET['page']) {
		case "home";
			include("module/home/view/home.html");
			break;
		case "controller_prop";
			include("module/home/controller/".$_GET['page'].".php");
			break;
		case "shop";
			include("module/shop/view/shop.html");
			break;
		case "login";
			include("module/login/controller/controller_login.php");
			break;
		case "controller_shop";
			include("module/shop/controller/controller_shop.php");
			break;
		case "404";
			include("view/inc/error404.html");
			break;
		case "503";
			include("view/inc/error503.html");
			break;
		default;
			include("module/home/view/home.html");
			break;
	}
} else {
	include("module/home/view/home.html");
}
?>
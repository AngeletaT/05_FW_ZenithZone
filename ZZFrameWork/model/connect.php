<?php
class connect
{
	public static function con()
	{

		$connect = parse_ini_file('constantes.ini');
		$host = $connect['BD_HOST'];
		$user = $connect['BD_USER'];
		$pass = "";
		$db = $connect['BD_DB'];
		$port = $connect['BD_PORT'];

		$conexion = mysqli_connect($host, $user, $pass, $db, $port) or die(mysql_error());
		return $conexion;
	}
	public static function close($conexion)
	{
		mysqli_close($conexion);
	}
}
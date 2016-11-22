<?php
session_start();
include 'credentials.php';

$userLogin = "administrator";
$userPassword = "0501621242";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$request->loggedin = false;
if ($request->name === $userLogin && $request->password === $userPassword) {
$request->loggedin = true;
$_SESSION["login"] = $request->name;
$_SESSION["password"] = $request->password;

	echo $request->loggedin;
} else {
	echo $request->loggedin;
}






?>
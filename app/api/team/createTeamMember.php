<?php
session_start();
include '../credentials.php';


$userLogin = "administrator";
$userPassword = "0501621242";

if ($_SESSION["login"] !== $userLogin && $_SESSION["password"] !== $userPassword) {
	die("No auth");
}


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$request->name = str_replace("'", '', $request->name);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO Team (name, status, image_url) VALUES ('$request->name', '$request->status', '$request->image_url')";

if ($conn->query($sql) === TRUE) {
	$last_id = $conn->insert_id;
    echo $last_id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();







?>
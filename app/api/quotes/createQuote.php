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
$request->text = str_replace("'", '', $request->text);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO Quotes (text, author) VALUES ('$request->text', '$request->author')";

if ($conn->query($sql) === TRUE) {

 	echo "Цитату '" . $request->text . "' додано успішно.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();







?>
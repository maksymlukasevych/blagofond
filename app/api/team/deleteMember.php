<?php
session_start();
include '../credentials.php';

$userLogin = "administrator";
$userPassword = "0501621242";

if ($_SESSION["login"] !== $userLogin && $_SESSION["password"] !== $userPassword) {
	die("No auth");
}



$id = $_POST["id"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection


// sql to delete a record
$sql = "DELETE FROM Team WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}
$newURL = "http://localhost/fond/fond/app/#/dashboard/members";
$conn->close();
header('Location: '.$newURL);
?>
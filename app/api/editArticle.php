<?php
session_start();
include 'credentials.php';

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

$sql = "UPDATE News SET title='$request->title', spec='$request->spec', date='$request->date', text='$request->text', image_url='$request->image_url' WHERE id='$request->id'";

if ($conn->query($sql) === TRUE) {
    echo $request->id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();





// $request->title = "lolo";
// echo(json_encode($request));





?>
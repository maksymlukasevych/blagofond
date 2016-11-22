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

$sql = "INSERT INTO Needs (title, spec, amount, date, text, p_id, image_url)
VALUES ('$request->title', '$request->spec', '$request->amount', '$request->date', '$request->text', '$request->p_id', '$request->image_url' )";

if ($conn->query($sql) === TRUE) {
	$last_id = $conn->insert_id;
    echo $last_id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();





// $request->title = "lolo";
// echo(json_encode($request));





?>
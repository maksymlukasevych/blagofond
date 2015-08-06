<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "newsDB";


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO News (title, spec, date, text)
VALUES ('$request->title', '$request->spec', '$request->date', '$request->text')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();





// $request->title = "lolo";
// echo(json_encode($request));





?>
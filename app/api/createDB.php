<?php
include 'credentials.php';
// Create connection
// $conn = new mysqli($servername, $username, $password);

// Check connection
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// } 
// echo "Connected successfully";



// // Create database
// $sql = "CREATE DATABASE newsDB";
// if ($conn->query($sql) === TRUE) {
//     echo "Database created successfully";
// } else {
//     echo "Error creating database: " . $conn->error;
// }

$conn = mysqli_connect($servername, $username, $password, $dbname);


// sql to create table
$sql = "CREATE TABLE News (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(142) NOT NULL,
spec VARCHAR(242) NOT NULL,
date VARCHAR(20),
text TEXT,
image_url VARCHAR(250) NOT NULL,
checked BOOLEAN 
)";

if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();

?>
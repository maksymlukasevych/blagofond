<?php
include '../credentials.php';

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 





$conn = mysqli_connect($servername, $username, $password, $dbname);


$sql = "CREATE TABLE Quotes (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
text VARCHAR(342) NOT NULL,
author VARCHAR(100) NOT NULL
)";



if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();

?>
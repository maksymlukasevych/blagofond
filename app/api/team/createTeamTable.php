<?php
include '../credentials.php';

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 





$conn = mysqli_connect($servername, $username, $password, $dbname);


$sql = "CREATE TABLE Team (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(142) NOT NULL,
status VARCHAR(100) NOT NULL,
image_url VARCHAR(142)
)";



if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();

?>
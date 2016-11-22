<?php
include '../credentials.php';
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
// $sql = "CREATE TABLE Fields (
// f_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// title VARCHAR(142) NOT NULL
// )";

// ALTER TABLE yourtable ADD q6 VARCHAR( 255 ) after q5
$sql = "ALTER TABLE Fields ADD image_url VARCHAR( 255 ) after title";
// $sql = "CREATE TABLE Projects (
// p_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// title VARCHAR(142) NOT NULL,
// f_id INT(6) UNSIGNED,
// FOREIGN KEY (f_id) REFERENCES Fields(f_id) 
// )";

// $sql = "DROP TABLE Projects";

// $sql = "CREATE TABLE Needs (
// id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// title VARCHAR(142) NOT NULL,
// spec VARCHAR(242) NOT NULL,
// amount VARCHAR(242),
// date VARCHAR(20),
// text TEXT,
// image_url VARCHAR(250) NOT NULL,
// checked BOOLEAN,
// p_id INT(6) UNSIGNED,
// FOREIGN KEY (p_id) REFERENCES Projects(p_id)
// )";

if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();

?>
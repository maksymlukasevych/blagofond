<?php
session_start();

include '../credentials.php';
// $userLogin = "administrator";
// $userPassword = "0501621242";

// if ($_SESSION["login"] !== $userLogin && $_SESSION["password"] !== $userPassword) {
// 	die("No auth");
// }



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 







$sql = "SELECT * FROM Fields";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    	

		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
		    $rows[] = $r;
		}
		print json_encode($rows);   
    
} else {
    echo "0 results";
}





$conn->close();








// echo json_encode($result);







// $request->title = "lolo";
// echo(json_encode($request));





?>
<?php

include 'credentials.php';




// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 







$sql = "SELECT id, title, checked, spec, image_url, date FROM News";
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
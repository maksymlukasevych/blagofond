  <?php
  session_start();
  // $servername = "localhost";
  // $username = "root";
  // $password = "";
  // $dbname = "newsDB";
  include '../credentials.php';

  $userLogin = "administrator";
  $userPassword = "0501621242";

  $id = $_POST['id'];

  if ($_SESSION["login"] !== $userLogin && $_SESSION["password"] !== $userPassword) {
    die("No auth");
  }

  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } 





  if ($_FILES['file']['name']) {
    if (!$_FILES['file']['error']) {
    $name = md5(rand(100, 200));
    $ext = explode('.', $_FILES['file']['name']);
    $filename = $name . '.' . $ext[1];
    $destination = '../../images/uploads/' . $filename;
    $location = $_FILES["file"]["tmp_name"];
    move_uploaded_file($location, $destination);
    
    $fileFinal = 'http://bfrozvytok.com.ua/images/uploads/' . $filename;
    $sql = "UPDATE Team SET image_url='$fileFinal' WHERE id='$id'";
    if ($conn->query($sql) === TRUE) {
      echo $fileFinal;
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
  }
  else
  {
    echo  $message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['file']['error'];
  }
}
            $conn->close();
            ?>
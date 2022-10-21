<?php
require "./conn.php";
global $conn;

$sql = "INSERT INTO base (jmeno, mleko, espresso, coffe, longcoffee, doppio) VALUES (?,?,?,?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("siiiii", $_POST["jmeno"], $_POST["mleko"], $_POST["espresso"], $_POST["coffe"], $_POST["long"], $_POST["doppio"]);
print_r ($_POST);
exit;
if($stmt->execute()){
    header("location: ./index.php");
}
?>
<?php
require "./conn.php";
global $conn;

$item = "";
$sql = "SELECT * FROM base";
$stmt = $conn->prepare($sql);
if($stmt->execute()){
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $item = $row['id']." ".$row['jmeno']." ".$row['mleko']." ".$row['espresso']." ".$row['coffe']." ".$row['longcoffee']." ".$row['doppio']." ".$row['date_created'];
    }
} else{
    $item = "xd";
}

echo $item;

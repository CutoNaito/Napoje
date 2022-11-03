<?php
require "./conn.php";
global $conn;

$name = array();
$typ = array();
$count = array();
$sql = "SELECT name, typ, COUNT(typ) FROM drinks INNER JOIN people ON people.id = drinks.id_people INNER JOIN types ON types.id = drinks.id_types WHERE name = ? GROUP BY typ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $_POST["value"]);
if($stmt->execute()){
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $name = $row['name'];
        $typ[] = $row['typ'];
        $count[] = $row['COUNT(typ)'];
    }
} else{
    $item = "xd";
}
$typ = implode(" ", $typ);
$count = implode(" ", $count);
setcookie("name", $name, time() + 3600, "/");
setcookie("typ", $typ, time() + 3600, "/");
setcookie("count", $count, time() + 3600, "/");
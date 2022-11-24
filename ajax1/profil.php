<?php
session_start();
require "conn.php";
require "functions.php";
global $conn;

$sql = "SELECT name, typ, COUNT(typ), MONTH(date) FROM drinks " .
       "INNER JOIN people ON people.id = drinks.id_people " .
       "INNER JOIN types ON types.id = drinks.id_types " .
       "WHERE name = ? AND MONTH(date) = ? " .
       "GROUP BY MONTH(date), typ";
$current_month = date("m");
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $_SESSION["username"], $current_month);
if($stmt->execute()){
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $name = $row['name'];
        $typ[] = $row['typ'];
        $count[] = $row['COUNT(typ)'];
        $mesic[] = $row['MONTH(date)'];
    }
} else{
    $item = "xd";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Uloha AJAX1</title>
    <script src="./script.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
    <h1>Napoje</h1>
    <a href="login/register.php">Register</a>
</header>
<main>
    <h1><?php echo $name ?></h1>
    <h2><?php echo $current_month ?></h2>
    <table id="mesicni-vypis">
        <tr id="table-header">
            <th>Typ</th>
            <th>Pocet</th>
        </tr>
        <?php
        for($i = 0; $i < count($typ); $i++){
            echo "<tr>";
            echo "<td>" . $typ[$i] . "</td>";
            echo "<td>" . $count[$i] . "</td>";
            echo "</tr>";
        }
        ?>
    </table>
    <button onclick="<?php
        WriteIntoCSV("file.csv", $name, $typ, $count, $mesic);
        ?>">Export</button>
</main>
</body>
</html>
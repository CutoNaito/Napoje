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
$name = $_SESSION["username"];
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $_SESSION["username"], $current_month);
if($stmt->execute()){
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
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
    <link rel="stylesheet" href="styles/sass.css">
</head>
<body>
<header>
    <h1>Napoje</h1>
    <?php if(!isset($_SESSION["logged"]) || $_SESSION["logged"] !== true){?>
        <a href="login/register.php">Register</a>
        <a href="login/login.php">Login</a>
        <a href="login/signin.php">Login with Office365</a>
    <?php } else { ?>
        <a href="login/logout.php">Logout</a>
        <a href="index.php">Home</a>
    <?php } ?>
</header>
<main>
    <div class="container">
        <div class="table-card">
            <h1><?php echo $name ?></h1>
            <h2><?php echo $current_month ?></h2>
            <table id="mesicni-vypis">
                <tr id="table-header">
                    <th>Typ</th>
                    <th>Pocet</th>
                </tr>
                <?php
                if(isset($typ)){
                    for($i = 0; $i < count($typ); $i++){
                        echo "<tr>";
                        echo "<td>" . $typ[$i] . "</td>";
                        echo "<td>" . $count[$i] . "</td>";
                        echo "</tr>";
                    }
                }
                ?>
            </table>
            <button onclick="<?php
                WriteIntoCSV("file.csv", $name, $typ, $count, $mesic);
                ?>">Export</button>
        </div>
    </div>
</main>
</body>
</html>
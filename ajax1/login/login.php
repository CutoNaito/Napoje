<?php
session_start();
require "../conn.php";
require "../functions.php";
global $conn;

if (isset($_SESSION["logged"]) && $_SESSION["logged"] === true) {
    header("location: ../index.php");
    exit;
}

$username = "";
$password = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($_POST["username"] !== "") {
        $username = trim($_POST["username"]);
    }
    if ($_POST["password"] !== "") {
        $password = trim($_POST["password"]);
    }
    $sql = "SELECT ID, name, password, email FROM people WHERE name = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $username);

        if($stmt->execute()){
            $stmt->store_result();

            if($stmt->num_rows() == 1) {
                $stmt->bind_result($id, $username, $hashed_password, $email);
                if ($stmt->fetch()) {
                    echo $hashed_password, $username, $password;
                    if (password_verify($password, $hashed_password)) {
                        session_start();

                        $_SESSION["username"] = $username;
                        $_SESSION["email"] = $email;
                        $_SESSION["logged"] = true;

                        header("location: ../index.php");
                    } else {
                        echo("Username or password is incorrect");
                    }
                }
            }
            }
            $stmt->close();
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="../registerstyle.css">
</head>
<body>
<main>
    <form id="login_form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <input type="text" name="username" id="username" placeholder="Username">
        <input type="password" name="password" id="password" placeholder="Password">
        <input type="submit" value="Login">
    </form>
</main>
</body>
</html>
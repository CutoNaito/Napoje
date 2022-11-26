<?php
require "../conn.php";
global $conn;
session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(trim($_POST["verify"]) == $_SESSION["token"]){
        $sql = "INSERT INTO people (name, password, email) VALUES (?, ?, ?)";
        if($stmt = $conn->prepare($sql)){
            $stmt->bind_param("sss", $param_username, $param_password, $param_email);
            $param_username = $_SESSION["username"];
            $param_password = $_SESSION["password"];
            $param_email = $_SESSION["email"];
            if($stmt->execute()){
                session_start();
                $_SESSION["logged"] = true;
                header("location: ../index.php");
            } else{
                echo "Something went wrong. Please try again later.";
            }
            $stmt->close();
        }
    } else{
        echo "Wrong verification code.";
    }
}
?>

<html>
<head>
    <title>Verify - Napoje</title>
    <link rel="stylesheet" href="../registerstyle.css">
    <meta charset="UTF-8">
</head>
<body>
<main>
    <form id="verification_form" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <input type="text" name="verify" id="verify" placeholder="Verification code">
        <input type="submit" value="Verify">
    </form>
</main>
</body>
</html>

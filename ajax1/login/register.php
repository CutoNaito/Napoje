<?php
    require "../conn.php";
    require "../functions.php";
    require "../PHPMailer/PHPMailer.php";
    require "../PHPMailer/SMTP.php";
    require "../PHPMailer/Exception.php";
    require "../PHPMailer/mail.php";
    global $conn;
    global $mail_username;
    global $mail_password;

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = "smtp.seznam.cz";
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = "tls";
    $mail->Port = "465";
    $mail->Username = $mail_username;
    $mail->Password = $mail_password;

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(trim($_POST["username"]) !== ""){
            $sql = "SELECT id FROM users WHERE username = ?";

            if($stmt = $conn->prepare($sql)){
                $stmt->bind_param("s", $param_username);

                $param_username = trim($_POST["username"]);

                if($stmt->execute()){
                    $stmt->store_result();

                    if($stmt->num_rows == 1){
                        $username_err = "This username is already taken.";
                    } else{
                        $username = trim($_POST["username"]);
                    }
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
                $stmt->close();
            }
        }
        if (trim($_POST["password"]) !== "") {
            $password = trim($_POST["password"]);
        }
        if (trim($_POST["email"]) !== "") {
            $sql = "SELECT id FROM users WHERE email = ?";

            if($stmt = $conn->prepare($sql)){
                $stmt->bind_param("s", $param_email);

                $param_email = trim($_POST["email"]);

                if($stmt->execute()){
                    $stmt->store_result();

                    if($stmt->num_rows == 1){
                        $email_err = "This email is already taken.";
                    } else{
                        $email = trim($_POST["email"]);
                    }
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
                $stmt->close();
            }
        }
        $_SESSION["username"] = $username;
        $_SESSION["email"] = $email;
        $_SESSION["password"] = $password;
        $_SESSION["token"] = GenerateRandomString(20);
        $mail->Subject = "Verification code";
        $mail->Body = "Your verification code is: " . $_SESSION["token"];
        try {
            $mail->setFrom($mail_username, "Napoje");
            $mail->addAddress($email);
            if($mail->send()){
                header("location: verify.php");
            } else{
                echo "Something went wrong. Please try again later.";
            }
        } catch (Exception $e) {
            echo "Something went wrong. Please try again later.";
        }
    }
?>

<html>
<head>
<title>Uloha AJAX1</title>
<script src="../script.js"></script>
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<main>
<div>
    <form id="register" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <input type="text" name="username" id="username" placeholder="Username">
        <input type="text" name="email" id="email" placeholder="Email">
        <input type="password" name="password" id="password" placeholder="Password">
        <input type="submit" value="Register">
    </form>
</div>
</main>
</body>
</html>

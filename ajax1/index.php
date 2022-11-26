<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
                <a href="profil.php">Profil</a>
            <?php } ?>
        </header>
        <main>
            <div class="container">
                <div class="form-card">
                    <div class="form-element">
                        <form onsubmit="showValue()" id="form" name="form">
                            <div class="form-text">
                                <label for="mleko">Mleko</label>
                                <input type="text" name="mleko" id="mleko">
                                <br>
                                <label for="espresso">Espresso</label>
                                <input type="text" name="espresso" id="espresso">
                                <br>
                                <label for="coffe">Coffe</label>
                                <input type="text" name="coffe" id="coffe">
                                <br>
                                <label for="long">Long</label>
                                <input type="text" name="long" id="long">
                                <br>
                                <label for="doppio+">Doppio+</label>
                                <input type="text" name="doppio+" id="doppio">
                                <br>
                            </div>
                            <div class="form-submit">
                                <input type="submit" value="Submit">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="select-card">
                    <select id="select" name="select" onchange="postValues()">
                        <option value="Masopust Lukáš">Masopust Lukas</option>
                        <option value="Molič Jan">Molic Jan</option>
                        <option value="t">t</option>
                    </select>
                    <button onclick="getValues()">Get</button>
                    <p id="result2"></p>
                </div>
                <div class="table-card">
                    <h2 id="name"></h2>
                    <table id="table">
                        <tr>
                            <th>Typ</th>
                            <th>Pocet</th>
                            <th>Cena</th>
                        </tr>
                        <tr>
                            <td id="typ"></td>
                            <td id="count"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </main>
        <?php include "components/footer.php"; ?>
    </body>
</html>
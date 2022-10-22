<?php

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Uloha AJAX1</title>
        <script src="./script.js"></script>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <main>
            <div>
                <form onsubmit="showValue()" id="form" name="form">
                    <input type="radio" name="jmeno" value="masopust" id="masopust">
                    <label for="masopust">Masopust Lukas</label>
                    <br>
                    <input type="radio" name="jmeno" value="molic" id="molic">
                    <label for="molic">Molic Jan</label>
                    <br>
                    <input type="radio" name="jmeno" value="t" id="t">
                    <label for="t">t</label>
                    <br>
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
                    <input type="submit" value="odeslat">

                </form>

                <p id="result"></p>
                <button value="show" id="valuebutton" onclick=getValues()></button>
            </div>
            <div id="dropdown">
                <select id="select" name="select" onchange="postValues()">
                    <option value="Masopust Lukáš">Masopust Lukas</option>
                    <option value="Molič Jan">Molic Jan</option>
                    <option value="t">t</option>
                </select>
                <button onclick="GetValues()">Get</button>
                <button onclick="CountValues()">Ceny</button>
                <p id="result2"></p>
            </div>
            <div id="table_div">
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
        </main>
    </body>
</html>
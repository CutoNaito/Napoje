const encoder = new TextEncoder();

function showValue(){
    let jmeno = document.forms["form"]["jmeno"].value;
    let mleko = document.forms["form"]["mleko"].value;
    let espresso = document.forms["form"]["espresso"].value;
    let coffe = document.forms["form"]["coffe"].value;
    let long = document.forms["form"]["long"].value;
    let doppio = document.forms["form"]["doppio+"].value;

    let values = {
        jmeno,
        mleko,
        espresso,
        coffe,
        long,
        doppio
    };

    let result = "?jmeno=" + jmeno + "&mleko=" + mleko + "&espresso=" + espresso + "&coffe=" + coffe + "&long=" + long + "&doppio=" + doppio;
    alert(result);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "./procedure.php", true);
    xmlhttp.send(result);
    
    event.preventDefault();
}

function getValues(){
    const button = document.getElementById("valuebutton");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("result").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("GET", "./get.php");
    xmlhttp.send();
}

function postValues(){
    let value = document.getElementById("select").value;
    let result = "value=" + value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "./vypis.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(result);
    const table = document.getElementById("table");
    while(table.rows.length > 1){
        table.deleteRow(1);
    }
}

function GetValues(){
    let name = decodeURIComponent(getCookie("name"));
    document.getElementById("name").innerHTML = name;
    const table = document.getElementById("table");
    const typ = decodeURIComponent(getCookie("typ"));
    const count = decodeURIComponent(getCookie("count"));
    const typ_array = typ.split(" ");
    const count_array = count.split(" ");
    for(let i = 0; i < typ_array.length; i++){
        let row = table.insertRow(i + 1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = typ_array[i];
        cell2.innerHTML = count_array[i];
        cell3.innerHTML = CountValues()[i] + " Kč";
    }
    let row2 = table.insertRow(typ_array.length + 1);
    let cell3 = row2.insertCell(0);
    let cell4 = row2.insertCell(1);
    let cell5 = row2.insertCell(2);
    cell3.innerHTML = "Celkem";
    cell4.innerHTML = count_array.reduce((a, b) => parseInt(a) + parseInt(b));
    cell5.innerHTML = CountValues()[1] + CountValues()[2] + CountValues()[3] + CountValues()[4] + CountValues()[5] + " Kč";

}

// https://stackoverflow.com/questions/10730362/get-cookie-by-name
function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

function CountValues(){
    const count = decodeURIComponent(getCookie("count"));
    const count_array = count.split(" ");
    let mlekoKg = (50 * count_array[0]) / 1000;
    let espressoKg = (7 * count_array[1]) / 1000;
    let coffeKg = (14 * count_array[2]) / 1000;
    let longKg = (14 * count_array[3]) / 1000;
    let doppioKg = (21 * count_array[4]) / 1000;

    let mlekoCena = mlekoKg * 300;
    let espressoCena = espressoKg * 300;
    let coffeCena = coffeKg * 300;
    let longCena = longKg * 300;
    let doppioCena = doppioKg * 300;

    let celkem = mlekoCena + espressoCena + coffeCena + longCena + doppioCena;
    return [mlekoCena, espressoCena, coffeCena, longCena, doppioCena, celkem];
}
<?php
function GenerateRandomString($lemgth){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $lemgth; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function WriteIntoCSV($path, $name, $typ, $count, $mesic){
    $file = fopen($path, "w");
    fputcsv($file, array("name", "typ", "count", "mesic"));
    for($i = 0; $i < count($typ); $i++){
        fputcsv($file, array($name, $typ[$i], $count[$i], $mesic[$i]));
    }
    fclose($file);
}
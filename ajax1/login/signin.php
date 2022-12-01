<?php
session_start();
require "../vendor/autoload.php";
use myPHPnotes\Microsoft\Auth;
$tenant = "common";
$client_id = "c56f1660-efc5-49ab-a5ca-f26a17f36e43";
$client_secret = "3JR8Q~6AmWfvw8XidN4OsZ2y9gqH0OThWduNwcP0";
$callback = "http://localhost:80/public/napoje-ajax/ajax1/callback.php";
$scopes = ["User.Read"];
$microsoft = new Auth($tenant, $client_id, $client_secret,$callback, $scopes);
header("location: " . $microsoft->getAuthUrl());
?>


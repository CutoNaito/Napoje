<?php
session_start();
require "vendor/autoload.php";
use myPHPnotes\Microsoft\Auth;
$tenant = "common";
$client_id = "f6e12fd3-c628-4694-9c44-290e89e71543";
$client_secret = "s_cB1Aj-0I.0XWa3eVJ6SSf~1EQS3E5r~3";
$callback = "http://localhost:8080/callback.php";
$scopes = ["User.Read"];
$microsoft = new Auth($tenant, $client_id, $client_secret,$callback, $scopes);
header("location: " . $microsoft->getAuthUrl());
?>


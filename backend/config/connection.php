<?php

    $host="localhost";
    $db="agenda";
    $user="root";
    $pass="";

    try {
      $conn=new PDO("mysql:host=$host;dbname=$db",$user,$pass);
    } catch (MysqliError $e) {
        $error = $e->getMessage();
        echo $error;
    }
?>

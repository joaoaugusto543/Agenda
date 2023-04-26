<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type:application/json");

    include_once('connection.php');

    $body=file_get_contents("php://input");

    $body=json_decode($body);

    function response($codigo,$msg,$data=null){
        http_response_code($codigo);

        echo (json_encode([
            "msg"=>$msg,
            "contacts"=>$data,
        ]));

        die;
    }

?>
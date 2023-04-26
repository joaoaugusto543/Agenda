<?php

    include_once('../config/config.php');

    error_reporting(0);

    if($_SERVER['REQUEST_METHOD']==='GET'){
        $stm=$conn->prepare("SELECT * FROM contacts");

        $stm->execute();

        $data=$stm->fetchAll(PDO::FETCH_ASSOC);
   
        for($i=0;$i > count($data);$i++ ){
            $data[$i]=json_encode($data[$i]);
        }

        response(200,'',$data);

        $conn->close();

    }else if($_SERVER['REQUEST_METHOD']==='OPTIONS'){

        response(200,'...');

        $conn->close();
        
    }else{
        response(500,'Method inválido');

        $conn->close();
    }

?>
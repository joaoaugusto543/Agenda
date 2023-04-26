<?php
    include_once("../config/config.php");

    if($_SERVER["REQUEST_METHOD"]==="POST"){
        
        if(!$body){
            response(500,"Dados não enviados");
        }

        $name=$body->name;
        $phone=$body->phone;
        $observations =$body->observations; 

        if(!$name || !$phone){
            response(500,"Dados inválidos");
        }

        function phoneValidation($phone){
        
            if(preg_match("/\(?\d{2}\)?\s?\d{5}\-?\d{4}/", $phone)) {
                return true;
            }else{
                return false;
            }
        }

        if(!phoneValidation($phone)){
            response(500,"Telefone inválido");
        }


        $stm=$conn->prepare("INSERT INTO contacts(name,phone,observations) VALUES(:name,:phone,:observations)");

        $stm->bindParam(":name",$name);
        $stm->bindParam(":phone",$phone);
        $stm->bindParam(":observations",$observations);

        $stm->execute();

        response(200,"Contato adicionado com sucesso");

        $conn->close();


    }else if($_SERVER["REQUEST_METHOD"]==="OPTIONS"){
        response(200,"...");

        $conn->close();
    }else{
        response(500,"Method inválido");

        $conn->close();
    }
?>
<?php
    include_once("../config/config.php");

    if($_SERVER["REQUEST_METHOD"]==="POST"){
        $id=$body->id;

        if(!$id){
            response(404,"Usuário não encontrado");
        }

        $name=$body->name;
        $phone=$body->phone;
        $observations =$body->observations; 
        
        if($name === "" || $phone===""){
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
            response(500,"Celular inválido");
        }

        $stm=$conn->prepare("UPDATE contacts 
                             SET name=:name,
                                phone=:phone,
                                observations=:observations
                             WHERE id=:id");


        $stm->bindParam(":id",$id);
        $stm->bindParam(":name",$name);
        $stm->bindParam(":phone",$phone);
        $stm->bindParam(":observations",$observations);

        $stm->execute();

        response(200,"Usuário atualizado com sucesso");

        $conn->close();

    }else if($_SERVER["REQUEST_METHOD"]==="OPTIONS"){

        response(200,"...");

    }else{
        response(500,"Method inválido");
    }
?>

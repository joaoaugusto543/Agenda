<?php
    include_once('../config/config.php');

    error_reporting(0);

    if($_SERVER['REQUEST_METHOD']==='POST'){
        $id=$body->id;

        if(!$id){
            response(404,'Usuário não encontrado');
        }

        $stm=$conn->prepare("DELETE FROM contacts WHERE id=:id");

        $stm->bindParam(':id',$id);

        $stm->execute();

        response(200,'Usuário deletado com sucesso');

        $conn->close();

    }else if($_SERVER['REQUEST_METHOD']==='OPTIONS'){

        response(200,'...');

    }else{
        response(500,'Method inválido');
    }
?>
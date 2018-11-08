<?php
    require 'flight/Flight.php';

    function getLink(){
        $link = mysqli_connect('pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306', 'qd8hb5kohkg5ouhl', 'gzpt6w2mcy626875', 'ix6m7u0ub3njb1bf');
        mysqli_query($link, "SET NAMES 'utf8'");
        mysqli_query($link, 'SET character_set_connection=utf8');
        mysqli_query($link, 'SET character_set_client=utf8');
        mysqli_query($link, 'SET character_set_results=utf8');

        return $link;
    }
 
    // Get filmes
    Flight::route('GET /filmes', function(){
        $link = getLink();
        $query = "SELECT * FROM Filmes;";
        $resultado= mysqli_query($link, $query);
        $narray = [];
        while($array = mysqli_fetch_array($resultado)){
            $narray[] = $array;
        }
        mysqli_close($link);

        echo json_encode($narray);
      });

      // pega filmes recomensdados
      Flight::route('GET /filmes/r', function(){
        $link = getLink();
        $query = "SELECT * FROM Filmes WHERE nota IS NULL;";
        $resultado= mysqli_query($link, $query);
        $narray = [];
        while($array = mysqli_fetch_array($resultado)){
            $narray[] = $array;
        }
        mysqli_close($link);

        echo json_encode($narray);
      });

      // Post filmes
    Flight::route('POST /filmes', function(){
        $data = Flight::request()->data; 
        $nome = $data['nome'];
        $desq = $data['descricao'];

        $link = getLink();
        $query = "INSERT INTO Filmes(nome_filme,descricao) VALUES('$nome','$desq
        ');";
        mysqli_query($link, $query);
        mysqli_close($link);
    

      });

      //deleta filmes

      Flight::route('DELETE /filmes/@id', function($id){
        $link = getLink();
        $query = "DELETE FROM Filmes WHERE cod_filme='$id';";
        mysqli_query($link, $query);
        mysqli_close($link);
        echo"{}";
      });
      
      // atualizar

      Flight::route('PUT /filmes/@id', function($id){
        $data = Flight::request()->data; 
        $nome = $data['nome'];
        $desq = $data['descricao'];
        $nota = $data['nota'];

        $link = getLink();
        $query = "UPDATE Filmes SET nome_filme='$nome', descricao='$desq', nota=$nota WHERE cod_filme=$id;";
        mysqli_query($link, $query);
        mysqli_close($link);
        echo"{}";
    

      });
      
    Flight::start();
?>
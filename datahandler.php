

<?php

//Php file that handles GET requests from the client side  
//Uses data.class.php which is an api that interacts with the database 


include('data.class.php');

  
    /*		if(isset($_GET['action'])){
          $data = new data();
          $method = $_GET['method'];
          $data->$method();
             }

         if(isset($_GET['getreviews'])){
            $data = new data();
            $method = $_GET['method'];
            $id = $_GET['id'];
            $data->$method($id);
         }*/
    
  if($_GET['action'] == 'getMovieData'){
    $data = new data();
    $data->getMovieData();
  }

  if($_GET['action'] == 'getReviews'){
    $id = $_GET['id'];
    $data = new data();
    $data->getUserReviews($id);
      }





?>
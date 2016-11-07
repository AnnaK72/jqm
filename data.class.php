



<?php
// class that interacts with the database class 
include('myDB.class.php');


class Data{
public $db;

	public function __construct(){
		
		$this->db = new myDB("localhost","root","","movies");
	}



public function getMovieData(){
	$result = $this->db->getMovieDetails();
	var_dump($result);
	echo json_encode($result);

 }

 public function getUserReviews($id){
 	$result = $this->db->getUserReviews($id);
	echo json_encode($result);
 }

 public function insertUserReview($id, $name, $text){
 	$result = $this->db->insertReview($id, $name, $text);
 }



}//end class

?>



<?php
//a class that connects to the mySql database 


class myDB{
	public $query;
	public $myConnection;

	public function __construct($host,$username, $password, $dbname){
		$this->myConnection = mysqli_connect($host, $username,$password,$dbname);

	}



	public function getMovieDetails(){
		$this->query = "SELECT *
						FROM movie_details"
						or die("Error...".mysqli_error($myConnection));
						
		$result = $this->myConnection->query($this->query);

   		$arr = array();
		while($row = mysqli_fetch_assoc($result)){
         array_push($arr, $row);
      		 }
       return $arr;
	}

   public function getUserReviews($movieId){
		$this->query = "SELECT user_reviews.user, user_reviews.date, user_reviews.user_review
						FROM user_reviews
						WHERE user_reviews.movie_id = ".$movieId 
						or die("Error...".mysqli_error($myConnection));
				
		$result = $this->myConnection->query($this->query);

   		$arr = array();
		while($row = mysqli_fetch_assoc($result)){
         array_push($arr, $row);
      		 }
       return $arr;
	}	

	public function insertReview($id,$user,$review){
		$now = date('Y-m-d');
		$this->query = "INSERT INTO user_reviews(movie_id, user, date, user_review)
						VALUES(".$id.",'".$user."','".$now."','".$review."')" 
						or die("Error...".mysqli_error($myConnection));
		echo($this->query);				
		$this->myConnection->query($this->query);
	}	 
	


}

?>

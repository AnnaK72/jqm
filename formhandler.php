


<?php
// Php file to handle POST data from form 
include('data.class.php');


	$name = $_POST['user'];
	$text = $_POST['text'];
	$id = $_POST['id'];
	
	$data = new data();
	$data->insertUserReview($id,$name,$text);

	echo "</div><h2>Thanks ".$name."</h2> </div>";
	echo "<div>If you are not redirected in 10 seconds click <a href='../index.html'>here</a></div>";
	header('Refresh: 10; URL=../index.html');
	

	
?>
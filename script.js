

$("document").ready(function(){
	
	
	var url = "php/datahandler.php?action=getMovieData";
console.log("document ready");
	$.getJSON(url, function(data){
		console.log("some text");
		console.log(data);
		var myArray =[];
		$.each(data, function(i, value){
		myArray.push(value);
		});
		// pass the array into the displayData method:
	displayData(myArray);
	 });//end getjson  
	
	function displayData(items){
   console.log(items);
  	 $.each(items, function(i, value){
   	//assign the values in the array to variables:
      	var movieid, movietitle, genre, director, actors, review, imageSrc;
      	movieid = value.id;
        movietitle = value.title;
     	genre = value.genre;
   		director = value.director;
        actors = value.actors;
      	review = value.our_review;
      	imageSrc = value.image;
       	
   		//for each item in the array create a <li> tag and append it to the list view with a link to a new virtual page
   		$(".myList").append('<li data-icon="info"><a href="#page' + movieid + '"data-transition="slideup">' + movietitle + ' </a></li>');
   		//refresh the listview after adding each <li>
		$(".myList").listview("refresh");
		//dynamically create a new page for each value in the array and append it to the DOM:
		$("#container").append('<div data-role="page" id= "page' + movieid + '">' + addHeader(movietitle) + '<div data-role="content"><div class="content-primary"><div data-demo-html="true">' +'<img src="' + imageSrc + '">' + addData(director, actors, genre, review) + UserReviewsBtn(movieid)+ writeReviewBtn() + backBtn() + '</div></div></div></div>');

		 });//end each

		}//end displayData   

		//function to create a header for each new page
	function addHeader(movietitle){
		var myhtml = "";
		myhtml += "<div data-role='header'>";
		myhtml += "<h1>" + movietitle + "</h1>";
		myhtml += "</div>";
		return myhtml;
	}
		//function to create the content of each new page
	function addData(director, actors, genre, review){
		var myhtml = "";
		myhtml += "<div class='infoDiv'> Director: " + director + "<br>";
		myhtml += "Actors: " + actors + "</br>";
		myhtml += "Genre: " + genre;
		myhtml += "</div> " + "<div class='reviewDiv'><h2>Our Review</h2>" + review + "</div>";			
	  	 
		return myhtml;
	}
	//function to create the 'back home' button on each dynamically injected page:
	function backBtn(){
		var myhtml = "";
		myhtml += "<a href='#home'  class='ui-btn ui-btn-inline ui-corner-all ui-btn-icon-left ui-icon-back backBtn'>Back To Home</a>";
			return myhtml;	
			}

	function UserReviewsBtn(movieid){
		var myhtml = "";
		myhtml += "<div class='links'><button id='review" + movieid + "' class='ui-btn ui-btn-inline ui-corner-all'>See User Reviews</button>";
		return myhtml;
		}

	function writeReviewBtn(){
		var myhtml = "";
		myhtml += "<a href='#formpage' class='ui-btn ui-btn-inline ui-corner-all'>Write A Review</a></div>";
		return myhtml;
			}




	
	$("#container").on("click", "button[id^='review']",  getUserReviews);
	//function to get user reviews from backend
	function getUserReviews(){
		var elem = $(this);
		var id = elem.attr("id");
		var movieid = id.substr(6);
		//console.log(movieid);
		var url = "php/datahandler.php?action=getReviews&id=" + movieid; 
		$.getJSON(url, function(data){
		console.log(data);
		$.each(data, function(i, value){
			 console.log(value);
			var user = value.user;
			var date = value.date;
			var s = date.split("-");
			var mydate = s[2]+ "-" + s[1] +"-"+s[0];
			var userReview = value.user_review;
			
			$(".links").append("<div class='userReviews'>Posted By:" + user + "    " + " on:" + mydate
				+ "<br>" + userReview + "<br><br></div>");
			});	
	
		});
		elem.prop("disabled",true);
	}//end get user reviews method


	$(document).on("pagehide", function(){ 
  		$("div .userReviews").remove();
  	//re-enable SeeUserReviews button
	if ($("button[id^='review']").prop("disabled", true)){
       $("button[id^='review']").prop("disabled",false);
   	 }
		});
	
	$('#formpage').on("pageshow", function (event, data) {
 	    var id = data.prevPage.attr("id");
    	var movieid = id.substr(4);
      	 $(this).attr("id","formpage" + movieid);
    	//console.log($(this).attr("id"));
	});  


	$("#insert").on("click", function(event){
		event.preventDefault();
		var thispage = $.mobile.activePage.attr("id");
		var movieid = thispage.substr(8);
		$("#myform").attr("action", "php/formhandler.php"); 
		var input = $("<input>").attr("name","id").val(movieid);			
    	$('#myform').append(input);
		$('#myform').submit();
	});

});//end document ready




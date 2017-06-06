//Array of foodstuffs
var foodStuffs = ["Pizza", "Pasta", "Tacos", "Doughnuts", "Cupcakes", "Waffles", "Fried Chicken", "Burrito", "Eggs", "Cheese", "Pineapple", "Sushi", "Cereal"];

//displayFoodGifs is the function to display the food GIFs from GIPHY
function displayFoodGifs() {
	var food = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&limit=10&rating&api_key=dc6zaTOxFJmzC";

    //Create AJAX call for the specific foodstuffs being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		$("#foodGifs").empty();
		console.log(response);

		//Creating a new div to hold the food
		var newDiv = $("<div>");

		//Creating a loop to open the data within the object
		for (var i in response.data) {

		    // responseElem is the current element being selected in the loop
		    var responseElem = response.data[i];

		    //Creating a new div to hold the rating and gif
		    var newDiv = $("<div id='aroundGifs'>");

		    // Within the new div, appending a paragraph for the rating
		    newDiv.append("<p>Rating: " + responseElem.rating + "</p>")

		    // newImg is a new image element that will hold the actual gif
		    var newImg = $("<img>");

		    // Setting some new elements to help with the click function below for pausing and starting gif functionality:
		    newImg.attr({
				"src": responseElem.images.original_still.url,
				"data-still": responseElem.images.original_still.url,
				"data-animate": responseElem.images.original.url,
				"data-state": "still",
				"class": "gif"
			});

		    // Append newImg to newDiv
		    newDiv.append(newImg);

		    // Taking the newDiv with the rating paragraph element and new img element and adding it to the "#foodGifs" element. 
		    $("#foodGifs").append(newDiv);


		} 
	   		console.log(response.data[i]);
	   	

	   //Making it pretty
	   $("#foodGifs").css("font-family", "'Roboto', sans-serif");
	   $("#foodGifs").css("color", "white");

	   // Selecting any element that is a 'gif' and adding a click function
	   $(".gif").on("click", function() {

	   		//Creating a new variable for gifs with the data state of either still or animate
	   		var state = $(this).attr("data-state");

	   		//Condition for when the state is still and how we will change it to animate:
	   		if (state === "still") {
		   		var newSrc = $(this).attr("data-animate");
				$(this).attr("src", newSrc);
				$(this).attr("data-state", "animate");

				//Condition for if the state is animate and how we will change it to still:
			 } else {
				 var newSrc = $(this).attr("data-still");
				 $(this).attr("src", newSrc);
				 $(this).attr("data-state", "still");
		   }

		});
	});

};
	


//Function for displaying food gifs
function buttonsAppear(){

	$("#foodButtonsView").empty();
	//Looping through our foodStuffs array
	for(var i = 0; i < foodStuffs.length; i++) {
		//Creating buttons for each food in the foodStuffs array
		var a = $("<button>");
		//Adding a class of "food" to the button
		a.addClass("food");
		//Adding a data attribute
		a.attr("data-name", foodStuffs[i]);
		//The text of the button
		a.text(foodStuffs[i]);
		//Adding the button to the div
		$("#foodButtonsView").append(a);
		//I'm making the buttons pretty below:
		$("button").css("background-color", "red");
		$("button").css("font-family", "'Roboto', sans-serif");
		$("button").css("border-radius", "20px");
		$("button").css("padding", "7px");
		$("button").css("opacity", ".8");
	}
}

	//Function that handles event where the add food button is clicked. 
	$("#add-food").on("click", function(event){
		event.preventDefault();
		var food = $("#food-input").val().trim(); 
		foodStuffs.push(food);
		buttonsAppear();

	});
	$(document).on("click", ".food", displayFoodGifs);

	buttonsAppear();
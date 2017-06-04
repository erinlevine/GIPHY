// PSEUDOCODE:

// - Array of food buttons at top of page. 

// - Float ".gifForm" to the right of the page. 

// - When user clicks on food, 10 GIFs from GIPHY pop up.

// - When user clicks on GIF, it moves. 

// - When user clicks again, it stops. 

// - When user adds a new food to ".gifFrom", then a new button is created.

// - When user clicks on newest button, it also produces 10 GIFs. 

//------------------------------------------

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
	   console.log(response);

	   //Creating a new div to hold the food
	   var newDiv = $("<div>");

	   //Logging the rating for the gif
	   console.log(response.data.rating);

	   //Appending the Rating and Gif to HTML
	   $("#foodGifs").empty();
	   $("#foodGifs").html("Rating: " + response.data.rating);
	   $("#foodGifs").append(response) //I HAVE NO IDEA WHAT THIS URL WILL BE!
	});
}

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

	//Function that handles event where the add food button is clicked. LINE 91
	$("#add-food").on("click", function(event){
		event.preventDefault();
		var food = $("#food-input").val().trim();
		foodStuffs.push(food);
		buttonsAppear();
	});
	$(document).on("click", ".food", displayFoodGifs);

	buttonsAppear();
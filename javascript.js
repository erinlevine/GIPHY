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
var foodstuffs = ["Pizza", "Pasta", "Tacos", "Doughnuts", "Cupcakes", "Waffles", "Fried Chicken", "Burrito", "Eggs", "Cheese", "Pineapple", "Sushi", "Cereal"];

//displayFoodGifs is the function to display the food GIFs from GIPHY
function displayFoodGifs() {
	var food = $(this).attr("food-name");
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
	   console.log(response.rating);

	   //Appending the Rating and Gif to HTML
	   $("#foodGifs").empty();
	   $("#foodGifs").html("Rating: " + response.rating);
	   $("#foodGifs").append(response)
	}
}

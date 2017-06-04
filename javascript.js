//Array of foodstuffs
var foodStuffs = ["Pizza", "Pasta", "Tacos", "Doughnuts", "Cupcakes", "Waffles", "Fried Chicken", "Burrito", "Eggs", "Cheese", "Pineapple", "Sushi", "Cereal"];

//displayFoodGifs is the function to display the food GIFs from GIPHY
function displayFoodGifs() {
	var food = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&limit=10&rating&api_key=dc6zaTOxFJmzC";
	// debugger
//Create AJAX call for the specific foodstuffs being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);

		//Creating a new div to hold the food
	   var newDiv = $("<div>");

	   	//Creating a loop to open the data within the object
	   	for(var i in response.data){
	   		console.log(response.data[i]);
	   	}

	   //Appending the Rating and Gif to HTML
	   $("#foodGifs").empty();
	   $("#foodGifs").html("Rating: " + response.rating);
	   $("#foodGifs").append(response.bitly_url); //Is this the URL to pull the GIFs? I don't know!
	   $("#foodGifs").css("font-family", "'Roboto', sans-serif");
	   $("#foodGifs").css("color", "white");
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
		var food = $("#food-input").val().trim(); //WHY AREN'T YOU WORKING?
		foodStuffs.push(food);
		buttonsAppear();

	});
	$(document).on("click", ".food", displayFoodGifs);

	buttonsAppear();
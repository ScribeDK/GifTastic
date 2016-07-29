//starting List
var mainList = ["dog", "cat", "duck", "dove", "raccoon", "frog", "toad", "shark", "crocodile", "quail", "lizard", "mouse", "rat", "crow", "snake", "cow", "ferret", "raven"];
//stillList (empty)
var stillList = [];
//gifList (empty)
var gifList = [];

createList();

function createList(){
	
//clear html then create buttons from mainList
$(".animalButtons").html("");

for(i in mainList){
	$(".animalButtons").append("<button class='btn btn-info btn-lg searchButton' data-tag='" + mainList[i] + "'>" + mainList[i] + "</button>");	
}

//search for gifs using selected button
$('.searchButton').on('click', function() {
        var animal = $(this).data('tag');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
		
		//empty stillList and gifList
		stillList = [];
		gifList = [];
		
		//count of picture in index
		var count = 0
		
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
           
			
			console.log(response);    
			
			$(".animals").html("");
			for(i in response.data){
			if (response.data[i].rating != ""){
				$(".animals").append("<p>Rating: " + response.data[i].rating + "</p>")
			}
			else{$(".animals").append("<p>Rating: none</p>")}

			$(".animals").append("<img class='gifImage' data-tag=false data-index=" + count + " width=" + response.data[i].images.original_still.width + " height=" + response.data[i].images.original_still.height + " src=" + response.data[i].images.original_still.url + " />");
			stillList.push(response.data[i].images.original_still.url)
			gifList.push(response.data[i].images.original.url)
			count = count + 1;
			}
        });
});

}

$(document.body).on('click', '.gifImage', function(){
	var tag = ($(this).attr('data-tag'));
	var index = ($(this).attr('data-index'));
			
	if (eval(tag) == false){
		$(this).attr('src', gifList[index]);
		$(this).attr('data-tag', 'true');
	}
	else{
		$(this).attr('src', stillList[index]);
		$(this).attr('data-tag', 'false');
	}	
});	

//add to list
$('.addAnimal').on('click', function() {
	var userInput = document.getElementById("animal-input").value;
	
	//check is userInput is blank
	if(userInput != ""){
		
		//set userInput to lowercase
		userInput = userInput.toLowerCase();
		
		//check if userInput is already in mainList
		var inList = false;
		for(i in mainList){
			if(userInput == mainList[i])
			{inList = true;}
		}

		//add userInput to mainList
		if(inList == false){
		mainList.push(userInput);	
		}
	}
	
	//recreate mainList
	createList();
});	


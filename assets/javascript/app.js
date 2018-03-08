var topics = ["piano", "cello", "guitar", "bass guitar", "drums", "violin", "viola", "harmonica", "trumpet", "trombone", "oboe", "flute", "synthesizer", "drum machine", "turntable", "theremin", "harp", "saxophone", "sitar", "dulcimer", "xylophone"];
var newInstrument;
var queryURL;
var newGifDiv;



function drawButtons() {
    // creates new div with buttons and puts it in topics section
    $("#topics-view").empty();
    console.log(topics);
    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>');
        if (topics[i].substring(0, 6) === "movie ") { // create a movie button
            button.addClass("btn movie-button btn-primary");
            var buttonTitle = topics[i].substring(6,);
            console.log(buttonTitle);
            button.text(buttonTitle);
            button.attr("data-name", buttonTitle);  
        } else {
            button.addClass("btn instrument-button"); // create an instrument button
            button.text(topics[i]);
            button.attr("data-name", topics[i]);  
        }
              
        $("#topics-view").append(button);
    }
}

function getGifs(queryURL) {
    // retrieves gifs from giphy.com api
    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        for (var i = 0; i < 10; i++) {
            if ((response.data[i].rating === "g" || response.data[i].rating === "pg") && response.data[i].images.fixed_height.width < 500) {
                newGifDiv = $("<div>");
                newGifDiv.addClass("float-left");
                newGifDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
                newGifDiv.append('<img class="float-left gif" data-state="still" src="' + response.data[i].images.fixed_height_still.url + '" data-still="' + response.data[i].images.fixed_height_still.url + '" data-animate="' + response.data[i].images.fixed_height.url + '">');
                console.log(response.data[i].images.fixed_height.url);
                console.log(response.data[i].images.fixed_height_still.url);
                $("#gifs").prepend(newGifDiv);
            }
        }
    });
}
// retrieve movie poster from omdb api
function getMoviePoster(queryURL) {
    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        newGifDiv = $("<div>");
        newGifDiv.append("<p>Rating: " + response.Rated + "</p>");
        newGifDiv.addClass("float-left");
        console.log(response);
        newGifDiv.append('<img class="float-left movie-poster" src="' + response.Poster + '">');
        $("#gifs").prepend(newGifDiv);
    });
}
drawButtons();

// event handler for instrument buttons
$("#topics-view").on("click", ".instrument-button", function (event) {
    event.preventDefault();
    instrument = $(this).attr("data-name");
    console.log(instrument);
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + instrument + "&api_key=GadGwZbNKmV1tMe4DAb8TnfN3EOoaE4w";
    getGifs(queryURL);

});

// event handler for movie buttons
$("#topics-view").on("click", ".movie-button", function (event) {
    event.preventDefault();
    var movieTitle = $(this).attr("data-name");
    console.log(movieTitle);
    queryURL = "https://www.omdbapi.com/?&apikey=e7956eef&t=" + movieTitle;
    getMoviePoster(queryURL);
});

// creates new instrument button when clicking search button
$("#search-display").on("click", "#searchBtn", function (event) {
    event.preventDefault();
    var topic = $("#instrument-search").val().trim();
    if (topic !== "") {
        console.log(topic);
        topics.push(topic);
        drawButtons();
    }
});

// // click image to toggle between gif and still image
$("#gifs").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
    } else {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
    }
});
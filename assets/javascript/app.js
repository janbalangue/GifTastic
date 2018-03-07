var topics = ["piano", "cello", "guitar", "bass guitar", "drums", "violin", "viola", "double bass", "trumpet", "trombone", "oboe", "flute", "synthesizer", "drum machine", "turntable", "theremin", "harp", "saxophone", "sitar", "dulcimer", "xylophone"];
var instrument;
var queryURL;
var newGifDiv = [];
var newGif;
var newGifRating;
var gifId = 0;


function drawButtons() {
    // creates new div with buttons and puts it in topics section
    var newButtonDiv = $("<div>");
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.attr("type", "button");
        button.addClass("btn btn-primary");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        newButtonDiv.append(button);
    }
    $("#topics").html(newButtonDiv);
}

drawButtons();

$("button").on("click", function () {
    instrument = $(this).attr("data-name");
    console.log(instrument);
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + instrument + "&api_key=GadGwZbNKmV1tMe4DAb8TnfN3EOoaE4w";
    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            if ((response.data[i].rating === "g" || response.data[i].rating === "pg") && response.data[i].images.fixed_height_still.width < 500) {
                newGifDiv[gifId] = $("<div>");
                newGifDiv[gifId].addClass("gif-image float-left");
                newGif = $("<figure>");
                newGif.append('<img class="float-left" src="' + response.data[i].images.fixed_height_still.url + '">');
                
                newGifDiv[gifId].attr("data-name", gifId);
                // creates unique numerical data-name attribute and assigns it to newGif
                console.log(gifId);
                
                newGifDiv[gifId].attr("gif-still", response.data[i].images.fixed_height_still.url);
                // // // saves url for still image into newGif attribute gif-still
                console.log(response.data[i].images.fixed_height_still.url);
                
                newGifDiv[gifId].attr("gif-play", response.data[i].images.fixed_height.url);
                console.log(response.data[i].images.fixed_height.url);
                // // //saves url for playing gif into newGif attribute gif-play
                
                newGifRating = $("<figcaption>Rating: " + response.data[i].rating + "</figcaption>");
                console.log(newGifRating);
                newGif.append(newGifRating);
                newGifDiv[gifId].append(newGif);
                $("#gifs").prepend(newGifDiv[gifId]);
                gifId++;
            }
        }
    });
});

// creates new instrument button when clicking search button
$("#search").on("click", function (event) {
    event.preventDefault();
    var newInstrument = $("#instrument-search").val();
    if (newInstrument !== "") {
        topics.push(newInstrument);
        drawButtons();
    }
})

// // click image to toggle between gif and still image
$("#gifs").on("click", ".gif-image", function () {
    var gifId = $(this).attr("data-name");
    var gifPlay = $(this).attr("gif-play");
    var gifStill = $(this).attr("gif-still");
    if ($(this).attr("src") === gifPlay) {
        $(this).attr("src", gifStill);
    } else if ($(this).attr("src") === gifStill) {
        $(this).attr("src", gifPlay);
    }
});
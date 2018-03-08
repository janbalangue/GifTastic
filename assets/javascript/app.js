var topics = ["piano", "cello", "guitar", "bass guitar", "drums", "violin", "viola", "double bass", "trumpet", "trombone", "oboe", "flute", "synthesizer", "drum machine", "turntable", "theremin", "harp", "saxophone", "sitar", "dulcimer", "xylophone"];
var newInstrument;
var queryURL;
var newGifDiv = [];

var gifId = 0;


function drawButtons() {
    // creates new div with buttons and puts it in topics section
    var newButtonDiv = $("<div>");
    for (var i = 0; i < topics.length; i++) {
        var button = $('<button>');
        button.attr("type", "button");
        button.addClass("btn instrument-button btn-primary");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        newButtonDiv.append(button);
    }
    $("#topics").html(newButtonDiv);
}

drawButtons();

// event handler for blue instrument buttons
$(".instrument-button").on("click", function () {
    instrument = $(this).attr("data-name");
    console.log(instrument);
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + instrument + "&api_key=GadGwZbNKmV1tMe4DAb8TnfN3EOoaE4w";
    $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
        for (var i = 0; i < 10; i++) {
            if ((response.data[i].rating === "g" || response.data[i].rating === "pg") && response.data[i].images.fixed_height.width < 500) {
                newGifDiv = $("<div>");
                newGifDiv.addClass("float-left");
                newGifDiv.append("<p>Rating: " + response.data[i].rating + "</p>");
                newGifDiv.append('<img class="float-left gif" id=' + gifId + ' data-state="still" src="' + response.data[i].images.fixed_height_still.url + '" data-still="' + response.data[i].images.fixed_height_still.url + '" data-animate="' + response.data[i].images.fixed_height.url + '">');
                console.log(response.data[i].images.fixed_height.url);
                console.log(response.data[i].images.fixed_height_still.url);
                $("#gifs").prepend(newGifDiv);
                gifId++;
            }
        }
    });
});

// creates new instrument button when clicking search button
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var topic = $("#instrument-search").val().trim();
    topics.push(topic);
    drawButtons();
  });

// // click image to toggle between gif and still image
$("#gifs").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    var gifId = $(this).attr("id");
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
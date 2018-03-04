var topics = ["piano", "cello", "guitar", "bass guitar", "drums", "violin", "viola", "double bass", "trumpet", "trombone", "oboe", "flute", "synthesizer", "drum machine", "turntable", "theremin", "harp", "saxophone", "sitar", "dulcimer", "xylophone"];
var instrument;
var queryURL;
var newGifDiv = [];
var newGif;
var newGifRating;
var gifId = 0;
var gifPlay;
var gifStill;

function drawButtons() {
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
                newGifDiv[gifId].addClass("float-left");
                newGif = $("<figure>");
                newGif.append('<img class="gif-image float-left" src="' + response.data[i].images.fixed_height_still.url + '">');
                newGif.attr("data-name", gifId);
                console.log(gifId);
                newGif.attr("gif-still", response.data[i].images.fixed_height_still.url);
                newGif.attr("gif-play", response.data[i].images.fixed_height.url);

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

$("#search").on("click", function (event) {
    event.preventDefault();
    var newInstrument = $(".form-control").val().trim();
    if (newInstrument !== "") {
        topics.push(newInstrument);
        drawButtons();
    }
})

$("#gifs").on("click", function () {
    gifId = $(this).attr("data-name");
    gifPlay = $(this).attr("gif-play");
    gifStill = $(this).attr("gif-still");
    if ($(this).attr("src") === gifPlay) {
        $(this).attr("src", gifStill);
    } else if ($(this).attr("src") === gifStill) {
        $(this.attr("src", gifPlay));
    }
});
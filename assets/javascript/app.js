var topics = ["piano", "cello", "guitar", "bass guitar", "drums", "violin", "viola", "double bass", "trumpet", "trombone", "oboe", "bassoon", "flute", "synthesizer", "drum machine", "turntable", "theremin", "harp", "clarinet", "saxophone", "sitar", "dulcimer", "xylophone"];
var instrument;
var queryURL;
var newGifDiv = [];
var newGif;
var newGifRating;

function drawButtons() {
    var newButtonDiv = $("<div>");
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("musical-instrument");
        button.attr("data-type", topics[i]);
        button.text(topics[i]);
        newButtonDiv.append(button);
    }
    $("#topics").append(newButtonDiv);
}

drawButtons();

$("button").on("click", function () {
    instrument = $(this).attr("data-type");
    console.log(instrument);
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + instrument + "&api_key=GadGwZbNKmV1tMe4DAb8TnfN3EOoaE4w";
    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            newGifDiv[i] = $("<div>");
            newGifDiv[i].addClass("gif");
            newGif = $("<figure>");
            newGif.append('<img class="new-gif" src="' + response.data[i].images.fixed_height_still.url + '">');
            newGifRating = $("<figcaption>Rating: " + response.data[i].rating + "</figcaption>");
            console.log(newGifRating);
            newGif.append(newGifRating);
            newGifDiv[i].append(newGif);
            $("#gifs").prepend(newGifDiv[i]);
        }
    });
});



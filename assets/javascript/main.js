var topics = ["Cowardly Dog", "Bugs Bunny", "Teen Titans", "Buster Keaton", "Mr. Bean", "Key and Peele", "Cyberpunk 2077", "Blade Runner 2049", "Arkham Batman", "Ash vs Evil Dead", "Junji Ito"];



function displayGIFs() {

    var apiKey = "&api_key=" + "KYDe3oh6tBmq8a7wwvgEYIycs35ANaL0";

    // Gets the input field
    var queryInput = $(this).attr("data-name");

    var queryTerm = "&q=" + queryInput;
    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "&limit=10" + queryTerm + apiKey;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            // hold the gif
            var gifDiv = $('<div class="col-md-4">');

            var gifIMG = $('<img class="gif img-fluid">');

            // Get url for image
            gifIMG.attr("src", response.data[i].images.original_still.url).attr("alt", queryInput).attr("data-state", "still").attr("data-still", response.data[i].images.original_still.url);
            gifIMG.attr("data-animate", response.data[i].images.original.url);

            // Get url for rating
            var gifRating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + gifRating);

            gifDiv.append(p);
            gifDiv.append(gifIMG);

            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
}

function renderBtns() {
    // Prevent duplicate buttons
    $("#topicBtns").empty();

    for (var i = 0; i < topics.length; i++) {
        var addBtn = $("<button>");

        // for `.attr("data-name", topics[i])`, it assigns a custom class data-name with the respective index
        addBtn.attr("class", "btn btn-primary topic").attr("data-name", topics[i]);
        addBtn.text(topics[i]);
        $("#topicBtns").append(addBtn);
    }
}

$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    var submitTopic = $("#userInput").val();
    topics.push(submitTopic);

    renderBtns();
});

$(document).on("click", ".gif", function () {
    // Access current "data-state"
    var state = $(this).attr("data-state");
    if (state === "still") {

        // Switch src to the value of "data-animate" & update the value of the "data-state"
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".topic", displayGIFs)
//===============================================================================
renderBtns();
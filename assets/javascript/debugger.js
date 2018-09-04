var topics = ["Cowardly Dog", "Bugs Bunny", "Teen Titans", "Cyberpunk 2077", "Arkham Batman", "Lorne Malvo", "Key and Peele"];

function displayGIFs() {

    var apiKey = "&api_key=" + "KYDe3oh6tBmq8a7wwvgEYIycs35ANaL0";

    // Gets the input field
    var queryInput = $(this).attr("data-name");

    var queryTerm = "&q=" + queryInput;
    var queryURL = "http://api.giphy.com/v1/gifs/search?" + "&limit=10" + queryTerm + apiKey;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            // hold the gif
            var gifDiv = $('<div>');

            var gifIMG = $('<img class="img-fluid">');

            // Get url for image
            gifIMG.attr("src", response.data[i].images.downsized.url).attr("alt", queryInput);

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
        addBtn.attr("class", "btn btn-secondary topic").attr("data-name", topics[i]);
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

$(document).on("click", ".topic", displayGIFs)
//===============================================================================
renderBtns();
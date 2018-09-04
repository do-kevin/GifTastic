$(document).ready(function () {
    var topics = ["Cowardly Dog", "Bugs Bunny"];

    topics.forEach(function(i){
        renderBtns(topics[i]);
    });
    
    function renderBtns(addBtn) {
        $("#topicBtns").empty();


        for (var i = 0; i < topics.length; i++) {
            var addBtn = $("<button>");
            addBtn.attr("class", "btn btn-secondary topic").text(addBtn);
            addBtn.text(topics[i]);
            $("#topicBtns").append(addBtn);
        }
    }

    $("#submitBtn").on("click", function(event) {
        event.preventDefault();
        var submitTopic = $("#userInput").val();
        topics.push(submitTopic);

        renderBtns();
    });



    $(document).on("click", ".topic", function () {
        var apiKey = "&api_key=" + "KYDe3oh6tBmq8a7wwvgEYIycs35ANaL0";
        var queryTerm = "&q=" + $("#userInput").val();
        var queryURL = "http://api.giphy.com/v1/gifs/search?" + "&limit=10" + queryTerm + apiKey;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                var gifURL = response.data[i].images.downsized.url;
                var gifRating = response.data[i].rating;
                console.log(gifRating);
            
                var topicGIF = $("<img>" + "<p>Rating: " + gifRating + "</p>");
                    topicGIF.attr("src", gifURL).attr("alt", queryTerm);
                    topicGIF.before('<div class="col-md-4">').after("</div>");

    
                $(".topicGIFs").prepend(topicGIF);
            }

            
        });
    });

    //===============================================================================
    renderBtns();
});

// http://api.giphy.com/v1/gifs/search?q=ryan+goslingk&api_key=slIq7r4VSZShwmPby0BdErZvLH5ZfHgx&limit=10
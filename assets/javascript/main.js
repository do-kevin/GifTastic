$(document).ready(function () {
    var topics = ["cyberpunk", "ryan gosling", "socks"];

    function renderBtns(addBtn) {
        $("#topicBtns").empty();


        for (var i = 0; i < topics.length; i++) {
            var addBtn = $("<button>");
            addBtn.attr("class", "btn btn-secondary").text(addBtn);
            addBtn.addClass("topic");
            addBtn.text(topics[i]);
            $("#topicBtns").append(addBtn);
        }
    }

    $("#submitBtn").on("click", function () {
        var apiKey = "&api_key=" + "slIq7r4VSZShwmPby0BdErZvLH5ZfHgx";
        var searchTerm = $("#userInput").val();
        var queryURL = "http://api.giphy.com/v1/gifs/search?&limit=10&q=" + searchTerm + apiKey;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

                var gifURL = response.data.images.original.url;
            
                var topicGIF = $("<img>");
    
                topicGIF.attr("src", gifURL).attr("alt", searchTerm);
    
                $(".topicGIFs").prepend(topicGIF);

        });
    });

    //===============================================================================
    renderBtns();
});

// http://api.giphy.com/v1/gifs/search?q=ryan+goslingk&api_key=slIq7r4VSZShwmPby0BdErZvLH5ZfHgx&limit=10
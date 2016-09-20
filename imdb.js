
(function () {

    $('#go-button').on('click',search);

    function search() {
        var name = $("#typing-field").val();

        $.ajax({
            url: 'http://www.omdbapi.com/?',
            method: 'GET',
            data: {
                t: name,
                limit: 20
            },
            success: function(data) {

                var poster = $("<img src='"+data.Poster+"'>").addClass("poster");

                var newDiv = $("<div></div>").addClass("result");
                var name = $("<p></p>").html(data.Title).addClass("name");
                var actors = $("<p></p>").html("Actors: " + data.Actors).addClass("actors");
                var released = $("<p></p>").html("Released: " + data.Released).addClass("released");
                var director = $("<p></p>").html("Directed by: " + data.Director).addClass("director");
                var awards = $("<p></p>").html("Awards: " + data.Awards).addClass("awards");

                name.appendTo(newDiv);
                actors.appendTo(newDiv);
                released.appendTo(newDiv);
                director.appendTo(newDiv);
                awards.appendTo(newDiv);
                poster.appendTo(newDiv);
                $(".result").append(newDiv);



                $('#go-button').on('click',function() {
                    $(".result").empty();

                });
            }
        });

    }



    })();


(function () {

    $('#go-button').on('click',search);

    function search() {
        var total;
        var type = $("#options").val();
        var name = $("#typing-field").val();

        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            method: 'GET',
            data: {
                q: name,
                type: type,
                limit: 20
            },
            success: function(data) {
                console.log(data);
                if(type=="artist") {
                    if (data.artists.items.length===0) {
                        $("#results-for").text("No results");
                        return;
                    }}
                if (type=="album") {
                    if (data.albums.items.length===0) {$("#results-for").text("No results");
                        return;
                    }}



                $("#results-for").text("Results for " + '"' + name + '"');
                if (type==="artist") {
                    var arr = data.artists.items;
                    total = data.artists.total;

                }
                else {
                    arr = data.albums.items;
                    total = data.albums.total;

                }



                for (var i=0; i<arr.length;i++){
                    var newDiv = $("<div></div>").addClass("result");
                    var nameDiv = $("<a href='"+arr[i].external_urls.spotify+"'</a>").html(arr[i].name);
                    nameDiv.appendTo(newDiv);

                    if (arr[i].images[0]==undefined) {

                            $("<img src='"+"https://image.freepik.com/free-vector/circle-made-of-music-instruments_23-2147509304.jpg?ve=2"+"' class='images'>").appendTo(newDiv);
                            $(".results").append(newDiv);

                        }

                        else {
                            $("<img src='"+arr[i].images[0].url+"' class='images'>").appendTo(newDiv);
                            $(".results").append(newDiv);
                        }
                    }

                    if (total>20) {
                        $(".more-button").css("display", "block");

                    }
            }


        });


        $(".more-button").on("click", function() {

            $(".more-button").css("display", "none");


            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                method: 'GET',
                data: {
                    q: name,
                    type: type,
                    limit: 50
                },
                success: function(data) {
                    if(type=="artist") {
                        if (data.artists.items.length===0) {
                            $("#results-for").text("No results");
                            return;
                        }}
                    if (type=="album") {
                if (data.albums.items.length===0) {$("#results-for").text("No results");
                    return;
                }}

            $("#results-for").text("Results for " + '"' + name + '"');
            if (type==="artist") {
                var arr = data.artists.items;
                total = data.artists.total;

            }
            else {
                arr = data.albums.items;
                total = data.albums.total;

            }

            for (var i=20; i<arr.length;i++){
                var newDiv = $("<div></div>").addClass("result");
                var nameDiv = $("<a href='"+arr[i].external_urls.spotify+"'</a>").html(arr[i].name);
                nameDiv.appendTo(newDiv);

                if (arr[i].images[0]==undefined) {

                        $("<img src='"+"https://image.freepik.com/free-vector/circle-made-of-music-instruments_23-2147509304.jpg?ve=2"+"'class='images'>").appendTo(newDiv);
                    $(".results").append(newDiv);

                }

                else {
                    $("<img src='"+arr[i].images[0].url+"' class='images'>").appendTo(newDiv);
                    $(".results").append(newDiv);
                }
            }

        }


    });
})

        $('#go-button').on('click',function() {
            $(".results").empty();

        });

    }



    })();

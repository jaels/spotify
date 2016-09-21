
(function() {


    var templates = document.querySelectorAll('script[type="text/handlebars"]');

    Handlebars.templates = Handlebars.templates || {};


    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });


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
                    var obj;
                    var newArr=[];

                    for (var i=0;i<arr.length;i++) {
                        obj={};
                        obj.name = arr[i].name;
                        obj.link = arr[i].external_urls.spotify;

                        if (arr[i].images[0]==undefined) {

                            obj.image = "https://image.freepik.com/free-vector/circle-made-of-music-instruments_23-2147509304.jpg?ve=2";

                        }

                        else {
                            obj.image = arr[i].images[0].url;
                        }

                        newArr[i] = obj;

                    }



                    document.getElementById("results").innerHTML = Handlebars.templates.resultsScript({newArr: newArr});

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
                        console.log(data);
                        if(type=="artist") {
                            if (data.artists.items.length===0) {
                                $("#results-for").text("No results");
                                return;
                            }}
                            if (type=="album") {
                                if (data.albums.items.length===0){
                                    $("#results-for").text("No results");
                                    return;
                                }}



                                $("#results-for").text("Results for " + '"' + name+ '"');
                                if (type==="artist") {
                                    var arr = data.artists.items;
                                    total = data.artists.total;

                                }
                                else {
                                    arr = data.albums.items;
                                    total = data.albums.total;

                                }
                                var obj;
                                var newArr=[];

                                for (var i=20;i<arr.length;i++) {
                                    obj={};
                                    obj.name = arr[i].name;
                                    obj.link = arr[i].external_urls.spotify;

                                    if (arr[i].images[0]==undefined) {

                                        obj.image = "https://image.freepik.com/free-vector/circle-made-of-music-instruments_23-2147509304.jpg?ve=2";

                                    }

                                    else {
                                        obj.image = arr[i].images[0].url;
                                    }

                                    newArr[i] = obj;

                                }

                                document.getElementById("results").innerHTML = Handlebars.templates.resultsScript({newArr: newArr});

                            }
                        });


                    })

                    $('#go-button').on('click',function() {
                        $(".results").empty();

                    });

                }




            })();

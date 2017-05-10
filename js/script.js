
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    var address = streetStr + ", " + cityStr;

    $greeting.text("Hey, you wanna live at" + address + "?");

    // Google streetmap API

    var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + "";
    $body.append("<img class='bgimg' src='" + streetviewUrl + "'>");

    // NYTimes API

    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityStr + "&sort=newest&api-key=09f4f95c76cf4bbfb0772dde5d0b8772"

    $.getJSON(nytimesUrl,
        function (data) {
            $nytHeaderElem.text("New York Times Articles about" + cityStr);
            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                $nytElem.append("<li class='articles'>" + "<a href='"+article.web_url+"'>" +article.headline.main+"</a>"+ "<p>"+ article.snippet +"</p>" + "</li>");
            }
        }
    );

    return false;
};

$('#form-container').submit(loadData);

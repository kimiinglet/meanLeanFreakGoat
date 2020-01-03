//this key will work on local and website.
var weatherKey = 'd9370cf81c44dc3900380fcc44da127d';

//when you create the queryURLs, you use var Gkey or var weatherKey to replace where the API key is.

$(document).ready(function () {
    //add var names here
    var submitButton = $("#submitBtn");
    var clearButton = $("#clearBtn");
    var zipcodeInput = $("#zipcodeInput");
    var usState = $("#statesDropdown");
    var usCity = $("#cityInput");
    var mapBox = $("#map");

    //I just wanted to fade the header for fun. --CL
    $(window).on('scroll', function () {
        var header = $(".hero");
        if ($(this).scrollTop() > 50) {
            if (!header.data('faded')) header.data('faded', 1).stop(true).fadeTo(400, 0.2);
        } else if (header.data('faded')) {
            header.data('faded', 0).stop(true).fadeTo(400, 1);
        }
    });

    //when page loads, weather should be default, Austin, TX. This is for current weather! 

    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=Austin,us&units=imperial&appid=" + weatherKey;
    //We then create an AJAX call for Austin.
    $.ajax({
        url: currentWeather,
        method: "GET"
    }).then(function (response) {
        //Log the queryURL
        console.log(currentWeather);
        //Log the resulting object
        console.log(response);
        //logging to see if query works.
        var cityEl = response.name;
        console.log(cityEl);
        $("#cityForecast").html(cityEl);
        //This is for current weather!
        var currentTempEl = response.main.temp;
        console.log(currentTempEl);
        $("#currentTemp").html(currentTempEl + "&deg;F");
        //current weather conditions
        var currentConditionEl = response.weather[0].description;
        $("#currentCondition").text(currentConditionEl);
        //current weather icon
        var iconCode = response.weather[0].id;
        var flowersIcon = "wi wi-owm-" + iconCode;
        console.log(flowersIcon);
        $("#currentIcon").attr('class', flowersIcon);
    });

    // This is for forecast weather!
    var queryWeather = "https://api.openweathermap.org/data/2.5/forecast?q=Austin,us&units=imperial&appid=" + weatherKey;

    $.ajax({
        url: queryWeather,
        method: "GET"
    }).then(function (response) {
        //Log the queryURL
        console.log(queryWeather);

        console.log(response);
        //THESE ARE FOR THE FORECAST!
        var tempEl1 = response.list[0].main.temp;
        console.log(tempEl1);
        $("#day1Temp").html(tempEl1 + "&deg;F");
        var day1ConditionEl = response.list[0].weather[0].description;
        $("#day1Condition").text(day1ConditionEl);
        var day1Icon = response.list[0].weather[0].id;
        var flowersD1Icon = "wi wi-owm-" + day1Icon;
        $("#day1Icon").attr('class', flowersD1Icon);

        var tempEl2 = response.list[8].main.temp;
        $("#day2Temp").html(tempEl2 + "&deg;F");
        var day2ConditionEl = response.list[8].weather[0].description;
        $("#day2Condition").text(day2ConditionEl);
        var day2Icon = response.list[8].weather[0].id;
        var flowersD2Icon = "wi wi-owm-" + day2Icon;
        $("#day2Icon").attr('class', flowersD2Icon);

        var tempEl3 = response.list[17].main.temp;
        $("#day3Temp").html(tempEl3 + "&deg;F");
        var day3ConditionEl = response.list[17].weather[0].description;
        $("#day3Condition").text(day3ConditionEl);
        var day3Icon = response.list[17].weather[0].id;
        var flowersD3Icon = "wi wi-owm-" + day3Icon;
        $("#day3Icon").attr('class', flowersD3Icon);


        var tempEl4 = response.list[26].main.temp;
        $("#day4Temp").html(tempEl4 + "&deg;F");
        var day4ConditionEl = response.list[26].weather[0].description;
        $("#day4Condition").text(day4ConditionEl);
        var day4Icon = response.list[26].weather[0].id;
        var flowersD4Icon = "wi wi-owm-" + day4Icon;
        $("#day4Icon").attr('class', flowersD4Icon);

        var tempEl5 = response.list[35].main.temp;
        $("#day5Temp").html(tempEl5 + "&deg;F");
        var day5ConditionEl = response.list[35].weather[0].description;
        $("#day5Condition").text(day5ConditionEl);
        var day5Icon = response.list[35].weather[0].id;
        var flowersD5Icon = "wi wi-owm-" + day5Icon;
        $("#day5Icon").attr('class', flowersD5Icon);
    });

    //when the page loads, user input is clear/empty.


    //when you click on submit, we will take note of city/state || zip, and radius. THIS DOESN'T WORK YET
    submitButton.click(function () {

        var userCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + (usCity[0].value || zipcodeInput[0].value) + ",us&units=imperial&appid=" + weatherKey;

        $.ajax({
            url: userCurrentWeather,
            method: "GET"
        }).then(function (response) {
            var cityEl = response.name;
            $("#cityForecast").html("Weather Forecast: " + cityEl);
            //This is for current weather!
            var currentTempEl = response.main.temp;
            $("#currentTemp").html(currentTempEl + "&deg;F");

            var currentConditionEl = response.weather[0].description;
            $("#currentCondition").text(currentConditionEl);
            var iconCode = response.weather[0].id;
            var flowersIcon = "wi wi-owm-" + iconCode;
            console.log(flowersIcon);
            $("#currentIcon").attr('class', flowersIcon);
        });

        //using user input City/State or Zip, pull weather data.
        var userInputForecastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + (usCity[0].value || zipcodeInput[0].value) + ",us&units=imperial&appid=" + weatherKey;

        $.ajax({
            url: userInputForecastQuery,
            method: "GET"
        }).then(function (response) {
            //THESE ARE FOR THE FORECAST!
            var tempEl1 = response.list[0].main.temp;
            console.log(tempEl1);
            $("#day1Temp").html(tempEl1 + "&deg;F");
            var day1ConditionEl = response.list[0].weather[0].description;
            $("#day1Condition").text(day1ConditionEl);
            var day1Icon = response.list[0].weather[0].id;
            var flowersD1Icon = "wi wi-owm-" + day1Icon;
            $("#day1Icon").attr('class', flowersD1Icon);

            var tempEl2 = response.list[8].main.temp;
            $("#day2Temp").html(tempEl2 + "&deg;F");
            var day2ConditionEl = response.list[8].weather[0].description;
            $("#day2Condition").text(day2ConditionEl);
            var day2Icon = response.list[8].weather[0].id;
            var flowersD2Icon = "wi wi-owm-" + day2Icon;
            $("#day2Icon").attr('class', flowersD2Icon);

            var tempEl3 = response.list[17].main.temp;
            $("#day3Temp").html(tempEl3 + "&deg;F");
            var day3ConditionEl = response.list[17].weather[0].description;
            $("#day3Condition").text(day3ConditionEl);
            var day3Icon = response.list[17].weather[0].id;
            var flowersD3Icon = "wi wi-owm-" + day3Icon;
            $("#day3Icon").attr('class', flowersD3Icon);

            var tempEl4 = response.list[26].main.temp;
            $("#day4Temp").html(tempEl4 + "&deg;F");
            var day4ConditionEl = response.list[26].weather[0].description;
            $("#day4Condition").text(day4ConditionEl);
            var day4Icon = response.list[26].weather[0].id;
            var flowersD4Icon = "wi wi-owm-" + day4Icon;
            $("#day4Icon").attr('class', flowersD4Icon);

            var tempEl5 = response.list[35].main.temp;
            $("#day5Temp").html(tempEl5 + "&deg;F");
            var day5ConditionEl = response.list[35].weather[0].description;
            $("#day5Condition").text(day5ConditionEl);
            var day5Icon = response.list[35].weather[0].id;
            var flowersD5Icon = "wi wi-owm-" + day5Icon;
            $("#day5Icon").attr('class', flowersD5Icon);
        });


        clearButton.on("click", function () {
            $('select option:contains("Select Dropdown")').prop('selected', true);
            usCity[0].value = "";
            zipcodeInput[0].value = "";
        });
    });

    // Links to Forest Service and BLM appear when state is clicked


    // COLORADO -- On Click that only works one time
    $('#CO').one('click', function () {

        var blmLink = document.getElementById("blm-link");
        var aTag = document.createElement('a');

        aTag.setAttribute('href', "https://www.blm.gov/colorado");
        aTag.innerText = "Colorado BLM";
        blmLink.appendChild(aTag);


    });


    $('#CO').one('click', function () {
        var fsLink = document.getElementById("forestService-link");
        var aTag = document.createElement('a');
        aTag.setAttribute('href', "https://www.fs.fed.us/r2/recreation/map/colorado/html-current/colorado-hi-speed-index.shtml");
        aTag.innerText = "Colorado Forest Service";
        fsLink.appendChild(aTag);
    });



    // NEW MEXICO -- On Click that only works one time
    $('#NM').one('click', function () {

        var blmLink = document.getElementById("blm-link");
        var aTag = document.createElement('a');

        aTag.setAttribute('href', "https://www.blm.gov/newmexico");
        aTag.innerText = "New Mexico BLM";
        blmLink.appendChild(aTag);
    });


    $('#NM').one('click', function () {
        var fsLink = document.getElementById("forestService-link");
        var aTag = document.createElement('a');
        aTag.setAttribute('href', "https://www.fs.fed.us/sopa/state-level.php?nm");
        aTag.innerText = "New Mexico Forest Service";
        fsLink.appendChild(aTag);
    });

    // Not working, looking to remove previous links when another state is clicked.
    if (aTag.length <= 1) {
        aTag.remove;
    }



    // Links to Forest Service and BLM appear when state is clicked



    // script for clickable map
    $("path, circle").hover(function (e) {
        $('#info-box').css('display', 'block');
        $('#info-box').html($(this).data('info'));
    });

    $("path, circle").mouseleave(function (e) {
        $('#info-box').css('display', 'none');
    });

    $(document).mousemove(function (e) {
        $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
        $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
    }).mouseover();

    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (ios) {
        $('a').on('click touchend', function () {
            var link = $(this).attr('href');
            window.open(link, '_blank');
            return false;
        });
    }

});
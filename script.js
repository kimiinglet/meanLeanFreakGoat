//api keys for maps, weather, gov data, etc. are in the config.js. This is for security reasons so API keys don't get stolen.
//WHEN YOU ADD AN API KEY, ADD IT TO CONFIG.JS. 

var Gkey = config.myGKey;

var WeatherKey = config.myWKey;

//when you create the queryURLs, you use var Gkey or var WeatherKey to replace where the API key is.

$(document).ready(function () {
    //add var names here
    var submitButton = $("#submitBtn");
    var cancelButton = $("#cancelBtn");
    var zipcodeInput = $("#zipcodeInput");
    var usState = $("#statesDropdown");
    var usCity = $("#cityInput");
    var mapBox = $("#map");
    var weatherBox = $(".weatherContent");

    //when page loads, maps should be default Austin, TX? THIS DOESN'T WORK YET.
    //https://developers.google.com/maps/documentation/javascript/tutorial


    //when page loads, weather should be default, Austin, TX.
    var queryWeather = "https://api.openweathermap.org/data/2.5/forecast?q=Austin,us&units=imperial&appid=" + WeatherKey;
    // We then create an AJAX call for Austin.
    $.ajax({
        url: queryWeather,
        method: "GET"
    }).then(function (response) {
        // Create CODE HERE to Log the queryURL
        console.log(queryWeather);
        // Create CODE HERE to log the resulting object
        console.log(response);
        //logging to see if query works.
        var cityEl = response.city.name;
        console.log(cityEl);
        var tempEl = response.list;
        console.log(tempEl);
    });

    //when the page loads, user input is clear/empty.


    //when you click on submit, we will take note of city/state || zip, and radius. THIS DOESN'T WORK YET
    submitButton.click(function () {
        //pull data Google Maps.




        //using use the location from Google maps (radius) to find any public land from the Govt API. 
        /* 
        https://catalog.data.gov/dataset/usgs-national-boundary-dataset-nbd-downloadable-data-collectionbc141
        https://catalog.data.gov/dataset/trail-line-and-point-features-u-s-fish-and-wildlife-service
    
        */



        //using user input City/State or Zip, pull weather data.

        /*
        https://openweathermap.org/forecast5 use this for 5 day forecast 
        for city/state : https://api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
        example: https://api.openweathermap.org/data/2.5/forecast?q=Austin,us&units=imperial
    
        for zip : https://api.openweathermap.org/data/2.5/forecast?zip={zip code},{country code}
        example: https://api.openweathermap.org/data/2.5/forecast?zip=94040,us
        */


        //display results in correct divs.


        //when cancel is clicked, the page resets. DOES NOT WORK!!!
        cancelButton.on("click", function () {
            $('select option:contains("Select Dropdown")').prop('selected', true);
            zipcodeInput.val("");
        });
    });

});
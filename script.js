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

    //when the page loads, everything is clear/empty.


    //when you click on submit, we will take note of city/state || zip, and radius.
    submitButton.click(function () {
        //pull data from govt API.

        //using govt API, pull data from Google Maps. 

        //using Google Maps API, pull weather data.


        //display results in correct divs.


    });
    //when cancel is clicked, the page resets.
    cancelButton.on("click", function () {
        $('select option:contains("Select Dropdown")').prop('selected', true);
        zipcodeInput.val("");
    });

});
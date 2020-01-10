//=========================================================
// WELCOME TO WANDERDOG'S HIKING TRAILS SEARCH SCRIPT!
//=========================================================

var hikingProjectAPIKey = "200666312-c503ea08860b4acde9e1cf9816b96542";
var hikingSites = document.getElementById('hikingSites');
var hikingDescription = document.getElementById('hikingDescription');

//==================================================
//CORS for API
//==================================================
var redirectHelpHiking = "https://cors-ut-bootcamp.herokuapp.com/";


$(document).ready(function () {
    //===========================
    // prompt for user location
    //===========================
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    //==========================================
    // run this function if user gives location
    //==========================================
    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        $.ajax({
            url: redirectHelpHiking + "www.hikingproject.com/data/get-trails?lat=" + crd.latitude + "&lon=" + crd.longitude + "&key=" + hikingProjectAPIKey,
            method: "GET"
        }).then(function (response) {
            //Log the resulting object
            console.log(response);

            var hikingSitesName = response.trails[0].name;
            hikingSites.innerHTML = hikingSitesName;
            hikingSites.href = response.trails[0].url;

            var hikingSitesSummary = response.trails[0].summary;
            hikingDescription.innerHTML = hikingSitesSummary;
        });
    }

    //============================================
    // if user denies location, run this
    //============================================
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        //if user denies geolocation, run this error message.
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
});
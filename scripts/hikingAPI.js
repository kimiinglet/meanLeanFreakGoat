//=========================================================
// WELCOME TO WANDERDOG'S HIKING TRAILS SEARCH SCRIPT!
//=========================================================

var hikingProjectAPIKey = "200666312-c503ea08860b4acde9e1cf9816b96542";
var hikingSites1 = document.getElementById('hikingSites1');
var hikingDescription1 = document.getElementById('hikingDescription1');

var hikingSites2 = document.getElementById('hikingSites2');
var hikingDescription2 = document.getElementById('hikingDescription2');

var hikingSites3 = document.getElementById('hikingSites3');
var hikingDescription3 = document.getElementById('hikingDescription3');

var hikingSites4 = document.getElementById('hikingSites4');
var hikingDescription4 = document.getElementById('hikingDescription4');

var hikingSites5 = document.getElementById('hikingSites5');
var hikingDescription5 = document.getElementById('hikingDescription5');

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

            //==================================================
            // Add the names and urls for the first 5 trails
            //==================================================
            hikingSites1.innerHTML = response.trails[0].name;
            hikingSites1.href = response.trails[0].url;

            hikingSites2.innerHTML = response.trails[1].name;
            hikingSites2.href = response.trails[1].url;

            hikingSites3.innerHTML = response.trails[2].name;
            hikingSites3.href = response.trails[2].url;

            hikingSites4.innerHTML = response.trails[3].name;
            hikingSites4.href = response.trails[3].url;

            hikingSites5.innerHTML = response.trails[4].name;
            hikingSites5.href = response.trails[4].url;
            //======================================================================
            // Add a description for each of these trails under the name and link
            //======================================================================
            hikingDescription1.innerHTML = response.trails[0].summary;
            hikingDescription2.innerHTML = response.trails[1].summary;
            hikingDescription3.innerHTML = response.trails[2].summary;
            hikingDescription4.innerHTML = response.trails[3].summary;
            hikingDescription5.innerHTML = response.trails[4].summary;
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
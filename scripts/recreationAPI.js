var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";
// API Url for Facilities in TX
var queryURL = redirectHelp + "ridb.recreation.gov/api/v1/facilities?limit=5&state=TX";

var cSites = document.getElementById('cSites');

// Sends ajax request for Facilities within a State
$.ajax({
    url: queryURL,
    headers: {
        apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
    },
    method: "GET"
}).then(function (response) {
    console.log(response);

    // Pulls the Facility ID #
    var facID = response.RECDATA[2].FacilityID
    // for (i=0; i<response.RECDATA.maxLength; i++) {

    // }
    console.log(facID);

    // Uses Facility ID # to display all campsites within Facility
    $.ajax({
        url: redirectHelp + "ridb.recreation.gov/api/v1/facilities/" + facID + "/campsites?limit=5&offset=0",
        headers: {
            apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
        },
        method: "GET"
    }).then(function (response) {
        console.log(response);





        // if {
        //     response.RECDATA[1].AttributeValue = true;
        //     $('#TX').on('click', function () {
        //         cSites.setAttribute(response.RECDATA[]);
        //         cSites.innerText = "Texas BLM";

    })
})

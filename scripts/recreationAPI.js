var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";
var queryURL = redirectHelp + "ridb.recreation.gov/api/v1/facilities?limit=5&state=TX";

// Finds Facilities within a State
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
    //
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

        //Uses Campsite ID # display attributes with below ajax call
        var campID = response.RECDATA[2].CampsiteID
        console.log(campID);

        //Finds all attributes of a specific campsite
        $.ajax({
            url: redirectHelp + "ridb.recreation.gov/api/v1/campsites/" + campID + "/attributes?limit=10&offset=0",
            headers: {
                apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
            },
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    })
});
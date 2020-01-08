//CORS 
var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";
// API Url for Facilities in TX
var queryURL = redirectHelp + "ridb.recreation.gov/api/v1/facilities?limit=50&state=CO";

var cSites = document.getElementById('cSites');

// Sends ajax request for Facilities within a State
$.ajax({
    url: queryURL,
    headers: {
        apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
    },
    method: "GET"
}).then(function (response) {
    // console.log(response);
    // console.log(response.RECDATA);
    // console.log(response.RECDATA[0].FacilityID);


    // Loop thru results and grab the ALL the Facility ID #s
    var recData = response.RECDATA;
    for (var i = 0; i < recData.length; i++) {
        // console.log(recData[i].FacilityID);
        var facID = recData[i].FacilityID;


        // Uses Facility ID # to display all campsites within Facility
        $.ajax({
            url: redirectHelp + "ridb.recreation.gov/api/v1/facilities/" + facID + "/campsites?limit=5&offset=0",
            headers: {
                apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
            },
            method: "GET"
        }).then(function (response) {
            // console.log(response.RECDATA);

            if (response.RECDATA.length >= 1) {
                // console.log(response.RECDATA);
                var campGrounds = response.RECDATA;
                if (!campGrounds) {
                    return;
                }
                for (var i = 0; i < campGrounds.length; i++) {
                    console.log(campGrounds[i].ATTRIBUTES);
                    console.log("CHECK");
                    if (campGrounds[i].ATTRIBUTES) {
                        // var allowed = campGrounds[i].ATTRIBUTES.map(a => a.AttributeName).includes("Pets Allowed");
                        // console.log(allowed);
                        var attributes = campGrounds[i].ATTRIBUTES;
                        var petsAllowed = false;
                        for (var j = 0; j < attributes.length; j++) {
                            if (attributes[j].AttributeName === "Pets Allowed" && attributes[j].AttributeValue === "Yes") {
                                petsAllowed = true;
                                break;
                            }
                        }

                        // Does this place allow pets or not
                        console.log(petsAllowed);
                    }

                }

            }
        });
    }
})

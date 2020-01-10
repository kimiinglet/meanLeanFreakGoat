//==================================================
// ID Where CampGround is to be Displayed
//==================================================
var cSites = document.getElementById('cSites');



//==================================================
// Event listener for State Map path
//==================================================
$("path, .tinyStatesBtn").on("click", function () {
    // console.log($(this).attr("id"));

    //==================================================
    // Grab the ID of Specific State that was Clicked
    //==================================================
    var stateClick = $(this).attr("class");

    //==================================================
    //CORS for API
    //==================================================
    var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";

    //==================================================
    // Inserts State Abbreviation (ID) into API URL
    //==================================================
    var queryURL = redirectHelp + "ridb.recreation.gov/api/v1/facilities?limit=50&state=" + stateClick;
    // console.log(queryURL);

    cSites.innerHTML = "Loading...";
    cSites.href = "";
    //===================================================
    // Sends ajax request for Facilities within a State
    //===================================================
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

        //========================================================
        // Loop thru results and grab the ALL the Facility ID #s ---> OLD WAY

        // We are gonna make a recursive function that checks each facility, 1 by 1, until it finds one that matches our condition, or it runs out of campsites.
        //========================================================
        var recData = response.RECDATA;
        var facilityPetsAllowed = false;

        function processNextFacility() {
            if (recData.length < 1) {
                if (!facilityPetsAllowed) {
                    cSites.innerHTML = "No dog-friendly campgrounds found.";
                    cSites.href = "";
                }
                return; //breaks out of function if i exceeds length of facilities listed
            }
            // //===================================================
            // // Randomly Select One of the Facilities from Array
            // //===================================================
            let randomIndex = Math.floor(Math.random() * recData.length);
            let currentFacility = recData[randomIndex];

            //=================================================================
            // Remove selected facility from the list so it isn't chosen again
            // and we know when to stop.
            //=================================================================
            recData.splice(randomIndex, 1);

            let facID = currentFacility.FacilityID;

            //==================================================================
            // Create var to Display Facilty Name In HTML Link Box (Line 114)
            //==================================================================

            let facName = currentFacility.FacilityName;

            //==============================================================
            // Uses Facility ID # to query for all campsites within Facility
            //==============================================================
            $.ajax({
                url: redirectHelp + "ridb.recreation.gov/api/v1/facilities/" + facID + "/campsites?limit=5&offset=0",
                headers: {
                    apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
                },
                method: "GET"
            }).then(function (response) {

                //==================================================
                // If No Campgrounds, omit Facility 
                //==================================================
                if (response.RECDATA.length >= 1) {
                    // console.log(response.RECDATA);
                    var campGrounds = response.RECDATA;
                    if (!campGrounds) {
                        processNextFacility();
                    }


                    //===================================================
                    //  Loop thru results and grab Campground Attributes
                    //===================================================

                    for (var i = 0; i < campGrounds.length; i++) {
                        console.log(campGrounds[i].ATTRIBUTES);
                        console.log("CHECK");


                        //=============================================================================
                        //  Keep Campgrounds where Pets Allowed is an Attribute AND the value is True
                        //=============================================================================
                        if (campGrounds[i].ATTRIBUTES) {
                            var attributes = campGrounds[i].ATTRIBUTES;
                            var petsAllowed = false;
                            for (var j = 0; j < attributes.length; j++) {
                                if (attributes[j].AttributeName === "Pets Allowed" && attributes[j].AttributeValue === "Yes") {
                                    petsAllowed = true;
                                    facilityPetsAllowed = true;

                                    //===================================================
                                    // If Pets are allowed, put into Ptag ID
                                    //===================================================
                                    cSites.innerHTML = (stateClick + " - " + facName);
                                    var cSiteName = $("#cSites").text();
                                    cSites.href = "https://www.google.com/search?q=" + cSiteName;
                                    break;
                                }
                            }
                            if (petsAllowed) {
                                break;
                            }
                        }
                    }
                    if (facilityPetsAllowed == false) {
                        processNextFacility();
                    }
                }
                //=================================================
                //Else statement if facility has no campgrounds
                //=================================================
                else {
                    processNextFacility();
                }
            });
        }
        processNextFacility();
    })
});


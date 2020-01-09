//==================================================
// ID Where CampGround is to be Displayed
//==================================================
var cSites = document.getElementById('cSites');



//==================================================
// Event listener for State Map path
//==================================================
$("path").on("click", function () {
    // console.log($(this).attr("id"));

    //==================================================
    // Grab the ID of Specific State that was Clicked
    //==================================================
    var stateClick = $(this).attr("id");

    //==================================================
    //CORS for API
    //==================================================
    var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";

    //==================================================
    // Inserts State Abbreviation (ID) into API URL
    //==================================================
    var queryURL = redirectHelp + "ridb.recreation.gov/api/v1/facilities?limit=20&state=" + stateClick;
    // console.log(queryURL);


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
        // Loop thru results and grab the ALL the Facility ID #s
        //========================================================
        var facList = [];
        var recData = response.RECDATA;
        for (var i = 0; i < recData.length; i++) {
            // console.log(recData[i].FacilityID);
            let facID = recData[i].FacilityID;

            //==================================================
            // Put all the Facility IDs into an Array
            //==================================================

            facList.push(facID);
            // console.log(facList);


            //==================================================================
            // Create var to Display Facilty Name In HTML Link Box (Line 114)
            //==================================================================

            let facName = recData[i].FacilityName;


            //===================================================
            // Randomly Select One of the Facilities from Array
            //===================================================
            var randFac = facList[Math.floor(Math.random() * facList.length) + 1];
            // var randFac = facList[num];
            console.log("RANDOM:", randFac);

            //==============================================================
            // Uses Facility ID # to display all campsites within Facility
            //==============================================================
            $.ajax({
                url: redirectHelp + "ridb.recreation.gov/api/v1/facilities/" + randFac + "/campsites?limit=5&offset=0",
                headers: {
                    apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
                },
                method: "GET"
            }).then(function (response) {
                // console.log(response.RECDATA);
                // console.log(randFac);

                //==================================================
                // If No Campgrounds, omit Facility 
                //==================================================
                if (response.RECDATA.length >= 1) {
                    // console.log(response.RECDATA);
                    var campGrounds = response.RECDATA;
                    if (!campGrounds) {
                        return;
                    }


                    //===================================================
                    //  Loop thru results and grab Campground Attributes
                    //===================================================
                    var facilityPetsAllowed = false;
                    for (var i = 0; i < campGrounds.length; i++) {
                        // console.log(campGrounds[i].ATTRIBUTES);
                        // console.log("CHECK");


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
                                    break;
                                }
                            }



                        }

                    }

                    //===================================================
                    // If Pets are allowed, put into Ptag ID
                    //===================================================
                    if (facilityPetsAllowed === true) {
                        $('#cSites').html(stateClick + " - " + facName);
                        // console.log(campGrounds);
                    }


                }
            });
        }
    })
});


var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";
var queryURL = redirectHelp + "ridb.recreation.gov/api/v1/facilities?limit=5&state=TX";

$.ajax({
    url: queryURL,
    headers: {
        apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
    },
    method: "GET"
}).then(function (response) {
    console.log(response);
    var facID = response.RECDATA[2].FacilityID
    console.log(facID);

    $.ajax({
        url: redirectHelp + "ridb.recreation.gov/api/v1/facilities/" + facID + "/campsites?limit=5&offset=0",
        headers: {
            apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
        },
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
});
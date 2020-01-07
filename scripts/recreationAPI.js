var redirectHelp = "https://cors-ut-bootcamp.herokuapp.com/";
var queryURL = redirectHelp + "ridb.recreation.gov/api/v1/activities?limit=5&offset=0";

$.ajax({
    url: queryURL,
    headers: {
        apikey: "5dc5ca61-c304-482b-bc02-1fcb1007f0b2"
    },
    method: "GET"
}).then(function (response) {
    console.log("HELLO");
    console.log(response);
});
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//========================================================
// Attempt to replace states map
//========================================================
$(document).ready(function () {
    var map, infoWindow;
    function initMap() {
        map = new google.maps.Map(document.getElementById('googleMap'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 10
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        //=======================================================
        //marker currently not working as expected
        //=======================================================
        var marker = new google.maps.Marker({
            position: { lat: position.coords.latitude, lng: position.coords.longitude }, // lat/long of marker
            map: map,
            animation: google.maps.Animation.DROP, // drops marker in from top
            title: 'Your Location', // title on hover over marker
            icon: {
                url: 'assets/images/paw-favicon.ico',
                scaledSize: new google.maps.Size(75, 120)
            }
        });
    }

    initMap();

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
});
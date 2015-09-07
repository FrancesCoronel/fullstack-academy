var map,
    markers = [],
    bounds = new google.maps.LatLngBounds();
var fsa = new google.maps.LatLng(40.705786,-74.007672);

function extendBounds(marker) {
    markers.push(marker);
    bounds.extend(marker.position);
    map.fitBounds(bounds);
}

function narrowBounds(marker) {
    markers.splice(markers.indexOf(marker), 1);
    bounds = new google.maps.LatLngBounds();
    markers.forEach(function(marker) {
        bounds.extend(marker.position);
    });
    if (markers.length) {
        map.fitBounds(bounds);
    } else {
        map.setOptions({
            zoom: 13,
            center: fsa
        });
    }
}

function initialize_gmaps() {
    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189, -74.009209);
    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById("googleMap");
    // initialize a new Google Map with the options
    map = new google.maps.Map(map_canvas_obj, mapOptions);

    // Add the marker to the map
    var iconBase = 'images/';
    var icons = {
        hotel: {
            icon: iconBase + 'hotel.png'
        },
        restaurant: {
            icon: iconBase + 'restaurant.png'
        },
        thing: {
            icon: iconBase + 'thing.png'
        }
    };

    function addMarker(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
    }

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
            //icon: /path/to/file;
    });
    var styles = [{
        "featureType": "water",
        "stylers": [{
            "color": "#101010"
        }]
    }, {
        "featureType": "landscape",
        "stylers": [{
            "color": "#435E5E"
        }]
    }, {
        "featureType": "road.local",
        "stylers": [{
            "color": "white"
        }]
    }, {
        "featureType": "road.arterial",
        "stylers": [{
            "color": "#00B2B2"
        }]
    }, {
        "featureType": "road.highway",
        "stylers": [{
            "color": "#A3FFFF"
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "color": "#fff"
        }]
    }, {
        "featureType": "transit.line",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "administrative",
        "stylers": [{
            "color": "#E0FFFF"
        }, {
            "visibility": "simplified"
        }]
    }];
    map.setOptions({
        styles: styles
    });
    // Add the marker to the map by calling setMap()
    marker.setMap(map);
}

$(document).ready(function() {
    initialize_gmaps();

});
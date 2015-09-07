var map,
    markers = [],
    bounds = new google.maps.LatLngBounds();
var fsa = new google.maps.LatLng(40.705786,-74.007672);

function extendBounds (marker) {
    markers.push(marker);
    bounds.extend(marker.position);
    map.fitBounds(bounds);
}
function narrowBounds (marker) {
    markers.splice(markers.indexOf(marker), 1);
    bounds = new google.maps.LatLngBounds();
    markers.forEach(function (marker) {
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
    var mapOptions = {
        center: fsa,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styleArr
    };
    var map_canvas_obj = document.getElementById("map-canvas");
    map = new google.maps.Map(map_canvas_obj, mapOptions);
}

$(document).ready(function() {
    initialize_gmaps();
});

var styleArr = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ef8c25"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b6c54c"
            },
            {
                "lightness": 40
            },
            {
                "saturation": -40
            }
        ]
    },
    {}
]
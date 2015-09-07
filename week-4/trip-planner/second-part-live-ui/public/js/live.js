var arr = [];
var activitiesStuff = [];

function getPlace(schema, placeName) {

    return schema.filter(function(item) {
        return item.name === placeName;
    })[0].place[0].location;
}

// add Map Marker
function addMapMarker(locationType, name) {
    var lat, lon;
    var place;
    switch (locationType) {
        case 'hotel':
            place = getPlace(all_hotels, name);
            break;
        case 'thing':
            place = getPlace(all_things_to_do, name);
            break;
        case 'restaurant':
            place = getPlace(all_restaurants, name);
            break;
        default:
            console.log("update map error?");
            break;
    }
    lat = place[0];
    lon = place[1];

    var latLng = new google.maps.LatLng(lat, lon);
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
    var marker = new google.maps.Marker({
        position: latLng,
        title: name,
    	icon: icons[locationType].icon
    });

    marker.setMap(map);
    return marker;
}

function removeMarker(markerTitle,day){
    // var markers = arr[Number($('.activeDay').text())].markers;
    var makers = activitiesStuff[0].markers;
    var idx;
    markers.forEach(function(m,i){
        if(m.title === markerTitle) idx = i;
    });
    markers.splice(idx,1)[0].setMap(null);
}

$(document).ready(function() {

    // select and set the hotel
    $('.addHotel').on('click', function() {
        //add to DOM
        $('#pickedHotel').empty();
        var hotelName = $('#hotelName option:selected').val();
        var hotelElement = '<li><a href="#">' + hotelName + '</a><button class="btn btn-xs">X</button></li>';
        $(hotelElement).appendTo('#pickedHotel');
        //add to arr
        activitiesStuff = $('#dailyActivities').children('.activitiesHolder').clone();
        arr[Number($('.activeDay').text())] = activitiesStuff[0].innerHTML;
        // add Marker to map as well
        var marker = addMapMarker('hotel', hotelName);
        activitiesStuff[1] = {markers: []};
        activitiesStuff[1].markers.push(marker);
        extendBounds(marker);
    });
    // select and set the restaurant
    $('.addRestaurant').on('click', function() {
        var restaurantName;
        if ($('#pickedRestaurant').children().length < 3) {
            restaurantName = $('#restaurantName option:selected').val();
            var restaurantElement = '<li><a class="addedRestaurant" href="#">' + restaurantName + '</a><button class="btn btn-xs">X</button></li>';
            $(restaurantElement).appendTo('#pickedRestaurant');
        } else {
            alert("Can only pick three restaurants, duhh!");
        }
        //add to arr
        activitiesStuff = $('.activitiesHolder').clone();
        arr[Number($('.activeDay').text())] = activitiesStuff[0].innerHTML;
        // add Marker to map as well
        var marker = addMapMarker('restaurant', restaurantName);
        activitiesStuff[1] = {markers: []};
        activitiesStuff[1].markers.push(marker);
        extendBounds(marker);
    });
    // select and set the thing to do
    $('.addThing').on('click', function() {
        var thingName = $('#thingName option:selected').val();
        var thingElement = '<li><a href="#">' + thingName + '</a><button class="btn btn-xs">X</button></li>';
        $(thingElement).appendTo('#pickedThing');
        //add to arr
        activitiesStuff = $('.activitiesHolder').clone();
        arr[Number($('.activeDay').text())] = activitiesStuff[0].innerHTML;
        // add Marker to map as well
        var marker = addMapMarker('thing', thingName);
        activitiesStuff[1] = {markers: []};
        activitiesStuff[1].markers.push(marker);
        extendBounds(marker);
    });

    //remove any item
    // have to redirect to parent and then back to specific child in order for the data to be manipulated properly, otherwise the delegate function doesn't know element exists
    $('#dailyActivities').delegate('button', 'click', function() {
        console.log(this);
        $(this).parent().remove();
        var activitiesStuffTemp = $('.activitiesHolder').clone();
        arr[Number($('.activeDay').text())] = activitiesStuffTemp[0].innerHTML;
        narrowBounds(this.marker);
        // console.log(activitiesStuff);
        removeMarker( $('#hotelName option:selected').val(), Number($('.activeDay').text()));
        // activitiesStuff.markers[0].setMap(null);
    });

    $('#addDay').on('click', function() {
        var current = $(this).parent().children().length - 1;
        $(this).parent().append("<li role='presentation'><a href='#'>" + current + "</a></li>");
    });
    $('#removeDay').on('click', function() {
        var current = $(this).parent().children().length;
        if (current > 2) {
            $(this).parent().children().last().remove();
            arr.pop();
        }
    });

    // make the picked day button active
    $('.dayHolder .nav.nav-pills').delegate('a', 'click', function() {
        $(this).addClass('activeDay');
        $(this).parent().siblings().children('a').removeClass('activeDay');
    });
    // if we switch days we should first clone class activitiesHolder
    // $('.activeDay').parent().parent().delegate('a', 'click', function(){
    $('.activeDay').parent().parent().delegate('a', 'click', function() {
        $('#dailyActivities').children('.activitiesHolder').children().remove();
        // console.log($('.activeDay'))
        if (arr[Number($('.activeDay').text())]) {
            // console.log('hit if')
            $('#dailyActivities').children('.activitiesHolder').html(arr[Number($('.activeDay').text())]);
        } else {
            var text = "<h3 class='activtiesLead'>My Hotel</h3><ul><div class='row' id='hotelRow'><div class='col-lg-10 col-md-10 col-sm-10 col-xs-10' id='pickedHotel'></div></div></ul><h3>My Restaurants</h3><ul><div class='row' id='restaurantRow'><div class='col-lg-10 col-md-10 col-sm-10 col-xs-10' id='pickedRestaurant'></div></div></ul><h3>My Things to Do</h3><ul><div class='row' id='thingRow'><div class='col-lg-10 col-md-10 col-sm-10 col-xs-10' id='pickedThing'></div></div>";
            $('#dailyActivities').children('.activitiesHolder').html(text);
        }

    });
});


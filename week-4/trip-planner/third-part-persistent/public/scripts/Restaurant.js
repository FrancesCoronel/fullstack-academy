var Restaurant;

$(document).ready(function() {
    Restaurant = function(data) {
        var self = this;
        eachKeyValue(data, function(key, val) {
            self[key] = val;
        });
        this.buildMarker()
            .drawMarker()
            .buildItineraryItem()
            .drawItineraryItem();
        currentDay.restaurants.push(this);
    };

    // Restaurant.prototype = generateAttraction({
    // 	icon: '/images/restaurant.png',
    // 	$listGroup: $('#my-restaurants .list-group'),
    // 	$all: $('#all-restaurants'),
    // 	all: all_restaurants,
    // 	constructor: Restaurant
    // });

    // Restaurant.prototype.delete = function () {
    // 	var index = currentDay.restaurants.indexOf(this),
    // 		removed = currentDay.restaurants.splice(index, 1)[0];
    // 	removed
    // 		.eraseMarker()
    // 		.eraseItineraryItem();
    // };

    // now using AJAX to make a get request for the data
    $.get('/restaurants', function(data) {
        Restaurant.prototype = generateAttraction({
            icon: '/images/restaurant.png',
            $listGroup: $('#my-restaurants .list-group'),
            $all: $('#all-restaurants'),
            all: all_restaurants,
            constructor: Restaurant,
            addToDay: function(attraction) {
                $.post('/days/' + currentDay.number + '/restaurant', attraction);
            }
        });

        // delete hotel
        Restaurant.prototype.delete = function() {
            var index = currentDay.restaurants.indexOf(this),
                removed = currentDay.restaurants.splice(index, 1)[0];
            removed
                .eraseMarker()
                .eraseItineraryItem();
            // adding AJAX
            $.ajax({
                url: '/days/' + currentDay.number + '/restaurant',
                type: 'DELETE'
            });
        };
    });
});

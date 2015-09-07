var Hotel;

$(document).ready(function() {
    Hotel = function(data) {
        var self = this;
        eachKeyValue(data, function(key, val) {
            self[key] = val;
        });
        // if there's a hotel, just delete previous and add this one
        if (currentDay.hotel) {
            currentDay.hotel.delete();
        }
        // building marker
        this.buildMarker()
            .drawMarker()
            .buildItineraryItem()
            .drawItineraryItem();
        currentDay.hotel = this;
    };

    $.get('/hotels', function(all_hotels){
        Hotel.prototype = generateAttraction({
            icon: '/images/lodging_0star.png',
            $listGroup: $('#my-hotel .list-group'),
            $all: $('#all-hotels'),
            all: all_hotels,
            constructor: Hotel,
            addToDay: function(attraction) {
                $.post('/days/' + currentDay.number + '/hotel', attraction);
            }
        });
    });

    Hotel.prototype.delete = function() {
            $.ajax({
                url: '/days/' + currentDay.number + '/hotel',
                type: 'DELETE'
            }, function(res) {
                currentDay.hotel
                    .eraseMarker()
                    .eraseItineraryItem();
                currentDay.hotel = null;
            });
    };
});

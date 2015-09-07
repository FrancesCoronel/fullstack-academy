var ThingToDo;

$(document).ready(function() {
    ThingToDo = function(data) {
        var self = this;
        eachKeyValue(data, function(key, val) {
            self[key] = val;
        });
        this.buildMarker()
            .drawMarker()
            .buildItineraryItem()
            .drawItineraryItem();
        currentDay.thingsToDo.push(this);
    };

    // ThingToDo.prototype = generateAttraction({
    // 	icon: '/images/star-3.png',
    // 	$listGroup: $('#my-things-to-do .list-group'),
    // 	$all: $('#all-things-to-do'),
    // 	all: all_things_to_do,
    // 	constructor: ThingToDo
    // });

    // ThingToDo.prototype.delete = function () {
    // 	var index = currentDay.thingsToDo.indexOf(this),
    // 		removed = currentDay.thingsToDo.splice(index, 1)[0];
    // 	removed
    // 		.eraseMarker()
    // 		.eraseItineraryItem();
    // };

    $.get('/thingsToDo', function(data) {

        ThingToDo.prototype = generateAttraction({
            icon: '/images/star-3.png',
            $listGroup: $('#my-things-to-do .list-group'),
            $all: $('#all-things-to-do'),
            all: all_things_to_do,
            constructor: ThingToDo,
            addToDay: function(attraction) {
                $.post('/days/' + currentDay.number + '/thingToDo', attraction);
            }
        });


        ThingToDo.prototype.delete = function() {
            var index = currentDay.thingsToDo.indexOf(this),
                removed = currentDay.thingsToDo.splice(index, 1)[0];
            removed
                .eraseMarker()
                .eraseItineraryItem();
            // adding AJAX
            $.ajax({
                url: '/days/' + currentDay.number + '/thingToDo',
                type: 'DELETE'
            });
        };
    });
});

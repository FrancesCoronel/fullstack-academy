// defining variable called Day
var Day;

// jQuery loading document
$(document).ready(function () {
	Day = function (_id) {
		this.hotel = null;
		this.restaurants = [];
		this.thingsToDo = [];
		this.number = days.push(this);
		this.buildButton()
			.drawButton();
		this._id = _id;
	};

	// creating a prototype function of buildButton that grabs the button with the number of the current day
	Day.prototype.buildButton = function () {
		this.$button = $('<button class="btn btn-circle day-btn"></button>').text(this.number);
		var self = this;
		// switching to specified button on click
		this.$button.on('click', function () {
			// utilized switchTo function
			self.switchTo();
		});
		return this;
	};

	// appending day buttons to parent class
	Day.prototype.drawButton = function () {
		var $parent = $('.day-buttons');
		this.$button.appendTo($parent);
		return this;
	};

	// removing button
	Day.prototype.eraseButton = function () {
		this.$button.detach();
		return this;
	};

	// switch days to current
	Day.prototype.switchTo = function () {
		function eraseOne (attraction) {
			attraction.eraseMarker().eraseItineraryItem();
		}
		// if there's a hotel added, erase it
		if (currentDay.hotel) eraseOne(currentDay.hotel);
		// for each restaurant, erase it
		currentDay.restaurants.forEach(eraseOne);
		// for each thing, erase it
		currentDay.thingsToDo.forEach(eraseOne);

		// draw the marker
		function drawOne (attraction) {
			attraction.drawMarker().drawItineraryItem();
		}
		// can not produce more than 1 hotel
		if (this.hotel) drawOne(this.hotel);
		this.restaurants.forEach(drawOne);
		this.thingsToDo.forEach(drawOne);
		// applying day of class to current button so that it is active
		currentDay.$button.removeClass('current-day');
		this.$button.addClass('current-day');
		$('#day-title > span').text('Day ' + this.number);
		currentDay = this;
	};

	// remove current day
	function deleteCurrentDay () {
		if (days.length > 1) {
			// renumber the days depending on which day is removed
			var index = days.indexOf(currentDay),
				previousDay = days.splice(index, 1)[0],
				newCurrent = days[index] || days[index - 1];
			days.forEach(function (day, idx) {
				day.number = idx + 1;
				day.$button.text(day.number);
			});
			newCurrent.switchTo();
			previousDay.eraseButton();
		}
	}

	// creating new instance of the object Day
	$('#add-day').on('click', function () {
		//create new day in db with ajax
		$.post('/days/', function(activities){
			new Day(activities._id)
		});
	});

	// button on click will remvoe day
	$('#day-title > .remove').on('click', deleteCurrentDay);
});










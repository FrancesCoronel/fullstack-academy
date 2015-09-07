function eachKeyValue (obj, onEach) {
	Object.keys(obj).forEach(function (key) {
		onEach(key, obj[key]);
	});
}

var days, currentDay;

$(document).ready(function () {
	days = [];
	currentDay = new Day();
	currentDay.$button.addClass('current-day');
});
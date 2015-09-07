describe("Vehicle Constructor", function() {
	beforeEach(function() {
		vehicle = new Vehicle(22589, "blue");
	});

	it("should take License Plate number in its constructor", function() {
		expect(vehicle.licensePlate).toEqual(22589);
	});

	it("should take type of Color in its constructor", function(){
		expect(vehicle.color).toEqual("blue");
	});

	it("the beep function should return the string 'BEEP, BEEP'", function() {
		expect(vehicle.beep()).toEqual("BEEP, BEEP");
	});

	it("has a changeColor function and changes vehicle color from blue to red", function(){
		vehicle.changeColor("red");
		expect(vehicle.color).toEqual("red");
	});

	it("should create a vehicle object with a unique License Plate Number and Color", function(){
		expect(vehicle.hasOwnProperty("licensePlate") && vehicle.hasOwnProperty("color")).toEqual(true);
	});

	it("the beep function is on its prototype", function(){
		expect(vehicle.hasOwnProperty("beep")).toEqual(false);
	});

	it("the changeColor function is on its prototype", function() {
		expect(vehicle.hasOwnProperty("changeColor")).toEqual(false);
	});

});

describe("Truck Class", function(){

	beforeEach(function(){
		truck = new Truck(47892, "Red", "Manual");
	})

	it("should have a License Plate and vehicle color in its constructor", function(){
		expect(truck.color).toEqual("Red");
		expect(truck.licensePlate).toEqual(47892);
	});

	it("should have a Transmission property", function(){
		expect(truck.transmission).toEqual("Manual");
	});

	it("should inherit all methods from Vehicle", function() {
        	expect(typeof Truck.prototype.changeColor).toEqual("function");
    		expect(Truck.hasOwnProperty('toString')).toEqual(false);
	});

	it("should set constructor property properly on Truck", function() {
    		expect(Truck.prototype.constructor).toEqual(Truck);
	});

});

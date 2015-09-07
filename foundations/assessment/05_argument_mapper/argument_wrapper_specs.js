describe("createArgumentMap", function(){

	it("returns an object", function(){
		var f0 = function(){};
		var argsMapped = createArgumentMap(f0);
		
		expect(typeof argsMapped === 'object');
		expect(Array.isArray(argsMapped)).toEqual(false);
		expect(argsMapped['a0']).toEqual(f0);
	});

	it("properties on the object returned always assign properties with the convention a0,a1,a2...", function(){
		var f1 = function(arg0,arg1,arg2,arg3,arg4){};
		var argsMapped = createArgumentMap(f1, "arg1",'arg2','arg3','arg4');
		var keyValues = Object.keys(argsMapped);

		expect(keyValues).toEqual(['a0','a1','a2','a3','a4']);
	});

	it("returns an object when there is only a function object argument and a string", function(){
		var f2 = function(a1){};
		var argsMapped = createArgumentMap(f2, 'Hello World');

		expect(Object.keys(argsMapped).length === 2).toEqual(true);
		expect(argsMapped['a0']).toEqual(f2);
		expect(argsMapped['a1']).toEqual('Hello World');
	});

	it("creates properties and assigns the values for each argument in the proper order", function(){
		var f3 = function(a1,a2,a3,a4,a5){};
		var argsMapped = createArgumentMap(f3, "Hello World", 22, [1,2,3], "Fullstack", undefined);

		expect(Object.keys(argsMapped).length === 6).toEqual(true);
		expect(argsMapped['a0']).toEqual(f3);
		expect(argsMapped['a1']).toEqual('Hello World');
		expect(argsMapped['a2']).toEqual(22);
		expect(argsMapped['a3']).toEqual([1,2,3]);
		expect(argsMapped['a4']).toEqual("Fullstack");
		expect(argsMapped['a5']).toEqual(undefined);
	});

});

describe("keyAdder", function(){
	it("keyAdder is a function", function(){
		expect(typeof keyAdder === 'function').toEqual(true);
	});

	it('can be passed as an argument', function(){
		var argsMapped = createArgumentMap(keyAdder)
		expect(typeof argsMapped["a0"] === 'function').toEqual(true)
	});

	it('returns a number value', function(){
		var total = keyAdder.call({a1:1,a2:3,a3:5});
		expect(typeof total === 'number').toEqual(true);
	});

	it("is designed to be called within an object's context, do not create conditions if called in the global space", function(){
		var myObj = {a0: keyAdder, a1:1, a2: 2}
		var total = keyAdder.call({a1:4,a2:5,a3:6});

		expect(typeof total === 'number').toEqual(true);
		expect(typeof myObj['a0']()==='number').toEqual(true);
	});

	it("adds all the keys with number values and returns their sum", function(){
		var argsMapped = createArgumentMap(keyAdder, 4, 22, [1,2,3], "Fullstack", 10);
		var argsMappedTotal = argsMapped['a0']();
		var total = keyAdder.call({prop1: 4, prop2: 3, prop4: {} })

		expect(argsMappedTotal).toEqual(36);
		expect(total).toEqual(7);
	});

	it("skips properties of the object's prototype", function(){
		var NumberObj = function(){
			this['a0'] = 0;
			this['a5'] = 5;
			this['a10'] = 10;
			this['a15'] = 15;
		}

		NumberObj.prototype['a20'] = 20;
		NumberObj.prototype['a25'] = 25;

		var objectWithNumberVals = new NumberObj();

		expect(keyAdder.call(objectWithNumberVals)).toEqual(30);
	})
});

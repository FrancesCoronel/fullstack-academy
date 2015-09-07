var twice = function(func){
	var called = 0;
	return function (){
		if(called < 2){
			called++;
			return func();
		}
		
		return 0;	
	}
}

function alternate(fn){
	var count = 0;

	return function(){
		count++;
		if(count%2!==0){
			fn();
		}
	}
}
function merge (obj1, obj2) {
	var obj = {};
	var arrayOfArgs = Array.prototype.slice.call(arguments);
	arrayOfArgs.forEach(function(arg){
		for(var key in arg) {
			obj[key] = arg[key];
		}
	});
	return obj;
}

function FQL (arr) {
	this.original = arr;
	this.arr = arr;
	this.indexTables = {};
}

FQL.prototype.exec = function() {
	var toReturn = this.arr;
	this.arr = this.original;
	return toReturn;
};

FQL.prototype.count = function() {
	// return this.arr.length;
	// rely on methods, not states
	return this.exec().length;
};

FQL.prototype.limit = function(num) {
	this.arr = this.arr.slice(0, num);
	return this;
};

FQL.prototype.where = function(query) {
	var filtered = this.arr.filter(function(movObj){
	var bool = true;
	for (var key in query) {
		if (query.hasOwnProperty(key)) {
			if (typeof query[key] === 'function') {
				if (bool) {
					bool = query[key](movObj[key]);
				}
			}
			else {
				if (bool) {
					bool = query[key] === movObj[key];
				}
			}
		}
	}
	return bool;
	});
	this.arr = filtered;
	return this;
};

FQL.prototype.select = function(keysArray) {
	var selected = [];
	this.arr.forEach(function(obj) {
		var resultObj = {};
		for (var i = 0; i < keysArray.length; i++) {
			var key = keysArray[i];
			if (obj.hasOwnProperty(key)) {
				resultObj[key] = obj[key];
			}
		}
		selected.push(resultObj);
	});
	this.arr = selected;
	return this;
};

FQL.prototype.order = function(row) {
	this.arr = this.arr.sort(function(a, b){
		return a[row] - b[row];
	});
	return this;
};

// Level 2

FQL.prototype.left_join = function(foreignFQL, rowMatcher) {
	// joins original table with foreign table
	// uses the row matcher to determine what values will be joined together in the new table
	// joining two row merges their key value pairs
	var result = [];
	this.table.forEach(function(row){
		foreignFQL.forEach(function(foreignRow) {
			if (rowMatcher(row, foreignRow)) {
				var merged = merge(row, foreignRow);
				result.push(merged);
			}
		});
	});
	return new FQL(result);
};

FQL.prototype.getIndicesOf = function(columnName, value) {
	return this.indexValue[columnName] && this.indexTable[columnName][value];
};

FQL.prototype.addIndex = function(columnName) {
	// for each row get the value at column name
	// make a key for index value at that value
	// key should map to array
	// push index of row into array
	var indexTable = this.indexTable[colunName] = {};
	this.table.forEach(function(row, index) {
		var indexKey = row[columnName];
		indexTable[indexKey] = indexTable[indexKey] || [];
		indexTable[indexKey].push(index);
	});
};
var traverseDomAndCollectElements = function(matchFunc, startEl) {
    var resultSet = resultSet || [];
    if (typeof startEl === "undefined") {
        startEl = startEl || document.body;
    }

    // // base case
    // // starting from startEl, we are pushing the children into the resultSet
    // // cycling over each child and getting their children
    // // until there are no more children
    // var store = document.body.children;
    // for (var i = 0; i < store.length; i++) {
    //     if (!store) {
    //         return resultSet;
    //     } else if (!store[i].children) {
    //         // then we want to stop looking at resultSet[i]
    //         resultSet.push(store[i]);
    //         // remove from store array
    //         i++;
    //     } else {
    //         // if there are children
    //         store += store[i].children;
    //         i++;
    //     }
    // }

    // your code here
    // traverse the DOM tree and collect matching elements in resultSet
    // use matchFunc to identify matching elements

    // stack are the remaining elements to test
    // var stack = [startEl];
    // while (stack.length) {
    //     var firstItem = stack.pop();
    //     if (matchFunc(firstItem)) {
    //         resultSet.push(firstItem);
    //     }
    //     for (var i = 0; i < firstItem.children.length; i++) {
    //         stack.push(firstItem.children[i]);
    //     }
    // }

    // recursive method
    if (startEl.children.length === 0) {
        return resultSet;
    } else {
        for (var i = 0; i < startEl.children.length; i++) {
            traverseDomAndCollectElements(matchFunc, startEl.children[i], resultSet);
        }
    }
    return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
    if (selector.charAt(0) === ('#')) {
        return 'id';
    } else if (selector.charAt(0) === ".") {
        return 'class';
    } else if (selector.charAt(0) !== '.' && (/\./).test(selector)) {
        return 'tag.class';
    } else {
        return 'tag';
    }
    // Alternative Solution
    // var firstChar = selector[0];
    // if (firstChar == '#') return 'id';
    // if (firstChar == '.') return 'class';
    // if ((selector.indexOf('.') !== -1) return 'tag.class';
    // return 'tag';
};

// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
    var selectorType = selectorTypeMatcher(selector);
    var matchFunction = function(el) {
        var tagCheck = function(select) {
            return el.tagName && (el.tagName.toLowerCase() === select) ? true : false;
        };
        var classCheck = function(select) {
            var elements = el.className.split(" ");
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] === (select)) {
                    return true;
                }
            }
            return false;
        };
        if (selectorType === "id") {
            return (el.id === (selector.slice(1))) ? true : false;
        } else if (selectorType === "class") {
            return classCheck(selector.slice(1));
        } else if (selectorType === "tag.class") {
            return tagCheck(selector.split(".")[0]) && classCheck(selector.split(".")[1]);
        } else if (selectorType === "tag") {
            return tagCheck(selector.toLowerCase());
        }
    };
    return matchFunction;
};

// Alternative Implementation

// switch(selectorType) {
//     case 'id':
//         // do something
//         break;
//     case 'class':
//         break;
//     case 'tag.class':
//         break;
//     case 'tag':
//         break;
// }

var $ = function(selector) {
    var elements;
    // returns true or false if element matches selector
    var selectorMatchFunc = matchFunctionMaker(selector);
    elements = traverseDomAndCollectElements(selectorMatchFunc);
    return elements;
};
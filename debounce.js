// Create JD Object
// ----------------
var JD = {};

// Debounce Method
// ---------------
JD.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this,
			args = arguments;
		var later = function() {
			timeout = null;
			if ( !immediate ) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait || 200);
		if ( callNow ) { 
			func.apply(context, args);
		}
	};
};
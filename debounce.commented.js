// Create JD Object
// ----------------
/*
	It's a good idea to attach helper methods like `debounce` to your own 
	custom object. That way, you don't pollute the global space by 
	attaching methods to the `window` object and potentially run in to
	conflicts.
*/
var JD = {};

// Debounce Method
// ---------------
/*
	Return a function, that, as long as it continues to be invoked, will
	not be triggered. The function will be called after it stops being 
	called for `wait` milliseconds. If `immediate` is passed, trigger the 
	function on the leading edge, instead of the trailing.
*/
JD.debounce = function(func, wait, immediate) {
	/*
		Declare a variable named `timeout` variable that we will later use 
		to store the *timeout ID returned by the `setTimeout` function.

		*When setTimeout is called, it retuns a numeric ID. This unique ID
		can be used in conjunction with JavaScript's `clearTimeout` method 
		to prevent the code passed in the first argument of the `setTimout`
		function from being called. Note, this prevention will only occur
		if `clearTimeout` is called before the specified number of 
		milliseconds passed in the second argument of setTimeout have been
		met.
	*/
	var timeout;

	/*
		Return an anomymous function that has access to the `func`
		argument of our `debounce` method through the process of closure.
	*/
	return function() {

		/*
			1) Assign `this` to a variable named `context` so that the 
			   `func` argument passed to our `debounce` method can be 
			   called in the proper context.

			2) Assign all *arugments passed in the `func` argument of our
			   `debounce` method to a variable named `args`.

			*JavaScript natively makes all arguments passed to a function
			accessible inside of the function in an array-like variable 
			named `arguments`. Assinging `arguments` to `args` combines 
			all arguments passed in the `func` argument of our `debounce` 
			method in a single variable.
		*/
		var context = this,   /* 1 */
			args = arguments; /* 2 */

		/*
			Assign an anonymous function to a variable named `later`.
			This function will be passed in the first argument of the
			`setTimeout` function below.
		*/
		var later = function() {
			
			/*      
				When the `later` function is called, remove the numeric ID 
				that was assigned to it by the `setTimeout` function.

				Note, by the time the `later` function is called, the
				`setTimeout` function will have returned a numeric ID to 
				the `timeout` variable. That numeric ID is removed by 
				assiging `null` to `timeout`.
			*/
			timeout = null;

			/*
				If the boolean value passed in the `immediate` argument 
				of our `debouce` method is falsy, then invoke the 
				function passed in the `func` argument of our `debouce`
				method using JavaScript's *`apply` method.

				*The `apply` method allows you to call a function in an
				explicit context. The first argument defines what `this`
				should be. The second argument is passed as an array 
				containing all the arguments that should be passed to 
				`func` when it is called. Previously, we assigned `this` 
				to the `context` variable, and we assigned all arguments 
				passed in `func` to the `args` variable.
			*/
			if ( !immediate ) {
				func.apply(context, args);
			}
		};

		/*
			If the value passed in the `immediate` argument of our 
			`debounce` method is truthy and the value assigned to `timeout`
			is falsy, then assign `true` to the `callNow` variable.
			Otherwise, assign `false` to the `callNow` variable.
		*/
		var callNow = immediate && !timeout;

		/*
			As long as the event that our `debounce` method is bound to is 
			still firing within the `wait` period, remove the numerical ID  
			(returned to the `timeout` vaiable by `setTimeout`) from 
			JavaScript's execution queue. This prevents the function passed 
			in the `setTimeout` function from being invoked.

			Remember, the `debounce` method is intended for use on events
			that rapidly fire, ie: a window resize or scroll. The *first* 
			time the event fires, the `timeout` variable has been declared, 
			but no value has been assigned to it - it is `undefined`. 
			Therefore, nothing is removed from JavaScript's execution queue 
			because nothing has been placed in the queue - there is nothing 
			to clear.

			Below, the `timeout` variable is assigned the numerical ID 
			returned by the `setTimeout` function. So long as *subsequent* 
			events are fired before the `wait` is met, `timeout` will be 
			cleared, resulting in the function passed in the `setTimeout` 
			function being removed from the execution queue. As soon as the 
			`wait` is met, the function passed in the `setTimeout` function 
			will execute.
		*/
		clearTimeout(timeout);

		/*
			Assign a `setTimout` function to the `timeout` variable we 
			previously declared. Pass the function assigned to the `later` 
			variable to the `setTimeout` function, along with the numerical 
			value assigned to the `wait` argument in our `debounce` method. 
			If no value is passed to the `wait` argument in our `debounce` 
			method, pass a value of 200 milliseconds to the `setTimeout` 
			function.  
		*/
		timeout = setTimeout(later, wait || 200);

		/*
			Typically, you want the function passed in the `func` argument
			of our `debounce` method to execute once *after* the `wait` 
			period has been met for the event that our `debounce` method is 
			bound to (the trailing side). However, if you want the function 
			to execute once *before* the event has finished (on the leading 
			side), you can pass `true` in the `immediate` argument of our 
			`debounce` method.

			If `true` is passed in the `immediate` argument of our 
			`debounce` method, the value assigned to the `callNow` variable 
			declared above will be `true` only after the *first* time the 
			event that our `debounce` method is bound to has fired.

			After the first time the event is fired, the `timeout` variable
			will contain a falsey value. Therfore, the result of the 
			expression that gets assigned to the `callNow` variable is 
			`true` and the function passed in the `func` argument of our
			`debounce` method is exected in the line of code below.

			Every subsequent time the event that our `debounce` method is 
			bound to fires within the `wait` period, the `timeout` variable 
			holds the numerical ID returned from the `setTimout` function 
			assigned to it when the previous event was fired, and the 
			`debounce` method was executed.

			This means that for all subsequent events within the `wait`
			period, the `timeout` variable holds a truthy value, and the
			result of the expression that gets assigned to the `callNow`
			variable is `false`. Therefore, the function passed in the 
			`func` argument of our `debounce` method will not be executed.  

			Lastly, when the `wait` period is met and the `later` function
			that is passed in the `setTimeout` function executes, the 
			result is that it just assigns `null` to the `timeout` 
			variable. The `func` argument passed in our `debounce` method 
			will not be executed because the `if` condition inside the 
			`later` function fails. 
		*/
		if ( callNow ) { 
			func.apply(context, args);
		}
	};
};
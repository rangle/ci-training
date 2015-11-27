JavaScript Promises
===================

Promises, sometimes called futures are a programming pattern that JavaScript
borrowed from other languages.  Promises help programmers reason about values
that are not available until some point in the future.

## The Future In JavaScript

In synchronous JavaScript code the future always happens after the next line of
code runs. 

```js

    var x;
    
    console.log(x);
    
    x = 5;
    
    console.log(x);
```    
    
The above example will output:

    undefined
    5
    
This example is not exciting, and is very straight forward. Adding functions to
the example change things a little bit.

```js

    var x;
    
    console.log(x);
    
    function setX() {
      x = 5;
    }
    
    console.log(x);
    
    setX();
    
    console.log(x);
```
    
    
Now the output will be:

    undefined
    undefined
    5
    
Even with the function, the example is still quite straightforward, and easy
enough to reason about.

JavaScript has an important property in that it will _always run code to
completion_.  Unless the underlying software crashes, or an error is 
encountered, JavaScript code is guaranteed to run until there are no more
statements left to execute.

There is _another_ important property in most JavaScript environments, and that
is the event loop.  In other programming languages event loops are typically
added by the programmer, but in a web browser the event loop is part of the
execution model.

What ends up happening in a JavaScript program is that all the "top level" code
runs until it finishes, and instead of the program ending, the program waits for
events.

Events that happen _after_ code has run to completion are considered 
_asynchronous_.

## Events

Code runs until there is no more code to run, and then JavaScript waits for
events.  There are roughly three broad types of events in JavaScript:

- User events, like clicks, window resizes, touches, etc
- Network events like values coming back from a request to a web server
- Timer events from functions like `setTimeout`, or `setInterval`, in the
Angular world `$timeout`, and `$interval`

Code can be attached to these events, and just like "top level" code, these
event handlers will all run until they complete.

In JavaScript functions can be assigned to variables, just like numbers, strings
or other objects.  To attach code to an event handler functions are assigned
just like normal variables, when functions are assigned like this they are
often referred to as callbacks; as in the function will call back later.


## Callbacks

Callback functions happen at some point in the future.  Sometimes this future
might be synchronous, like so:


```js

    function getXLater(callback) {
        var x = 5;
        callback(x);
    }
    
    function getX() {
        var x = 3;
        return x;
    }
    
    getXLater(function (x) {
        console.log(x);
    });
    
    console.log(getX());
```
    
This example will output:

    5
    3
    
This example is _synchronous_, just like all the previous examples.  Everything
runs in a _relatively_ easy to reason about manner.  All of the code runs, and
then JavaScript is left waiting.

A JavaScript engine will walk through the previous example like so:


```js

    function getXLater(callback) {   // 1.  define a function
        var x = 5;                   // 4.  set a local variable 'x' to 5
        callback(x);                 // 5.  run the argument 'callback'
    }
    
    function getX() {                // 2.  define another function
        var x = 3;                   // 9.  set a local variable 'x' to 3
        return x;                    // 10. return 'x' (3)
    }
    
    getXLater(function (x) {         // 3.  invoke the getXLater function, and
                                     //     pass it an anonymous function to be
                                     //     run later
        console.log(x);              // 6.  log the argument 'x' to console
    });
    
    console.log(getX());             // 8.  invoke getX
                                     // 11. log the result of getX to console
```
                                     

Because functions can also be variables, this example can also be written like
so:

```js

    function getXLater(callback) {   // 1.  define a function
        var x = 5;                   // 5.  set a local variable 'x' to 5
        callback(x);                 // 6.  run the argument 'callback'
    }
    
    function getX() {                // 2.  define another function
        var x = 3;                   // 9.  set a local variable 'x' to 3
        return x;                    // 10. return 'x' (3)
    }
    
    function getAnotherX(x) {        // 3.  define yet another function
        console.log(x);              // 7.  log 'x' to console
    }
    
    getXLater(getAnotherX);          // 4.  run getXLater, and give it
                                     //     getAnotherX as a parameter
    
    console.log(getX());             // 8.  invoke getX
                                     // 11. log the result of getX to console
                                     
```
                      
All of this is still synchronous, and relatively easy to reason about even
though the code twists, and turns.  Adding an asynchronous event to this will
start to make the example more complex.

The same example with `getAnotherX` written in asynchronous form:

```js

    function getXLater(callback) {
        var x = 5;
        setTimeout(function () {
            callback(x);
        }, 100);
    }
    
    function getX() {
        var x = 3;
        return x;
    }
    
    getXLater(function (x) {
        console.log(x);
    });
    
    console.log(getX());
```
    
This time the output of the program is:

    3
    5
    
So what happened? A JavaScript engine will walkthrough the previous example
like so:


```js

    function getXLater(callback) {  // 1.  define getXLater function   
        var x = 5;                  // 4.  define a local variable 'x' as 5
        setTimeout(function () {    // 5.  call setTimeout function and pass it
                                    //     an anonymous function to run 100ms
                                    //     in the future
            callback(x);            // 11. 100ms finally expires run callback
                                    //     with 'x' (5)
        }, 100);
    }
    
    function getX() {               // 2.  define getX function
        var x = 3;                  // 7.  define a local variable 'x' as 3
        return x;                   // 8.  return 'x' (3)
    }
    
    getXLater(function (x) {        // 3.  invoke getXLater with an anonymous
                                    //     function as a parameter
        console.log(x);             // 12. finally log 'x' (5) to console
    });
    
    console.log(getX());            // 6.  invoke getX
                                    // 9.  log 'x' to console (3)
                                    // 10. there is no more code to run,
                                    //     JavaScript will wait on its own
```                                   
                                   
Using a timeout event caused the example program to run `getXLater`'s callback
_asynchronously_.  JavaScript's timer events let the programmer place things in
the event loop to run at some point in the future. 

This example is very contrived, but it does start to illustrate how confusing
asynchronous functions can be.  In real world code these traditional callback
patterns can quickly become hard to read, and hard to maintain.  Consider the
following:

```js

    function getFromServer(resource, id, callback) {
        // gets some resource from the server (implementation not shown)
        // ...
    }
    
    function displayPhoto(photo) {
        // displays a photo somehow
        // ...
    }
    
    function getFavouritePhoto(userId, callback) {
        getFromServer('user', userId, function(err, user) {
            if (err) {
                callback(err);
                return;
            }
            getFromServer('photo', user.favePhoto, function(err2, photo) {
                if (err2) {
                    callback(err);
                    return;
                }
                callback(null, photo);
            }); 
        });
    });
    
    getFavouritePhoto('pat', function (err, photo) {
        if (err) {
            // show an error message
            return;
        }
        displayPhoto(photo);
    });
```
    
    
In this example there is no output.  The example attempts to show how easily
callbacks can devolve into code that is hard to read, and hard to refactor.

Error handling in the above code also _depends_ on a convention in which Errors
are passed as the first argument to callbacks.

It is easy to imagine that real world code written in this model _could_ quickly
spiral out of control.

## Promises

Promises provide a means of "flattening" the callback style of code, as well as
making it easier to move functions around.  

In the callback style it can quickly become very hard to tell where a function 
begins, and where it ends.  There are conventions, and techniques that callback 
style programmers use to combat these issues, but in _many_ cases code is still 
quite hard to reason about, especially complex sequences of events.

Promises are coming to future versions of JavaScript as native objects, however
the following examples will use Angular's `$q` promise library, since it works
in all browsers now, and is _the_ way to make promises in Angular 1.x

Promises are objects that have a `then` method.  The `then` method takes one, 
two, or sometimes three arguments, all of which are callbacks.

Wait, callbacks? Promises are supposed to fix callbacks!  That is still true, 
but promises "invert" the way programmers can think about callbacks.  Instead
of worrying about the callback when invoking the function, the callbacks are
instead attached to a promise _returned from the invoked function_.

Here is the last callback example written with promises:

```js

    function getFromServer(resource, id) {
        // gets some resource from the server (implementation not shown)
        // ...
        return promiseToGetSomething;
    }
    
    function displayPhoto(photo) {
        // displays a photo somehow
        // ...
    }
    
    function getFavouritePhoto(userId); {
        var promiseToGetUser = getFromServer('user', userId);
        
        return promiseToGetUser.then(function (user) {
           var promiseToGetPhoto = getFromServer('photo', user.favePhoto);
           
           return promiseToGetPhoto;
        });
    });
    
    getFavouritePhoto('pat').then(displayPhoto, function (err) {
        // show an error message
    });
```
    
Already this example improves the readability of callbacks by forcing the
programmer to work with them _as return values_ instead of as parameters.  This
can have dramatic improvements on readability, and on refactorability.

The above example could be refactored to look like:


```js

    function getFromServer(resource, id) {
        // gets some resource from the server (implementation not shown)
        // ...
        return promiseToGetSomething;
    }
    
    function displayPhoto(photo) {
        // displays a photo somehow
        // ...
    }
    
    function getUser(userId) {
        return getFromServer('user', userId);
    }
    
    function getFavouritePhotoFromUser(user) {
        return getFromServer('photo', user.favePhoto);
    }
    
    function getFavouritePhoto(userId); {
        return getUser(userId).then(getFavouritePhotoFromUser);
    });
    
    getFavouritePhoto('pat').then(displayPhoto, function (err) {
        // show an error message
    });
    
```
    
This code has less nesting, is easier to read, and the functions can all be used
by _other_ code more easily.

Error handling has also changed a lot.  In the callback code the examples
_depended_ on a convention that programmers would have to know.  In the promise
example there is only _one_ part of code that handles errors, and it does not
involve an `if` block.


## Working With Promises

So far the examples have started with functions that already return promises.
This is great, but sometimes developers need to write functions that make
new promises.

Historically there have been many different types of promises in JavaScript.
Fortunately the third party library vendors largely standardized promise
interfaces, and promises are a native feature of the next version of JavaScript.

The examples here will use Angular 1.x's `$q` promise library.  Starting a
promise with `$q` is as simple as this:

```js

    // This is a basic/limited clone of Angular's 1.x's $timeout object
    
    function runLater(fn, delay) { 
        var newPromise = $q(function (resolve, reject) {
            // this is for demonstration purposes, in Angular 1.x use $timeout
            setTimeout(function () {
                try {
                  resolve(fn());
                } catch (err) {
                  reject(err); 
                }
            }, delay);
        });
        return newPromise;
    }
    
    // basic usage:
    runLater(function () { 
      return 5;
    }, 5000).then(function (result) {
        return result === 5; // true
    });
    
```

The above example is an incomplete clone of Angular's built in $timeout
function, along with a simple usage example.  The relevant part for creating
promises is:

```js

    var newPromise = $q(function (resolve, reject) {
    });
    
```

The `$q` object happens to also be a function.  When `$q` is used as a function
it takes a callback function as its first argument, and it returns a promise.

The callback function passed to `$q(callback)` takes two parameters, resolve,
and reject.  Both resolve, and reject are functions.  

- `resolve` takes zero or more parameters, and parameters passed to 
`resolve(p1, p2, ...)` show up in _the next_ then function.

- `reject` usually takes one parameter, typically an `Error` object, which 
shows up in _the next_ error handling function, which conveniently, can be at
the end of the promise chain

## Error Handling

Error handling in promises can be a little non-intuitive at first.  One easy
way to think about error handling in promises is this: a function passed to
a `then` method can do one of two things:

- it can return a value
- it can throw an exception

Exceptions that are thrown get _immediately_ passed to the next error handler
in the promise chain.  There is no traditional catching.  For example:

```js

function fetchFromServer(resource) {
   // returns a promise, probably from $http 
}

// This try/catch is an example of what *not* to do
try {
    fetchFromServer('friendList').
    then(function () {
        throw new Error('test error message');
    }).
    then(function (result) {
        // this will never run
        return result;
    }).
    then(function () {
        // this will never run
        return result;
    }, function (err) {
       console.log(err.message); // will output "test error message"
    });
} catch (err) {
  // this will never run
}

```

Internally the promise mechanism deals with capturing exceptions, and forwarding
them along the promise chain, _skipping_ functions that occur _later_ in the 
promise chain.

_Sometimes_ this skipping is desirable, but other times it is not.  In the rare
events where a promise chain _must_ continue, promises can be handled earlier
in the chain.


## Real world examples

With respect to client side JavaScript programming, promises can really make a
big difference with network requests. In many cases network requests can end up
depending on results from _previous_ network requests, and traditional callback
models make this complex to deal with.

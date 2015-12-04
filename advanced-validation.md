# Advanced Validation

## Providing Custom Validation

The built-in AngularJS form validators are simple and powerful. But what if you need more complex validation?

You can always build your own validator by creating a directive.

```js
//
// Use this in your templates like so
// <input type="text" custom-validator ng-model="myModel" />
//
ngModule.directive('customValidator', function() {
  require : 'ngModel',
  link : function(scope, element, attrs, ngModel) {
    ngModel.$validators.myValidator = function() { ... }
  }
});
```


### Example
🔗 [codepen.io/winkerVSbecks/pen/rOgvYN](http://codepen.io/winkerVSbecks/pen/rOgvYN?editors=101)

The following example creates a custom validator for an input field which accepts comma seperated values. It ensures that the user has provided the data in the correct format and that the values provided are acceptable or not.

```js
angular.module('formApp', [])
  .directive('validateToppings', function() {
    return  {
      restrict: 'A',
      require: 'ngModel',
      scope: {},
      link: (scope, element, attrs, ctrl) => {

        const acceptableToppings = ['tomato', 'basil', 'garlic', 'eggplant',
                                    'onion', 'salami', 'prosciutto'];

        ctrl.$validators.toppings = function(value) {
          if (!value) {
            return true;
          } else {

            var toppings = value.split(' ');

            return toppings.reduce(function(result, topping) {
              return _.includes(acceptableToppings, topping.toLowerCase());
            }, false);

          }
        };

      }
    };
  });
```

This directive introduces a new concept: `require`.  Here, we are telling
angular that this directive uses functionality from the built-in `ngModel`
directive. This gives us access to `ngModelController` as the `ctrl`
parameter to our link function.

We can use this parameter to add to ngModel's list of `$validators` for any
HTML element we use this directive on.

You can now use it just like any other built in validator.

```html
<input type="text"
  ng-model="ctrl.toppings"
  name="toppings"
  validate-toppings
  required>
```


### Working Session

Create a custom password validator that accepts an array of RegEx patterns and ensures that the entered password satisfies al

Example of the patterns that can be provided:

```js
vm.REQUIRED_PATTERNS = [
  /\d+/,    //numeric values
  /[a-z]+/, //lowercase values
  /[A-Z]+/, //uppercase values
  /\W+/,    //special characters
  /^\S+$/   //no whitespace allowed
];
```

And you should be able to use validator like so:

```html
<input type="password"
  name="password"
  ng-model="ctrl.password"
  validate-toppings="ctrl.REQUIRED_PATTERNS"
  required>
```

🔗 **Solution:** [codepen.io/winkerVSbecks/pen/VvJvEw](http://codepen.io/winkerVSbecks/pen/VvJvEw/?editors=001)


## Async Validators

There might be scenarios where the validation check needs to happen asynchronously, for example: server side validation. In that case we can use the `$asyncValidators` pipeline.

`$asyncValidators` expects the validation check to return a promise. When the promise resolves itself then the validation is successful and if it is rejected then a validation error is registered.

```js
ngModule.directive('myAsyncValidator', function($http) {
  return {
    require : 'ngModel',
    link : function(scope, element, attrs, ctrl) {
      ctrl.$asyncValidators.usernameAvailable = function(value) {
        return $http.get('/api/validation-test?q='+ value);
      };
    }
  }
})
```

Remember that the asynchronous validations will only run after all the normal validators have passed. This prevents you from making excessive API calls.

🔗 [codepen.io/winkerVSbecks/pen/PPrZNj](http://codepen.io/winkerVSbecks/pen/PPrZNj?editors=001)
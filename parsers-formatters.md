# Parsers & Formatters

In AngularJS 1.3+ parsers & formatters are not meant to handle any validation logic.

Before we go ahead let us take a moment to discuss the difference between the model value and view value. The model value is what gets applied to the model in scope and the view value is what the user sees in the DOM input element. For example, consider the following:

```html
<!-- myDate = 1288323623006 -->
{{ myDate | date:'medium' }}
<!-- Renders as: Oct 28, 2010 11:40:23 PM -->
```

Here the model value is `1288323623006` but, the view value is `Oct 28, 2010 11:40:23 PM`.

🔗 [codepen.io/winkerVSbecks/pen/KdjzaK](http://codepen.io/winkerVSbecks/pen/KdjzaK?editors=001)


## Parsers

Parsers are used to convert the view value into a different model value.

```js
var DATE_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/;

// Grab ngModel inside of a directive
ngModel.$parsers.push(function(value) {
  if (value == '' || value == null || value == undefined) {
    // null means that there is no value which is fine
    return null;
  }

  if (DATE_REGEXP.test(value)) {
    return parseDateFromString(value);
  }

  // undefined means that the date syntax is invalid and
  // this will cause a parse error during validation
  return undefined;
});
```


## Formatters

Formatters are used for converting the model value into the appropriate view value.

```js
//grab ngModel inside of a directive
ngModel.$formatters.push(function(value) {
  if(angular.isDate(value)) {
    value = $filter('date')(value, ['yyyy', 'MM', 'dd']);
  }
  return value;
});
```


## Working Session

Create a directive which both parses and formats the value of `ngModel`. The user should be able to:

1. Enter in a string of comma separated values, and the model will be an actual array of values.

2. Conversely, if you set the model to an array then the input should appear as a string of comma separated values.

🔗 **Solution:** [codepen.io/winkerVSbecks/pen/QjXEjK](http://codepen.io/winkerVSbecks/pen/QjXEjK?editors=101)

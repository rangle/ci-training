# Building Advanced Directives

1. Directives are a lot more useful when using their own scope. This provides stronger encapsulation and makes the directive a self-contained component that can be used in different parts of your application.

2. Avoid using `Compile` and `Link` functions:

  - There are very few scenarios where you actually need to use a link function. For eg: building custom validation for `ngModel`.
  - These will be deprecated in Angular 2.

3. Use a directive controller with `controllerAs` this makes testing much easier and provides a more straightforward path to transition to Angular 2.

4. Use `bindToController` so that you do no have to rely on `$watch` or `$observe`. For more info see: http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html

5. Directive skeleton and Demo 🔗: [codepen.io/winkerVSbecks/pen/NqzXmw?editors=001](http://codepen.io/winkerVSbecks/pen/NqzXmw?editors=001)

  ```js
  angular.module('myModule', [])
  .directive('someDirective', function () {
    return {
      scope: {},
      bindToController: {
        someObject: '=',
        someString: '@',
        someExpr: '&'
      },
      require: 'ngModel',
      controller: function ($element, $attrs, $transclude) {
        var vm = this;
        vm.name = 'Pascal';
      },
      controllerAs: 'ctrl',
      link: function(scope, element, attrs, ctrl) {
        // you can access the required controller here
      },
      template: '<div>{{ctrl.name}}</div>'
    };
  });
  ```

6. **Note:** the controller does not have to be in-line here. We generally move the controller to a separate file. For example:

  ```js
  angular.module('myModule', [])
  .controller('SomeDirectiveCtrl', function ($element, $attrs, $transclude) {
    var vm = this;
    vm.name = 'Pascal';
  });

  angular.module('myModule', [])
  .directive('someDirective', function () {
    return {
      scope: {},
      bindToController: {
        someObject: '=',
        someString: '@',
        someExpr: '&'
      },
      require: 'ngModel',
      controller: 'SomeDirectiveCtrl'
      controllerAs: 'ctrl',
      link: function(scope, element, attrs, ctrl) {
        // you can access the required controller here
      },
      template: '<div>{{ctrl.name}}</div>'
    };
  });
  ```

7. Use `$templatCache` instead of in-lining templates:
  - Provides the same benefits as in-line templates but, easier to maintain.
  - You can automate this using [gulp-ng-html2js](https://www.npmjs.com/package/gulp-ng-html2js).

8. Break into small nested directives. This is the approach that Angular 2 is moving towards – with the component based architecture.


## Nested Directives Working Session

Create a modal directive which accepts one attribute `isOpen`. This attribute controls whether the modal is open or closed. Additionally you should be able to place content within the `<modal>` tags which will then be transcluded to the appropriate section within the modal template. For example:

```html
<modal is-open="main.isModelOpen">
  <p>Bacon ipsum dolor sit amet chuck prosciutto landjaeger ham hock filet mignon shoulder hamburger pig venison.</p>
</modal>
```

🔗 **Solution:** [codepen.io/winkerVSbecks/pen/meZgeE](http://codepen.io/winkerVSbecks/pen/meZgeE?editors=100)

## Directives With ngModel
🔗 [codepen.io/winkerVSbecks/pen/bVPJra](http://codepen.io/winkerVSbecks/pen/bVPJra?editors=001)

> When `$setViewValue` is called, the new value will be staged for committing through the `$parsers` and `$validators` pipelines. If there are no special `ngModelOptions` specified then the staged value sent directly for processing, finally to be applied to `$modelValue` and then the expression specified in the ng-model attribute. Lastly, all the registered change listeners, in the $viewChangeListeners list, are called.

The benefits of using `ngModelController` is that you can rely on `$parsers` and `$validators` pipelines, and `ngModelOptions`.

### Require:

- Without the `^` prefix, the directive would look for the controller on just its own element.
- `?` makes the controller optional. Therefore, it will not throw an error if the required controller does not exist.
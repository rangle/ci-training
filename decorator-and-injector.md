## Decorator

The `$provide.decorator` allows you to modify or even overwrite directives/services available in your app.

```js
angular.module('myApp',[])
  .config(function($provide) {
    $provide.decorator('somethingIWantToChange', ['$delegate', function ($delegate) {
      // make my changes to $delegate, or replace entirely
    }]);
  });
```

A good use case is when you need to make minor *tweaks* to a third-party library without having to maintain a custom fork of it. For example:

```js
$provide.decorator('someDirective', function($delegate) {
  var directive = $delegate[0];
  var originalLink = directive.link;

  var newLink = function($scope, $element, $attrs, ctrl) {

    // Insert your custom code here
    ...

    // Execute the original link function
    originalLink.apply(this, arguments);
    return
  }

  // Since this has already been built via directive provider
  // need to put this on compile, not link, property
  directive.compile = function () {
    return newLink
  }

  return $delegate;
});
```

🔗 [codepen.io/winkerVSbecks/pen/Oyexzq](http://codepen.io/winkerVSbecks/pen/Oyexzq?editors=001)


## Injector

Injector is the underlying mechanism for dependency injection in AngularJS. Each app has only one injector. When you create a factory, service, directive, etc. these items register themselves with the injector. And the injector is then responsible for looking up, instantiating and returning the instantiated objects when you inject these items into a controller/service.

Normally you do not need to interact with it directly. So, please avoid using it! If for some reason you *really* needed to dynamically inject a service into a controller, you do it like so:

```js
function MyCtrl($injector) {
  var myService = $injector.get('myService')
}
```

Remember, don't call `angular.injector()` – this creates a new injector. Simply inject the `$injector` service.
# Security

## AngularJS and XSRF/CSRF (Cross-Site Request Forgery)

Once the user is authenticated, you will need to either issue them an authentication token or a cookie. Tokens are vastly preferred.

Cookies are easier to steal and are hard to use in a multi-server setup. Tokens solve both of those problems. They can also be used with a completely stateless server architecture.

To avoid this our standard solution is JWT-style bearer tokens. However, if you must use cookies make sure your app is safe against [cross-site request forgery (CSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

Angular provides a solution for this via the use of `X-XSRF-TOKEN` header. For the setup on the AngularJS side:

1. First include [angular-cookies.js](https://docs.angularjs.org/api/ngCookies) in your HTML.
2. Load the `ngCookies` module in your application.

  ```js
  angular.module('myApp',[
    'ngCookies'
  ])
  ```

3. Then the AngularJS `$http` service will do these things automatically:

  + Look for a cookie named `XSRF-TOKEN` on the current domain.
  + If that cookie is found, it reads the value and adds it to the request as the `X-XSRF-TOKEN` header.

4. However, in order for this to work this needs to be supported on the server. You will need to do the following parts:

  + When the user logs in, create the `CSRF` token. Then send it on the login response as the `XSRF-TOKEN` cookie.

  + Assert that all incoming requests to your API have the `X-XSRF-TOKEN` header and that it is the one associated with this user's session.

## $sanitize & $sce

You can use the `$sce` service to render model data as HTML. `$sce` is the Strict Contextual Escaping service i.e., it wraps an HTML string with an object that tells Angular that the HTML is trusted and good to render anywhere.

> The strict contextual escaping mode (available by default in Angular version 1.2 and higher) tells your app that it requires bindings in certain contexts to result in a value that is marked as safe for use inside the context.

from [ng-book: Security](https://www.ng-book.com/p/Security)

This allows you to restrict content by the following types:
- `$sce.HTML`
- `$sce.CSS`
- `$sce.URL`
- `$sce.RESOURCE_URL`
- `$sce.JS`

Remember, `$sce` doesn't get rid of the need for `ng-bind-html`. It simply generates an object which can be consumed by `ng-bind-html`.


`$sanitize` on the other hand sanitizes an HTML string by stripping all potentially dangerous tokens. Once you include the `ngSanitize` module in your app, the `ng-bind-html` directive automatically uses `$sanitize`.

🔗 [codepen.io/winkerVSbecks/pen/BoXWKW](http://codepen.io/winkerVSbecks/pen/BoXWKW?editors=101)


Using Angular 1.4/1.5

- [ ] Caching
  + local/session
  + conditional
  + caching for POSTs
  + expiration of caches

- [x] Advanced validation (link/compile) $compile/$parse **WORKSHOP**

- [ ] Localization/Internationalization
  + English/French
  + Number formats
  + Dynamic vs page-reload

- [ ] `ng-options` vs `ng-repeat`. ex: 2 dropdowns, same lists, selection in 1 greys out some item in 2.

- [ ] Promises (catch-release-errors)
  + *Covered this already, any specific questions?*
  + Rehash it a bit more.
  + More advanced real life examples
  + eg: cascading dropdowns

- [x] When would you use $injector, $decorator

- [ ] Error management handling (app, user, http-level errors)
  + How to handle all different kinds of errors?
  + Can you handle them in the same way or are they handled differenlty?
  + Can you handle them in a unified way?

- [ ] Advanced example for directives **WORKSHOP**
  + Nested directives
  + <custom-directive ng-model="..."> Example VS <div custom-directive ng-model>
    + ngModel wasn't available when E but, was available when A.
    + When to use E and when to use A
  + Require attribute `^` & `?`
  + More hands on stuff (exercises)
  + More realistic examples of parent child/sibling directives.

- [ ] `angular.extend` vs `angular.copy`
  + use in example

- [ ] Example of applying multiple filters on a grid through service filter
  + *Need the specific scenario you are trying to tackle here*

- [ ] Nested views/advanced layouts (ui.router)
  + *They will provide some layout examples*
  - Portfolio series is the simplest
  - multiple route and multiple views
  - skeleton code

- [ ] Interceptors and when to use them
  + Multiple parts of the application have their own interceptor. Eg: 400 level: Auth part has it's own interceptor.
  + It's related to error management.

- [ ] [$sanitize](https://docs.angularjs.org/api/ngSanitize/service/$sanitize)
- [ ] [$sce](https://docs.angularjs.org/api/ng/service/$sce)
- [ ] CSFP: Cross site forgery protection



- [ ] From 0 to 100 project example (PS)
  + [ci.com/portfolioseries/app](http://ci.com/portfolioseries/app)
  + What would it take to rebuild it in Angular?
  + What is the thought process?
  + How do you setup a skeleton code?
  + What problems and roadblocks need to be taken into account?
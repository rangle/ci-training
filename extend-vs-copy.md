# Angular Extend vs Copy

🔗 [codepen.io/winkerVSbecks/pen/bVPaaM](http://codepen.io/winkerVSbecks/pen/bVPaaM?editors=001)

## angular.copy

Creates a deep copy of the source. It does not mutate the source.


## angular.extend

Extends the target object by copying properties from the source object to the target. It mutates the target object.

```js
angular.extend(object, object1)
// target: object
// source: object1
```

You can avoid mutation by passing an empty object as the target:

```js
var object = angular.extend({}, object1)
// destination: object
// target: {}
// source: object1
```

You can specify also specify multiple source objects.

```js
var object = angular.extend({}, object1, …)
```


## angular.merge

`angular.extend` does not support recursive merge (deep copy). We can use `angular.merge` for this instead.

```js
var object = angular.merge({}, object1, object2, object3, …)
```



While AngularJS provides these methods, you should consider using a third party utility library. They generally provide a lot more functionality, keeps code consistent and there is a good chance your project already depends on one of those. Here are some options:

🔗 [ramda](http://ramdajs.com/docs)
🔗 [lodash](https://lodash.com/docs)
🔗 [underscore](http://underscorejs.org)

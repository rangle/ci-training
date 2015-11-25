# Caching

This will enable caching of the GET request using the default `$http` cache.

```js
$http.get('/foo/bar/' + id, {
  cache: true
});
```

This provides very basic caching. `$http` cache has no built in mechanism for expiration.


## $cacheFactory

The `cache` property accepts two values: a boolean & or an instance of `$cacheFactory`.

`$cacheFactory` is an AngularJS service that constructs cache objects which can then be consumed by `$http`. Therefore, to enable caching we do the following:

```js
var myCache = $cacheFactory('url', { capacity: 10 });

$http.get(url, {
  cache: myCache
});
```

Now, in order to expire this cache we can use the `remove` method.

```js
// To remove the url that is cached
$timeout(function() {
  myCache.remove(url);
}, 1000);
```


## Cache Service

There is a good chance that you will have to do this for multiple end-points and might require other features such as conditional caching. Therefore, you should consider writing a generic & reusable caching service. For example:

🔗 [nibelu-ng](https://github.com/rangle/nibelu-ng) only $http
🔗 [nibelung](https://github.com/rangle/nibelung) more generic

In this case, Nibelung is a framework agnostic caching library that provides `'localStorage` &/or `sessionStorage` caching. You can create a new cache – called Hoard – like so:

```js
var myCache = new nibelung.Hoard({
  namespace: 'fooCache',
  persistent: true,
  maxRecords: 100,
  ttlMilliseconds: 3600000
});
```


Nibelu-ng on the other hand is an AngularJS wrapper for Nibelung. The wrapper provides a factory called `HttpHoard`. It provides an `$http` compatible cache backed by `nibelung.Hoard`, which allows you to specify TTLs, persistence, and other goodies for your $http calls.

```js
.service('yourService', function (HttpHoard) {
  var tenSecondCache = new HttpHoard({
    namespace: 'httpCache',
    ttlMilliseconds: 10000 // Cache records will expire 10 seconds after completion.
  });

  function getStuffWithTenSecondCache(url) {
    return $http.get('foo/bar', {
      cache: tenSecondCache
    });
  }

  return {
    getStuffWithTenSecondCache: getStuffWithTenSecondCache
  };
});
```

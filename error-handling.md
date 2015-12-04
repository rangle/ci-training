# Error Handling

Often interceptors are used to handle HTTP level errors. However, in large applications it makes debugging harder. This is because they introduce a different paradigm.

A more unified approach would be to create a wrapper service for `$http`. This way you rely only on promises and can handle errors using the catch-and-release technique.

The error can then be propagated up to other service and the view-controllers. At the view level it can they be used to display an alert to the user.


## $http Wrapper

```js
var HTTP_TIMEOUT = 3000;
var AUTH_FAILURE_RESPONSES = [400, 401];

function Server(networkService, authService, $q) {

  var baseConfig = { timeout: HTTP_TIMEOUT };
  var getConfig = R.partial(R.merge, baseConfig);

  function handleSuccess(response) {
    // Network is available, set the state as online
    networkService.setOnline();
    return response.data;
  }

  function handleFailure(response) {
    const status = response.status;

    if (R.contains(status, AUTH_FAILURE_RESPONSES)) {
      authService.logout();
    } else {
      // Can't reach the API, switch the app to offline mode
      networkService.setOffline();
    }

    return $q.reject(response.data);
  }


  var service = {};

  service.get = function(path, config) {
    return $http
      .get(API_BASE_URL + path, getConfig(config))
      .then((response) => handleSuccess(response))
      .then({}, (response) => handleFailure(response));
  }

  service.post = function(path, data, config) {
    return $http
      .post(API_BASE_URL + path, data, getConfig(config))
      .then((response) => handleSuccess(response))
      .then({}, (response) => handleFailure(response));
  }

  service.put = function(path, data, config) {
    return $http
      .put(API_BASE_URL + path, data, getConfig(config))
      .then((response) => handleSuccess(response))
      .then({}, (response) => handleFailure(response));
  }

  return service;

}
```

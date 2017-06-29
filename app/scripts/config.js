app.config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType('localStorage');
    localStorageServiceProvider.setPrefix('shopit');
});

app.config(function (RestangularProvider, ENVConstant, APIConstants) {
  RestangularProvider.setBaseUrl(APIConstants['API_BASE_URL_' + ENVConstant]);
  RestangularProvider.setDefaultHttpFields({withCredentials: true});
});
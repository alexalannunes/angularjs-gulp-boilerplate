// routes
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home/home.html",
      controller: "homeCtrl",
    })
    .when("/profile", {
      templateUrl: "pages/profile/profile.html",
      controller: "profileCtrl",
    });
});

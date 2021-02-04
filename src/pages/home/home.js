const homeModule = angular.module("app");
homeModule.filter("b64", function () {
  return function (string) {
    return btoa(string);
  };
});
homeModule.controller("homeCtrl", function ($scope) {
  $scope.value = "";
  $scope.values = [];
  $scope.add = function () {
    $scope.value && $scope.values.push($scope.value);
    $scope.value = "";
  };
});

// Import stylesheets
import './index.css';

var router_refresh_delay = 1000;

(function(angular) {
  'use strict';
  window['ngRouteExample'] = angular.module('ngRouteExample', ['ngRoute']);
  var app = window['ngRouteExample'];

  app.controller(
    'MainController', 
    function($scope, $route, $routeParams, $location) 
    {
      $scope.$route = $route;
      $scope.$location = $location;
      $scope.$routeParams = $routeParams;
    }
  ); 

  app.controller(
    'BookController', 
    function($scope, $routeParams) 
    {
      $scope.name = 'BookController';
      $scope.params = $routeParams;
    }
  );

  app.controller(
    'ChapterController', 
    function($scope, $routeParams) 
    {
      $scope.name = 'ChapterController';
      $scope.params = $routeParams;
    }
  );

  app.config(function($routeProvider, $locationProvider) 
  {
    $routeProvider.when('/Book/:bookId', 
    {
      templateUrl: 'book.html',
      controller: 'BookController',
      resolve: {

        delay: function($q, $timeout) 
        {
          var delay = $q.defer();
          $timeout(delay.resolve, router_refresh_delay);
          return delay.promise;
        }
      }
    });

    $routeProvider.when('/Book/:bookId/ch/:chapterId', 
    {
      templateUrl: 'chapter.html',
      controller: 'ChapterController'
    });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  });



})(window['angular']);
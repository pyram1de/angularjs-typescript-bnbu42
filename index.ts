// Import stylesheets
import './index.css';
import * as Rx from 'rxjs';

var router_refresh_delay = 1000;
  
(function(angular, window) {
  'use strict';
  window['ngapp'] = angular.module('ngapp', []);
  var app = window['ngapp'];

  app.controller(
    'MainController', 
    function($scope, $location, $timeout) 
    {
      $scope.$location = $location;
      $scope.dave = "nothing";
      console.log('main controller');

      let rxSub: Rx.Subject<string> = new Rx.Subject<string>();

      let subscription = rxSub.subscribe(result => {
        $scope.dave = result;
        console.log('result: ', result);
        
        if(!$scope.$$phase) {
          $scope.$apply();
          $scope.$digest();
        }
      });

      rxSub.next('hello dave');

      $timeout(() => {
        rxSub.next('here i am again');
      }, 5000);

      // emulate calls outside of the angular framework
      window.setTimeout(() => {
          console.log('hahaha', 'got ya');
          rxSub.next('should not hit this');
      }, 10000);

    }
  ); 


  app.config(function($locationProvider) 
  {
    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
  });

console.log('hello');
console.log('Rx', Rx);


})(window['angular'], window);
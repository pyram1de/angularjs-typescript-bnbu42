// Import stylesheets
import './index.css';
import * as Rx from 'rxjs';
import { debounce } from 'rxjs/operators';
import { AwObservable } from './awObservable.ts';

var router_refresh_delay = 1000;
  
(function(angular) {
  'use strict';
  window['ngapp'] = angular.module('ngapp', []);
  var app = window['ngapp'];

  app.controller(
    'MainController', 
    function($scope, $timeout) 
    {
      let textBoxChanges: Rx.Subject<string> = new Rx.Subject<string>();
      let awtextBoxChanges = new AwObservable();
      //console.log();
      awtextBoxChanges = awtextBoxChanges.AwObservable()

      $scope.dave = "nothing";
      $scope.modelChange = () => {
        textBoxChanges.next($scope.textInput);
        awtextBoxChanges.next($scope.textInput);
      };


      let changes = textBoxChanges.asObservable();

      changes
        .pipe(debounce(() => Rx.timer(2500)))
        .subscribe((result) => {
          $scope.status = "searching: " + result;
           if(!$scope.$$phase) {
            $scope.$apply();
            $scope.$digest();
          }
        });

      awtextBoxChanges.subscribe((data) => {
        $scope.awstatus = data;
      });



      console.log('main controller');

      let rxSub: Rx.Subject<string> = new Rx.Subject<string>();

      let subscription = rxSub.subscribe(result => {
        $scope.dave = result;
        console.log('result: ', result);
        
        if(!$scope.$$phase) {
          $scope.$apply();
          $scope.$digest();
        }
      }, () => {
        console.log('err');
      }, () => {
        console.log("all done");
        $scope.dave = "COMPLETE";
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

      window.setTimeout(() => {
        console.log('going to complete now');
        rxSub.complete();
      }, 11000);

    }
  ); 

})(window['angular']);
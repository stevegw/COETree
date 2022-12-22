if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
  module.exports = 'treecoe-ng';
}

(function () {
  'use strict';

  var treecoeModule = angular.module('treecoe-ng', []);
  treecoeModule.directive('ngTreecoe', ['$timeout', '$interval', '$http', '$window', '$injector', ngTreecoe]);

  function ngTreecoe($timeout, $interval, $http, $window, $injector) {

    return {
      restrict: 'EA',
      scope: {
        incomingdataField : '=',
        modelnameField : '@',
        metadataField : '@',
        widthField : '@',
        heightField : '@',
        outjsonField: '=',
        delegateField: '='
      },
      template: '<div></div>',
      link: function (scope, element, attr) {

        var lastUpdated = 'unknown';
        scope.data = { name: undefined, 
                   disabled: false, 
                        outjson: undefined,
                        incomingdata: undefined 
                     };

        scope.renderer = $window.cordova ? vuforia : $injector.get('threeJsTmlRenderer');
                     
        var executeTree = function() {
          console.log('do the custom activities here');
          if (!scope.data.disabled) {
            let tree = new Tree(scope,scope.incomingdataField , scope.widthField, scope.heightField , scope.renderer , scope.modelnameField );

          } else {
            console.log('disabled');

          }
        };
        var start = function() {
          console.log('Starting');
          scope.data.disabled = false;
          scope.$parent.fireEvent('started');
          executeTree();
        }

        scope.$watch('incomingdataField', function () {
          console.log('dataField='+ scope.incomingdataField);

          if (scope.incomingdataField != undefined && scope.incomingdataField != '') {
            scope.data.incomingdata = scope.incomingdataField;

            //start();
          }

        });

        scope.$watch('outjsonField', function () {
          console.log('outjsonField='+ scope.outjsonField);

          if (scope.outjsonField != undefined && scope.outjsonField != '') {
            scope.data.outjson = scope.outjsonField;

          }

        });

        scope.$watch('delegateField', function (delegate) {
          if (delegate) {
            delegate.start = function () { 
              start(); 
            };
          }
        });



        // Use this initially to see if your extension get deployed
        // If you don't see this message its not deployed
        // Comment out once you have it working
        // scope.$watch( function() {
        //   console.log("treeCOE Any watch "); 
        // });
      }
    };
  }

}());

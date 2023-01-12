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
        propertynameField : '@',
        jsonarrayidentifierField : '@',
        treeelementpropertynameField : '@',
        uniquenesspropertynameField : '@',
        hilitemodelField : '@',
        modelnameField : '@',
        widthField : '@',
        heightField : '@',
        topoffsetField : '@',
        leftoffsetField : '@',
        selectedvalueField : '=',
        delegateField: '='
      },
      template: '<div></div>',
      link: function (scope, element, attr) {

        var lastUpdated = 'unknown';
        var tree = undefined ;
        scope.data = { name: undefined, 
                   disabled: false, 
                        outjson: undefined,
                        incomingdata: undefined 
                     };

        scope.renderer = $window.cordova ? vuforia : $injector.get('threeJsTmlRenderer');
                     
        var executeTree = function() {
          console.log('do the custom activities here');
          if (!scope.data.disabled) {
            tree = new TreeCOE(scope,scope.incomingdataField , scope.widthField, scope.heightField , scope.topoffsetField, scope.leftoffsetField, scope.renderer , scope.modelnameField , scope.propertynameField, scope.hilitemodelField , scope.jsonarrayidentifierField , scope.treeelementpropertynameField , scope.uniquenesspropertynameField);
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

          }

        });

        scope.$watch('selectedvalueField', function () {
          console.log('selectedvalueField='+ scope.selectedvalueField);
          if (tree != undefined) {

            tree.customUI.setElementInTree(scope.selectedvalueField);
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

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
        autolaunchField: '@',
        incomingdataField : '=',
        displaypropertynameField : '@',
        uniquenesspropertynameField : '@',
        metadatauniquenessField : '@',
        modelnameField : '@',
        hilitemodelField : '@',
        widthField : '@',
        heightField : '@',
        topoffsetField : '@',
        leftoffsetField : '@',
        selectedvalueField : '=',
        treefrommodelmetadataField: '=',
        checkeditemsField: '=',
        delegateField: '='
      },
      template: '<div></div>',
      link: function (scope, element, attr) {

        var lastUpdated = 'unknown';
        let tree = undefined ;
        scope.data = { name: undefined, 
                   disabled: false, 
                        outjson: undefined,
                        incomingdata: undefined,
                        tree : undefined
                     };

        scope.renderer = $window.cordova ? vuforia : $injector.get('threeJsTmlRenderer');
                     
        var executeTree = function() {
          console.log('do the custom activities here');
          if (scope.data.tree != undefined) {
            try {
              scope.data.customUI.close();
            }catch(ex) {
                // ignore
            }
          }
          if (!scope.data.disabled) {
            scope.data.tree = new TreeCOE(scope,scope.incomingdataField , scope.widthField, scope.heightField , scope.topoffsetField, scope.leftoffsetField, scope.renderer , scope.modelnameField , scope.displaypropertynameField,  scope.uniquenesspropertynameField , scope.metadatauniquenessField , scope.hilitemodelField );
            console.log('New Tree Created');
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
        var stop = function() {
          console.log('Stopping');
          scope.$parent.fireEvent('stopped');
          if (scope.data.tree != undefined) {
            scope.data.tree.customUI.close();
          }
        }


        scope.$watch('incomingdataField', function () {
          console.log('dataField='+ scope.incomingdataField);

          if (scope.incomingdataField != undefined && scope.incomingdataField != '') {
            scope.data.incomingdata = scope.incomingdataField;
            if (scope.autolaunchField == "true") {
              start();
            }


          }

        });

        scope.$watch('selectedvalueField', function () {
          
          if (scope.data.tree != undefined &&  scope.selectedvalueField.length > 0 ) {
            console.log('selectedvalueField='+ JSON.stringify(scope.selectedvalueField));
            scope.data.tree.customUI.setElementInTree(scope.selectedvalueField);
          }

        });

        scope.$watch('treefrommodelmetadataField', function () {
          console.log('treefrommodelmetadataField='+ scope.treefrommodelmetadataField);

        });

        scope.$watch('delegateField', function (delegate) {
          if (delegate) {
            delegate.start = function () { 
              start(); 
            };
            delegate.stop = function () { 
              stop(); 
            };
            delegate.dataviamodeldata = function () { 

             let metadata = new Metadata(scope ,  scope.renderer, scope.modelnameField , scope.displaypropertynameField , scope.uniquenesspropertynameField , scope.metadatauniquenessField);
             metadata.getTreeFromModelMetaData();
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

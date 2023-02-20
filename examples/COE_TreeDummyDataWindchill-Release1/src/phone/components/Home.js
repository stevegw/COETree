// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available
console.log($scope.app);
let jsonData;
let jsonFile = "app/resources/Uploaded/Ender3ProVR_wt_part_WTPart_6200013.json";
// ************************************************************************************
// Local functions
// ************************************************************************************
gotJSON = function(data){
  console.log ("gotJSON: Working on Data >>>"+ data);
  postQuickMessage("Retrieving Data from resoure File");
  jsonData= JSON.parse(data);

}
//This reads a resource file.  When the reading is done
//the process is passed off to the "gotJSON" function
doRead = function(jsonFile){
  //
  // Beware fetch as an asynchronous process
  // So when using in a flow of Javascript the fetch will start
  // and will finish at indeterminate time
  // Any code following the fetch call will start and not wait for fetch
  //
  fetch(jsonFile)
    .then(response => response.text())
    .then(data => gotJSON(data))
    .then( 
    $timeout(function() {
      // do something i.e start another service 
      $scope.view.wdg["treeCoe-1"].incomingdata =  jsonData;
/*      $timeout(function() {
        // do something i.e start another service 
        twx.app.fn.triggerWidgetService("treeCoe-1", 'start') // $scope.view.view["treeCoe-1"].svc.start;
      }
               , 1000)*/
    }
             , 1000)
  )
}
postQuickMessage = function (message) {
  twx.app.fn.addSnackbarMessage(message);
}



// ************************************************************************************
// Studio exposed functions
// ************************************************************************************
$scope.SetTreeData = function (json)   {
  doRead(jsonFile);
}
// This is test function
// To show how to have a different propery name (default is Part Name)  and a josn array identifier (defaults is Components)
// Running this function 











































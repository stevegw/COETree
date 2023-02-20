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
      $timeout(function() {
        // do something i.e start another service 
        twx.app.fn.triggerWidgetService("treeCoe-1", 'start') // $scope.view.view["treeCoe-1"].svc.start;
      }
               , 1000)
    }
             , 1000)
  )
}
postQuickMessage = function (message) {
  twx.app.fn.addSnackbarMessage(message);
}






buildArray = function (JSONData) {
  
  let jsondata = JSON.parse(JSON.stringify(JSONData)); // create a new object else we would be reassigning the core metadata

  let result = '';
  // JSONData = me.Get_Metadata({FilterProperties: true}); // get the maximum depth of the tree
  var depthIndex = 1;
  for (var entry in jsondata) {
    jsondata[entry]['Part ID Path'] = entry;
    jsondata[entry]['Components'] = [];
    jsondata[entry]['PartName'] = jsondata[entry]['__PV_SystemProperties']['Part Name'];
    
    if (Number(jsondata[entry]['__PV_SystemProperties']['Part Depth'])>depthIndex)
      depthIndex = Number(jsondata[entry]['__PV_SystemProperties']['Part Depth']);
  } var depthList = {}; // list to sort all items by level
  for (var d=1;d<=depthIndex;d++) {
    depthList[d] = {};
  }


  for (entry in jsondata)
    depthList[Number(jsondata[entry]['__PV_SystemProperties']['Part Depth'])][entry] = jsondata[entry]; 

  for (d=depthIndex; d>1; d--) { // go from the last level up the BOM
    var items = depthList[d]; // all items on the selected level
    for (var j in items) {
      var item = items[j]['Part ID Path'];
      var parentPath = item.substr(0,item.lastIndexOf('/')); // item's parent ID
      if (parentPath == '')
        parentPath = '/';
      var allParents = depthList[d-1]; // previous level list (parent is located there)
      for (var k in allParents)
        if (allParents[k]['Part ID Path'] == parentPath) { // parent found
          (depthList[d-1][k].Components).push(items[item]);
          break;
        }
    }
  } 
  
  return  depthList[1]["/"];


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



$scope.createTreeFromMetadata2 = function() {
  
  console.log("Using Model name=myModel");
   PTC.Metadata.fromId('myModel').then( (metadata) => {
         $scope.view.wdg["treeCoe-2"].incomingdata = buildArray(metadata.data);
   });

}














































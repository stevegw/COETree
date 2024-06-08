
let SELECTED_ITEMS = [];
class TreeCOE {

    customUI ;


    constructor( vuforiaScope, data, width , height , topoffset , leftoffset ,  renderer , modelname , displaypropertyname  ,  uniquenesspropertyname ,metadatauniqueness , hilitemodel ) {

        let metadata = new Metadata(vuforiaScope ,  renderer, modelname , displaypropertyname , uniquenesspropertyname, metadatauniqueness , hilitemodel );
        this.customUI = new CustomUI(width,height, topoffset , leftoffset ,data, metadata  );

        if (vuforiaScope.selectedvalueField != null) {
          this.customUI.setElementInTree(vuforiaScope.selectedvalueField   );
        }
    }
}

class CustomUI {

    data;
    width;
    height;
    index;
    currentEvent;
    previousSelection;
    treemap;
    treeCollapsed;
    checkedItemsMap;


    constructor(  width, height , topoffset , leftoffset , data , metadata ) {

        this.width = width;
        this.height = height;
        this.topoffset = topoffset;
        this.leftoffset = leftoffset;
        this.data = data;
        this.metadata = metadata;
        this.currentEvent = "NOSET";
        this.previousSelection = undefined;
        this.index = 0;
        this.TreePanel;
        this.ContentContainer;
        this.TreeContainer;
        this.FilterContainer;
        this.treemap = new Map();
        this.treeCollapsed = false;
        this.checkedItemsMap = new Map();

        this.buildUI();

        
    }

    buildUI = function () {

    //  let LeftPanelQueryX = 'body > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-content > twx-widget > twx-widget-content > \n' +
		// 'twx-container-content > twx-widget:nth-child(2) > twx-widget-content > div > twx-container-content > div.panel.body.undefined > div.panel.undefined.left';

    let colorImageArray = [];
    let colorArray = [];
    let hiColorIndex = 0;

    colorImageArray.push("treeCOE_hilightgreen.png");
    colorImageArray.push("treeCOE_hilightred.png");
    colorImageArray.push("treeCOE_hilightyellow.png");

    colorArray.push("rgba(0, 255, 0, 1)");
    colorArray.push("rgba(255, 0, 0, 1)");
    colorArray.push("rgba(255, 255, 0, 1)");




    let PanelQueryX = 'body > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-content > twx-widget > twx-widget-content > \n' +
		'twx-container-content > twx-widget:nth-child(2) > twx-widget-content > div > twx-container-content';

    let PanelQuery = 'body > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-content > twx-widget > twx-widget-content > \n' +
		'twx-container-content';
  
	    let PanelSelector = document.querySelector(PanelQuery); 
      let backgroundColor = "rgba(78,194,50,0.65)";

        this.UIContainer = document.createElement('div');
        this.UIContainer.id = 'ui-container';
        this.UIContainer.className = 'tree-uicontainer'; 
        this.UIContainer.style.width =  "1px";//this.width;
        this.UIContainer.style.height = "1px"; //this.height;
        this.UIContainer.style.top = this.topoffset;
        this.UIContainer.style.left = this.leftoffset;

        this.TreePanel = document.createElement('div');
        this.TreePanel.id = 'treepanel';   
        this.TreePanel.className = 'treepanel';  
        this.TreePanel.style.width = this.width;
        this.TreePanel.style.height = this.height; 
        this.TreePanel.style.top = this.topoffset;
        this.TreePanel.style.left = this.leftoffset;



        var ToolbarContainer = document.createElement('div');
        ToolbarContainer.id = 'markup-toolbar--container';  
        ToolbarContainer.className = 'tree-toolbarcontainer';
        ToolbarContainer.style.width = this.width;
        //ToolbarContainer.style.height = "50px";

        var ItemLabel = document.createElement('label');
        ItemLabel.className = 'tb-itemlabel';

        var ExpandCollapseButton = document.createElement('img');
        ExpandCollapseButton.className = 'expandbutton';
        ExpandCollapseButton.src = "extensions/images/treeCOE_expand.png";
    
        ExpandCollapseButton.addEventListener("click",  () => { 

        });


        var HilightButton = document.createElement('img');

        HilightButton.className = 'tb-highlightbutton';
        HilightButton.src = "extensions/images/treeCOE_hilightgreen.png";
        HilightButton.addEventListener("click",  () => { 
   
          hiColorIndex ++ ;

          if (hiColorIndex > 2) {
            hiColorIndex = 0 ;
          } 

          HilightButton.src = "extensions/images/"+ colorImageArray[hiColorIndex];

          this.metadata.hicolor = colorArray[hiColorIndex];


          
        });

        var CloseButton = document.createElement('img');

        CloseButton.className = 'tb-closebutton';
        CloseButton.src = "extensions/images/treeCOE_close.png";
      
    
        CloseButton.addEventListener("click",  () => { 
            this.close();
        });

        ToolbarContainer.appendChild(ItemLabel);
        if (this.metadata.hilitemodel === "true") {
          ToolbarContainer.appendChild(HilightButton);
        }
        ToolbarContainer.appendChild(CloseButton);


        this.TreeContainer = document.createElement('div');
        this.TreeContainer.id = 'tree-container'; 
        this.TreeContainer.className = 'tree-container'; 
        this.TreeContainer.style.width = this.width;//this.width+ "px";;
        this.TreeContainer.style.height = this.height ;//this.height+ "px";
        this.TreeContainer.style.top = "110px";

        this.FilterContainer = document.createElement('div');
        this.FilterContainer.id = 'filter-toolbar--container';  
        this.FilterContainer.className = 'filter-toolbarcontainer';
        this.FilterContainer.style.width = this.width;
        //this.FilterContainer.style.height = "32px";
        this.FilterContainer.style.padding = "1px";

        // Get the input element and add an event listener
        var input = document.createElement("input");
        input.id = 'search-input';
        //input.style.width = '100px';
        input.style.marginRight = '5px';
        input.className = 'filter-input';  

        input.addEventListener("input", function(evt) {
          console.log("input=" + this.value );
        });

        this.FilterContainer.appendChild(input);



        var searchButton = document.createElement('img');
        searchButton.id = 'searchButton';  
        searchButton.className = 'tb-searchbutton';
        searchButton.src = "extensions/images/treeCOE_search.png";
        searchButton.addEventListener("click",  () => { 

          var avalue = document.getElementById('search-input').value;
          console.log("search input value =" + avalue );
          var attributeElements = document.querySelectorAll("[displayvalue*='"+avalue+"' i]");
          if (attributeElements.length > 0) {

          Array.prototype.slice.call(document.querySelectorAll('li')).forEach(function (element) {
            // remove the selected class
            element.classList.remove('itemselected');
          });

            Array.prototype.slice.call(document.querySelectorAll("[open='true']")).forEach(function (element) {
              // remove the selected class
              try {
                while (element) {
                  //element = element.parentNode;
                  if (element.nodeName === "DETAILS") {
                    //element.setAttribute("open", false);
                    element.removeAttribute("open");
                    //element.scrollIntoView();

                  }
                  element = element.parentNode;
                }
              } catch (ex) {
                // ignore

              }

            });

            Array.prototype.slice.call(attributeElements).forEach(function (element) {
              // add the selected class
              element.classList.add('itemselected');

              try {
                while (element) {
                  element = element.parentNode;
                  if (element.nodeName === "DETAILS") {
                    element.setAttribute("open", true);
                  } else {
                    element.removeAttribute("open");

                  }
                }
              } catch (ex) {
                // ignore

              }
            });

            

            let searchedforMap = new Map();

            attributeElements.forEach(element => {

              let value = this.treemap.get(element.id);
              console.log("selected treeitem value=" + value); 
              searchedforMap.set(element.id, value);
              
            });

            this.metadata.checkedOccurences(searchedforMap , "searchfor") ;

          } else {


          }

        });

        this.FilterContainer.appendChild(searchButton);



        var clearsearchButton = document.createElement('img');
        clearsearchButton.id = 'searchButton';  
        clearsearchButton.className = 'tb-searchbutton';
        clearsearchButton.src = "extensions/images/treeCOE_clearsearch.png";
        clearsearchButton.addEventListener("click",  () => { 
            // find all the elements in your channel list and loop over them
            const allElements = document.querySelectorAll('li');
            allElements.forEach((element) => {
              element.classList.remove('itemselected');
            });
            this.metadata.checkedOccurences(new Map() , "searchfor") ;

        });
        this.FilterContainer.appendChild(clearsearchButton);

        var clearcheckedButton = document.createElement('img');
        clearcheckedButton.id = 'searchButton';  
        clearcheckedButton.className = 'tb-searchbutton';
        clearcheckedButton.src = "extensions/images/treeCOE_clearchecked.png";
        clearcheckedButton.addEventListener("click",  () => { 
            // find all the elements in your channel list and loop over them
            const allElements = document.querySelectorAll('li');
            allElements.forEach((element) => {
              element.classList.remove('itemselected');
            });
            this.metadata.checkedOccurences(new Map() , "searchfor") ;




            this.checkedItemsMap.forEach(function(value, key) {
             let checkedElement =  document.getElementById(key+"checkbox");
             checkedElement.checked= false;
      
            });
            this.checkedItemsMap = new Map();
            this.metadata.checkedOccurences(new Map() , "checked") ;

        });
        this.FilterContainer.appendChild(clearcheckedButton);


        // Ideas on tree creation found https://iamkate.com/code/tree-views/
        //
        // build the summary and details structure 
        var topUL = document.createElement('ul');
        //topUL.style.overflowY = "scroll";
        topUL.setAttribute("class", "tree");
        topUL.setAttribute("height", this.height);
        topUL.setAttribute("width", this.width);
        this.tagIndex = 1;
        var displayName = this.data[this.metadata.displaypropertyname] ;
        ItemLabel.innerHTML = this.truncate(displayName, 20) ;


        this.createSublist(topUL,this.data['Components'] , this.truncate(displayName, 20) ) //'Components']);
        this.TreeContainer.appendChild(topUL);

        //Append the div to the higher level div 
        this.TreePanel.appendChild(ToolbarContainer);
        this.TreePanel.appendChild(this.FilterContainer);
        this.TreePanel.appendChild(this.TreeContainer);

        this.UIContainer.appendChild(this.TreePanel); 
        
        //Append the div to the higher level div  
        PanelSelector.appendChild(this.UIContainer);




    }

    expandCollapse () {

      if (this.treeCollapsed) {
        this.TreePanel.appendChild(this.TreeContainer);
        this.TreePanel.appendChild(this.FilterContainer);
        this.treeCollapsed = false;
      } else {
        this.TreePanel.removeChild(this.TreeContainer);
        this.TreePanel.removeChild(this.FilterContainer);
        this.treeCollapsed = true;
      }
      

    }

    collapseNode (node , collapsed) {

      node.forEach((childnode) => {
        try {
          if (collapsed) {
            childnode.classList.remove("collapsetree");
          } else {
            childnode.classList.add("collapsetree");
          }
          if (childnode.hasChildNodes) {
            this.collapseNode(childnode.childNodes ,  collapsed)
          }
        } catch (ex) {

        }
      });
    }

    close () {

      while (this.UIContainer.hasChildNodes()) {
        this.UIContainer.removeChild(this.UIContainer.firstChild);
      }

      this.metadata.vuforiaScope.$parent.fireEvent('closed');
      this.metadata.vuforiaScope.$parent.$applyAsync();

    
    }

    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    truncate = function (str, length) {
      if (str.length > length) {
        return str.slice(0, length) + '...';
      } else return str;
    }
  

    createSublist = function(container , data , rootName) {

      if (this.index > 0) {

        var details = document.createElement('details');
        container.appendChild(details);
        var summary = document.createElement('summary');
        details.appendChild(summary);

      } else {

        var expandString = "&nbsp;&nbsp;"+rootName;
        var liTree = document.createElement('li');
        container.appendChild(liTree);
    
        var details = document.createElement('details');
        liTree.appendChild(details);
        var summary = document.createElement('summary');
        summary.innerHTML = expandString;
        details.appendChild(summary);


      }
        

        var ul = document.createElement('ul');
        for(var j = 0; j < data.length; j++) {

          this.index++;
          var row = data[j];
          var li = document.createElement('li');

         if (this.metadata.uniquenesspropertyname === "Auto") {
           this.tagIndex = row[this.metadata.displaypropertyname] + this.index; 
         } else if (this.metadata.uniquenesspropertyname === "Occurrence.ID")  {
          try {
            this.tagIndex =   row.Occurrence.ID; 
          } catch (error) {
            console.log("Looks like row.Occurrence.ID is null ... the Error was "+ error + " Using "+ row[this.metadata.displaypropertyname] + this.index );
            tagIndex = row[this.metadata.displaypropertyname] + this.index; 
          }

         } else  {
          this.tagIndex =   row[this.metadata.uniquenesspropertyname]; 
        } 


          let key = "treemapkey"+ this.index;
          this.treemap.set(key, this.tagIndex );

          li.setAttribute("id", key );
          li.setAttribute("displayvalue", row[this.metadata.displaypropertyname] );

          var checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.style.margin = '2px';
          checkbox.setAttribute("id", key+"checkbox" );
          li.appendChild(checkbox);

          var textNode = document.createTextNode( row[this.metadata.displaypropertyname]);

          li.appendChild(textNode);
          li.addEventListener('click',(e)=>{

         
          console.log("Event click target textContent="+ e.target.id);
          if (e.target.id != "")  {
              // e.stopPropagation();
              if (e.target.id.endsWith('checkbox') ) {
                console.log("Event checkbox target textContent="+ e.target.id);
                var value = e.target.id.replace('checkbox', '');
                  if (!this.checkedItemsMap.has(value) && e.target.checked === true ) {
                    this.checkedItemsMap.set(value, this.treemap.get(value));
                  } else if (this.checkedItemsMap.has(value) && e.target.checked === false )  {
                    this.checkedItemsMap.delete(value);
                  }
                  

                  this.metadata.checkedOccurences(this.checkedItemsMap , "checked") ;



              } else {

                let selected = e.target.lastChild.textContent;
                selected = selected.replace( /[\r\n]+/gm, "" );
                selected = selected.trim();
                this.setSelected(e);
                if (this.currentEvent != e.target.id) {
                  this.currentEvent = e.target.id;

                  let occur =  this.treemap.get(this.currentEvent);
                  this.metadata.findOccurences(occur);
                }
              }
           }
          });

          // var nodes = row.nodes;
          var nodes = row['Components'];
          if(nodes && nodes.length) {
            this.createSublist(li, nodes);
          }
          ul.appendChild(li);
        }
        details.appendChild(ul);
      };

      setSelected(e){
        // find all the elements in your channel list and loop over them
        const allElements = document.querySelectorAll('li');
        allElements.forEach((element) => {
          element.classList.remove('itemselected');
        });
        // add the selected class to the element that was clicked
        try {

            const elem = document.getElementById(e.target.id);
            console.log("setSelected id="+ e.target.id + " should be the same as elem by id="+ elem.id);

            elem.classList.add('itemselected');
            //elem.scrollIntoView();
            
        } catch (ex) {
            //
            console.log("Exception from setSelected id= "+ e.target.id + " " + ex);

        }
        

      }

      setDetailsNode (element , isOpen) {
        try {
        
          while (element) {          
            element = element.parentNode;
            if (element.nodeName === "DETAILS" ) {
              if (isOpen) {
              element.setAttribute("open", isOpen);
              } else {
                element.removeAttribute("open");
              }
            }
          }

        }  catch (ex) {
          // ignore
          // console.log("Possible issue setDetailsNode  "+ ex); 
        }

      }


      setElementInTree( array ) {

        try {

          let path = array[0].path;
          let modelName = array[0].model;
          let metadatauniqueness = this.metadata.metadatauniqueness ;
        

          PTC.Metadata.fromId(modelName).then( (metadata) => {
            let treeTag = "";
            let objectId = metadata.get(path, metadatauniqueness );
            var hiliteArray = [];
            //objectId = objectId.replace(/\//g, "_"); 
            const iterator = this.treemap.keys();
            for (const value of iterator) {
              if (objectId == this.treemap.get(value)) {
                  treeTag = value;
                  break;
                }
            }
            let queryElement = document.getElementById(treeTag);

            if (queryElement != null) {
              //find all the elements in your channel list and loop over them
              Array.prototype.slice.call(document.querySelectorAll('li')).forEach(function (element) {
                // remove the selected class
                element.classList.remove('itemselected');
              });

              try {
                if (this.previousSelection != undefined) {
                  this.setDetailsNode(this.previousSelection, false);
                }
                this.previousSelection = queryElement;
                this.setDetailsNode(queryElement, true);

              } catch (ex) {
                //ignore
                // console.log("Possible issue in getElementsStartsWith  "+ ex); 
              }
              queryElement.classList.add('itemselected');
              queryElement.scrollIntoView();

              if (this.metadata.hilitemodel === "true") {

                this.metadata.resetHighlight(this.metadata.renderer);

                hiliteArray.push(modelName + '-' + path);
                SELECTED_ITEMS.push(modelName + '-' + path);

                if (hiliteArray.length > 0) {
                  this.metadata.hilite(hiliteArray, true, this.metadata.renderer, this.metadata.hicolor);
                }

              }


            }
          });  

        } catch (ex) {
          console.log("Exception from setElementInTree " + ex);
        }
      }

      getElementsByIdStartsWith(container, selectorTag, prefix) {
        var items = [];
        var elements = document.getElementById(container).querySelectorAll(selectorTag);
        for (var i = 0; i < elements.length; i++) {
            //omitting undefined null check for brevity
            if (elements[i].textContent.includes(prefix)) {
                items.push(elements[i]);
            }
        }
        return items;
      }

      
}


class Metadata {


  constructor( vuforiaScope ,  renderer , modelName , displaypropertyname,  uniquenesspropertyname, metadatauniqueness , hilitemodel ) {

    this.vuforiaScope = vuforiaScope;
    this.renderer = renderer;
    this.modelName = modelName;
    this.displaypropertyname = displaypropertyname;
    this.uniquenesspropertyname = uniquenesspropertyname;
    this.metadatauniqueness = metadatauniqueness;
    this.hilitemodel = hilitemodel;
    this.hicolor = "rgba(0, 255, 0, 1)"; 
  

  }

  getTreeFromModelMetaData = function () {

    let mName = this.modelName;
    let vScope = this.vuforiaScope;
    let tfield = this.vuforiaScope.treefrommodelmetadataField;
 

    PTC.Metadata.fromId(mName).then((mdata) => {
  
      try {
        var arrayData = this.buildTreeDataArrayFromModelMetadata(mdata.data);
        vScope.treefrommodelmetadataField = arrayData;
        // and let everyone know
        vScope.$parent.fireEvent('clicked');
        vScope.$parent.$applyAsync();


      } catch (ex) {

        console.log('Unexpected! error : ' + ex );

      }

  })
    .catch((err) => { console.log('Metadata extraction failed with reason : ' + err); })
    .finally( () => { 
      
      console.log('Metadata done') }  );
  
  }


  buildTreeDataArrayFromModelMetadata = function (JSONData) {

      let jsondata = JSON.parse(JSON.stringify(JSONData)); // create a new object else we would be reassigning the core metadata

      let result = '';

      var depthIndex = 1;
      for (var entry in jsondata) {
        jsondata[entry][this.metadatauniqueness] = entry;
        try {
          
        } catch (error) {
          console.log("Error setting metadatauniqueness using Part ID Path error= " + error);
          jsondata[entry]['Part ID Path'] = entry;
        }
        try {
          jsondata[entry][this.displaypropertyname] = jsondata[entry]['__PV_SystemProperties'][this.displaypropertyname];
          //
        } catch (error) {
          console.log("Error setting displaypropertyname using PartName = " + error);
          jsondata[entry]['PartName'] = jsondata[entry]['__PV_SystemProperties']['Part Name'];
        }
        jsondata[entry]['Components'] = [];



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


  checkedOccurences = function (checkedItemsMap , selectionType) {
    console.log("Using Model name:"+this.modelName + " getting Checked occurences ");

    let mu = this.metadatauniqueness;
    let mn = this.modelName;
    let vs = this.vuforiaScope;

    if (mu === "Part ID Path") {

      let checkArry = [];
      checkedItemsMap.forEach(function(value, key) {
        let pathObj = { model:mn, path:value}; 
        checkArry.push(pathObj);

      });

      console.log("checkArry:" + JSON.stringify(checkArry));
      
      if (selectionType === "checked") {
        // and let everyone know
        vs.checkeditemsField = checkArry;
        vs.$parent.fireEvent('checked');
      } else if (selectionType === "searchfor") {
        vs.searcheditemsField = checkArry;
        vs.$parent.fireEvent('searchfor');
      }
      vs.$parent.$applyAsync();


    } else {
      PTC.Metadata.fromId(this.modelName).then((mdata) => {
  
        let checkArry = [];
        checkedItemsMap.forEach(function(value, key) {
          console.log(key, value);
          var occuranceItems = mdata.find(mu).sameAs(value);
  
          if (occuranceItems._selectedPaths.length > 0)  {
    
            let idpath = occuranceItems._selectedPaths[0]; //always pick the first - we dont support multi-select
            console.log("searched or checked Occurences modelname:" + mn +" path:" + idpath);
            let pathObj = { model:mn, path:idpath}; 
            checkArry.push(pathObj);
    
          } else {
    
            console.log('Nothing found in Metadata when searching for : ' + value );
    
          }
  
        });
  
        console.log("checkArry:" + JSON.stringify(checkArry));
        
        if (selectionType === "checked") {
          // and let everyone know
          vs.checkeditemsField = checkArry;
          vs.$parent.fireEvent('checked');
        } else if (selectionType === "searchfor") {
          vs.searcheditemsField = checkArry;
          vs.$parent.fireEvent('searchfor');
        }
        vs.$parent.$applyAsync();
    })

    }


  }

  findOccurences = function(searchText) {
  
    console.log("Using Model name:"+this.modelName + " Searching for "+searchText);
  
    if (searchText != "") {

      let metadatauniqueness = this.metadatauniqueness;
      let mName = this.modelName;
      let vScope = this.vuforiaScope;

      PTC.Metadata.fromId(mName).then((mdata) => {
  
          var occuranceItems = mdata.find(metadatauniqueness).sameAs(searchText);
          var hiliteArray = [];

          if (occuranceItems._selectedPaths.length > 0)  {


            let idpath = occuranceItems._selectedPaths[0]; //always pick the first - we dont support multi-select

            //build the data that the mapper wants to see - note it is an array so it _could_ suppport multi-select...  
            vScope.selectedvalueField = [{ model:mName, path:idpath }]; 

            if (this.hilitemodel === "true") {

              this.resetHighlight(this.renderer);
              hiliteArray.push(mName + '-' + idpath);
              SELECTED_ITEMS.push(mName + '-' + idpath);
  
              if (hiliteArray.length > 0) {
                this.hilite(hiliteArray, true , this.renderer , this.hicolor);
              }

            }

            try {
              var olfilename = mdata.get(idpath).getProp('OL File Name');
              var childcount = parseInt(mdata.get(idpath).getProp('Child Count'));
  
              //check for associated model file
              if (olfilename === "" && childcount === 0 ) {
                vScope.$parent.fireEvent('metadatanoolfile');
              }

            } catch (ex) {
              console.log('Exception when checking for OL File Name and Child Count   : ' + ex );
            }

                    
            // and let everyone know
            vScope.$parent.fireEvent('clicked');
            vScope.$parent.$applyAsync();

            

          } else {

            console.log('Nothing found in Metadata when searching for : ' + searchText );

          }
      })
        .finally( () => { console.log('Metadata done') }  );
    }
  
  }


  hiliteSelected = function () {

    let elements = document.getElementsByClassName("itemselected");

  }

  setColor = function (items,  tmlrenderer) {
    items.forEach(function (item) {
        console.log("Starting render");
        tmlrenderer.setColor(item, this.hicolor);

    });
  }

  hilite = function(items,hilite , tmlrenderer , color) {
    items.forEach(function(item) {
      
      if (hilite === true ) {
       tmlrenderer.setColor(item, color);

      } else {
        tmlrenderer.setColor(item, undefined);
      }
      
    });
  }


  resetHighlight = function( tmlrenderer) {

    if (SELECTED_ITEMS != undefined && SELECTED_ITEMS.length > 0) {
        this.hilite(SELECTED_ITEMS,false , tmlrenderer);
      }
      SELECTED_ITEMS =[];
    }
  
  toHolo = function () {
    return (toBool(scope.isholoField) && !twx.app.isPreview())?'hl':'gl';
  }
  
}


 

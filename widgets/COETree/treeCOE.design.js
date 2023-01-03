// This widget definition will get combined into combined-widgets.js file along with all other widget definitions
// use of anonymous func ensures nothing here leaks into global scope
(function() {
  function twxtreecoe() {
    return {
      // Required, this will be used as the top level tag when it's dropped on the Canvas
      // use a custom prefix to so the name won't collide with other widgets
      elementTag: 'txw-treeCOE',

      // Text displayed for the widget in the Palette
      label: 'Tree COE',

      // category to assign the widget to, this value will be used by the
      // project definition to filter which widgets are valid for that type of project
      category: 'ar',

      // list of groups this widget will be included in the widget palette
      // standard value are Containers, Input, and Other
      groups : ["COE Extension"],
      
      // avoids showing this widget in Studio; when duplicating this template, remove or change to true
      isVisibleInPalette: true,

      // List of properties that will be displayed in the widget properties panel once it's been dropped on the Canvas
      properties: [
        {
          name: 'incomingdata',
          label: 'Incoming data',
          datatype: 'json',
          default: {},
          isBindingTarget: true,
          isBindingSource: false,
          showInput: false
        },
        {
          name: 'selectedvalue',
          label: 'Selected Value',
          datatype: 'string',
          default: '',
          isBindingTarget: true,
          isBindingSource: true,
          showInput: false
        },
        {
          name: 'propertyname',
          label: 'Incoming data Property name',
          datatype: 'string',
          default: 'Part Name',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },        
        {
          name: 'jsonarrayidentifier',
          label: 'JSON array Identifier',
          datatype: 'string',
          default: 'Components',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'treeelementpropertyname',
          label: 'uniqueness Property name',
          datatype: 'string',
          default: 'partusesoccurrence_objectid',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'treeelementpropertycat',
          label: 'uniqueness Category name',
          datatype: 'string',
          default: 'WindChill',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'treeelementid',
          label: 'treeelementid',
          datatype: 'string',
          default: '',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: false
        },

        {
          name: 'modelname',
          label: 'model name',
          datatype: 'string',
          default: '',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'hilitemodel',
          label: 'Highlight model',
          datatype: 'boolean',
          default: false,
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'width',
          label: 'width',
          datatype: 'string',
          default: '40vw',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'height',
          label: 'height',
          datatype: 'string',
          default: '60vh',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'topoffset',
          label: 'top offset',
          datatype: 'string',
          default: '50px',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'leftoffset',
          label: 'left offset',
          datatype: 'string',
          default: '1px',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        }
      ],

      services: [
        {
          name: 'start',
          label: 'Start'
        }
      ],

      // List of events that will displayed in the widget properties panel
      events: [
        {
          name: 'clicked',
          label: 'Clicked'
        },
      ],

      dependencies: {
        files         : ['js/treeCOE-ng.js','js/treeCOE.js', 'images/treeCOE_close.png'],
        angularModules: ['treecoe-ng']
      },

      // HTML to render when the widget is dropped on the Canvas
      designTemplate: function () {
        return '<div class="treecoeWidget"></div>';
      },

      runtimeTemplate: function (props) {
        var tmpl = '<div ng-treecoe  incomingdata-field="me.incomingdata" selectedvalue-field="me.selectedvalue" propertyname-field={{me.propertyname}} treeelementpropertyname-field={{me.treeelementpropertyname}}    treeelementpropertycatField-field={{me.treeelementpropertycat}} jsonarrayidentifier-field={{me.jsonarrayidentifier}} hilitemodel-field={{me.hilitemodel}} width-field={{me.width}} height-field={{me.height}} topoffset-field={{me.topoffset}} leftoffset-field={{me.leftoffset}} modelname-field={{me.modelname}} metadata-field={{me.metadata}}   delegate-field="delegate"></div>' ; //original-field="me.original" markedup-field="me.markedup" delegate-field="delegate"></div>';
        return tmpl;
      }
    };
  }

  // registers the widget in Studio so that it gets displayed in the Widget Palette, it will only show up in the
  // Widget Palette for views that this widget is registered for (as determined by category property)
  twxAppBuilder.widget('twxtreecoe', twxtreecoe);

}());

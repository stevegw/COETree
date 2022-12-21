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
          name: 'metadata',
          label: 'PTC.Metadata',
          datatype: 'string',
          default: '',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: false
        },
        {
          name: 'width',
          label: 'width %',
          datatype: 'string',
          default: '40',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'height',
          label: 'height %',
          datatype: 'string',
          default: '60',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'outjson',
          label: 'JSON data',
          datatype: 'string',
          default: '',
          isBindingTarget: false,
          isBindingSource: true,
          showInput: false
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
          name: 'started',
          label: 'Started'
        }

      ],

      dependencies: {
        files         : ['js/treeCOE-ng.js','js/tree.js', 'images/Markup_arrow.png', 'images/Markup_arrowSelected.png', 'images/Markup_blackspot.png', 'images/Markup_blackspotSelected.png', 'images/Markup_bluespot.png', 'images/Markup_bluespotSelected.png','images/Markup_redspot.png', 'images/Markup_redspotSelected.png','images/Markup_yellowspot.png', 'images/Markup_yellowspotSelected.png','images/Markup_marker.png', 'images/Markup_markerSelected.png','images/Markup_reset.png', 'images/Markup_save.png'],
        angularModules: ['treecoe-ng']
      },

      // HTML to render when the widget is dropped on the Canvas
      designTemplate: function () {
        return '<div class="treecoeWidget"></div>';
      },

      runtimeTemplate: function (props) {
        var tmpl = '<div ng-treecoe  incomingdata-field="me.incomingdata" width-field={{me.width}} height-field={{me.height}} metadata-field={{me.metadata}}  outjson-field="me.outjson" delegate-field="delegate"></div>' ; //original-field="me.original" markedup-field="me.markedup" delegate-field="delegate"></div>';
        return tmpl;
      }
    };
  }

  // registers the widget in Studio so that it gets displayed in the Widget Palette, it will only show up in the
  // Widget Palette for views that this widget is registered for (as determined by category property)
  twxAppBuilder.widget('twxtreecoe', twxtreecoe);

}());


    require([
        "esri/map",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/graphic",
        "esri/layers/GraphicsLayer",
        "esri/InfoTemplate",
        "esri/geometry/Point",
        "dojo/_base/Color",
        "dojo/domReady!"
      ], function(Map, SimpleMarkerSymbol, Graphic, GraphicsLayer, InfoTemplate, Point, Color) {
        var map = new Map("mapDiv", {
          basemap: "topo",
          center: [17.923597762, 60.208251508],
          zoom: 10
        });
      
        var graphicsLayer = new GraphicsLayer();
        map.addLayer(graphicsLayer);
      
        var simpleMarkerSymbol = new SimpleMarkerSymbol();
        simpleMarkerSymbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
        simpleMarkerSymbol.setSize(16);
        simpleMarkerSymbol.setColor(new Color([255, 0, 0, 0.51]));
      
        var graphic = new Graphic(
          new Point(17.923597762, 60.208251508),
          simpleMarkerSymbol
        ).setInfoTemplate(new InfoTemplate("Test"));
        graphicsLayer.add(graphic);
      });
      


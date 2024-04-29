    var map;
    require(["esri/map", 
    "esri/map",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer) {
        map = new Map("mapDiv", {
            basemap: "topo",
            center: [17.923597762, 60.208251508],
            zoom: 10
        });

        var CanoeLayer = new ArcGISDynamicMapServiceLayer();

        var BikeLayer = new ArcGISDynamicMapServiceLayer();

        var WalkLayer = new ArcGISDynamicMapServiceLayer();

        map.addLayer(CanoeLayer);
        map.addLayer(BikeLayer);
        map.addLayer(WalkLayer);

        CanoeLayer.setOpacity(1);
        BikeLayer.setOpacity(1);
        WalkLayer.setOpacity(1);

    });

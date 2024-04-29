
    var map;
    require(["esri/map", "dojo/domReady!"], function(Map) {
        map = new Map("mapDiv", {
            basemap: "topo",
            center: [17.923597762, 60.208251508],
            zoom: 10
        });
    });

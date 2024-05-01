require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/geometry/Polyline",
    "esri/symbols/SimpleLineSymbol"
], function(Map, MapView, GraphicsLayer, Graphic, Polyline, SimpleLineSymbol) {
    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [17.923597762, 60.208251508], // Longitude, latitude
        zoom: 10
    });

    // Function to add trail graphics to the map
    function addTrailGraphics(trailCoordinates, color) {
        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        const coordinates = trailCoordinates.map(coord => [parseFloat(coord.longitude), parseFloat(coord.latitude)]);

        const polyline = new Polyline({
            paths: coordinates
        });

        const trailGraphic = new Graphic({
            geometry: polyline,
            symbol: new SimpleLineSymbol({
                color: color || [0, 0, 255],
                width: 2
            })
        });

        graphicsLayer.add(trailGraphic);
    }

    // Function to handle errors
    function handleError(error) {
        console.error("Error: ", error);
    }

    // Load trail data from JSON files and add them to the map
    fetch('coordinates.json')
        .then(response => response.json())
        .then(data => addTrailGraphics(data.posts, [255, 0, 0]))
        .catch(handleError);

    fetch('coord.json')
        .then(response => response.json())
        .then(data => addTrailGraphics(data.posts, [0, 255, 0]))
        .catch(handleError);

    fetch('coord2.json')
        .then(response => response.json())
        .then(data => addTrailGraphics(data.posts, [0, 0, 255]))
        .catch(handleError);
});



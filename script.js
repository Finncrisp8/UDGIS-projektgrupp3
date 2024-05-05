require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/geometry/Polyline",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color"
], function(Map, MapView, FeatureLayer, Graphic, Polyline, SimpleLineSymbol, Color) {
    const map = new Map({
        basemap: "topo"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [17.923597762, 60.208251508], // Longitude, latitude
        zoom: 10
    });

    // Function to convert JSON data to Polyline geometry
    function convertToPolyline(jsonData) {
        const paths = jsonData.posts.map(post => [parseFloat(post.longitude), parseFloat(post.latitude)]);
        return new Polyline({
            paths: [paths],
            spatialReference: { wkid: 4326 } // WGS84
        });
    }

    // Function to add a trail layer
    function addTrailLayer(filePath, title, color) {
        // Read the GeoJSON file
        fetch(filePath)
            .then(response => response.json())
            .then(data => {
                // Convert JSON data to Polyline geometry
                const polyline = convertToPolyline(data);

                // Create a symbol for the trail
                const trailSymbol = new SimpleLineSymbol({
                    color: color,
                    width: 3 // Width of the line
                });

                // Create a graphic with the polyline geometry and symbol
                const trailGraphic = new Graphic({
                    geometry: polyline,
                    symbol: trailSymbol
                });

                // Create a FeatureLayer from the graphic
                const trailLayer = new FeatureLayer({
                    title: title,
                    objectIdField: "OBJECTID",
                    geometryType: "polyline",
                    source: [trailGraphic],
                    spatialReference: { wkid: 4326 }, // WGS84
                    visible: false // Initially hide the layer
                });

                // Add the FeatureLayer to the map
                map.add(trailLayer);

                // Add event listener to toggle layer visibility
                document.getElementById(title).addEventListener('change', function() {
                    trailLayer.visible = this.checked;
                });
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    // Add trail layers
    addTrailLayer("Biking_walking_no_elevation/Etapp_11_wgs84.json", "Cykel/Vandringsled 1", [0, 0, 255]); // Blue color
    addTrailLayer("Biking_walking_no_elevation/Etapp_12_wgs84.json", "Cykel/Vandringsled 2", [255, 0, 0]); // Red color
    addTrailLayer("Biking_walking_no_elevation/Etapp_13_wgs84.json", "Cykel/Vandringsled 3", [0, 255, 0]);
    addTrailLayer("Biking_walking_no_elevation/Etapp_14_wgs84.json", "Cykel/Vandringsled 4", [0, 255, 0]);
    // Add more trail layers as needed

    // Lägg till händelselyssnare för klickhändelse på kartvyn
    view.on("click", function(event) {
        // Hämta koordinaterna för den klickade punkten
        const latitude = event.mapPoint.latitude.toFixed(6); // Avrunda till 6 decimaler
        const longitude = event.mapPoint.longitude.toFixed(6); // Avrunda till 6 decimaler
        
        // Visa koordinaterna i konsolen (för teständamål)
        console.log("Latitude:", latitude, "Longitude:", longitude);
        
        // Visa koordinaterna på sidan (valfritt)
        document.getElementById("coordinatesDisplay").innerText = "Latitude: " + latitude + ", Longitude: " + longitude;
    });
});


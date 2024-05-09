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
        basemap: "topo-vector"
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
    
    // Define arrays to hold feature layers for each trail type
    const trailLayers = {
        "Vandringsleder": [],
        "Cykelleder": [],
        "Kanotleder": []
    };

    function addTrailLayer(filePath, title, color, type) {
        fetch(filePath)
            .then(response => response.json())
            .then(data => {
                const polyline = convertToPolyline(data);

                const trailSymbol = {
                    type: "simple-line",
                    color: new Color(color),
                    width: 3
                };

                const trailGraphic = new Graphic({
                    geometry: polyline,
                    symbol: trailSymbol
                });

                const trailLayer = new FeatureLayer({
                    title: title,
                    objectIdField: "OBJECTID",
                    geometryType: "polyline",
                    source: [trailGraphic],
                    spatialReference: { wkid: 4326 },
                    visible: false
                });

                // Add the feature layer to the corresponding array based on its type
                trailLayers[type].push(trailLayer);

                map.add(trailLayer);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    // Add trail layers
    addTrailLayer("Biking_walking_no_elevation/Etapp_11_wgs84.json", "Vandringsled 1", [0, 0, 255], "Vandringsleder"); // Blue color
    addTrailLayer("Biking_walking_no_elevation/Etapp_12_wgs84.json", "Vandringsled 2", [0, 0, 255], "Vandringsleder"); // Blue color
    addTrailLayer("Biking_walking_no_elevation/Etapp_13_wgs84.json", "Vandringsled 3", [0, 0, 255], "Vandringsleder"); // Blue color
    addTrailLayer("Biking_walking_no_elevation/Etapp_14_wgs84.json", "Vandringsled 4", [255, 0, 0], "Vandringsleder"); // Red color
    addTrailLayer("Biking_walking_no_elevation/Etapp_15_wgs84.json", "Vandringsled 5", [255, 0, 0], "Vandringsleder"); // Red color
    addTrailLayer("Biking_walking_no_elevation/Etapp_16_wgs84.json", "Vandringsled 6", [0, 255, 0], "Vandringsleder"); // Green color
    addTrailLayer("Biking_walking_no_elevation/Etapp_17_wgs84.json", "Vandringsled 7", [0, 255, 0], "Vandringsleder"); // Green color
    // Add more trail layers as needed

    // Function to toggle the visibility of trail layers based on type
    function toggleTrailLayers(type, visible) {
        trailLayers[type].forEach(layer => {
            layer.visible = visible;
        });
    }

    // Function to populate the second dropdown menu with trails based on the selected trail type
    function populateTrailDropdown(trails) {
        const trailDropdown = document.getElementById("trailFilter");
        trailDropdown.innerHTML = ""; // Clear previous options

        trails.forEach(trail => {
            const option = document.createElement("option");
            option.value = trail.title;
            option.textContent = trail.title;
            trailDropdown.appendChild(option);
        });
    }

    // Add event listener to the first dropdown menu for selecting trail type
    document.getElementById("trailType").addEventListener('change', function() {
        const selectedTrailType = this.value; // Get the selected trail type
        const selectedTrails = trailLayers[selectedTrailType]; // Get trails for the selected type
        if (selectedTrails.length > 0) {
            populateTrailDropdown(selectedTrails); // Populate the second dropdown menu
            document.getElementById("trailFilterDiv").style.display = "block"; // Show the second dropdown menu
        } else {
            document.getElementById("trailFilterDiv").style.display = "none"; // Hide the second dropdown menu if no trails available
        }
    });

    // Add event listener to the second dropdown menu for selecting specific trail
    document.getElementById("trailFilter").addEventListener('change', function() {
        const selectedTrailTitle = this.value; // Get the selected trail title
        // Find and toggle the visibility of the selected trail
        Object.values(trailLayers).forEach(trails => {
            trails.forEach(trail => {
                if (trail.title === selectedTrailTitle) {
                    trail.visible = true;
                } else {
                    trail.visible = false;
                }
            });
        });
    });

    // Lägg till händelselyssnare för klickhändelse på kartvyn
    view.on("click", function(event) {
        const latitude = event.mapPoint.latitude.toFixed(6); // Avrunda till 6 decimaler
        const longitude = event.mapPoint.longitude.toFixed(6); // Avrunda till 6 decimaler
        
        console.log("Latitude:", latitude, "Longitude:", longitude);
        
        document.getElementById("coordinatesDisplay").innerText = "Latitude: " + latitude + ", Longitude: " + longitude;
    });
});

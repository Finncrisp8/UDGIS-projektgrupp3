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
        center: [17.923597762, 60.208251508], 
        zoom: 10
    });

    
    function convertToPolyline(jsonData) {
        const paths = jsonData.posts.map(post => [parseFloat(post.longitude), parseFloat(post.latitude)]);
        return new Polyline({
            paths: [paths],
            spatialReference: { wkid: 4326 } 
        });
    }
    
    
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

                
                trailLayers[type].push(trailLayer);

                map.add(trailLayer);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    
    addTrailLayer("Biking_walking_no_elevation/Etapp_11_wgs84.json", "Vandringsled 1", [0, 0, 255], "Vandringsleder"); 
    addTrailLayer("Biking_walking_no_elevation/Etapp_12_wgs84.json", "Vandringsled 2", [0, 0, 255], "Vandringsleder"); 
    addTrailLayer("Biking_walking_no_elevation/Etapp_13_wgs84.json", "Vandringsled 3", [0, 0, 255], "Vandringsleder"); 
    addTrailLayer("Biking_walking_no_elevation/Etapp_14_wgs84.json", "Vandringsled 4", [255, 0, 0], "Vandringsleder"); 
    addTrailLayer("Biking_walking_no_elevation/Etapp_15_wgs84.json", "Vandringsled 5", [255, 0, 0], "Vandringsleder"); 
    addTrailLayer("Biking_walking_no_elevation/Etapp_16_wgs84.json", "Vandringsled 6", [0, 255, 0], "Vandringsleder"); 
    addTrailLayer("Biking_walking_no_elevation/Etapp_17_wgs84.json", "Vandringsled 7", [0, 255, 0], "Vandringsleder"); 
    

    
    function toggleTrailLayers(type, visible) {
        trailLayers[type].forEach(layer => {
            layer.visible = visible;
        });
    }

    
    function populateTrailDropdown(trails) {
        const trailDropdown = document.getElementById("trailFilter");
        trailDropdown.innerHTML = ""; 

        trails.forEach(trail => {
            const option = document.createElement("option");
            option.value = trail.title;
            option.textContent = trail.title;
            trailDropdown.appendChild(option);
        });
    }

   
    document.getElementById("trailType").addEventListener('change', function() {
        const selectedTrailType = this.value; 
        const selectedTrails = trailLayers[selectedTrailType]; 
        if (selectedTrails.length > 0) {
            populateTrailDropdown(selectedTrails); 
            document.getElementById("trailFilterDiv").style.display = "block"; 
        } else {
            document.getElementById("trailFilterDiv").style.display = "none"; 
        }
    });

    
    document.getElementById("trailFilter").addEventListener('change', function() {
        const selectedTrailTitle = this.value; 
        
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

    
    view.on("click", function(event) {
        const latitude = event.mapPoint.latitude.toFixed(6); 
        const longitude = event.mapPoint.longitude.toFixed(6); 
        
        console.log("Latitude:", latitude, "Longitude:", longitude);
        
        document.getElementById("coordinatesDisplay").innerText = "Latitude: " + latitude + ", Longitude: " + longitude;
    });
});


mapboxgl.accessToken =
  "pk.eyJ1IjoiMTMyOTAyMjYyNjkiLCJhIjoiY2xyZ2ZocHU4MGdvZjJqbzVnaWt2Z255ZiJ9.FjjPrPc_VXxBUD9nrToOEg"; // Replace with your Mapbox access token

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-3.476959646569138, 56.407104978623074], // Initial centre point
  zoom: 11 // Initial zoom level
});

map.on("load", function () {
  // Add Scale
  var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: "metric"
  });
  document.getElementById("scale-bar").appendChild(scale.onAdd(map));

  // Define functions to load GeoJSON data
  function loadGeoJSON(url) {
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  // Loading and adding 2015 GeoJSON layers
  loadGeoJSON(
    "https://raw.githubusercontent.com/YangHGit/mapshp.github.io/main/output_2015.geojson"
  ).then(function (geojson2015) {
    map.addLayer({
      id: "layer2015",
      type: "fill",
      source: {
        type: "geojson",
        data: geojson2015
      },
      paint: {
        "fill-color": "#FF0000",
        "fill-opacity": 0.6
      }
    });
    // Adding a pop-up window
    map.on("click", "layer2015", function (e) {
      var address = e.features[0].properties.ADDRESS;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<h3>Address: " + address + "</h3><h3>Year: 2015</h3>")
        .addTo(map);
    });

    map.on("mouseenter", "layer2015", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "layer2015", function () {
      map.getCanvas().style.cursor = "";
    });
  });

  // Load and add 2019 GeoJSON layers
  loadGeoJSON(
    "https://raw.githubusercontent.com/YangHGit/mapshp.github.io/main/output_2019.geojson"
  ).then(function (geojson2019) {
    map.addLayer({
      id: "layer2019",
      type: "fill",
      source: {
        type: "geojson",
        data: geojson2019
      },
      paint: {
        "fill-color": "#00FF00",
        "fill-opacity": 0.6
      }
    });
    // Adding a pop-up window
    map.on("click", "layer2019", function (e) {
      var address = e.features[0].properties.ADDRESS;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<h3>Address: " + address + "</h3><h3>Year: 2019</h3>")
        .addTo(map);
    });

    map.on("mouseenter", "layer2019", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "layer2019", function () {
      map.getCanvas().style.cursor = "";
    });
  });

  // Loading and adding 2022 GeoJSON layers
  loadGeoJSON(
    "https://raw.githubusercontent.com/YangHGit/mapshp.github.io/main/output_2022.geojson"
  ).then(function (geojson2022) {
    map.addLayer({
      id: "layer2022",
      type: "fill",
      source: {
        type: "geojson",
        data: geojson2022
      },
      paint: {
        "fill-color": "#0000FF",
        "fill-opacity": 0.6
      }
    });
    // Adding a pop-up window
    map.on("click", "layer2022", function (e) {
      var address = e.features[0].properties.ADDRESS;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML("<h3>Address: " + address + "</h3><h3>Year: 2022</h3>")
        .addTo(map);
    });

    map.on("mouseenter", "layer2022", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "layer2022", function () {
      map.getCanvas().style.cursor = "";
    });
    console.log("2022 layer added"); // acknowledgement message
  });

  // Toggle layer visibility
  var toggleableLayers = ["layer2015", "layer2019", "layer2022"];
  toggleableLayers.forEach(function (id) {
    var checkbox = document.getElementById(id);
    checkbox.addEventListener("change", function (e) {
      map.setLayoutProperty(
        id,
        "visibility",
        e.target.checked ? "visible" : "none"
      );
    });
  });
});

// Zoom in and out control
document.getElementById("zoom-in").addEventListener("click", function () {
  map.zoomIn();
});

document.getElementById("zoom-out").addEventListener("click", function () {
  map.zoomOut();
});

// position control
document
  .querySelector(".location-control")
  .addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      map.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 15
      });
    });
  });
var API_quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var API_plates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"


function markerSize(magnitude) {
    return magnitude * 2;
};


var earthquakes = new L.LayerGroup();

d3.json(API_quakes, function (geoJson) {
    L.geoJSON(geoJson.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 0.8,
                weight: 0.2,
                color: 'yellow'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(earthquakes);
    createMap(earthquakes);
});

var plateBoundary = new L.LayerGroup();

d3.json(API_plates, function (geoJson) {
    L.geoJSON(geoJson.features, {
        style: function (geoJsonFeature) {
            return {
                weight: 2,
                color: 'white'
            }
        },
    }).addTo(plateBoundary);
})


function Color(magnitude) {
    if (magnitude > 9) {
        return '#FA0343'
    } else if (magnitude > 8.5) {
        return '#FA03C6'
    } else if (magnitude > 8) {
        return 'b#D103FA'
    } else if (magnitude > 7.5) {
        return '#7B03FA'
    } else if (magnitude > 7) {
        return '#03AFFA'
    } else if (magnitude > 6.5) {
        return '#0CF31A'      
    } else if (magnitude > 6) {
        return '#03FAD9'        
    } else if (magnitude > 5.5) {
        return '#03FA3F'
    } else if (magnitude > 5) {
        return '#D1FA03'        
    } else if (magnitude > 4.5) {
        return '#FAE803'
    } else if (magnitude > 4) {
        return '#EEC9B7'
    } else if (magnitude > 3) {
        return '#E8EEB7'
    } else if (magnitude > 2) {
        return '#B7EECE'
    } else if (magnitude > 1) {
        return '#B7EEED'
    } else {
        return '#C8B7EE'
    }
};

function createMap() {

 //   var piratesMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses///by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //      maxZoom: 25,
  //      id: 'mapbox.pirates',
 //       accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
 //   });

    var streetsMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var outdoorsMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.outdoors',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var lightMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var pencilMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.pencil',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var emeraldMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.emerald',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var comicMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.comic',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var highContrastMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.high-contrast',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var streetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });


    var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoibW9kZWxvYm9vdGNhbXAiLCJhIjoiY2p2ajB0bHVjMDVzMzQ4cGJwc3Awb2J1aSJ9.EqOe7ebL_KhiMTeGJtcxZA'
    });

    var baseLayers = {
    //    "piratesMap": piratesMapMap,
        "streets": streetsMap,
        "outdoors": outdoorsMap,
        "light": lightMap,
        "pencil": pencilMap,
        "emerald": emeraldMap,
        "comic": comicMap,
        "High Contrast": highContrastMap,
        "Street": streetMap,
        "Dark": darkMap,
        "Satellite": satellite

    };


    var overlays = {
        "Earthquakes": earthquakes,
        "Plate Boundaries": plateBoundary,
    };

    var mymap = L.map('mymap', {
        center: [40, -50],
        zoom: 3,

        layers: [streetMap, earthquakes, plateBoundary]
    });

    L.control.layers(baseLayers, overlays).addTo(mymap);

    var legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            magnitude = [0, 1, 2, 3, 4, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
            labels = [];

        div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML +=
                '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
                magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
        }

        return div;
    };
    legend.addTo(mymap);
}

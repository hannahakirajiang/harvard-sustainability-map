// JavaScript Document
window.onload = function() {
  mapFunction();
	//alert("loaded")
//	console.log("loaded success _(:3」∠)_ ")
};

function mapFunction(){
  /***************************************************************************************
*    Title: leaflet
*    Availability: https://leafletjs.com/
*    Description: Map Elements were created using leaflet documentation
***************************************************************************************/
var map = L.map('mapid').setView([42.3667490,-71.1208905],16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	        maxZoom: 19,
	        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  //set icon size and other info

  /***************************************************************************************
*    Title: leaflet/CustomIcons
*    Availability: https://leafletjs.com/examples/custom-icons/
*    Description: The logic of the creating custom icons was derived from leaflet documentation
***************************************************************************************/
  var mapIcon = L.Icon.extend({
    options: {
      iconSize: [35, 35],
      iconAnchor: [17, 36], //add the bottom decoration of icon
      popupAnchor: [0, -28] //get the bottom decoration pop out
    }
  });

  //import my icons
  var leedIcon = new mapIcon({
      iconUrl: 'inMapIcon/leed.png'
    }),
    bikeShare = new mapIcon({
      iconUrl: 'inMapIcon/bikeRock.png'
    }),
    energyIcon = new mapIcon({
      iconUrl: 'inMapIcon/HeatPlant.png'
    }),
    landscapeIcon = new mapIcon({
      iconUrl: 'inMapIcon/communityGarden.png'
    });
  educationIcon = new mapIcon({
    iconUrl: 'inMapIcon/education.png'
  });

  //feature popup on click

  //standard popup
  /***************************************************************************************
*    Title: leaflet/popup
*    Availability: https://leafletjs.com/reference-1.7.1.html#popup
*    Description: The logic of the creating popops was derived from leaflet documentation
***************************************************************************************/
  function getPopup(feature, layer) {
    //set default vals for pop up content, img, popupDesc and links
    var popupContent = ""
    var popupDesc = ""


    if (feature.properties && feature.properties.Label) {
      popupContent += ' <p id="popupLabel">' + feature.properties.Label + '</p>';
    }

    if (feature.properties && feature.properties.Desc) {
      popupDesc += ' <p id="popupDesc">' + feature.properties.Desc + '</p>';
    }

    popupContent += "<table> <tr> <td> " + popupDesc + " </td> </tr> </table> ";

    layer.bindPopup(popupContent);
  }


  //CALLING NAMES FOR ICON

  //create layers from geoJSONs
  var leedLayer = new L.geoJSON(leedFeature, {
    onEachFeature: getPopup, //Calling the onEachFeature name again????????
    pointToLayer: function (feature, latlng) { //add icon itself to the layer
      return L.marker(latlng, {
        icon: leedIcon
      });
    }
  });

  map.addLayer(leedLayer); //add the created layer as defauly selection

  var bikeShareLayer = new L.geoJSON(bikeShareFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: bikeShare
      });
    }
  });

  var energyLayer = new L.geoJSON(energyFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: energyIcon
      });
    }
  });


  var landscapeLayer = new L.geoJSON(landscapeFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: landscapeIcon
      });
    }
  });

  var educationLayer = new L.geoJSON(educationFeature, {
    onEachFeature: getPopup,
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {
        icon: educationIcon
      });
    }
  });



  //add the filer
  /***************************************************************************************
*    Title: Leaflet Panel Layers
*    Availability: https://labs.easyblog.it/maps/leaflet-panel-layers/examples/group-layers.html
*    Description: The logic of the creating Panel Layers was derived from leaflet documentation wrote by a leaflet developer Stefano Cudini
***************************************************************************************/
  function iconByName(name) {
    return '<i class="icon icon-' + name + '"></i>';
  }

  //add layer filter to map
  var overLayers = [{
      //大标题
      group: "Buildings",
      //小标题，icon，layer唤醒
      layers: [{
          name: "LEED",
          icon: iconByName('leed'),
          layer: leedLayer
        },
      ]
    },
    {
      group: "Education",
      layers: [{
        name: "Culture & Learning",
        icon: iconByName('education'),
        layer: educationLayer
      }]
    },
    {
      group: "Landscape",
      layers: [{
          name: "Nature & Ecosystems",
          icon: iconByName('landscape'),
          layer: landscapeLayer
        },
      ]
    },
    {
      group: "Transportation",
      layers: [{
          name: "Bike Share Station",
          icon: iconByName('bike'),
          layer: bikeShareLayer
        },
      ]
    },
    {
      group: "Energy",
        layers: [{
            name: "Sustainable Energy",
            icon: iconByName('energy'),
            layer: energyLayer
        },
      ]
    },
  ];

  //add the panel
  var panel = new L.Control.PanelLayers(null, overLayers, {
    collapsibleGroups: true,
    collapsed: false
  });


  //get the panel layer to work
  map.addControl(panel);


}

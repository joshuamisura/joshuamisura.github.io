//crime data by city-data.com

var map2;
map2 = L.map('map', {
center: [36.5,-122],
zoom:2,
minZoom: 2
});
var map2Base = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
})
map2.addLayer(map2Base);


var CORSarr = [
	"cors_sites 1 second CORS",
	"cors_sites 5 second CORS",
	"cors_sites 15 second CORS",
	"cors_sites 30 second CORS"
];

var layer0;
var layer1;

var options1 = {
		fillColor: "green",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
};
var options5 = {
		fillColor: "blue",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
};
var options15 = {
		fillColor: "red",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
};
var options30 = {
		fillColor: "purple",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
};

// var sel = document.getElementById('menu');
//
// sel.addEventListener("change", changeOption);

var choice = 5;



function createMap(map2){
	//getData(map);
	$("#0").click(function(event) {
			event.preventDefault();
			window.alert("1 second");
			choice = 0;
	});
	$("#1").click(function(event) {
			event.preventDefault();
			window.alert("5 seconds");
			choice = 1;
	});
};

// function check(){
// 	// if (map.hasLayer(layer0)){
// 		window.alert("ppppppppppppp")
// 	// }
// }
//
// function getMeteoriteData(map, choice){
// 	$.ajax("data/CORS.geojson", {
// 			dataType: "json",
// 			success: function(response){
// 				//maybe not needed. just get attributes array$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// 				if (choice == 0){
// 					window.alert("111111aaaaaa");
// 					if (map.hasLayer(layer0)){
// 						// map.remove();
// 						window.alert("removeeeeeeee");
// 						map.removeLayer(layer0);
// 					};
// 					var attributes = getAtt(response);
// 					var seconds1Data = processData1(response);
// 					createPropSymbols(seconds1Data, map, attributes);
// 					createSequenceControls(map, attributes);
// 					// var tableFields = populateTable(seconds1Data);
// 					createLegend(map,attributes);
// 				}
// 				else if (choice == 1){
// 					var attributes = getAtt(response);
// 					var seconds5Data = processData5(response)
// 					createPropSymbols(seconds5Data, map, attributes);
// 					createSequenceControls(map, attributes);
//
// 				}
//
// 			}
// 	});
// };
//
// // function selectOption(){
// // 	$("#1").click(function(event) {
// // 			event.preventDefault();
// // 			window.alert("5 seconds");
// // 			choice = 1;
// // 			return choice;
// // 		 //  if(map.hasLayer(restaurants)) {
// // 		 //      $(this).removeClass('selected');
// // 		 //      map.removeLayer(restaurants);
// // 		 //  } else {
// // 		 //      map.addLayer(restaurants);
// // 		 //      $(this).addClass('selected');
// // 		 // }
// // 	});
// // };
//
// // function sec1(){
// // 	window.alert(sel.value);
// // };
// //
// // function changeOption(){
// // 	if (sel.value == "option1"){
// // 		sec1();
// // 	}
// // }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// function getData(map){
//     //load the data
//     $.ajax("data/murders.geojson", {
//         dataType: "json",
//         success: function(response){
//             var attributes = processData(response)
//             createPropSymbols(response, map, attributes);
//             createSequenceControls(map, attributes);
//             var tableFields = populateTable(response);
//             var table = $('#tablecity').DataTable({
//                     data: tableFields,
//                     dataSrc: "",
//                     select:{style:'single'},
//                 "columns":[
//                     {"data": "id"},
//                     {"data": "name"},
//                     {"data": "2006"},
//                     {"data": "2008"},
//                     {"data": "2010"},
//                     {"data": "2012"},
//                     {"data": "2014"},
//                     {"data": "2016"},
//                     {"data": "2018"}
//                 ]
//             });
//
//
//             createLegend(map,attributes);
//         }
//     });
//
// };
//
// function createPropSymbols(data, map, attributes){
//     // create a Leaflet GeoJSON layer and add it to the map
//     L.geoJson(data, {
//         pointToLayer: function(feature, latlng){
//             return pointToLayer(feature, latlng, attributes, map);
//         }
//     }).addTo(map);
// // window.alert("here")
// // map.removeLayer(layer0);
// // window.alert("gone")
// // L.clearLayers();
// };
//
// function calcPropRadius(attValue) {
//     //scale factor to adjust symbol size evenly
//     var scaleFactor = 0.0005;
//     //area based on attribute value and scale factor
//     var area = attValue * scaleFactor;
//     //radius calculated based on area
//     var radius = Math.sqrt(area/Math.PI);
//
//     return radius;
// };
//
// function pointToLayer(feature, latlng, attributes,map){
// //	if (feature.properties.layer == "cors_sites 5 second CORS"){
//     //Determine which attribute to visualize with proportional symbols
//     var attribute = attributes[12];
//     //create marker options
//     var options1 = {
//         fillColor: "green",
//         color: "#000",
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8
//     };
// 		var options5 = {
// 				fillColor: "blue",
// 				color: "#000",
// 				weight: 1,
// 				opacity: 1,
// 				fillOpacity: 0.8
// 		};
// 		var options15 = {
// 				fillColor: "red",
// 				color: "#000",
// 				weight: 1,
// 				opacity: 1,
// 				fillOpacity: 0.8
// 		};
// 		var options30 = {
// 				fillColor: "purple",
// 				color: "#000",
// 				weight: 1,
// 				opacity: 1,
// 				fillOpacity: 0.8
// 		};
//
//     //For each feature, determine its value for the selected attribute
//     var attValue = Number(feature.properties[attribute]);
//
// // console.log(feature.properties)
//     //Give each feature's circle marker a radius based on its attribute value
//     // options.radius = calcPropRadius(attValue);
//     //create circle marker layer
// 		if (feature.properties[attribute] == "cors_sites 1 second CORS"){//window.alert("111111111");
// 			if (map.hasLayer(layer0)){window.alert("hasssss");
// 				L.removeLayer(layer0);
// 			}
// 			else {
//     	layer0 = L.circleMarker(latlng, options1);
// 			};
//     //build popup content string
//     var popupContent = "<p><b>CORS Station name:</b> " + feature.properties.Name + "</p>";
//
//     //add formatted attribute to popup content string
//     var year = attribute;
//     popupContent += "<p><b>Murder Rate (per 100,000 people) in " + year + ":</b> " + feature.properties[attribute]+"</p>";
//     //bind the popup to the circle marker
//     layer0.bindPopup(popupContent);
//
//     //return the circle marker to the L.geoJson pointToLayer option
//     return layer0;
// 	};
// 	if (feature.properties[attribute] == "cors_sites 5 second CORS"){//window.alert("555555555");
// 		if (map.hasLayer(layer1)){
// 			map.removeLayer(layer1);
// 		}
// 		else {
// 		layer1 = L.circleMarker(latlng, options5);
// 		};
//
// 	//build popup content string
// 	var popupContent = "<p><b>CORS Station name:</b> " + feature.properties.Name + "</p>";
//
// 	//add formatted attribute to popup content string
// 	var year = attribute;
// 	popupContent += "<p><b>Murder Rate (per 100,000 people) in " + year + ":</b> " + feature.properties[attribute]+"</p>";
// 	//bind the popup to the circle marker
// 	layer1.bindPopup(popupContent);
//
// 	//return the circle marker to the L.geoJson pointToLayer option
// 	return layer1;
// };
// if (feature.properties[attribute] == "cors_sites 15 second CORS"){
// 	var layer = L.circleMarker(latlng, options15);
//
// //build popup content string
// var popupContent = "<p><b>CORS Station name:</b> " + feature.properties.Name + "</p>";
//
// //add formatted attribute to popup content string
// var year = attribute;
// popupContent += "<p><b>Murder Rate (per 100,000 people) in " + year + ":</b> " + feature.properties[attribute]+"</p>";
// //bind the popup to the circle marker
// layer.bindPopup(popupContent);
//
// //return the circle marker to the L.geoJson pointToLayer option
// return layer;
// };
// if (feature.properties[attribute] == "cors_sites 30 second CORS"){
// 	var layer = L.circleMarker(latlng, options30);
//
// //build popup content string
// var popupContent = "<p><b>CORS Station name:</b> " + feature.properties.Name + "</p>";
//
// //add formatted attribute to popup content string
// var year = attribute;
// popupContent += "<p><b>Murder Rate (per 100,000 people) in " + year + ":</b> " + feature.properties[attribute]+"</p>";
// //bind the popup to the circle marker
// layer.bindPopup(popupContent);
//
// //return the circle marker to the L.geoJson pointToLayer option
// return layer;
// 	};
// };
//
// function createSequenceControls(map, attributes){
//         var SequenceControl = L.Control.extend({
//             options:{
//                 position: 'bottomleft'
//             },
//             onAdd: function(map){
//                 var container = L.DomUtil.create('div', 'sequence-control-container');
//                 $(container).append('<input class="range-slider" type="range">');
//
//                 $(container).append('<button class="skip" id="reverse" title="Reverse">Reverse</button>');
//                 $(container).append('<button class="skip" id="forward" title="Forward">Skip</button>');
//                 $(container).on('mousedown dbclick', function(e){
//
//                             L.DomEvent.stopPropagation(e);
//                         });
//
//                 return container;
//             }
//         });
//         map.addControl(new SequenceControl());
//                 $('.range-slider').attr({
//                     max: 4,
//                     min: 0,
//                     value: 0,
//                     step: 1
//                 });
//
//                         $('.skip').click(function(){
//                             //get the old index value
//                             var index = $('.range-slider').val();
//
//                             if ($(this).attr('id') == 'forward'){
//                                 index++;
//                                 index = index > 6 ? 0 : index;
//                             } else if ($(this).attr('id') == 'reverse'){
//                                 index--;
//                                 index = index < 0 ? 6 : index;
//                             };
//
//                             $('.range-slider').val(index);
//                             updatePropSymbols(map, CORSarr[index]);
//                         });
//
//                 $('.range-slider').on('input', function(){
//                     var index = $(this).val();
//                     updatePropSymbols(map, CORSarr[index]);
//                 });
//
// };
//
//
// function populateTable(data){
//     var tablePop = [];
//     for (var i=0; i<15; i++){
//         var place = data.features[i].properties;
//         tablePop.push(place);
//     }
//     return tablePop;
// }
//
// function processData1(data, description){
// 	var sec1Group;
// 	var groupAdd = [];
//     //empty array to hold attributes
//     var attributes = [];
//     //properties of the first feature in the dataset
//     var properties = data.features[0].properties;
//     //push each attribute name into attributes array
// 		//console.log(data.features[0].properties);
// // console.log(data.features);
// for (var i in data.features){
// 	// console.log(data.features[i].properties.layer)
// 	if (data.features[i].properties.layer == "cors_sites 1 second CORS"){
// 		groupAdd.push(data.features[i]);
// 	};
// };
// sec1Group = L.layerGroup(groupAdd)
// // sec1Group.addTo(map);
//
// return groupAdd;
// };
//
// function processData5(data, description){
// 	var sec1Group;
// 	var groupAdd = [];
//     //empty array to hold attributes
//     var attributes = [];
//     //properties of the first feature in the dataset
//     var properties = data.features[0].properties;
//     //push each attribute name into attributes array
// 		//console.log(data.features[0].properties);
// // console.log(data.features);
// for (var i in data.features){
// 	// console.log(data.features[i].properties.layer)
// 	if (data.features[i].properties.layer == "cors_sites 5 second CORS"){
// 		groupAdd.push(data.features[i]);
// 	};
// };
// sec1Group = L.layerGroup(groupAdd)
// // sec1Group.addTo(map);
//
// return groupAdd;
// };
//
// function getAtt(data){
// 		//empty array to hold attributes
// 		var attributes = [];
// 		//properties of the first feature in the dataset
// 		var properties = data.features[0].properties;
// 		//push each attribute name into attributes array
// 		//console.log(data.features[0].properties);
// // console.log(data.features);
//
// 		for (var attribute in properties){
//
// 		    //only take attributes with population values
// 		    // if (attribute.indexOf("20") > -1){
// 		        attributes.push(attribute);
// 		    // };
// 		};
//
// 		return attributes;
// };
//
// function updatePropSymbols(map, attribute){
//     map.eachLayer(function(layer){
// 			if (layer.feature === undefined){
// 				console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// 				// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// 				// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// 				// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// 				// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// 			}
// 			else if (layer.feature != undefined) {
//         // if (layer.feature && layer.feature.properties[attribute]){
//         // 	if (layer.feature && layer.feature.properties[attribute]){
// if (layer.feature.properties.layer == attribute){
//     	            //access feature properties
//     	            var props = layer.feature.properties;
//
//     	            //update each feature's radius based on new attribute values
//     	            // var radius = calcPropRadius(props[attribute]);
//     	            // layer.setRadius(radius);
// console.log("**************************************************")
//     	            //add city to popup content string
//     	            var popupContent = "<p><b>City:</b> " + layer.feature.properties.Name + "</p>";
//
//     	            popupContent += "<p><b>Murder Rate (per 100,000 people) in " + attribute + "</p>";
//
//     	            //replace the layer popup
//     	            layer.bindPopup(popupContent, {
//     	                //offset: new L.Point(0,-radius)
//                 });
//
//         //     };
//         };
// 			};
//     });updateLegend(map,attribute);
// };
//
// function createLegend(map, attributes){
//     var LegendControl = L.Control.extend({
//         options: {
//             position: 'bottomright'
//         },
//
//         onAdd: function (map) {
//             // create the control container with a particular class name
//             var container = L.DomUtil.create('div', 'legend-control-container');
//
//             //add temporal legend div to container
//             $(container).append('<div id="temporal-legend">')
//
//             var svg = '<svg id="attribute-legend" width="170px" height="60px">';
//
//             //array of circle names to base loop on
//             var circles = {max:20, mean:40, min:60};
//
//         for (var circle in circles){
//             //circle string
//             svg += '<circle class="legend-circle" id="' + circle + '" fill="#F47821" fill-opacity="0.8" stroke="#000000" cx="30"/>';
//
//             //text string
//             svg += '<text id="' + circle + '-text" x="65" y="' + circles[circle] + '"></text>';
//         };
//
//             //close svg string
//             svg += "</svg>";
//
//             //add attribute legend svg to container
//             $(container).append(svg);
//
//             return container;
//         }
//     });
//
//     map.addControl(new LegendControl());
//     updateLegend(map, attributes[0]);
// };
//
// function updateLegend(map, attribute){
//     //create content for legend
//     var year = attribute.split("_")[1];
//     var content = "Murder Rate in " + attribute;
//
//     //replace legend content
//     $('#temporal-legend').html(content);
//
//     var circleValues = getCircleValues(map, attribute);
//
//     for (var key in circleValues){
//         //get the radius
//         var radius = calcPropRadius(circleValues[key]);
//
//         $('#'+key).attr({
//             cy: 59 - radius,
//             r: radius
//         });
//
//         $('#'+key+'-text').text(Math.round(circleValues[key]*100)/100 + " Murder Rate");
//     };
//
// };
//
// function getCircleValues(map, attribute){
//     //start with min at highest possible and max at lowest possible number
//     var min = Infinity,
//         max = -Infinity;
//
//     map.eachLayer(function(layer){
//         //get the attribute value
//         if (layer.feature){
//             var attributeValue = Number(layer.feature.properties[attribute]);
//
//             //test for min
//             if (attributeValue < min){
//                 min = attributeValue;
//             };
//
//             //test for max
//             if (attributeValue > max){
//                 max = attributeValue;
//             };
//         };
//     });
//
//     //set mean
//     var mean = (max + min) / 2;
//
//     //return values as an object
//     return {
//         max: max,
//         mean: mean,
//         min: min
//     };
// };

$(document).ready(createMap);

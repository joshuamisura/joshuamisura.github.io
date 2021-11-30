//First line of main.js...wrap everything in a self-executing anonymous function to move to local scope
(function(){
  //pseudo-global variables
  var attrArray = ["2017", "2018", "2019", "2020", "2021"]; //list of attributes
  var expressed = attrArray[0]; //initial attribute

  //chart frame dimensions
var chartWidth = window.innerWidth * 0.425,
    chartHeight = 473,
    leftPadding = 25,
    rightPadding = 2,
    topBottomPadding = 5,
    chartInnerWidth = chartWidth - leftPadding - rightPadding,
    chartInnerHeight = chartHeight - topBottomPadding * 2,
    translate = "translate(" + leftPadding + "," + topBottomPadding + ")";

//create a scale to size bars proportionally to frame and for axis
var yScale = d3.scaleLinear()
    .range([463, 0])
    .domain([0, 16]);


window.onload = setMap();

var states;
var csvData;

function setMap(){
  d3.json("data/states.topojson").then(
      (data, error) => {
          if(error){
              console.log(log)
          }else{
              states = topojson.feature(data, data.objects.before_move).features

              d3.csv("data/newstatesData.csv").then(
                  (data, error) => {
                      if(error){
                          console.log(error)
                      }else{
                          csvData = data

                          cback(states,csvData)
                      }
                  }
              )
          }
      }

  )
}

function cback(gStates,gCSV){

      //map frame dimensions
      var width = window.innerWidth * 0.5,
          height = 460;

    //create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection centered on France
    var projection = d3.geoAlbers()
        .center([0, 45])
        .rotate([100, 0])
        .parallels([30, 45])
        .scale(350)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

setGraticule(map, path)
joinData(gStates, csvData)
//create the color scale
var colorScale = makeColorScale(csvData);
setEnumerationUnits(gStates, map, path, colorScale);
//add coordinated visualization to the map
setChart(csvData, colorScale);
createDropdown();

window.add=()=>setGraticule(map, path);
window.remove=()=>map.selectAll(".gratLines").remove();

var zoom = d3.zoom()
      .scaleExtent([1, 6])
      .on('zoom', function() {
          map.selectAll('path')
           .attr('transform', d3.event.transform);
});
map.call(zoom);

}

function setGraticule(map, path){
  //create graticule generator
  var graticule = d3.geoGraticule()
      .step([5, 5]); //place graticule lines every 5 degrees of longitude and latitude
      //create graticule lines
  var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
      .data(graticule.lines()) //bind graticule lines to each element to be created
      .enter() //create an element for each datum
      .append("path") //append each element to the svg as a path element
      .attr("class", "gratLines") //assign class for styling
      .attr("d", path); //project graticule lines

};


function joinData(gStates, csvData){
  //loop through csv to assign each set of csv attribute values to geojson region
  for (var i=0; i<csvData.length; i++){
      var csvRegion = csvData[i]; //the current region
      var csvKey = csvRegion.State; //the CSV primary key

      //loop through geojson regions to find correct region
      for (var a=0; a<gStates.length; a++){

          var geojsonProps = gStates[a].properties; //the current region geojson properties
          var geojsonKey = geojsonProps.STUSPS; //the geojson primary key

          //where primary keys match, transfer csv data to geojson properties object
          if (geojsonKey == csvKey){

              //assign all attributes and values
              attrArray.forEach(function(attr){
                  var val = parseFloat(csvRegion[attr]); //get csv attribute value
                  geojsonProps[attr] = val; //assign attribute and value to geojson properties
              });
          };
      };
  };
    return gStates;
};

function setEnumerationUnits(gStates, map, path, colorScale){
var regions = map.selectAll(".regions")
    .data(gStates)
    .enter()
    .append("path")
    .attr("class", function(d){
        return "regions " + d.properties.STUSPS;
    })
    .attr("d", path)
    .style("fill", function(d){
        return choropleth(d.properties, colorScale);
    })
    .on("mouseover", function(d){
        highlight(d.properties);
    })
    .on("mouseout", function(d){
        dehighlight(d.properties);
    })
    .on("mousemove", moveLabel);
    var desc = regions.append("desc")
    .text('{"stroke": "#000", "stroke-width": "0.5px"}');
};

function makeColorScale(data){
    var colorClasses = [
        "#ffffb2",
        "#fecc5c",
        "#fd8d3c",
        "#f03b20",
        "#bd0026"
    ];

    //create color scale generator
    var colorScale = d3.scaleQuantile()
        .range(colorClasses);

    //build array of all values of the expressed attribute
    var domainArray = [];
    for (var i=0; i<data.length; i++){
        var val = parseFloat(data[i][expressed]);
        domainArray.push(val);
    };

    //assign array of expressed values as scale domain
    colorScale.domain(domainArray);

    return colorScale;
};

function choropleth(props, colorScale){
    //make sure attribute value is a number
    var val = parseFloat(props[expressed]);
    //if attribute value exists, assign a color; otherwise assign gray
    if (typeof val == 'number' && !isNaN(val)){
        return colorScale(val);
    } else {
        return "#CCC";
    };
};

function setChart(csvData, colorScale){

    //create a second svg element to hold the bar chart
    var chart = d3.select("body")
        .append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .attr("class", "chart");

    var bars = chart.selectAll(".bar")
        .data(csvData)
        .enter()
        .append("rect")
        .sort(function(a, b){
            return b[expressed]-a[expressed]
        })
        .attr("class", function(d){
            return "bar " + d.State;
        })
        .attr("width", chartInnerWidth / csvData.length - 1)
        .on("mouseover", highlight)
        .on("mouseout", dehighlight)
        .on("mousemove", moveLabel);

        var desc = bars.append("desc")
            .text('{"stroke": "none", "stroke-width": "0px"}');

    //create a text element for the chart title
    var chartTitle = chart.append("text")
        .attr("x", 40)
        .attr("y", 40)
        .attr("class", "chartTitle")
        .text("Number of Variable " + expressed[3] + " in each region");

    //create vertical axis generator
    var yAxis = d3.axisLeft()
        .scale(yScale)

    //place axis
    var axis = chart.append("g")
        .attr("class", "axis")
        .attr("transform", translate)
        .call(yAxis);

    //create frame for chart border
    var chartFrame = chart.append("rect")
        .attr("class", "chartFrame")
        .attr("width", chartInnerWidth)
        .attr("height", chartInnerHeight)
        .attr("transform", translate);

    updateChart(bars, csvData.length, colorScale);
};

function createDropdown(){
    //add select element
    var dropdown = d3.select("body")
        .append("select")
        .attr("class", "dropdown")
        .on("change", function(){
            changeAttribute(this.value, csvData)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Year");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(attrArray)
        .enter()
        .append("option")
        .attr("value", function(d){ return d })
        .text(function(d){ return d });
};

function changeAttribute(attribute, csvData){
  //change the expressed attribute
  expressed = attribute;

  //recreate the color scale
  var colorScale = makeColorScale(csvData);

  //recolor enumeration units
  var regions = d3.selectAll(".regions")
      .transition()
      .duration(1000)
      .style("fill", function(d){
          return choropleth(d.properties, colorScale)
      });

      var bars = d3.selectAll(".bar")
          //re-sort bars
          .sort(function(a, b){
              return b[expressed] - a[expressed];
          })
          .transition() //add animation
          .delay(function(d, i){
              return i * 20
          })
          .duration(500);

      updateChart(bars, csvData.length, colorScale);

  updateChart(bars, csvData.length, colorScale);
};

function updateChart(bars, n, colorScale){
    //position bars
    bars.attr("x", function(d, i){
            return i * (chartInnerWidth / n) + leftPadding;
        })
        //size/resize bars
        .attr("height", function(d, i){
            return 463 - yScale(parseFloat(d[expressed]));
        })
        .attr("y", function(d, i){
            return yScale(parseFloat(d[expressed])) + topBottomPadding;
        })
        //color/recolor bars
        .style("fill", function(d){
            return choropleth(d, colorScale);
        });
        var chartTitle = d3.select(".chartTitle")
    .text("Percent of Real Estate Value in " + expressed + " by State");
};

function highlight(props){
    setLabel(props)
    //change stroke
    var selected = d3.selectAll("." + props.STUSPS)
        .style("stroke", "blue")
        .style("stroke-width", "2");
};

function dehighlight(props){
  var selected = d3.selectAll("." + props.STUSPS)
      .style("stroke", function(){
          return getStyle(this, "stroke")
      })
      .style("stroke-width", function(){
          return getStyle(this, "stroke-width")
      });

  function getStyle(element, styleName){
      var styleText = d3.select(element)
          .select("desc")
          .text();

      var styleObject = JSON.parse(styleText);

      return styleObject[styleName];
  };
  d3.select(".infolabel")
    .remove();
};

function setLabel(props){
    //label content
    var labelAttribute = "<h1>" + props[expressed] + "%" +
        "</h1><b>" + expressed + "</b>";

    //create info label div
    var infolabel = d3.select("body")
        .append("div")
        .attr("class", "infolabel")
        .attr("id", props.State + "_label")
        .html(labelAttribute);
    var regionName = infolabel.append("div")
        .attr("class", "labelname")
        .html(props.NAME);
};

function moveLabel(){
  //get width of label
  var labelWidth = d3.select(".infolabel")
      .node()
      .getBoundingClientRect()
      .width;

  //use coordinates of mousemove event to set label coordinates
  var x1 = d3.event.clientX + 10,
      y1 = d3.event.clientY - 75,
      x2 = d3.event.clientX - labelWidth - 10,
      y2 = d3.event.clientY + 25;

  //horizontal label coordinate, testing for overflow
  var x = d3.event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1;
  //vertical label coordinate, testing for overflow
  var y = d3.event.clientY < 75 ? y2 : y1;

  d3.select(".infolabel")
      .style("left", x + "px")
      .style("top", y + "px");
};

})();

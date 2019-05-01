var map = d3.json("countries-hires.json");
var data = d3.csv("Happiness.csv");

Promise.all([map,data])
       .then(function(values)
       {
         var geoData = values[0];
         var countries = values[1];

         var countryDict = {};
         countries.forEach(function(country){
           countryDict[country.Country.trim()]=country;
         })
         geoData.features.forEach(function(feature)
       {
         console.log(feature.properties.SOVEREIGNT,
         countryDict[feature.properties.SOVEREIGNT]);
         feature.properties.ABBREV = countryDict[feature.properties.SOVEREIGNT].ABBREV;
       })
     })

var drawMap = function(geoData)
{
  var screen = {
    width:1500,
    height:1000
  }
  var path = d3.geoPath()
               .projection(d3.geoMercator());
  var svg = d3.select("svg")
              .attr("width",screen.width)
              .attr("height",screen.height)

  var country = svg.append("g")
                   .selectAll("g")
                   .data()
  svg.selectAll("path")
     .data(json.features)
     .enter()
     .append("path")
     .attr("d", path);

}

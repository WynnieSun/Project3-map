var map = d3.json("countries-hires.json");
var data = d3.csv("Happiness.csv");

Promise.all([map,data])
       .then(function(values)
       {
         var geoData = values[0];
         var countries = values[1];
         //console.log(geoData)
         var countryDict = {};
         countries.forEach(function(country){
           countryDict[country.Country.trim()]=country;
         })
         //console.log(countryDict)
         geoData.features.forEach(function(feature)
       {
        //console.log(countryDict[feature.properties.SOVEREIGNT])
      //   console.log(feature.properties.NAME);
       feature.properties.data = countryDict[feature.properties.SOVEREIGNT];
       })
        console.log(geoData);

        drawMap(geoData);
     });


var drawMap = function(geoData)
{
  var screen = {
    width:3000,
    height:1500
  }
  var geoGenerator = d3.geoPath()
                       .projection(d3.geoEqualEarth());

  var color = d3.scaleQuantile()
                .range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);

  var svg = d3.select("svg")
              .attr("id","map")
              .attr("width",screen.width)
              .attr("height",screen.height)

  var countries = svg.append("g")
                   .attr("id","countries")
                   .selectAll("g")
                   .data(geoData.features)
                   .enter()
                   .append("g")

  d3.csv("Happiness.csv",function(data){

    color.domain([d3.min(data,function(d){return d.LifeLadder;}),
                  d3.max(data,function(d){return d.LifeLadder})
    ]);

  })


          countries.append("path")
                   .attr("d",geoGenerator)
                   .attr("stroke","black")
                   .attr("fill",function(d){
                     console.log(d)
                     console.log(d.properties.data.LifeLadder);
                     if (d.properties.data.LifeLadder){
                       return color(d.properties.data.LifeLadder);
                     }
                     else{
                       return "#ccc";
                     }
                   });

                   countries.append("text")
                   .attr("x",function(d){
                     return geoGenerator.centroid(d)[0]})
                   .attr("y",function(d){
                     return geoGenerator.centroid(d)[1]})
                  .text(function(d){return d.properties.ABBREV})
                  .attr("font-size","4px")

};

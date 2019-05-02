var map = d3.json("countries-hires.json");
var data18 = d3.csv("Happiness.csv");
var data17 = d3.csv("Happiness2017.csv");
var data16 = d3.csv("Happiness2016.csv");
var data15 = d3.csv("Happiness2015.csv");
//console.log(data18);

Promise.all([map,data18,data17,data16,data15])
       .then(function(values)
       {
         //console.log(values);
         var geoData = values[0];
         var countries18 = values[1];
         var countries17 = values[2];
         var countries16 = values[3];
         var countries15 = values[4];
         //console.log(geoData)
         var countryDict18 = {};
         countries18.forEach(function(country){

           countryDict18[country.Country.trim()]=country;
         });
         var countryDict17 = {};
         countries17.forEach(function(country){

           countryDict17[country.Country.trim()]=country;
         });
         //console.log(countryDict17);
         var countryDict16 = {};
         countries16.forEach(function(country){

           countryDict16[country.Country.trim()]=country;
         });
         var countryDict15 = {};
         countries15.forEach(function(country){

           countryDict15[country.Country.trim()]=country;
         })
        // console.log(countryDict18)
        //bind data with country info
          geoData.features.forEach(function(feature)
         {
         feature.properties.data18 = countryDict18[feature.properties.SOVEREIGNT];
         feature.properties.data17 = countryDict17[feature.properties.SOVEREIGNT];
         feature.properties.data16 = countryDict16[feature.properties.SOVEREIGNT];
         feature.properties.data15 = countryDict15[feature.properties.SOVEREIGNT];
         })
          console.log(geoData);

        drawMap(2015,geoData);

     });

//////////initial slider////////////
var slider = d3.select(".slider")
               .append("input")
               .attr("min", 2015)
               .attr("max", 2018)
               .attr("step", 1)
               .property("value", 2015);

             d3.select(".year")
               .text(2015)

///////////function draw map////////
var drawMap = function(year,geoData)
{

  var screen = {
    width:1000,
    height:500
  }

var geoGenerator = d3.geoPath()
                     .projection(d3.geoEqualEarth());

var tooltip = d3.select("body")
                .append("div")
               	.attr("class", "tooltip")
             	  .style("opacity", 0);

//////////color scale///////////
var color = d3.scaleThreshold()
  .domain([2,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9])
  .range(["#ec7014","#fe9929","#fec44f","#fee391","#fff7bc","#e8f6e2","#ceecca","#b8e3b6",
  "#9ad8bb","#cce9ef","#b2dbea","#96c8e0","#6da3cc","#ccc"])
var legendText = [2,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,"Undefined"];
var legendColors = ["#ec7014","#fe9929","#fec44f","#fee391","#fff7bc","#e8f6e2","#ceecca",
  "#b8e3b6","#9ad8bb","#cce9ef","#b2dbea","#96c8e0","#6da3cc","#ccc"];

//////////draw area///////////////
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
                   .attr("transform","translate(0,40)")

  // d3.csv("Happiness.csv",function(data){
  //
  //   color.domain([d3.min(data,function(d){return d.LifeLadder;}),
  //                 d3.max(data,function(d){return d.LifeLadder})
  //   ]);
  //})

          countries.append("path")
                   .attr("d",geoGenerator)
                   .attr("id", function(d){
                     return d.properties.SOVEREIGNT
                   })
                   .attr("stroke","black")
                   .attr("stroke-width", 0.5)
                   .attr("fill",function(d){
                   if (year == 2018){
                     if (d.properties.data18.LifeLadder){

                       return color(d.properties.data18.LifeLadder);
                     }
                     else{
                       return "#ccc";
                     }}
                    else if (year == 2017){
                       if (d.properties.data17.LifeLadder){
                         return color(d.properties.data17.LifeLadder);
                       }
                       else{
                         return "#ccc";
                       }}
                      else if (year == 2016){
                         if (d.properties.data16.LifeLadder){
                           return color(d.properties.data16.LifeLadder);
                         }
                         else{
                           return "#ccc";
                         }}
                        else{
                           if (d.properties.data15.LifeLadder){
                             return color(d.properties.data15.LifeLadder);
                           }
                           else{
                             return "#ccc";
                           }}
                   })
                   .attr("opacity",0.8)
/////////////change when mouseover and mouseout
                   .on("mouseover", function(d){
                     // d3.select(this.parentNode)
                     //   .append("text")
                     //   .attr("id","nameLabel")
                     //   .attr("opacity",1)
                     //   .text(function(d){
                     //     var happinessIndex = parseFloat(d.properties.data.LifeLadder).toFixed(2)
                     //     return d.properties.SOVEREIGNT + ":" + happinessIndex})
                     //   .attr("stroke","orange")
                     //   .attr("font-size","14px")
                     //   .attr("x",function(d){
                     //     return geoGenerator.centroid(d)[0] - 10})
                     //   .attr("y",function(d){
                     //     return geoGenerator.centroid(d)[1] + 5})

                    d3.select(this)
                      .attr("opacity",1)
                      .attr("stroke-width", 1);

                })
                .on("mouseout", function(d){
                  // d3.select(this.parentNode)
                  //   .selectAll("#nameLabel")
                  //   .remove()

                d3.select(this)
                  .attr("opacity",0.8)
                  .attr("stroke-width", 0.5);
             })

//////////////tooltip///////////////
        	countries.on("mouseover", function(d) {
             			tooltip.transition()
             			.duration(250)
             			.style("opacity", 1);
              if (year == 2018){
                  if (d.properties.data18.LifeLadder == "Undefined"){
                    var happinessIndex = d.properties.data18.LifeLadder
                  }
                  else{
                  var happinessIndex = parseFloat(d.properties.data18.LifeLadder).toFixed(2)
                }

             			tooltip.html(
             			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                  "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
             			"<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                )}
              else if (year == 2017){
                if (d.properties.data17.LifeLadder == "Undefined"){
                  var happinessIndex = d.properties.data17.LifeLadder
                }
                else{
                var happinessIndex = parseFloat(d.properties.data17.LifeLadder).toFixed(2)
              }

                tooltip.html(
                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
              )}
            else if (year == 2016){
              if (d.properties.data16.LifeLadder == "Undefined"){
                var happinessIndex = d.properties.data16.LifeLadder
              }
              else{
              var happinessIndex = parseFloat(d.properties.data16.LifeLadder).toFixed(2)
            }

              tooltip.html(
              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
              "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
              "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
            )}
          else {
            if (d.properties.data15.LifeLadder == "Undefined"){
              var happinessIndex = d.properties.data15.LifeLadder
            }
            else{
            var happinessIndex = parseFloat(d.properties.data15.LifeLadder).toFixed(2)
          }

            tooltip.html(
            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
            "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
            "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
          )}

              	tooltip.style("left", (d3.event.pageX + 15) + "px")
             			     .style("top", (d3.event.pageY - 28) + "px");
             		})


             		  .on("mouseout", function(d) {
             			tooltip.transition()
             			.duration(250)
             			.style("opacity", 0);
             		});
///////////legend////////////////
          var legend = svg.append("g")
                		.attr("id", "legend")
                    .attr("transform","translate(0,-15)")

        	var legenditem = legend.selectAll(".legenditem")
                		.data(d3.range(14))
                		.enter()
                		.append("g")
                		.attr("class", "legenditem")
                		.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

        	legenditem.append("rect")
                		.attr("x", 800 - 240)
                		.attr("y", 40)
                		.attr("width", 30)
                		.attr("height", 7)
                		.attr("class", "rect")
                		.style("fill", function(d, i) { return legendColors[i]; });

        	legenditem.append("text")
                		.attr("x", 560)
                		.attr("y", 30)
                		.style("text-anchor", "middle")
                		.text(function(d, i) { return legendText[i]; });

//};

///////////update
         var update = function(year){
                	slider.property("value", year);
                  		d3.select(".year")
                        .text(year)
                  		drawMap(year,geoData);
                  	}
         // var slider = d3.select(".slider")
         //          		   .append("input")
                  slider.attr("type", "range")
                  			.attr("min", 2015)
                  			.attr("max", 2018)
                  			.attr("step", 1)
                  			.on("input", function() {
                  				var year = this.value;

                  				update(year);
                  			});


 };

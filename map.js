var map = d3.json("countries-hires.json");
var data18 = d3.csv("Happiness.csv");
var data17 = d3.csv("Happiness2017.csv");
var data16 = d3.csv("Happiness2016.csv");
var data15 = d3.csv("Happiness2015.csv");
var crime = d3.csv("Crime Index.csv");
var un18 = d3.csv("unemR18.csv");
var un17 = d3.csv("unemR17.csv");
var un16 = d3.csv("unemR16.csv");
var un15 = d3.csv("unemR15.csv");
var gps = d3.csv("GPS.csv");
var neutral = d3.csv("neutral country.csv");
var death = d3.csv("massive death.csv");
//console.log(data18);

Promise.all([map,data18,data17,data16,data15,crime,un18,un17,un16,un15,gps,neutral,death])
       .then(function(values)
       {
         //console.log(values);
         var geoData = values[0];
         var countries18 = values[1];
         var countries17 = values[2];
         var countries16 = values[3];
         var countries15 = values[4];
         var crime = values[5];
         var unem18 = values[6];
         var unem17 = values[7];
         var unem16 = values[8];
         var unem15 = values[9];
         var gps = values[10];
         var neutralC = values[11];
         var death = values[12];
         //console.log(geoData)
         //console.log(unem16);

//////////////dictionary///////////
/////Happiness index
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

//////////Unemployment rate////////////////
         var unDict18 = {};
         unem18.forEach(function(country){

           unDict18[country.Country.trim()]=country;
         });
         var unDict17 = {};
         unem17.forEach(function(country){

           unDict17[country.Country.trim()]=country;
         });
         var unDict16 = {};
         unem16.forEach(function(country){

           unDict16[country.Country.trim()]=country;
         });
         var unDict15 = {};
         unem15.forEach(function(country){

           unDict15[country.Country.trim()]=country;
         });

//////////////gps/////////////
var gpsDict= {};
gps.forEach(function(country){
  gpsDict[country.name.trim()]=country;
});

////////////Crime Index///////
var crimeDict= {};
crime.forEach(function(country){
  crimeDict[country.Country.trim()]=country;
});

///////////neutral country////////
var neutralDict= {};
neutralC.forEach(function(country){
  neutralDict[country.Country.trim()]=country;
});

/////////////massive death////////
var deathDict= {};
death.forEach(function(country){
  deathDict[country.Country.trim()]=country;
});


        //console.log(crimeDict);
        //console.log(gpsDict)
        // console.log(countryDict18)
        //console.log(unDict15)
        //bind data with country info
          geoData.features.forEach(function(feature)
         {
         feature.properties.data18 = countryDict18[feature.properties.SOVEREIGNT];
         feature.properties.data17 = countryDict17[feature.properties.SOVEREIGNT];
         feature.properties.data16 = countryDict16[feature.properties.SOVEREIGNT];
         feature.properties.data15 = countryDict15[feature.properties.SOVEREIGNT];
         feature.properties.UR18 = unDict18[feature.properties.SOVEREIGNT];
         feature.properties.UR17 = unDict17[feature.properties.SOVEREIGNT];
         feature.properties.UR16 = unDict16[feature.properties.SOVEREIGNT];
         feature.properties.UR15 = unDict15[feature.properties.SOVEREIGNT];
         feature.properties.GPS = gpsDict[feature.properties.SOVEREIGNT];
         feature.properties.crime = crimeDict[feature.properties.SOVEREIGNT];
         feature.properties.neutral = neutralDict[feature.properties.SOVEREIGNT];
         feature.properties.death = deathDict[feature.properties.SOVEREIGNT];
         })
        console.log(geoData);

        drawMap(2015,geoData);

     });

//////////initial////////////
var screen = {
  width:1500,
  height:1000
}
///////////svg///////////
var svg = d3.select("svg")
            .attr("id","map")
            .attr("width",screen.width+500)
            .attr("height",screen.height+300)

/////////////slider////////////
var slider = d3.select(".slider")
               .append("input")
               .attr("min", 2015)
               .attr("max", 2018)
               .attr("step", 1)
               .property("value", 2015);
             d3.select(".year")
               .text(2015)

//////////////main legend//////////
               var legend = svg.append("g")
                     		.attr("id", "mainlegend")
                        .attr("transform","translate(280,20)")
                  legend.append("g")
                        .append("text")
                        .text("Happiness Index")
                        .attr("font-size","20px")
                        .attr("transform","translate(1260,-5)")

             	var legenditem = legend.selectAll(".legenditem")
                     		.data(d3.range(14))
                     		.enter()
                     		.append("g")
                     		.attr("class", "legenditem")
                     		.attr("transform", function(d, i) { return "translate(" + (i * 31+700) + ",0)"; });

                        legenditem.append("rect")
                                  .attr("id","mainR")

                      	legenditem.append("text")
                                  .attr("id","mainT")

//////////triLegend//////
var triLegend = svg.append("g")
          .attr("id", "trilegend")
          .attr("transform","translate(0,-15)")

///////////diaLegend////////
var diaLegend = svg.append("g")
          .attr("id", "dialegend")
          .attr("transform","translate(0,-15)")

////////////interactive legend - tri////////
var inter_tri = svg.append("g")
                   .attr("transform","translate(690,5)")
    inter_tri.attr("class","inter_tri")
          .append("rect")
          .attr("x",850)
          .attr("y",85)
          .attr("width",20)
          .attr("height",20)
          .attr("fill","#b8e186")
    inter_tri.append("text")
          .text( "Log GDP per Capita")
          .attr("x",890)
          .attr("y",100)
          .attr("font-size","20px")

////////////interactive legend - dia////////
var inter_dia = svg.append("g")
                   .attr("transform","translate(690,5)")
    inter_dia.attr("class","inter_dia")
          .append("rect")
          .attr("x",850)
          .attr("y",180)
          .attr("width",20)
          .attr("height",20)
          .attr("fill","#bcbddc")
    inter_dia.append("text")
          .text( "Healthy life expectancy at birth")
          .attr("x",890)
          .attr("y",200)
          .attr("font-size","20px")

///////////interactive legend - ur/////////
var inter_ur= svg.append("g")
                   .attr("transform","translate(690,5)")
    inter_ur.attr("class","inter_ur")
          .append("rect")
          .attr("x",850)
          .attr("y",285)
          .attr("width",20)
          .attr("height",20)
          .attr("fill","orange")
    inter_ur.append("text")
          .text( "Unemployment Rate")
          .attr("x",890)
          .attr("y",305)
          .attr("font-size","20px")

////////////interactive legend - ci///////
var inter_ci= svg.append("g")
                   .attr("transform","translate(690,5)")
    inter_ci.attr("class","inter_ci")
          .append("rect")
          .attr("x",850)
          .attr("y",320)
          .attr("width",20)
          .attr("height",20)
          .attr("fill","#ef3b2c")
    inter_ci.append("text")
          .text( "Crime Index")
          .attr("x",890)
          .attr("y",340)
          .attr("font-size","20px")

////////////interactive legend - star///////
var inter_star= svg.append("g")
                   .attr("transform","translate(690,5)")
    inter_star.attr("class","inter_star")
          .append("rect")
          .attr("x",850)
          .attr("y",355)
          .attr("width",20)
          .attr("height",20)
          .attr("fill","#92c5de")
    inter_star.append("text")
          .text("Neutral Country")
          .attr("x",890)
          .attr("y",375)
          .attr("font-size","20px")

//////////////interactive legend - death///////
var inter_death= svg.append("g")
                   .attr("transform","translate(690,5)")
    inter_death.attr("class","inter_death")
          .append("rect")
          .attr("x",850)
          .attr("y",390)
          .attr("width",20)
          .attr("height",20)
          .attr("fill","black")
    inter_death.append("text")
          .text("Massive Death")
          .attr("x",890)
          .attr("y",410)
          .attr("font-size","20px")

///////////function draw map////////
var drawMap = function(year,geoData)
{

////////projection//////////
var projection = d3.geoEqualEarth()
                   .translate([screen.width/2,screen.height/2])
                   .scale([300]);
var geoGenerator = d3.geoPath()
                     .projection(projection)

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

  var countries = svg.append("g")
                   .attr("id","countries")
                   .selectAll("g")
                   .data(geoData.features)
                   .enter()
                   .append("g")
                   .attr("transform","translate(-80,60)")
                   .attr('transform', "translate("+(20)+","+(-20)+")")

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
                   .attr("opacity",1)
/////////////change when mouseover and mouseout//////////////
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
            //console.log(triDataX)
            //console.log(triDataY)
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
                  .attr("opacity",1)
                  .attr("stroke-width", 0.5);
             })

///////////centroid///////////
             var triDataX = geoData.features.map(function(d){
                return geoGenerator.centroid(d)[0] - 10})
             var triDataY = geoData.features.map(function(d){
                return geoGenerator.centroid(d)[1] +5})

////////////mouseover and mouseout///////////
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
                if (d.properties.death.D2018 == ""){
                  if(d.properties.neutral.neutral == ""){
             			tooltip.html(
             			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                  "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
             			"<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                )
               }
               else{
                 tooltip.html(
                 "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                 "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                 "<p><strong>" + "Neutral Country" + "</strong></p>" +
                 "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
               )
             }}
             else{
               if(d.properties.neutral.neutral == ""){
                tooltip.html(
                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                "<p><strong>" + d.properties.death.D2018 + "</strong></p>" +
                "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
             )
            }
            else{
              tooltip.html(
              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
              "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
              "<p><strong>" + "Neutral Country" + "</strong></p>" +
              "<p><strong>" + d.properties.death.D2018 + "</strong></p>" +
              "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
            )
          }}
           }

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
//2015
          else {
            if (d.properties.data15.LifeLadder == "Undefined"){
              var happinessIndex = d.properties.data15.LifeLadder
            }
            else{
              var happinessIndex = parseFloat(d.properties.data15.LifeLadder).toFixed(2)
          }

          if (d.properties.death.D2015 == ""){
            if(d.properties.neutral.neutral == ""){
            tooltip.html(
            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
            "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
            "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
          )
         }
           else{
           tooltip.html(
           "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
           "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
           "<p><strong>" + "Neutral Country" + "</strong></p>" +
           "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
         )
       }}
       else{
         if(d.properties.neutral.neutral == ""){
          tooltip.html(
          "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
          "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
          "<p><strong>" + d.properties.death.D2015 + "</strong></p>" +
          "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
       )
      }
         else{
        tooltip.html(
        "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
        "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
        "<p><strong>" + "Neutral Country" + "</strong></p>" +
        "<p><strong>" + d.properties.death.D2015 + "</strong></p>" +
        "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
      )
    }}
     }

              	tooltip.style("left", (d3.event.pageX + 15) + "px")
             			     .style("top", (d3.event.pageY - 28) + "px");
             		})


             		  .on("mouseout", function(d) {
         	 tooltip.transition()
             			.duration(250)
             			.style("opacity", 0);
             		});

///////////main legend////////////////

        	legenditem.select("#mainR")
                		.attr("x", 800 - 240)
                		.attr("y", 40)
                		.attr("width", 30)
                		.attr("height", 7)
                		.attr("class", "rect")
                		.style("fill", function(d, i) { return legendColors[i]; });

        	legenditem.select("#mainT")
                		.attr("x", 560)
                		.attr("y", 30)
                		.style("text-anchor", "middle")
                		.text(function(d, i) { return legendText[i]; });


///////////update///////////////
         var update = function(year){

                	slider.property("value", year);
                  		d3.select(".year")
                        .text(year)

                  		updateMap(year,geoData);
                  	}

                  slider.attr("type", "range")
                  			.attr("min", 2015)
                  			.attr("max", 2018)
                  			.attr("step", 1)
                  			.on("input", function() {
                  				var year = this.value;

                        //(".unemployment").remove()
                  				update(year);
                  			});

////////////////GDP///////////////
inter_tri.on("click",function(){
       currentOpacity1 = d3.selectAll(".inter_tri").style("opacity")
       currentOpacity = d3.selectAll(".gdp").style("opacity")
       // Change the opacity: from 0 to 1 or from 1 to 0
       d3.selectAll(".gdp").transition().style("opacity", currentOpacity == 1 ? 0:1)
       d3.selectAll(".inter_tri").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)
       if (currentOpacity == 1){
         d3.select(".gdp").attr("pointer-events", "none");
       }
       else{
         d3.select(".gdp").attr("pointer-events", "auto");
       }
            })
////////draw triangle//////////////
////////minor tooltip////////////
var tooltipOther = d3.select("body")
                .append("div")
               	.attr("class", "tooltipOther")
             	  .style("opacity", 0);

                    var triangle = d3.symbol()
                                .type(d3.symbolTriangle)
                                .size([50])//function(d){ return scale(d.properties.dataGDP15.gdp); });

                    var scale = d3.scaleLinear()
                                  .domain([1,242])
                                  .range([10,900]);

      var triColors = d3.scaleThreshold()
                        .domain([6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11])
                        .range(["#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf",
                        "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"]);

      var triLegendText = [6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5];

      var triLegendColors = ["#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf",
                        "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"];

      var group = svg.append('g')
                     .attr("id","gdp")
                     .classed("gdp",true);

/////////////variable - gdp//////////////
/////15/////
                          var triData15 = geoData.features.map(function(d){

                            if(d.properties.data15.Log_GDP_per_capita != ""){
                              var gdpNum = parseFloat(d.properties.data15.Log_GDP_per_capita).toFixed(2)}
                            else{
                              var gdpNum = 1}  //"Undefined"

                           return {
                                   sovereignty:d.properties.SOVEREIGNT,
                                   gdp:gdpNum
                                  }
                            })
                            var gdpDict15 = {};
                            triData15.forEach(function(country){

                              gdpDict15[country.sovereignty.trim()]=country;
                            });
////////16//////////
                            var triData16 = geoData.features.map(function(d){

                              if(d.properties.data16.Log_GDP_per_capita != ""){
                                var gdpNum = parseFloat(d.properties.data16.Log_GDP_per_capita).toFixed(2)}
                              else{
                                var gdpNum = 1}  //"Undefined"

                             return {
                                     sovereignty:d.properties.SOVEREIGNT,
                                     gdp:gdpNum
                                    }
                              })
                              var gdpDict16 = {};
                              triData16.forEach(function(country){
                                gdpDict16[country.sovereignty.trim()]=country;
                              });
/////////17/////////
var triData17 = geoData.features.map(function(d){

  if(d.properties.data17.Log_GDP_per_capita != ""){
    var gdpNum = parseFloat(d.properties.data17.Log_GDP_per_capita).toFixed(2)}
  else{
    var gdpNum = 1}  //"Undefined"

 return {
         sovereignty:d.properties.SOVEREIGNT,
         gdp:gdpNum
        }
  })
  var gdpDict17 = {};
  triData17.forEach(function(country){
    gdpDict17[country.sovereignty.trim()]=country;
  });

///////////18////////
var triData18 = geoData.features.map(function(d){

  if(d.properties.data18.Log_GDP_per_capita != ""){
    var gdpNum = parseFloat(d.properties.data18.Log_GDP_per_capita).toFixed(2)}
  else{
    var gdpNum = 1}  //"Undefined"

 return {
         sovereignty:d.properties.SOVEREIGNT,
         gdp:gdpNum
        }
  })
  var gdpDict18 = {};
  triData18.forEach(function(country){
    gdpDict18[country.sovereignty.trim()]=country;
  });
///////////bind data///////////
                          geoData.features.forEach(function(feature)
                           {
                           feature.properties.dataGDP18 = gdpDict18[feature.properties.SOVEREIGNT];
                           feature.properties.dataGDP17 = gdpDict17[feature.properties.SOVEREIGNT];
                           feature.properties.dataGDP16 = gdpDict16[feature.properties.SOVEREIGNT];
                           feature.properties.dataGDP15 = gdpDict15[feature.properties.SOVEREIGNT];
                           })

                           //console.log(geoData);
                           console.log(year);

                          var line = group.selectAll('path')
                              //.classed("gdp",true)
                              .data(geoData.features) //joint data
                              .enter()
                              .append('path')
                              .attr('d', triangle)
                              .attr("opacity",1)
                              .attr('fill',function(d){
                                if(year == 2015){
                                if (d.properties.dataGDP15.gdp == 1){
                                  return "#ccc"
                                }
                                else{
                                return triColors(d.properties.dataGDP15.gdp)}
                              }
                              else if(year == 2016){
                              if (d.properties.dataGDP16.gdp == 1){
                                return "#ccc"
                              }
                              else{
                              return triColors(d.properties.dataGDP16.gdp)}
                            }
                            else if(year == 2017){
                            if (d.properties.dataGDP17.gdp == 1){
                              return "#ccc"
                            }
                            else{
                            return triColors(d.properties.dataGDP17.gdp)}
                          }
                          else{
                          if (d.properties.dataGDP18.gdp == 1){
                            return "#ccc"
                          }
                          else{
                          return triColors(d.properties.dataGDP18.gdp)}
                        }
                              })
                              .attr('stroke','#000')
                              .attr('stroke-width',1)
                              .attr('transform',function(d,i){ return "translate("+(triDataX[i]+35)+","+(triDataY[i]-25)+")"; })
                              // .on("mouseover", function(d){
                              //   d3.select(this.parentNode)
                              //   console.log(this.parentNode)
                              //    svg.append("text")
                              //    .attr("id","gdpLabel")
                              //    .attr("opacity",1)
                              //    .text(function(){
                              //      if(year == 2015){
                              //      console.log(d.properties.dataGDP15.sovereignty + d.properties.dataGDP15.gdp)}
                              //      else if(year == 2016){
                              //      console.log(d.properties.dataGDP16.sovereignty + d.properties.dataGDP16.gdp)}
                              //      else if(year == 2017){
                              //      console.log(d.properties.dataGDP17.sovereignty + d.properties.dataGDP17.gdp)}
                              //      else{
                              //      console.log(d.properties.dataGDP18.sovereignty + d.properties.dataGDP18.gdp)}
                              //
                              //      return d.properties.dataGDP15.gdp})
                              //   .attr('transform',function(d,i){ return "translate("+(triDataX[i]-10)+","+(triDataY[i]+5)+")"; })
                              //
                              // })


//////////////tooltip///////////////
  line.on("mouseover", function(d) {
       tooltipOther.transition()
             			 .duration(250)
             			 .style("opacity", 1);
              if (year == 2018){
                  if (d.properties.dataGDP18.gdp == 1){
                    var gdp = "Undefined"
                  }
                  else{
                  var gdp = d.properties.dataGDP18.gdp
                }

             			tooltipOther.html(
             			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                  "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
             			"<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
                )}
              else if (year == 2017){
                if (d.properties.dataGDP17.gdp == 1){
                  var gdp = "Undefined"
                }
                else{
                var gdp = d.properties.dataGDP17.gdp
              }

                tooltipOther.html(
                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                "<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
              )}
            else if (year == 2016){
              if (d.properties.dataGDP16.gdp == 1){
                var gdp = "Undefined"
              }
              else{
              var gdp = d.properties.dataGDP16.gdp
            }

              tooltipOther.html(
              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
              "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
              "<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
            )}
          else {
            if (d.properties.dataGDP15.gdp == 1){
              var gdp = "Undefined"
            }
            else{
            var gdp = d.properties.dataGDP15.gdp
          }

            tooltipOther.html(
            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
            "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
            "<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
          )}

              	tooltipOther.style("left", (50) + "px")
             			     .style("top", (650) + "px");
             		})


  .on("mouseout", function(d) {
      tooltipOther.transition()
             			.duration(250)
             			.style("opacity", 0);
             		});

///////////trilegend////////////////
                                      	var triLegenditem = triLegend.selectAll(".trilegenditem")
                                              		.data(d3.range(12))
                                              		.enter()
                                              		.append("g")
                                              		.attr("class", "trilegenditem")
                                              		.attr("transform", function(d, i) { return "translate(" + (i * 31 + 700) + ",0)"; });


                                                  var arc = d3.symbol()
                                                            .type(d3.symbolTriangle)
                                                  					.size(function(d){ return scale(d); });

                                                  		var dataTriLegend = [1,1,1,1,1,1,1,1,1,1,1,1];

                                                  		var scale = d3.scaleLinear()
                                                  						.domain([1,6])
                                                  						.range([100,1000]);

                                                  		var group = svg.append('g')
                                                  					.attr('transform','translate('+ 200 +','+ 200 +')');

                                                  		var line = group.selectAll('path')
                                                  				.data(dataTriLegend)
                                                  				.enter()
                                                  				.append('path')
                                                  				.attr('d',arc)
                                                  				.attr('fill',function(d, i) { return triLegendColors[i]; })
                                                  				.attr('stroke','#000')
                                                  				.attr('stroke-width',1)
                                                  				.attr('transform',function(d,i){ return "translate("+(i*31+1355)+","+(-40)+")"; });

                                      	// triLegenditem.append("rect")
                                        //       		.attr("x", 800 - 240)
                                        //       		.attr("y", 100)
                                        //       		.attr("width", 30)
                                        //       		.attr("height", 7)
                                        //       		.attr("class", "rect")
                                        //       		.style("fill", function(d, i) { return triLegendColors[i]; });

                                      	triLegenditem.append("text")
                                              		.attr("x", 840)
                                              		.attr("y", 160)
                                              		.style("text-anchor", "middle")
                                              		.text(function(d, i) { return triLegendText[i]; });

/////////////////Unemployment Rate//////////////
var tooltipOther2 = d3.select("body")
                .append("div")
               	.attr("class", "tooltipOther2")
             	  .style("opacity", 0);

var groupUR = svg.append('g')
                 .attr("id","unemployment")
                 .classed("unemployment",true);

groupUR.selectAll("circle")
       .data(geoData.features)
       .enter()
       .append("circle")
       .attr("cx",function(d){
         //console.log(d.properties);
         //console.log(d.properties.GPS.longitude);
         return (d.properties.GPS.longitude*0.08) //* 4.2) //zhai
       })
       .attr("cy",function(d){
         return -(d.properties.GPS.latitude*0.15) //* 5.5) //gao
       })
       .attr("r", function(d){
         if (year == 2015){
         if (d.properties.UR15.UnemploymentRate != "Undefined"){
         return Math.sqrt(parseInt(d.properties.UR15.UnemploymentRate*20))}
         else{
           return 0
         }
       }
       else if (year == 2016){
       if (d.properties.UR16.UnemploymentRate != "Undefined"){
       return Math.sqrt(parseInt(d.properties.UR16.UnemploymentRate*20))}
       else{
         return 0
       }
     }
     else if (year == 2017){
     if (d.properties.UR17.UnemploymentRate != "Undefined"){
     return Math.sqrt(parseInt(d.properties.UR17.UnemploymentRate*20))}
     else{
       return 0
     }
   }
   else{
   if (d.properties.UR18.UnemploymentRate != "Undefined"){
   return Math.sqrt(parseInt(d.properties.UR18.UnemploymentRate*20))}
   else{
     return 0
   }
 }
       })
       .attr("fill", "orange")
       .attr("opacity",0.5)
//       .attr("transform","translate(760,475)")
       .attr('transform',function(d,i){ return "translate("+(triDataX[i]+35)+","+(triDataY[i]-25)+")"; })

       .on("mouseover", function(d){
         //console.log(d.properties.GPS)
              tooltipOther2.transition()
                           .duration(250)
                           .style("opacity", 1);
                     if (year == 2015){
                         if (d.properties.UR15.UnemploymentRate == "Undefined"){
                           var ur = "Undefined"
                         }
                         else{
                         var ur = d.properties.UR15.UnemploymentRate
                       }

                          tooltipOther2.html(
                          "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                         "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                          "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                       )}
                       else if (year == 2016){
                           if (d.properties.UR16.UnemploymentRate == "Undefined"){
                             var ur = "Undefined"
                           }
                           else{
                           var ur = d.properties.UR16.UnemploymentRate
                         }

                            tooltipOther2.html(
                            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                           "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                            "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                         )}
                         else if (year == 2017){
                             if (d.properties.UR17.UnemploymentRate == "Undefined"){
                               var ur = "Undefined"
                             }
                             else{
                             var ur = d.properties.UR17.UnemploymentRate
                           }

                              tooltipOther2.html(
                              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                             "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                              "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                           )}
                           else{
                               if (d.properties.UR18.UnemploymentRate == "Undefined"){
                                 var ur = "Undefined"
                               }
                               else{
                               var ur = d.properties.UR18.UnemploymentRate
                             }

                                tooltipOther2.html(
                                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                               "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                                "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                             )}

                        tooltipOther2.style("left", (50) + "px")
                          			     .style("top", (650) + "px");

       })
       .on("mouseout", function(d) {
             tooltipOther2.transition()
                    			.duration(250)
                    			.style("opacity", 0);
                    		});

///////UR////////
inter_ur.on("click",function(){
       currentOpacity1 = d3.selectAll(".inter_ur").style("opacity")
       currentOpacity = d3.selectAll(".unemployment").style("opacity")
       // Change the opacity: from 0 to 1 or from 1 to 0
       d3.selectAll(".unemployment").transition().style("opacity", currentOpacity == 1 ? 0:1)
       d3.selectAll(".inter_ur").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

       if (currentOpacity == 1){
         d3.select(".unemployment").attr("pointer-events", "none");
       }
       else{
         d3.select(".unemployment").attr("pointer-events", "auto");
       }

      })

///////////////crime index//////////
var tooltipOther3 = d3.select("body")
                .append("div")
               	.attr("class", "tooltipOther3")
             	  .style("opacity", 0);

var groupCI = svg.append('g')
                 .attr("id","crime")
                 .classed("crime",true);

groupCI.selectAll("circle")
       .data(geoData.features)
       .enter()
       .append("circle")
       .attr("cx",function(d){
         //console.log(d.properties);
         //console.log(d.properties.GPS.longitude);
         return (d.properties.GPS.longitude*0.08) //* 4.2) //zhai
       })
       .attr("cy",function(d){
         return -(d.properties.GPS.latitude*0.15) //* 5.5) //gao
       })
       .attr("r", function(d){
         if (year == 2015){
         if (d.properties.crime.CrimeIndex_15 != "Undefined"){
         return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_15*5))}
         else{
           return 0
         }
       }
       else if (year == 2016){
       if (d.properties.crime.CrimeIndex_16 != "Undefined"){
       return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_16*5))}
       else{
         return 0
       }
     }
     else if (year == 2017){
     if (d.properties.crime.CrimeIndex_17 != "Undefined"){
     return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_17*5))}
     else{
       return 0
     }
   }
   else{
   if (d.properties.crime.CrimeIndex_18 != "Undefined"){
   return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_18*5))}
   else{
     return 0
   }
 }
       })
       .attr("fill", "red")
       .attr("opacity",0.5)
//       .attr("transform","translate(760,475)")
       .attr('transform',function(d,i){ return "translate("+(triDataX[i]+30)+","+(triDataY[i]-20)+")"; })

       .on("mouseover", function(d){
         //console.log(d.properties.GPS)
              tooltipOther3.transition()
                           .duration(250)
                           .style("opacity", 1);
                     if (year == 2015){
                         if (d.properties.crime.CrimeIndex_15 == "Undefined"){
                           var ci = "Undefined"
                         }
                         else{
                         var ci = d.properties.crime.CrimeIndex_15
                       }

                          tooltipOther3.html(
                          "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                         "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                          "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                       )}
                       else if (year == 2016){
                           if (d.properties.crime.CrimeIndex_16 == "Undefined"){
                             var ci = "Undefined"
                           }
                           else{
                           var ci = d.properties.crime.CrimeIndex_16
                         }

                            tooltipOther3.html(
                            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                           "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                            "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                         )}
                         else if (year == 2017){
                             if (d.properties.crime.CrimeIndex_17 == "Undefined"){
                               var ci = "Undefined"
                             }
                             else{
                             var ci = d.properties.crime.CrimeIndex_17
                           }

                              tooltipOther3.html(
                              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                             "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                              "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                           )}
                           else{
                               if (d.properties.crime.CrimeIndex_18 == "Undefined"){
                                 var ci = "Undefined"
                               }
                               else{
                               var ci = d.properties.crime.CrimeIndex_18
                             }

                                tooltipOther3.html(
                                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                               "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                                "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                             )}

                        tooltipOther3.style("left", (50) + "px")
                          			     .style("top", (650) + "px");

       })
       .on("mouseout", function(d) {
             tooltipOther3.transition()
                    			.duration(250)
                    			.style("opacity", 0);
                    		});
/////////Crime Index///////////
////////////////GDP///////////////
inter_ci.on("click",function(){
       currentOpacity1 = d3.selectAll(".inter_ci").style("opacity")
       currentOpacity = d3.selectAll(".crime").style("opacity")
       // Change the opacity: from 0 to 1 or from 1 to 0
       d3.selectAll(".crime").transition().style("opacity", currentOpacity == 1 ? 0:1)
       d3.selectAll(".inter_ci").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

       if (currentOpacity == 1){
         d3.select(".crime").attr("pointer-events", "none");
       }
       else{
         d3.select(".crime").attr("pointer-events", "auto");
       }

      })

/////////////life expectancy////////
var tooltipOther4 = d3.select("body")
                .append("div")
                .attr("class","tooltipOther4")
             	  .style("opacity", 0);

var diamond = d3.symbol()
            .type(d3.symbolDiamond)
            .size([50])//function(d){ return scale(d.properties.data15.Healthy_life_expectancy_at_birth); });

var scale2 = d3.scaleLinear()
              .domain([1,242])
              .range([10,900]);

var diaColors = d3.scaleThreshold()
    .domain([30,35,40,45,50,55,60,65,70,75,80])
    .range([ "#f46d43", "#fdae61", "#fee090", "#ffffbf",
    "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"]);

var diaLegendText = [30,35,40,45,50,55,60,65,70,75,80];

var diaLegendColors = ["#f46d43", "#fdae61", "#fee090", "#ffffbf",
    "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"];

var group2 = svg.append('g')
 .attr("id","lifeE")
 .classed("lifeE",true);

///////////////draw diamond////////
var line2 = group2.selectAll('path')
    .data(geoData.features)
    .enter()
    .append('path')
    .attr('d', diamond)
    .attr("opacity",1)
    .attr('fill',function(d){
      if(year == 2015){
      if (d.properties.data15.Healthy_life_expectancy_at_birth == ""){
        return "#ccc"
      }
      else{
      return diaColors(d.properties.data15.Healthy_life_expectancy_at_birth)}
    }
    else if(year == 2016){
    if (d.properties.data16.Healthy_life_expectancy_at_birth == ""){
      return "#ccc"
    }
    else{
    return diaColors(d.properties.data16.Healthy_life_expectancy_at_birth)}
  }
  else if(year == 2017){
  if (d.properties.data17.Healthy_life_expectancy_at_birth == ""){
    return "#ccc"
  }
  else{
  return diaColors(d.properties.data17.Healthy_life_expectancy_at_birth)}
}
else{
if (d.properties.data18.Healthy_life_expectancy_at_birth == ""){
  return "#ccc"
}
else{
return diaColors(d.properties.data18.Healthy_life_expectancy_at_birth)}
}
    })
    .attr('stroke','#000')
    .attr('stroke-width',1)
    .attr('transform',function(d,i){ return "translate("+(triDataX[i]+30)+","+(triDataY[i]-30)+")"; })

    .on("mouseover", function(d) {
      tooltipOther4.transition()
             			 .duration(250)
             			 .style("opacity", 1);
              if (year == 2018){
                  if (d.properties.data18.Healthy_life_expectancy_at_birth == ""){
                    var life = "Undefined"
                  }
                  else{
                  var life = parseFloat(d.properties.data18.Healthy_life_expectancy_at_birth).toFixed(1)
                }

             			tooltipOther4.html(
             			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                  "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
             			"<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
                )}
              else if (year == 2017){
                if (d.properties.data17.Healthy_life_expectancy_at_birth == ""){
                  var life = "Undefined"
                }
                else{
                var life = parseFloat(d.properties.data17.Healthy_life_expectancy_at_birth).toFixed(1)
                }

                tooltipOther4.html(
                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                "<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
              )}
            else if (year == 2016){
              if (d.properties.data16.Healthy_life_expectancy_at_birth == ""){
                var life = "Undefined"
              }
              else{
              var life = parseFloat(d.properties.data16.Healthy_life_expectancy_at_birth).toFixed(1)
              }

              tooltipOther4.html(
              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
              "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
              "<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
            )}
          else {
            if (d.properties.data15.Healthy_life_expectancy_at_birth == ""){
              var life = "Undefined"
            }
            else{
            var life = parseFloat(d.properties.data15.Healthy_life_expectancy_at_birth).toFixed(1)
            }

            tooltipOther4.html(
            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
            "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
            "<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
          )}

              	tooltipOther4.style("left", (50) + "px")
             			          .style("top", (650) + "px");
        	})


  .on("mouseout", function(d) {
      tooltipOther4.transition()
             			.duration(250)
             			.style("opacity", 0);
             		});

///////////dialegend////////////////
	var diaLegenditem = diaLegend.selectAll(".dialegenditem")
                               .data(d3.range(11))
                               .enter()
                               .append("g")
                               .attr("class", "dialegenditem")
                               .attr("transform", function(d, i) { return "translate(" + (i * 31 + 700) + ",0)"; });


                        var dia = d3.symbol()
                                    .type(d3.symbolDiamond)
                                    .size(function(d){ return scale(d); });

                        var dataDiaLegend = [1,1,1,1,1,1,1,1,1,1,1];

                        var scale = d3.scaleLinear()
                                      .domain([1,6])
                                      .range([100,1000]);

                        var group = svg.append('g')
                                       .attr('transform','translate('+ 200 +','+ 300 +')');

                        var line = group.selectAll('path')
                                        .data(dataDiaLegend)
                                        .enter()
                                        .append('path')
                                        .attr('d',dia)
                                        .attr('fill',function(d, i) { return diaLegendColors[i]; })
                                        .attr('stroke','#000')
                                        .attr('stroke-width',1)
                                        .attr('transform',function(d,i){ return "translate("+(i*31+1355)+","+(-40)+")"; });


                                 diaLegenditem.append("text")
                                              .attr("x", 840)
                                          		.attr("y", 260)
                                          		.style("text-anchor", "middle")
                                          		.text(function(d, i) { return diaLegendText[i]; });

///////life expectancy////////
inter_dia.on("click",function(){
       currentOpacity1 = d3.selectAll(".inter_dia").style("opacity")
       currentOpacity = d3.selectAll(".lifeE").style("opacity")
       // Change the opacity: from 0 to 1 or from 1 to 0
       d3.selectAll(".lifeE").transition().style("opacity", currentOpacity == 1 ? 0:1)
       d3.selectAll(".inter_dia").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

       if (currentOpacity == 1){
         d3.select(".lifeE").attr("pointer-events", "none");
       }
       else{
         d3.select(".lifeE").attr("pointer-events", "auto");
       }

      })
////////////neutral country////////
var star = d3.symbol()
            .type(d3.symbolStar)
            .size([50])

var group3 = svg.append('g')
 .attr("id","neutralC")
 .classed("neutralC",true);

///////////////draw star////////
var line3 = group3.selectAll('path')
    .data(geoData.features)
    .enter()
    .append("path")
    .attr('d', star)
    .attr("opacity",function(d){
      if(d.properties.neutral.neutral == "yes"){
        return 1
      }
      else{
        return 0
      }
    })
    .attr('fill',function(d){
      if(year == 2015){
      if (d.properties.neutral.neutral == "yes"){
        return "red"
      }}
    else if(year == 2016){
    if (d.properties.neutral.neutral == "yes"){
      return "red"
    }}
  else if(year == 2017){
  if (d.properties.neutral.neutral == "yes"){
    return "red"
  }}
else{
if (d.properties.neutral.neutral == "yes"){
  return "red"
}}
    })
    .attr('stroke','#000')
    .attr('stroke-width',1)
    .attr('transform',function(d,i){ return "translate("+(triDataX[i]+30)+","+(triDataY[i]-25)+")"; })


///////neutral country////////
inter_star.on("click",function(){
       currentOpacity1 = d3.selectAll(".inter_star").style("opacity")
       currentOpacity = d3.selectAll(".neutralC").style("opacity")
       // Change the opacity: from 0 to 1 or from 1 to 0
       d3.selectAll(".neutralC").transition().style("opacity", currentOpacity == 1 ? 0:1)
       d3.selectAll(".inter_star").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

       if (currentOpacity == 1){
         d3.select(".neutralC").attr("pointer-events", "none");
       }
       else{
         d3.select(".neutralC").attr("pointer-events", "auto");
       }

      })

//////////////massive death////////////
var group4= svg.append('g')
 .attr("id","death")
 .classed("death",true);

group4.selectAll('rect')
    .data(geoData.features)
    .enter()
    .append("rect")
  //  .attr("x",function(d,i){return triDataX[i]})
  //  .attr("y",function(d,i){return triDataY[i]})
    .attr("width",10)
    .attr("height",10)
    .attr("opacity",function(d){
      if(year == 2015){
      if(d.properties.death.D2015 != ""){
        console.log(d)
        return 1
      }
      else{
        return 0
      }
    }
    else if(year == 2016){
    if(d.properties.death.D2016 != ""){
      return 1
    }
    else{
      return 0
    }
  }
  else if(year == 2017){
  if(d.properties.death.D2017 != ""){
    return 1
  }
  else{
    return 0
  }
}
else{
if(d.properties.death.D2018 != ""){
  return 1
}
else{
  return 0
}
}
  })
    .attr('fill',function(d){
      if(year == 2015){
      if (d.properties.death.D2015 != ""){
        return "black"
      }}
    else if(year == 2016){
    if (d.properties.death.D2016 != ""){
      return "black"
    }}
  else if(year == 2017){
  if (d.properties.death.D2017 != ""){
    return "black"
  }}
else{
if (d.properties.death.D2018 != ""){
  return "black"
}}
    })
    .attr('stroke','#000')
    .attr('stroke-width',1)
    .attr('transform',function(d,i){ return "translate("+(triDataX[i]+30)+","+(triDataY[i]-25)+")"; })


///////massive death////////
inter_death.on("click",function(){
       currentOpacity1 = d3.selectAll(".inter_death").style("opacity")
       currentOpacity = d3.selectAll(".death").style("opacity")
       // Change the opacity: from 0 to 1 or from 1 to 0
       d3.selectAll(".death").transition().style("opacity", currentOpacity == 1 ? 0:1)
       d3.selectAll(".inter_death").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

       if (currentOpacity == 1){
         d3.select(".death").attr("pointer-events", "none");
       }
       else{
         d3.select(".death").attr("pointer-events", "auto");
       }

      })

 };

//////////update layout//////////
var updateMap = function(year, geoData){
  ////////projection//////////
  var projection = d3.geoEqualEarth()
                     .translate([screen.width/2,screen.height/2])
                     .scale([300]);
  var geoGenerator = d3.geoPath()
                       .projection(projection)

  //////////color scale///////////
  var color = d3.scaleThreshold()
    .domain([2,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9])
    .range(["#ec7014","#fe9929","#fec44f","#fee391","#fff7bc","#e8f6e2","#ceecca","#b8e3b6",
    "#9ad8bb","#cce9ef","#b2dbea","#96c8e0","#6da3cc","#ccc"])
  var legendText = [2,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,"Undefined"];
  var legendColors = ["#ec7014","#fe9929","#fec44f","#fee391","#fff7bc","#e8f6e2","#ceecca",
    "#b8e3b6","#9ad8bb","#cce9ef","#b2dbea","#96c8e0","#6da3cc","#ccc"];

  //////////draw area///////////////
  var tooltip = d3.select("body")
                  .append("div")
                 	.attr("class", "tooltip")
               	  .style("opacity", 0);

            d3.select("#countries")
                     .selectAll("path")
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
                     .attr("opacity",1)
  /////////////change when mouseover and mouseout//////////////
                     .on("mouseover", function(d){

                      d3.select(this)
                        .attr("opacity",1)
                        .attr("stroke-width", 1);

                  })
                  .on("mouseout", function(d){
                    // d3.select(this.parentNode)
                    //   .selectAll("#nameLabel")
                    //   .remove()

                  d3.select(this)
                    .attr("opacity",1)
                    .attr("stroke-width", 0.5);
               })
//////////////tooltip///////////////
                  .on("mouseover", function(d) {
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

                               if (d.properties.death.D2018 == ""){
                                 if(d.properties.neutral.neutral == ""){
                            			tooltip.html(
                            			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                                 "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                            			"<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                               )
                              }
                              else{
                                tooltip.html(
                                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                                "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                                "<p><strong>" + "Neutral Country" + "</strong></p>" +
                                "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                              )
                            }}
                            else{
                              if(d.properties.neutral.neutral == ""){
                               tooltip.html(
                               "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                               "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                               "<p><strong>" + d.properties.death.D2018 + "</strong></p>" +
                               "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                            )
                           }
                           else{
                             tooltip.html(
                             "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                             "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                             "<p><strong>" + "Neutral Country" + "</strong></p>" +
                             "<p><strong>" + d.properties.death.D2018 + "</strong></p>" +
                             "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                           )
                         }}
                       }

                       else if (year == 2017){
                               if (d.properties.data17.LifeLadder == "Undefined"){
                                 var happinessIndex = d.properties.data17.LifeLadder
                               }
                               else{
                               var happinessIndex = parseFloat(d.properties.data17.LifeLadder).toFixed(2)
                             }

                             if (d.properties.death.D2017 == ""){
                               if(d.properties.neutral.neutral == ""){
                          			tooltip.html(
                          			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                               "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                          			"<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                             )
                            }
                            else{
                              tooltip.html(
                              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                              "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                              "<p><strong>" + "Neutral Country" + "</strong></p>" +
                              "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                            )
                          }}
                          else{
                            if(d.properties.neutral.neutral == ""){
                             tooltip.html(
                             "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                             "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                             "<p><strong>" + d.properties.death.D2017 + "</strong></p>" +
                             "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                          )
                         }
                         else{
                           tooltip.html(
                           "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                           "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                           "<p><strong>" + "Neutral Country" + "</strong></p>" +
                           "<p><strong>" + d.properties.death.D2017 + "</strong></p>" +
                           "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                         )
                       }}
                     }

                       else if (year == 2016){
                             if (d.properties.data16.LifeLadder == "Undefined"){
                               var happinessIndex = d.properties.data16.LifeLadder
                             }
                             else{
                             var happinessIndex = parseFloat(d.properties.data16.LifeLadder).toFixed(2)
                           }

                           if (d.properties.death.D2016 == ""){
                             if(d.properties.neutral.neutral == ""){
                        			tooltip.html(
                        			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                             "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                        			"<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                           )
                          }
                          else{
                            tooltip.html(
                            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                            "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                            "<p><strong>" + "Neutral Country" + "</strong></p>" +
                            "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                          )
                        }}
                        else{
                          if(d.properties.neutral.neutral == ""){
                           tooltip.html(
                           "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                           "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                           "<p><strong>" + d.properties.death.D2016 + "</strong></p>" +
                           "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                        )
                       }
                       else{
                         tooltip.html(
                         "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                         "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                         "<p><strong>" + "Neutral Country" + "</strong></p>" +
                         "<p><strong>" + d.properties.death.D2016 + "</strong></p>" +
                         "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                       )
                     }}
                   }

                     else {
                           if (d.properties.data15.LifeLadder == "Undefined"){
                             var happinessIndex = d.properties.data15.LifeLadder
                           }
                           else{
                           var happinessIndex = parseFloat(d.properties.data15.LifeLadder).toFixed(2)
                         }

                         if (d.properties.death.D2015 == ""){
                           if(d.properties.neutral.neutral == ""){
                      			tooltip.html(
                      			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                           "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                      			"<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                         )
                        }
                        else{
                          tooltip.html(
                          "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                          "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                          "<p><strong>" + "Neutral Country" + "</strong></p>" +
                          "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                        )
                      }}
                      else{
                        if(d.properties.neutral.neutral == ""){
                         tooltip.html(
                         "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                         "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                         "<p><strong>" + d.properties.death.D2015 + "</strong></p>" +
                         "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                      )
                     }
                     else{
                       tooltip.html(
                       "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                       "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                       "<p><strong>" + "Neutral Country" + "</strong></p>" +
                       "<p><strong>" + d.properties.death.D2015 + "</strong></p>" +
                       "<table><tbody><tr><td class='wide'>Happiness Index: </td><td>" + happinessIndex + "</td></tr></tbody></table>"
                     )
                   }}
                 }
                              tooltip.style("left", (d3.event.pageX + 15) + "px")
                                       .style("top", (d3.event.pageY - 28) + "px");
                                })


                                  .on("mouseout", function(d) {
                           tooltip.transition()
                                  .duration(250)
                                  .style("opacity", 0);
                                });

  ///////////centroid///////////
               var triDataX = geoData.features.map(function(d){
                  return geoGenerator.centroid(d)[0] - 10})
               var triDataY = geoData.features.map(function(d){
                  return geoGenerator.centroid(d)[1] +5})

  ///////////update///////////////
           var update = function(year){

                  	slider.property("value", year);
                    		d3.select(".year")
                          .text(year)

  // d3.select(".gdp").selectAll("path").remove()

                    		updateMap(year,geoData);
                    	}

                    slider.attr("type", "range")
                    			.attr("min", 2015)
                    			.attr("max", 2018)
                    			.attr("step", 1)
                    			.on("input", function() {
                    				var year = this.value;

                    				update(year);
                    			});

  ////////////////GDP///////////////
  inter_tri.on("click",function(){
         currentOpacity1 = d3.selectAll(".inter_tri").style("opacity")
         currentOpacity = d3.selectAll(".gdp").style("opacity")
         // Change the opacity: from 0 to 1 or from 1 to 0
         d3.selectAll(".gdp").transition().style("opacity", currentOpacity == 1 ? 0:1)
         d3.selectAll(".inter_tri").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

         if (currentOpacity == 1){
           d3.select(".gdp").attr("pointer-events", "none");
         }
         else{
           d3.select(".gdp").attr("pointer-events", "auto");
         }
              })
  ////////draw triangle//////////////
  ////////minor tooltip////////////
  var tooltipOther = d3.select(".tooltipOther")

                      var triangle = d3.symbol()
                                  .type(d3.symbolTriangle)
                                  .size([50])//function(d){ return scale(d.properties.dataGDP15.gdp); });

                      var scale = d3.scaleLinear()
                                    .domain([1,242])
                                    .range([10,900]);

        var triColors = d3.scaleThreshold()
                          .domain([6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11])
                          .range(["#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf",
                          "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"]);

        var triLegendText = [6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5];

        var triLegendColors = ["#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf",
                          "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"];

        var group = d3.select(".gdp")

  /////////////variable - gdp//////////////
  /////15/////
                            var triData15 = geoData.features.map(function(d){

                              if(d.properties.data15.Log_GDP_per_capita != ""){
                                var gdpNum = parseFloat(d.properties.data15.Log_GDP_per_capita).toFixed(2)}
                              else{
                                var gdpNum = 1}  //"Undefined"

                             return {
                                     sovereignty:d.properties.SOVEREIGNT,
                                     gdp:gdpNum
                                    }
                              })
                              var gdpDict15 = {};
                              triData15.forEach(function(country){

                                gdpDict15[country.sovereignty.trim()]=country;
                              });
  ////////16//////////
                              var triData16 = geoData.features.map(function(d){

                                if(d.properties.data16.Log_GDP_per_capita != ""){
                                  var gdpNum = parseFloat(d.properties.data16.Log_GDP_per_capita).toFixed(2)}
                                else{
                                  var gdpNum = 1}  //"Undefined"

                               return {
                                       sovereignty:d.properties.SOVEREIGNT,
                                       gdp:gdpNum
                                      }
                                })
                                var gdpDict16 = {};
                                triData16.forEach(function(country){
                                  gdpDict16[country.sovereignty.trim()]=country;
                                });
  /////////17/////////
  var triData17 = geoData.features.map(function(d){

    if(d.properties.data17.Log_GDP_per_capita != ""){
      var gdpNum = parseFloat(d.properties.data17.Log_GDP_per_capita).toFixed(2)}
    else{
      var gdpNum = 1}  //"Undefined"

   return {
           sovereignty:d.properties.SOVEREIGNT,
           gdp:gdpNum
          }
    })
    var gdpDict17 = {};
    triData17.forEach(function(country){
      gdpDict17[country.sovereignty.trim()]=country;
    });

  ///////////18////////
  var triData18 = geoData.features.map(function(d){

    if(d.properties.data18.Log_GDP_per_capita != ""){
      var gdpNum = parseFloat(d.properties.data18.Log_GDP_per_capita).toFixed(2)}
    else{
      var gdpNum = 1}  //"Undefined"

   return {
           sovereignty:d.properties.SOVEREIGNT,
           gdp:gdpNum
          }
    })
    var gdpDict18 = {};
    triData18.forEach(function(country){
      gdpDict18[country.sovereignty.trim()]=country;
    });
  ///////////bind data///////////
                            geoData.features.forEach(function(feature)
                             {
                             feature.properties.dataGDP18 = gdpDict18[feature.properties.SOVEREIGNT];
                             feature.properties.dataGDP17 = gdpDict17[feature.properties.SOVEREIGNT];
                             feature.properties.dataGDP16 = gdpDict16[feature.properties.SOVEREIGNT];
                             feature.properties.dataGDP15 = gdpDict15[feature.properties.SOVEREIGNT];
                             })

                             //console.log(geoData);
                             console.log(year);

                            var line = group.selectAll('path')
                                .attr('d', triangle)
                                .attr("opacity",1)
                                .attr('fill',function(d){
                                  if(year == 2015){
                                  if (d.properties.dataGDP15.gdp == 1){
                                    return "#ccc"
                                  }
                                  else{
                                  return triColors(d.properties.dataGDP15.gdp)}
                                }
                                else if(year == 2016){
                                if (d.properties.dataGDP16.gdp == 1){
                                  return "#ccc"
                                }
                                else{
                                return triColors(d.properties.dataGDP16.gdp)}
                              }
                              else if(year == 2017){
                              if (d.properties.dataGDP17.gdp == 1){
                                return "#ccc"
                              }
                              else{
                              return triColors(d.properties.dataGDP17.gdp)}
                            }
                            else{
                            if (d.properties.dataGDP18.gdp == 1){
                              return "#ccc"
                            }
                            else{
                            return triColors(d.properties.dataGDP18.gdp)}
                          }
                                })
                                .attr('stroke','#000')
                                .attr('stroke-width',1)
                                .attr('transform',function(d,i){ return "translate("+(triDataX[i]+35)+","+(triDataY[i]-25)+")"; })

  //////////////tooltip///////////////
    line.on("mouseover", function(d) {
         tooltipOther.transition()
               			 .duration(250)
               			 .style("opacity", 1);
                if (year == 2018){
                    if (d.properties.dataGDP18.gdp == 1){
                      var gdp = "Undefined"
                    }
                    else{
                    var gdp = d.properties.dataGDP18.gdp
                  }

               			tooltipOther.html(
               			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                    "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
               			"<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
                  )}
                else if (year == 2017){
                  if (d.properties.dataGDP17.gdp == 1){
                    var gdp = "Undefined"
                  }
                  else{
                  var gdp = d.properties.dataGDP17.gdp
                }

                  tooltipOther.html(
                  "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                  "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                  "<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
                )}
              else if (year == 2016){
                if (d.properties.dataGDP16.gdp == 1){
                  var gdp = "Undefined"
                }
                else{
                var gdp = d.properties.dataGDP16.gdp
              }

                tooltipOther.html(
                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                "<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
              )}
            else {
              if (d.properties.dataGDP15.gdp == 1){
                var gdp = "Undefined"
              }
              else{
              var gdp = d.properties.dataGDP15.gdp
            }

              tooltipOther.html(
              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
              "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
              "<table><tbody><tr><td class='wide'>Log GDP per Capita: </td><td>" + gdp + "</td></tr></tbody></table>"
            )}

                	tooltipOther.style("left", (50) + "px")
               			     .style("top", (650) + "px");
               		})


    .on("mouseout", function(d) {
        tooltipOther.transition()
               			.duration(250)
               			.style("opacity", 0);
               		});

  /////////////////Unemployment Rate//////////////
  var tooltipOther2 = d3.select(".tooltipOther2")

  var groupUR = d3.select(".unemployment")

  groupUR.selectAll("circle")
         .attr("cx",function(d){
           //console.log(d.properties);
           //console.log(d.properties.GPS.longitude);
           return (d.properties.GPS.longitude*0.08) //* 4.2) //zhai
         })
         .attr("cy",function(d){
           return -(d.properties.GPS.latitude*0.15) //* 5.5) //gao
         })
         .attr("r", function(d){
           if (year == 2015){
           if (d.properties.UR15.UnemploymentRate != "Undefined"){
           return Math.sqrt(parseInt(d.properties.UR15.UnemploymentRate*20))}
           else{
             return 0
           }
         }
         else if (year == 2016){
         if (d.properties.UR16.UnemploymentRate != "Undefined"){
         return Math.sqrt(parseInt(d.properties.UR16.UnemploymentRate*20))}
         else{
           return 0
         }
       }
       else if (year == 2017){
       if (d.properties.UR17.UnemploymentRate != "Undefined"){
       return Math.sqrt(parseInt(d.properties.UR17.UnemploymentRate*20))}
       else{
         return 0
       }
     }
     else{
     if (d.properties.UR18.UnemploymentRate != "Undefined"){
     return Math.sqrt(parseInt(d.properties.UR18.UnemploymentRate*20))}
     else{
       return 0
     }
   }
         })
         .attr("fill", "orange")
         .attr("opacity",0.5)
  //       .attr("transform","translate(760,475)")
         .attr('transform',function(d,i){ return "translate("+(triDataX[i]+35)+","+(triDataY[i]-25)+")"; })

         .on("mouseover", function(d){
           //console.log(d.properties.GPS)
                tooltipOther2.transition()
                             .duration(250)
                             .style("opacity", 1);
                       if (year == 2015){
                           if (d.properties.UR15.UnemploymentRate == "Undefined"){
                             var ur = "Undefined"
                           }
                           else{
                           var ur = d.properties.UR15.UnemploymentRate
                         }

                            tooltipOther2.html(
                            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                           "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                            "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                         )}
                         else if (year == 2016){
                             if (d.properties.UR16.UnemploymentRate == "Undefined"){
                               var ur = "Undefined"
                             }
                             else{
                             var ur = d.properties.UR16.UnemploymentRate
                           }

                              tooltipOther2.html(
                              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                             "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                              "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                           )}
                           else if (year == 2017){
                               if (d.properties.UR17.UnemploymentRate == "Undefined"){
                                 var ur = "Undefined"
                               }
                               else{
                               var ur = d.properties.UR17.UnemploymentRate
                             }

                                tooltipOther2.html(
                                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                               "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                                "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                             )}
                             else{
                                 if (d.properties.UR18.UnemploymentRate == "Undefined"){
                                   var ur = "Undefined"
                                 }
                                 else{
                                 var ur = d.properties.UR18.UnemploymentRate
                               }

                                  tooltipOther2.html(
                                  "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                                 "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                                  "<table><tbody><tr><td class='wide'>Unemployment Rate: </td><td>" + ur + "</td></tr></tbody></table>"
                               )}

                          tooltipOther2.style("left", (50) + "px")
                            			     .style("top", (650) + "px");

         })
         .on("mouseout", function(d) {
               tooltipOther2.transition()
                      			.duration(250)
                      			.style("opacity", 0);
                      		});

  ///////UR////////
  inter_ur.on("click",function(){
         currentOpacity1 = d3.selectAll(".inter_ur").style("opacity")
         currentOpacity = d3.selectAll(".unemployment").style("opacity")
         // Change the opacity: from 0 to 1 or from 1 to 0
         d3.selectAll(".unemployment").transition().style("opacity", currentOpacity == 1 ? 0:1)
         d3.selectAll(".inter_ur").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

         if (currentOpacity == 1){
           d3.select(".unemployment").attr("pointer-events", "none");
         }
         else{
           d3.select(".unemployment").attr("pointer-events", "auto");
         }
              })

  ///////////////crime index//////////
  var tooltipOther3 = d3.select(".tooltipOther3")

  var groupCI = d3.select(".crime")

  groupCI.selectAll("circle")
         .attr("cx",function(d){
           //console.log(d.properties);
           //console.log(d.properties.GPS.longitude);
           return (d.properties.GPS.longitude*0.08) //* 4.2) //zhai
         })
         .attr("cy",function(d){
           return -(d.properties.GPS.latitude*0.15) //* 5.5) //gao
         })
         .attr("r", function(d){
           if (year == 2015){
           if (d.properties.crime.CrimeIndex_15 != "Undefined"){
           return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_15*5))}
           else{
             return 0
           }
         }
         else if (year == 2016){
         if (d.properties.crime.CrimeIndex_16 != "Undefined"){
         return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_16*5))}
         else{
           return 0
         }
       }
       else if (year == 2017){
       if (d.properties.crime.CrimeIndex_17 != "Undefined"){
       return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_17*5))}
       else{
         return 0
       }
     }
     else{
     if (d.properties.crime.CrimeIndex_18 != "Undefined"){
     return Math.sqrt(parseInt(d.properties.crime.CrimeIndex_18*5))}
     else{
       return 0
     }
   }
         })
         .attr("fill", "red")
         .attr("opacity",0.5)
  //       .attr("transform","translate(760,475)")
         .attr('transform',function(d,i){ return "translate("+(triDataX[i]+30)+","+(triDataY[i]-20)+")"; })

         .on("mouseover", function(d){
           //console.log(d.properties.GPS)
                tooltipOther3.transition()
                             .duration(250)
                             .style("opacity", 1);
                       if (year == 2015){
                           if (d.properties.crime.CrimeIndex_15 == "Undefined"){
                             var ci = "Undefined"
                           }
                           else{
                           var ci = d.properties.crime.CrimeIndex_15
                         }

                            tooltipOther3.html(
                            "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                           "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
                            "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                         )}
                         else if (year == 2016){
                             if (d.properties.crime.CrimeIndex_16 == "Undefined"){
                               var ci = "Undefined"
                             }
                             else{
                             var ci = d.properties.crime.CrimeIndex_16
                           }

                              tooltipOther3.html(
                              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                             "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                              "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                           )}
                           else if (year == 2017){
                               if (d.properties.crime.CrimeIndex_17 == "Undefined"){
                                 var ci = "Undefined"
                               }
                               else{
                               var ci = d.properties.crime.CrimeIndex_17
                             }

                                tooltipOther3.html(
                                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                               "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                                "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                             )}
                             else{
                                 if (d.properties.crime.CrimeIndex_18 == "Undefined"){
                                   var ci = "Undefined"
                                 }
                                 else{
                                 var ci = d.properties.crime.CrimeIndex_18
                               }

                                  tooltipOther3.html(
                                  "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                                 "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
                                  "<table><tbody><tr><td class='wide'>Crime Index: </td><td>" + ci + "</td></tr></tbody></table>"
                               )}

                          tooltipOther3.style("left", (50) + "px")
                            			     .style("top", (650) + "px");

         })
         .on("mouseout", function(d) {
               tooltipOther3.transition()
                      			.duration(250)
                      			.style("opacity", 0);
                      		});
  /////////Crime Index///////////
  ////////////////GDP///////////////
  inter_ci.on("click",function(){
         currentOpacity1 = d3.selectAll(".inter_ci").style("opacity")
         currentOpacity = d3.selectAll(".crime").style("opacity")
         // Change the opacity: from 0 to 1 or from 1 to 0
         d3.selectAll(".crime").transition().style("opacity", currentOpacity == 1 ? 0:1)
         d3.selectAll(".inter_ci").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

         if (currentOpacity == 1){
           d3.select(".crime").attr("pointer-events", "none");
         }
         else{
           d3.select(".crime").attr("pointer-events", "auto");
         }
              })

  /////////////life expectancy////////
  var tooltipOther4 = d3.select(".tooltipOther4")

  var diamond = d3.symbol()
              .type(d3.symbolDiamond)
              .size([50])//function(d){ return scale(d.properties.data15.Healthy_life_expectancy_at_birth); });

  var scale2 = d3.scaleLinear()
                .domain([1,242])
                .range([10,900]);

  var diaColors = d3.scaleThreshold()
      .domain([30,35,40,45,50,55,60,65,70,75,80])
      .range([ "#f46d43", "#fdae61", "#fee090", "#ffffbf",
      "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"]);

  var diaLegendText = [30,35,40,45,50,55,60,65,70,75,80];

  var diaLegendColors = ["#f46d43", "#fdae61", "#fee090", "#ffffbf",
      "#d9ef8b", "#a6d96a", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4","#ccc"];

  var group2 = d3.select(".lifeE")

  ///////////////draw diamond////////
  var line2 = group2.selectAll('path')
      .attr('d', diamond)
      .attr("opacity",1)
      .attr('fill',function(d){
        if(year == 2015){
        if (d.properties.data15.Healthy_life_expectancy_at_birth == ""){
          return "#ccc"
        }
        else{
        return diaColors(d.properties.data15.Healthy_life_expectancy_at_birth)}
      }
      else if(year == 2016){
      if (d.properties.data16.Healthy_life_expectancy_at_birth == ""){
        return "#ccc"
      }
      else{
      return diaColors(d.properties.data16.Healthy_life_expectancy_at_birth)}
    }
    else if(year == 2017){
    if (d.properties.data17.Healthy_life_expectancy_at_birth == ""){
      return "#ccc"
    }
    else{
    return diaColors(d.properties.data17.Healthy_life_expectancy_at_birth)}
  }
  else{
  if (d.properties.data18.Healthy_life_expectancy_at_birth == ""){
    return "#ccc"
  }
  else{
  return diaColors(d.properties.data18.Healthy_life_expectancy_at_birth)}
  }
      })
      .attr('stroke','#000')
      .attr('stroke-width',1)
      .attr('transform',function(d,i){ return "translate("+(triDataX[i]+30)+","+(triDataY[i]-30)+")"; })

      .on("mouseover", function(d) {
        tooltipOther4.transition()
               			 .duration(250)
               			 .style("opacity", 1);
                if (year == 2018){
                    if (d.properties.data18.Healthy_life_expectancy_at_birth == ""){
                      var life = "Undefined"
                    }
                    else{
                    var life = parseFloat(d.properties.data18.Healthy_life_expectancy_at_birth).toFixed(1)
                  }

               			tooltipOther4.html(
               			"<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                    "<p><strong>" + d.properties.data18.Year + "</strong></p>" +
               			"<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
                  )}
                else if (year == 2017){
                  if (d.properties.data17.Healthy_life_expectancy_at_birth == ""){
                    var life = "Undefined"
                  }
                  else{
                  var life = parseFloat(d.properties.data17.Healthy_life_expectancy_at_birth).toFixed(1)
                  }

                  tooltipOther4.html(
                  "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                  "<p><strong>" + d.properties.data17.Year + "</strong></p>" +
                  "<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
                )}
              else if (year == 2016){
                if (d.properties.data16.Healthy_life_expectancy_at_birth == ""){
                  var life = "Undefined"
                }
                else{
                var life = parseFloat(d.properties.data16.Healthy_life_expectancy_at_birth).toFixed(1)
                }

                tooltipOther4.html(
                "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
                "<p><strong>" + d.properties.data16.Year + "</strong></p>" +
                "<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
              )}
            else {
              if (d.properties.data15.Healthy_life_expectancy_at_birth == ""){
                var life = "Undefined"
              }
              else{
              var life = parseFloat(d.properties.data15.Healthy_life_expectancy_at_birth).toFixed(1)
              }

              tooltipOther4.html(
              "<p><strong>" + d.properties.SOVEREIGNT + "</strong></p>" +
              "<p><strong>" + d.properties.data15.Year + "</strong></p>" +
              "<table><tbody><tr><td class='wide'>Healthy life expectancy at birth: </td><td>" + life + "</td></tr></tbody></table>"
            )}

                	tooltipOther4.style("left", (50) + "px")
               			          .style("top", (650) + "px");
          	})


    .on("mouseout", function(d) {
        tooltipOther4.transition()
               			.duration(250)
               			.style("opacity", 0);
               		});

  ///////life expectancy////////
  inter_dia.on("click",function(){
         currentOpacity1 = d3.selectAll(".inter_dia").style("opacity")
         currentOpacity = d3.selectAll(".lifeE").style("opacity")
         // Change the opacity: from 0 to 1 or from 1 to 0
         d3.selectAll(".lifeE").transition().style("opacity", currentOpacity == 1 ? 0:1)
         d3.selectAll(".inter_dia").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

         if (currentOpacity == 1){
           d3.select(".lifeE").attr("pointer-events", "none");
         }
         else{
           d3.select(".lifeE").attr("pointer-events", "auto");
         }
              })

//////////////massive death////////////
var group4= svg.select(".death")

group4.selectAll('rect')
    .attr("width",10)
    .attr("height",10)
    .attr("opacity",function(d){
      if(year == 2015){
      if(d.properties.death.D2015 != ""){
        return 1
      }
      else{
        return 0
      }
    }
    else if(year == 2016){
    if(d.properties.death.D2016 != ""){
      return 1
    }
    else{
      return 0
    }
  }
  else if(year == 2017){
  if(d.properties.death.D2017 != ""){
    return 1
  }
  else{
    return 0
  }
}
else{
if(d.properties.death.D2018 != ""){
  return 1
}
else{
  return 0
}
}
  })
    .attr('fill',function(d){
      if(year == 2015){
      if (d.properties.death.D2015 != ""){
        return "black"
      }}
    else if(year == 2016){
    if (d.properties.death.D2016 != ""){
      return "black"
    }}
  else if(year == 2017){
  if (d.properties.death.D2017 != ""){
    return "black"
  }}
else{
if (d.properties.death.D2018 != ""){
  return "black"
}}
    })
    .attr('stroke','#000')
    .attr('stroke-width',1)
    .attr('transform',function(d,i){ return "translate("+(triDataX[i]+30)+","+(triDataY[i]-25)+")"; })


///////massive death////////
inter_death.on("click",function(){
       currentOpacity1 = d3.selectAll(".inter_death").style("opacity")
       currentOpacity = d3.selectAll(".death").style("opacity")
       // Change the opacity: from 0 to 1 or from 1 to 0
       d3.selectAll(".death").transition().style("opacity", currentOpacity == 1 ? 0:1)
       d3.selectAll(".inter_death").transition().style("opacity", currentOpacity1 == 1 ? 0.5:1)

       if (currentOpacity == 1){
         d3.select(".death").attr("pointer-events", "none");
       }
       else{
         d3.select(".death").attr("pointer-events", "auto");
       }

      })

};

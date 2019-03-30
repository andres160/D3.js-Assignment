
var svgWidth = 960;
var svgHeight = 400;

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);

var chartGroup = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);



d3.csv("data.csv", function(error, data) {
    if(error) throw error;


  data.forEach(function(d) {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare;
  });
    


var xValue = function(d) { return d.poverty;}, 
    xScale = d3.scaleLinear().range([0, width]), 
    xMap = function(d) { return xScale(xValue(d));},
    xAxis = d3.axisBottom(xScale);


var yValue = function(d) { return d.healthcare;},
    yScale = d3.scaleLinear().range([height, 0]), 
    yMap = function(d) { return yScale(yValue(d));}, 
    yAxis = d3.axisLeft(yScale);



var tooltip = d3.tip()
    .attr("class", "d3-tip")
    .html(function (d){return d["State"] + "<br/> <hr> In Poverty : " + xValue(d) 
	        + "% <br/> Lacks Healthcare : " + yValue(d) + "%"})



  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

    chartGroup.call(tooltip);

  chartGroup.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(10," + height + ")")
      .call(xAxis)
  


  chartGroup.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(10)")
      .call(yAxis)

    chartGroup.append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + (margin.right-margin.left) + "," +(height/2) + ")rotate(-90)")
                .text("Lacks Healthcare(%)");
    

    chartGroup.append("text")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + (width/2)+ "," + (margin.bottom+height)+ ")")
                .text("In Poverty (%)")
    


  chartGroup.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "bubble")
      .attr("r", 6)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", "green")
      .style("opacity", 0.5)
      .on("mouseover", tooltip.show)
      .on("mouseout", tooltip.hide);
            
    

    
    chartGroup.selectAll("bubble")
                .data(data)
                .enter()
                .append("text")
                .text(function(d){return d.Locationabbr;})
                .attr("x", xMap)
                .attr("y", yMap)
                .attr("font-family", "sans-serif")
                .attr("font-size", "6px")
                .attr("fill", "white")
                .attr("text-anchor", "middle");
});

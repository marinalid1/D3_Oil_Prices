   // set the dimensions and margins of the graph
   const margin = {top: 5, right: 30, bottom: 70, left: 60},
   width = 800 - margin.left - margin.right,
   height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.csv("https://raw.githubusercontent.com/datasets/oil-prices/master/data/brent-year.csv").then( function(data) {


// X axis
const x = d3.scaleBand()
 .range([ 0, width ])
 .domain(data.map(d => d.Date))
 .padding(0.2);
svg.append("g")
 .attr("transform", `translate(0, ${height})`)
 .call(d3.axisBottom(x))
 .selectAll("text")
   .attr("transform", "translate(-10,0)rotate(-45)")
   .style("text-anchor", "end");

// Add X axis label
svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 60) + ")")
      .style("text-anchor", "middle")
      .text("Date");

// Add Y axis
const y = d3.scaleLinear()
 .domain([0, 120])
 .range([ height, 0]);
svg.append("g")
 .call(d3.axisLeft(y));
 // Add Y label
svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("US Dollars")
   

// Bars
svg.selectAll("mybar")
 .data(data)
 .join("rect")
   .attr("x", d => x(d.Date))
   .attr("y", d => y(d.Price))
   .attr("width", x.bandwidth())
   .attr("height", d => height - y(d.Price))
   .attr("fill", "green")
   .append("title")
   .text((d) => `${d.Date}\n$${d.Price}  `);
 
})
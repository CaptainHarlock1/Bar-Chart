
const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true );
req.send();
req.onload = function(){
      const json = JSON.parse(req.responseText);
      const dataset = json.data;
      const label = "Date";

      const w = 650;
      const h = 500;
      const padding = 60;


      let mindate = new Date(1947,00,01);
      let maxdate = new Date(2015,06,01);

      const xScale = d3.scaleTime()
                        .domain([mindate, maxdate])
                        .range([padding, w - padding]);

      const yScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d)=> d[1])])
                  .range([padding, h-padding]);

      const yScaleaxis = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d)=>d[1])])
                  .range([h-padding, padding]);

                  

      // const title = d3.select("body")
      //                 .append("h1")
      //                 .text("GDP Bar Chart")
      //                 .attr("id", "title")
      //                 .attr("class", "title");
      const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
            
            svg.append("text")
                  .attr("x", w/2)             
                  .attr("y", 20)
                  .attr("id", "title")
                  .text("USA's - GDP")
                  .attr("anchor", "middle")
                  .attr("class", "title")
                  .attr("text-anchor", "middle");  
                  //     .style("font-size", "21px") 
                  //     .style("color", "white");

                   

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScaleaxis);

       
      svg.append("g")
            .attr("transform", "translate(0," + (h-padding) +")")
            .attr("id", "x-axis")
            .call(xAxis);

      svg.append("g")
            .attr("transform", "translate(" + padding + ", 0)")
            .attr("id", "y-axis")
            .call(yAxis);

      svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", (d, i)=> xScale(new Date(d[0])))
            .attr("y", (d)=> (h-yScale(d[1])))
            .attr("width", 3)
            .attr("height", (d)=> yScale(d[1])-padding)
            .attr("class", "bar")
            .attr("data-date", d => d[0])
            .attr("data-gdp", d => d[1])
            .on("mouseover", (i, d) => {
                  tooltip.transition()
                  .style("visibility", "visible")

                  tooltip.text(d[0] + ", " + d[1] + "millionsUSD")
                  
                  document.querySelector("#tooltip").setAttribute("data-date", d[0])
                                    
            })
             .on('mouseout', function(){
                  tooltip.transition()
                  .style("visibility", "hidden")
             });
             
      const tooltip = d3.select("body")
            .append("div")
            .attr("id", "tooltip")
            .attr("class", "tooltip")
            .style("visibility", "hidden")
            .style("width", "auto")
            .style("height", "auto");
            
     
                              
};












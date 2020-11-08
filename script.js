let dataset = "";
let datasetobj = [];
const w = 550;
const h = 450;
const padding = 30;

const xScale = d3.scaleLinear()
                .domain([d3.min(dataset, (d)=> newDate(d[0])), d3.max(dataset, (d)=> newDate(d[0]))])
                .range([padding, w-padding]);

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
const canvas = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
      
          canvas.append("text")
                .attr("x", w/2)             
                .attr("y", 20)
                .text("GDP Bar Chart")
                .attr("anchor", "middle")
                .attr("class", "title")
                .attr("text-anchor", "middle")  
            //     .style("font-size", "21px") 
            //     .style("color", "white");  
                  
                      
             



const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScaleaxis);


canvas.append("g")
      .attr("transform", "translate(0," + (h-padding) +")")
      .attr("id", "x-axis")
      .call(xAxis);

canvas.append("g")
      .attr("transform", "translate(" + padding + ", 0)")
      .attr("id", "y-axis")
      .call(yAxis);

canvas.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i)=> i*50)
      .attr("y", (d)=> (h-yScale(d[1])))
      .attr("width", 10)
      .attr("height", (d)=> yScale(d[1])-padding)
      .attr("class", "bar");

 
const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true );
req.send();
req.onload = function(){
     const json = JSON.parse(req.responseText);
     
     datasetobj.push(json.data);
     dataset = datasetobj[0].map(d=>d);
     console.log(dataset);
     console.log(typeof(dataset));
     console.log(texti);

// //      document.getElementById('test').innerText = dataset;

};






const dataset = [];
const datasetobj = [];
const w = 350;
const h = 300;
const padding = 30;

const xScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d)=> d[0])])
                .range([padding, w-padding]);

const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d)=> d[1])])
                .range([padding, h-padding]);

const yScaleaxis = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d)=>d[1])])
                .range([h-padding, padding]);

const title = d3.select("body")
                .append("h1")
                .text("GDP Bar Chart")
                .attr("id", "title")
                .attr("class", "title");
const canvas = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);



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
      .attr("x", (d)=> xScale(d[0])-(10/2))
      .attr("y", (d)=> (h-yScale(d[1])))
      .attr("width", 10)
      .attr("height", (d)=> yScale(d[1])-padding)
      .attr("class", "bar");

const req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true );
req.send();
req.onload = function(){
     const json = JSON.parse(req.responseText);

//      document.getElementById('test').innerText = padding;
//      console.log(json.data);
     datasetobj.push(json.data);

};
console.log(datasetobj);




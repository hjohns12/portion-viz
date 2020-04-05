class Beeswarm {

    constructor(state, setGlobalState) {
      // initialize properties here
      this.width = window.innerWidth * 0.9
      this.height = window.innerHeight * 0.6;
      this.margins = { top: 20, bottom: 50, left: 20, right: 20 };

      this.svg = d3
        .select("#beeswarm")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height);
      
      this.xScale =  d3
        .scaleLinear()
        .domain(d3.extent(state.data, d => d.eg))
        .range([this.margins.left, this.width - this.margins.right]);
      
      const xAxis = d3.axisBottom(this.xScale);

      // need to figure out how to position this so that it shows up
      this.svg
        .append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0, ${this.height - this.margins.bottom})`)
        .call(xAxis)
        .append("text")
        .attr('class', 'axis-label')
        .attr('x', '50%')
        .attr('dy', '3em')
        .text("Efficiency Gap");
      
      this.g = this.svg.append("g")
        .attr("transform", `translate(0, ${this.margins.top})`)

      const simulation = d3.forceSimulation(state.data)
        .force("x", d3.forceX(d => this.xScale(d.eg)).strength(1))
        .force("y", d3.forceY(this.height / 2))
        .force("collide", d3.forceCollide(4))
        .stop();      
      
      for (var i = 0; i < 120; ++i) simulation.tick();

      this.container = this.svg.append('g').attr("class", "beeswarm container")

      }

    draw(state, setGlobalState) {
      const formatValue = d3.format(".3");

      this.container
        .selectAll("g.child")
        .data( d3.voronoi() //consider using d3-delaunay for performance 
          .extent([[-this.margins.left, -this.margins.top], [this.width + this.margins.right, this.height + this.margins.top]])
          .x(function(d) { return d.x ; })
          .y(function(d) { return d.y; })
          .polygons(state.data))
        .join(enter => enter 
          .append("g")
          .attr("class", "child")
          .call(sel => sel.append("circle")
            .attr('class', 'beeswarm-dots')
            .attr("r", 3)
            .attr("cx", function(d) { 
              return d.data.x; })
            .attr("cy", function(d) { 
              return d.data.y; })
            .attr("hash", function(d) { 
                return d.data.hash; })
            .on('click', function(d) {
                return setGlobalState({clickedData: d.data});
            })
          ),
        update => update,
        exit => exit.remove()
        );

      // this.cell.append("info")
      //     .text(function(d) { return "EG: " + formatValue(d.data.eg) ; })

      this.container
          .selectAll('.beeswarm-dots')
          .attr('fill', d => state.clickedOutlier === d.data.hash ? 'yellow' : 'black')
          .attr('r', d => state.clickedOutlier === d.data.hash ? 10 : 3)
          .attr('opacity', d => state.clickedOutlier === d.data.hash ? 1 : 0.8)
          .attr('stroke', d => state.clickedOutlier === d.data.hash ? "black" : 'none')

    }
  }
  
  export { Beeswarm };
  
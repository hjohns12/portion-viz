class Beeswarm {

    constructor(state, setGlobalState) {
      // initialize properties here
      this.width = window.innerWidth * 0.6
      this.height = window.innerHeight * 0.4;
      this.margins = { top: 0, bottom: 50, left: 20, right: 20 };

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

      // add shading boxes 
      const leftNegativeSeven = this.xScale(-.1499);
      const rightNegativeSeven = this.xScale(-.07);
      const rangeNegativeSeven = rightNegativeSeven - leftNegativeSeven;

      const leftNegativeFifteen = this.xScale(d3.min(state.data, d => d.eg));
      console.log("left Neg Fifteen", leftNegativeFifteen);
      const rightNegativeFifteen = this.xScale(-.15);
      const rangeNegativeFifteen = rightNegativeFifteen - leftNegativeFifteen;

      // NegativeSeven admin
      this.g
        .append("rect")
        .attr("x", leftNegativeSeven)
        .attr("width", rangeNegativeSeven)
        .attr("height", this.height*(6/7))
        .attr("class", "seven-range");
      // NegativeFifteen admin
      this.g
        .append("rect")
        .attr("x", leftNegativeFifteen)
        .attr("width", rangeNegativeFifteen)
        .attr("height", this.height*(6/7))
        .attr("class", "fifteen-range");
      }

    draw(state, setGlobalState) {

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
                return setGlobalState({clickedData: d.data,
                                       clickedHash: d.data.hash });
            })
          ),
        update => update,
        exit => exit.remove()
        );

      this.container
          .selectAll('.beeswarm-dots')
          .attr('fill', d => state.clickedHash === d.data.hash ? 'yellow' : 'black')
          .attr('r', d => state.clickedHash === d.data.hash ? 10 : 3)
          .attr('opacity', d => state.clickedHash === d.data.hash ? 1 : 0.3)
          .attr('stroke', d => state.clickedHash === d.data.hash ? "black" : 'none')

    }
  }
  
  export { Beeswarm };
  
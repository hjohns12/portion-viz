class Boxplot {

    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.6
        this.margins = {top: 20, bottom:100, left:60, right:20};
    
        this.svg = d3
          .select("#boxplot")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height);

        this.districts = ["1", "2", "3", "4", "5", "6", "7", "8"]
        
    }

    draw(state, setGlobalState) {
        const bins = d3.histogram()
          .thresholds([1, 2, 3, 4, 5, 6, 7, 8]) //not sure about numeric versus string
        // .thresholds(this.districts)
        //   .domain(this.xScale.domain)
          .value(d => d.District)
        (state.long_data)
          .map(bin => {
            //   bin.sort((a, b) => a.Value - b.Value);
              bin.sort((a, b) => d3.ascending(a.District, b.District))
              const values = bin.map(d => d.Value);
              const min = values[0];
              const max = values[values.length - 1];
              const q1 = d3.quantile(values, 0.25);
              const q2 = d3.quantile(values, 0.50);
              const q3 = d3.quantile(values, 0.75);
              const iqr = q3 - q1; // interquartile range
              bin.r0 = Math.max(min, q1 - iqr * 1.5);
              bin.r1 = Math.min(max, q3 + iqr * 1.5);
              bin.quartiles = [q1, q2, q3];
              bin.range = [bin.r0, bin.r1];
              bin.outliers = bin.filter(v => v.Value < bin.r0 || v.Value > bin.r1); // TODO
              return bin;
            })
        console.log("bins", bins)
        
        // set up the scales
        const xScale = d3
          .scaleLinear()
          .domain([d3.min(bins, d => d.x0), d3.max(bins, d => d.x1)])
          .rangeRound([this.margins.left, this.width - this.margins.right])

        const yScale = d3
            .scaleLinear()
            // .domain([d3.min(bins, d =>  d.range[0]), d3.max(bins, d => d.range[1])]).nice()
            .domain(state.domain)
            .range([this.height - this.margins.bottom, this.margins.top])
        
        // make x-axis
        const xAxis = d3.axisBottom(xScale).ticks(12).tickSizeOuter(0);
        this.svg
            .append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${this.height - this.margins.bottom})`)
            .call(xAxis)
            .append("text")
            .attr('class', 'axis-label')
            .attr('x', '50%')
            .attr('dy', '3em')
            .text("District number");
        
        // make y-axis
        const yAxis = d3.axisLeft(yScale)
        this.svg
            .append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(${this.margins.left}, 0)`)
            .call(yAxis)
            .append("text")
            .attr("class", "axis-label")
            .attr("y", "50%")
            .attr("dx", "-3em")
            .attr("writing-mode", "vertical-rl")
            .text("D voteshare");
            


    }


}

export { Boxplot };
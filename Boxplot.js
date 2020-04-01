class Boxplot {

    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.9
        this.height = window.innerHeight * 0.9
        this.margins = {top: 20, bottom:100, left:60, right:20};
    
        this.svg = d3
          .select("#boxplot")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height);

        this.districts = ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8"]
    }

    draw(state, setGlobalState) {

        const bins = d3.histogram()
          .thresholds([1, 2, 3, 4, 5, 6, 7, 8]) //not sure about numeric versus string
        // .thresholds(this.districts)
        //   .domain(this.xScale.domain)
          .value(d => parseInt(d.District))
        (state.long_data)
          .map(bin => {
              bin.sort((a, b) => a.Value - b.Value);
            //   bin.sort((a, b) => d3.ascending(a.District, b.District))
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
              bin.district = "District " + bin.x0;
              bin.distNum = bin.x0;
              return bin;
            })
        console.log("bins", bins)
        
        // set up the scales
        const xScale = d3
            .scaleBand()
            .domain(this.districts)
            .rangeRound([this.margins.left, this.width - this.margins.right])
            .paddingInner(0.3);

        const yScale = d3
            .scaleLinear()
            // .domain([d3.min(bins, d =>  d.range[0]), d3.max(bins, d => d.range[1])]).nice()
            .domain([0, d3.max(state.long_data, d => d.Value)])
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
        
        // make boxes
        const g = this.svg.append("g")
            .selectAll("g")
            .data(bins)
            .join("g");
        
        // vertical line
        g.append("line")
            .attr("stroke", "black")
            .attr('x1', d => xScale(d.district) + xScale.bandwidth()/2)
            .attr('x2', d => xScale(d.district) + xScale.bandwidth()/2)
            .attr('y1', d => yScale(d.r1))
            .attr('y2', d => yScale(d.r0))

        // box 
        g.append("rect")
            .attr("y", d => yScale(d.quartiles[2]))
            .attr("x", d => xScale(d.district))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(d.quartiles[0]) - yScale(d.quartiles[2]))
            .attr("fill", "#ddd")

        // median line
        g.append("line")
            .attr("stroke", "black")
            .attr('x1', d => xScale(d.district))
            .attr('x2', d => xScale(d.district) + xScale.bandwidth())
            .attr('y1', d => yScale(d.quartiles[1]))
            .attr('y2', d => yScale(d.quartiles[1]))

        // outlier dots 
        g.append("g")
            .attr("fill", "currentColor")
            .attr("fill-opacity", 0.2)
            .attr("stroke", "none")
            .attr("transform", d => `translate(${xScale(d.district) + xScale.bandwidth()/2},0)`)
            .selectAll("circle")
            .data(d => d.outliers)
            .join("circle")
            .attr("r", 3)
            .attr("cx", () => (Math.random() - 0.5) * 4)
            .attr("cy", d => yScale(d.Value));


    }


}

export { Boxplot };
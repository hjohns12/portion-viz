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

        // set up the scales
        this.xScale = d3
            .scaleBand()
            .domain(this.districts)
            .rangeRound([this.margins.left, this.width - this.margins.right])
            .paddingInner(0.3);

        this.yScale = d3
            .scaleLinear()
            .domain([0, d3.max(state.long_data, d => d.Value)])
            .range([this.height - this.margins.bottom, this.margins.top])
        
        // make x-axis
        this.xAxis = d3.axisBottom(this.xScale).ticks(12).tickSizeOuter(0);
        this.svg
            .append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${this.height - this.margins.bottom})`)
            .call(this.xAxis)
        
        // make y-axis
        this.yAxis = d3.axisLeft(this.yScale).tickFormat(d3.format(".0%"));
        this.svg
            .append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(${this.margins.left}, 0)`)
            .call(this.yAxis)
            .append("text")
            .attr("class", "axis-label")
            .attr("y", "50%")
            .attr("dx", "-3em")
            .attr("writing-mode", "vertical-rl")
            .text("Democratic voteshare");

        // initialize container
        this.container = this.svg.append("g").attr("class", "container")
    }

    draw(state, setGlobalState) {

        const bins = d3.histogram()
          .thresholds([1, 2, 3, 4, 5, 6, 7, 8]) 
          .value(d => parseInt(d.District))
        (state.filtered_long_data)
          .map(bin => {
              bin.sort((a, b) => a.Value - b.Value);
              const values = bin.map(d => d.Value);
              const min = values[0];
              const max = values[values.length - 1];
              const q1 = d3.quantile(values, 0.25);
              const q2 = d3.quantile(values, 0.50);
              const q3 = d3.quantile(values, 0.75);
              const iqr = q3 - q1; 
              bin.r0 = Math.max(min, q1 - iqr * 1.5);
              bin.r1 = Math.min(max, q3 + iqr * 1.5);
              bin.quartiles = [q1, q2, q3];
              bin.range = [bin.r0, bin.r1];
              bin.outliers = bin.filter(v => v.Value < bin.r0 || v.Value > bin.r1); // TODO - does this make sense?? 
              bin.district = "District " + bin.x0;
              bin.distNum = bin.x0;
              bin.type = bin.map(d => d.type)[0];
              return bin;
            })
        console.log("bins", bins)
        
        // make boxes
            this.container
            .selectAll("g.child")
             .data(bins.filter(d => d.type === state.selectedConstraint))
            .join(enter => enter
                .append("g")
                .attr("class", d => `child ${d.district}, ${d.type}`)
                   .call(sel => sel.append("line") //vertical line
                      .attr("stroke", "black")
                      .attr('x1', d => this.xScale(d.district) + this.xScale.bandwidth()/2)
                      .attr('x2', d => this.xScale(d.district) + this.xScale.bandwidth()/2)
                      .attr('y1', d => this.yScale(d.r1))
                      .attr('y2', d => this.yScale(d.r0))
                   )
                   .call(sel => sel.append("rect") //box 
                      .attr("y", d => this.yScale(d.quartiles[2]))
                      .attr("x", d => this.xScale(d.district))
                      .attr("width", this.xScale.bandwidth())
                      .attr("height", d => this.yScale(d.quartiles[0]) - this.yScale(d.quartiles[2]))
                      .attr("fill", "#ddd")
                   )
                   .call(sel => sel.append("line") // median line
                      .attr("stroke", "black")
                      .attr('x1', d => this.xScale(d.district))
                      .attr('x2', d => this.xScale(d.district) + this.xScale.bandwidth())
                      .attr('y1', d => this.yScale(d.quartiles[1]))
                      .attr('y2', d => this.yScale(d.quartiles[1]))
                      )
                   .call(sel => sel.append("g") // outlier dots 
                      .attr("fill", "currentColor")
                      .attr("fill-opacity", 0.2)
                      .attr("stroke", "none")
                      .attr("transform", d => `translate(${this.xScale(d.district) + this.xScale.bandwidth()/2},0)`)
                      .selectAll("circle")
                      .data(d => d.outliers)
                      .join("circle")
                      .attr("class", 'outlier-dots')
                      .attr("r", 3)
                      .attr("cx", () => (Math.random() - 0.5) * 4)
                      .attr("cy", d => this.yScale(d.Value))
                      .on('click', d => {setGlobalState({ clickedOutlier: d }) })
                    ),
                update => update,
                exit => exit.remove()
                );
    }
}

export { Boxplot };
class Boxplot {

    constructor(state, setGlobalState) {
        this.width = window.innerWidth * 0.6
        this.height = window.innerHeight * 0.6
        this.margins = {top: 20, bottom:20, left:20, right:20};
    
        this.svg = d3
          .select("#boxplot")
          .append("svg")
          .attr("width", this.width)
          .attr("height", this.height);
        
        console.log("state.domain", state.domain)

        const districts = ["1", "2", "3", "4", "5", "6", "7", "8"]
        this.districtData = district.map(metric => {
            return {
              district: district,
              value: state.data ? state.data[district] : 0,
            };
          });
        
        this.xScale = d3
          .scaleBand()
          .domain(districts)
          .range([this.margins.left, this.width - this.margins.right])
          .paddingInner(0.05);
        
        const yScale = d3
          .scaleLinear()
          .domain(state.domain)
          .range([this.height - this.margins.top, this.margins.bottom]);
    }

    draw(state, setGlobalState) {

    }


}

export { Boxplot };
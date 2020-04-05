class Table {

    constructor(state, setGlobalState) {
        const columns = ["D Seats", "R Seats", "EG"];
        this.table = d3.select("#table").append("table");

        this.table
          .append("thead")
          .append("tr")
          .selectAll("th")
          .data(columns)
          .join("th")
          .text(d => d);

        // make this a "this" to invoke global scope
        this.tableRows = this.table
        .append("tbody")
        .selectAll("tr")
        .data(["", "", ""])
        .join("tr")
    //  .style("background-color", d => this.colorScale(d['Total Housing Units']))
    //  .style("background-color", 'gray')
    //  .style("color", "#eee");


    }

    draw(state) {
        const formatValue = d3.format(".3");

        if (state.clickedData !== null) {

            const selectData = [state.clickedData].map(d => ({
                "D Seats": +d.D_seats,
                "R Seats": 8 - +d.D_seats,
                "EG": formatValue(d.eg),
            }))
            console.log("selectData", selectData);            

            this.tableRows = this.table
            .append("tbody")
            .selectAll("tr")
            .data(selectData)
            .join("tr")

           this.tableRows
             .selectAll("td")
             .data(d => Object.values(d))
             .join("td")
             .text(d => d);
        }

    }




}

export { Table };
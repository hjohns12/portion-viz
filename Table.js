class Table {

    constructor(state, setGlobalState) {
        const columns = ["D Seats", "R Seats", "Efficiency Gap"];
        this.table = d3.select("#table").append("table");

        this.table
          .append("thead")
          .append("tr")
          .selectAll("th")
          .data(columns)
          .join("th")
          .text(d => d);

    }
    draw(state) {
        const formatValue = d3.format(".3");

        if (state.clickedData !== null) {
            
            const selectData = [state.clickedData].map(d => ({
                "D Seats": +d.D_seats,
                "R Seats": 8 - +d.D_seats,
                "Efficiency Gap": formatValue(d.eg),
            }))
            
            // this.table
            //   .selectAll("table.child")
            //   .data(selectData)
            //   .join(enter => enter
            //     // .append("tbody") //or should this be tr?
            //     .call(sel => sel.append("tr")
            //     .join("td")
            //     .text(d => Object.values(d))
            //     ),
            //     update => update,
            //     exit => exit.remove()
            //     );

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
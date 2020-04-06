// import our components
import { Explainer } from "./Explainer.js";
import { Boxplot } from "./Boxplot.js";
import { Beeswarm } from "./Beeswarm.js";
import { Table } from "./Table.js";

// let table, boxplot, beeswarm;
let boxplot, beeswarm, table, explainer;

// global state
let state = {
  data: [],
  domain: [],
  selectedConstraint: null, 
  long_data: [],
  filtered_long_data: [],
  clickedData: null,
  clickedHash: null,
};

d3.csv("./data/sampled-plans.csv", d3.autoType).then(data => {
  state.data = data;
  state.domain = [
    0, 
    d3.max(data
      .map(d => [d["1"], d["2"], d["3"], d["4"], d["5"], d["6"], d["7"], d["8"]])
      .flat()
    )]
  const long_data = [];
  data.forEach( function(row) {
    Object.keys(row).forEach(function(colname) {
      if(colname == "District" || colname == "Value" || 
         colname == "type" || colname == "eg" || colname == "id" ||
         colname == "D_seats" || colname == "hash") {
        return
      }
      long_data.push({"District": colname,
                      "Value": +row[colname],
                      "type": row["type"],
                      "eg": row["eg"],
                      "id": row["id"],
                      "D_seats": row["D_seats"],
                      "hash": row["hash"] });
    });
  });
  state.long_data = long_data;
  init();
})

function init() {
  const initial_value = "Select a constraint";
  const selectElement = d3.select('#dropdown').on("change", function(){
    let tempFilterLong = [];
    setGlobalState({selectedConstraint: this.value})
    tempFilterLong = state.long_data.filter(d => d.type === state.selectedConstraint)
    setGlobalState({
      filtered_long_data: tempFilterLong
    });
  });
  selectElement
    .selectAll("option")
    .data([...Array.from(new Set(state.data.map(d => d.type))), initial_value])
    .join("option")
    .attr("value", d => d)
    .text(d => d);
  selectElement.property("value", initial_value);
  boxplot = new Boxplot(state, setGlobalState);
  beeswarm = new Beeswarm(state, setGlobalState);
  table = new Table(state, setGlobalState);
  explainer = new Explainer();
  draw();
}

function draw() {
  boxplot.draw(state, setGlobalState);
  beeswarm.draw(state, setGlobalState);
  table.draw(state);
}

// UTILITY FUNCTION: 
// state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}

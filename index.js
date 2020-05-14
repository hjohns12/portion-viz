// import our components
import { Boxplot } from "./Boxplot.js";
import { Explainer } from "./Explainer.js";
import { Beeswarm } from "./Beeswarm.js";
import { Table } from "./Table.js";

// let table, boxplot, beeswarm;
let boxplot, beeswarm, table, explainer;

// global state
let state = {
  data: [],
  selectedConstraint: null, 
  long_data: [],
  filtered_long_data: [],
  clickedData: null,
  clickedHash: null,
};

d3.csv("./data/stsen_05_data_sampled.csv", d3.autoType).then(data => {
  state.data = data;
  const long_data = [];
  data.forEach( function(row) {
    Object.keys(row).forEach(function(colname) {
      if(colname == "District" || colname == "Value" || 
         colname == "election" || colname == "eg" || colname == "id" ||
         colname == "D_seats" || colname == "hash") {
        return
      }
      long_data.push({"District": colname,
                      "Value": +row[colname],
                      "election": row["election"],
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
  // const initial_value = "Select an election";
  // const selectElement = d3.select('#dropdown').on("change", function(){
  //   let tempFilterLong = [];
  //   setGlobalState({selectedConstraint: this.value})
  //   tempFilterLong = state.long_data.filter(d => d.election === state.selectedConstraint)
  //   setGlobalState({
  //     filtered_long_data: tempFilterLong
  //   });
  // });
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

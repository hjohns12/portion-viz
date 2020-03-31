// import our components
// import { Table } from "./Table.js";
import { Boxplot } from "./Boxplot.js";
import { Beeswarm } from "./Beeswarm.js";

// let table, boxplot, beeswarm;
let boxplot, beeswarm;

// global state
let state = {
  data: [],
};

function type(d) {
    if (!d.eg) return;
    d.eg = +d.eg;
    return d;
}

d3.csv("../data/sampled-plans.csv", type).then(data => {
  console.log("data", data);
  state.data = data;
  // state.domain = [
  //   0, 
  //   d3.max(data
  //     .map(d => [d["1"], d["2"], d["3"], d["4"], d["5"], d["6"], d["7"], d["8"]])
  //     .flat()
  //   )]
  const long_data = [];
  data.forEach( function(row) {
    Object.keys(row).forEach(function(colname) {
      if(colname == "District" || colname == "Value") {
        return
      }
      long_data.push({"District": colname,
                      "Value": row[colname],
                      "type": row["type"],
                      "eg": row["eg"],
                      "id": row["id"],
                      "somevalue": row["Unnamed: 0"] });
    });
  });
  state.long_data = long_data;
  console.log("long data", state.long_data);
  init();
})

function init() {
//   table = new Table(state, setGlobalState);
  boxplot = new Boxplot(state, setGlobalState);
  beeswarm = new Beeswarm(state, setGlobalState);
  draw();
}

function draw() {
//   table.draw(state);
  boxplot.draw(state, setGlobalState);
  beeswarm.draw(state, setGlobalState);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}

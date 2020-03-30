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
  state.domain = [
    0, 
    d3.max(data
      .map(d => [d["0"], d["1"], d["2"], d["3"], d["4"], d["5"], d["6"], d["7"]])
      .flat()
    )]
  init();
});

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

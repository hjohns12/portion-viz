class Explainer {
    constructor() {
        d3.select("#explainer").append("p")
            .html(`To explore the data,
             <span class="fancy-text">click on a dot from either graph</span> to observe its corresponding value in the other.`)
             .append("p")
            .text(
            `Every dot represents a possible state senate redistricting plan for the state of Missouri. I 
            generated one million maps using Markov Chain Monte Carlo sampling. 
            I randomly selected 1,000 plans from each ensemble for these graphs.`)
            .append("p")
            .html(`The efficiency gap is a method for measuring partisan gerrymandering. Anything <span class="fancy-text">above 0.7 or below -0.7 is 
            considered extreme.</span>`)

    }
}

export { Explainer};
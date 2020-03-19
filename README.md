# portion-viz

For my Interactive Data Visualization class, I'm creating an exploratory visualization of House of Representatives counts by state under various apportionment scenarios. This is meant to help people explore some issues at stake when redistricting happens in 2021.

Broadly, the idea is to create a [cartogram](http://maggielee.net/georgia-county-cartogram/) of the US map based on a few different variables. When a user makes a selection from a number of different drop-down options, the size of the state adjusts to the number of estimated representatives each state would have. I'm interested in drawing attention to a number of open questions surrounding the 2020 census, reapportionment, and redistricting: 1) how differential privacy could impact redistricting, 2) how districts could be gerrymandered on the basis of citizenship, and 3) different methods of apportionment that exist (and could be used).

The first two areas of exploration will not actually impact congressional apportionment -- no matter what, the number of U.S. Representatives will be calculated based on total population. However, when redistricting within each state happens, citizenship and differential privacy could hugely change how political lines are drawn. This visualization aims to illustrate the scope of possible changes based on those variables.

The user for this might be a policymaker or citizen with questions about the census, redistricting, and/or reapportionment. It could also be a journalist who wants help understanding these issues. 



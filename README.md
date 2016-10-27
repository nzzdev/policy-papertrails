# Policy Papertrails

The NZZ Storytelling [EditorsLab](http://www.globaleditorsnetwork.org/programmes/editors-lab/sz-editors-lab/) project. Work in progress, powered by neurons, code and Bavarian beer. 

## The problem
* Too little reporting on policy making is done in a structured, data-informed way, but based on agenda setting, current events and anecdotal evidence. 
* We believe this is partly a mindset-problem, but also due to a lack of easy-to-use research tools.

## The project
* A searchable database of all public records from the Swiss parliament (that is word protocols, motions, petitions, votes, etc.), as provided by parlament.ch.
* It allows you to see when, in what contexts and by whom certain issues have been brought up and how policy decisions have formed.
* It allows you to see patterns and outliers that make for stories of public interest. 

## Example queries / stories
* ███████████████████████████████████████████ 
* ████████████████████████████████
* ████████████████████████
* ████████████████████████████████████████

Not going to share those for now. ¯\\ _(ツ)_ /¯

## Tech

### /api
This contains a node service to deploy to Cloud Foundry using `cf deploy` (need to be logged into a cloud foundry instance). It serves one endpoint `/affairs` accepting a `q` query parameter that is then used to search through all fields in Elasticsearch.

### /indexer
This folder contains a node script to store all the affairs from http://ws-old.parlament.ch into elasticsearch. Change config.js to limit the pages to be indexed when you run with `node index.js`. Add a file `vcap.js` exporting an object with a property `compose-for-elasticsearch` that is the Elasticsearch environment variables from Cloudfoundry/Bluemix.

### /ui
Contains a Webapp to be used to search the index. `npm install && jspm install` will install the dependencies. Run it with `gulp watch`.

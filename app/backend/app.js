const express = require('express')
const app = express()
const port = 8000
const axios = require('axios');
const cors = require("cors")

app.use(cors())

app.get('/dbpedia', async (req, res) => {
  console.log('Request to /dbpedia endpoint');
  // example query do DBPedia SPARQL Endpoint
  axios.get('https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=select+distinct+%3FConcept+where+%7B%5B%5D+a+%3FConcept%7D+LIMIT+100&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on')
    .then((response) => {
      res.send(response.data);
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
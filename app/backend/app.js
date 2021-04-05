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

// WRITER ENDPOINTS

app.get('/dbpedia/writer/search', async (req, res) => {
  console.log('Request to /dbpedia/search endpoint');

  const query = `SELECT DISTINCT ?obj, ?label
    WHERE {
      ?obj rdf:type dbo:Writer .
      ?obj rdfs:label ?label .
      FILTER regex(?label, "${req.query.text}")
    }`;

  axios.get(`http://live.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on`)
    .then((response) => {
      res.send(response.data);
    });
})

app.get('/dbpedia/writer/books', async (req, res) => {
  const query = `SELECT DISTINCT ?obj, ?label
   WHERE {
     ?obj rdf:type dbo:Book .
     ?obj rdfs:label ?label .
     ?obj dbo:author dbr:${req.query.label}
   }`;

   axios.get(`http://live.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on`)
   .then((response) => {
     res.send(response.data);
   });
})

// hmmm dont know if we should keep it as it isnt very easilt filtered. better to keep just the book subjects in the app
app.get('/dbpedia/writer/subjects', async (req, res) => {
  const query = `SELECT DISTINCT ?obj, ?label
    WHERE {
      ?obj rdf:type skos:Concept .
      ?obj rdfs:label ?label .
      dbr:${req.query.label} dct:subject ?obj .
    }`

  axios.get(`http://live.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on`)
  .then((response) => {
    res.send(response.data);
  });
})

// BOOK ENDPOINTS

app.get('/dbpedia/book/search', async (req, res) => {
  console.log('Request to /dbpedia/search endpoint');

  const query = `SELECT DISTINCT ?obj, ?label
    WHERE {
      ?obj rdf:type dbo:Book .
      ?obj rdfs:label ?label .
      FILTER regex(?label, "${req.query.text}")
    }`;

  axios.get(`http://live.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on`)
    .then((response) => {
      res.send(response.data);
    });
})

// SUBJECT ENDPOINTS
// 
app.get('/dbpedia/subject/search', async (req, res) => {
  console.log('Request to /dbpedia/search endpoint');

  const query = `SELECT DISTINCT ?obj, ?label
    WHERE {
      ?obj rdf:type skos:Concept .
      ?obj rdfs:label ?label .
      FILTER EXISTS { SELECT ?obj2 WHERE { ?obj2 rdf:type dbo:Book . ?obj2 dct:subject ?obj } } .
      FILTER regex(?label, "${req.query.text}")
    }`;

  axios.get(`http://live.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on`)
    .then((response) => {
      res.send(response.data);
    });
})

// PUBLISHER ENDPOINTS

app.get('/dbpedia/publisher/search', async (req, res) => {
  const query = `SELECT DISTINCT ?obj, ?label
    WHERE {
      ?obj rdf:type dbo:Publisher .
      ?obj rdfs:label ?label .
      FILTER regex(?label, "${req.query.text}")
    }`;

  axios.get(`http://live.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(query)}&format=application%2Fsparql-results%2Bjson&timeout=30000&signal_void=on&signal_unconnected=on`)
    .then((response) => {
      res.send(response.data);
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
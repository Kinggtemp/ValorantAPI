const express = require("express");
const fs = require("fs");
const app = express();
var cors = require("cors");
app.use(cors());

app.get("/agents", (req, res) => {
  // read the JSON file
  fs.readFile("agents.json", "utf8", (err, data) => {
    // send the JSON file to the user
    res.send(data);
  });
});


app.get("/agents/:id", (req, res) => {
  // read
  fs.readFile("agents.json", "utf8", (err, data) => {
    // parse
    const response = JSON.parse(data);

    const agents = response.data;
    console.log(data);
    // find the agent
    const agent = agents.find(agent => agent.displayName === req.params.id);
    // send the agent
    res.send(agent);
  });

});

app.get("/", (req, res) => {
  // read the JSON file
  fs.readFile("agents.json", "utf8", (err, data) => {
    // send the JSON file to the user
    res.send(data);
  });
});

app.delete('/agents/:id', function (req, res) {
  fs.readFile('agents.json', 'utf8', function (err, data) {
    var agentName = req.params.id
    let valorantReponse = JSON.parse(data)
    console.log('you requested Agent to be deleted ' + agentName)
    for (var i = 0; i < valorantReponse.data.length; i++) {
      if (valorantReponse.data[i].displayName == agentName) {
        valorantReponse.data.splice(i, 1)
      }
    }
    fs.writeFile('agents.json',
      JSON.stringify(valorantReponse), function
      (err) {
      if (err) { return console.log(err) }
    })
  })
  res.end('Agent removed if it existed')
  //res.end is what we send back to the browser
})

app.post('/agents', function (req, res) {
  // parses the request url
  var newAgent = req.body
  fs.readFile('agents.json', 'utf8', function (err, data) {
    valorantReponse = JSON.parse(data)
    valorantReponse.push(newAgent)
    res.end(JSON.stringify(valorantReponse))
    fs.writeFile('agents.json',
      JSON.stringify(valorantReponse), function
      (err) {
      if (err) { return console.log(err) }
    })
  })
})

app.put('/agents', function (req, res) {
  var updatedAgent = req.body
  fs.readFile('agents.json', 'utf8',
    function (err, data) {
      valorantReponse = JSON.parse(data)
      for (var i = 0; i < valorantReponse.data.length; i++) {
        if (valorantReponse.data[i].displayName == updatedAgent.displayName) {
          valorantReponse.data[i] = updatedAgent
        }
      }
      res.end(JSON.stringify(data))
      fs.writeFile('agents.json',
        JSON.stringify(valorantReponse), function
        (err) {
        if (err) { return console.log(err) }
      })
    })
  res.end('Agent has been updated')
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
})

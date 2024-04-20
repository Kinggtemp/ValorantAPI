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

  app.listen(8081, () => { 
    console.log("Server is running on port 8081");
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

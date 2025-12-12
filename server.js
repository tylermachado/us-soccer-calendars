// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const mlsClubs = require('./data/clubs/mls.json');
const generateMLS = require('./scripts/generateMLS');

app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/cron", (request, response) => {
  generateMLS();
  response.sendStatus(200);
});

mlsClubs.forEach(club => {
  app.get(`/${club.abbreviation}`, function (request, response) {
    const url = __dirname + `/public/${club.abbreviation}.ics`;
    const webcalurl = url.replace('webcal://', 'http://');
    response.set('Content-Type', 'text/calendar');
    response.sendFile(webcalurl);
    response.status(200);
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

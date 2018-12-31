const https = require("https");
const fs = require("fs");
var path = require('path')
const app = require("./app");
helmet = require("helmet");
// set the view engine to ejs
app.set("view engine", "ejs");
var server              = require('http').createServer(app);
const port = process.env.PORT || 3702;
server.listen(port, function () {
  console.log(`Example app listening on port ${port}! Go to https://localhost:${port}/`)
})

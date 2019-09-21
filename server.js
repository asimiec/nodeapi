const http = require("http");
const fs = require("fs");
var path = require('path')
const app = require("./app");
helmet = require("helmet");
// set the view engine to ejs
app.set("view engine", "ejs");
var server              = require('http').createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, '172.31.24.18',function () {
  console.log(`Example app listening on port ${port}! Go to https://localhost:${port}/`)
})

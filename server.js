const https = require("https");
const fs = require("fs");
var path = require('path')
const app = require("./app");
helmet = require("helmet");
// set the view engine to ejs
app.set("view engine", "ejs");
const port = process.env.PORT || 3702;
// const server = http.createServer(app);
// server.listen(port, () => {
//   console.log(`Server created on ${port}`);
//   // console.log(process.env);
// });
app.use(helmet()); // Add Helmet as a middleware
var options = {
  // key: fs.readFileSync( 'server.key' ),
  // cert: fs.readFileSync( 'server.crt' ),
  // requestCert: false,
  // rejectUnauthorized: false
  key: fs.readFileSync(path.resolve('server.key')),
  cert: fs.readFileSync(path.resolve('server.crt'))
};
https.createServer(options, app)
.listen(port, function () {
  console.log(`Example app listening on port ${port}! Go to https://localhost:${port}/`)
})
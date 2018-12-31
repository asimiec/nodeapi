var fs = require('fs');
var https = require('https');
var options = {
  key: fs.readFileSync('server_key.pem'),
  cert: fs.readFileSync('server_cert.pem'),
  requestCert: true,
  rejectUnauthorized: true
  };
var server = https.createServer(options, function(req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello World!');
});
var port = 4001;
//server.listen(port);
//You can also specify which interface you want to listen on:
var address = '172.20.20.157';
server.listen(port, address, function() {
  console.log('Server is listening on port', server.address().port);
  });
const fs = require("fs");
const http = require("http");

////////////////
// Server
const server = http.createServer((req, res) => {
  res.end("Hello from the server!");
});

server.listen("5000", "127.0.0.1", () => {
  console.log("Listening to request on port 5000");
});

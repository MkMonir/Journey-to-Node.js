const EventEmmiter = require('events');
const http = require('http');

class Sales extends EventEmmiter {
  constructor() {
    super();
  }
}
const myEmmiter = new Sales();

myEmmiter.on('newSale', () => {
  console.log('There was a new sale');
});
myEmmiter.on('newSale', () => {
  console.log('Customar name : Monir');
});
myEmmiter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock `);
});

myEmmiter.emit('newSale', 10);

//////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received');
  res.end('Request received');
});

server.on('request', (req, res) => {
  console.log('Another request');
});

server.listen(9000, '127.0.0.1', () => {
  console.log('Waiting for req');
});

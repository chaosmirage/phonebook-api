import http from 'http';

const server = http.createServer((req, res) => {
  res.end('Hello world');
})

server.listen(4001, () => console.log('listen 4001'));

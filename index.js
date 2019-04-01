import http from 'http';

const server = http.createServer((req, res) => {
  res.end('Hello world');
})

server.listen(6666, () => console.log('listen 6666'));

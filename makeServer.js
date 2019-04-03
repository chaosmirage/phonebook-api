import http from 'http';
import url from 'url';

const router = {
  GET: {
    '/': (req, res, users) => {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(users).length}`,
      ];

      res.end(messages.join('\n'));
    },
    '/users.json': (req, res, users) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(users));
    },
  }
}

export default (users) => http.createServer((req, res) => {
  const routes = router[req.method];
  const { pathname } = url.parse(req.url);

  const routeName = Object.keys(routes).find(str => {
    if (!pathname) {
      return false;
    }

    if (pathname !== str) {
      return false;
    }

    return true;
  });


  if (!routeName) {
    res.writeHead(404);
    res.end('Not found');
  } else {
    routes[routeName](req, res, users);
  }
});

import http from 'http';
import url from 'url';
import querystring from 'querystring';

const getParams = (address) => {
  const { query = '' } = url.parse(address);
  return querystring.parse(decodeURI(query));
}

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
      const { name: nameParam } = getParams(req.url);

      res.setHeader('Content-Type', 'application/json');

      if (nameParam) {
        const filtered = Object.values(users)
          .filter(({ name }) => {
            const preparedName = name.toLowerCase();
            const preparedNameParam = nameParam.trim().toLowerCase();

            return preparedName.includes(preparedNameParam);
          })

        res.end(JSON.stringify(filtered));
        return;
      }

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

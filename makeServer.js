import http from 'http';
import url from 'url';
import querystring from 'querystring';

const getParams = (address) => {
  const { query = '' } = url.parse(address);
  return querystring.parse(decodeURI(query));
}

const router = {
  GET: {
    '/': (req, res, matches, users) => {
      const messages = [
        'Welcome to The Phonebook',
        `Records count: ${Object.keys(users).length}`,
      ];

      res.end(messages.join('\n'));
    },
    '/users.json': (req, res, matches, users) => {
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
    '/users/(\\w+).json': (req, res, matches, users) => {
      const id = matches[1];
      const user = users[id];

      res.setHeader('Content-Type', 'application/json');

      if (!user) {
        res.writeHead(404);
        res.end('User not found');
      } else {
        res.end(JSON.stringify(user));
      }
    },
  }
}

export default (users) => http.createServer((req, res) => {
  const routes = router[req.method];
  const { pathname } = url.parse(req.url);

  const route = Object.keys(routes).find(str => {
    if (!pathname) {
      return false;
    }

    const regexp = new RegExp(`^${str}$`);
    const matches = pathname.match(regexp);

    if (!matches) {
      return false;
    }

    routes[str](req, res, matches, users);
    return true;
  });


  if (!route) {
    res.writeHead(404);
    res.end('Not found');
  }
});

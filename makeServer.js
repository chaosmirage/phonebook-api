import http from 'http';

export default (users) => http.createServer((req, res) => {
  const messages = [
    'Welcome to The Phonebook',
    `Records count: ${Object.keys(users).length}`,
  ];

  res.end(messages.join('\n'));
});

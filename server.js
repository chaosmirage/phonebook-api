import fs from 'fs';
import path from 'path';
import util from 'util';
import makeServer from './makeServer';

const readFile = util.promisify(fs.readFile);

const server = async (port, callback = () => {}) => {
  try {
    const data = await readFile(path.resolve(__dirname, 'phonebook.txt'));
    const users = data
      .toString()
      .trim()
      .split('\n')
      .reduce((acc, value) => {
        const [id, name, phone] = value.split('|').map(item => item.trim());
        acc[id] = { name, phone };
        return acc;
      }, {});

      const server = makeServer(users);
      server.listen(port, callback.bind(null, server));
  } catch (e) {
    console.log(e);
  }
}

export default server;

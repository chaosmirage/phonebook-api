/**
 * @jest-environment node
 */

import axios from 'axios';
import server from '../server';

const hostname = 'localhost';
const port = 4003;
const url = `http://${hostname}:${port}`;

describe('phonebook', () => {
  it('/', (done) => {
    server(port, async (s) => {
      try {
        const { data } = await axios.get(url);
        expect(data).toBe('Welcome to The Phonebook\nRecords count: 200');
        done();
      } catch (e) {
        done(e);
      } finally {
        s.close();
      }
    });
  });

  it('/users.json', (done) => {
    server(port, async (s, users) => {
      try {
        const { data } = await axios.get(`${url}/users.json`);
        expect(data).toEqual(users);
        done();
      } catch (e) {
        done(e);
      } finally {
        s.close();
      }
    })
  })
})

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

  it('/undefined', (done) => {
    server(port, async (s, users) => {
      try {
        const { status } = await axios.get(
          `${url}/abc`,
          { validateStatus: () => true },
        );

        expect(status).toBe(404);
        done();
      } catch (e) {
        done(e);
      } finally {
        s.close();
      }
    })
  })

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

  it('/users?name="Ruby"', (done) => {
    server(port, async (s, users) => {
      try {
        const { data } = await axios.get(`${url}/users.json?name=Ruby`);
        expect(data).toEqual([
          {
            name: 'Ruby Russel Sr.',
            phone: '386.997.2221',
          },
        ]);
        done();
      } catch (e) {
        done(e);
      } finally {
        s.close();
      }
    })
  })
})

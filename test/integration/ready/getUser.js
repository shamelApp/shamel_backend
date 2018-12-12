const dotenv = require('dotenv');
const axios = require('axios');
const { expect } = require('chai');

dotenv.config({ silent: true });

const { BASE_URL } = process.env;

describe('Test ready link', () => {
  it('Should return 200 with Auto user object', async () => {
    const res = await axios.get(`${BASE_URL}/ready`, {
      headers: {
        Authorization: 'Bearer 123',
      },
    });

    const expectedData = {
      _id: '5c06763faa4a0e0117f7bae7',
      firstName: 'Auto',
      lastName: 'user',
    };

    expect(res.status).to.be.equal(200);
    expect(res.data).to.deep.equal(expectedData);
  });
});

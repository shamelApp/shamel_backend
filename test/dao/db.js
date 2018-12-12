const { ObjectId } = require('mongodb');
const { assert } = require('chai');

const common = require('../../lib/db/common_db');
const db = require('../../lib/db');

describe('Testing DB functions for user table...', () => {
  let collection;
  let client;

  before(async () => {
    await db.connect();
    client = db.getClient();
    collection = client.collection('user');
  });

  it('find user with firstName Auto', async () => {
    const results = await common.find(collection, { firstName: 'Auto' });
    assert.isNotEmpty(results, 'User should exist');

    const actualUser = results[0];

    const expectedUser = {
      _id: ObjectId('5c06763faa4a0e0117f7bae7'),
      firstName: 'Auto',
      lastName: 'user',
    };

    assert.deepEqual(actualUser, expectedUser);
  });
});

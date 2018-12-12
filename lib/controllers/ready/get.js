const common = require('../../db/common_db');
const { makeError } = require('../../errors/utils');

async function getUser(db, req, res) {
  try {
    const collection = await db.collection('user');
    const results = await common.find(collection, { firstName: 'Auto' });
    const data = results[0];
    res.statusCode = 200;
    res.json(data);
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.send(makeError(error.message, 500));
  }
}

module.exports = { getUser };

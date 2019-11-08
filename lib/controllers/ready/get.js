const { makeError } = require('../../errors/utils');

async function isReady(db, req, res) {
  try {
    res.statusCode = 204;
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.send(makeError(error.message, 500));
  }
}

module.exports = { isReady };

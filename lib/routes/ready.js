const { partial } = require('lodash');

const { isReady } = require('../controllers/ready/get');

function getStatus() {
  const status = {};
  status.response = 'OK';
  return status;
}

function ready(router, db) {
  router.get('/', partial(isReady, db));

  return router;
}

module.exports = {
  ready,
  getStatus,
};

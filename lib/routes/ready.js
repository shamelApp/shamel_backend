const { partial } = require('lodash');

const { getUser } = require('../controllers/ready/get');

function getStatus() {
  const status = {};
  status.response = 'OK';
  return status;
}

function ready(router, db) {
  router.get('/', partial(getUser, db));

  return router;
}

module.exports = {
  ready,
  getStatus,
};

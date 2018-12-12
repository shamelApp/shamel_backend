const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { isEmpty } = require('lodash');

const logger = require('../../lib/utils/logger').Logger;
const { getMongoUrl } = require('./db_config');

dotenv.config({ silent: true });

let client;

(async function connect() {
  if (isEmpty(client)) {
    try {
      const mongoUrl = getMongoUrl();
      const db = await MongoClient.connect(
        mongoUrl,
        { useNewUrlParser: true },
      );
      const { MONGODB_DATABASE } = process.env;

      client = db.db(MONGODB_DATABASE);
    } catch (err) {
      logger.error(err.message);
    }
  }
})();

function collection(name) {
  if (isEmpty(client)) {
    throw new Error('Could not connect to MongoDB');
  } else if (!isEmpty(client) && !client.serverConfig.isConnected()) {
    logger.error('MongoDB connection interrupted');
    throw new Error('MongoDB connection interrupted');
  }
  return client.collection(name);
}

module.exports = { collection };

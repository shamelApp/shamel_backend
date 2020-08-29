const mysql = require('mysql');
const dotenv = require('dotenv');
const { isEmpty } = require('lodash');

const logger = require('../../lib/utils/logger').Logger;
const { getMySQLUrl } = require('./db_config');

dotenv.config({ silent: true });

let client;

async function connect() {
  if (isEmpty(client)) {
    try {
      const mysqlUrl = getMySQLUrl();
      const connection = await mysql.createConnection(mysqlUrl);
      await connection.connect();
    } catch (err) {
      logger.error(err.message);
    }
  }
}

(async function connectMySQLDB() {
  await connect();
})();

module.exports = { connect };

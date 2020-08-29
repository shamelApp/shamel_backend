const dotenv = require('dotenv');

dotenv.config({ silent: true });

const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PWD } = process.env;

const dbConfig = {};
dbConfig.getMySQLUrl = () => {
  const url = `mysql://${MYSQL_USER}:${MYSQL_PWD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`;
  return url;
};

module.exports = dbConfig;

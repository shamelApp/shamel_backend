const dotenv = require('dotenv');

dotenv.config({ silent: true });

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE, MONGODB_USER, MONGODB_PWD } = process.env;

const dbConfig = {};
dbConfig.getMongoUrl = () => {
  const url = `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
  return url;
};

module.exports = dbConfig;

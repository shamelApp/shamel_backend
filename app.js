const dotenv = require('dotenv');
const express = require('express');

const defaultRouter = require('./lib/routers/default');
const errorHandler = require('./lib/errors/errorHandler');
const ErrStrategies = require('./lib/errors/strategies');
const indexRoute = require('./lib/routes/index');
const { ready: readyRoute } = require('./lib/routes/ready');
const { Logger: logger } = require('./lib/utils/logger');
const db = require('./lib/db');

dotenv.config({ silent: true });

const app = express();
const appErrorHandler = errorHandler([ErrStrategies.defaultStrategy]);
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  req.getVersion = function validateVer() {
    return req.headers.accept.split('version=')[1];
  };
  next();
});

app.use('/', indexRoute(defaultRouter()));
app.use('/ready', readyRoute(defaultRouter(), db));

appErrorHandler(app);

app.listen(PORT, () => {
  logger.info(`areeba backend listening on port: ${PORT}`);
});

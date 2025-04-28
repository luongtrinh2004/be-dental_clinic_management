const config = require('./config');

const allowOrigins = [`${config.url.client}`];

const corsOptions = {
  origin: [...allowOrigins],
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

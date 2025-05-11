const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');

const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');

const routes = require('./routes/v1');

const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

// Logging
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// Bảo mật headers
app.use(helmet());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ngăn XSS và NoSQL injection
app.use(xss());
app.use(mongoSanitize());

// Nén dữ liệu
app.use(compression());

// Cho phép CORS
app.use(cors());
app.options('*', cors());

// Xác thực JWT
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Giới hạn request sai nếu production
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// Dùng route tổng
app.use('/v1', routes);

// Route mặc định
app.get('/', (_req, res) => {
  res.send('Welcome to the universe MP-LG API');
});

// Route không tồn tại
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Xử lý lỗi
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

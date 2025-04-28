const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyCallback = (req, resolve, reject, roles) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (roles.length) {
    const check = roles.includes(user.role);
    if (!check && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }
  resolve();
};

const auth =
  (...roles) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, roles))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;

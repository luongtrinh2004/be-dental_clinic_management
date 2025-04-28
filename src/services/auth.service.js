const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Your account does not exist');
  }

  if (user.status !== 'active') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Your account has been deactivated');
  }

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.deleteOne();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Resets the user's password to a new value.
 * This function updates the user's password field and saves the user object.
 *
 * @param {string} userId - The unique identifier of the user whose password is being reset.
 * @param {string} newPassword - The new password to set for the user.
 * @throws {ApiError} Throws an ApiError with a 404 status if the user is not found.
 * @returns {Promise<void>} A promise that resolves when the password reset is successful.
 */
const resetUserPassword = async (userId, newPassword) => {
  const user = await userService.getUserById(userId);
  user.password = newPassword;
  await user.save();
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    await resetUserPassword(resetPasswordTokenDoc.user, newPassword);
    await Token.deleteMany({ user: resetPasswordTokenDoc.user, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify the user's email address.
 * This function will set the isEmailVerified property of a user to true.
 *
 * @param {string} userId - The unique identifier of the user whose email needs to be verified.
 * @throws {ApiError} Throws an ApiError if the user is not found.
 * @returns {Promise<void>} A promise that resolves when the email verification is successful.
 */
const verifyUserEmail = async (userId) => {
  const user = await userService.getUserById(userId);
  user.isEmailVerified = true;
  await user.save();
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    await verifyUserEmail(verifyEmailTokenDoc.user);
    await Token.deleteMany({ user: verifyEmailTokenDoc.user, type: tokenTypes.VERIFY_EMAIL });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};

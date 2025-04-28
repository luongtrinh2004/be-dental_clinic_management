const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service');
const { User } = require('../models');

const updatePassword = async (userId, payload) => {
  const user = await getUserById(userId);

  if (!(await user.isPasswordMatch(payload.currentPassword))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect password!');
  }

  Object.assign(user, { password: payload.newPassword });
  await user.save();
  return user;
};

const updateAccount = async (userId, userBody) => {
  const user = await getUserById(userId);
  Object.assign(user, userBody);
  await user.save();
  return user;
};

// Upload user avatar
const updateAvatar = async (userId, file) => {
  const user = await User.findById(userId);

  if (file) {
    try {
      const avatarPath = `${process.env.BASE_URL}/avatars/${userId}.jpg`;
      user.avatar = avatarPath;

      await user.save();
      return user;
    } catch (err) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Error while updating avatar: ${err.message}`);
    }
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Upload avatar failed');
};

module.exports = {
  updatePassword,
  updateAccount,
  updateAvatar,
};

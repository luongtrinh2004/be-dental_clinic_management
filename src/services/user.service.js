const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const configs = require('../config/config');
const Token = require('../models/token.model');
const { tokenTypes } = require('../config/tokens');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  return User.create(userBody);
};

const createAdmin = async () => {
  if (await User.isEmailTaken(configs.admin.email)) {
    return;
  }
  return User.create(configs.admin);
};

const queryUsers = async (filter, options) => {
  const fRole = options.role ? { role: options.role } : {};
  const fStatus = options.status ? { status: options.status } : {};
  const fEmail = options.isEmailVerified ? { isEmailVerified: options.isEmailVerified } : {};

  const finalFilter = {
    ...filter,
    ...fRole,
    ...fStatus,
    ...fEmail,
  };

  const users = await User.paginate(finalFilter, options);
  return users;
};

const getUserById = async (id) => {
  const user = User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  // Kiểm tra nếu email đã được sử dụng bởi người dùng khác
  if (updateBody.email) {
    if (await User.isEmailTaken(updateBody.email, userId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    if (user.isEmailVerified && updateBody.email !== user.email) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email has been verified and cannot be changed');
    }

    user.email = updateBody.email;
  }

  // Xóa các refresh token nếu trạng thái mới là 'inactive'
  if (updateBody.status === 'inactive') {
    await Token.deleteMany({ user: userId, type: tokenTypes.REFRESH, blacklisted: false });
  }

  // Cập nhật các trường khác
  Object.assign(user, updateBody);

  // Lưu thay đổi
  await user.save();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  createAdmin,
};

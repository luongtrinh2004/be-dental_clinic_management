const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['searchTerm']);
  const options = {
    ...pick(req.query, ['sortBy', 'limit', 'page', 'role', 'status', 'isEmailVerified']),
    searchFields: ['name', 'email'],
  };

  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUserById(req.params.userId, req.body);
  res.send(updatedUser);
});

module.exports = {
  createUser,
  getUsers,
  updateUser,
};

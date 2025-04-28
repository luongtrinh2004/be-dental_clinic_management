const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { accountService, userService } = require('../services');

const getAccount = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  res.send(user);
});

const updatePassword = catchAsync(async (req, res) => {
  await accountService.updatePassword(req.user._id, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateAccount = catchAsync(async (req, res) => {
  const user = await accountService.updateAccount(req.user._id, req.body);
  res.send(user);
});

module.exports = {
  updatePassword,
  updateAccount,
  getAccount,
};

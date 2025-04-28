const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { userController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('admin'), validate(userValidation.createUser), userController.createUser)
  .get(auth('admin'), validate(userValidation.getUsers), userController.getUsers);

router.route('/:userId').patch(auth('admin'), validate(userValidation.updateUser), userController.updateUser);

module.exports = router;

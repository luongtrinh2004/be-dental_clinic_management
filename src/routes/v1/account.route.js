const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { accountValidation } = require('../../validations');
const { accountController } = require('../../controllers');

const router = express.Router();

router.use(auth());

router.route('/update-password').patch(validate(accountValidation.updatePassword), accountController.updatePassword);
router
  .route('/')
  .get(accountController.getAccount)
  .patch(validate(accountValidation.updateAccount), accountController.updateAccount);

module.exports = router;

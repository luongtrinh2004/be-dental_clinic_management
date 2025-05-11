const express = require('express');
const { serviceController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { serviceValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .get(auth('admin', 'staff'), serviceController.getAll)
  .post(auth('admin', 'staff'), validate(serviceValidation.createOrUpdateService), serviceController.create);

router.get('/:serviceId', auth('admin', 'staff'), validate(serviceValidation.serviceIdParam), serviceController.getById);
router.put(
  '/:serviceId',
  auth('admin', 'staff'),
  validate(serviceValidation.serviceIdParam),
  validate(serviceValidation.createOrUpdateService),
  serviceController.update
);
router.delete('/:serviceId', auth('admin', 'staff'), validate(serviceValidation.serviceIdParam), serviceController.remove);

module.exports = router;

const express = require('express');
const { serviceController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { serviceValidation } = require('../../validations');

const router = express.Router();

router.get('/', auth('admin', 'user'), serviceController.getAll);
router.get('/:serviceId', auth('admin', 'user'), validate(serviceValidation.serviceIdParam), serviceController.getById);
router.post('/', auth('admin', 'user'), validate(serviceValidation.createOrUpdateService), serviceController.create);
router.put(
  '/:serviceId',
  auth('admin', 'user'),
  validate(serviceValidation.serviceIdParam),
  validate(serviceValidation.createOrUpdateService),
  serviceController.update
);
router.delete('/:serviceId', auth('admin', 'user'), validate(serviceValidation.serviceIdParam), serviceController.remove);

module.exports = router;

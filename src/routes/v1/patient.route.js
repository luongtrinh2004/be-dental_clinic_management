const express = require('express');
const { patientController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { patientValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth('admin', 'staff'), validate(patientValidation.createPatient), patientController.createPatient)
  .get(auth('admin', 'staff'), validate(patientValidation.queryPatients), patientController.queryPatients);

router
  .route('/:patientId')
  .get(auth('admin', 'staff'), validate(patientValidation.getPatient), patientController.getPatientById)

  .patch(auth('admin', 'staff'), validate(patientValidation.updatePatient), patientController.updatePatient)
  .delete(auth('admin', 'staff'), validate(patientValidation.deletePatient), patientController.deletePatient);

module.exports = router;

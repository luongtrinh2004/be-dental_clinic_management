const express = require('express');
const patientController = require('../../controllers/patient.controller');

const router = express.Router();

router.route('/').post(patientController.createPatient).get(patientController.getPatients);

router
  .route('/:id')
  .get(patientController.getPatientById)
  .put(patientController.updatePatient)
  .delete(patientController.deletePatient);

module.exports = router;

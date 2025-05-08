const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const accountRoute = require('./account.route');
const serviceRoute = require('./service.route');
const patientRoute = require('./patient.route');
const medicalHistoryRoute = require('./medicalHistory.route');

const router = express.Router();

const defaultRoutes = [
  { path: '/my-account', route: accountRoute },
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/services', route: serviceRoute },
  { path: '/patients', route: patientRoute },
  { path: '/medical-history', route: medicalHistoryRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

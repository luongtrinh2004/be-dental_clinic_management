const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const accountRoute = require('./account.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/my-account',
    route: accountRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

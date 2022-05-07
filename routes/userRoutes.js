const express = require('express');
const {
  LoginCheck,
  logout,
  protect,
  SignupCheck,
} = require('./../controllers/userController');
const { route } = require('./sensorRoutes');

const router = express.Router();

router.route('/login').post(LoginCheck);
router.route('/signup').post(SignupCheck);
module.exports = router;

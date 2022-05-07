const express = require('express');
const {
  postData,
  getData,
  getOneData,
} = require('./../controllers/sensorController');
const { protect } = require('./../controllers/userController');
const router = express.Router();

router.route('/post-data').post(postData);
router.route('/get-data/:api_key/:station_id').get(getData);
router.route('/get-data-1/:api_key/:station_id').get(getOneData);
module.exports = router;

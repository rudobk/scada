const express = require('express');
const {
  postData,
  getData,
  getOneData,
  getData_test,
  getDeviceStatus,
  getDeviceError,
  postDeviceError,
} = require('./../controllers/sensorController');
const { protect } = require('./../controllers/userController');
const router = express.Router();

router.route('/post-data').post(postData);
router.route('/get-data/:api_key/:station_id').get(getData);
router.route('/get-data-test/:api_key/:station_id').get(getData_test);
router.route('/get-data-1/:api_key/:station_id').get(getOneData);
router.route('/device-status/:api_key/:station_id').get(getDeviceStatus);
router
  .route('/device-error/:api_key/:station_id')
  .get(getDeviceError)
  .post(postDeviceError);
module.exports = router;

const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  stationID: {
    type: Number,
    unique: true,
    required: true,
  },
  tempSensor: {
    type: Boolean,
    required: true,
    default: true,
  },
  rainSensor: {
    type: Boolean,
    required: true,
    default: true,
  },
  windSensor: {
    type: Boolean,
    required: true,
    default: true,
  },
  viewSensor: {
    type: Boolean,
    required: true,
    default: true,
  },
});
exports.Device = mongoose.model('Device', deviceSchema);

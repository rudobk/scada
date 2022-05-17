const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
    },
    sensorID: {
      type: Number,
      required: true,
      max: 4,
      min: 1,
    },
    state: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
errorSchema.virtual('timeString').get(function() {
  const date = new Date(this.time);
  return date.toLocaleTimeString('vi');
});
errorSchema.virtual('dateString').get(function() {
  const date = new Date(this.time);

  return date.toLocaleDateString('vi');
});
errorSchema.virtual('errorString').get(function() {
  let sensorName;
  switch (this.sensorID) {
    case 1:
      sensorName = 'Nhiệt Độ';
      break;
    case 2:
      sensorName = 'Lượng Mưa';
      break;
    case 3:
      sensorName = 'Đo Gió';
      break;
    case 4:
      sensorName = 'Tầm Nhìn';
      break;
    default:
      break;
  }
  if (this.state === true) {
    return `Cảm biến ${sensorName} đã được sửa chữa.`;
  }
  return `Cảm biến ${sensorName} đã gặp vấn đề.`;
});
exports.Error1 = mongoose.model('Error1', errorSchema);
exports.Error2 = mongoose.model('Error2', errorSchema);

const mongoose = require('mongoose');

convertTime = require('../utils/convertTime');

const wheatherSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
    },
    temp: {
      temp_1m: {
        type: Number,
        required: [true, 'Data must have a temperature'],
        max: 50,
        min: -50,
      },
      temp_avg_1h: {
        type: Number,
        max: 50,
        min: -50,
      },
      temp_max_1h: {
        type: Number,
        max: 50,
        min: -50,
      },
      temp_min_1h: {
        type: Number,
        max: 50,
        min: -50,
      },
    },
    rain: {
      rain_1m: {
        type: Number,
      },
      rain_1h: {
        type: Number,
      },
    },
    wind: {
      wind_speed_1m: {
        type: Number,
      },
      wind_orientation_1m: {
        type: Number,
        min: 1,
        max: 8,
      },
    },
    view: {
      view: {
        type: Number,
      },
      view_max_1h: {
        type: Number,
      },
      view_min_1h: {
        type: Number,
      },
      view_avg_1h: {
        type: Number,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
wheatherSchema.virtual('timeString').get(function() {
  const date = new Date(this.time);
  return date.toLocaleTimeString('vi');
});
wheatherSchema.virtual('dateString').get(function() {
  const date = new Date(this.time);

  return date.toLocaleDateString('vi');
});
wheatherSchema.virtual('OrientationString').get(function() {
  let text = '';
  switch (this.wind.wind_orientation_1m) {
    case 1:
      text = 'Bắc';
      break;
    case 2:
      text = 'Đông Bắc';
      break;
    case 3:
      text = 'Đông';
      break;
    case 4:
      text = 'Đông Nam';
      break;
    case 5:
      text = 'Nam';
      break;
    case 6:
      text = 'Tây Nam';
      break;
    case 7:
      text = 'Tây';
      break;
    case 8:
      text = 'Tây Bắc';
      break;
    default:
      break;
  }
  return text;
});

exports.Station1 = mongoose.model('Station1', wheatherSchema);
exports.Station2 = mongoose.model('Station2', wheatherSchema);

// module.exports = Station1;
// module.exports = Station2;

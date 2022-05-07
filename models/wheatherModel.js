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
wheatherSchema.post(/^find/, function(docs, next) {
  next();
});

exports.Station1 = mongoose.model('Station1', wheatherSchema);
exports.Station2 = mongoose.model('Station2', wheatherSchema);

// module.exports = Station1;
// module.exports = Station2;

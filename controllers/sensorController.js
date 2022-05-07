const flatten = require('flat');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { Station1, Station2 } = require('./../models/wheatherModel');

exports.postData = catchAsync(async function(req, res, next) {
  if (req.body.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  let newData = {};

  req.body.data.time = Date.now();
  // console.log(req.body);
  if (req.body.station === 1) newData = await Station1.create(req.body.data);
  if (req.body.station === 2) newData = await Station2.create(req.body.data);

  res.status(201).json({
    status: 'success',
    data: {
      newData,
    },
  });
});
exports.getData = catchAsync(async function(req, res, next) {
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  // console.log(req.params);
  let data = {};
  if (req.params.station_id === '1') {
    data = await Station1.find().sort('-time');
  }
  if (req.params.station_id === '2') {
    data = await Station2.find().sort('-time');
  }
  res.status(200).json({
    data,
  });
});

exports.getOneData = catchAsync(async function(req, res, next) {
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  // console.log(req.params);
  if (req.params.station_id === '1') {
    data = await Station1.find()
      .sort('-_id')
      .limit(1);
  }
  if (req.params.station_id === '2') {
    data = await Station2.find()
      .sort('-_id')
      .limit(1);
  }
  // console.log(data);
  res.status(200).json({
    data,
  });
});

/* eslint-disable prettier/prettier */
const flatten = require('flat');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { Station1, Station2 } = require('./../models/wheatherModel');
const { Device } = require('./../models/deviceModel');
const { Error1, Error2 } = require('./../models/errorModel');
const { startSession } = require('mongoose');

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
exports.getData_test = catchAsync(async function(req, res, next) {
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  let Station;
  if (req.params.station_id === '1') Station = Station1;
  else Station = Station2;

  // console.log(req.params.station_id);
  let minDate, maxDate;
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  if (req.query.minDate) {
    minDate = new Date(req.query.minDate);
  } else minDate = new Date('2000-01-01T00:00:00');
  if (req.query.maxDate) {
    maxDate = new Date(req.query.maxDate);
    maxDate = new Date(maxDate.getTime() + 86400000);
  } else maxDate = Date.now();
  const recordsTotal = await Station.countDocuments();
  const recordsFiltered = await Station.countDocuments({
    time: { $gte: minDate, $lte: maxDate },
  });
  const items = await Station.find({ time: { $gte: minDate, $lte: maxDate } })
    .sort({ time: -1 })
    .skip(Number(req.query.start))
    .limit(Number(req.query.length));
  res.status(200).json({
    draw: req.body.draw,
    recordsFiltered: recordsFiltered,
    recordsTotal: recordsTotal,
    data: items,
  });
});
exports.getDeviceStatus = catchAsync(async function(req, res, next) {
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  const data = await Device.find({ stationID: Number(req.params.station_id) });
  res.status(200).json({
    draw: req.body.draw,
    recordsFiltered: 1,
    recordsTotal: 1,
    data: data,
  });
});
exports.getDeviceError = catchAsync(async function(req, res, next) {
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  let Error;
  if (req.params.station_id === '1') Error = Error1;
  else Error = Error2;

  // console.log(req.params.station_id);
  let minDate, maxDate;
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  if (req.query.minDate) {
    minDate = new Date(req.query.minDate);
  } else minDate = new Date('2000-01-01T00:00:00');
  if (req.query.maxDate) {
    maxDate = new Date(req.query.maxDate);
    maxDate = new Date(maxDate.getTime() + 86400000);
  } else maxDate = Date.now();
  const recordsTotal = await Error.countDocuments();
  const recordsFiltered = await Error.countDocuments({
    time: { $gte: minDate, $lte: maxDate },
  });
  const items = await Error.find({ time: { $gte: minDate, $lte: maxDate } })
    .sort({ time: -1 })
    .skip(Number(req.query.start))
    .limit(Number(req.query.length));
  res.status(200).json({
    draw: req.body.draw,
    recordsFiltered: recordsFiltered,
    recordsTotal: recordsTotal,
    data: items,
  });
});

exports.postDeviceError = catchAsync(async function(req, res, next) {
  if (req.params.api_key !== process.env.API_KEY)
    return next(new AppError(400, 'API key mismatch'));
  req.body.time = Date.now();
  let newData = {};

  req.body.data.time = Date.now();
  // console.log(req.body);
  if (req.params.station_id === '1') {
    newData = await Error1.create(req.body.data);
  }
  if (req.params.station_id === '2')
    newData = await Error2.create(req.body.data);
  switch (req.body.data.sensorID) {
    case 1:
      await Device.findOneAndUpdate(
        { stationID: req.params.station_id },
        { tempSensor: req.body.data.state }
      );
      break;
    case 2:
      await Device.findOneAndUpdate(
        { stationID: req.params.station_id },
        { rainSensor: req.body.data.state }
      );
      break;
    case 3:
      await Device.findOneAndUpdate(
        { stationID: req.params.station_id },
        { windSensor: req.body.data.state }
      );
      break;
    case 4:
      await Device.findOneAndUpdate(
        { stationID: req.params.station_id },
        { viewSensor: req.body.data.state }
      );
      break;
    default:
      break;
  }

  res.status(201).json({
    status: 'success',
    data: {
      newData,
    },
  });
});

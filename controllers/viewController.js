const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
exports.getLogin = catchAsync(async (req, res, next) => {
  // console.log('In login');
  res.render('login');
});

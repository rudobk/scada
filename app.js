const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const sensorRouter = require('./routes/sensorRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { protect } = require('./controllers/userController');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(compression());

app.use((req, res, next) => {
  //   console.log(req.cookies);
  next();
});

app.use(viewRouter);
app.use('/api/sensor', sensorRouter);
app.use('/api/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/////////// Middleware
// 3rd party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Global MIDDLEWARE
const limiter = rateLimit({
  max: 100,
  windowms: 15 * 60 * 1000,
  message: 'Too many requests from this ip, Please try again in an hour.',
});

app.use('/api', limiter);

// app.use(express.static('./public'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Middleware

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;

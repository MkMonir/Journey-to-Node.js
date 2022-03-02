const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const monogoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

/////////// GLOBAL Middleware

// note: SET SECURITY HTTP HEADERS
app.use(helmet());

// note: DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// note: LIMIR REQUESTS FORM SAME API
const limiter = rateLimit({
  max: 100,
  windowms: 15 * 60 * 1000,
  message: 'Too many requests from this ip, Please try again in an hour.',
});
app.use('/api', limiter);

// note: BODY PARSER, READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({ limit: '10kb' }));

// note: DATA SANITIZATION AGAINST NoSQL QUERY INJECTION
app.use(monogoSanitize());

// note: DATA SANITIZATION AGAINST XSS(XROSS-SITE SCRIPTING ATTACKS)
app.use(xss());

// note: PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// note: SERVING STATIC FILES
// app.use(express.static('./public'));

// note: TEST MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// note: Routes Middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Global error handling middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/errorHandlers');

const userRoutes = require('./routers/userRouter');
const catalogRoutes = require('./routers/catalogRouter');

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/seller', catalogRoutes);

// Routing errors
app.all('*', (req, res, next) => {
  next(new AppError(`Could not find ${req.originalUrl} on this server`, 404));
});

// General errors
app.use(globalErrorHandler);

module.exports = app;

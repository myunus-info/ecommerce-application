const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Synchronous error
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT REJECTION🔥🔥🔥. Shutting down...');
  process.exit(1); // Crashing the app is mandatory Bcz the app remains at unclean stage;
});

// Database connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
const port = process.env.PORT || 5000;

let server;
mongoose
  .connect(DB)
  .then(() => (server = app.listen(port, () => console.log(`Server is up on port ${port}`))))
  .then(() => console.log('Database connected successfully!'));

// Asynchronous error
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION🔥🔥🔥. Shutting down ...');
  server.close(() => {
    process.exit(1); // Crashing the app is optional
  });
});

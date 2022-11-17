const express = require('express');
const app = express();

const userRoutes = require('./routers/userRouter');

app.use(express.json());

app.use('/api/auth', userRoutes);

module.exports = app;

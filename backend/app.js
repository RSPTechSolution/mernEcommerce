const express = require('express');
const product = require('./routes/productRoute.js');
const errorMiddleware = require('./meddleware/error')
const user = require('./routes/useRoute');
const order = require('./routes/orderRoute.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware for Errors

app.use(errorMiddleware);

module.exports = app;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const mongoose = require('mongoose');

const usersRoute = require('./routes/users-route');
const productsRoute = require('./routes/products-route');
const ordersRoute = require('./routes/orders-route');

const app = express();

app.use(helmet());
app.use(logger('tiny'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', usersRoute);
app.use('/api/product', productsRoute);
app.use('/api/order', ordersRoute);

// Error handling
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '☕️' : error.stack,
  });
});

// Server Port
const port = process.env.PORT || 8000;

mongoose
  .connect('mongodb://localhost:27017/shopApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(port, () => console.log(`Server is running on port ${port}.`));
  })
  .catch((error) => console.log(error.message));

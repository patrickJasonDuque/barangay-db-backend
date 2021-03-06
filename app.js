const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000;
mongoose
  .connect(
    `mongodb+srv://barangaypandayan:${process.env
      .MONGODBPASSWORD}@database.gnpj4.mongodb.net/database?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log('connected'))
  .catch(err => console.log('cannot connect', { err }));

/* ===============================================================
												MIDDLEWARE
================================================================== */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

/* ===============================================================
												ROUTES
================================================================== */
app.use(routes);

app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});

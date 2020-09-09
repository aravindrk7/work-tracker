const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const dashboardRoutes = require('./api/dashboard');
const middlewares = require('./middlewares');

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true, useNewUrlParser: true
}, () => {
    console.log('Connected to DB');
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "hello"
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
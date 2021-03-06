const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const dashboardRoutes = require('./api/dashboardApi');
const workRoutes = require('./api/workApi');
const userRoutes = require('./api/userApi');


const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/work', workRoutes);
app.use('/api/user', userRoutes);

// Serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.get('/', (req, res) => {
    res.json({
        message: "Work Tracker"
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const DeviceRoutes = require('../routes/DeviceRoutes');
const TypeRoutes = require('../routes/TypeRoutes');
const RoomRoutes = require('../routes/RoomRoutes');

const ExpressApp = () => {
    //  initialize app
    const app = express();
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/api', DeviceRoutes);
    app.use('/api', TypeRoutes);
    app.use('/api', RoomRoutes);
    
    return app;
};
module.exports = ExpressApp;
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser')
    //morgan
    morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//==tambahan
var logger = require("./util/logging/winston-logger");

app.use(morgan('combined',{ "stream": logger.stream }));
logger.debug("Overriding 'Express' logger");
//end-tambahan

var routesCustomer = require('./router/routes-customer');
routesCustomer(app);

app.listen(port);
logger.debug('Learn Node JS With Kiddy, RESTful API server started on: ' + port);
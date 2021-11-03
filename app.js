const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const http = require('http');
const appConfig = require('./config/appConfig');
// // const logger = require('./app/libs/loggerLib');
// const routeLoggerMiddleware = require('./app/middlewares/routeLogger.js');
//  const globalErrorMiddleware = require('./app/middlewares/appErrorHandler');
const mongoose = require('mongoose');
const morgan = require('morgan');


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(routeLoggerMiddleware.logIp);
// app.use(globalErrorMiddleware.globalErrorHandler);


// app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static('uploads'));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true,
//   cookie: {
//     expires: 60000
// }
}));
app.use(passport.initialize());
app.use(passport.session());


// var initPassport = require('./app/passport/init');
// initPassport(passport);

const modelsPath = './app/model';
const controllersPath = './app/controller';
// const libsPath = './app/libs';
// const middlewaresPath = './app/middlewares';
const routesPath = './app';

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
});

//Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
  if (~file.indexOf('.js')) require(modelsPath + '/' + file)
});
// end Bootstrap models

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf('.js')) {
    let route = require(routesPath + '/' + file);
    route.setRouter(app);
  }
});
// end bootstrap route

// calling global 404 handler after route

// app.use(globalErrorMiddleware.globalNotFoundHandler);

// end global 404 handler

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// start listening to http server
console.log(appConfig);
server.listen(appConfig.port);
// server.on('error', onError);
// server.on('listening', onListening);

// end server listening code

// socket io connection handler 
// const socketLib = require("./app/libs/socketLib");
// const socketServer = socketLib.setServer(server);


// end socketio connection handler
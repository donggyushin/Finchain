'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// For parsing application/json
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));

// Get the frontend static file
console.log(__dirname);
var env = process.env.NODE_ENV;

if (env == 'dev') {
    app.use('/', _express2.default.static(_path2.default.join(__dirname, 'frontend/build')));
} else {
    app.use('/', _express2.default.static(_path2.default.join(__dirname, 'build')));
}

// API router
app.use('/api', _api2.default);

exports.default = app;
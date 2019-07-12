'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

require('./db_connection');

require('./model');

require('babel-core/register');

require('babel-polyfill');

require('babel-plugin-transform-runtime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 8001;

var env = process.env.NODE_ENV;

if (env == 'dev') {
    port = 3000;
}

_app2.default.listen(port, function () {
    return console.log('Example app listening on port ' + port);
});
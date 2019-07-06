'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sequelize = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = exports.sequelize = new _sequelize2.default('finchain', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate().then(function () {
    console.log("Connection has been established successfully");
}).catch(function (err) {
    console.log("Unable to connect to the database: ", err);
});

sequelize.sync({ force: true });
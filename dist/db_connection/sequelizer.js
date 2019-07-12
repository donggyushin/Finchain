"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = undefined;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV;

var DB_NAME = "";
var USER = "";
var PASSWORD = "";
var HOST = "";
if (env == "dev") {
  DB_NAME = "finchain";
  USER = "root";
  PASSWORD = "1234";
  HOST = "localhost";
} else {
  DB_NAME = "donggyu9410";
  USER = "donggyu9410";
  PASSWORD = "q1w2e3r4";
  HOST = "finchain.cafe24app.com";
}

var sequelize = exports.sequelize = new _sequelize2.default(DB_NAME, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
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
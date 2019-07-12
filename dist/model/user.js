'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelizer = require('../db_connection/sequelizer');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _sequelizer.sequelize.define('user', {
    username: {
        type: _sequelize2.default.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    identifier: {
        type: _sequelize2.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    name: {
        type: _sequelize2.default.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: _sequelize2.default.STRING,
        allowNull: true
    },
    admin: {
        type: _sequelize2.default.BOOLEAN,
        defaultValue: false
    }
});

exports.default = User;
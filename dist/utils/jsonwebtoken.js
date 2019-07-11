'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decodeToken = exports.generateToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateToken = exports.generateToken = async function generateToken(identifier) {
    try {
        var token = await _jsonwebtoken2.default.sign({ identifier: identifier }, 'she');
        return token;
    } catch (err) {
        return null;
    }
};

var decodeToken = exports.decodeToken = async function decodeToken(token) {
    try {
        var decoded = await _jsonwebtoken2.default.verify(token, 'she');
        var identifier = decoded.identifier;
        return identifier;
    } catch (err) {
        return null;
    }
};
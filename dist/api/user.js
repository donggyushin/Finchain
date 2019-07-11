'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _user = require('../controller/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upload = (0, _multer2.default)();
var router = _express2.default.Router();

// New Account
router.post('/new-account', upload.array(), _user.newAccount);

// Login
router.post('/login', upload.array(), _user.login);

// Show users info
router.get('/', _user.userInfo);

// Show user is admin or not
router.get('/admin', _user.checkAdmin);

// Change user password
router.post('/change-password', upload.array(), _user.changePassword);

exports.default = router;
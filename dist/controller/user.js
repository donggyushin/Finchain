"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAccount = exports.login = exports.userInfo = exports.changePassword = exports.checkAdmin = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _user = require("../model/user");

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = require("../utils/jsonwebtoken");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkAdmin = exports.checkAdmin = async function checkAdmin(req, res) {
  var token = req.header("token");
  var userPk = await (0, _jsonwebtoken.decodeToken)(token);

  try {
    var user = await _user2.default.findByPk(userPk);
    if (user == null) {
      res.json({
        ok: false,
        admin: false
      });
    } else {
      res.json({
        ok: true,
        admin: user.admin
      });
    }
  } catch (err) {
    res.json({
      ok: false,
      admin: false
    });
  }
};

var changePassword = exports.changePassword = async function changePassword(req, res) {
  var password = req.body.password;


  try {
    var master = await _user2.default.findOne({
      where: {
        username: "master"
      }
    });
    master.password = password;
    await master.save();
    res.json({
      ok: true,
      error: null
    });
  } catch (err) {
    res.json({
      ok: false,
      error: "비밀번호를 바꾸는데 실패하였습니다. "
    });
  }
};

var userInfo = exports.userInfo = async function userInfo(req, res) {
  try {
    var users = await _user2.default.findAll({
      attributes: ["identifier", "username", "name", "phoneNumber", "createdAt", "updatedAt", "password", "email"]
    });
    res.json({
      ok: true,
      message: "",
      users: users
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      message: "유저 정보를 받아오는데에 문제가 생겼습니다. ",
      users: null
    });
  }
};

var login = exports.login = async function login(req, res) {
  console.log(req.body);
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  // Find user with username and password

  _user2.default.findOne({ where: { username: username, password: password } }).then(async function (user) {
    // If there is, send ok and token
    if (user != null) {
      var userIdentifier = user.identifier;
      console.log(userIdentifier);
      var jwt = await (0, _jsonwebtoken.generateToken)(userIdentifier);
      res.json({
        ok: true,
        message: null,
        jwt: jwt
      });
    } else {
      // Else, error message
      res.json({
        ok: false,
        message: "로그인에 실패하였습니다. ",
        jwt: null
      });
    }
  });
};

var newAccount = exports.newAccount = function newAccount(req, res) {
  console.log(req.body);
  var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password,
      name = _req$body2.name,
      phoneNumber = _req$body2.phoneNumber,
      email = _req$body2.email;
  // Check there is already username

  _user2.default.findOne({ where: { username: username } }).then(function (user) {
    // user will be the first entry of the User table with username
    // If there is, send error message
    if (user != null) {
      res.json({
        ok: false,
        message: "이미 존재하는 아이디입니다. "
      });
    } else {
      // Else, make new user

      try {
        _user2.default.findOrCreate({
          where: { username: username, password: password, name: name, phoneNumber: phoneNumber, email: email }
        }).then(async function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              user = _ref2[0],
              created = _ref2[1];

          if (created) {
            if (user.username = "master") {
              user.admin = true;
              try {
                await user.save();
                res.json({
                  ok: true,
                  message: "master 계정 생성완료"
                });
              } catch (err) {
                res.json({
                  ok: true,
                  message: "계정은 생성 됬지만, master 계정은 생성되지 않음. 이유 불명"
                });
              }
            } else {
              res.json({
                ok: true,
                message: null
              });
            }
          } else {
            res.json({
              ok: false,
              message: "회원가입에 실패하였습니다. "
            });
          }
        });
      } catch (err) {
        res.json({
          ok: false,
          message: "회원가입에 실패하였습니다. "
        });
      }
    }
  });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var testGet = exports.testGet = function testGet(req, res) {
    res.json({
        test: 'hi!'
    });
};

var testPost = exports.testPost = function testPost(req, res, next) {
    console.log(req.body);
    res.json({
        data: req.body
    });
};
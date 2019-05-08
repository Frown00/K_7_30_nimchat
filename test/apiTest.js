const request = require('supertest');
const app = require('../server');
const userTest = require('./userTest');
const profileTest = require('./profileTest');
const cleanAfterTest = require('./clean');

// ==== user API test ====
userTest(app, request);
profileTest(app, request);
cleanAfterTest(app, request);

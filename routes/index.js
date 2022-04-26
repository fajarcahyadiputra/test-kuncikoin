var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');
const testController = require('../controllers/testController');
const authMidleware = require('../midleware/authMidleware');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/post1', authMidleware, testController.post1);
router.post('/post2', testController.post2);

module.exports = router;

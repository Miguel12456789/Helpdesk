const express = require('express');
const router = express.Router();
const navegationController = require('./navegationController');

router.get("/", navegationController.home);

module.exports = router;
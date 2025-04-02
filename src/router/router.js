const express = require('express');
const router = express.Router();
const navegationController = require('./navegationController');

router.get("/", navegationController.home);
router.get("/base_gov", navegationController.base_gov);

module.exports = router;
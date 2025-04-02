const express = require('express');
const router = express.Router();
const navegationController = require('./navegationController');

router.get("/", navegationController.home);
router.get("/contratos", navegationController.contratos);

module.exports = router;
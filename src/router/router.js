const express = require('express');
const router = express.Router();
const navegationController = require('./navegationController');

router.get("/", navegationController.home);
router.get("/contract_details", navegationController.contract_details);

module.exports = router;
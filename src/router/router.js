const express = require('express');
const router = express.Router();
const navegationController = require('./navegationController');

router.get("/", navegationController.home);
router.get("/base_gov", navegationController.base_gov);
router.get("/estatisticas_setor_publico", navegationController.estatisticas_setor_publico);
router.get("/estatisticas_setor_privado", navegationController.estatisticas_setor_privado);
router.get("/oportunidade_contratacao_publica", navegationController.oportunidade_contratacao_publica);
router.get("/outros", navegationController.outros);

module.exports = router;
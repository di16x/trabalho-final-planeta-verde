const express = require('express')
const materialControle = require('../controle/MaterialControle.js')
const router = express.Router();

router.post('/',materialControle.inserir);
router.get('/',materialControle.buscarPorFiltro);
router.delete('/:id',materialControle.deletar);
router.get('/:id',materialControle.obter);
router.put('/:id',materialControle.atualizar);
router.post('/filtrar',materialControle.filtrar)

module.exports=router;

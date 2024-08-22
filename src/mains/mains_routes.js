const express = require('express');
const { getMains, createMains, viewMains, deleteMains, updateMains } = require('./mains_controller.js');

const router = express.Router();

//get all Mains
router.get('/', getMains);

//add Mains
router.post('/', createMains) 

//Mains details
//router.get('/:id', viewMains)

//delete Mains
router.delete('/:id', deleteMains)

//Mains update
router.patch('/:id',  updateMains)

module.exports = router;
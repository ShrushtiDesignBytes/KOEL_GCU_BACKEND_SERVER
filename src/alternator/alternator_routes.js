const express = require('express');
const { getAlternator, createAlternator, viewAlternator, deleteAlternator, updateAlternator } = require('./alternator_controller.js');

const router = express.Router();

//get all Alternator
router.get('/', getAlternator);

//add Alternator
router.post('/', createAlternator) 

//Alternator details
//router.get('/:id', viewAlternator)

//delete Alternator
router.delete('/:id', deleteAlternator)

//Alternator update
router.patch('/:id',  updateAlternator)

module.exports = router;
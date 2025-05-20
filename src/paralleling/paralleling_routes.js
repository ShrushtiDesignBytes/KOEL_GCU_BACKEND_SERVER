const express = require('express');
const { getParalleling, createParalleling, viewParalleling, deleteParalleling, updateParalleling } = require('./paralleling_controller.js');

const router = express.Router();

//get all Paralleling
router.get('/', getParalleling);

//add Paralleling
router.post('/', createParalleling) 

//Paralleling details
//router.get('/:id', viewParalleling)

//delete Paralleling
router.delete('/:id', deleteParalleling)

//Paralleling update
router.patch('/:id',  updateParalleling)

module.exports = router;
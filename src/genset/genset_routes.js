const express = require('express');
const { getGenset, createGenset, viewGenset, deleteGenset, updateGenset } = require('./genset_controller.js');

const router = express.Router();

//get all Genset
router.get('/', getGenset);

//add Genset
router.post('/', createGenset) 

//Genset details
//router.get('/:id', viewGenset)

//delete Genset
router.delete('/:id', deleteGenset)

//Genset update
router.patch('/:id',  updateGenset)

module.exports = router;
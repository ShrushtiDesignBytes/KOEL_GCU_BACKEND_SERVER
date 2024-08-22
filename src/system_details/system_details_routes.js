const express = require('express');
const { getSystem, createSystem, viewSystem, deleteSystem, updateSystem } = require('./system_details_controller');

const router = express.Router();

//get all System
router.get('/', getSystem);

//add System
router.post('/', createSystem) 

//System details
//router.get('/:id', viewSystem)

//delete System
router.delete('/:id', deleteSystem)

//System update
router.patch('/:id',  updateSystem)

module.exports = router;
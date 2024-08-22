const express = require('express');
const { getEngine, createEngine, viewEngine, deleteEngine, updateEngine } = require('./engine_controller.js');

const router = express.Router();

//get all Engine
router.get('/', getEngine);

//add Engine
router.post('/', createEngine) 

//Engine details
//router.get('/:id', viewEngine)

//delete Engine
router.delete('/:id', deleteEngine)

//Engine update
router.patch('/:id',  updateEngine)

module.exports = router;
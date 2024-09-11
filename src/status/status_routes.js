const express = require('express');
const { getStatus, createStatus, viewStatus, deleteStatus, updateStatus } = require('./status_controller.js');

const router = express.Router();

//get all Status
router.get('/', getStatus);

//add Status
router.post('/', createStatus) 

//Status details
//router.get('/:id', viewStatus)

//delete Status
// router.delete('/:id', deleteStatus)

//Status update
router.patch('/:id',  updateStatus)

module.exports = router;
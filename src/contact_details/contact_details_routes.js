const express = require('express');
const { getContact, createContact, viewContact, deleteContact, updateContact } = require('./contact_details_controller.js');

const router = express.Router();

//get all Contact
router.get('/', getContact);

//add Contact
router.post('/', createContact) 

//Contact details
//router.get('/:id', viewContact)

//delete Contact
router.delete('/:id', deleteContact)

//Contact update
router.patch('/:id',  updateContact)

module.exports = router;
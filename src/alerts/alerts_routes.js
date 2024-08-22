const express = require('express');
const { getAlerts, createAlerts, viewAlerts, deleteAlerts, updateAlerts } = require('./alerts_controller.js');

const router = express.Router();

//get all Alerts
router.get('/', getAlerts);

//add Alerts
router.post('/', createAlerts) 

//Alerts details
//router.get('/:id', viewAlerts)

//delete Alerts
router.delete('/:id', deleteAlerts)

//Alerts update
router.patch('/:id',  updateAlerts)

module.exports = router;
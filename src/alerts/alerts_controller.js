var db = require('../../config/db');
const Alerts = db.alerts;
const moment = require('moment-timezone');

function convertToIST(date) {
    return moment(date).tz("Asia/Kolkata").format('DD MMM YY h:mm A');
}


module.exports = {

    //get all alerts
    getAlerts: async (req, res) => {
        try {
            const alerts = await Alerts.findAll();
           
            const datawithIST = alerts.map(record => {
                    return {
                        ...record.dataValues,
                        date: convertToIST(record.date),
                        resolved: convertToIST(record.resolved),
                        createdlocal_db: convertToIST(record.createdlocal_db),
                        updatedlocal_db: convertToIST(record.updatedlocal_db),
                        createdAt: convertToIST(record.createdAt),
                        updatedAt: convertToIST(record.updatedAt),
                    }
               });

            // const datawithIST = {
            //         ...alerts.dataValues,
            //         date: convertToIST(alerts.date),
            //         resolved: convertToIST(alerts.resolved),
            //     }

            return res.status(200).send(
               //alerts
                datawithIST
            );

        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //add alerts
    createAlerts: async (req, res) => {

        const { faultCode, faultType, alertCategory, date, resolved, status, imageType, details, additionalInfo, createdlocal_db, updatedlocal_db } = req.body;
        try {
            const alerts = await Alerts.create({
                faultCode,
                faultType,
                alertCategory,
                date,
                resolved,
                status,
                imageType,
                details,
                additionalInfo,
                createdlocal_db, updatedlocal_db
            });

            const datawithIST = {
                    ...alerts.dataValues,
                    date: convertToIST(alerts.date),
                    resolved: convertToIST(alerts.resolved),
                    createdlocal_db: convertToIST(alerts.createdlocal_db),
                    updatedlocal_db: convertToIST(alerts.updatedlocal_db),
                    createdAt: convertToIST(alerts.createdAt),
                    updatedAt: convertToIST(alerts.updatedAt),
                }

            return res.status(200).send(
                //alerts
                datawithIST
            );
        } catch (error) {
            return res.status(400).json(
                error.message
            );
        }
    },

    //view alerts by id
    viewAlerts: async (req, res) => {
        const id = req.params.id
        try {
            const alerts = await Alerts.findByPk(id);
            const datawithIST = {
                ...alerts.dataValues,
                date: convertToIST(alerts.date),
                resolved: convertToIST(alerts.resolved),
            }

            return res.status(200).send(
               // alerts
               datawithIST
            );
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }

    },

    //delete alerts by id
    deleteAlerts: async (req, res) => {
        const id = req.params.id;
        try {
            const alerts = await Alerts.destroy({ where: { id } });
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    },

    //alerts update by id
    updateAlerts: async (req, res) => {
        const id = req.params.id;
        const { faultCode, faultType, alertCategory, date, resolved, status, imageType, details, additionalInfo, createdlocal_db, updatedlocal_db } = req.body;
        
        try {
            const alerts = await Alerts.update({
                faultCode, faultType, alertCategory, date, resolved, status, imageType, details, additionalInfo, createdlocal_db, updatedlocal_db
            },
                {
                    where: { id }
                });

            
            return res.status(200).send({
                message: 'Updated Successfully'
            });
        } catch (error) {
            return res.status(400).send(
                error.message
            );
        }
    }
}